import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  AlertTriangle, Shield, Pill,
  Activity, FileText, Scale
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Finasteride & Minoxidil Side Effects: What the UK\'s Own Data Says (2026)',
  description:
    'MHRA Yellow Card data, clinical trial numbers and NHS guidance on finasteride and minoxidil side effects. Real UK figures, not marketing spin.',
  alternates: {
    canonical: canonicalUrl('/blog/finasteride-minoxidil-side-effects'),
  },
  openGraph: {
    title: 'Finasteride & Minoxidil Side Effects: UK Data Report | Hair Restoration Guide',
    description:
      'What 426 MHRA Yellow Card reports reveal about finasteride side effects, plus the real clinical data on minoxidil. A UK-focused breakdown.',
    url: canonicalUrl('/blog/finasteride-minoxidil-side-effects'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'Can I get finasteride on the NHS?',
    answer:
      'Not for hair loss. Finasteride 1mg (Propecia) is only available via private prescription in the UK. You can get it from your GP privately, from online pharmacies or from hair loss clinics. Finasteride 5mg is available on the NHS, but only for treating an enlarged prostate, not hair loss.',
  },
  {
    question: 'How long do finasteride side effects last after stopping?',
    answer:
      'For most men, side effects resolve within a few weeks of stopping. But the MHRA data shows that in almost half of the 426 sexual dysfunction reports, the outcome was recorded as "not recovered" or "not resolved" even after stopping the drug. This persistence issue is what prompted the MHRA to issue updated safety warnings.',
  },
  {
    question: 'Is minoxidil safer than finasteride?',
    answer:
      'Topical minoxidil has a much milder side effect profile than finasteride. Its most common issues are localised: scalp irritation, dryness and itching. It doesn\'t affect hormones the way finasteride does. Oral minoxidil carries more risk (cardiovascular effects, fluid retention) and should be prescribed and monitored by a doctor.',
  },
  {
    question: 'Do finasteride side effects happen to everyone?',
    answer:
      'No. Clinical trials put the rate of medication-related sexual dysfunction at around 1.2% to 1.4% of users, compared to 1% in the placebo group. So the actual excess risk appears small in trials. But the MHRA Yellow Card reports suggest that when side effects do occur, they can be serious and sometimes persistent.',
  },
  {
    question: 'What non-drug alternatives exist for hair loss?',
    answer:
      'Several. Hair systems give you a full head of hair without any medication. SMP (scalp micropigmentation) creates the appearance of a buzz cut. PRP therapy uses your own blood plasma to stimulate growth. Low-level laser therapy is another option, though evidence is more limited. Our directory lists clinics offering all of these across the UK.',
  },
  {
    question: 'Can women use finasteride or minoxidil?',
    answer:
      'Women should not use finasteride; it can cause birth defects in male babies and is not licensed for women in the UK. Minoxidil is used by women and is available in 2% and 5% concentrations. The 5% version is generally more effective but carries a higher chance of unwanted facial hair growth.',
  },
]

export default function FinasterideMinoxidilSideEffectsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Finasteride & Minoxidil Side Effects: What the UK\'s Own Data Says (2026)',
    description:
      'MHRA Yellow Card data, clinical trial numbers and NHS guidance on finasteride and minoxidil side effects. Real UK figures, not marketing spin.',
    url: canonicalUrl('/blog/finasteride-minoxidil-side-effects'),
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
            { label: 'Finasteride & Minoxidil Side Effects' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <FileText className="h-3 w-3" /> Data Report
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Finasteride and Minoxidil Side Effects: What the UK&apos;s Own Data Says
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Millions of men take hair loss medication every year. Most of them 
            have never seen the actual side effect data. The UK&apos;s medicines 
            regulator, the MHRA, publishes it; we pulled it together with clinical 
            trial figures so you can see what the numbers really say.
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
              { id: 'how-popular', label: 'How Popular Are These Drugs in the UK?' },
              { id: 'finasteride-mhra', label: 'Finasteride: The MHRA Yellow Card Data' },
              { id: 'finasteride-effectiveness', label: 'How Effective Is Finasteride?' },
              { id: 'minoxidil-side-effects', label: 'Minoxidil: Side Effects by Type' },
              { id: 'minoxidil-effectiveness', label: 'How Effective Is Minoxidil?' },
              { id: 'nhs-says', label: 'What the NHS Actually Recommends' },
              { id: 'alternatives', label: 'Non-Drug Alternatives' },
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

          {/* How popular */}
          <section id="how-popular">
            <h2>How Popular Are These Drugs in the UK?</h2>
            <p>
              Finasteride and minoxidil are the two most widely used hair loss 
              medications worldwide. In the UK, they sit at opposite ends of the 
              accessibility spectrum.
            </p>
            <p>
              <strong>Finasteride</strong> requires a prescription. At the 1mg 
              dose used for hair loss (branded as Propecia), it&apos;s only available 
              privately. The NHS does not prescribe finasteride for pattern hair 
              loss. The 5mg version (Proscar) is available on the NHS, but only 
              for benign prostatic hyperplasia. In the 12 months to March 2024, 
              4.3 million prescriptions for finasteride 5mg were dispensed in 
              English primary care alone [1]. The MHRA has noted it cannot obtain 
              accurate usage data for the 1mg dose because of its private 
              prescription status [2].
            </p>
            <p>
              <strong>Minoxidil</strong> is available over the counter. You can 
              buy it at Boots, Superdrug or any high-street pharmacy without a 
              prescription. It comes as a topical solution, foam or spray (2% 
              and 5% concentrations), and more recently as low-dose oral tablets 
              prescribed off-label by dermatologists.
            </p>
          </section>

          {/* Finasteride MHRA data */}
          <section id="finasteride-mhra">
            <h2>Finasteride: The MHRA Yellow Card Data</h2>
            <p>
              The Yellow Card scheme is the UK&apos;s system for reporting suspected 
              side effects of medicines. Anyone can submit a report: patients, 
              pharmacists and doctors. The MHRA published a comprehensive safety 
              review of finasteride in 2024 [2]. Here&apos;s what the data shows.
            </p>
          </section>
        </div>

        {/* MHRA data cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-foreground">Sexual Dysfunction</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Yellow Card reports</span>
                <span className="font-medium text-foreground">426</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Outcome: &quot;not recovered&quot;</span>
                <span className="font-medium text-amber-700 dark:text-amber-400">~50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Includes</span>
                <span className="font-medium text-foreground">Erectile dysfunction, decreased libido</span>
              </div>
              <div className="border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">Reports from Nov 1992 to April 2024. Covers both 1mg and 5mg doses. [2]</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-semibold text-foreground">Psychiatric Effects</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Yellow Card reports</span>
                <span className="font-medium text-foreground">281</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Suicidal behaviour reports</span>
                <span className="font-medium text-red-700 dark:text-red-400">14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Includes</span>
                <span className="font-medium text-foreground">Depression, depressed mood, anxiety</span>
              </div>
              <div className="border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">Reports from Feb 1993 to April 2024. Majority are depressed mood disorders. [2][3]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            A few things to keep in mind when reading these numbers. Yellow Card 
            reports are voluntary: not every side effect gets reported, so the 
            true figure could be higher. But they also include both the 1mg (hair 
            loss) and 5mg (prostate) doses, and most prescribed finasteride in 
            the UK is the 5mg version. The MHRA itself notes the data cannot 
            prove causation; it shows correlation.
          </p>
          <p>
            What makes the data noteworthy is the persistence. In almost half 
            the sexual dysfunction reports, the side effect was recorded 
            as &quot;not recovered&quot; or &quot;not resolved&quot; even after stopping 
            finasteride [2]. That&apos;s unusual. Most drug side effects clear up 
            once you stop taking the medicine. The MHRA considered this 
            significant enough to mandate a patient alert card in all 
            finasteride packs [3].
          </p>
          <p>
            The MHRA&apos;s advice for men taking 1mg finasteride for hair loss is 
            blunt: if you develop depression or suicidal thoughts, stop taking 
            the drug immediately and contact your doctor [2][3].
          </p>

          {/* Finasteride effectiveness */}
          <section id="finasteride-effectiveness">
            <h2>How Effective Is Finasteride?</h2>
            <p>
              The side effects need context. Finasteride is popular because, 
              for most men, it works. The clinical data is genuinely strong.
            </p>
          </section>
        </div>

        {/* Effectiveness data table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Measure</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Result</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { measure: 'Men who maintained or increased hair count (12 months)', result: '86%', source: '[4]' },
                { measure: 'Men who experienced improvement in hair growth', result: '91.5%', source: '[5]' },
                { measure: 'Reduction in visible hair loss risk over 5 years', result: '93%', source: '[6]' },
                { measure: 'Hair count increase after 2 years (vertex)', result: '+16% average', source: '[5]' },
                { measure: 'Sexual dysfunction rate in trials (finasteride)', result: '1.2 – 1.4%', source: '[4]' },
                { measure: 'Sexual dysfunction rate in trials (placebo)', result: '1.0%', source: '[4]' },
              ].map((row, i) => (
                <tr key={row.measure} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.measure}</td>
                  <td className="py-3 px-4">{row.result}</td>
                  <td className="py-3 px-4">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Those numbers tell a clear story. Finasteride works for the vast 
            majority of men who take it. The controversy isn&apos;t about effectiveness; 
            it&apos;s about whether the side effect risk, however small in percentage 
            terms, is worth it when the side effects can persist.
          </p>
          <p>
            The gap between the trial data and the MHRA reports is worth noting 
            too. Trials put sexual dysfunction at 1.2 to 1.4% of users. The 
            MHRA has accumulated 426 reports over 30 years across millions of 
            prescriptions. These numbers aren&apos;t contradictory: they suggest 
            that side effects are uncommon but, when they do occur, can be 
            severe enough for people to formally report them.
          </p>

          {/* Minoxidil side effects */}
          <section id="minoxidil-side-effects">
            <h2>Minoxidil: Side Effects by Type</h2>
            <p>
              Minoxidil has a very different risk profile to finasteride. It 
              doesn&apos;t interfere with hormones. Its side effects are mostly 
              localised and mild, particularly in topical form.
            </p>
          </section>
        </div>

        {/* Minoxidil side effect comparison */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Topical Minoxidil</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Common side effects</p>
              {[
                'Scalp irritation, itching and dryness',
                'Flaky or scaling skin at application site',
                'Temporary increased shedding (first 2 – 8 weeks)',
                'Unwanted facial hair growth (~4% of women at 5%)',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 mt-4">Rare side effects</p>
              {[
                'Headaches (rare with topical application)',
                'Dizziness or lightheadedness',
                'Changes in hair colour or texture',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/20" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-foreground">Oral Minoxidil</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3">Common side effects</p>
              {[
                'Hypertrichosis (excess body hair) in ~80% of users',
                'Fluid retention and weight gain',
                'Increased heart rate (tachycardia)',
                'Nausea, headache and breast tenderness',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/40" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3 mt-4">Serious (monitored)</p>
              {[
                'Pericardial effusion (fluid around the heart)',
                'Low blood pressure causing fainting',
                'Ankle and foot swelling (oedema)',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/20" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The difference between topical and oral minoxidil is significant. 
            Topical application keeps most of the drug on the scalp. Very little 
            gets absorbed into the bloodstream, which is why systemic side 
            effects like heart rate changes are rare with foam or spray.
          </p>
          <p>
            Oral minoxidil is a different story. It was originally developed 
            in the 1970s as a blood pressure medication; the hair growth was a 
            side effect that got repurposed. Low-dose oral minoxidil 
            (0.25mg to 5mg daily) is increasingly prescribed off-label for hair 
            loss, but it requires monitoring. Patients on oral minoxidil should 
            have their blood pressure and heart rate checked regularly [7].
          </p>
          <p>
            One practical note: propylene glycol in the liquid solution is 
            often the cause of scalp irritation, not the minoxidil itself. 
            Switching to the foam version, which doesn&apos;t contain propylene 
            glycol, often resolves the irritation [8].
          </p>

          {/* Minoxidil effectiveness */}
          <section id="minoxidil-effectiveness">
            <h2>How Effective Is Minoxidil?</h2>
            <p>
              Minoxidil doesn&apos;t work as dramatically as finasteride for most 
              men, but it still has solid clinical backing. And because it 
              doesn&apos;t affect hormones, it works for both men and women.
            </p>
          </section>
        </div>

        {/* Minoxidil effectiveness table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Measure</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Result</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { measure: 'Men with reduced alopecia area (5%, 12 months)', result: '62%', source: '[9]' },
                { measure: 'Men reporting increased density (5%, 4 months)', result: '74%+', source: '[10]' },
                { measure: '5% vs 2% extra regrowth over 48 weeks', result: '45% more', source: '[11]' },
                { measure: 'Average density increase (5%, 12 months)', result: '+18.9 hairs/cm²', source: '[9]' },
                { measure: 'Time to first visible results', result: '3 – 6 months', source: '[9][10]' },
                { measure: 'Requires ongoing use', result: 'Yes, indefinitely', source: '[9]' },
              ].map((row, i) => (
                <tr key={row.measure} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.measure}</td>
                  <td className="py-3 px-4">{row.result}</td>
                  <td className="py-3 px-4">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Both finasteride and minoxidil share a critical caveat: if you 
            stop, the benefits reverse. Finasteride&apos;s effects tend to fade 
            within 12 months of stopping. Minoxidil is faster; hair loss 
            typically resumes within weeks. This is a lifetime commitment 
            for as long as you want to keep the results.
          </p>

          {/* NHS recommends */}
          <section id="nhs-says">
            <h2>What the NHS Actually Recommends</h2>
            <p>
              The NHS recognises both medications as treatments for pattern 
              hair loss but takes a notably cautious stance [12].
            </p>
            <p>
              For <strong>finasteride</strong>: the NHS website lists it 
              as a prescription medication for male pattern baldness, notes 
              its mechanism of reducing DHT levels, and clearly flags the risk 
              of sexual side effects and depression. It states that some 
              side effects can continue even after stopping the medication. 
              The NHS does not prescribe finasteride 1mg for hair loss; 
              it&apos;s private-only.
            </p>
            <p>
              For <strong>minoxidil</strong>: the NHS lists it as an over-the-counter 
              treatment. It notes that results take 2 to 4 months to appear, 
              that treatment must continue indefinitely to maintain benefits, 
              and that it doesn&apos;t work for everyone.
            </p>
            <p>
              Neither treatment is positioned by the NHS as a first-line 
              recommendation. The NHS hair loss page covers a range of options 
              including wigs, counselling for the psychological impact, and 
              referral to dermatology for conditions like alopecia areata [12]. 
              The tone is pragmatic: these drugs can help, they have 
              side effects, and there are other paths.
            </p>
          </section>

          {/* Non-drug alternatives */}
          <section id="alternatives">
            <h2>Non-Drug Alternatives</h2>
            <p>
              If the side effect profile puts you off medication, or if you&apos;ve 
              tried finasteride and minoxidil without results, several 
              non-pharmaceutical options are available across the UK.
            </p>
            <p>
              <strong>Hair systems</strong> are the most immediate solution. 
              A custom-made unit bonded to your scalp gives you a full head 
              of hair the same day, with no drugs and no surgery. Our{' '}
              <Link href="/blog/hair-system-cost-uk" className="text-primary hover:underline">
                cost guide
              </Link>{' '}
              covers what you&apos;ll pay. Systems need replacing every 3 to 6 
              months and require maintenance appointments, but there are 
              no systemic side effects.
            </p>
            <p>
              <strong>SMP (scalp micropigmentation)</strong> creates the look 
              of a closely shaved head using cosmetic pigment dots. No 
              medication, no ongoing maintenance bar occasional touch-ups 
              every few years. Read our{' '}
              <Link href="/blog/smp-vs-hair-systems" className="text-primary hover:underline">
                SMP vs hair systems comparison
              </Link>{' '}
              for a detailed breakdown.
            </p>
            <p>
              <strong>PRP therapy</strong> (platelet-rich plasma) uses 
              injections of your own concentrated blood plasma into the scalp. 
              Evidence is promising but still developing, and it typically 
              requires multiple sessions at £200 to £500 each.
            </p>
            <p>
              <strong>Low-level laser therapy</strong> (LLLT) uses devices 
              like laser caps or combs to stimulate follicles. Clinical 
              evidence is more limited than for medication, but it carries 
              effectively no side effects.
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
                Explore Non-Surgical Options Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse clinics offering hair systems, SMP, PRP and other 
                non-drug treatments. Filter by location, check reviews 
                and book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/treatments/hair-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  Hair System Clinics
                </Link>
                <Link
                  href="/treatments/smp"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  SMP Clinics
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
          <p className="text-xs text-muted-foreground mb-4">Data verified March 2026. MHRA figures as of April 2024 publication.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">NHS / Government</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={1}>
            <li>BMJ / OpenPrescribing — finasteride 5mg prescription volumes in England <a href="https://openprescribing.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>MHRA Drug Safety Update — finasteride: risk of psychiatric and sexual side effects <a href="https://www.gov.uk/drug-safety-update/finasteride-risk-of-psychiatric-and-sexual-side-effects" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Pulse Today — MHRA finasteride safety review coverage <a href="https://www.pulsetoday.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>DermNet NZ — finasteride for hair loss: clinical trial data <a href="https://dermnetnz.org/topics/finasteride" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Clinical Research</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={5}>
            <li>Kaufman et al. — Finasteride in the treatment of men with androgenetic alopecia (PubMed / NIH) <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>ResearchGate — 5-year likelihood of visible hair loss progression with finasteride <a href="https://www.researchgate.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Gloucestershire Hospitals NHS Trust — oral minoxidil patient information <a href="https://www.gloshospitals.nhs.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Boots Pharmacy — minoxidil product information and side effects <a href="https://www.boots.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Effectiveness Data</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={9}>
            <li>Wimpole Clinic — minoxidil effectiveness timeline and clinical trial results <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Dr Hair — minoxidil hair density improvements <a href="https://drhair.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Olsen et al. — A randomized clinical trial of 5% topical minoxidil versus 2% (PubMed / NIH) <a href="https://pubmed.ncbi.nlm.nih.gov/12196747/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk — hair loss treatment options <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'All Treatments Compared', href: '/blog/hair-loss-treatments-compared', icon: '⚖️' },
              { label: 'Hair System Cost Guide', href: '/blog/hair-system-cost-uk', icon: '💷' },
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
