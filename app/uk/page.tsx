import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'
import LocationGrid from '@/components/location-grid'
import { getRegion } from '@/lib/region-map'
import type { CityWithRegion } from '@/components/location-grid'

export const metadata: Metadata = {
  title: 'UK Hair Restoration Clinics by Location',
  description:
    'Browse hair restoration clinics in 200+ UK locations. Filter by region and compare ratings, services and reviews to find the right clinic near you.',
}

export default async function AllCitiesPage() {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('listings')
    .select('city, county')
    .eq('business_status', 'OPERATIONAL')

  // Build city map with county info
  const cityData = new Map<string, { count: number; county: string | null }>()
  for (const row of listings || []) {
    const existing = cityData.get(row.city)
    if (existing) {
      existing.count += 1
    } else {
      cityData.set(row.city, { count: 1, county: row.county })
    }
  }

  // Convert to array with region assignment
  const cities: CityWithRegion[] = Array.from(cityData.entries())
    .map(([city, { count, county }]) => ({
      city,
      slug: citySlug(city),
      count,
      region: getRegion(county),
    }))
    .sort((a, b) => b.count - a.count)

  const totalClinics = listings?.length || 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'United Kingdom' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Hair Restoration Clinics by Location
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Browse {cities.length} locations across the United Kingdom with {totalClinics}+ clinics offering
          non-surgical hair restoration services.
        </p>
      </div>

      <LocationGrid cities={cities} />
    </div>
  )
}
