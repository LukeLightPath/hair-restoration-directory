import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  FileText, TrendingUp, Pill,
  Monitor, Scissors, FlaskConical
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'UK Hair Restoration Market in 2026: Where the Industry Is Heading',
  description:
    'The UK hair restoration market hit $121.6M in 2023 and is projected to reach $396M by 2030. Here\'s what\'s driving the growth and the trends shaping the industry.',
  alternates: {
    canonical: canonicalUrl('/blog/uk-hair-restoration-market-2026'),
  },
  openGraph: {
    title: 'UK Hair Restoration Market 2026: Industry Trends | Hair Restoration Guide',
    description:
      'Market size, growth projections and the five trends reshaping hair loss treatment in the UK. Data from Grand View Research, Mordor Intelligence and more.',
    url: canonicalUrl('/blog/uk-hair-restoration-market-2026'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'How big is the UK hair restoration market?',
    answer:
      'The UK market generated $121.6 million (roughly £97 million) in revenue in 2023, according to Grand View Research. It is projected to grow to $396 million (roughly £316 million) by 2030, at a compound annual growth rate of 18.4%. That makes the UK the fastest-growing hair restoration market in Europe.',
  },
  {
    question: 'What is driving the growth?',
    answer:
      'Three main factors: growing social acceptance of hair treatments (largely driven by social media normalising the conversation), advances in non-surgical technology (systems, SMP, PRP), and an ageing population with more disposable income to spend on appearance. The rise of affordable online pharmacies for finasteride and minoxidil has also brought more people into the market.',
  },
  {
    question: 'Is non-surgical treatment growing faster than surgery?',
    answer:
      'Yes. Non-surgical treatments are the fastest-growing segment in the UK market. PRP therapy was the leading revenue-generating therapy in 2023, and demand for hair systems, SMP and trichology consultations continues to rise. Surgical transplants still generate significant revenue but are growing more slowly in comparison.',
  },
  {
    question: 'Will AI replace hair loss consultations?',
    answer:
      'Not replace, but change them. AI diagnostic tools can analyse scalp photos and predict hair loss progression with high accuracy, which helps clinicians make faster and more precise diagnoses. By 2026, these tools are expected to be standard in most mid-tier and premium clinics. But the treatment decision and human judgement behind it will still need a qualified practitioner.',
  },
  {
    question: 'Are hair transplant clinics regulated in the UK?',
    answer:
      'Surgical hair restoration clinics in England must be registered with the Care Quality Commission (CQC). Surgeons must be registered with the General Medical Council (GMC). Non-surgical clinics do not have the same legal requirement, though voluntary accreditation bodies like the Institute of Trichologists and BAHRS provide additional quality assurance.',
  },
  {
    question: 'What does this mean for consumers?',
    answer:
      'More choice and more competition generally mean better outcomes for consumers: more clinics, better technology, and downward pressure on pricing for some treatments. But it also means more clinics entering the market with varying quality levels. Our guide on spotting bad clinics covers what to look for.',
  },
]

export default function MarketTrends2026Page() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UK Hair Restoration Market in 2026: Where the Industry Is Heading',
    description:
      'The UK hair restoration market hit $121.6M in 2023 and is projected to reach $396M by 2030. What is driving the growth and the trends shaping the industry.',
    url: canonicalUrl('/blog/uk-hair-restoration-market-2026'),
    datePublished: '2026-03-21',
    dateModified: '2026-03-21',
    author: {
      '@type': 'Organization',
      name: 'Hair Restoration Guide',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hair Restoration Guide',
      url: SITE,
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'UK Hair Restoration Market 2026' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <FileText className="h-3 w-3" /> Industry Report
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            UK Hair Restoration Market in 2026: Where the Industry Is Heading
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The UK hair restoration market is the fastest-growing in 
            Europe, with revenue projected to more than triple between 
            2023 and 2030. Here&apos;s what the numbers look like, where 
            the growth is coming from and the five trends shaping the 
            industry right now.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 10 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'market-size', label: 'The UK Market in Numbers' },
              { id: 'global-context', label: 'How the UK Compares Globally' },
              { id: 'growth-drivers', label: 'What\'s Driving the Growth' },
              { id: 'five-trends', label: 'Five Trends Shaping 2026' },
              { id: 'consumer-impact', label: 'What This Means for Consumers' },
              { id: 'faqs', label: 'FAQs' },
            ].map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/8 text-[10px] font-bold text-primary group-hover:bg-primary/15 transition-colors">
                    {i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ═══ Content ═══ */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="market-size">
            <h2>The UK Market in Numbers</h2>
            <p>
              The UK hair restoration market generated $121.6 million 
              (approximately £97 million) in revenue in 2023 [1]. That 
              figure is projected to reach $396 million (roughly £316 
              million) by 2030, representing a compound annual growth 
              rate of 18.4% over the period [1].
            </p>
            <p>
              For context, the broader UK hair transplant market is 
              forecast to hit $800 million by 2035, growing at a CAGR 
              of 12.9% [2]. These projections make the UK the 
              fastest-growing hair restoration market in Europe.
            </p>
          </section>
        </div>

        {/* Market stat cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 my-8">
          {[
            { stat: '$121.6M', label: 'UK market revenue (2023)', source: '[1]' },
            { stat: '$396M', label: 'Projected UK market (2030)', source: '[1]' },
            { stat: '18.4%', label: 'UK CAGR 2024 – 2030', source: '[1]' },
            { stat: '#1', label: 'Fastest-growing in Europe', source: '[1]' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
              <TrendingUp className="mx-auto h-5 w-5 text-primary mb-2" />
              <p className="text-3xl font-bold text-foreground">{item.stat}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-2">{item.source}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Within the UK market, PRP therapy was the leading 
            revenue-generating treatment in 2023 [1]. Surgical hair 
            transplants still represent a significant chunk of revenue 
            overall, but non-surgical treatments are growing at a faster 
            rate.
          </p>

          <section id="global-context">
            <h2>How the UK Compares Globally</h2>
            <p>
              The global hair restoration market is estimated at $8.19 
              billion in 2026, forecast to reach $12.52 billion by 2031 [3]. 
              The broader hair loss treatment market, including medications 
              and supplements, exceeds $8.8 billion globally and is 
              growing at 5 to 7% annually depending on which segments 
              are included [4][5].
            </p>
          </section>
        </div>

        {/* Global comparison table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Market</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Size (2024 – 2025)</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Projected</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">CAGR</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { market: 'UK hair restoration', size: '~$140M', proj: '$396M by 2030', cagr: '18.4%' },
                { market: 'Global hair restoration', size: '~$8.19B', proj: '$12.52B by 2031', cagr: '~7%' },
                { market: 'Global hair loss treatments', size: '~$8.8B', proj: '$11.6B by 2030', cagr: '5 – 7%' },
                { market: 'Global alopecia treatment', size: '~$3.4B', proj: 'Growing', cagr: '3.9%' },
              ].map((row, i) => (
                <tr key={row.market} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.market}</td>
                  <td className="py-3 px-4">{row.size}</td>
                  <td className="py-3 px-4">{row.proj}</td>
                  <td className="py-3 px-4 font-medium text-primary">{row.cagr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources: Grand View Research [1], Mordor Intelligence [3], GM Insights [4], Straits Research [5]
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The UK&apos;s 18.4% CAGR stands out against the global average. 
            Several factors explain this: higher awareness driven by 
            social media, an established network of private clinics, 
            the normalisation of cosmetic treatments generally, and 
            the fact that the UK starting from a smaller base amplifies 
            the growth rate.
          </p>

          <section id="growth-drivers">
            <h2>What&apos;s Driving the Growth</h2>
            <p>
              Four forces are pushing the UK market upward. Each is 
              structural, not cyclical, which is why forecasters expect 
              the growth to sustain through the end of the decade.
            </p>
            <h3>1. Social media normalisation</h3>
            <p>
              Hair transplant diaries on YouTube, before-and-after posts 
              on Instagram, daily routine videos on TikTok. Hair 
              restoration has gone from something people hid to something 
              people document publicly. That shift in perception is the 
              single biggest driver of new demand, particularly among 
              men aged 25 to 40.
            </p>
            <h3>2. Non-surgical innovation</h3>
            <p>
              Treatments that don&apos;t require surgery are getting better 
              and cheaper. Hair systems are more natural than they were 
              five years ago. SMP techniques have improved dramatically. 
              PRP now has a stronger evidence base. These options bring 
              people into the market who would never have considered a 
              surgical transplant.
            </p>
            <h3>3. Online pharmacy access</h3>
            <p>
              You can now get a finasteride prescription online in 15 
              minutes through services like Numan, Manual and Boots 
              Online Doctor. Minoxidil is on the shelf at every pharmacy. 
              The barrier to entry for medical hair loss treatment has 
              dropped to almost zero. Many people who start with 
              medication eventually explore non-drug options too, 
              expanding the market further.
            </p>
            <h3>4. Demographic pressure</h3>
            <p>
              The UK population is ageing. More people in the 40-to-70 
              bracket means more people experiencing age-related hair 
              loss. At the same time, this demographic has more disposable 
              income than younger age groups. The combination of need 
              and spending power is powerful.
            </p>
          </section>

          <section id="five-trends">
            <h2>Five Trends Shaping 2026</h2>
          </section>
        </div>

        {/* Trend cards */}
        <div className="space-y-4 my-8">
          {[
            {
              icon: Monitor,
              title: 'AI-powered diagnostics',
              desc: 'AI tools that analyse scalp images, predict hair loss progression and recommend personalised treatment plans are moving from niche to mainstream. By the end of 2026, these systems are expected to be standard equipment in mid-tier and premium UK clinics. They speed up diagnosis, reduce human error and allow clinics to track treatment progress with objective data [6][7].',
            },
            {
              icon: Pill,
              title: 'Oral minoxidil goes mainstream',
              desc: 'Low-dose oral minoxidil (0.25mg to 5mg daily) is increasingly prescribed by UK dermatologists as an off-label alternative to topical application. It avoids the scalp irritation that puts some people off the topical version, though it requires monitoring for cardiovascular effects. Expect more UK clinics to offer it as a standard option [8].',
            },
            {
              icon: FlaskConical,
              title: 'Advanced biological therapies',
              desc: 'Exosome therapy (using stem cell-derived particles to repair follicles) and enhanced PRP formulations with higher platelet concentrations are becoming more refined. Combination protocols, such as PRP with microneedling, or exosomes with LLLT, are becoming the new standard in premium clinics [9].',
            },
            {
              icon: Scissors,
              title: 'Non-surgical "high-fidelity" restoration',
              desc: 'Hair systems, toppers and mesh integration systems are reaching a level of realism that was impossible a few years ago. Ultra-thin bases, custom colour matching and natural hairline construction mean that the gap between surgical and non-surgical results is narrowing for many people [10].',
            },
            {
              icon: TrendingUp,
              title: 'The regulation catch-up',
              desc: 'As the market grows, regulation is tightening. The CQC is paying more attention to surgical clinics. BAHRS is working on standardised inspection frameworks. And consumer awareness of unregulated clinics is increasing, driven partly by investigative journalism and partly by online patient communities sharing bad experiences [11].',
            },
          ].map((trend) => (
            <div key={trend.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex gap-4">
              <trend.icon className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">{trend.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{trend.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="consumer-impact">
            <h2>What This Means for Consumers</h2>
            <p>
              A growing market is generally good news for consumers. More 
              clinics mean more competition. More competition means better 
              service, better technology and, in many treatment categories, 
              downward pressure on pricing.
            </p>
            <p>
              But more clinics also means more variance in quality. As the 
              market expands, clinics with less experience and less rigorous 
              standards will inevitably appear. Our{' '}
              <Link href="/blog/spotting-bad-hair-clinics" className="text-primary hover:underline">
                guide to spotting bad clinics
              </Link>{' '}
              covers what to look for.
            </p>
            <p>
              The most significant shift for individual consumers is the 
              expansion of non-surgical options. Five years ago, if 
              medication didn&apos;t work, a transplant was essentially the 
              only next step. Today, hair systems, SMP, PRP and advanced 
              trichology consultations offer genuine alternatives at a 
              fraction of the cost and with no surgical risk. That 
              broadening of choice is the real story behind the numbers.
            </p>
          </section>
        </div>

        {/* ═══ CTA ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <MapPin className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Explore UK Clinics by Treatment
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse the UK&apos;s growing network of hair restoration 
                clinics. Filter by treatment type, location and ratings.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  Browse All Treatments
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  Search Clinics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ FAQs ═══ */}
        <section id="faqs" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
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

        {/* ═══ Sources ═══ */}
        <section className="mt-12 border-t border-border pt-8 mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sources</h2>
          <p className="text-xs text-muted-foreground mb-4">Market data verified March 2026.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Market Research</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={1}>
            <li>Grand View Research — UK hair restoration market size and forecast (2024 – 2030) <a href="https://www.grandviewresearch.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Market Research Future — UK hair transplant market forecast to 2035 <a href="https://www.marketresearchfuture.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Mordor Intelligence — global hair restoration market estimate <a href="https://www.mordorintelligence.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>GM Insights — global hair growth supplement and treatment market <a href="https://www.gminsights.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Straits Research — global hair loss treatment products market <a href="https://www.straitsresearch.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Industry Trends</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={6}>
            <li>Graftscope — AI diagnostics in hair restoration <a href="https://graftscope.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Kings Research — AI-driven hair analysis forecast <a href="https://www.kingsresearch.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Hair Loss Studios / Perfect Hair Health — oral minoxidil adoption <a href="https://www.hairlossstudios.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>London Dermatology Centre — advanced PRP and exosome therapy trends <a href="https://www.london-dermatology-centre.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Aesthetics and Hair Clinic — high-fidelity non-surgical restoration <a href="https://aestheticsandhairclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>BAHRS — regulation and CQC inspection framework development <a href="https://www.bahrs.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Spotting Bad Clinics', href: '/blog/spotting-bad-hair-clinics', icon: '🔍' },
              { label: 'All Treatments Compared', href: '/blog/hair-loss-treatments-compared', icon: '⚖️' },
              { label: 'UK Hair Loss Statistics', href: '/blog/uk-hair-loss-statistics', icon: '📊' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/20 hover:shadow-sm transition-all group"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="group-hover:text-primary transition-colors">{item.label}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  )
}
