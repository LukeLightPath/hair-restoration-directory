import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Star, HelpCircle, ArrowRight, CheckCircle, PoundSterling,
  BookOpen, Scissors
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { cityFromSlug, citySlug, canonicalUrl, cn } from '@/lib/utils'
import { SERVICE_LABELS } from '@/lib/types'
import type { ListingImage } from '@/lib/types'
import { getCityContent } from '@/lib/city-content-variants'
import type { MiddleSection } from '@/lib/city-content-variants'
import { getNearbyCities } from '@/lib/nearby-cities'
import ClinicCard from '@/components/clinic-card'
import Breadcrumbs from '@/components/breadcrumbs'

interface CityPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params
  const city = cityFromSlug(slug)

  const supabase = await createClient()
  const { count } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .ilike('city', city)
    .eq('business_status', 'OPERATIONAL')

  const clinicCount = count || 0
  if (clinicCount === 0) return { title: 'Not Found' }

  const content = getCityContent(city, clinicCount)

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: canonicalUrl(`/uk/${slug}`),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonicalUrl(`/uk/${slug}`),
      type: 'website',
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlugParam } = await params
  const cityName = cityFromSlug(citySlugParam)

  const supabase = await createClient()

  // Fetch listings for this city
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .ilike('city', cityName)
    .eq('business_status', 'OPERATIONAL')
    .order('google_rating', { ascending: false, nullsFirst: false })

  if (!listings || listings.length === 0) {
    notFound()
  }

  // Fetch services for all listings
  const listingIds = listings.map(l => l.id)
  const { data: allServices } = await supabase
    .from('listing_services')
    .select('*')
    .in('listing_id', listingIds)

  // Fetch images for all listings
  const { data: allImages } = await supabase
    .from('listing_images')
    .select('*')
    .in('listing_id', listingIds)
    .order('sort_order', { ascending: true })

  // Build services map
  const servicesMap: Record<string, string[]> = {}
  for (const svc of allServices || []) {
    const active = Object.entries(svc)
      .filter(([key, val]) => key !== 'listing_id' && val === true)
      .map(([key]) => SERVICE_LABELS[key] || key)
    servicesMap[svc.listing_id] = active
  }

  // Build images map
  const imagesMap: Record<string, ListingImage[]> = {}
  for (const img of (allImages || []) as ListingImage[]) {
    if (!imagesMap[img.listing_id]) imagesMap[img.listing_id] = []
    imagesMap[img.listing_id].push(img)
  }

  // Get actual city name from first listing
  const actualCityName = listings[0].city

  // Get all cities in DB for nearby cities linking
  const { data: allCityRows } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')

  const allCitiesInDb = Array.from(new Set((allCityRows || []).map(r => r.city)))
  const nearbyCities = getNearbyCities(actualCityName, allCitiesInDb, 5)

  // Get city content (variant-selected)
  const content = getCityContent(actualCityName, listings.length)

  // Build JSON-LD: FAQPage
  const faqJsonLd = {
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
  }

  // Build JSON-LD: ItemList
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Hair system clinics in ${actualCityName}`,
    description: `${listings.length} clinics offering hair systems in ${actualCityName}`,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((listing, i) => ({
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

  // Build JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'United Kingdom', item: canonicalUrl('/uk') },
      { '@type': 'ListItem', position: 3, name: actualCityName, item: canonicalUrl(`/uk/${citySlugParam}`) },
    ],
  }

  /* ── Section renderers ── */

  const renderExpectSection = () => (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        What to Expect in {actualCityName}
      </h2>
      <ul className="space-y-3">
        {content.expectBullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
            <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-success" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  )

  const renderPricingSection = () => (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <PoundSterling className="h-5 w-5 text-primary" />
        Average Cost of Hair Systems in {actualCityName}
      </h2>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-muted-foreground leading-relaxed">{content.pricingText}</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Initial System</p>
            <p className="text-lg font-bold text-foreground">£400 – £2,500+</p>
          </div>
          <div className="rounded-xl bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Monthly Maintenance</p>
            <p className="text-lg font-bold text-foreground">£60 – £150</p>
          </div>
        </div>
      </div>
    </section>
  )

  const renderChoosingSection = () => (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Choosing the Right Clinic in {actualCityName}
      </h2>
      <div className="space-y-4">
        {content.choosingBullets.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-xs font-bold text-primary mt-0.5">
              {i + 1}
            </div>
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  const SECTION_MAP: Record<MiddleSection, () => React.JSX.Element> = {
    expect: renderExpectSection,
    pricing: renderPricingSection,
    choosing: renderChoosingSection,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'United Kingdom', href: '/uk' },
            { label: actualCityName },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Hair Systems in {actualCityName}: Compare Clinics, Costs &amp; Options
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">
            {content.intro}
          </p>
        </header>

        {/* ═══ Variant-ordered middle sections (before listings) ═══ */}
        <div className="space-y-10 mb-12">
          {content.sectionOrder.slice(0, 1).map(section => (
            <div key={section}>{SECTION_MAP[section]()}</div>
          ))}
        </div>

        {/* ═══ Clinic Listings ═══ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Compare Hair System Clinics in {actualCityName}
          </h2>
          <p className="text-muted-foreground mb-6">
            {listings.length} clinic{listings.length !== 1 ? 's' : ''} offering non-surgical hair replacement in {actualCityName}. Sorted by Google rating.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, index) => (
              <ClinicCard
                key={listing.id}
                listing={listing}
                services={servicesMap[listing.id]}
                images={imagesMap[listing.id]}
                priority={index < 3}
              />
            ))}
          </div>
        </section>

        {/* ═══ Remaining variant-ordered sections (after listings) ═══ */}
        <div className="space-y-10 mb-12">
          {content.sectionOrder.slice(1).map(section => (
            <div key={section}>{SECTION_MAP[section]()}</div>
          ))}
        </div>

        {/* ═══ FAQ Section ═══ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-200 hover:border-primary/20"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-semibold text-card-foreground hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3">
                    <HelpCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                    {faq.question}
                  </span>
                  <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border ml-7">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ═══ Internal Linking: Nearby Cities ═══ */}
        {nearbyCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Explore Nearby Cities
            </h2>
            <p className="text-muted-foreground mb-5">
              Can&apos;t find what you&apos;re looking for in {actualCityName}? Try one of these nearby locations.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {nearbyCities.map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="group flex items-center gap-2 rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{city.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Internal Linking: Guides & Resources ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Learn More About Hair Systems</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/guides/hair-systems"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/20 hover:shadow-sm transition-all group"
            >
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="group-hover:text-primary transition-colors">Hair Systems Guide</span>
                <p className="text-xs text-muted-foreground mt-0.5">Types, bases, hair and attachment methods explained</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
            <Link
              href="/treatments/hair-systems"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/20 hover:shadow-sm transition-all group"
            >
              <Scissors className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="group-hover:text-primary transition-colors">All Hair System Clinics</span>
                <p className="text-xs text-muted-foreground mt-0.5">Browse every hair system clinic across the UK</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
            <Link
              href="/uk"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/20 hover:shadow-sm transition-all group"
            >
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div>
                <span className="group-hover:text-primary transition-colors">All UK Cities</span>
                <p className="text-xs text-muted-foreground mt-0.5">Browse all cities with hair restoration clinics</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
