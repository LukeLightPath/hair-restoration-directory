import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { buildInquirySubject, buildInquiryHtml } from '@/lib/emails/inquiry-notification'
import { sendSms, buildInquirySmsBody } from '@/lib/sms'
import { buildUnsubscribeUrl } from '@/app/api/unsubscribe/route'

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

    // Notify clinic: email + SMS to mobiles (fire-and-forget)
    try {
      const { data: listing } = await supabase
        .from('listings')
        .select('title, email, phone, claimed_by, notifications_off')
        .eq('id', listing_id)
        .single()

      if (listing && !listing.notifications_off) {
        // Resolve recipient email: claimed owner first, then listing email
        let recipientEmail = listing.email

        if (listing.claimed_by) {
          const { data: ownerProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', listing.claimed_by)
            .single()

          if (ownerProfile) {
            const { data: authUser } = await supabase.auth.admin.getUserById(listing.claimed_by)
            if (authUser?.user?.email) {
              recipientEmail = authUser.user.email
            }
          }
        }

        // Send email if we have one
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
              unsubscribeUrl: buildUnsubscribeUrl(listing_id),
            }),
            replyTo: email,
          })
        }

        // Also send SMS if the clinic has a mobile number
        if (listing.phone && isMobileNumber(listing.phone)) {
          await sendSms({
            to: listing.phone,
            body: buildInquirySmsBody({
              clinicName: listing.title,
              enquirerName: name,
              enquirerEmail: email,
              enquirerPhone: phone,
            }),
          })
        }
      }
    } catch (notifyErr) {
      // Notification is best-effort — never block the response
      console.error('[Inquiry] Notification failed:', notifyErr)
    }

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Check if a UK phone number is a mobile (07xxx / +447xxx).
 * Landlines (01, 02, 03, 08) cannot receive SMS.
 */
function isMobileNumber(phone: string): boolean {
  const digits = phone.replace(/\s+/g, '')
  // +447... format (international)
  if (digits.startsWith('+447')) return true
  // 07... format (local UK mobile)
  if (digits.startsWith('07') && digits.length >= 11) return true
  return false
}
