import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin, Globe, Clock, Star, Shield,
  ExternalLink, Navigation, Users, Scissors, Camera, ImageIcon, BadgeCheck
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { cn, citySlug, cityFromSlug, canonicalUrl } from '@/lib/utils'
import { SERVICE_LABELS, TREATMENT_CATEGORY_LABELS } from '@/lib/types'
import type { ListingWithRelations } from '@/lib/types'
import Breadcrumbs from '@/components/breadcrumbs'
import ServiceBadges from '@/components/service-badges'
import ReviewCard from '@/components/review-card'
import GoogleAttribution from '@/components/google-attribution'
import ClickTracker from '@/components/click-tracker'
import PageViewTracker from '@/components/page-view-tracker'
import ContactForm from '@/components/contact-form'

interface ListingPageProps {
  params: Promise<{ city: string; slug: string }>
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { city: cityParam, slug } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('title, city, meta_title, meta_description, description')
    .eq('slug', slug)
    .single()

  if (!listing) return { title: 'Clinic Not Found' }

  return {
    title: listing.meta_title || `${listing.title}, ${listing.city} | Reviews & Services`,
    description:
      listing.meta_description ||
      listing.description?.slice(0, 155) ||
      `${listing.title} in ${listing.city}. View services, read real reviews and send a free enquiry to this non-surgical hair restoration clinic.`,
    alternates: {
      canonical: canonicalUrl(`/uk/${cityParam}/${slug}`),
    },
  }
}

/* ── Helper: check if currently open ── */
function getOpenStatus(openingHours: Record<string, string>): { isOpen: boolean; label: string; color: string } {
  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = days[now.getDay()]
  const hours = openingHours[today]

  if (!hours || hours.toLowerCase() === 'closed') {
    return { isOpen: false, label: 'Closed', color: 'text-destructive' }
  }

  // Simple time parsing — handles "9:00 AM – 5:00 PM" format
  const match = hours.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*[–-]\s*(\d{1,2}:\d{2}\s*[AP]M)/i)
  if (!match) return { isOpen: true, label: 'See hours', color: 'text-muted-foreground' }

  try {
    const parseTime = (t: string) => {
      const [time, period] = t.trim().split(/\s+/)
      const [h, m] = time.split(':').map(Number)
      let hour = h
      if (period?.toUpperCase() === 'PM' && h !== 12) hour += 12
      if (period?.toUpperCase() === 'AM' && h === 12) hour = 0
      return hour * 60 + m
    }
    const nowMins = now.getHours() * 60 + now.getMinutes()
    const openMins = parseTime(match[1])
    const closeMins = parseTime(match[2])

    if (nowMins >= openMins && nowMins < closeMins) {
      return { isOpen: true, label: 'Open now', color: 'text-success' }
    }
    return { isOpen: false, label: 'Closed now', color: 'text-destructive' }
  } catch {
    return { isOpen: true, label: 'See hours', color: 'text-muted-foreground' }
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { city: cityParam, slug } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      listing_services(*),
      listing_materials(*),
      listing_socials(*),
      listing_reviews(*),
      listing_images(*)
    `)
    .eq('slug', slug)
    .single()

  if (!listing) notFound()

  const typed = listing as unknown as ListingWithRelations

  const PLACEHOLDER_IMAGES = [
    '/images/clinic-placeholder-1.png',
    '/images/clinic-placeholder-2.png',
    '/images/clinic-placeholder-3.png',
  ]
  const hasRealImages = typed.listing_images && typed.listing_images.length > 0

  // Parse opening hours
  let openingHours: Record<string, string> = {}
  if (typed.opening_hours) {
    openingHours = typeof typed.opening_hours === 'string'
      ? JSON.parse(typed.opening_hours)
      : typed.opening_hours
  }

  const openStatus = Object.keys(openingHours).length > 0 ? getOpenStatus(openingHours) : null
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]

  // LocalBusiness JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: typed.title,
    url: typed.website || canonicalUrl(`/uk/${cityParam}/${slug}`),
    telephone: typed.phone,
    email: typed.email,
    description: typed.description,
    ...(typed.logo_url && { logo: typed.logo_url }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: typed.street,
      addressLocality: typed.city,
      addressCountry: 'GB',
    },
    ...(typed.google_rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: typed.google_rating,
        reviewCount: typed.google_review_count || 1,
      },
    }),
    ...(typed.latitude && typed.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: typed.latitude,
        longitude: typed.longitude,
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageViewTracker listingId={typed.id} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'United Kingdom', href: '/uk' },
            { label: typed.city, href: `/uk/${cityParam}` },
            { label: typed.title },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ═══ Main content ═══ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {typed.treatment_category && (
                  <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                    {TREATMENT_CATEGORY_LABELS[typed.treatment_category] || typed.treatment_category}
                  </span>
                )}
                {typed.claimed ? (
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-0.5 text-xs font-semibold text-success">
                    <BadgeCheck className="h-3 w-3" /> Verified Listing
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full border border-dashed border-amber-400/50 bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-400/30">
                    Unclaimed
                  </span>
                )}
                {typed.men_women_both && (
                  <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                    <Users className="h-3 w-3" /> {typed.men_women_both}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {typed.logo_url && (
                  <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-border shadow-sm">
                    <Image
                      src={typed.logo_url}
                      alt={`${typed.title} logo`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{typed.title}</h1>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                {typed.street && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-primary/60" />
                    {typed.street}, {typed.city}
                  </span>
                )}
                {typed.google_rating && (
                  <span className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < Math.round(typed.google_rating!)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-muted text-muted'
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">{typed.google_rating}</span>
                    ({typed.google_review_count} reviews)
                  </span>
                )}
                {openStatus && (
                  <span className={`flex items-center gap-1.5 font-medium ${openStatus.color}`}>
                    <span className={`h-2 w-2 rounded-full ${openStatus.isOpen ? 'bg-success' : 'bg-destructive'} animate-pulse`} />
                    {openStatus.label}
                  </span>
                )}
              </div>

              {/* Image Gallery */}
              <section className="mt-6">
                {hasRealImages ? (
                  <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 rounded-2xl overflow-hidden">
                    {typed.listing_images.slice(0, 6).map((img, idx) => (
                      <div
                        key={img.id}
                        className={cn(
                          'relative overflow-hidden bg-muted group/img cursor-pointer',
                          idx === 0 ? 'col-span-2 row-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                        )}
                      >
                        <Image
                          src={img.storage_path}
                          alt={img.alt_text || `${typed.title} photo ${idx + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                          sizes={idx === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-8">
                    <div className="grid gap-3 grid-cols-3">
                      {PLACEHOLDER_IMAGES.map((src, idx) => (
                        <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={src}
                            alt="Clinic placeholder"
                            fill
                            className="object-cover opacity-30"
                            sizes="33vw"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 text-center">
                      <p className="text-sm text-muted-foreground">
                        This clinic hasn&apos;t added photos yet
                      </p>
                      {!typed.claimed && (
                        <Link
                          href={`/claim/${typed.slug}`}
                          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                          Claim to add your photos
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Description */}
            {typed.description && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {typed.description}
                </p>
              </section>
            )}

            {/* Services */}
            {typed.listing_services && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Services</h2>
                <ServiceBadges services={typed.listing_services} />
              </section>
            )}

            {/* Opening hours */}
            {Object.keys(openingHours).length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" /> Opening Hours
                </h2>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <dl className="space-y-2 text-sm">
                    {days.map((day) => {
                      const hours = openingHours[day];
                      if (!hours) return null;
                      const isToday = day === todayName;
                      return (
                        <div
                          key={day}
                          className={cn(
                            'flex items-center justify-between rounded-lg px-3 py-2 transition-colors',
                            isToday && 'bg-primary/5 ring-1 ring-primary/10'
                          )}
                        >
                          <dt className={cn(
                            'font-medium',
                            isToday ? 'text-primary' : 'text-card-foreground'
                          )}>
                            {day}
                            {isToday && (
                              <span className="ml-2 text-[10px] uppercase tracking-wider font-semibold text-primary/70">
                                Today
                              </span>
                            )}
                          </dt>
                          <dd className={cn(
                            isToday ? 'text-primary font-medium' : 'text-muted-foreground'
                          )}>
                            {hours}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </section>
            )}

            {/* Reviews */}
            {typed.listing_reviews && typed.listing_reviews.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-semibold text-foreground">
                    Reviews ({typed.listing_reviews.length})
                  </h2>
                  <GoogleAttribution />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {typed.listing_reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ═══ Sidebar ═══ */}
          <aside className="space-y-6">
            {/* Contact card */}
            <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 sticky top-20 overflow-hidden">
              {/* Gradient top border */}
              <div className="h-1 bg-gradient-to-r from-primary via-primary-hover to-accent" />

              <div className="p-6">
                <h2 className="text-lg font-semibold text-card-foreground mb-5">
                  Contact {typed.title}
                </h2>

                {/* Enquiry form */}
                <div className="mb-6">
                  <ContactForm listingId={typed.id} clinicName={typed.title} freeConsultation={!!typed.free_consultation} />
                </div>

                {/* Quick facts */}
                <div className="border-t border-border pt-5 mb-6 space-y-3 text-sm">
                  {typed.pricing_tier && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Price range</span>
                      <span className="font-semibold text-card-foreground bg-primary/5 rounded-md px-2 py-0.5">{typed.pricing_tier}</span>
                    </div>
                  )}
                  {typed.free_consultation && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Free consultation</span>
                      <span className="font-medium text-success">{typed.free_consultation}</span>
                    </div>
                  )}
                  {typed.has_private_room && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Private room</span>
                      <span className="font-medium text-success flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Website & Directions links */}
                <div className="border-t border-border pt-5 space-y-3">
                  {typed.website && (
                    <ClickTracker listingId={typed.id} eventType="website_click">
                      <a
                        href={typed.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border p-3.5 text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 hover:shadow-sm"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-card-foreground font-medium truncate">Visit website</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                      </a>
                    </ClickTracker>
                  )}
                  {typed.google_maps_url && (
                    <a
                      href={typed.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border p-3.5 text-sm transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Navigation className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-card-foreground font-medium">Get directions</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Claim CTA */}
            {!typed.claimed && (
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/[0.03] p-6 text-center">
                <Scissors className="mx-auto h-6 w-6 text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground mb-1">Is this your clinic?</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Claim this listing to manage your profile and respond to enquiries.
                </p>
                <Link
                  href={`/claim/${typed.slug}`}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md"
                >
                  Claim Listing
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
