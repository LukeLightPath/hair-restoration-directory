import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  Scissors, Scale, Clock, PoundSterling,
  CheckCircle, Eye, Paintbrush
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'SMP vs Hair Systems: Which Is Right for You? (2026 UK Guide)',
  description:
    'A neutral comparison of scalp micropigmentation and hair systems in the UK. Costs, maintenance, who each suits, and whether you can combine both.',
  alternates: {
    canonical: canonicalUrl('/blog/smp-vs-hair-systems'),
  },
  openGraph: {
    title: 'SMP vs Hair Systems: Which Is Right for You? | Hair Restoration Guide',
    description:
      'Side-by-side comparison of SMP and hair systems with real UK pricing, maintenance schedules, and a clear decision framework.',
    url: canonicalUrl('/blog/smp-vs-hair-systems'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'Does SMP look fake?',
    answer:
      'Not when it\'s done well. A skilled technician matches the pigment to your natural hair colour and places dots at varying depths and spacings to mimic real follicles. Up close, good SMP looks like a freshly shaved scalp. The biggest giveaway of poor SMP is dots that are too uniform, too dark, or placed at the wrong angle. That\'s why choosing an experienced practitioner matters more than anything else.',
  },
  {
    question: 'Can you feel a hair system when you touch your head?',
    answer:
      'You can feel the difference if you press down firmly, but in normal contact (someone touching your hair, wind blowing, wearing a hat) it feels like natural hair. Lace bases are the thinnest and feel the most natural to touch. Most wearers say they forget it\'s there within the first week or two.',
  },
  {
    question: 'How long does SMP take to heal?',
    answer:
      'Each session takes 2 to 4 hours, and you\'ll need 2 to 3 sessions spaced about a week apart. After each session, the treated area looks slightly red for 2 to 3 days. You should avoid heavy sweating, swimming, and direct sun for about 5 days after each session. By 7 to 10 days after your final session, everything has settled.',
  },
  {
    question: 'Can you switch from a hair system to SMP later?',
    answer:
      'Yes, and it\'s a common transition. Some men wear a hair system for several years and then decide they want something lower-maintenance. The main consideration is that any scarring or skin irritation from long-term adhesive use needs to heal before SMP can be applied to those areas. Most technicians recommend waiting at least 4 to 6 weeks after removing your last system before starting SMP.',
  },
  {
    question: 'What happens to SMP as you age and go greyer?',
    answer:
      'If your remaining hair goes grey or white, the contrast between your dark SMP dots and lighter natural hair can become noticeable. Most people manage this by either shaving their remaining hair shorter (so the SMP blends better), getting lighter pigment touch-ups, or combining SMP with hair fibres. It\'s worth discussing your long-term colour expectations with your technician before starting.',
  },
  {
    question: 'Is SMP or a hair system better for alopecia?',
    answer:
      'It depends on the type. For alopecia areata (patchy loss), a hair system can cover patches while keeping longer hair. SMP works well for filling in patches if you\'re happy with a short buzz. For alopecia totalis or universalis (total loss), SMP can create the look of a full buzzed head. A hair system gives you actual hair length and styling options. Neither is medically "better"; it comes down to the look you want.',
  },
]

export default function SmpVsHairSystemsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SMP vs Hair Systems: Which Is Right for You? (2026 UK Guide)',
    description:
      'A neutral comparison of scalp micropigmentation and hair systems in the UK. Costs, maintenance, who each suits, and whether you can combine both.',
    url: canonicalUrl('/blog/smp-vs-hair-systems'),
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
            { label: 'SMP vs Hair Systems' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Scale className="h-3 w-3" /> Comparison
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            SMP vs Hair Systems: Which Is Right for You?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            One creates the illusion of a full buzz cut. The other gives you actual 
            hair you can grow, style, and run your fingers through. Both are 
            non-surgical, both work, and both have trade-offs most clinics won&apos;t 
            tell you about upfront. Here&apos;s the honest comparison.
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
              { id: 'quick-comparison', label: 'Quick Comparison' },
              { id: 'how-they-work', label: 'How Each Treatment Works' },
              { id: 'cost-breakdown', label: 'The Real Cost Breakdown' },
              { id: 'daily-life', label: 'Daily Life with Each Option' },
              { id: 'combining', label: 'Can You Combine SMP and a Hair System?' },
              { id: 'who-suits', label: 'Which One Suits You?' },
              { id: 'find-clinic', label: 'Find Clinics Near You' },
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
          <section id="quick-comparison">
            <h2>Quick Comparison</h2>
          </section>
        </div>

        {/* At-a-glance table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3"></th>
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3">SMP</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3">Hair System</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { label: 'What it is', smp: 'Cosmetic tattoo (pigment dots on scalp)', system: 'Prosthetic hair bonded to scalp' },
                { label: 'The look', smp: 'Closely shaved / buzzed', system: 'Any length, any style' },
                { label: 'Upfront cost (UK)', smp: '£800 – £3,500', system: '£200 – £1,500' },
                { label: '5-year total', smp: '£800 – £4,250', system: '£5,200 – £15,800' },
                { label: 'Sessions needed', smp: '2 – 3 (over 2 – 3 weeks)', system: '1 fitting appointment' },
                { label: 'Touch-ups', smp: 'Every 2 – 5 years', system: 'Every 4 – 6 weeks' },
                { label: 'Daily maintenance', smp: 'Shave head, moisturise', system: 'Wash, condition, style' },
                { label: 'Can you swim?', smp: 'Yes, no restrictions', system: 'Yes, with precautions' },
                { label: 'Reversible', smp: 'Semi (fades over 2 – 5 years)', system: 'Fully reversible' },
                { label: 'Pain level', smp: 'Mild (similar to a tattoo)', system: 'None' },
              ].map((row, i) => (
                <tr key={row.label} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.label}</td>
                  <td className="py-3 px-4">{row.smp}</td>
                  <td className="py-3 px-4">{row.system}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The fundamental trade-off: SMP is cheaper long-term and almost 
            maintenance-free, but it locks you into a buzzed look. A hair system 
            gives you actual hair with full styling freedom, but it costs more 
            over time and needs regular attention.
          </p>

          {/* How they work */}
          <section id="how-they-work">
            <h2>How Each Treatment Works</h2>
            <h3>Scalp Micropigmentation (SMP)</h3>
            <p>
              SMP is, in simple terms, a specialised tattoo. A technician uses 
              micro-needles to deposit pigment dots into the upper dermis of your 
              scalp, replicating the look of hair follicles. The dots are placed at 
              varying sizes and densities to match the pattern of a natural shaved head.
            </p>
            <p>
              It takes 2 to 3 sessions, each lasting 2 to 4 hours, spaced about a 
              week apart. After the sessions, you&apos;re done. The pigment settles 
              over 7 to 10 days, and the final result is a natural-looking, 
              closely-shaved appearance. You keep the look by shaving your head 
              every day or two.
            </p>
            <p>
              The pigment does fade gradually over 2 to 5 years, so you&apos;ll need a 
              touch-up session eventually. But between touch-ups, there&apos;s nothing to 
              do beyond your normal shaving routine.
            </p>
            <h3>Hair Systems</h3>
            <p>
              A hair system is a custom-made base (lace, poly, or mono) with real 
              or synthetic hair attached. It gets bonded to your scalp with adhesive 
              or tape and blended with any existing hair. You walk out of the clinic 
              with a full head of hair that you can wash, style, and wear around 
              the clock.
            </p>
            <p>
              Maintenance is the trade-off. Every 4 to 6 weeks, the system needs 
              removing, your scalp needs cleaning, and the system gets re-bonded. 
              The unit itself lasts 3 to 6 months before you need a new one. 
              (Our{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                cost guide
              </Link>{' '}
              breaks down exactly what that looks like financially.)
            </p>
          </section>

          {/* Cost breakdown */}
          <section id="cost-breakdown">
            <h2>The Real Cost Breakdown</h2>
            <p>
              SMP wins on cost. That&apos;s not debatable. But the gap depends on 
              how you maintain your hair system and which tier of SMP you go for.
            </p>
          </section>
        </div>

        {/* Cost comparison cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-sage/40 bg-sage/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Paintbrush className="h-5 w-5 text-sage" />
              <h3 className="text-lg font-semibold text-foreground">SMP Costs</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial treatment (2 – 3 sessions)</span>
                <span className="font-medium text-foreground">£800 – £3,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Touch-up (every 2 – 5 years)</span>
                <span className="font-medium text-foreground">£200 – £500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily products (razor, moisturiser)</span>
                <span className="font-medium text-foreground">£5 – £10/month</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">5-year total</span>
                <span className="font-bold text-sage text-lg">£800 – £4,250</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Hair System Costs</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">System + fitting</span>
                <span className="font-medium text-foreground">£200 – £1,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Maintenance (10x/year)</span>
                <span className="font-medium text-foreground">£500 – £1,000/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Replacement units (2 – 4/year)</span>
                <span className="font-medium text-foreground">£300 – £3,600/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Products</span>
                <span className="font-medium text-foreground">£15 – £30/month</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">5-year total</span>
                <span className="font-bold text-primary text-lg">£5,200 – £15,800</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            At the budget end, SMP costs roughly a quarter of what a hair system 
            costs over five years. At the premium end, it&apos;s still less than a 
            third. The catch is that SMP gives you one look; a hair system gives 
            you any look. How much that flexibility is worth to you is what 
            decides the value equation.
          </p>

          {/* Daily life */}
          <section id="daily-life">
            <h2>Daily Life with Each Option</h2>
            <p>
              This is where the decision gets personal. The right treatment depends 
              on how much time and energy you&apos;re willing to put into your 
              appearance every day.
            </p>
            <h3>Living with SMP</h3>
            <p>
              Your morning routine: shave your head (2 to 3 minutes with an 
              electric foil shaver), apply moisturiser or SPF if you&apos;re going 
              outdoors. That&apos;s it. No appointments, no products, no adjustments.
            </p>
            <p>
              You can swim, sweat, shower, wear hats, sleep however you like. 
              Nobody needs to know unless you tell them. The look doesn&apos;t 
              change with humidity or rain. It doesn&apos;t move, shift, or come loose.
            </p>
            <p>
              The trade-off is that you&apos;re committed to the shaved look. If 
              you grow your remaining hair out beyond stubble length, the difference 
              between pigment dots (flat, 2D) and real hair (3D, textured) becomes 
              visible. SMP works best for people who genuinely like the cropped style.
            </p>
            <h3>Living with a Hair System</h3>
            <p>
              Your routine is similar to having natural hair, with a few extras. 
              You wash and condition it every 2 to 3 days (sulphate-free products). 
              You style it each morning. You sleep on a satin pillowcase to reduce 
              friction. Every 4 to 6 weeks, you go to the clinic for a re-bond.
            </p>
            <p>
              Swimming is fine, but you might want to rinse chlorine out promptly. 
              Exercise is fine: the bond holds through sweating, running, gym work. 
              Most wearers say the system feels completely normal after the first 
              few days. You forget it&apos;s there.
            </p>
            <p>
              The mental overhead is different, though. There&apos;s a low-level 
              awareness that comes with wearing a system: checking the hairline 
              in mirrors, planning around maintenance appointments, budgeting for 
              replacement units. Some people find this empowering (they have total 
              control over their appearance). Others find it exhausting after a year 
              or two.
            </p>
          </section>

          {/* Combining */}
          <section id="combining">
            <h2>Can You Combine SMP and a Hair System?</h2>
            <p>
              Yes. In fact, this combination is increasingly popular, and a growing 
              number of UK clinics offer both services specifically because they 
              work well together.
            </p>
            <p>
              The most common setup: SMP applied to the scalp first, then a hair 
              system worn on top. The SMP creates a shadow effect underneath the 
              system, making the base look darker and more natural (especially with 
              lace bases). When you remove the system for maintenance, your head 
              still looks like a buzzed scalp rather than bare skin with adhesive marks.
            </p>
            <p>
              This approach also gives you a safety net. If you ever decide to stop 
              wearing a system (temporarily or permanently), the SMP means you still 
              look good with a shaved head. You&apos;re not dependent on either treatment alone.
            </p>
            <p>
              Cost-wise, the combined approach adds the SMP cost (£800 to £3,500 
              one-off) on top of your hair system costs. But some people find 
              they can use thinner, Less expensive bases because the SMP 
              provides the scalp contrast that would otherwise need a thicker, more 
              expensive base to achieve.
            </p>
          </section>

          {/* Who suits */}
          <section id="who-suits">
            <h2>Which One Suits You?</h2>
          </section>
        </div>

        {/* Decision framework cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-sage/40 bg-sage/5 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Go with SMP if you:</h3>
            <div className="space-y-2 text-sm">
              {[
                'Like the look of a closely shaved or buzzed head',
                'Want something low-maintenance with minimal ongoing cost',
                'Don\'t want to deal with appointments, adhesives, or products',
                'Are comfortable with a consistent, fixed style',
                'Want to swim, exercise, and travel without any extra thought',
                'Have a limited budget and want the best long-term value',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-sage" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">Go with a hair system if you:</h3>
            <div className="space-y-2 text-sm">
              {[
                'Want actual hair with length, volume, and styling options',
                'Prefer a dramatic, instant transformation',
                'Don\'t mind the ongoing maintenance routine',
                'Want the flexibility to change your look over time',
                'Have the budget for ongoing costs (or plan to self-maintain)',
                'Are dealing with partial loss and want to blend with existing hair',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            If you genuinely can&apos;t decide, book consultations for both. 
            Most SMP and hair system clinics offer free consultations, and 
            seeing each option discussed in the context of your specific hair 
            loss pattern will make the decision much clearer than any article can.
          </p>

          <section id="find-clinic">
            <h2>Find Clinics Near You</h2>
            <p>
              Our directory lists clinics across the UK offering SMP, hair 
              systems, or both. Filter by treatment type, check Google 
              review scores, and book a free consultation to discuss which 
              option fits your situation.
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
                Compare SMP and Hair System Clinics
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse clinics offering SMP, hair systems, or both. Check pricing, 
                read reviews, and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/treatments/smp"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  <Paintbrush className="h-4 w-4" />
                  SMP Clinics
                </Link>
                <Link
                  href="/treatments/hair-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  <Scissors className="h-4 w-4" />
                  Hair System Clinics
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
          <p className="text-xs text-muted-foreground mb-4">Pricing and treatment data verified March 2026.</p>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>MW Aesthetics — SMP pricing and session breakdown <a href="https://mw-aesthetics.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>SMP Clinic — SMP lifespan and fading timeline <a href="https://smp-clinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Skalptec — SMP aftercare and touch-up frequency <a href="https://skalptec.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Creative Scalps — UK SMP pricing by treatment area <a href="https://creativescalps.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Oxea London — hair system pricing and maintenance costs <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Lordhair — hair system lifespan by base material <a href="https://lordhair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>London Hair Replacement — fitting and re-bonding session pricing <a href="https://londonhairreplacement.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>r/HairSystem — user experiences combining SMP with hair systems <a href="https://reddit.com/r/HairSystem" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair System Cost Guide', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'Systems vs Transplants', href: '/blog/hair-systems-vs-transplants', icon: '⚖️' },
              { label: 'What Is a Hair System?', href: '/guides/hair-systems', icon: '📖' },
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
