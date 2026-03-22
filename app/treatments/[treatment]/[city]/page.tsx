import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getTreatmentBySlug, SERVICE_LABELS } from '@/lib/types'
import { cityFromSlug, canonicalUrl } from '@/lib/utils'
import ClinicCard from '@/components/clinic-card'
import Breadcrumbs from '@/components/breadcrumbs'

interface TreatmentCityPageProps {
  params: Promise<{ treatment: string; city: string }>
}

export async function generateMetadata({ params }: TreatmentCityPageProps): Promise<Metadata> {
  const { treatment: slug, city: cityParam } = await params
  const treatment = getTreatmentBySlug(slug)
  const cityName = cityFromSlug(cityParam)

  if (!treatment || !treatment.enabled) return { title: 'Not Found' }

  return {
    title: `${treatment.label} in ${cityName} | Compare Clinics & Reviews`,
    description: `Compare ${treatment.label.toLowerCase()} clinics in ${cityName}. Check real ratings, read reviews and book a free consultation today.`,
    alternates: {
      canonical: canonicalUrl(`/treatments/${slug}/${cityParam}`),
    },
  }
}

export default async function TreatmentCityPage({ params }: TreatmentCityPageProps) {
  const { treatment: treatmentSlug, city: cityParam } = await params
  const treatment = getTreatmentBySlug(treatmentSlug)
  const cityName = cityFromSlug(cityParam)

  if (!treatment || !treatment.enabled) notFound()

  const supabase = await createClient()

  // Get listing IDs that offer this treatment
  const { data: serviceRows } = await supabase
    .from('listing_services')
    .select('listing_id')
    .eq(treatment.dbColumn, true)

  const treatmentIds = new Set((serviceRows || []).map(r => r.listing_id))

  // Get listings in this city
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .ilike('city', cityName)
    .eq('business_status', 'OPERATIONAL')
    .order('google_rating', { ascending: false, nullsFirst: false })

  // Filter to only those offering this treatment
  const filteredListings = (listings || []).filter(l => treatmentIds.has(l.id))

  if (filteredListings.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: treatment.label, href: `/treatments/${treatmentSlug}` },
          { label: cityName },
        ]} />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {treatment.label} in {cityName}
        </h1>
        <p className="text-muted-foreground">
          No clinics in {cityName} currently offer {treatment.label.toLowerCase()}.
          Try browsing all <a href={`/treatments/${treatmentSlug}`} className="text-primary hover:text-primary-hover underline">{treatment.label.toLowerCase()} clinics across the UK</a>.
        </p>
      </div>
    )
  }

  // Get actual city name from first listing
  const actualCityName = filteredListings[0].city

  // Compute rating range for programmatic intro
  const ratings = filteredListings
    .map(l => l.google_rating)
    .filter((r): r is number => r != null && r > 0)
    .sort((a, b) => a - b)
  const minRating = ratings.length ? ratings[0] : null
  const maxRating = ratings.length ? ratings[ratings.length - 1] : null

  // Fetch services for filtered listings
  const filteredIds = filteredListings.map(l => l.id)
  const { data: allServices } = await supabase
    .from('listing_services')
    .select('*')
    .in('listing_id', filteredIds)

  const servicesMap: Record<string, string[]> = {}
  for (const svc of allServices || []) {
    const active = Object.entries(svc)
      .filter(([key, val]) => key !== 'listing_id' && val === true)
      .map(([key]) => SERVICE_LABELS[key] || key)
    servicesMap[svc.listing_id] = active
  }

  // JSON-LD for this treatment + city combo
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${treatment.label} clinics in ${actualCityName}`,
    description: `${filteredListings.length} clinics offering ${treatment.label.toLowerCase()} in ${actualCityName}`,
    numberOfItems: filteredListings.length,
    itemListElement: filteredListings.slice(0, 10).map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
        name: listing.title,
        address: {
          '@type': 'PostalAddress',
          streetAddress: listing.street,
          addressLocality: listing.city,
          addressCountry: 'GB',
        },
        ...(listing.google_rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: listing.google_rating,
            reviewCount: listing.google_review_count || 1,
          },
        }),
      },
    })),
  }

  // Build programmatic intro
  const clinicCount = filteredListings.length
  const clinicWord = clinicCount === 1 ? 'clinic' : 'clinics'
  let introSentence = `${clinicCount} ${clinicWord} offering ${treatment.label.toLowerCase()} in ${actualCityName}.`
  if (minRating && maxRating && ratings.length >= 2) {
    introSentence += ` Google ratings range from ${minRating.toFixed(1)} to ${maxRating.toFixed(1)}.`
  } else if (maxRating) {
    introSentence += ` Rated ${maxRating.toFixed(1)} on Google.`
  }

  // noindex thin pages with very few listings
  const shouldNoindex = filteredListings.length <= 2

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {shouldNoindex && (
        <meta name="robots" content="noindex, follow" />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: treatment.label, href: `/treatments/${treatmentSlug}` },
          { label: actualCityName },
        ]} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {treatment.label} in {actualCityName}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            {introSentence}
            {' '}Compare services, read reviews and send a free enquiry.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ClinicCard
              key={listing.id}
              listing={listing}
              services={servicesMap[listing.id]}
            />
          ))}
        </div>
      </div>
    </>
  )
}
