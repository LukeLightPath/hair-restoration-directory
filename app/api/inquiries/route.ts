import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { buildInquirySubject, buildInquiryHtml } from '@/lib/emails/inquiry-notification'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listing_id, name, email, phone, message } = body

    if (!listing_id || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: listing_id, name, email' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()

    // Save inquiry
    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert({ listing_id, name, email, phone, message })
      .select()
      .single()

    if (error) {
      console.error('Inquiry insert error:', error)
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
    }

    // Update analytics
    const today = new Date().toISOString().split('T')[0]
    try {
      await supabase
        .from('listing_analytics')
        .upsert(
          { listing_id, date: today, inquiry_count: 1 },
          { onConflict: 'listing_id,date' }
        )
    } catch {
      // Analytics tracking is best-effort
    }

    // Send email notification to clinic (fire-and-forget)
    try {
      // Look up the listing to get clinic name and contact email
      const { data: listing } = await supabase
        .from('listings')
        .select('title, email, claimed_by')
        .eq('id', listing_id)
        .single()

      if (listing) {
        // Determine recipient: claimed owner's email first, then listing email
        let recipientEmail = listing.email

        if (listing.claimed_by) {
          const { data: ownerProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', listing.claimed_by)
            .single()

          if (ownerProfile) {
            // Get the auth user's email
            const { data: authUser } = await supabase.auth.admin.getUserById(listing.claimed_by)
            if (authUser?.user?.email) {
              recipientEmail = authUser.user.email
            }
          }
        }

        if (recipientEmail) {
          await sendEmail({
            to: recipientEmail,
            subject: buildInquirySubject(name, listing.title),
            html: buildInquiryHtml({
              clinicName: listing.title,
              enquirerName: name,
              enquirerEmail: email,
              enquirerPhone: phone,
              message,
            }),
            replyTo: email,
          })
        }
      }
    } catch (emailErr) {
      // Email is best-effort — never block the response
      console.error('[Inquiry] Email notification failed:', emailErr)
    }

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
