import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, ExternalLink, ArrowRight, Search, Ribbon, Brain, Award, Users } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Charities & Support Organisations | Hair Loss Help UK',
  description:
    'Trusted UK charities and support organisations for people experiencing hair loss. Find help from Alopecia UK, Macmillan, Cancer Hair Care, CALM and more.',
  alternates: {
    canonical: canonicalUrl('/support'),
  },
  openGraph: {
    title: 'Charities & Support Organisations | Hair Restoration Guide',
    description:
      'Trusted UK charities and support organisations for people experiencing hair loss.',
    url: canonicalUrl('/support'),
    type: 'website',
  },
}

/* ── Organisation data ── */

interface Organisation {
  name: string
  url: string
  description: string
  contact?: string
}

interface Category {
  title: string
  icon: typeof Heart
  colour: string
  bgColour: string
  organisations: Organisation[]
}

const CATEGORIES: Category[] = [
  {
    title: 'Hair Loss Charities',
    icon: Heart,
    colour: 'text-rose-600 dark:text-rose-400',
    bgColour: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800',
    organisations: [
      {
        name: 'Alopecia UK',
        url: 'https://www.alopecia.org.uk',
        description:
          'The UK\'s leading alopecia charity. Offers peer support groups, information on all types of alopecia, a service directory and resources for men, women and children.',
        contact: 'info@alopecia.org.uk · 0800 101 7025',
      },
      {
        name: 'Alopecia Awareness',
        url: 'https://www.alopecia-awareness.org.uk',
        description:
          'Provides information and runs support groups for people experiencing alopecia across the UK. Works closely with the BeBold Support Group and the Alopecia Areata Support Group.',
      },
      {
        name: 'Scarring Alopecia Foundation',
        url: 'https://www.scarringalopecia.org',
        description:
          'Offers virtual support including regular online meetups for individuals diagnosed with scarring (cicatricial) alopecia. UK meetups take place quarterly.',
      },
      {
        name: 'VTCT Foundation',
        url: 'https://www.vtctfoundation.org.uk',
        description:
          'A grant-making foundation dedicated to improving the lives of people living with a visible difference, including alopecia. Funds research and service provision.',
      },
    ],
  },
  {
    title: 'Cancer & Medical Hair Loss',
    icon: Ribbon,
    colour: 'text-purple-600 dark:text-purple-400',
    bgColour: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
    organisations: [
      {
        name: 'Macmillan Cancer Support',
        url: 'https://www.macmillan.org.uk',
        description:
          'Comprehensive cancer support including dedicated hair loss coping resources, wig guidance, emotional support and a free helpline.',
        contact: '0808 808 00 00',
      },
      {
        name: 'Cancer Research UK',
        url: 'https://www.cancerresearchuk.org',
        description:
          'The UK\'s leading cancer research charity. Provides detailed information on hair loss during and after cancer treatment, including practical coping advice.',
      },
      {
        name: 'Cancer Hair Care',
        url: 'https://www.cancerhaircare.co.uk',
        description:
          'The UK\'s leading hair loss support charity for cancer patients. Offers free consultations, workshops, hair care packs and a directory of suppliers and services.',
      },
      {
        name: 'My New Hair',
        url: 'https://www.mynewhair.org',
        description:
          'Founded by Trevor Sorbie MBE. Trains hairdressers to support cancer patients with wig cutting, styling and aftercare. Find a trained salon through their salon finder.',
      },
      {
        name: 'Hair Reborn',
        url: 'https://www.hairreborn.uk',
        description:
          'Provides free haircare support and complimentary hairdressing appointments for individuals undergoing chemotherapy. Operates a network of trained salons across the UK.',
      },
      {
        name: 'Little Princess Trust',
        url: 'https://www.littleprincesses.org.uk',
        description:
          'Provides free real-hair wigs to children and young people up to 24 who have lost their hair due to cancer treatment or other conditions. Also funds childhood cancer research.',
      },
      {
        name: 'Look Good Feel Better',
        url: 'https://www.lookgoodfeelbetter.co.uk',
        description:
          'Runs free confidence-boosting skincare and makeup workshops across the UK for people living with cancer, including sessions focused on hair loss and scalp care.',
      },
      {
        name: 'Maggie\'s Centres',
        url: 'https://www.maggies.org',
        description:
          'Free cancer support centres across the UK offering specialist advice, emotional support and practical information. A warm, welcoming place to talk.',
      },
    ],
  },
  {
    title: 'Mental Health & Wellbeing',
    icon: Brain,
    colour: 'text-sky-600 dark:text-sky-400',
    bgColour: 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800',
    organisations: [
      {
        name: 'CALM (Campaign Against Living Miserably)',
        url: 'https://www.thecalmzone.net',
        description:
          'Leading charity focused on preventing male suicide. Runs a helpline, webchat and the CALM Body Talks series covering body image topics including hair loss.',
        contact: '0800 58 58 58 (5pm to midnight, daily)',
      },
      {
        name: 'Andy\'s Man Club',
        url: 'https://www.andysmanclub.co.uk',
        description:
          'Free peer-to-peer support groups for men across the UK. A safe, non-judgmental space to talk about anything affecting your wellbeing, including body image and self-confidence.',
      },
      {
        name: 'Mind',
        url: 'https://www.mind.org.uk',
        description:
          'Information and support for mental health problems including body dysmorphic disorder and low self-esteem. Runs a helpline and local support groups.',
        contact: '0300 123 3393',
      },
      {
        name: 'Samaritans',
        url: 'https://www.samaritans.org',
        description:
          'Confidential emotional support available 24 hours a day, 365 days a year. Whatever you\'re going through, you can call them any time.',
        contact: '116 123 (free, 24/7)',
      },
    ],
  },
  {
    title: 'Professional Bodies',
    icon: Award,
    colour: 'text-amber-600 dark:text-amber-400',
    bgColour: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
    organisations: [
      {
        name: 'The Institute of Trichologists',
        url: 'https://www.trichologists.org.uk',
        description:
          'The UK\'s foremost association for trichology, accredited by the Professional Standards Authority. Maintains a register of qualified trichologists searchable by location.',
      },
      {
        name: 'British Hair & Nail Society',
        url: 'https://bhns.org.uk',
        description:
          'Promotes education and research into hair and nail disorders. Provides patient information leaflets and a "Find a Specialist" tool for locating dermatologists.',
      },
      {
        name: 'British Association of Dermatologists',
        url: 'https://www.bad.org.uk',
        description:
          'The professional body for dermatologists in the UK. Their Skin Health Info hub offers peer-reviewed patient information leaflets on alopecia and other hair conditions.',
      },
      {
        name: 'British Skin Foundation',
        url: 'https://www.britishskinfoundation.org.uk',
        description:
          'Funds research into all types of skin disease, including conditions that cause hair loss. Shares personal stories and raises awareness of the psychological impact of skin and hair conditions.',
      },
    ],
  },
  {
    title: 'Information & Family Support',
    icon: Users,
    colour: 'text-emerald-600 dark:text-emerald-400',
    bgColour: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
    organisations: [
      {
        name: 'Contact (for families with disabled children)',
        url: 'https://www.contact.org.uk',
        description:
          'Provides information, advice and support for families whose children are affected by a disability or medical condition, including alopecia.',
      },
      {
        name: 'Disability Information Scotland',
        url: 'https://www.disabilityscot.org.uk',
        description:
          'A national information service listing support organisations by condition, including alopecia resources for people living in Scotland.',
      },
      {
        name: 'NHS Hair Loss Information',
        url: 'https://www.nhs.uk/conditions/hair-loss/',
        description:
          'The NHS overview of hair loss causes, when to see your GP and available treatments including medication and wigs available through the NHS.',
      },
    ],
  },
]

export default function SupportPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Charities & Support Organisations',
    description:
      'Trusted UK charities and support organisations for people experiencing hair loss.',
    url: canonicalUrl('/support'),
    publisher: {
      '@type': 'Organization',
      name: 'Hair Restoration Guide',
      url: SITE,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Support & Charities' }]} />

        {/* Hero */}
        <section className="mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              <Heart className="h-3 w-3" /> Support & Resources
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Charities & support{' '}
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                organisations
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Hair loss affects millions of people across the UK. Whether you're dealing with
              alopecia, going through cancer treatment or struggling with how hair loss is
              affecting your confidence, these organisations offer free support, advice and community.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We work alongside these charities and professional bodies to help people find the right support.
              If you represent an organisation that should be listed here,{' '}
              <Link href="/contact" className="text-primary hover:underline">get in touch</Link>.
            </p>
          </div>
        </section>

        {/* Categories */}
        {CATEGORIES.map((category) => (
          <section key={category.title} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                category.bgColour.split(' ').filter(c => c.startsWith('bg-') || c.startsWith('dark:bg-')).join(' ')
              }`}>
                <category.icon className={`h-5 w-5 ${category.colour}`} />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {category.organisations.map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${category.bgColour}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors pr-2">
                      {org.name}
                    </h3>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {org.description}
                  </p>
                  {org.contact && (
                    <p className="text-xs font-medium text-muted-foreground">
                      {org.contact}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="rounded-2xl overflow-hidden shadow-lg shadow-primary/5 mt-8 mb-12">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Search className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find a Clinic Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Looking for non-surgical hair restoration? Browse UK clinics by location,
                compare reviews and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  Search Clinics
                  <Search className="h-4 w-4" />
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  Read Our Guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
