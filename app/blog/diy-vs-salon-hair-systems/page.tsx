import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, PoundSterling, MapPin,
  HelpCircle, Scissors, Clock, Wrench
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'DIY vs Salon Hair Systems: A Real UK Cost Breakdown for 2026',
  description:
    'Should you maintain your hair system yourself or use a salon? We break down the real costs of both routes with UK pricing data, plus the hybrid approach most people end up using.',
  alternates: {
    canonical: canonicalUrl('/blog/diy-vs-salon-hair-systems'),
  },
  openGraph: {
    title: 'DIY vs Salon Hair Systems: UK Cost Breakdown | Hair Restoration Guide',
    description:
      'A side-by-side comparison of DIY and salon hair system costs in the UK for 2026. Includes unit prices, monthly supply costs, maintenance fees and 5-year projections.',
    url: canonicalUrl('/blog/diy-vs-salon-hair-systems'),
    type: 'article',
  },
}

/* ── FAQ data (drives both UI and JSON-LD) ── */
const FAQS = [
  {
    question: 'Can I fit a hair system myself with no experience?',
    answer:
      'You can, but most people recommend getting your first one or two systems fitted by a professional. They\'ll cut the base to your head shape, blend the hairline and show you how re-bonding works. After that, many wearers switch to doing it themselves at home.',
  },
  {
    question: 'How much time does DIY maintenance take per week?',
    answer:
      'A full removal, clean and re-bond takes about 60 to 90 minutes once you\'ve got the hang of it. Most people do this every one to two weeks. Daily upkeep (brushing, light styling) adds another five to ten minutes.',
  },
  {
    question: 'Will my hair system last longer if I go to a salon?',
    answer:
      'Not necessarily. What matters is how carefully the system is handled during removal and cleaning. A careful DIY routine can match or beat salon results. Rough handling, whether at home or in a salon, shortens the system\'s life.',
  },
  {
    question: 'What if I mess up a DIY application?',
    answer:
      'The most common beginner mistake is a slightly crooked hairline or uneven tape placement. Both are fixable: just lift the front edge, reposition and press down again. You won\'t damage the system. Most people get comfortable after three or four attempts.',
  },
  {
    question: 'Do salons charge more if I bring my own hair system?',
    answer:
      'Some do. A few clinics add a surcharge of £10 to £30 if you bring a unit purchased elsewhere, because they lose the markup on the system itself. Others are happy to work with any unit. Always ask before booking.',
  },
  {
    question: 'Is the hybrid approach really the most common?',
    answer:
      'Based on what we see across UK hair system communities and forums, yes. Most people start with full salon service, gradually learn to do their own re-bonds, and keep visiting a stylist every two to three months for haircuts and professional maintenance.',
  },
]

export default function DiyVsSalonPage() {
  /* ── Build JSON-LD ── */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DIY vs Salon Hair Systems: A Real UK Cost Breakdown for 2026',
    description:
      'A side-by-side comparison of DIY and salon hair system costs in the UK. Includes unit prices, monthly supplies, maintenance fees and 5-year projections.',
    url: canonicalUrl('/blog/diy-vs-salon-hair-systems'),
    datePublished: '2026-04-17',
    dateModified: '2026-04-17',
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
            { label: 'DIY vs Salon Hair Systems' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <PoundSterling className="h-3 w-3" /> Cost Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            DIY vs Salon Hair Systems: A Real Cost Breakdown for the UK
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The biggest ongoing expense with a hair system isn&apos;t the unit itself.
            It&apos;s the maintenance. Going to a salon every few weeks adds up fast,
            and a growing number of UK wearers are cutting those costs by doing
            some (or all) of it themselves. Here&apos;s what both approaches actually
            cost, side by side.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated April 2026 &middot; 9 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'the-unit', label: 'What The Unit Costs (Either Way)' },
              { id: 'salon-route', label: 'The Salon Route: What You\'re Paying For' },
              { id: 'diy-route', label: 'The DIY Route: Products, Tools and Monthly Spend' },
              { id: 'side-by-side', label: 'Side-by-Side: Year 1 and Year 5' },
              { id: 'hybrid', label: 'The Hybrid Approach' },
              { id: 'which-route', label: 'Which Route Is Right for You?' },
              { id: 'find-clinic', label: 'Finding Clinics That Match Your Budget' },
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

          {/* 1. The Unit */}
          <section id="the-unit">
            <h2>What the Unit Costs (Either Way)</h2>
            <p>
              Whether you go to a salon or do everything yourself, the hair system
              itself costs roughly the same. The difference is where you buy it.
            </p>
            <p>
              Salons typically mark up units by 30 to 100% over what you&apos;d pay
              buying direct from a supplier. A system that costs £180 from an
              online retailer might be priced at £350 to £500 through a clinic,
              because the fitting fee and margin are baked in.
            </p>
          </section>
        </div>

        {/* Unit cost comparison table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">System Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Buy Direct (Online)</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Buy Through a Salon</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Typical Saving</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Stock (Chinese hair, poly)</td>
                <td className="py-3 px-4">£130 &ndash; £250</td>
                <td className="py-3 px-4">£250 &ndash; £450</td>
                <td className="py-3 px-4 font-medium text-emerald-600">~£150</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-4 font-medium text-foreground">Semi-custom (Indian hair, lace)</td>
                <td className="py-3 px-4">£200 &ndash; £350</td>
                <td className="py-3 px-4">£400 &ndash; £650</td>
                <td className="py-3 px-4 font-medium text-emerald-600">~£250</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Custom (European hair, bespoke)</td>
                <td className="py-3 px-4">£450 &ndash; £800</td>
                <td className="py-3 px-4">£700 &ndash; £1,500</td>
                <td className="py-3 px-4 font-medium text-emerald-600">~£400</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Most systems are manufactured in the same handful of factories in
            China, regardless of which UK salon sells them. The hair quality and
            base construction matter. The branding on the box doesn&apos;t. This is
            one of the reasons the DIY community has grown so quickly: people
            realised they were paying a significant premium for the same product.
          </p>

          {/* 2. Salon Route */}
          <section id="salon-route">
            <h2>The Salon Route: What You&apos;re Paying For</h2>
            <p>
              Going to a salon means someone else handles the removal, scalp
              cleaning, re-bonding and styling. You turn up, sit in a chair for
              60 to 90 minutes, and leave looking sharp. That convenience has a
              price.
            </p>
            <h3>Typical Session Costs</h3>
            <p>
              A standard maintenance appointment (sometimes called a &ldquo;regroom&rdquo;)
              runs between £50 and £100 depending on where you are. London and the
              South East sit at the higher end; salons in the North and Midlands are
              often closer to £50 to £70 per visit.
            </p>
            <p>
              Some clinics offer monthly packages. These typically bundle
              re-bonding, a wash and style into a fixed monthly fee of £70 to
              £90, which saves 5 to 15% versus paying per session. If you&apos;re
              committed to the salon route, packages are usually better value.
            </p>
            <h3>What&apos;s Included (and What Isn&apos;t)</h3>
            <p>
              A standard regroom usually covers removal, deep clean, scalp prep,
              re-bond and a basic restyle. What it often doesn&apos;t include:
            </p>
            <ul>
              <li>A full haircut or restyle (£20 to £40 extra)</li>
              <li>Repair work on a damaged base (£15 to £30)</li>
              <li>Colouring or tinting the system (£30 to £60)</li>
              <li>Products to take home (sold separately)</li>
            </ul>
            <p>
              Always ask what&apos;s covered before comparing quotes. A £60 session
              that includes a haircut is better value than a £50 one that charges
              £35 extra for the same cut.
            </p>
            <h3>Annual Salon Spend</h3>
            <p>
              If you visit every four weeks, that&apos;s 13 sessions a year. At £60
              to £100 per session, you&apos;re looking at £780 to £1,300 per year
              in maintenance visits alone. Add £180 to £360 for products and
              the total climbs to roughly £960 to £1,660 annually, before you
              buy a single replacement unit.
            </p>
          </section>

          {/* 3. DIY Route */}
          <section id="diy-route">
            <h2>The DIY Route: Products, Tools and Monthly Spend</h2>
            <p>
              The DIY approach means buying your own systems from an online
              supplier and handling removal, cleaning and re-bonding at home.
              Here&apos;s what that actually costs month to month.
            </p>
            <h3>Essential Supplies</h3>
          </section>
        </div>

        {/* DIY supplies breakdown */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Typical UK Price</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Lasts</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Monthly Cost</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { product: 'Adhesive remover (C-22 or similar)', price: '£10 – £25', lasts: '6 – 10 weeks', monthly: '~£8' },
                { product: 'Tape (pre-cut contours, 36-pack)', price: '£7 – £10', lasts: '4 – 8 weeks', monthly: '~£5' },
                { product: 'Liquid adhesive or glue', price: '£18 – £25', lasts: '6 – 12 weeks', monthly: '~£7' },
                { product: 'Scalp protector', price: '£8 – £12', lasts: '8 – 12 weeks', monthly: '~£3' },
                { product: 'Sulphate-free shampoo', price: '£6 – £12', lasts: '4 – 6 weeks', monthly: '~£5' },
                { product: 'Leave-in conditioner', price: '£5 – £10', lasts: '4 – 6 weeks', monthly: '~£4' },
                { product: 'Isopropyl alcohol (scalp prep)', price: '£3 – £5', lasts: '8 – 12 weeks', monthly: '~£1' },
              ].map((row, i) => (
                <tr key={row.product} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.product}</td>
                  <td className="py-3 px-4">{row.price}</td>
                  <td className="py-3 px-4">{row.lasts}</td>
                  <td className="py-3 px-4">{row.monthly}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-primary/20 bg-primary/5">
                <td className="py-3 px-4 font-semibold text-foreground" colSpan={3}>Total monthly supply cost</td>
                <td className="py-3 px-4 font-bold text-primary">~£33</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            That&apos;s roughly £30 to £50 per month for everything, depending on
            which brands you use and how often you re-bond. Buying in bulk
            (larger bottles of remover, bigger tape packs) brings the cost
            towards the lower end.
          </p>
          <h3>The Time Investment</h3>
          <p>
            Here&apos;s what nobody mentions in the cost comparison: time. A full
            removal, clean and re-bond takes about 60 to 90 minutes. You&apos;ll
            do this every one to two weeks. In the early days, expect it to
            take longer while you figure out your process.
          </p>
          <p>
            Daily maintenance is minimal. Five to ten minutes of brushing and
            light styling is usually enough. Add a quick edge check (making
            sure the tape or glue is holding around the perimeter) and
            you&apos;re done.
          </p>

          {/* 4. Side by Side */}
          <section id="side-by-side">
            <h2>Side-by-Side: Year 1 and Year 5</h2>
            <p>
              This is the comparison that makes the difference clear. We&apos;ve
              used mid-range assumptions: a semi-custom system with Indian hair,
              replaced three times a year.
            </p>
          </section>
        </div>

        {/* Side-by-side comparison cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          {[
            {
              route: 'Full Salon',
              icon: <Scissors className="h-6 w-6" />,
              colour: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30',
              items: [
                { label: 'System units (3/year, via salon)', value: '£1,350' },
                { label: 'Maintenance visits (13/year × £75)', value: '£975' },
                { label: 'Products (£25/month)', value: '£300' },
                { label: 'Occasional extras (cuts, repairs)', value: '£200' },
              ],
              yearOne: '£2,825',
              fiveYear: '£14,125',
            },
            {
              route: 'Full DIY',
              icon: <Wrench className="h-6 w-6" />,
              colour: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30',
              items: [
                { label: 'System units (3/year, bought direct)', value: '£750' },
                { label: 'Maintenance visits', value: '£0' },
                { label: 'DIY supplies (£35/month)', value: '£420' },
                { label: 'Barber cuts (6/year × £20)', value: '£120' },
              ],
              yearOne: '£1,290',
              fiveYear: '£6,450',
            },
          ].map((card) => (
            <div
              key={card.route}
              className={`rounded-2xl border p-6 shadow-sm ${card.colour}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-foreground">{card.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{card.route}</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                {card.items.map((item) => (
                  <div key={item.label} className="flex justify-between gap-2">
                    <span>{item.label}</span>
                    <span className="font-medium text-foreground whitespace-nowrap">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-5 pt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year 1 total</span>
                  <span className="font-semibold text-foreground">{card.yearOne}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">5-year total</span>
                  <span className="font-bold text-primary text-lg">{card.fiveYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Savings callout */}
        <div className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/10 p-6 text-center my-8">
          <p className="text-sm text-muted-foreground mb-1">Potential 5-year saving with full DIY</p>
          <p className="text-3xl font-bold text-emerald-600">£7,675</p>
          <p className="text-xs text-muted-foreground mt-1">Based on mid-range semi-custom systems</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The saving is significant. Over five years, going fully DIY costs
            less than half of what full salon service does. Even if you adjust
            the numbers up or down by 20%, the gap stays large.
          </p>
          <p>
            That said, this comparison assumes you&apos;re comfortable doing
            everything yourself, including the initial cut-in and hairline
            blending. In practice, most people land somewhere between these
            two extremes.
          </p>

          {/* 5. Hybrid */}
          <section id="hybrid">
            <h2>The Hybrid Approach (What Most People Actually Do)</h2>
            <p>
              If you spend any time in UK hair system communities on Reddit or
              Facebook, you&apos;ll notice a pattern. Very few people go fully
              DIY from day one, and very few stay with full salon service long
              term. The majority settle into a middle ground.
            </p>
            <p>
              The typical journey looks like this:
            </p>
            <ol>
              <li>
                Start with salon service. Get your first system professionally
                fitted, cut in and styled. Learn how the process works by
                watching the technician.
              </li>
              <li>
                Learn home re-bonding. After two or three salon visits, start
                doing your own removal, cleaning and re-attachment between
                appointments. This cuts your salon visits from every four weeks
                to every eight to twelve.
              </li>
              <li>
                Keep salon visits for cuts and checks. Go back every two to three
                months for a professional haircut, colour matching and a general
                check on the system&apos;s condition. These visits cost £60 to £100.
              </li>
              <li>
                Buy units direct. Once you know your exact specifications (base
                size, hair colour, density), order replacement systems from an
                online supplier instead of through the salon.
              </li>
            </ol>
          </section>
        </div>

        {/* Hybrid cost card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm my-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Hybrid Route: Typical Annual Cost</h3>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            {[
              { label: 'System units (3/year, bought direct)', value: '£750' },
              { label: 'Salon visits (5/year × £80)', value: '£400' },
              { label: 'DIY supplies (£30/month)', value: '£360' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between gap-2">
                <span>{item.label}</span>
                <span className="font-medium text-foreground whitespace-nowrap">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-5 pt-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Annual total</span>
              <span className="font-semibold text-foreground">£1,510</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">5-year total</span>
              <span className="font-bold text-primary text-lg">£7,550</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              That&apos;s 47% less than full salon, with professional oversight built in.
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            This hybrid route gives you the best of both worlds. You save
            money on routine maintenance while keeping a professional stylist
            in the loop for the things that are harder to do alone: haircuts,
            colour adjustments and catching any issues early.
          </p>

          {/* 6. Which Route */}
          <section id="which-route">
            <h2>Which Route Is Right for You?</h2>
            <p>
              There&apos;s no single answer here. It depends on your budget, your
              schedule and how comfortable you are working with your hands.
              Here&apos;s a rough guide.
            </p>
          </section>
        </div>

        {/* Decision guide */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">You might prefer...</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">If...</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Full salon service</td>
                <td className="py-3 px-4">You value convenience over cost, have limited time for maintenance, or you&apos;re brand new to hair systems and want full support</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-4 font-medium text-foreground">Hybrid (DIY + occasional salon)</td>
                <td className="py-3 px-4">You&apos;re comfortable learning new skills, want to save money without going fully solo, and like having a professional safety net</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 font-medium text-foreground">Full DIY</td>
                <td className="py-3 px-4">Budget is a priority, you&apos;re patient with the learning curve, and you don&apos;t mind spending an hour or two on maintenance each week</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            One thing worth remembering: nothing stops you from changing
            approach later. Many people start with full salon service, shift
            to hybrid after six months, and then go almost fully DIY within
            a year. Your confidence builds with experience.
          </p>

          {/* 7. Finding Clinics */}
          <section id="find-clinic">
            <h2>Finding Clinics That Match Your Budget</h2>
            <p>
              Whether you want a full-service salon or just a clinic for
              occasional professional visits, a few things are worth checking.
            </p>
            <ul>
              <li>
                <strong>Ask about maintenance pricing upfront.</strong> Not just
                the unit cost. A clinic quoting £300 for a system but £100 per
                regroom is more expensive long-term than one charging £450 for
                the system and £60 for maintenance.
              </li>
              <li>
                <strong>Check if they&apos;ll work with systems you&apos;ve bought
                elsewhere.</strong> Not all clinics will. If you plan to buy
                direct and just visit for cuts and maintenance, confirm this
                before booking.
              </li>
              <li>
                <strong>Look at Google reviews.</strong> Sort by recent and
                look for mentions of pricing, value and honesty about costs.
                Clinics with 4.5+ ratings and a good number of reviews tend
                to be reliably transparent.
              </li>
              <li>
                <strong>Compare at least three options.</strong> Pricing varies
                significantly, even between clinics in the same postcode. Our
                directory lets you compare clinics in your area side by side,
                with real Google ratings and service listings.
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
                Browse {' '}
                <Link href="/uk" className="text-white underline hover:text-white/90">465+ clinics across 201 UK cities</Link>.
                Check pricing tiers, read real Google reviews and find a free consultation.
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
          <p className="text-xs text-muted-foreground mb-4">Pricing data verified April 2026 from the following UK sources.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Clinic Pricing</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>House of Hair UK — regroom pricing and maintenance packages <a href="https://houseofhairuk.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wisteria Avenue — fitting and maintenance session pricing <a href="https://wisteriaavenue.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>London Hair System — hair system service menu and costs <a href="https://londonhairsystem.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Hair Replacement Stylist — regional UK pricing for fitting and maintenance <a href="https://hairreplacementstylist.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Tru Hair — stock and semi-custom system pricing <a href="https://truhair.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-2">Product Pricing</h3>
          <ol start={6} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Holistique — UK supplier of hair system adhesives, tapes and removers <a href="https://holistique.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Neu Hair 4 Men — maintenance product pricing <a href="https://neuhair4men.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-2">User Reports</h3>
          <ol start={8} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>r/HairSystem — community discussions on DIY costs and maintenance routines <a href="https://reddit.com/r/HairSystem" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Super Hair Pieces — UK stock system pricing and base material comparison <a href="https://superhairpieces.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Lordhair — hair system lifespan data by base material <a href="https://lordhair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related Content ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair System Cost UK', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'Annual Running Costs', href: '/blog/hair-system-annual-cost', icon: '📊' },
              { label: 'Hair System Clinics', href: '/treatments/hair-systems', icon: '📍' },
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
