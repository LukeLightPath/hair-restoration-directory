import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

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

/* ── ALL fields admins can edit ── */
const LISTING_FIELDS = new Set([
  'title', 'description', 'phone', 'email', 'website',
  'street', 'postcode', 'city', 'country', 'county',
  'booking_url', 'pricing_tier', 'men_women_both',
  'free_consultation', 'has_private_room',
  'treatment_category', 'business_status',
  'google_rating', 'google_review_count',
  'meta_title', 'meta_description',
  'claimed', 'claim_status', 'featured',
  'logo_url', 'slug',
  'latitude', 'longitude',
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

  const admin = await verifyAdmin(req)
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createServiceClient()

  /* ── Verify listing exists ── */
  const { data: listing } = await supabase
    .from('listings')
    .select('id')
    .eq('id', id)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
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
