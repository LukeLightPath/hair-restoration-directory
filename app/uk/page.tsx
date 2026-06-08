import type { Metadata } from 'next'
import { citySlug } from '@/lib/utils'
import { getCityCountsWithCounty } from '@/lib/data'
import Breadcrumbs from '@/components/breadcrumbs'
import LocationGrid from '@/components/location-grid'
import { getRegion } from '@/lib/region-map'
import type { CityWithRegion } from '@/components/location-grid'

export const metadata: Metadata = {
  title: 'UK Hair Restoration Clinics by Location',
  description:
    'Browse hair restoration clinics in 200+ UK locations. Filter by region and compare ratings, services and reviews to find the right clinic near you.',
}

export const revalidate = 3600 // ISR: regenerate at most once per hour

export default async function AllCitiesPage() {
  const cityCountData = await getCityCountsWithCounty()

  const cities: CityWithRegion[] = cityCountData
    .map(({ city, count, county }) => {
      let region = getRegion(county)
      if (region === 'Other') {
        region = getRegion(city)
      }
      return {
        city,
        slug: citySlug(city),
        count,
        region,
      }
    })
    .sort((a, b) => b.count - a.count)

  const totalClinics = cityCountData.reduce((sum, r) => sum + r.count, 0)

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
