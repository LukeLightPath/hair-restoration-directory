import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Heart, Users, Globe, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'About Hair Restoration Guide',
  description: 'What Hair Restoration Guide is about and why we built it. The UK\'s directory for finding trusted non-surgical hair restoration clinics.',
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Hair Restoration Guide',
            url: process.env.NEXT_PUBLIC_SITE_URL,
            description: 'The UK\'s most comprehensive directory for non-surgical hair restoration clinics.',
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

        {/* Hero */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              <Users className="h-3 w-3" /> Our Story
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Helping people find the right{' '}
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                hair restoration
              </span>{' '}
              clinic
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We built Hair Restoration Guide because there was no single, reliable place for
              people experiencing hair loss to compare clinics, read genuine reviews, and make
              a proper decision about treatment. So we made one.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Client First',
                description: 'Everything here is built to help people find the right clinic. No hidden agendas, no pay-to-play rankings.',
              },
              {
                icon: Shield,
                title: 'Transparent & Honest',
                description: 'We show real Google reviews and ratings. Clinics can\'t pay to move up the rankings. What you see is genuine.',
              },
              {
                icon: Globe,
                title: 'UK Coverage',
                description: 'From London to Edinburgh, we cover 175+ cities across the United Kingdom with 400+ clinics listed.',
              },
            ].map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we help clinics */}
        <section className="mb-16 rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-foreground mb-4">For Clinic Owners</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            We think a good directory should work for everyone. Clinics can claim their listing
            for free, update their profile, reply to enquiries, and see how many clients are
            finding them through our platform.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md"
          >
            Claim Your Listing <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-10">
          <h2 className="text-2xl font-semibold text-foreground mb-3">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Questions, feedback, or a partnership enquiry? Drop us a line.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all hover:shadow-sm"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </>
  )
}
