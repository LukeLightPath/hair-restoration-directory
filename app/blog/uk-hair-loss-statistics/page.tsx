import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  Scale, Search, Users, TrendingUp,
  BarChart3, Heart, Briefcase
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'UK Hair Loss by the Numbers: Who\'s Affected and What the Data Shows (2026)',
  description:
    'How many people in the UK experience hair loss? Real statistics by age, gender and region. Backed by ONS data, NHS research and published studies.',
  alternates: {
    canonical: canonicalUrl('/blog/uk-hair-loss-statistics'),
  },
  openGraph: {
    title: 'UK Hair Loss by the Numbers | Hair Restoration Guide',
    description:
      'Data-backed UK hair loss statistics for 2026. Prevalence by age, gender breakdown, mental health impact and where clinics are concentrated.',
    url: canonicalUrl('/blog/uk-hair-loss-statistics'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'How common is hair loss in men under 30?',
    answer:
      'More common than most people realise. Around 16% of men aged 16 to 29 experience noticeable hair loss, and it can start as early as 17. By 30, roughly one in four men show visible thinning. Early-stage hair loss at this age responds well to medication (finasteride and minoxidil) if caught before significant loss occurs.',
  },
  {
    question: 'Do women experience hair loss as commonly as men?',
    answer:
      'Women are affected more than most people assume. Around 8 million women in the UK experience some form of hair loss, and one in three develops female pattern hair loss during her lifetime. The triggers are different (hormonal changes, menopause, stress) and the pattern is usually diffuse thinning rather than a receding hairline, but the impact is just as significant.',
  },
  {
    question: 'Is hair loss more common in certain parts of the UK?',
    answer:
      'Hair loss prevalence is broadly similar across the UK since it is primarily genetic. However, access to treatment varies significantly. London and the South East have the highest concentration of specialist clinics, while parts of Northern England, Scotland and Wales have fewer options. Stress levels and lifestyle factors can vary regionally, but these are secondary contributors compared to genetics.',
  },
  {
    question: 'Does the NHS cover hair loss treatment?',
    answer:
      'Only in limited circumstances. Finasteride can be prescribed on the NHS for male pattern hair loss, though not all GPs will prescribe it for cosmetic reasons. Wigs and hair systems may be available through the NHS for hair loss caused by medical conditions like cancer treatment or alopecia areata. Transplants, SMP, PRP and laser therapy are all considered cosmetic and are not NHS-funded.',
  },
  {
    question: 'Is stress actually a cause of hair loss?',
    answer:
      'Yes, but with nuance. Chronic stress can trigger telogen effluvium, a condition where hair follicles prematurely enter the resting phase and shed. This is usually temporary and resolves once the stress is managed. Male and female pattern baldness (androgenetic alopecia) is primarily genetic, but stress can accelerate it. A UK survey found that 50% of women cited stress and anxiety as the main cause of their hair loss.',
  },
  {
    question: 'What should someone do if they notice hair loss starting?',
    answer:
      'See your GP first. They can rule out underlying causes (thyroid issues, iron deficiency, medication side effects) and discuss treatment options. For male pattern hair loss, starting finasteride and/or minoxidil early gives the best chance of maintaining existing hair. For other concerns, a specialist clinic can offer a broader assessment of options from hair systems to PRP to SMP.',
  },
]

export default function UkHairLossStatsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'UK Hair Loss by the Numbers: Who\'s Affected and What the Data Shows (2026)',
    description:
      'Data-backed UK hair loss statistics for 2026. Prevalence by age, gender breakdown, mental health impact and industry growth.',
    url: canonicalUrl('/blog/uk-hair-loss-statistics'),
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
            { label: 'UK Hair Loss Statistics' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BarChart3 className="h-3 w-3" /> Data Report
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            UK Hair Loss by the Numbers: Who&apos;s Affected and What the Data Shows
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Over 14.5 million adults in the UK experience hair loss. That&apos;s
            roughly one in four people. Here&apos;s what the data actually tells us
            about who&apos;s affected, when it starts, the real impact on mental
            health and where people are getting help.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 11 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'headline-stats', label: 'The Headline Numbers' },
              { id: 'by-age', label: 'Hair Loss by Age' },
              { id: 'women', label: 'Women and Hair Loss' },
              { id: 'mental-health', label: 'The Mental Health Impact' },
              { id: 'industry', label: 'The UK Hair Restoration Industry' },
              { id: 'clinic-map', label: 'Where the Clinics Are (and Aren\'t)' },
              { id: 'what-works', label: 'What People Are Choosing' },
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

        {/* ═══ Headline Stats Cards ═══ */}
        <section id="headline-stats" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">The Headline Numbers</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: '6.5M', label: 'UK men affected by male pattern baldness', icon: Users, source: 'Aventus Clinic / NHS' },
              { stat: '8M', label: 'UK women experiencing hair loss', icon: Users, source: 'Wimpole Clinic' },
              { stat: '85%', label: 'of men affected by age 50', icon: TrendingUp, source: 'Wimpole Clinic / NHS' },
              { stat: '30.3M', label: 'male population (England & Wales, 2024)', icon: BarChart3, source: 'ONS mid-2024' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
                <item.icon className="mx-auto h-5 w-5 text-primary mb-2" />
                <div className="text-3xl font-bold text-foreground mb-1">{item.stat}</div>
                <p className="text-xs text-muted-foreground leading-snug">{item.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-2">Source: {item.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ By Age ═══ */}
        <section id="by-age" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Hair Loss by Age: When It Starts and How It Progresses</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              Male pattern baldness is progressive. It doesn&apos;t arrive overnight, and
              the numbers show a clear acceleration through each decade. The data below
              is drawn from published clinical studies and NHS guidance.
            </p>
          </div>

          {/* Age progression bar chart */}
          <div className="space-y-4">
            {[
              { age: 'Under 30', pct: 25, desc: '~25% show visible thinning. Can start as early as 17.', colour: 'bg-emerald-500' },
              { age: '30 – 35', pct: 40, desc: '~40% affected. Hairline recession becomes noticeable.', colour: 'bg-emerald-500' },
              { age: '35 – 40', pct: 66, desc: '~66% of men experience some degree of thinning or loss.', colour: 'bg-sky-500' },
              { age: '40 – 49', pct: 53, desc: '~42% have moderate to extensive loss. Many seek treatment.', colour: 'bg-sky-500' },
              { age: '50+', pct: 85, desc: '~85% of men are affected. Pattern baldness is the norm.', colour: 'bg-amber-500' },
              { age: '70+', pct: 70, desc: '~70% experience significant hair loss.', colour: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.age}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{item.age}</span>
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
                <div className="h-4 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.colour} transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Sources: Aventus Clinic, Wimpole Clinic, Harley Street Hair Transplant, NHS CEMC. Age brackets
            are approximate as studies use varying ranges.
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none mt-6">
            <p>
              The key takeaway: if you&apos;re noticing thinning in your 20s or early
              30s, you&apos;re not in the minority. One in four men under 30 is in the
              same position. And the earlier you start exploring options, the more
              effective most treatments are. Medication in particular works best when
              there&apos;s still hair to preserve.
            </p>
          </div>
        </section>

        {/* ═══ Women ═══ */}
        <section id="women" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Women and Hair Loss: The Overlooked Numbers</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              Hair loss is often framed as a male issue, but the numbers tell a
              different story. Around 8 million women in the UK are affected, and
              the experience is often more emotionally distressing because there&apos;s
              less public conversation around it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            {[
              { stat: '1 in 3', label: 'women develop female pattern hair loss', colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20' },
              { stat: '40%', label: 'of women show signs of hair loss by age 50', colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20' },
              { stat: '50%', label: 'cite stress as the main cause', colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20' },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl border p-5 text-center ${item.colour}`}>
                <div className="text-2xl font-bold text-foreground mb-1">{item.stat}</div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              A 2022 UK survey found that 75% of women had experienced thinning hair
              or hair loss at some point. The triggers are often hormonal: pregnancy,
              menopause, thyroid conditions and stress all play a role. Female pattern
              hair loss tends to appear as diffuse thinning across the top of the scalp
              rather than the receding hairline pattern common in men.
            </p>
            <p>
              Treatment options for women include minoxidil (the only topical approved
              for female hair loss), PRP therapy, hair systems and wigs. Finasteride is
              generally not recommended for pre-menopausal women due to potential effects
              on pregnancy, though some specialists prescribe it for post-menopausal women.
            </p>
          </div>
        </section>

        {/* ═══ Mental Health ═══ */}
        <section id="mental-health" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The Mental Health Impact: What the Research Shows</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              This is where most &ldquo;hair loss statistics&rdquo; articles fall short. They
              mention the numbers but skip the human cost. Published research paints a clear
              picture: hair loss has a measurable impact on mental health.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            {[
              {
                icon: Heart,
                title: 'Depression & Anxiety',
                stat: '30 – 38% higher risk',
                desc: 'People with alopecia areata are 30-38% more likely to develop depression or anxiety than the general population.',
                source: 'UK population-based cohort study, 2022',
                colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
              },
              {
                icon: Heart,
                title: 'Self-Reported Symptoms',
                stat: '80% affected',
                desc: 'Over 80% of adults with alopecia areata reported symptoms of anxiety or depression in a King\'s College London study.',
                source: 'King\'s College London',
                colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              },
              {
                icon: Briefcase,
                title: 'Work Impact',
                stat: '56% more absences',
                desc: 'People with alopecia areata are 56% more likely to take time off work and face 82% higher unemployment risk.',
                source: 'UK population-based cohort study',
                colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              },
              {
                icon: Users,
                title: 'Daily Life',
                stat: '50%+ embarrassed',
                desc: 'Over half of patients feel embarrassed about their condition. More than a third report difficulties with work, study and relationships.',
                source: 'King\'s College London / News Medical',
                colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-5 ${item.colour}`}>
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <div className="text-xl font-bold text-foreground mb-2">{item.stat}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-2">Source: {item.source}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              Research from King&apos;s College London found that the stigma around
              hair loss often contributes more to depression and anxiety than the
              physical condition itself. People don&apos;t just lose hair. They lose
              confidence. They withdraw from social situations. Some avoid
              relationships and career opportunities.
            </p>
            <p>
              The relationship is also bidirectional: stress and anxiety can trigger
              hair loss (telogen effluvium), which creates a cycle that&apos;s hard to
              break without addressing both the physical and psychological sides.
            </p>
          </div>
        </section>

        {/* ═══ Industry ═══ */}
        <section id="industry" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The UK Hair Restoration Industry</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              The demand for hair loss solutions is growing. More people are seeking
              treatment, and the industry is expanding to meet them. Here&apos;s what
              the market data shows.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            {[
              { stat: '$54.8M', label: 'UK hair thinning market revenue (2024)', source: 'Grand View Research' },
              { stat: '10.3%', label: 'annual growth rate (2025 – 2030)', source: 'Grand View Research' },
              { stat: '8.27%', label: 'global alopecia treatment CAGR (2025 – 2032)', source: 'DataBridge' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary mb-1">{item.stat}</div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-2">Source: {item.source}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              That 10.3% annual growth rate is significant. For context, the broader UK
              beauty industry grows at about 3-4% per year. Hair restoration is outpacing
              it by a factor of three, driven by greater awareness, reduced stigma, improved
              treatment options and social media normalising the conversation.
            </p>
            <p>
              The market growth isn&apos;t evenly distributed. Non-surgical options
              (hair systems, SMP, PRP) are seeing the fastest growth as treatments
              improve and prices become more accessible. Hair transplant demand
              remains strong but is increasingly competing with non-surgical
              alternatives that offer similar visual results at lower upfront cost.
            </p>
          </div>
        </section>

        {/* ═══ Clinic Map ═══ */}
        <section id="clinic-map" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Where the Clinics Are (and Aren&apos;t)</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              Access to hair loss treatment varies significantly across the UK.
              Based on our directory data, here&apos;s where specialist clinics
              are concentrated and where the gaps are.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Region</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Clinic Density</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Key Cities</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Gap?</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { region: 'London & South East', density: 'High', cities: 'London, Brighton, Essex', gap: 'No' },
                  { region: 'North West', density: 'Moderate', cities: 'Manchester, Liverpool', gap: 'Moderate' },
                  { region: 'West Midlands', density: 'Moderate', cities: 'Birmingham', gap: 'Moderate' },
                  { region: 'Yorkshire', density: 'Moderate', cities: 'Leeds, Sheffield', gap: 'Moderate' },
                  { region: 'North East', density: 'Low', cities: 'Newcastle', gap: 'Yes' },
                  { region: 'Scotland', density: 'Low', cities: 'Glasgow, Edinburgh', gap: 'Yes' },
                  { region: 'Wales', density: 'Low', cities: 'Cardiff', gap: 'Yes' },
                  { region: 'South West', density: 'Low to Moderate', cities: 'Bristol', gap: 'Moderate' },
                  { region: 'East Anglia', density: 'Low', cities: 'Norwich, Cambridge', gap: 'Yes' },
                ].map((row, i) => (
                  <tr key={row.region} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                    <td className="py-3 px-4 font-medium text-foreground">{row.region}</td>
                    <td className="py-3 px-4">{row.density}</td>
                    <td className="py-3 px-4">{row.cities}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.gap === 'Yes' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                        row.gap === 'Moderate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        {row.gap}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              The pattern is clear: London dominates. The South East has the highest
              concentration of specialist clinics by a significant margin. Northern
              England, Scotland, Wales and East Anglia have notable gaps, meaning
              people in those areas often travel to larger cities for treatment.
            </p>
            <p>
              This matters because hair system maintenance requires regular
              appointments (every 4-6 weeks), so proximity to a clinic is a real
              factor in treatment choice. People in underserved areas are more
              likely to choose lower-maintenance options like SMP or medication,
              or learn to self-maintain their hair systems.
            </p>
          </div>
        </section>

        {/* ═══ What People Are Choosing ═══ */}
        <section id="what-works" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What People Are Choosing</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6">
            <p>
              With 14.5 million people affected and a growing market, what are UK
              adults actually doing about their hair loss? The most common approaches
              break down roughly like this.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {[
              {
                title: 'Doing Nothing',
                pct: 'Majority',
                desc: 'Most people with hair loss don\'t seek treatment. Normalisation is growing, but many still lack awareness of non-surgical options.',
              },
              {
                title: 'Medication',
                pct: 'Growing',
                desc: 'Finasteride and minoxidil are the most accessible entry point. Online pharmacies have made access easier and cheaper.',
              },
              {
                title: 'Hair Systems',
                pct: 'Growing fast',
                desc: 'Social media (especially TikTok and YouTube) has massively increased awareness. Younger men are driving adoption.',
              },
              {
                title: 'SMP',
                pct: 'Fastest growth',
                desc: 'SMP is the fastest-growing treatment segment. Low maintenance and one-off cost appeal to a broad audience.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <span className="text-xs font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full">{item.pct}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              If you&apos;re researching options, we&apos;ve compared every major
              treatment in our{' '}
              <Link href="/blog/hair-loss-treatments-compared" className="text-primary hover:underline">
                complete treatment comparison guide
              </Link>{' '}
              with real UK pricing and honest pros and cons. For cost-specific
              breakdowns, our{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                hair system cost guide
              </Link>{' '}
              covers everything from budget to premium options.
            </p>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <MapPin className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find a Clinic Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse hair restoration clinics across the UK. Filter by treatment
                type, check Google reviews and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
                  Search Clinics
                </Link>
                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  Browse All Treatments
                  <ArrowRight className="h-4 w-4" />
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
          <p className="text-xs text-muted-foreground mb-4">Statistics and data verified March 2026.</p>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Prevalence Data</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Aventus Clinic — UK male pattern baldness prevalence by age <a href="https://aventusclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS CEMC — male pattern baldness statistics and onset age <a href="https://cemc.nhs.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wimpole Clinic — UK hair loss statistics by gender <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Harley Street Hair Transplant — age-specific hair loss percentages <a href="https://harleystreethairtransplant.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Treatment Rooms London — female hair loss prevalence data <a href="https://treatmentroomslondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Mental Health Research</h3>
          <ol start={6} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>King&apos;s College London — alopecia areata mental health study <a href="https://kcl.ac.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NIH / Oxford University Press — UK population-based cohort study on alopecia and depression <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>British Psychological Society — stress and hair loss relationship <a href="https://bps.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Population &amp; Industry Data</h3>
          <ol start={9} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>ONS — mid-2024 population estimates for England and Wales <a href="https://ons.gov.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Grand View Research — UK hair thinning market size and growth projections <a href="https://grandviewresearch.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>DataBridge Market Research — global alopecia treatment market CAGR <a href="https://databridgemarketresearch.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Surveys &amp; Reports</h3>
          <ol start={12} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Gerrard International / Safety In Beauty — 2022 UK hair loss survey (women) <a href="https://safetyinbeauty.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>BMJ — quality of life impact of hair loss <a href="https://bmj.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Every Treatment Compared', href: '/blog/hair-loss-treatments-compared', icon: '⚖️' },
              { label: 'Hair System Cost Guide', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'Find Clinics Near You', href: '/search', icon: '📍' },
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
