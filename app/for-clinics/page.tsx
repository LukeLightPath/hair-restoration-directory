import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Search,
  ShieldCheck,
  MessageSquare,
  Eye,
  Camera,
  BarChart3,
  Globe,
  MapPin,
  Star,
  Users,
  CheckCircle,
  XCircle,
  ChevronDown,

  TrendingUp,
  Award,
  Scissors,
} from 'lucide-react'
import Breadcrumbs from '@/components/breadcrumbs'
import { createClient } from '@/lib/supabase/server'
import ForClinicsFaq from '@/components/for-clinics-faq'

export const metadata: Metadata = {
  title: 'List Your Clinic for Free',
  description:
    'Claim your free listing on Hair Restoration Guide. Get found by clients, receive enquiries and track your performance. Takes less than five minutes.',
}

export default async function ForClinicsPage() {
  const supabase = await createClient()

  // Get live stats
  const { count: totalListings } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  const { data: cityData } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  const uniqueCities = new Set((cityData || []).map((r) => r.city)).size

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'List Your Clinic for Free | Hair Restoration Guide',
            description: metadata.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/for-clinics`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Hair Restoration Guide',
              url: process.env.NEXT_PUBLIC_SITE_URL,
            },
          }),
        }}
      />

      {/* ═══ Breadcrumbs ═══ */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'For Clinics' }]} />
      </div>

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 50%, #0F2A2B 100%)',
          }}
        />
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl animate-float" />
        <div
          className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm mb-6 animate-fade-in">
              <Scissors className="h-3.5 w-3.5" />
              For Clinic Owners
            </span>

            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-[3.5rem] xl:leading-[1.15] animate-fade-in">
              Grow Your Clinic With{' '}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Hair Restoration Guide
              </span>
            </h1>

            <p
              className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl animate-fade-in"
              style={{ animationDelay: '150ms' }}
            >
              People across the UK are actively searching for hair restoration clinics right now.
              Make sure they find yours. Claim your listing and start connecting with high-intent
              clients who are ready to book.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row gap-3 animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
              >
                Claim Your Listing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
              >
                Get in Touch
              </Link>
            </div>

            {/* Quick trust stats */}
            <div
              className="mt-12 flex flex-wrap gap-8 text-sm text-white/60 animate-slide-up"
              style={{ animationDelay: '450ms' }}
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-4 w-4 text-white/70" />
                </span>
                <span>
                  <strong className="text-white">{uniqueCities}+</strong> UK locations
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Users className="h-4 w-4 text-white/70" />
                </span>
                <span>
                  <strong className="text-white">{totalListings || 400}+</strong> clinics listed
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <TrendingUp className="h-4 w-4 text-white/70" />
                </span>
                <span>
                  <strong className="text-white">Growing</strong> monthly traffic
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ The Problem ═══ */}
      <section className="py-16 sm:py-20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-4">
              <Search className="h-3 w-3" /> The Opportunity
            </span>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Your Next Client Is Searching Right Now
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Thousands of people in the UK search for hair restoration services every month.
              They&apos;re comparing clinics, reading reviews and deciding who to trust with one
              of the most personal decisions they&apos;ll make. If your clinic isn&apos;t visible
              where they&apos;re looking, you&apos;re leaving consultations on the table.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Benefits Grid ═══ */}
      <section className="py-20 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              <Award className="h-3 w-3" /> Why List With Us
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Everything You Need to Attract More Clients
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Hair Restoration Guide puts your clinic in front of the people who matter most: those actively looking for your services.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Get Found Online',
                description:
                   'Your clinic appears in search results for hair restoration in your area. We handle the SEO so your listing ranks where clients are looking.',
                gradient: 'from-primary/10 to-primary/5',
                color: 'text-primary',
              },
              {
                icon: ShieldCheck,
                title: 'Build Trust Instantly',
                description:
                  'Claimed listings display a verified badge, real Google reviews and a complete profile. These are the trust signals clients need before making contact.',
                gradient: 'from-emerald-500/10 to-emerald-500/5',
                color: 'text-emerald-500',
              },
              {
                icon: MessageSquare,
                title: 'Receive Enquiries Directly',
                description:
                  'When a client sends an enquiry through your listing, it comes straight to your inbox. No middleman, no delay. Just a warm lead ready to book.',
                gradient: 'from-blue-500/10 to-blue-500/5',
                color: 'text-blue-500',
              },
              {
                icon: Camera,
                title: 'Showcase Your Work',
                description:
                  'Upload photos, highlight your specialisms and tell your story. Clients can see exactly what makes your clinic different before they get in touch.',
                gradient: 'from-rose-500/10 to-rose-500/5',
                color: 'text-rose-500',
              },
              {
                icon: BarChart3,
                title: 'Track Your Performance',
                description:
                  'See how many people are viewing your profile, clicking through to your website and sending enquiries. All from your dashboard.',
                gradient: 'from-amber-500/10 to-amber-500/5',
                color: 'text-amber-500',
              },
              {
                icon: Star,
                title: 'Stand Out From the Crowd',
                description:
                  'A complete, verified listing with photos and detailed service information consistently outperforms basic entries in search and trust.',
                gradient: 'from-purple-500/10 to-purple-500/5',
                color: 'text-purple-500',
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/20"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
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
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Get Listed in Three Steps
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Claiming your listing takes less than five minutes. Here&apos;s how it works.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {[
              {
                icon: Search,
                title: 'Find Your Clinic',
                description:
                  'Search for your clinic in our directory. If you\'re already listed, you\'ll see your existing profile ready to claim.',
                gradient: 'from-primary/10 to-primary/5',
              },
              {
                icon: ShieldCheck,
                title: 'Claim & Verify',
                description:
                  'Create your account and verify ownership. Once verified, you\'ll receive a "Verified" badge that builds client confidence.',
                gradient: 'from-emerald-500/10 to-emerald-500/5',
              },
              {
                icon: MessageSquare,
                title: 'Start Receiving Enquiries',
                description:
                  'Complete your profile with photos and service details. Enquiries from potential clients will arrive directly in your inbox.',
                gradient: 'from-blue-500/10 to-blue-500/5',
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
                <div
                  className={`mx-auto mt-2 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient}`}
                >
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Claimed vs Unclaimed Comparison ═══ */}
      <section className="py-20 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              <Eye className="h-3 w-3" /> What You Get
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Unclaimed vs. Claimed Listing
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              See the difference claiming your listing makes. A claimed profile gives clients
              every reason to choose you.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-3 border-b border-border">
                <div className="p-4 sm:p-5">
                  <span className="text-sm font-semibold text-muted-foreground">Feature</span>
                </div>
                <div className="p-4 sm:p-5 text-center border-l border-border">
                  <span className="text-sm font-semibold text-muted-foreground">Unclaimed</span>
                </div>
                <div className="p-4 sm:p-5 text-center border-l border-border bg-primary/5">
                  <span className="text-sm font-semibold text-primary">Claimed</span>
                </div>
              </div>

              {/* Feature rows */}
              {[
                { feature: 'Business name & address', unclaimed: true, claimed: true },
                { feature: 'Google rating displayed', unclaimed: true, claimed: true },
                { feature: 'Verified badge', unclaimed: false, claimed: true },
                { feature: 'Photo gallery', unclaimed: false, claimed: true },
                { feature: 'Full service list', unclaimed: false, claimed: true },
                { feature: 'Custom description', unclaimed: false, claimed: true },
                { feature: 'Receive client enquiries', unclaimed: false, claimed: true },
                { feature: 'Performance analytics', unclaimed: false, claimed: true },
                { feature: 'Respond to enquiries', unclaimed: false, claimed: true },
                { feature: 'Website link displayed', unclaimed: false, claimed: true },
              ].map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? '' : 'bg-muted/30'} ${
                    i < 9 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="p-4 sm:p-5 flex items-center">
                    <span className="text-sm text-foreground">{row.feature}</span>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-center border-l border-border">
                    {row.unclaimed ? (
                      <CheckCircle className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-center border-l border-border bg-primary/5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.98]"
              >
                Claim Your Listing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about listing your clinic.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ForClinicsFaq />
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-20 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #3B1E20 0%, #2A1517 50%, #1F1012 100%)',
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 h-48 w-48 rounded-bl-full bg-accent/20 animate-float" />
            <div
              className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-full bg-primary/15 animate-float"
              style={{ animationDelay: '3s' }}
            />
            <div className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-white/3 blur-xl" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3.5 py-1 text-xs font-semibold text-white/80 uppercase tracking-wider mb-5">
                <TrendingUp className="h-3 w-3" /> Ready to Grow?
              </span>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Your Clients Are Looking for You
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto leading-relaxed text-lg">
                Join {totalListings || 400}+ clinics already listed on Hair Restoration Guide.
                Claim your profile, complete your listing and start receiving enquiries from
                clients in your area.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                >
                  Claim Your Listing <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
