import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'
import { sendEmail } from '@/lib/email'
import { buildClaimDecisionSubject, buildClaimDecisionHtml } from '@/lib/emails/claim-decision'

async function verifyAdmin(request: NextRequest) {
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
  if (!user) return null

  const supabase = await createServiceClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') return null
  return user
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export async function PATCH(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { listing_id, action } = body

    if (!listing_id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Missing listing_id or invalid action (approve/reject)' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()

    // Get the listing to check it has a pending claim
    const { data: listing } = await supabase
      .from('listings')
      .select('id, title, claim_status, claim_requested_by')
      .eq('id', listing_id)
      .single()

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    if (listing.claim_status !== 'pending') {
      return NextResponse.json(
        { error: 'This listing does not have a pending claim' },
        { status: 409 }
      )
    }

    if (action === 'approve') {
      const { error } = await supabase
        .from('listings')
        .update({
          claim_status: 'approved',
          claimed: true,
          claimed_by: listing.claim_requested_by,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listing_id)

      if (error) {
        console.error('Claim approve error:', error)
        return NextResponse.json({ error: 'Failed to approve claim' }, { status: 500 })
      }
    } else {
      // Reject — reset claim fields
      const { error } = await supabase
        .from('listings')
        .update({
          claim_status: 'none',
          claim_requested_by: null,
          claim_requested_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listing_id)

      if (error) {
        console.error('Claim reject error:', error)
        return NextResponse.json({ error: 'Failed to reject claim' }, { status: 500 })
      }
    }

    // Send email notification to the claimant (fire-and-forget)
    if (listing.claim_requested_by) {
      try {
        // Get the claimer's profile and email
        const { data: claimerProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', listing.claim_requested_by)
          .single()

        // Get email from auth.users via admin API
        const { data: { user: claimerUser } } = await supabase.auth.admin.getUserById(listing.claim_requested_by)

        if (claimerUser?.email) {
          await sendEmail({
            to: claimerUser.email,
            subject: buildClaimDecisionSubject(listing.title, action),
            html: buildClaimDecisionHtml({
              clinicName: listing.title,
              claimerName: claimerProfile?.full_name || null,
              action,
              dashboardUrl: `${SITE_URL}/dashboard`,
            }),
          })
        }
      } catch (emailErr) {
        console.error('[Claim Decision] Email notification failed:', emailErr)
        // Don't fail the API response — the claim action itself succeeded
      }
    }

    return NextResponse.json({ success: true, action })
  } catch (err) {
    console.error('Admin claims API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
