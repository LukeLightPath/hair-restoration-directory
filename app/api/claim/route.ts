import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
import { buildClaimSubject, buildClaimHtml } from '@/lib/emails/claim-notification'

const ADMIN_EMAIL = 'luke@lightpath.agency'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const rateLimited = checkRateLimit(request, 5, 300_000)
    if (rateLimited) return rateLimited

    const body = await request.json()
    const { listing_id, name, email } = body

    if (!listing_id) {
      return NextResponse.json({ error: 'Missing listing_id' }, { status: 400 })
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 })
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Missing or invalid email' }, { status: 400 })
    }

    const supabase = await createServiceClient()

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

    const { error } = await supabase
      .from('listings')
      .update({
        claim_status: 'pending',
        claim_requested_name: name.trim(),
        claim_requested_email: email.trim().toLowerCase(),
        claim_requested_at: new Date().toISOString(),
      })
      .eq('id', listing_id)

    if (error) {
      console.error('Claim update error:', error)
      return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 })
    }

    try {
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: buildClaimSubject(listing.title),
        html: buildClaimHtml({
          clinicName: listing.title,
          claimerEmail: email.trim().toLowerCase(),
          claimerName: name.trim(),
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
