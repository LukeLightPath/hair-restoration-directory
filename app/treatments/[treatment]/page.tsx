import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getTreatmentBySlug, SERVICE_LABELS } from '@/lib/types'
import { TREATMENT_CONTENT } from '@/lib/treatment-content'
import { citySlug, canonicalUrl } from '@/lib/utils'
import ClinicCard from '@/components/clinic-card'
import Breadcrumbs from '@/components/breadcrumbs'

interface TreatmentPageProps {
  params: Promise<{ treatment: string }>
}

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { treatment: slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) return { title: 'Treatment Not Found' }

  return {
    title: `${treatment.label} Clinics UK | Compare Ratings & Reviews`,
    description: treatment.seoDescription,
  }
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { treatment: treatmentSlug } = await params
  const treatment = getTreatmentBySlug(treatmentSlug)

  if (!treatment || !treatment.enabled) notFound()

  const supabase = await createClient()

  // Get listing IDs that offer this treatment
  const { data: serviceRows } = await supabase
    .from('listing_services')
    .select('listing_id')
    .eq(treatment.dbColumn, true)

  const listingIds = (serviceRows || []).map(r => r.listing_id)

  if (listingIds.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: treatment.label },
        ]} />
        <h1 className="text-3xl font-bold text-foreground mb-4">{treatment.label}</h1>
        <p className="text-muted-foreground">No clinics currently offer this treatment.</p>
      </div>
    )
  }

  // Fetch the listings
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .in('id', listingIds)
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)
    .order('claimed', { ascending: false })
    .order('google_rating', { ascending: false, nullsFirst: false })

  // Fetch all services for these listings
  const { data: allServices } = await supabase
    .from('listing_services')
    .select('*')
    .in('listing_id', listingIds)

  const servicesMap: Record<string, string[]> = {}
  for (const svc of allServices || []) {
    const active = Object.entries(svc)
      .filter(([key, val]) => key !== 'listing_id' && val === true)
      .map(([key]) => SERVICE_LABELS[key] || key)
    servicesMap[svc.listing_id] = active
  }

  // Build city breakdown
  const cityMap = new Map<string, number>()
  for (const listing of listings || []) {
    cityMap.set(listing.city, (cityMap.get(listing.city) || 0) + 1)
  }
  const topCities = Array.from(cityMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  // Show top 12 listings
  const displayListings = (listings || []).slice(0, 12)

  // Get treatment content (intro + FAQs)
  const content = TREATMENT_CONTENT.find(c => c.slug === treatmentSlug)

  // FAQPage JSON-LD
  const faqJsonLd = content?.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: treatment.label },
        ]} />

        {/* Hero section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {treatment.label} Clinics: UK
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
            {treatment.seoDescription} {listings?.length || 0} clinics across {cityMap.size} locations.
          </p>
          {content?.intro && (
            <p className="mt-4 text-foreground/80 max-w-3xl leading-relaxed">
              {content.intro}
            </p>
          )}
        </div>

        {/* City grid — links to treatment/city combo pages */}
        {topCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Find {treatment.label} by Location
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {topCities.map(([city, count]) => (
                <Link
                  key={city}
                  href={`/treatments/${treatmentSlug}/${citySlug(city)}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="min-w-0">
                    <p className="font-medium text-card-foreground text-sm truncate">{city}</p>
                    <p className="text-xs text-muted-foreground">
                      {count} clinic{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Top clinics offering this treatment */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Top {treatment.label} Clinics
            </h2>
            {(listings?.length || 0) > 12 && (
              <span className="text-sm text-muted-foreground">
                Showing 12 of {listings?.length}
              </span>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayListings.map((listing) => (
              <ClinicCard
                key={listing.id}
                listing={listing}
                services={servicesMap[listing.id]}
              />
            ))}
          </div>
        </section>

        {/* FAQ section */}
        {content?.faqs && content.faqs.length > 0 && (
          <section className="mt-16 mb-4">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Common Questions About {treatment.label}
            </h2>
            <div className="space-y-4 max-w-3xl">
              {content.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-card shadow-sm"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-medium text-card-foreground hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
