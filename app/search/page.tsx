import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SERVICE_LABELS } from '@/lib/types'
import type { ListingImage } from '@/lib/types'
import ClinicCard from '@/components/clinic-card'
import Breadcrumbs from '@/components/breadcrumbs'
import { Search as SearchIcon, SlidersHorizontal, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search Hair Restoration Clinics',
  description: 'Search for non-surgical hair restoration clinics across the UK. Filter by city, service and treatment type.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; service?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, service, category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('listings')
    .select('*')
    .eq('business_status', 'OPERATIONAL')
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(60)

  if (q) {
    query = query.or(`title.ilike.%${q}%,city.ilike.%${q}%,description.ilike.%${q}%`)
  }

  if (category) {
    query = query.eq('treatment_category', category)
  }

  const { data: listings } = await query

  let filteredListings = listings || []
  let servicesMap: Record<string, string[]> = {}

  if (filteredListings.length > 0) {
    const ids = filteredListings.map(l => l.id)
    const { data: allServices } = await supabase
      .from('listing_services')
      .select('*')
      .in('listing_id', ids)

    // Fetch images
    const { data: allImages } = await supabase
      .from('listing_images')
      .select('*')
      .in('listing_id', ids)
      .order('sort_order', { ascending: true })

    for (const svc of allServices || []) {
      const active = Object.entries(svc)
        .filter(([key, val]) => key !== 'listing_id' && val === true)
        .map(([key]) => SERVICE_LABELS[key] || key)
      servicesMap[svc.listing_id] = active
    }

    if (service) {
      const serviceKey = `has_${service}`
      const matchingIds = new Set(
        (allServices || [])
          .filter((svc: Record<string, unknown>) => svc[serviceKey] === true)
          .map((svc: Record<string, unknown>) => svc.listing_id as string)
      )
      filteredListings = filteredListings.filter(l => matchingIds.has(l.id))
    }
  }

  const categories = ['Cosmetic Systems', 'Advanced Scalp Therapies', 'Both', 'Wig Specialist', 'General Salon']
  const serviceOptions = Object.entries(SERVICE_LABELS).map(([key, label]) => ({
    value: key.replace('has_', ''),
    label,
  }))

  const hasActiveFilters = q || service || category

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
          Search by name, city, or filter by treatment to find the right clinic.
        </p>
      </div>

      {/* Search & Filters */}
      <form method="get" className="mb-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              name="q"
              type="text"
              defaultValue={q || ''}
              placeholder="Search by city, clinic name, or keyword..."
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
                <option key={cat} value={cat}>{cat}</option>
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

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredListings.length}</span> result{filteredListings.length !== 1 ? 's' : ''} found
          {q ? <> for &ldquo;<span className="font-medium text-foreground">{q}</span>&rdquo;</> : ''}
        </p>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ClinicCard
              key={listing.id}
              listing={listing}
              services={servicesMap[listing.id]}
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
            No clinics matched your search. Try different filters or a broader search term.
          </p>
          <a
            href="/search"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors"
          >
            Clear all filters
          </a>
        </div>
      )}
    </div>
  )
}
