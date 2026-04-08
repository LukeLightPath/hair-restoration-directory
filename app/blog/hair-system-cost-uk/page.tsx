import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, PoundSterling, MapPin,
  HelpCircle, Calculator, Scissors, TrendingUp
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'How Much Does a Hair System Cost in the UK? Real 2026 Pricing',
  description:
    'A data-backed breakdown of hair system costs in the UK for 2026. Initial fitting, ongoing maintenance, city-by-city pricing and how it compares to transplants and SMP.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-system-cost-uk'),
  },
  openGraph: {
    title: 'How Much Does a Hair System Cost in the UK? | Hair Restoration Guide',
    description:
      'Real UK pricing data for hair systems in 2026. From initial fitting to 5-year totals, with city-by-city breakdowns and treatment comparisons.',
    url: canonicalUrl('/blog/hair-system-cost-uk'),
    type: 'article',
  },
}

/* ── FAQ data (drives both UI and JSON-LD) ── */
const FAQS = [
  {
    question: 'What is the cheapest hair system you can get in the UK?',
    answer:
      'Stock (off-the-shelf) hair systems with Chinese hair on a poly base start from around £150 to £250. You\'ll typically pay a separate fitting fee of £50 to £100 on top. These are a reasonable starting point, but most people eventually move to a semi-custom or custom system for a more natural look.',
  },
  {
    question: 'How much does hair system maintenance cost per month?',
    answer:
      'If you go to a clinic every 4 to 6 weeks for re-bonding, expect to pay £50 to £100 per session. That works out to roughly £75 to £150 per month when you factor in products like adhesive remover, sulphate-free shampoo and leave-in conditioner (around £15 to £30 per month for products).',
  },
  {
    question: 'Is a hair system cheaper than a hair transplant?',
    answer:
      'In the short term, yes. A hair system costs £200 to £1,500 upfront versus £3,000 to £12,000+ for a transplant. Over five years, though, the gap narrows considerably. A hair system\'s ongoing maintenance and replacement costs can total £7,500 to £15,000+ over that period, while a transplant is largely a one-off expense (with the possible addition of PRP sessions or medication).',
  },
  {
    question: 'Do NHS services cover hair systems?',
    answer:
      'The NHS does provide wigs and hair systems in some cases, particularly for hair loss caused by cancer treatment, alopecia areata or other medical conditions. Availability varies by region, and there\'s usually a waiting list. For male pattern baldness (androgenetic alopecia), NHS funding is rare. Your GP can advise on what\'s available in your area.',
  },
  {
    question: 'How often do you need to replace a hair system?',
    answer:
      'Most systems last 3 to 6 months with proper care. Lace bases tend to wear out faster (8 to 16 weeks), while poly and mono bases can push closer to 6 to 9 months. That means buying 2 to 4 new systems per year, depending on how well you look after them.',
  },
  {
    question: 'Can you fit a hair system yourself to save money?',
    answer:
      'You can, and many people do after their first few professional fittings. Self-application cuts out the £50 to £100 per-session clinic fee, though it takes practice to get right. Most clinics are happy to teach you the process. You\'ll still need to buy your own adhesive, remover and maintenance products.',
  },
]

export default function HairSystemCostPage() {
  /* ── Build JSON-LD ── */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Does a Hair System Cost in the UK? Real 2026 Pricing',
    description:
      'A data-backed breakdown of hair system costs in the UK for 2026. Initial fitting, ongoing maintenance, city-by-city pricing and treatment comparisons.',
    url: canonicalUrl('/blog/hair-system-cost-uk'),
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
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
            { label: 'Hair System Cost UK' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <PoundSterling className="h-3 w-3" /> Cost Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            How Much Does a Hair System Cost in the UK?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Straight answer: between £200 and £1,500 for the system and fitting, 
            plus £600 to £1,800 per year in maintenance. But those numbers don&apos;t 
            tell the full story. Here&apos;s what actually affects what you&apos;ll pay, 
            how costs differ by city and what the total looks like over five years.
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
              { id: 'initial-cost', label: 'What You\'ll Pay Upfront' },
              { id: 'ongoing-costs', label: 'The Ongoing Costs Nobody Mentions' },
              { id: 'five-year-total', label: 'The Real 5-Year Cost' },
              { id: 'price-by-city', label: 'Price by City' },
              { id: 'what-drives-price', label: 'What Drives the Price Difference' },
              { id: 'vs-alternatives', label: 'Hair Systems vs Other Treatments' },
              { id: 'find-clinic', label: 'Finding the Right Clinic' },
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

          {/* 1. Initial Cost */}
          <section id="initial-cost">
            <h2>What You&apos;ll Pay Upfront</h2>
            <p>
              A hair system has two costs at the start: the unit itself and the 
              fitting appointment. Some clinics bundle these together; others price 
              them separately. Here&apos;s the typical range across UK clinics.
            </p>
          </section>
        </div>

        {/* Pricing table — outside prose for custom layout */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">System Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Unit Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Fitting Fee</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Stock (Chinese hair, poly base)</td>
                <td className="py-3 px-4">£150 &ndash; £300</td>
                <td className="py-3 px-4">£50 &ndash; £100</td>
                <td className="py-3 px-4 font-medium text-foreground">£200 &ndash; £400</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-4 font-medium text-foreground">Semi-custom (Indian hair, lace/poly)</td>
                <td className="py-3 px-4">£300 &ndash; £550</td>
                <td className="py-3 px-4">£75 &ndash; £150</td>
                <td className="py-3 px-4 font-medium text-foreground">£375 &ndash; £700</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Full custom (European hair, bespoke base)</td>
                <td className="py-3 px-4">£600 &ndash; £1,200</td>
                <td className="py-3 px-4">£100 &ndash; £250</td>
                <td className="py-3 px-4 font-medium text-foreground">£700 &ndash; £1,500</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Most first-time wearers go for a semi-custom system. It strikes a good 
            balance between natural appearance and cost, and it&apos;s what the majority 
            of UK clinics recommend as a starting point. Custom systems with European 
            hair give the most natural result, but the price reflects that.
          </p>
          <p>
            Worth noting: many clinics include the initial cut and style in their fitting 
            fee. Others charge a separate styling appointment of £30 to £60. Always ask 
            what&apos;s included before booking.
          </p>

          {/* 2. Ongoing Costs */}
          <section id="ongoing-costs">
            <h2>The Ongoing Costs Nobody Mentions</h2>
            <p>
              The upfront price is only part of the picture. Hair systems need regular 
              maintenance, and the unit itself has a limited lifespan. This is where the 
              real cost lives.
            </p>
            <h3>Maintenance Appointments</h3>
            <p>
              Every 4 to 6 weeks, you&apos;ll need your system removed, your scalp cleaned, 
              and the system re-bonded. Clinics charge between £50 and £100 per session 
              for this. Some offer monthly packages (£70 to £90/month) that include 
              re-bonding plus a wash and style.
            </p>
            <h3>Replacement Units</h3>
            <p>
              Systems don&apos;t last forever. Expect to replace the unit every 3 to 6 months, 
              depending on the base material and how well you look after it. That&apos;s 2 to 4 
              new systems per year, at whatever your unit cost is.
            </p>
            <h3>Products</h3>
            <p>
              You&apos;ll need adhesive or tape, adhesive remover, sulphate-free shampoo and 
              leave-in conditioner at a minimum. Budget around £15 to £30 per month for 
              products. Some people spend more on premium bonding agents or UV protectant 
              sprays, but the basics will keep you covered.
            </p>
          </section>

          {/* 3. Five-Year Total */}
          <section id="five-year-total">
            <h2>The Real 5-Year Cost</h2>
            <p>
              This is the number most clinics don&apos;t put on their website. Here&apos;s what a 
              hair system actually costs over five years, based on three different 
              spending levels.
            </p>
          </section>
        </div>

        {/* 5-year cost cards */}
        <div className="grid gap-5 sm:grid-cols-3 my-8">
          {[
            {
              tier: 'Budget',
              icon: '💷',
              system: 'Stock, Chinese hair',
              unitCost: '£200',
              replacements: '4/year',
              maintenance: 'Self-maintained',
              products: '£20/month',
              yearOne: '£1,040',
              yearlyOngoing: '£1,040',
              fiveYear: '£5,200',
              colour: 'bg-jade/30 border-jade',
            },
            {
              tier: 'Mid-range',
              icon: '💰',
              system: 'Semi-custom, Indian hair',
              unitCost: '£450',
              replacements: '3/year',
              maintenance: 'Clinic (£75/session, 10x/year)',
              products: '£25/month',
              yearOne: '£2,400',
              yearlyOngoing: '£2,400',
              fiveYear: '£12,000',
              colour: 'bg-primary/8 border-primary/20',
            },
            {
              tier: 'Premium',
              icon: '💎',
              system: 'Full custom, European hair',
              unitCost: '£900',
              replacements: '2/year',
              maintenance: 'Clinic (£100/session, 10x/year)',
              products: '£30/month',
              yearOne: '£3,160',
              yearlyOngoing: '£3,160',
              fiveYear: '£15,800',
              colour: 'bg-premium/5 border-premium/15',
            },
          ].map((item) => (
            <div
              key={item.tier}
              className={`rounded-2xl border p-5 shadow-sm ${item.colour}`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-base font-semibold text-foreground mb-1">{item.tier}</h3>
              <p className="text-xs text-muted-foreground mb-4">{item.system}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Unit cost</span>
                  <span className="font-medium text-foreground">{item.unitCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Replacements</span>
                  <span className="font-medium text-foreground">{item.replacements}</span>
                </div>
                <div className="flex justify-between">
                  <span>Products</span>
                  <span className="font-medium text-foreground">{item.products}</span>
                </div>
              </div>
              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Per year</span>
                  <span className="font-semibold text-foreground">{item.yearlyOngoing}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">5-year total</span>
                  <span className="font-bold text-primary text-base">{item.fiveYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The budget route is genuinely viable. Plenty of people self-maintain with 
            stock systems and get perfectly good results. The mid-range option is where 
            most UK wearers sit: professional maintenance with a semi-custom unit 
            that looks natural and lasts a reasonable amount of time.
          </p>
          <p>
            The premium tier is for those who want the absolute best match and don&apos;t 
            mind paying for it. European hair systems are virtually indistinguishable 
            from natural hair, but the numbers over five years do add up.
          </p>

          {/* 4. Price by City */}
          <section id="price-by-city">
            <h2>Price by City</h2>
            <p>
              Where you live affects what you&apos;ll pay. London clinics charge a premium 
              (no surprise there), while cities in the North and Midlands tend to be 
              more competitive. Here&apos;s a rough guide based on pricing across UK clinics.
            </p>
          </section>
        </div>

        {/* City pricing table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">City / Region</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Typical System + Fit</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Maintenance (per session)</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Price Level</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { city: 'London', system: '£500 – £1,500', maint: '£75 – £120', level: '£££', href: '/uk/london' },
                { city: 'Manchester', system: '£350 – £900', maint: '£50 – £85', level: '££', href: '/uk/manchester' },
                { city: 'Birmingham', system: '£300 – £850', maint: '£50 – £80', level: '££', href: '/uk/birmingham' },
                { city: 'Leeds', system: '£300 – £800', maint: '£50 – £80', level: '££', href: '/uk/leeds' },
                { city: 'Liverpool', system: '£300 – £800', maint: '£50 – £80', level: '££', href: '/uk/liverpool' },
                { city: 'Glasgow', system: '£300 – £800', maint: '£50 – £75', level: '££', href: '/uk/glasgow' },
                { city: 'Bristol', system: '£350 – £900', maint: '£55 – £85', level: '££', href: '/uk/bristol' },
                { city: 'Newcastle', system: '£250 – £750', maint: '£45 – £75', level: '£', href: '/uk/newcastle' },
                { city: 'Sheffield', system: '£250 – £700', maint: '£45 – £70', level: '£', href: '/uk/sheffield' },
                { city: 'Essex / Kent', system: '£400 – £1,000', maint: '£60 – £90', level: '££ – £££', href: '/uk/essex' },
              ].map((row, i) => (
                <tr key={row.city} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">
                    <Link href={row.href} className="text-primary hover:underline">{row.city}</Link>
                  </td>
                  <td className="py-3 px-4">{row.system}</td>
                  <td className="py-3 px-4">{row.maint}</td>
                  <td className="py-3 px-4 font-medium">{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            These ranges are based on advertised pricing from clinics in each city. 
            Independent clinics often undercut chains by 15 to 25% because they have 
            lower overheads. It&apos;s worth checking both options in your area.
          </p>
          <p>
            Some people travel to a cheaper city for their initial fitting and custom 
            order, then do maintenance closer to home. If you&apos;re near the border between 
            a ££ and £ area, it&apos;s worth considering.
          </p>

          {/* 5. What Drives Price */}
          <section id="what-drives-price">
            <h2>What Drives the Price Difference</h2>
            <p>
              Two hair systems can look identical and cost completely different amounts. 
              Here&apos;s what actually moves the price up or down.
            </p>
            <h3>Base Material</h3>
            <p>
              Lace bases are the most popular for a natural hairline, but they wear 
              out faster and need replacing more often. Poly (skin) bases last longer 
              and cost less per unit, but they&apos;re not as breathable. Mono sits in the 
              middle. The base alone can swing the unit price by £100 to £200.
            </p>
            <h3>Hair Type</h3>
            <p>
              This is the biggest single cost factor. European hair (sourced from 
              Eastern Europe) costs roughly double what Indian hair does, and 
              three to four times more than Chinese hair. The difference shows in 
              how it moves, how it feels and how naturally it blends with your 
              existing hair.
            </p>
            <h3>Customisation</h3>
            <p>
              Stock systems are pre-made in standard sizes and colours. Semi-custom 
              lets you pick the base size, hair colour and density from a menu. 
              Full custom means a mould taken of your head, exact colour matching, 
              and your specific density preferences. Each step up adds to the cost 
              but improves the fit and natural appearance.
            </p>
            <h3>The Clinic Itself</h3>
            <p>
              Location matters (see the city table above), but so does the clinic&apos;s 
              model. Some clinics make their margin on the unit sale; others keep unit 
              prices low and make money on maintenance appointments. Always ask about 
              ongoing costs before comparing initial quotes.
            </p>
          </section>

          {/* 6. vs Alternatives */}
          <section id="vs-alternatives">
            <h2>Hair Systems vs Other Treatments</h2>
            <p>
              If you&apos;re weighing up your options, here&apos;s how hair system costs compare 
              to the other main treatments available in the UK.
            </p>
          </section>
        </div>

        {/* Comparison table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Treatment</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Upfront Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Annual Ongoing</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">5-Year Total</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Result</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border bg-primary/5">
                <td className="py-3 px-4 font-medium text-foreground">Hair System</td>
                <td className="py-3 px-4">£200 – £1,500</td>
                <td className="py-3 px-4">£1,000 – £3,000</td>
                <td className="py-3 px-4 font-medium text-foreground">£5,200 – £15,800</td>
                <td className="py-3 px-4">Immediate, full coverage</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Hair Transplant (FUE)</td>
                <td className="py-3 px-4">£3,000 – £12,000+</td>
                <td className="py-3 px-4">£0 – £500</td>
                <td className="py-3 px-4 font-medium text-foreground">£3,000 – £14,500</td>
                <td className="py-3 px-4">Permanent, 6-12 months to see results</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-4 font-medium text-foreground">SMP</td>
                <td className="py-3 px-4">£800 – £3,500</td>
                <td className="py-3 px-4">£0 – £150</td>
                <td className="py-3 px-4 font-medium text-foreground">£800 – £4,250</td>
                <td className="py-3 px-4">Buzzed look only, touch-ups every 3-5 yrs</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Medication (finasteride + minoxidil)</td>
                <td className="py-3 px-4">£0 – £50</td>
                <td className="py-3 px-4">£150 – £600</td>
                <td className="py-3 px-4 font-medium text-foreground">£750 – £3,050</td>
                <td className="py-3 px-4">Slows loss, partial regrowth possible</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-4 font-medium text-foreground">PRP Therapy</td>
                <td className="py-3 px-4">£200 – £500 per session</td>
                <td className="py-3 px-4">£600 – £2,000</td>
                <td className="py-3 px-4 font-medium text-foreground">£3,000 – £10,000</td>
                <td className="py-3 px-4">Thickening, works best for early loss</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The cheapest long-term option is medication, but it&apos;s only effective for 
            some people and it won&apos;t replace lost hair. SMP is the most cost-effective 
            if you&apos;re happy with a closely cropped look. Hair transplants have a high 
            upfront cost but are genuinely permanent. Hair systems sit in the middle: 
            they give you immediate, dramatic results, but you&apos;re signing up for an 
            ongoing commitment.
          </p>
          <p>
            There&apos;s no single right answer here. It depends on your hair loss pattern, 
            your budget (both now and ongoing), and how you want to look day to day. 
            Many people combine treatments: SMP underneath a hair system for added 
            density or medication alongside a system to preserve their remaining 
            natural hair.
          </p>

          {/* 7. Finding a Clinic */}
          <section id="find-clinic">
            <h2>Finding the Right Clinic for Your Budget</h2>
            <p>
              Price is important, but it shouldn&apos;t be the only factor. A £200 system 
              from an inexperienced fitter will look worse (and potentially cost more 
              in re-dos) than a £500 system from someone who knows what they&apos;re doing. 
              Here are a few things that are worth paying attention to.
            </p>
            <ul>
              <li>
                <strong>Ask about total cost, not just the unit price.</strong> Get a clear 
                quote that includes fitting, first maintenance appointment and products. 
                Some clinics advertise low unit prices but charge premium rates for 
                everything else.
              </li>
              <li>
                <strong>Check Google reviews.</strong> Sort by recent and look for 
                mentions of value, pricing transparency and ongoing care. Clinics with 
                consistently high ratings tend to be upfront about costs.
              </li>
              <li>
                <strong>Ask if they offer a free consultation.</strong> Most reputable 
                clinics do. Use it to get a hands-on feel for the quality of their work 
                and a detailed cost breakdown before committing to anything.
              </li>
              <li>
                <strong>Compare at least three clinics.</strong> Pricing varies 
                significantly, even within the same city. Our directory makes it easy 
                to compare clinics in your area side by side.
              </li>
            </ul>
          </section>
        </div>

        {/* ═══ CTA — Find clinics ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <MapPin className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Compare Hair System Clinics Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse clinics by city, check pricing tiers, read real Google reviews, 
                and find a free consultation.
              </p>
              <Link
                href="/treatments/hair-systems"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <Scissors className="h-4 w-4" />
                Browse Hair System Clinics
              </Link>
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
          <p className="text-xs text-muted-foreground mb-4">Pricing data verified March 2026 from the following UK sources.</p>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Oxea London — hair system pricing and service menu <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Total Cover Plus — ready-made and stock system pricing <a href="https://totalcoverplus.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Hair 4 All UK — package pricing (Bronze to Diamond tiers) <a href="https://hair4alluk.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>London Hair Replacement — fitting and maintenance session pricing <a href="https://londonhairreplacement.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Men&apos;s Hair Systems — re-bonding and fitting costs <a href="https://menshairsystems.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>New Times Hair — monthly maintenance cost estimates <a href="https://newtimeshair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Lordhair — hair system lifespan by base material <a href="https://lordhair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk — wig and hair replacement provision for medical hair loss <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related Content ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'What Is a Hair System?', href: '/guides/hair-systems', icon: '📖' },
              { label: 'Hair System Clinics', href: '/treatments/hair-systems', icon: '📍' },
              { label: 'All Treatment Types', href: '/treatments', icon: '🔬' },
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
