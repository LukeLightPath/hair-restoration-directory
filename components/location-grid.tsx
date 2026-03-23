'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { UK_REGIONS } from '@/lib/region-map'

export type CityWithRegion = {
  city: string
  slug: string
  count: number
  region: string
}

export default function LocationGrid({ cities }: { cities: CityWithRegion[] }) {
  const [active, setActive] = useState<string | null>(null)

  // Only show regions that actually have cities
  const regionsWithCities = UK_REGIONS.filter((r) =>
    cities.some((c) => c.region === r)
  )

  // Include "Other" if any cities have that region
  const hasOther = cities.some((c) => c.region === 'Other')

  const allRegions = [
    ...regionsWithCities,
    ...(hasOther ? ['Other' as const] : []),
  ]

  const filtered = active
    ? cities.filter((c) => c.region === active)
    : cities

  // Group by region for the "All" view
  const grouped = allRegions
    .map((region) => ({
      region,
      cities: cities
        .filter((c) => c.region === region)
        .sort((a, b) => b.count - a.count),
    }))
    .filter((g) => g.cities.length > 0)

  return (
    <>
      {/* Region filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActive(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
            active === null
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          All Regions
        </button>
        {allRegions.map((region) => {
          const count = cities.filter((c) => c.region === region).length
          return (
            <button
              key={region}
              onClick={() => setActive(active === region ? null : region)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active === region
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {region}
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Count indicator */}
      <p className="text-xs text-muted-foreground mb-8">
        Showing {filtered.length} of {cities.length} locations
        {active && (
          <>
            {' '}in <span className="font-medium text-foreground">{active}</span>
          </>
        )}
      </p>

      {/* Content */}
      {active ? (
        // Flat grid for single region
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      ) : (
        // Grouped view for "All"
        <div className="space-y-10">
          {grouped.map(({ region, cities: regionCities }) => (
            <section key={region}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {region}
                </h2>
                <span className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2.5 py-0.5 font-medium">
                  {regionCities.length} location{regionCities.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {regionCities.map((city) => (
                  <CityCard key={city.slug} city={city} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  )
}

function CityCard({ city }: { city: CityWithRegion }) {
  return (
    <Link
      href={`/uk/${city.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
    >
      <MapPin className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      <div className="min-w-0">
        <p className="font-medium text-card-foreground text-sm truncate">{city.city}</p>
        <p className="text-xs text-muted-foreground">
          {city.count} clinic{city.count !== 1 ? 's' : ''}
        </p>
      </div>
    </Link>
  )
}
