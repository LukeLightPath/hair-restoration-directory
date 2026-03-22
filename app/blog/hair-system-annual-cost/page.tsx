import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  FileText, PoundSterling, Clock,
  Scissors, CheckCircle
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'The Real Annual Cost of Owning a Hair System in the UK (2026)',
  description:
    'What you\'ll actually spend per year on a hair system in the UK. Replacement units, maintenance sessions, products and three budget scenarios with real numbers.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-system-annual-cost'),
  },
  openGraph: {
    title: 'Hair System Annual Cost UK: The Full Breakdown | Hair Restoration Guide',
    description:
      'Beyond the purchase price: replacement units, maintenance appointments and products. Three budget scenarios for what a hair system really costs per year.',
    url: canonicalUrl('/blog/hair-system-annual-cost'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'How many hair systems will I need per year?',
    answer:
      'Most people go through 2 to 4 systems per year, depending on the base material. Ultra-thin skin bases last about a month each, so you could need 10 to 12 per year at the extreme end. French lace and mono bases are more durable and typically last 3 to 6 months, meaning 2 to 4 per year is standard.',
  },
  {
    question: 'Can I reduce costs by doing maintenance myself?',
    answer:
      'Yes, significantly. DIY maintenance cuts out the £55 to £200 per-session clinic cost. You\'ll still need to buy adhesives, removers and cleaning products (roughly £100 to £200 per year), but the saving on salon visits can be £500 to £2,000 per year depending on how often you\'d otherwise go. Many wearers start at a clinic to learn the process, then transition to self-maintenance after a few months.',
  },
  {
    question: 'Is a hair system cheaper than a transplant over 5 years?',
    answer:
      'Not usually. A hair transplant is a one-off cost of £3,000 to £15,000, with minimal ongoing costs. A hair system at the mid-range tier costs roughly £2,500 to £4,000 per year, adding up to £12,500 to £20,000 over five years. However, a transplant doesn\'t work for everyone (you need sufficient donor hair), and it takes 12 to 18 months for full results. A hair system gives you a full head of hair the same day.',
  },
  {
    question: 'Do thinner bases cost more in the long run?',
    answer:
      'Almost always. Ultra-thin skin (0.03mm) looks incredibly natural but lasts about a month. At £150 to £300 per unit, that\'s £1,800 to £3,600 per year just in replacement systems. A French lace or mono base might cost the same per unit but lasts 4 to 6 months, bringing the annual replacement cost down to £300 to £900. You trade longevity for realism.',
  },
  {
    question: 'What products do I need for at-home maintenance?',
    answer:
      'At minimum: adhesive (tape or glue), adhesive remover/solvent, scalp protector, sulphate-free shampoo and conditioner. Most people also buy a detangling spray and a wide-tooth comb. The adhesive and remover are the recurring costs; shampoo and conditioner last longer. Budget about £8 to £20 per month for all of it.',
  },
  {
    question: 'Are there any hidden costs people forget about?',
    answer:
      'Haircuts. Your system needs professional cutting and blending, which costs £20 to £40 if done separately from a maintenance visit. Some clinics include it in the maintenance fee; others don\'t. You also need to budget for your initial fitting, which is typically included in the first system purchase but can be £50 to £150 if charged separately.',
  },
]

export default function HairSystemAnnualCostPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Real Annual Cost of Owning a Hair System in the UK (2026)',
    description:
      'What you\'ll actually spend per year on a hair system in the UK. Replacement units, maintenance sessions, products and three budget scenarios.',
    url: canonicalUrl('/blog/hair-system-annual-cost'),
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
            { label: 'Hair System Annual Cost' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <PoundSterling className="h-3 w-3" /> Cost Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            The Real Annual Cost of Owning a Hair System in the UK
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The purchase price is just the beginning. Replacement 
            units, maintenance appointments, adhesives, products: the 
            ongoing costs add up fast. This is the full annual breakdown 
            with three real-world budget scenarios.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 9 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'why-annual', label: 'Why Annual Cost Matters More Than Purchase Price' },
              { id: 'replacement', label: 'How Often You\'ll Replace Your System' },
              { id: 'maintenance', label: 'Professional Maintenance Costs' },
              { id: 'products', label: 'DIY Products and Supplies' },
              { id: 'scenarios', label: 'Three Annual Budget Scenarios' },
              { id: 'reduce-costs', label: 'How to Bring Costs Down' },
              { id: 'find-clinic', label: 'Clinics with Transparent Pricing' },
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

          <section id="why-annual">
            <h2>Why Annual Cost Matters More Than Purchase Price</h2>
            <p>
              Our{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                hair system cost guide
              </Link>{' '}
              covers what you&apos;ll pay upfront: £200 to £1,500 for the unit 
              plus fitting. But that number is misleading on its own. A hair 
              system isn&apos;t a one-off purchase like a pair of shoes. It&apos;s 
              an ongoing commitment with recurring costs that can easily 
              exceed the initial purchase within a few months.
            </p>
            <p>
              The three recurring costs are: replacement units (because systems 
              wear out), maintenance appointments (removal, scalp cleaning, 
              re-bond) and consumable products (adhesives, removers, shampoo). 
              Understanding the annual total is the only honest way to budget 
              for a hair system.
            </p>
          </section>

          <section id="replacement">
            <h2>How Often You&apos;ll Replace Your System</h2>
            <p>
              This is the biggest variable. The base material determines 
              lifespan, and there&apos;s a direct trade-off between how natural 
              a base looks and how long it lasts.
            </p>
          </section>
        </div>

        {/* Base lifespan table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Base Material</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Typical Lifespan</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Units/Year</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Annual Cost (units only)</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { base: 'Ultra-thin skin (0.03mm)', life: '3 – 4 weeks', units: '10 – 12', cost: '£1,500 – £3,600' },
                { base: 'Thin skin (0.06 – 0.10mm)', life: '2 – 4 months', units: '3 – 6', cost: '£450 – £1,800' },
                { base: 'Swiss lace', life: '1 – 2 months', units: '6 – 12', cost: '£900 – £3,600' },
                { base: 'French lace', life: '3 – 6 months', units: '2 – 4', cost: '£300 – £1,200' },
                { base: 'Monofilament', life: '6 – 12 months', units: '1 – 2', cost: '£200 – £600' },
                { base: 'Hybrid (lace + poly)', life: '4 – 8 months', units: '2 – 3', cost: '£300 – £900' },
              ].map((row, i) => (
                <tr key={row.base} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.base}</td>
                  <td className="py-3 px-4">{row.life}</td>
                  <td className="py-3 px-4">{row.units}</td>
                  <td className="py-3 px-4">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Unit costs based on £150 – £300 per stock system. Custom systems cost more. Sources: [1][2][3]
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The uncomfortable truth is that the most natural-looking bases 
            cost the most annually because you go through them faster. An 
            ultra-thin skin system is virtually undetectable, but at 3 to 4 
            weeks per unit, you&apos;re buying a new one every month.
          </p>
          <p>
            Most UK wearers settle on French lace or a lace-poly hybrid as 
            the sweet spot: natural enough to be undetectable to anyone 
            who isn&apos;t specifically looking, durable enough to last 3 to 6 
            months per unit.
          </p>

          <section id="maintenance">
            <h2>Professional Maintenance Costs</h2>
            <p>
              A maintenance appointment typically involves removing the system, 
              cleaning adhesive residue from your scalp, checking for any 
              skin irritation, washing and conditioning the system, then 
              re-bonding it. Some clinics include a trim and style; others 
              charge separately for that.
            </p>
          </section>
        </div>

        {/* Maintenance cost breakdown */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Per Session</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Frequency</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Annual (approx.)</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { loc: 'London (premium clinic)', session: '£150 – £200', freq: 'Every 3 – 4 weeks', annual: '£1,950 – £3,400' },
                { loc: 'London (mid-range)', session: '£70 – £100', freq: 'Every 4 – 6 weeks', annual: '£600 – £1,300' },
                { loc: 'Regional cities', session: '£55 – £85', freq: 'Every 4 – 6 weeks', annual: '£480 – £1,100' },
                { loc: 'DIY at home', session: '£0 (products only)', freq: 'Every 2 – 4 weeks', annual: '£100 – £200' },
              ].map((row, i) => (
                <tr key={row.loc} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.loc}</td>
                  <td className="py-3 px-4">{row.session}</td>
                  <td className="py-3 px-4">{row.freq}</td>
                  <td className="py-3 px-4">{row.annual}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources: London Hair Replacement [4], Oxea London [5], Reddit user reports [6][7], Wisteria Avenue [8]
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The range is wide because it depends almost entirely on where 
            you live and whether you go to a clinic or do it yourself. A 
            Londoner visiting a premium clinic every three weeks could spend 
            over £3,000 a year on maintenance alone. Someone in the East 
            Midlands doing their own re-bonds at home might spend £150.
          </p>

          <section id="products">
            <h2>DIY Products and Supplies</h2>
            <p>
              Whether you maintain your system yourself or go to a clinic, 
              you&apos;ll still buy some products directly. Here&apos;s what the 
              essentials cost in the UK.
            </p>
          </section>
        </div>

        {/* Product costs */}
        <div className="my-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Monthly Product Costs</h3>
          <div className="space-y-3 text-sm">
            {[
              { item: 'Adhesive (tape strips or liquid glue)', cost: '£8 – £15/month', note: 'Walker Tape, Ghost Bond' },
              { item: 'Adhesive remover / solvent', cost: '£3 – £8/month', note: 'Citrus-based or C-22' },
              { item: 'Scalp protector', cost: '£3 – £5/month', note: 'Extends bond life, reduces irritation' },
              { item: 'Sulphate-free shampoo + conditioner', cost: '£3 – £5/month', note: 'Lasts 2 – 3 months per bottle' },
              { item: 'Detangling spray / leave-in conditioner', cost: '£2 – £4/month', note: 'Optional but recommended' },
            ].map((item) => (
              <div key={item.item} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <span className="text-foreground font-medium sm:w-2/5">{item.item}</span>
                <span className="text-primary font-medium sm:w-1/5">{item.cost}</span>
                <span className="text-muted-foreground text-xs sm:w-2/5">{item.note}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total monthly product spend</span>
              <span className="font-bold text-primary">£8 – £20</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Annual product spend</span>
              <span className="font-bold text-primary">£96 – £240</span>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            If you maintain at a clinic, the adhesive cost may be included in 
            your appointment fee. If you do it yourself, adhesive and remover 
            are your biggest recurring expense.
          </p>

          <section id="scenarios">
            <h2>Three Annual Budget Scenarios</h2>
            <p>
              Putting it all together: here&apos;s what three realistic annual 
              budgets look like, from the most cost-conscious approach to the 
              premium end.
            </p>
          </section>
        </div>

        {/* Budget scenario cards */}
        <div className="grid gap-5 sm:grid-cols-3 my-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-[10px] font-semibold text-green-800 dark:text-green-300 uppercase tracking-wider mb-3">Budget</span>
            <p className="text-3xl font-bold text-foreground">£1,000 – £1,500</p>
            <p className="text-xs text-muted-foreground mb-4">per year</p>
            <div className="space-y-2 text-sm">
              {[
                'French lace or mono base (2 – 3 units/year)',
                'Stock systems at £150 – £250 each',
                'DIY maintenance at home',
                'Products: ~£100 – £150/year',
                'Occasional salon haircut: £80 – £120/year',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                  <span className="text-muted-foreground text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider mb-3">Mid-Range</span>
            <p className="text-3xl font-bold text-foreground">£2,500 – £4,000</p>
            <p className="text-xs text-muted-foreground mb-4">per year</p>
            <div className="space-y-2 text-sm">
              {[
                'French lace or hybrid base (3 – 4 units/year)',
                'Mix of stock and custom: £200 – £400 each',
                'Clinic maintenance every 4 – 6 weeks',
                'Session cost: £70 – £100 each',
                'Products: ~£150 – £200/year',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                  <span className="text-muted-foreground text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-6 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-3">Premium</span>
            <p className="text-3xl font-bold text-foreground">£5,000 – £8,000+</p>
            <p className="text-xs text-muted-foreground mb-4">per year</p>
            <div className="space-y-2 text-sm">
              {[
                'Ultra-thin skin or Swiss lace (6 – 12 units/year)',
                'Custom systems: £300 – £500+ each',
                'London premium clinic every 3 weeks',
                'Session cost: £150 – £200 each',
                'Premium products: ~£200 – £300/year',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-muted-foreground text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Most UK wearers land somewhere between £1,500 and £3,000 per year. 
            One Reddit user in Norwich reported spending roughly £100 per month 
            (£1,200 per year) including systems and refits every three weeks [7]. 
            Another in the South West reported around £65 per month for 
            maintenance alone, plus system costs [6]. The range reflects how 
            much choice you have.
          </p>

          <section id="reduce-costs">
            <h2>How to Bring Costs Down</h2>
            <p>
              If the numbers above feel steep, there are practical ways to 
              reduce your annual spend without sacrificing quality.
            </p>
          </section>
        </div>

        {/* Cost reduction tips */}
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'Learn DIY maintenance',
              desc: 'The single biggest saving. Learning to remove, clean and re-bond your own system cuts £500 to £2,000 per year in salon visits. YouTube and r/HairSystem are full of tutorials. Start with a clinic to learn the technique, then transition home.',
            },
            {
              title: 'Buy systems in bulk',
              desc: 'Most suppliers offer discounts when you buy 2 or 3 units at once. A 10 to 20% discount on a £250 system saves you £50 to £150 per year across your annual purchases.',
            },
            {
              title: 'Choose durable bases',
              desc: 'French lace or mono bases cost the same per unit as thin skin but last 2 to 4 times longer. Over a year, that difference adds up to hundreds of pounds.',
            },
            {
              title: 'Stock vs custom systems',
              desc: 'Stock (pre-made) systems run £150 to £300. Custom systems start at £400 and can exceed £1,000. If a stock system matches your needs, the saving is substantial over 3 to 4 purchases per year.',
            },
            {
              title: 'Extend system life with care',
              desc: 'Using a silk pillowcase, rinsing after swimming, applying UV protection and avoiding hair dryer heat on the base can add weeks to each system\'s lifespan.',
            },
            {
              title: 'Find a clinic with package pricing',
              desc: 'Some UK clinics offer annual packages that bundle systems and maintenance at a lower combined rate than paying individually. Ask about ongoing care plans when you enquire.',
            },
          ].map((tip) => (
            <div key={tip.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="find-clinic">
            <h2>Clinics with Transparent Pricing</h2>
            <p>
              One of the frustrations with hair systems is that many clinics 
              don&apos;t publish their prices. Our directory includes pricing 
              tier information where available, so you can compare clinics 
              before booking a consultation. Filter by your city and check 
              which clinics are upfront about costs.
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
                Compare Hair System Clinics Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Find clinics with transparent pricing, read Google 
                reviews and book a free consultation. Filter by city 
                and pricing tier.
              </p>
              <Link
                href="/treatments/hair-systems"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
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
          <p className="text-xs text-muted-foreground mb-4">Pricing verified March 2026.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">System Lifespan and Pricing</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={1}>
            <li>Lordhair — hair system base lifespan by material <a href="https://www.lordhair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Oxea London — hair system pricing and maintenance costs <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>HairSolutions.ie — base material durability comparison <a href="https://www.hairsolutions.ie" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Maintenance Costs</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={4}>
            <li>London Hair Replacement — maintenance session pricing <a href="https://londonhairreplacement.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Oxea London — monthly maintenance plans and per-session costs <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">User Reports</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={6}>
            <li>r/HairSystem — South West UK user cost breakdown <a href="https://reddit.com/r/HairSystem" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>r/HairSystem — Norwich user reporting £100/month total <a href="https://reddit.com/r/HairSystem" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wisteria Avenue — Oxfordshire maintenance pricing <a href="https://www.wisteriaavenue.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Product Costs</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={9}>
            <li>Holistique — adhesive and tape pricing UK <a href="https://www.holistique.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Invisihair — hair system glue and supplies pricing <a href="https://www.invisihair.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair System Purchase Cost', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'Systems vs Transplants', href: '/blog/hair-systems-vs-transplants', icon: '⚖️' },
              { label: 'SMP vs Hair Systems', href: '/blog/smp-vs-hair-systems', icon: '🔬' },
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
