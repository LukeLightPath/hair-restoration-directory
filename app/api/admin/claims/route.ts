import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'
import { sendEmail } from '@/lib/email'
import { buildClaimDecisionSubject, buildClaimDecisionHtml } from '@/lib/emails/claim-decision'

const ADMIN_EMAIL = 'luke@lightpath.agency'

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

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

    const { data: listing } = await supabase
      .from('listings')
      .select('id, title, claim_status, claim_requested_by, claim_requested_email, claim_requested_name')
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
      let claimUserId: string | null = null
      let claimerName: string | null = listing.claim_requested_name || null
      let claimerEmail: string | null = null
      let setupPasswordUrl: string | null = null

      if (listing.claim_requested_by) {
        // Old flow: user already has an account
        claimUserId = listing.claim_requested_by

        const { data: claimerProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', claimUserId)
          .single()

        const { data: { user: claimerUser } } = await supabase.auth.admin.getUserById(claimUserId!)

        claimerName = claimerProfile?.full_name || claimerName
        claimerEmail = claimerUser?.email || null
      } else if (listing.claim_requested_email) {
        // New flow: email-only claimant, may or may not have an auth account
        claimerEmail = listing.claim_requested_email

        const { data: { users } } = await supabase.auth.admin.listUsers()
        const existingUser = users?.find(
          (u) => u.email?.toLowerCase() === claimerEmail!.toLowerCase()
        )

        if (existingUser) {
          claimUserId = existingUser.id
        } else {
          // Create user + generate invite link WITHOUT sending Supabase's generic email
          const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
            type: 'invite',
            email: claimerEmail!,
            options: {
              data: { full_name: claimerName },
              redirectTo: `${SITE_URL}/auth/callback?next=/reset-password`,
            },
          })

          if (linkError || !linkData?.user) {
            console.error('Generate invite link error:', linkError)
            return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 })
          }

          claimUserId = linkData.user.id
          setupPasswordUrl = linkData.properties?.action_link || null
        }
      } else {
        return NextResponse.json(
          { error: 'No claimant identified — missing both user ID and email' },
          { status: 400 }
        )
      }

      const { error } = await supabase
        .from('listings')
        .update({
          claim_status: 'approved',
          claimed: true,
          claimed_by: claimUserId,
          claim_requested_by: claimUserId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listing_id)

      if (error) {
        console.error('Claim approve error:', error)
        return NextResponse.json({ error: 'Failed to approve claim' }, { status: 500 })
      }

      // Send ONE branded approval email via Resend (fire-and-forget)
      if (claimerEmail) {
        try {
          await sendEmail({
            to: claimerEmail,
            subject: buildClaimDecisionSubject(listing.title, action),
            html: buildClaimDecisionHtml({
              clinicName: listing.title,
              claimerName,
              action,
              dashboardUrl: `${SITE_URL}/dashboard`,
              setupPasswordUrl,
            }),
          })
        } catch (emailErr) {
          console.error('[Claim Decision] Email notification failed:', emailErr)
        }
      }
    } else {
      // Reject — reset claim fields
      const { error } = await supabase
        .from('listings')
        .update({
          claim_status: 'none',
          claim_requested_by: null,
          claim_requested_at: null,
          claim_requested_name: null,
          claim_requested_email: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listing_id)

      if (error) {
        console.error('Claim reject error:', error)
        return NextResponse.json({ error: 'Failed to reject claim' }, { status: 500 })
      }

      // Send rejection email (fire-and-forget)
      if (listing.claim_requested_by || listing.claim_requested_email) {
        try {
          let rejectEmail: string | null = null
          let rejectName: string | null = listing.claim_requested_name || null

          if (listing.claim_requested_by) {
            const { data: claimerProfile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('id', listing.claim_requested_by)
              .single()

            const { data: { user: claimerUser } } = await supabase.auth.admin.getUserById(listing.claim_requested_by)

            rejectEmail = claimerUser?.email || null
            rejectName = claimerProfile?.full_name || rejectName
          } else {
            rejectEmail = listing.claim_requested_email
          }

          if (rejectEmail) {
            await sendEmail({
              to: rejectEmail,
              subject: buildClaimDecisionSubject(listing.title, action),
              html: buildClaimDecisionHtml({
                clinicName: listing.title,
                claimerName: rejectName,
                action,
                dashboardUrl: `${SITE_URL}/dashboard`,
              }),
            })
          }
        } catch (emailErr) {
          console.error('[Claim Decision] Email notification failed:', emailErr)
        }
      }
    }

    return NextResponse.json({ success: true, action })
  } catch (err) {
    console.error('Admin claims API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
