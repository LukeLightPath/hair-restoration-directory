import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Stethoscope, ArrowRight, MapPin, HelpCircle,
  Scissors, Scale, Clock, PoundSterling,
  CheckCircle, XCircle, AlertTriangle
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Hair Systems vs Hair Transplants: A Data-Backed Comparison (2026)',
  description:
    'An honest, data-backed comparison of hair systems and hair transplants in the UK. Upfront cost, 5-year totals, results, maintenance and who each option suits best.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-systems-vs-transplants'),
  },
  openGraph: {
    title: 'Hair Systems vs Hair Transplants | Hair Restoration Guide',
    description:
      'Neutral, data-backed comparison of the two most popular hair restoration options in the UK. Real costs, realistic timelines and who each one suits best.',
    url: canonicalUrl('/blog/hair-systems-vs-transplants'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'Can you have a hair system while waiting for a transplant to grow in?',
    answer:
      'Yes, and it\'s more common than you might think. Some clinics fit a temporary hair system immediately after a transplant to cover the donor and recipient areas during the 6 to 12 month growth period. The system gets adjusted as the transplanted hair grows in, then removed once you\'re happy with the coverage.',
  },
  {
    question: 'Which option looks more natural?',
    answer:
      'Both can look completely natural when done well. A high-quality hair system with a lace front gives you an undetectable hairline from day one. A successful transplant grows your own hair, so it moves and behaves naturally. The real variable is the skill of the person doing the work, not the method itself.',
  },
  {
    question: 'Do hair transplants work for everyone?',
    answer:
      'No. You need sufficient donor hair (usually from the back and sides of your head) for a transplant to work. If your donor area is thin or if you have diffuse thinning across the whole scalp, a transplant may not give you enough coverage. Advanced Norwood stages (6 and 7) can also be challenging because the area to cover is large relative to available donor hair.',
  },
  {
    question: 'Can you still go bald after a hair transplant?',
    answer:
      'The transplanted hair itself is permanent because it comes from DHT-resistant follicles. But your existing non-transplanted hair can continue to thin around the transplanted area. That\'s why many surgeons recommend finasteride or minoxidil alongside a transplant to slow further loss. Without it, you may need a second procedure later.',
  },
  {
    question: 'How long does a hair system appointment take?',
    answer:
      'An initial fitting typically takes 1.5 to 2.5 hours. This includes measuring, cutting the base to fit your head, blending the hair with any existing hair and styling. Re-bonding appointments (maintenance) are shorter, usually 45 minutes to an hour.',
  },
  {
    question: 'What happens if a hair transplant fails?',
    answer:
      'Poor graft survival (where transplanted follicles don\'t take root) is uncommon with experienced surgeons but it does happen. The main signs are minimal growth after 12 months. If a transplant underperforms, options include a second procedure using remaining donor hair, switching to a hair system or SMP to fill in density. The money spent on the first procedure is not recoverable.',
  },
]

export default function SystemsVsTransplantsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hair Systems vs Hair Transplants: A Data-Backed Comparison (2026)',
    description:
      'An honest, data-backed comparison of hair systems and hair transplants in the UK. Upfront cost, 5-year totals, results, maintenance and who each option suits best.',
    url: canonicalUrl('/blog/hair-systems-vs-transplants'),
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
            { label: 'Hair Systems vs Transplants' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Scale className="h-3 w-3" /> Comparison
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Hair Systems vs Hair Transplants: Which One Actually Makes Sense?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Two very different approaches to the same problem. One gives you a full head 
            of hair this afternoon; the other takes a year but the results are permanent. 
            Here&apos;s what the numbers, the timelines and the real-world experience 
            look like for each option in the UK.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 12 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'at-a-glance', label: 'At a Glance' },
              { id: 'cost-comparison', label: 'Upfront Cost vs 5-Year Total' },
              { id: 'results-timeline', label: 'What the Results Actually Look Like' },
              { id: 'maintenance', label: 'The Maintenance Reality' },
              { id: 'who-suits', label: 'Who Each Option Suits Best' },
              { id: 'combining', label: 'Can You Combine Both?' },
              { id: 'find-clinic', label: 'Ready to Explore Your Options?' },
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
          <section id="at-a-glance">
            <h2>At a Glance</h2>
            <p>
              Before the detail, here&apos;s the quick comparison. Both options are 
              legitimate solutions to hair loss, but they work in fundamentally 
              different ways.
            </p>
          </section>
        </div>

        {/* At-a-glance comparison table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3"></th>
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3">Hair System</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground w-1/3">Hair Transplant (FUE)</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { label: 'Type', system: 'Non-surgical', transplant: 'Surgical (local anaesthetic)' },
                { label: 'Upfront cost (UK)', system: '£200 – £1,500', transplant: '£3,000 – £15,000' },
                { label: '5-year total', system: '£5,200 – £15,800', transplant: '£3,500 – £17,000' },
                { label: 'Time to full result', system: 'Same day', transplant: '8 – 12 months' },
                { label: 'How long it lasts', system: '3 – 6 months per unit', transplant: 'Permanent' },
                { label: 'Maintenance', system: 'Every 4 – 6 weeks', transplant: 'Minimal after recovery' },
                { label: 'Pain / downtime', system: 'None', transplant: '7 – 14 days recovery' },
                { label: 'Scarring', system: 'None', transplant: 'Minimal (FUE dot scars)' },
                { label: 'Coverage', system: 'Any area, any density', transplant: 'Limited by donor supply' },
                { label: 'Reversible', system: 'Yes, fully', transplant: 'No' },
              ].map((row, i) => (
                <tr key={row.label} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.label}</td>
                  <td className="py-3 px-4">{row.system}</td>
                  <td className="py-3 px-4">{row.transplant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The table tells one story. The rest of this article fills in the parts 
            that a table can&apos;t capture: what the experience is actually like, where the 
            hidden costs sit, and the situations where one option clearly beats the other.
          </p>

          {/* 2. Cost Comparison */}
          <section id="cost-comparison">
            <h2>Upfront Cost vs 5-Year Total</h2>
            <p>
              This is where most people start, and it&apos;s also where the picture gets 
              complicated. A hair system is dramatically cheaper on day one. But a 
              transplant is a one-off expense, while a hair system is an ongoing 
              commitment.
            </p>
            <h3>Hair System Costs</h3>
            <p>
              A semi-custom hair system (the most popular option in the UK) runs 
              £375 to £700 for the unit and fitting. On top of that, you&apos;re looking at:
            </p>
            <ul>
              <li>Maintenance appointments: £50 to £100 every 4 to 6 weeks</li>
              <li>Replacement units: 2 to 4 per year (£300 to £550 each)</li>
              <li>Products (adhesive, shampoo, conditioner): £15 to £30/month</li>
            </ul>
            <p>
              Over five years, the mid-range total comes to around £12,000. Budget 
              self-maintainers can get that down to about £5,200; premium European 
              hair systems push it toward £15,800. (We broke these numbers down in 
              detail in our{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                hair system cost guide
              </Link>.)
            </p>
            <h3>Hair Transplant Costs</h3>
            <p>
              FUE hair transplants in the UK typically cost between £3,000 and 
              £15,000, depending on the number of grafts. A small crown procedure 
              (1,000 to 1,500 grafts) sits at the lower end. Full frontal and crown 
              coverage (3,000+ grafts) goes higher. Some UK clinics charge per graft 
              (£2 to £5 each); others use flat-rate pricing for different graft bands.
            </p>
            <p>
              Ongoing costs after a transplant are minimal. Most surgeons recommend 
              finasteride (around £10 to £30/month via an online pharmacy or NHS 
              prescription) to protect the non-transplanted hair. Some patients 
              add PRP sessions (£200 to £500 each, 2 to 4 per year) for the first 
              year or two to support growth. After that, there&apos;s very little cost.
            </p>
          </section>
        </div>

        {/* 5-year cost comparison cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Hair System (5 years)</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year 1 (system + fit + maintenance)</span>
                <span className="font-medium text-foreground">£2,100 – £3,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Years 2 – 5 (per year)</span>
                <span className="font-medium text-foreground">£1,000 – £3,200</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">5-year total</span>
                <span className="font-bold text-primary text-lg">£5,200 – £15,800</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-sage/40 bg-sage/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-sage" />
              <h3 className="text-lg font-semibold text-foreground">Hair Transplant (5 years)</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Procedure</span>
                <span className="font-medium text-foreground">£3,000 – £15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Post-op (meds, PRP, check-ups)</span>
                <span className="font-medium text-foreground">£0 – £2,500</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">5-year total</span>
                <span className="font-bold text-sage text-lg">£3,500 – £17,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The overlap in 5-year costs is real. A mid-range hair system wearer and a 
            mid-range transplant patient end up spending roughly the same amount over 
            five years. The difference is how that money is spread: a lump sum versus 
            monthly payments. Beyond year five, the transplant pulls ahead financially 
            because the ongoing costs are negligible.
          </p>

          {/* 3. Results Timeline */}
          <section id="results-timeline">
            <h2>What the Results Actually Look Like</h2>
            <p>
              This is where the two options differ most.
            </p>
            <h3>Hair System: Instant Transformation</h3>
            <p>
              You walk in, you get fitted, you leave with a full head of hair. The 
              change is immediate and dramatic. Modern systems with lace fronts and 
              quality hair are genuinely undetectable to anyone who isn&apos;t specifically 
              looking. You can choose your density, your hairline position and your 
              style. Want more hair than you ever had naturally? You can.
            </p>
            <p>
              The trade-off is realism over time. A brand-new system looks incredible. 
              After 3 to 4 months of daily wear, the hair quality degrades, the base 
              loosens, and you need a replacement. The cycle repeats.
            </p>
            <h3>Hair Transplant: Slow Burn</h3>
            <p>
              A transplant is a patience game. After the procedure, the transplanted 
              hairs fall out within 2 to 4 weeks (this is normal and expected). New 
              growth starts around month 3 to 4, and the full result takes 8 to 12 
              months to come through. During that awkward middle period, you look 
              roughly the same as before, just with tiny scabs healing.
            </p>
            <p>
              Once the hair grows in, though, it&apos;s your own hair. It grows, it gets 
              cut, it moves naturally in the wind. You wash it like normal hair. No 
              adhesive, no re-bonding, no replacement schedule. A well-executed 
              transplant at month 12 looks natural and stays that way.
            </p>
            <p>
              The limitation is density. A transplant redistributes existing hair; 
              it doesn&apos;t create new follicles. If your donor supply is limited 
              (Norwood 6+), you may not achieve the same fullness as a hair system. 
              And you can&apos;t choose a lower hairline than your donor supply supports 
              without risking an unnatural look later.
            </p>
          </section>

          {/* 4. Maintenance */}
          <section id="maintenance">
            <h2>The Maintenance Reality</h2>
            <p>
              This is where a lot of people change their minds, in both directions.
            </p>
          </section>
        </div>

        {/* Maintenance comparison cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Hair System Maintenance
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { task: 'Re-bonding appointment', freq: 'Every 4 – 6 weeks' },
                { task: 'Washing & conditioning', freq: 'Every 2 – 3 days' },
                { task: 'System replacement', freq: 'Every 3 – 6 months' },
                { task: 'Adhesive/tape re-application (self-maintain)', freq: 'Weekly' },
                { task: 'Product purchases', freq: 'Monthly' },
              ].map((item) => (
                <div key={item.task} className="flex justify-between items-start">
                  <span className="text-muted-foreground">{item.task}</span>
                  <span className="font-medium text-foreground text-right ml-4 shrink-0">{item.freq}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-sage" /> Hair Transplant Maintenance
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { task: 'Post-op wound care', freq: '7 – 14 days' },
                { task: 'Follow-up appointment', freq: '1 – 2 times (first year)' },
                { task: 'Finasteride / minoxidil (recommended)', freq: 'Daily (ongoing)' },
                { task: 'PRP sessions (optional)', freq: '2 – 4x in year one' },
                { task: 'Normal haircuts', freq: 'As needed' },
              ].map((item) => (
                <div key={item.task} className="flex justify-between items-start">
                  <span className="text-muted-foreground">{item.task}</span>
                  <span className="font-medium text-foreground text-right ml-4 shrink-0">{item.freq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Some people genuinely enjoy their hair system routine. They like the control, 
            the ability to change their look, and the regular appointments feel like 
            self-care. Others find the ongoing commitment draining after the first year 
            or two. That frustration is one of the most common reasons people eventually 
            switch to a transplant.
          </p>
          <p>
            On the transplant side, the maintenance is front-loaded. The first two 
            weeks after surgery are uncomfortable, and the next 12 months require 
            patience. But once you&apos;re past that, there&apos;s almost nothing to do. 
            The main ongoing commitment is taking finasteride (a daily pill) to 
            protect the hair you didn&apos;t transplant. Some men choose not to take 
            it, knowing they may need touch-up work later.
          </p>

          {/* 5. Who suits */}
          <section id="who-suits">
            <h2>Who Each Option Suits Best</h2>
            <p>
              Neither option is universally &quot;better&quot;. The right choice depends 
              on your hair loss pattern, your budget, your lifestyle, and honestly, 
              your personality.
            </p>
          </section>
        </div>

        {/* Who suits cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">A hair system makes more sense if you:</h3>
            <div className="space-y-2 text-sm">
              {[
                'Want a full head of hair today, not in 12 months',
                'Have advanced hair loss (Norwood 5+) with limited donor hair',
                'Don\'t want surgery or can\'t have it for medical reasons',
                'Prefer lower upfront cost and are OK with ongoing payments',
                'Want the flexibility to change your style, colour or density',
                'Have alopecia areata, trichotillomania or medical hair loss',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-sage/40 bg-sage/5 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">A hair transplant makes more sense if you:</h3>
            <div className="space-y-2 text-sm">
              {[
                'Want a permanent, one-time solution',
                'Have adequate donor hair (Norwood 2 – 4 is ideal)',
                'Can afford the upfront cost or have financing',
                'Don\'t want ongoing maintenance appointments',
                'Are patient enough to wait 8 – 12 months for the full result',
                'Want your own growing hair, not a prosthetic',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-sage" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            A few situations where the decision is clearest: if your donor area is 
            thin and you need full coverage, a hair system is really your only option 
            for that level of density. And if you have early-stage loss (Norwood 2 or 3) 
            with a strong donor area, a transplant will likely give you the best 
            long-term value and the most natural result.
          </p>

          {/* 6. Combining */}
          <section id="combining">
            <h2>Can You Combine Both?</h2>
            <p>
              Yes, and more people are doing it than you&apos;d expect.
            </p>
            <p>
              The most common combination is a hair transplant to restore the hairline 
              and front density, with a hair system covering the crown where 
              donor hair wouldn&apos;t stretch far enough. This gives you natural, 
              transplanted hair at the front (the area people notice most) and system 
              coverage where it&apos;s less visible.
            </p>
            <p>
              Another approach: wearing a hair system now while saving for a 
              transplant. Some people wear a system for a year or two, then transition 
              to a transplant when their budget allows. The reverse also happens. People 
              who had a transplant 10+ years ago and have experienced further thinning 
              sometimes add a system to regain the density they had right after their transplant grew in.
            </p>
            <p>
              SMP (scalp micropigmentation) is another pairing worth mentioning. 
              Some clinics use SMP underneath a hair system to create the illusion of 
              a fuller scalp, making the system look even more natural. Others use SMP 
              to add density around a transplant.
            </p>
          </section>

          {/* 7. Find a Clinic */}
          <section id="find-clinic">
            <h2>Ready to Explore Your Options?</h2>
            <p>
              The best next step is a consultation, ideally at a clinic that offers 
              both options so you get unbiased advice. If a clinic only does 
              transplants, they&apos;ll recommend a transplant. If they only do systems, 
              they&apos;ll recommend a system. Clinics that offer both have no reason 
              to push you toward either one.
            </p>
            <p>
              Look for clinics with high Google review scores, real before-and-after 
              photos and transparent pricing. Most offer free initial consultations 
              where you can discuss your specific situation and get a realistic 
              assessment of what each option would involve for you.
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
                Find Clinics That Offer Both Options
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Compare hair system and hair transplant clinics across the UK. 
                Check services, read Google reviews and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/treatments/hair-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  <Scissors className="h-4 w-4" />
                  Hair System Clinics
                </Link>
                <Link
                  href="/treatments/transplant"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  <Stethoscope className="h-4 w-4" />
                  Hair Transplant Clinics
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
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Aventus Clinic — FUE transplant pricing and graft bands <a href="https://aventusclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wimpole Clinic — 2026 average UK transplant cost data <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>GraftWise — per-graft pricing breakdown by technique <a href="https://graftwise.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Oxea London — hair system pricing and maintenance <a href="https://oxealondon.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>London Hair Replacement — fitting and re-bonding costs <a href="https://londonhairreplacement.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Lordhair — hair system lifespan by base material <a href="https://lordhair.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>DermNet NZ — finasteride prescribing data and clinical trials <a href="https://dermnetnz.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wimpole Clinic — hair transplant month-by-month growth timeline <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>r/HairTransplants — user recovery experiences and costs <a href="https://reddit.com/r/HairTransplants" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair System Cost Guide', href: '/blog/hair-system-cost-uk', icon: '💷' },
              { label: 'What Is a Hair System?', href: '/guides/hair-systems', icon: '📖' },
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
