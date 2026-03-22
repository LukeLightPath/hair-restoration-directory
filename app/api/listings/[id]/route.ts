import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/* ── Whitelist of owner-editable fields ── */
const LISTING_FIELDS = new Set([
  'title', 'description', 'phone', 'email', 'website',
  'street', 'postcode', 'booking_url', 'pricing_tier',
  'men_women_both', 'free_consultation', 'has_private_room',
  'logo_url',
])

const SERVICE_FIELDS = new Set([
  'has_hair_systems', 'has_smp', 'has_wigs', 'has_extensions',
  'has_prp', 'has_transplant', 'has_trichology', 'has_laser',
  'has_fitting', 'has_toppers', 'has_integration', 'has_cranial',
])

const SOCIAL_FIELDS = new Set([
  'facebook', 'instagram', 'tiktok', 'youtube', 'twitter',
])

function pick<T extends Record<string, unknown>>(obj: T, allowed: Set<string>) {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    if (allowed.has(key)) result[key] = obj[key]
  }
  return result
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  /* ── Auth check ── */
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  /* ── Ownership check ── */
  const { data: listing } = await supabase
    .from('listings')
    .select('id, claimed_by')
    .eq('id', id)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }
  if (listing.claimed_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  /* ── Parse body ── */
  const body = await req.json()
  const listingUpdates = pick(body.listing || {}, LISTING_FIELDS)
  const serviceUpdates = pick(body.services || {}, SERVICE_FIELDS)
  const socialUpdates = pick(body.socials || {}, SOCIAL_FIELDS)

  const errors: string[] = []

  /* ── Update listings table ── */
  if (Object.keys(listingUpdates).length > 0) {
    listingUpdates.updated_at = new Date().toISOString()
    const { error } = await supabase
      .from('listings')
      .update(listingUpdates)
      .eq('id', id)
    if (error) errors.push(`listings: ${error.message}`)
  }

  /* ── Update listing_services table ── */
  if (Object.keys(serviceUpdates).length > 0) {
    const { error } = await supabase
      .from('listing_services')
      .update(serviceUpdates)
      .eq('listing_id', id)
    if (error) errors.push(`listing_services: ${error.message}`)
  }

  /* ── Update listing_socials table ── */
  if (Object.keys(socialUpdates).length > 0) {
    const { error } = await supabase
      .from('listing_socials')
      .upsert({ listing_id: id, ...socialUpdates })
    if (error) errors.push(`listing_socials: ${error.message}`)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join('; ') }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
