import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  Scissors, Scale, Clock, Search,
  CheckCircle, XCircle, Minus, Paintbrush, Pill, Syringe, Stethoscope
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Every Hair Loss Treatment Compared: Cost, Results & Data (2026 UK)',
  description:
    'A neutral comparison of every major hair loss treatment available in the UK. Hair systems, transplants, SMP, PRP, medication, laser therapy and more with real costs and data.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-loss-treatments-compared'),
  },
  openGraph: {
    title: 'Every Hair Loss Treatment Compared | Hair Restoration Guide',
    description:
      'Side-by-side comparison of all major hair loss treatments in the UK. Real 2026 pricing, effectiveness data and honest pros and cons.',
    url: canonicalUrl('/blog/hair-loss-treatments-compared'),
    type: 'article',
  },
}

/* ── Treatment data ── */
const TREATMENTS = [
  {
    name: 'Hair System',
    type: 'Non-surgical',
    icon: Scissors,
    colour: 'primary',
    upfront: '£200 – £1,500',
    annual: '£1,000 – £3,200',
    fiveYear: '£5,200 – £15,800',
    timeToResult: 'Same day',
    effectiveness: 'High (any stage)',
    maintenance: 'High',
    permanence: 'No (ongoing)',
    pain: 'None',
    bestFor: 'Instant full coverage at any stage of loss',
    link: '/treatments/hair-systems',
  },
  {
    name: 'Hair Transplant (FUE)',
    type: 'Surgical',
    icon: Stethoscope,
    colour: 'sage',
    upfront: '£3,000 – £15,000',
    annual: '£120 – £500',
    fiveYear: '£3,500 – £17,000',
    timeToResult: '8 – 12 months',
    effectiveness: 'High (Norwood 2 – 5)',
    maintenance: 'Low',
    permanence: 'Permanent',
    pain: 'Moderate',
    bestFor: 'Permanent restoration with sufficient donor hair',
    link: '/treatments/transplant',
  },
  {
    name: 'Scalp Micropigmentation',
    type: 'Non-surgical',
    icon: Paintbrush,
    colour: 'primary',
    upfront: '£800 – £3,500',
    annual: '£60 – £120',
    fiveYear: '£800 – £4,250',
    timeToResult: '2 – 3 weeks',
    effectiveness: 'Cosmetic (buzzed look)',
    maintenance: 'Very low',
    permanence: 'Semi (2 – 5 year fade)',
    pain: 'Mild',
    bestFor: 'Low-maintenance buzzed look at any stage',
    link: '/treatments/smp',
  },
  {
    name: 'Finasteride',
    type: 'Medication',
    icon: Pill,
    colour: 'sage',
    upfront: '£0 (NHS) – £30',
    annual: '£120 – £360',
    fiveYear: '£600 – £1,800',
    timeToResult: '3 – 6 months',
    effectiveness: 'Moderate (slows/stops loss)',
    maintenance: 'Daily pill',
    permanence: 'While taking it',
    pain: 'None',
    bestFor: 'Early-stage loss; preventing further thinning',
    link: '/treatments/medication',
  },
  {
    name: 'Minoxidil',
    type: 'Medication',
    icon: Pill,
    colour: 'primary',
    upfront: '£10 – £25',
    annual: '£120 – £300',
    fiveYear: '£600 – £1,500',
    timeToResult: '3 – 6 months',
    effectiveness: 'Moderate (regrowth in some)',
    maintenance: 'Twice daily application',
    permanence: 'While using it',
    pain: 'None',
    bestFor: 'Mild thinning; boosting density alongside other treatments',
    link: '/treatments/medication',
  },
  {
    name: 'PRP Therapy',
    type: 'Non-surgical',
    icon: Syringe,
    colour: 'sage',
    upfront: '£200 – £500 per session',
    annual: '£600 – £2,000',
    fiveYear: '£1,500 – £5,000',
    timeToResult: '3 – 6 months',
    effectiveness: 'Moderate (density boost)',
    maintenance: 'Quarterly sessions',
    permanence: 'Ongoing',
    pain: 'Mild to moderate',
    bestFor: 'Supporting other treatments; early-stage thinning',
    link: '/treatments/prp',
  },
  {
    name: 'Laser Therapy (LLLT)',
    type: 'Non-surgical',
    icon: Search,
    colour: 'primary',
    upfront: '£200 – £800 (device)',
    annual: '£0 (home device)',
    fiveYear: '£200 – £800',
    timeToResult: '3 – 6 months',
    effectiveness: 'Low to moderate',
    maintenance: 'Several sessions/week',
    permanence: 'While using it',
    pain: 'None',
    bestFor: 'Supplementing other treatments; very early thinning',
    link: '/treatments/laser',
  },
]

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'Can you combine multiple hair loss treatments?',
    answer:
      'Yes, and doctors often recommend it. The most common combinations are finasteride plus minoxidil (for prevention and regrowth), a hair transplant plus finasteride (to protect non-transplanted hair), and SMP underneath a hair system (for a more natural look when the system is removed). PRP is also frequently added alongside transplants and medication to boost results. The key is matching treatments to your specific pattern and stage of loss.',
  },
  {
    question: 'Which treatment gives the most natural-looking result?',
    answer:
      'A well-done hair transplant produces the most natural result because it uses your own growing hair. A high-quality hair system is a close second and can achieve greater density than a transplant. SMP creates a convincing buzzed look but doesn\'t add actual hair. Medications preserve what you have rather than creating a visible transformation.',
  },
  {
    question: 'What if I have complete hair loss? Which treatments still work?',
    answer:
      'With total or near-total loss, your options narrow. Hair systems work regardless of how much hair you have. SMP can create a full buzzed-head appearance. Transplants and PRP both require donor hair, which limits them. Medications are preventative and won\'t regrow hair on a fully bald scalp.',
  },
  {
    question: 'Are any of these treatments available on the NHS?',
    answer:
      'Finasteride can be prescribed on the NHS for male pattern baldness, though not all GPs will prescribe it for cosmetic reasons. Minoxidil is available over the counter and doesn\'t need a prescription. All other treatments (transplants, hair systems, SMP, PRP, laser) are considered cosmetic and are not covered by the NHS.',
  },
  {
    question: 'How do I know which treatment is right for my stage of hair loss?',
    answer:
      'For early thinning (Norwood 1 – 2), medication alone may be enough. For moderate loss (Norwood 3 – 4), a transplant or hair system gives visible results. For advanced loss (Norwood 5+), a hair system or SMP is typically the most effective because donor hair may be insufficient for a transplant. A consultation with a clinic that offers multiple treatments will give you the most balanced advice.',
  },
  {
    question: 'What is the cheapest long-term option?',
    answer:
      'Over five years, laser therapy (home device) and medication (finasteride/minoxidil) are the cheapest at roughly £600 to £1,800. SMP comes next at £800 to £4,250. Hair systems are the most expensive ongoing option at £5,200 to £15,800 over five years. Transplants are a large upfront cost but minimal after that, landing at £3,000 to £14,500 over five years depending on whether you need post-op medication.',
  },
]

export default function AllTreatmentsComparedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Every Hair Loss Treatment Compared: Cost, Results & Data (2026 UK)',
    description:
      'A neutral comparison of every major hair loss treatment available in the UK with real costs and data.',
    url: canonicalUrl('/blog/hair-loss-treatments-compared'),
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
            { label: 'All Treatments Compared' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Scale className="h-3 w-3" /> Complete Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Every Hair Loss Treatment Compared: Cost, Results and What the Data Shows
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Seven treatments. Real UK pricing. No affiliate links, no sponsored 
            recommendations. Just a straightforward comparison so you can figure 
            out which option (or combination) fits your situation, your budget, 
            and your expectations.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 14 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'master-table', label: 'The Master Comparison Table' },
              { id: 'cost-ranking', label: '5-Year Cost Ranking' },
              { id: 'hair-systems', label: 'Hair Systems' },
              { id: 'transplants', label: 'Hair Transplants' },
              { id: 'smp', label: 'Scalp Micropigmentation' },
              { id: 'medication', label: 'Medication (Finasteride & Minoxidil)' },
              { id: 'prp', label: 'PRP Therapy' },
              { id: 'laser', label: 'Laser Therapy (LLLT)' },
              { id: 'by-stage', label: 'Which Treatment by Hair Loss Stage' },
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

        {/* ═══ Master Table ═══ */}
        <section id="master-table" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The Master Comparison Table</h2>
          <p className="text-muted-foreground text-sm mb-6">
            All seven treatments side by side. Scroll horizontally on mobile. Costs 
            are based on 2026 UK market data.
          </p>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Treatment</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Upfront</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">5-Year Total</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Time to Result</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Effectiveness</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Maintenance</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Permanent?</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {TREATMENTS.map((t, i) => (
                  <tr key={t.name} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                    <td className="py-3 px-3 font-medium text-foreground">{t.name}</td>
                    <td className="py-3 px-3">{t.upfront}</td>
                    <td className="py-3 px-3 font-medium">{t.fiveYear}</td>
                    <td className="py-3 px-3">{t.timeToResult}</td>
                    <td className="py-3 px-3">{t.effectiveness}</td>
                    <td className="py-3 px-3">{t.maintenance}</td>
                    <td className="py-3 px-3">{t.permanence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ═══ Cost Ranking ═══ */}
        <section id="cost-ranking" className="scroll-mt-20 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">5-Year Cost Ranking</h2>
          <p className="text-muted-foreground text-sm mb-6">
            From cheapest to most expensive over five years. The range reflects 
            budget vs premium choices within each treatment type.
          </p>
          <div className="space-y-3">
            {[
              { name: 'Laser Therapy (LLLT)', range: '£200 – £800', bar: 5, colour: 'bg-emerald-500' },
              { name: 'Minoxidil', range: '£600 – £1,500', bar: 10, colour: 'bg-emerald-500' },
              { name: 'Finasteride', range: '£600 – £1,800', bar: 11, colour: 'bg-emerald-500' },
              { name: 'SMP', range: '£800 – £4,250', bar: 27, colour: 'bg-sky-500' },
              { name: 'PRP Therapy', range: '£1,500 – £5,000', bar: 32, colour: 'bg-sky-500' },
              { name: 'Hair Transplant (FUE)', range: '£3,500 – £17,000', bar: 72, colour: 'bg-amber-500' },
              { name: 'Hair System', range: '£5,200 – £15,800', bar: 100, colour: 'bg-rose-500' },
            ].map((item) => (
              <div key={item.name} className="group">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.range}</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.colour} transition-all duration-500`}
                    style={{ width: `${item.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Cost alone doesn&apos;t tell the full story. Cheaper treatments tend to be 
            preventative (they slow loss rather than restore coverage), while more 
            expensive options deliver visible, immediate results.
          </p>
        </section>

        {/* ═══ Individual Treatment Sections ═══ */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="hair-systems">
            <h2>Hair Systems</h2>
            <p>
              A hair system is a custom-made prosthetic that gets bonded to your 
              scalp with adhesive or tape. You leave the clinic with a full head 
              of hair that you can wash, style and wear continuously. The result 
              is immediate and dramatic.
            </p>
            <p>
              The trade-off is ongoing maintenance. Every 4 to 6 weeks, the system 
              needs a professional re-bond. The unit itself lasts 3 to 6 months 
              before you need a replacement. Over five years, a mid-range hair 
              system wearer spends roughly £12,000, making it the most expensive 
              option long-term.
            </p>
            <p>
              Hair systems work for any stage of hair loss, including total loss. 
              They&apos;re the only option that gives you complete control over 
              density, length, colour and style regardless of how much natural 
              hair you have left.
            </p>
            <p>
              <strong>Read more:</strong>{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                How much does a hair system cost in the UK?
              </Link>
            </p>
          </section>

          <section id="transplants">
            <h2>Hair Transplants</h2>
            <p>
              FUE (follicular unit extraction) is the most common transplant 
              method in the UK. A surgeon extracts individual hair follicles from 
              the back and sides of your head (the donor area) and implants them 
              into thinning or bald areas. The transplanted hair is permanent 
              because it comes from DHT-resistant follicles.
            </p>
            <p>
              The catch is time. Transplanted hairs fall out within a few weeks 
              (normal), then regrow gradually over 8 to 12 months. You won&apos;t 
              see the final result for a year. The catch number two is donor 
              supply. If you&apos;re Norwood 6 or 7, there may not be enough donor 
              hair to cover the area you need.
            </p>
            <p>
              Cost-wise, a transplant is expensive upfront (£3,000 to £15,000) 
              but cheap afterwards. Most surgeons recommend daily finasteride 
              to protect non-transplanted hair, which adds £10 to £30 per month.
            </p>
            <p>
              <strong>Read more:</strong>{' '}
              <Link href="/blog/hair-systems-vs-transplants" className="text-primary hover:underline">
                Hair systems vs hair transplants: the full comparison
              </Link>
            </p>
          </section>

          <section id="smp">
            <h2>Scalp Micropigmentation (SMP)</h2>
            <p>
              SMP deposits tiny dots of pigment into the scalp to replicate 
              the appearance of hair follicles. The result looks like a closely 
              shaved head. It takes 2 to 3 sessions over a few weeks, and the 
              pigment gradually fades over 2 to 5 years before needing a touch-up.
            </p>
            <p>
              It&apos;s the lowest-maintenance option after medication. Once the 
              sessions are done, your daily routine is just shaving your head 
              and applying moisturiser. No appointments, no products, no adhesives.
            </p>
            <p>
              The limitation: you&apos;re committed to the buzzed look. If you 
              want actual hair length, SMP won&apos;t give you that. But for men 
              who like the shaved aesthetic, it&apos;s hard to beat on 
              cost-effectiveness and convenience.
            </p>
            <p>
              <strong>Read more:</strong>{' '}
              <Link href="/blog/smp-vs-hair-systems" className="text-primary hover:underline">
                SMP vs hair systems: which is right for you?
              </Link>
            </p>
          </section>

          <section id="medication">
            <h2>Medication: Finasteride &amp; Minoxidil</h2>
            <p>
              These are the only treatments that target the underlying cause of 
              male pattern baldness (DHT sensitivity) rather than masking its effects.
            </p>
            <p>
              <strong>Finasteride</strong> is a daily tablet that blocks the enzyme 
              (5-alpha reductase) that converts testosterone to DHT. Clinical studies 
              show it stops further hair loss in around 83% to 86% of men and 
              produces some regrowth in roughly two thirds of users. The effect lasts only while 
              you&apos;re taking it. Side effects (reduced libido, erectile 
              changes) affect a small percentage of users. It can be prescribed 
              on the NHS or purchased from online pharmacies for £10 to £30 per month.
            </p>
            <p>
              <strong>Minoxidil</strong> is a topical liquid or foam applied to 
              the scalp twice daily. It increases blood flow to follicles, 
              extending the growth phase. It&apos;s available over the counter 
              at pharmacies for £10 to £25 per month. Results take 3 to 6 months 
              to show, and the effect reverses if you stop using it.
            </p>
            <p>
              Both medications work best for early-stage thinning. They won&apos;t 
              regrow a full head of hair on a bald scalp, but they can maintain 
              existing hair and are often used alongside transplants, PRP or 
              hair systems.
            </p>
          </section>

          <section id="prp">
            <h2>PRP Therapy</h2>
            <p>
              Platelet-rich plasma (PRP) involves drawing a small amount of your 
              blood, spinning it in a centrifuge to concentrate the platelets, 
              and injecting the plasma into your scalp. The growth factors in 
              the platelets are thought to stimulate dormant follicles and 
              improve hair density.
            </p>
            <p>
              The evidence is promising but mixed. Some studies show meaningful 
              density improvements; others show modest results. It&apos;s most 
              often used as a supporting treatment alongside medication, 
              transplants or hair systems rather than as a standalone solution.
            </p>
            <p>
              Sessions cost £200 to £500 each, and most clinics recommend 3 to 4 
              sessions in the first year, then quarterly top-ups. The procedure 
              involves multiple scalp injections, which most people describe as 
              uncomfortable but tolerable.
            </p>
          </section>

          <section id="laser">
            <h2>Laser Therapy (LLLT)</h2>
            <p>
              Low-level laser therapy uses red light wavelengths to stimulate 
              cellular activity in hair follicles. It&apos;s available as 
              clinic treatments or home devices (laser caps, combs, helmets) 
              ranging from £200 to £800.
            </p>
            <p>
              The FDA has cleared several LLLT devices for hair loss, and clinical 
              trials show modest improvements in hair density, particularly for 
              early-stage thinning. It&apos;s painless and has no known side effects.
            </p>
            <p>
              Where laser therapy falls short is dramatic results. Nobody goes 
              from Norwood 5 to a full head of hair with a laser cap. It&apos;s 
              best viewed as a supplement: something that might give your existing 
              hair a density boost alongside medication or other treatments. The 
              five-year cost is the lowest of any treatment because a home device 
              is a one-off purchase.
            </p>
          </section>

          <section id="by-stage">
            <h2>Which Treatment by Hair Loss Stage</h2>
            <p>
              Your stage of hair loss narrows the field significantly. Here&apos;s 
              a realistic guide to what works at each level.
            </p>
          </section>
        </div>

        {/* Stage recommendation cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              stage: 'Early Thinning (Norwood 1 – 2)',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              recommended: ['Finasteride', 'Minoxidil', 'PRP (optional boost)', 'Laser therapy (home device)'],
              note: 'Prevention is the priority. Medication can maintain what you have and may produce regrowth.',
            },
            {
              stage: 'Moderate Loss (Norwood 3 – 4)',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              recommended: ['Hair transplant', 'Hair system', 'SMP', 'Medication (to protect remaining hair)'],
              note: 'This is the sweet spot for transplants. Good donor hair plus manageable recipient area. Systems and SMP also work well.',
            },
            {
              stage: 'Advanced Loss (Norwood 5 – 6)',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              recommended: ['Hair system', 'SMP', 'Transplant (if donor allows)', 'Combined approach'],
              note: 'Donor hair may be limited for a transplant. Hair systems provide the most coverage. SMP gives a clean buzzed look.',
            },
            {
              stage: 'Extensive / Total Loss (Norwood 7+)',
              colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
              recommended: ['Hair system', 'SMP', 'Wigs (for length)'],
              note: 'Transplants are not viable without donor hair. Systems and SMP are the main options for full coverage.',
            },
          ].map((card) => (
            <div key={card.stage} className={`rounded-2xl border p-5 ${card.colour}`}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{card.stage}</h3>
              <div className="space-y-1.5 mb-3">
                {card.recommended.map((r) => (
                  <div key={r} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.note}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            These are guidelines, not rules. Individual anatomy, budget, and 
            lifestyle all play a role. A consultation with a clinic that offers 
            multiple treatment types will give you the most honest assessment 
            because they have no incentive to push one option over another.
          </p>
        </div>

        {/* ═══ CTA ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <MapPin className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find the Right Clinic for Your Treatment
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics by treatment type. Compare Google reviews, 
                check services offered and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/treatments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  Browse All Treatments
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
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
          <p className="text-xs text-muted-foreground mb-4">Pricing and clinical data verified March 2026.</p>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Clinical Research</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>DermNet NZ — finasteride clinical trial data and prescribing information <a href="https://dermnetnz.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NIH / PubMed — finasteride 1mg hair count study results <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Rejuvence Clinic / PubMed — 2025 PRP effectiveness systematic review <a href="https://rejuvenceclinic.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>American Hair Loss Association — LLLT clinical evidence and FDA clearance data <a href="https://americanhairloss.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NIH / PubMed — LLLT for hair loss randomised controlled trials <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Clinic Pricing</h3>
          <ol start={6} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Oxea London — hair system pricing and maintenance <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Aventus Clinic — FUE transplant pricing by graft band <a href="https://aventusclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wimpole Clinic — 2026 average UK transplant cost and growth timeline <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>MW Aesthetics — SMP pricing and session breakdown <a href="https://mw-aesthetics.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>SMP Clinic — SMP lifespan and fading timeline <a href="https://smp-clinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Professional Bodies &amp; Government</h3>
          <ol start={11} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>NHS.uk — hair loss treatments and NHS prescribing guidance <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NICE — finasteride for androgenetic alopecia guidance <a href="https://bnf.nice.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">User Reports</h3>
          <ol start={13} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>r/HairTransplants — user recovery experiences and UK clinic pricing <a href="https://reddit.com/r/HairTransplants" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>r/HairSystem — real user maintenance costs and routines <a href="https://reddit.com/r/HairSystem" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair System Cost Guide', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'Systems vs Transplants', href: '/blog/hair-systems-vs-transplants', icon: '⚖️' },
              { label: 'SMP vs Hair Systems', href: '/blog/smp-vs-hair-systems', icon: '🎯' },
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
