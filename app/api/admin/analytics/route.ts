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

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const search = searchParams.get('search') || ''

    const supabase = await createServiceClient()

    // Get all listings (with optional search filter)
    let listingsQuery = supabase
      .from('listings')
      .select('id, title, city, slug, google_rating, google_review_count, claimed, claim_status')
      .eq('business_status', 'OPERATIONAL')
      .order('title', { ascending: true })

    if (search) {
      listingsQuery = listingsQuery.or(`title.ilike.%${search}%,city.ilike.%${search}%`)
    }

    const { data: listings, error: listingsError } = await listingsQuery

    if (listingsError) {
      console.error('Listings query error:', listingsError)
      return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
    }

    if (!listings || listings.length === 0) {
      return NextResponse.json({ results: [] })
    }

    // Get analytics for date range
    let analyticsQuery = supabase
      .from('listing_analytics')
      .select('listing_id, page_views, phone_clicks, website_clicks, inquiry_clicks')

    if (from) {
      analyticsQuery = analyticsQuery.gte('date', from)
    }
    if (to) {
      analyticsQuery = analyticsQuery.lte('date', to)
    }

    const { data: analytics } = await analyticsQuery

    // Aggregate analytics per listing
    const analyticsMap = new Map<string, { page_views: number; phone_clicks: number; website_clicks: number; inquiry_clicks: number }>()

    for (const a of analytics || []) {
      const existing = analyticsMap.get(a.listing_id) || { page_views: 0, phone_clicks: 0, website_clicks: 0, inquiry_clicks: 0 }
      existing.page_views += a.page_views || 0
      existing.phone_clicks += a.phone_clicks || 0
      existing.website_clicks += a.website_clicks || 0
      existing.inquiry_clicks += a.inquiry_clicks || 0
      analyticsMap.set(a.listing_id, existing)
    }

    // Get inquiry counts per listing
    const listingIds = listings.map(l => l.id)

    let inquiriesQuery = supabase
      .from('inquiries')
      .select('listing_id')
      .in('listing_id', listingIds)

    if (from) {
      inquiriesQuery = inquiriesQuery.gte('created_at', `${from}T00:00:00Z`)
    }
    if (to) {
      inquiriesQuery = inquiriesQuery.lte('created_at', `${to}T23:59:59Z`)
    }

    const { data: inquiries } = await inquiriesQuery

    const inquiryCountMap = new Map<string, number>()
    for (const inq of inquiries || []) {
      inquiryCountMap.set(inq.listing_id, (inquiryCountMap.get(inq.listing_id) || 0) + 1)
    }

    // Merge everything
    const results = listings.map(listing => {
      const stats = analyticsMap.get(listing.id) || { page_views: 0, phone_clicks: 0, website_clicks: 0, inquiry_clicks: 0 }
      const inquiryCount = inquiryCountMap.get(listing.id) || 0
      const total = stats.page_views + stats.phone_clicks + stats.website_clicks + stats.inquiry_clicks

      return {
        id: listing.id,
        title: listing.title,
        city: listing.city,
        slug: listing.slug,
        google_rating: listing.google_rating,
        google_review_count: listing.google_review_count,
        claimed: listing.claimed,
        claim_status: listing.claim_status,
        page_views: stats.page_views,
        phone_clicks: stats.phone_clicks,
        website_clicks: stats.website_clicks,
        inquiry_clicks: stats.inquiry_clicks,
        inquiry_count: inquiryCount,
        total,
      }
    })

    return NextResponse.json({ results })
  } catch (err) {
    console.error('Admin analytics API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
