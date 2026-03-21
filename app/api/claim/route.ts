import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'
import { sendEmail } from '@/lib/email'
import { buildClaimSubject, buildClaimHtml } from '@/lib/emails/claim-notification'

const ADMIN_EMAIL = 'luke@lightpath.agency'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listing_id } = body

    if (!listing_id) {
      return NextResponse.json({ error: 'Missing listing_id' }, { status: 400 })
    }

    // Get user session
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )

    const { data: { user } } = await supabaseAuth.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const supabase = await createServiceClient()

    // Check listing exists and isn't already claimed
    const { data: listing } = await supabase
      .from('listings')
      .select('id, title, claim_status')
      .eq('id', listing_id)
      .single()

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.claim_status !== 'none') {
      return NextResponse.json(
        { error: 'This listing already has a pending or approved claim' },
        { status: 409 }
      )
    }

    // Submit claim request
    const { error } = await supabase
      .from('listings')
      .update({
        claim_status: 'pending',
        claim_requested_by: user.id,
        claim_requested_at: new Date().toISOString(),
      })
      .eq('id', listing_id)

    if (error) {
      console.error('Claim update error:', error)
      return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 })
    }

    // Send admin notification (fire-and-forget)
    try {
      // Get claimer's profile name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      await sendEmail({
        to: ADMIN_EMAIL,
        subject: buildClaimSubject(listing.title),
        html: buildClaimHtml({
          clinicName: listing.title,
          claimerEmail: user.email || 'unknown',
          claimerName: profile?.full_name || null,
          listingId: listing_id,
        }),
      })
    } catch (emailErr) {
      console.error('[Claim] Admin notification failed:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Claim request submitted' })
  } catch (err) {
    console.error('Claim API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
