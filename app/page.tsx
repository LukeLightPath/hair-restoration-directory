import Link from 'next/link'
import { Search, MapPin, Star, ArrowRight, Shield, Zap, Heart, CheckCircle, Users, Award, Scissors, TrendingUp, SlidersHorizontal, UserX } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import ClinicCard from '@/components/clinic-card'
import { SERVICE_LABELS } from '@/lib/types'
import type { Listing, ListingServices, ListingImage } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured clinics
  const { data: featuredListings } = await supabase
    .from('listings')
    .select('*')
    .eq('featured', true)
    .eq('business_status', 'OPERATIONAL')
    .order('google_rating', { ascending: false })
    .limit(6)

  // Fetch all featured listing services
  const featuredIds = (featuredListings || []).map(l => l.id)
  const { data: featuredServices } = featuredIds.length > 0
    ? await supabase
        .from('listing_services')
        .select('*')
        .in('listing_id', featuredIds)
    : { data: [] }

  // If no featured, get top-rated
  let displayListings = featuredListings || []
  let displayServices = featuredServices || []
  if (displayListings.length === 0) {
    const { data: topRated } = await supabase
      .from('listings')
      .select('*')
      .eq('business_status', 'OPERATIONAL')
      .not('google_rating', 'is', null)
      .order('google_rating', { ascending: false })
      .limit(6)
    displayListings = topRated || []

    const topIds = displayListings.map(l => l.id)
    if (topIds.length > 0) {
      const { data: topSvc } = await supabase
        .from('listing_services')
        .select('*')
        .in('listing_id', topIds)
      displayServices = topSvc || []
    }
  }

  // Fetch images for display listings
  const displayIds = displayListings.map(l => l.id)
  let displayImages: ListingImage[] = []
  if (displayIds.length > 0) {
    const { data: imgData } = await supabase
      .from('listing_images')
      .select('*')
      .in('listing_id', displayIds)
      .order('sort_order', { ascending: true })
    displayImages = (imgData || []) as ListingImage[]
  }

  // Build services map
  const servicesMap: Record<string, string[]> = {}
  for (const svc of displayServices) {
    const active = Object.entries(svc)
      .filter(([key, val]) => key !== 'listing_id' && val === true)
      .map(([key]) => SERVICE_LABELS[key] || key)
    servicesMap[svc.listing_id] = active
  }

  // Build images map
  const imagesMap: Record<string, ListingImage[]> = {}
  for (const img of displayImages) {
    if (!imagesMap[img.listing_id]) imagesMap[img.listing_id] = []
    imagesMap[img.listing_id].push(img)
  }

  // Fetch city counts
  const { data: cityCounts } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')

  const cityMap = new Map<string, number>()
  for (const row of cityCounts || []) {
    cityMap.set(row.city, (cityMap.get(row.city) || 0) + 1)
  }
  const topCities = Array.from(cityMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  // Total stats
  const totalListings = cityCounts?.length || 0
  const totalCities = cityMap.size

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Hair Restoration Guide',
            url: process.env.NEXT_PUBLIC_SITE_URL,
            description: 'The UK\'s most comprehensive directory for non-surgical hair restoration clinics.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden gradient-mesh">
        {/* Decorative orbs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-jade/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            {/* Floating badge */}
            <div className="mb-6 animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
                <Scissors className="h-3.5 w-3.5" />
                The UK&apos;s #1 Hair Restoration Directory
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.1] animate-fade-in">
              Find Your Perfect{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent">
                  Hair Restoration
                </span>
              </span>{' '}
              Clinic
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl animate-fade-in font-light sm:text-xl" style={{ animationDelay: '150ms' }}>
              The UK&apos;s most detailed directory for non-surgical hair restoration.
              Compare {totalListings}+ clinics across {totalCities} cities, check real reviews,
              and book a free consultation.
            </p>

            {/* Search bar */}
            <div className="mt-10 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <form action="/search" method="get" className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    name="q"
                    type="text"
                    placeholder="Search by city, clinic name, or service..."
                    className="w-full rounded-2xl border border-input bg-card/80 backdrop-blur-sm pl-12 pr-4 py-4 text-base text-foreground placeholder:text-muted-foreground shadow-lg shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-ring focus:shadow-xl transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-accent px-7 py-4 font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 active:scale-[0.98] shrink-0"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '450ms' }}>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <span><strong className="text-foreground">{totalCities}</strong> cities</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10">
                  <Star className="h-4 w-4 text-amber-500" />
                </span>
                <span><strong className="text-foreground">{totalListings}+</strong> clinics</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                  <Shield className="h-4 w-4 text-success" />
                </span>
                <span><strong className="text-foreground">Free</strong> for clinics</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Trust Pillars ═══ */}
      <section className="border-y border-border/40 py-8 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Star, label: 'Real Reviews', desc: 'Verified Google ratings', color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: CheckCircle, label: 'Verified Clinics', desc: 'UK-registered providers', color: 'text-success', bg: 'bg-success/10' },
              { icon: SlidersHorizontal, label: 'Search, Filter, Done', desc: 'Find by city, service or category', color: 'text-rose-500', bg: 'bg-rose-500/10' },
              { icon: UserX, label: 'No Sign-Up Needed', desc: 'Browse and enquire instantly', color: 'text-primary', bg: 'bg-primary/10' },
            ].map((pillar) => (
              <div
                key={pillar.label}
                className="group flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:glass-card-strong sm:text-left"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${pillar.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{pillar.label}</p>
                  <p className="text-xs text-muted-foreground">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              <TrendingUp className="h-3 w-3" /> Simple Process
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
              Three steps. That&apos;s all it takes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {[
              {
                icon: Search,
                title: 'Search',
                description: 'Browse clinics by city, service, or treatment type. Use filters to narrow things down.',
                gradient: 'from-primary/10 to-primary/5',
              },
              {
                icon: Star,
                title: 'Compare',
                description: 'Check real Google reviews, compare services and ratings and explore full clinic profiles.',
                gradient: 'from-amber-500/10 to-amber-500/5',
              },
              {
                icon: Heart,
                title: 'Get in Touch',
                description: 'Enquire directly from any clinic profile. One form, no account needed.',
                gradient: 'from-rose-500/10 to-rose-500/5',
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className={`timeline-connector animate-stagger-in relative rounded-2xl border border-border bg-card p-7 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/20`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-hover text-primary-foreground text-xs font-bold shadow-md shadow-primary/20">
                  {index + 1}
                </span>
                <div className={`mx-auto mt-2 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient}`}>
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Top Clinics ═══ */}
      {displayListings.length > 0 && (
        <section className="py-20 sm:py-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3">
                  <Award className="h-3 w-3" /> Highest Rated
                </span>
                <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Top-Rated Clinics</h2>
                <p className="mt-3 text-muted-foreground text-lg">Highly rated by real customers across the UK.</p>
              </div>
              <Link
                href="/uk"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors group"
              >
                View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayListings.map((listing: Listing) => (
                <ClinicCard
                  key={listing.id}
                  listing={listing}
                  services={servicesMap[listing.id]}
                  images={imagesMap[listing.id]}
                />
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link
                href="/uk"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                View all clinics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ Browse by City ═══ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <MapPin className="h-3 w-3" /> Nationwide
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Browse by City</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Find hair restoration clinics in {totalCities} cities across the UK.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {topCities.map(([city, count]) => (
              <Link
                key={city}
                href={`/uk/${citySlug(city)}`}
                className="group rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 mb-3 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                  <MapPin className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary group-hover:animate-bounce-subtle" />
                </div>
                <p className="font-medium text-card-foreground text-sm">{city}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {count} clinic{count !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/uk"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-md group"
            >
              View all {totalCities} cities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA for Clinic Owners ═══ */}
      <section className="py-20 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #3B1E20 0%, #2A1517 50%, #1F1012 100%)' }}>
            {/* Animated decorative elements */}
            <div className="absolute top-0 right-0 h-48 w-48 rounded-bl-full bg-accent/20 animate-float" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-primary/15 animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-white/3 blur-xl" />

            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3.5 py-1 text-xs font-semibold text-white/80 uppercase tracking-wider mb-5">
                <Zap className="h-3 w-3" /> For Clinic Owners
              </span>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Own a Hair Restoration Clinic?
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto leading-relaxed text-lg">
                Claim your free listing on Hair Restoration Guide. Update your profile,
                reply to enquiries and get found by more clients.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4" />
                  Claim Your Listing
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
