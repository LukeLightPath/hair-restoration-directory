import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'UK Hair Restoration Clinics by City',
  description:
    'Browse hair restoration clinics in 175+ UK cities. Compare ratings, services and reviews to find the right clinic near you.',
}

export default async function AllCitiesPage() {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')

  // Build city map
  const cityMap = new Map<string, number>()
  for (const row of listings || []) {
    cityMap.set(row.city, (cityMap.get(row.city) || 0) + 1)
  }

  const cities = Array.from(cityMap.entries())
    .sort((a, b) => b[1] - a[1])

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
          Hair Restoration Clinics by City
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Browse {cities.length} cities across the United Kingdom with {listings?.length || 0}+ clinics offering
          non-surgical hair restoration services.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cities.map(([city, count]) => (
          <Link
            key={city}
            href={`/uk/${citySlug(city)}`}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
          >
            <MapPin className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <div className="min-w-0">
              <p className="font-medium text-card-foreground text-sm truncate">{city}</p>
              <p className="text-xs text-muted-foreground">
                {count} clinic{count !== 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
