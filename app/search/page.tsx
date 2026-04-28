import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SERVICE_LABELS, TREATMENT_CATEGORY_LABELS } from '@/lib/types'
import type { Listing, ListingImage } from '@/lib/types'
import { geocodePostcode, UK_POSTCODE_RE } from '@/lib/geocode'
import ClinicCard from '@/components/clinic-card'
import Breadcrumbs from '@/components/breadcrumbs'
import { Search as SearchIcon, SlidersHorizontal, ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react'

const PER_PAGE = 30

export const metadata: Metadata = {
  title: 'Search Hair Restoration Clinics UK',
  description: 'Search and filter non-surgical hair restoration clinics across the UK. Browse by postcode, service or treatment type and compare real reviews.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; service?: string; category?: string; page?: string; postcode?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, service, category, page: pageParam, postcode: postcodeParam } = await searchParams

  /* ── Auto-detect postcode in q param ── */
  const isQPostcode = q && UK_POSTCODE_RE.test(q.trim())
  const postcode = postcodeParam || (isQPostcode ? q!.trim() : undefined)
  const textQuery = isQPostcode ? undefined : q
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const supabase = await createClient()

  /* ── Geocode postcode if provided ── */
  let geoResult: { lat: number; lng: number } | null = null
  let postcodeError = false

  if (postcode && postcode.trim().length > 0) {
    geoResult = await geocodePostcode(postcode)
    if (!geoResult) postcodeError = true
  }

  const isNearbySearch = geoResult !== null

  /* ── Nearby search path (PostGIS) ── */
  if (isNearbySearch) {
    // Step 1: Get nearby listing IDs with distances from RPC
    const { data: nearbyData, error: rpcError } = await supabase.rpc('nearby_clinics', {
      user_lat: geoResult!.lat,
      user_lng: geoResult!.lng,
      radius_miles: 50,
      result_limit: 500, // Fetch all within range, we'll paginate in JS
      result_offset: 0,
    })

    if (rpcError || !nearbyData) {
      // Fall through to standard search if RPC fails
      return renderPage({
        listings: [],
        servicesMap: {},
        distanceMap: {},
        totalCount: 0,
        currentPage,
        q: textQuery, service, category, postcode,
        postcodeError: true,
        isNearbySearch: false,
      })
    }

    // Build distance map
    const distanceMap: Record<string, number> = {}
    let nearbyIds = (nearbyData as { id: string; distance_miles: number }[]).map(r => {
      distanceMap[r.id] = r.distance_miles
      return r.id
    })

    // Step 2: Apply service filter
    if (service && nearbyIds.length > 0) {
      const serviceKey = `has_${service}`
      const { data: matchingServices } = await supabase
        .from('listing_services')
        .select('listing_id')
        .eq(serviceKey, true)
        .in('listing_id', nearbyIds)

      const svcIds = new Set((matchingServices || []).map(s => s.listing_id))
      nearbyIds = nearbyIds.filter(id => svcIds.has(id))
    }

    // Step 3: Apply category filter
    if (category && nearbyIds.length > 0) {
      const { data: catListings } = await supabase
        .from('listings')
        .select('id')
        .eq('treatment_category', category)
        .in('id', nearbyIds)

      const catIds = new Set((catListings || []).map(l => l.id))
      nearbyIds = nearbyIds.filter(id => catIds.has(id))
    }

    // Step 4: Apply text filter
    if (textQuery && nearbyIds.length > 0) {
      const { data: textListings } = await supabase
        .from('listings')
        .select('id')
        .or(`title.ilike.%${textQuery}%,city.ilike.%${textQuery}%,description.ilike.%${textQuery}%`)
        .in('id', nearbyIds)

      const textIds = new Set((textListings || []).map(l => l.id))
      nearbyIds = nearbyIds.filter(id => textIds.has(id))
    }

    const totalCount = nearbyIds.length

    // Step 5: Paginate (IDs are already sorted by distance from RPC)
    const paginatedIds = nearbyIds.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

    if (paginatedIds.length === 0) {
      return renderPage({
        listings: [],
        servicesMap: {},
        distanceMap,
        totalCount: 0,
        currentPage,
        q: textQuery, service, category, postcode,
        postcodeError: false,
        isNearbySearch: true,
      })
    }

    // Step 6: Fetch full listing data
    const { data: listings } = await supabase
      .from('listings')
      .select('*')
      .in('id', paginatedIds)

    // Re-sort by distance (Supabase .in() doesn't preserve order)
    const sortedListings = (listings || []).sort((a, b) => {
      return (distanceMap[a.id] ?? 999) - (distanceMap[b.id] ?? 999)
    })

    // Step 7: Fetch services
    const servicesMap: Record<string, string[]> = {}
    if (paginatedIds.length > 0) {
      const { data: allServices } = await supabase
        .from('listing_services')
        .select('*')
        .in('listing_id', paginatedIds)

      for (const svc of allServices || []) {
        const active = Object.entries(svc)
          .filter(([key, val]) => key !== 'listing_id' && val === true)
          .map(([key]) => SERVICE_LABELS[key] || key)
        servicesMap[svc.listing_id] = active
      }
    }

    return renderPage({
      listings: sortedListings,
      servicesMap,
      distanceMap,
      totalCount,
      currentPage,
      q: textQuery, service, category, postcode,
      postcodeError: false,
      isNearbySearch: true,
    })
  }

  /* ── Standard search path (existing behaviour) ── */

  /* Step 1: If filtering by service, get matching listing IDs first */
  let serviceFilterIds: string[] | null = null

  if (service) {
    const serviceKey = `has_${service}`
    const { data: matchingServices } = await supabase
      .from('listing_services')
      .select('listing_id')
      .eq(serviceKey, true)

    serviceFilterIds = (matchingServices || []).map(s => s.listing_id)

    if (serviceFilterIds.length === 0) {
      return renderPage({
        listings: [],
        servicesMap: {},
        distanceMap: {},
        totalCount: 0,
        currentPage,
        q: textQuery, service, category, postcode,
        postcodeError,
        isNearbySearch: false,
      })
    }
  }

  /* Step 2: Build the count query (for pagination) */
  let countQuery = supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  if (textQuery) {
    countQuery = countQuery.or(`title.ilike.%${textQuery}%,city.ilike.%${textQuery}%,description.ilike.%${textQuery}%`)
  }
  if (category) {
    countQuery = countQuery.eq('treatment_category', category)
  }
  if (serviceFilterIds) {
    countQuery = countQuery.in('id', serviceFilterIds)
  }

  const { count: totalCount } = await countQuery

  /* Step 3: Fetch the page of listings */
  const from = (currentPage - 1) * PER_PAGE
  const to = from + PER_PAGE - 1

  let dataQuery = supabase
    .from('listings')
    .select('*')
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .range(from, to)

  if (textQuery) {
    dataQuery = dataQuery.or(`title.ilike.%${textQuery}%,city.ilike.%${textQuery}%,description.ilike.%${textQuery}%`)
  }
  if (category) {
    dataQuery = dataQuery.eq('treatment_category', category)
  }
  if (serviceFilterIds) {
    dataQuery = dataQuery.in('id', serviceFilterIds)
  }

  const { data: listings } = await dataQuery
  const filteredListings = listings || []

  /* Step 4: Fetch services for this page of results */
  let servicesMap: Record<string, string[]> = {}

  if (filteredListings.length > 0) {
    const ids = filteredListings.map(l => l.id)

    const { data: allServices } = await supabase
      .from('listing_services')
      .select('*')
      .in('listing_id', ids)

    for (const svc of allServices || []) {
      const active = Object.entries(svc)
        .filter(([key, val]) => key !== 'listing_id' && val === true)
        .map(([key]) => SERVICE_LABELS[key] || key)
      servicesMap[svc.listing_id] = active
    }
  }

  return renderPage({
    listings: filteredListings,
    servicesMap,
    distanceMap: {},
    totalCount: totalCount || 0,
    currentPage,
    q: textQuery, service, category, postcode,
    postcodeError,
    isNearbySearch: false,
  })
}

/* ──────────────────────────────────────────────────────────── */
/*  Render helper                                              */
/* ──────────────────────────────────────────────────────────── */

interface RenderProps {
  listings: Listing[]
  servicesMap: Record<string, string[]>
  distanceMap: Record<string, number>
  totalCount: number
  currentPage: number
  q?: string
  service?: string
  category?: string
  postcode?: string
  postcodeError?: boolean
  isNearbySearch: boolean
}

function renderPage({ listings, servicesMap, distanceMap, totalCount, currentPage, q, service, category, postcode, postcodeError, isNearbySearch }: RenderProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE))
  const hasActiveFilters = q || service || category || postcode

  /* Build URL preserving current filters */
  function pageUrl(page: number) {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    if (service) params.set('service', service)
    if (postcode) params.set('postcode', postcode)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/search${qs ? `?${qs}` : ''}`
  }

  /* Generate page numbers with ellipsis */
  function getPageNumbers(): (number | '...')[] {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const categories = ['Cosmetic Systems', 'Advanced Scalp Therapies', 'Both', 'Wig Specialist', 'General Salon']
  const serviceOptions = Object.entries(SERVICE_LABELS)
    .filter(([key]) => key !== 'has_transplant')
    .map(([key, label]) => ({
      value: key.replace('has_', ''),
      label,
    }))

  const showingFrom = totalCount === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1
  const showingTo = Math.min(currentPage * PER_PAGE, totalCount)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Search' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Search Clinics</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Search by postcode, clinic name or location to find the right clinic.
        </p>
      </div>

      {/* Search & Filters */}
      <form method="get" className="mb-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          {/* Single smart search field */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              name="q"
              type="text"
              defaultValue={q || ''}
              placeholder="Search by postcode, treatment or location..."
              className="w-full rounded-xl border border-input bg-background pl-12 pr-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

            <select
              name="category"
              defaultValue={category || ''}
              className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer transition-shadow hover:shadow-sm"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{TREATMENT_CATEGORY_LABELS[cat] || cat}</option>
              ))}
            </select>

            <select
              name="service"
              defaultValue={service || ''}
              className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer transition-shadow hover:shadow-sm"
            >
              <option value="">All services</option>
              {serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
            >
              Search
            </button>

            {hasActiveFilters && (
              <a
                href="/search"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear filters
              </a>
            )}
          </div>
        </div>
      </form>

      {/* Postcode error message */}
      {postcodeError && postcode && (
        <div className="mb-6 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
          <strong>Postcode not recognised.</strong> &ldquo;{postcode}&rdquo; doesn&apos;t look like a valid UK postcode. Results are shown without distance sorting.
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {totalCount > 0 ? (
            <>
              Showing <span className="font-semibold text-foreground">{showingFrom}–{showingTo}</span> of{' '}
              <span className="font-semibold text-foreground">{totalCount}</span> clinic{totalCount !== 1 ? 's' : ''}
              {isNearbySearch && postcode ? (
                <> near <span className="font-medium text-foreground">{postcode.toUpperCase()}</span></>
              ) : q ? (
                <> for &ldquo;<span className="font-medium text-foreground">{q}</span>&rdquo;</>
              ) : ''}
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">0</span> results found
              {isNearbySearch && postcode ? (
                <> near <span className="font-medium text-foreground">{postcode.toUpperCase()}</span></>
              ) : q ? (
                <> for &ldquo;<span className="font-medium text-foreground">{q}</span>&rdquo;</>
              ) : ''}
            </>
          )}
        </p>

        {/* Sort indicator */}
        {totalCount > 0 && (
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-1.5">
            {isNearbySearch ? (
              <>
                <Navigation className="h-3 w-3 text-primary" />
                Sorted by distance
              </>
            ) : (
              <>
                <MapPin className="h-3 w-3" />
                Sorted by rating
              </>
            )}
          </span>
        )}
      </div>

      {/* Results Grid */}
      {listings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ClinicCard
              key={listing.id}
              listing={listing}
              services={servicesMap[listing.id]}
              distanceMiles={distanceMap[listing.id]}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-muted/20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-5">
            <SearchIcon className="h-7 w-7 text-muted-foreground/60" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No clinics found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {isNearbySearch
              ? 'No clinics found within 50 miles of that postcode. Try a different postcode or clear filters.'
              : 'No clinics matched your search. Try different filters or a broader search term.'}
          </p>
          <a
            href="/search"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors"
          >
            Clear all filters
          </a>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Search results pagination" className="mt-12 flex items-center justify-center gap-1.5">
          {/* Previous */}
          {currentPage > 1 ? (
            <a
              href={pageUrl(currentPage - 1)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground/40 cursor-not-allowed">
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}

          {/* Page numbers */}
          {getPageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center h-10 w-8 text-sm text-muted-foreground">
                &hellip;
              </span>
            ) : p === currentPage ? (
              <span
                key={p}
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm"
                aria-current="page"
              >
                {p}
              </span>
            ) : (
              <a
                key={p}
                href={pageUrl(p)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {p}
              </a>
            )
          )}

          {/* Next */}
          {currentPage < totalPages ? (
            <a
              href={pageUrl(currentPage + 1)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-border text-muted-foreground/40 cursor-not-allowed">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </nav>
      )}
    </div>
  )
}
