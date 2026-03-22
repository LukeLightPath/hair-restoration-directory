import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  FileText, Heart, Users, TrendingUp,
  AlertTriangle, Stethoscope
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Women\'s Hair Loss in the UK: The Numbers Nobody Talks About (2026)',
  description:
    '8 million UK women experience hair loss. Here\'s the data on prevalence by age, mental health impact, career consequences and why NHS care is falling short.',
  alternates: {
    canonical: canonicalUrl('/blog/womens-hair-loss-uk'),
  },
  openGraph: {
    title: 'Women\'s Hair Loss in the UK: The Numbers Nobody Talks About | Hair Restoration Guide',
    description:
      'Data on the 8 million UK women affected by hair loss: prevalence by age, the mental health impact and the NHS care gap.',
    url: canonicalUrl('/blog/womens-hair-loss-uk'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'How common is hair loss in women in the UK?',
    answer:
      'Around 8 million women in the UK experience hair loss, according to NHS figures. About 12% of women aged 20 to 29 have some degree of female pattern hair loss, rising to 25% by age 49 and 41% by age 69. By age 80, fewer than half of women retain a full head of hair.',
  },
  {
    question: 'Is female hair loss permanent?',
    answer:
      'It depends on the type. Female pattern hair loss (the most common type) is progressive and usually permanent without treatment. Postpartum shedding and telogen effluvium from stress or illness are almost always temporary. Traction alopecia is reversible if caught early, but permanent if the pulling continues long-term. Alopecia areata is unpredictable: hair sometimes regrows on its own, sometimes it doesn\'t.',
  },
  {
    question: 'Can the NHS help with women\'s hair loss?',
    answer:
      'In theory, yes. Your GP can refer you to dermatology, and NHS patients with long-term hair loss may qualify for a wig prescription. In practice, Alopecia UK found that 64% of people with alopecia are dissatisfied with NHS care, and only 6 out of 42 Integrated Care Boards have a patient pathway for alopecia. Many women report being told hair loss is "just cosmetic" and offered no treatment.',
  },
  {
    question: 'What treatments work for women\'s hair loss?',
    answer:
      'Minoxidil (available over the counter in 2% and 5% forms) is the main medication. Hair systems and toppers offer immediate results without drugs. PRP therapy shows promise but requires multiple sessions. Mesh integration systems let you keep your existing hair while adding volume. The right treatment depends on the type and severity of your hair loss.',
  },
  {
    question: 'Why is women\'s hair loss less talked about than men\'s?',
    answer:
      'Partly because male pattern baldness is more visible (full hairline recession vs diffuse thinning), partly because of stigma. A 2022 survey found 46% of women felt too embarrassed to discuss hair loss with their GP. Hair loss in women carries an extra layer of social pressure because hair is so strongly tied to femininity in Western culture.',
  },
  {
    question: 'Does menopause cause hair loss?',
    answer:
      'Around 50% of women notice thinning during and after menopause. Declining oestrogen levels allow androgens (male hormones present in small amounts in all women) to have a relatively stronger effect on hair follicles, shortening the growth phase. Hormone replacement therapy (HRT) can help in some cases, but it\'s not specifically prescribed for hair loss.',
  },
]

export default function WomensHairLossPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Women\'s Hair Loss in the UK: The Numbers Nobody Talks About (2026)',
    description:
      '8 million UK women experience hair loss. Data on prevalence by age, mental health impact, career consequences and why NHS care is falling short.',
    url: canonicalUrl('/blog/womens-hair-loss-uk'),
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
            { label: 'Women\'s Hair Loss in the UK' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <FileText className="h-3 w-3" /> Data Report
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Women&apos;s Hair Loss in the UK: The Numbers Nobody Talks About
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Eight million women in the UK live with hair loss. That&apos;s 
            roughly one in four adult women. Yet most hair loss content, 
            most advertising and most clinic marketing is aimed squarely 
            at men. Here&apos;s the data on what women are actually dealing with.
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
              { id: 'how-common', label: 'How Common Is Hair Loss in Women?' },
              { id: 'types', label: 'The Different Types of Women\'s Hair Loss' },
              { id: 'mental-health', label: 'The Mental Health Data' },
              { id: 'career-relationships', label: 'Career and Relationship Impact' },
              { id: 'nhs-gap', label: 'Why NHS Care Is Falling Short' },
              { id: 'treatments', label: 'What Treatment Options Exist for Women' },
              { id: 'find-clinic', label: 'Find a Clinic That Treats Women' },
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

          {/* Prevalence */}
          <section id="how-common">
            <h2>How Common Is Hair Loss in Women?</h2>
            <p>
              More common than most people realise. Around 8 million women in 
              the UK experience some form of hair loss [1][2]. A third of 
              women will deal with it at some point in their lives [1].
            </p>
            <p>
              Female pattern hair loss (FPHL) is the most common type. It 
              doesn&apos;t follow the same receding hairline pattern as male 
              baldness; instead, hair thins gradually across the top of the 
              scalp, often starting at the parting. The prevalence rises 
              sharply with age.
            </p>
          </section>
        </div>

        {/* Age prevalence table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Age Group</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Women Affected</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Source</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { age: '20 – 29', pct: '12%', source: '[3]' },
                { age: '30 – 49', pct: '25%', source: '[3]' },
                { age: '50 – 69', pct: '41%', source: '[3]' },
                { age: '70+', pct: '50%+', source: '[1][3]' },
                { age: '80+', pct: 'Fewer than 45% retain full hair', source: '[4]' },
              ].map((row, i) => (
                <tr key={row.age} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.age}</td>
                  <td className="py-3 px-4">{row.pct}</td>
                  <td className="py-3 px-4">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Those numbers mean a 25-year-old woman experiencing thinning 
            hair is far from unusual. One in eight women her age are going 
            through the same thing. By midlife, it&apos;s one in four.
          </p>

          {/* Types */}
          <section id="types">
            <h2>The Different Types of Women&apos;s Hair Loss</h2>
            <p>
              Women&apos;s hair loss isn&apos;t one condition. It falls into several 
              categories, each with different causes, progression and 
              treatment responses.
            </p>
          </section>
        </div>

        {/* Types cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              title: 'Female Pattern Hair Loss',
              desc: 'Gradual thinning at the crown and parting. Hormonal and genetic. Affects 40% of women by age 50. Progressive without treatment.',
              prevalence: '40% by age 50',
              colour: 'primary',
            },
            {
              title: 'Postpartum Shedding',
              desc: 'Sudden hair fall 2 to 4 months after childbirth, triggered by the drop in oestrogen. Usually resolves within 6 to 12 months without treatment.',
              prevalence: '20 – 45% of new mothers',
              colour: 'primary',
            },
            {
              title: 'Menopause-Related Thinning',
              desc: 'Declining oestrogen lets androgens affect follicles more. Thinning typically starts at the parting and crown. Begins in the late 40s to early 50s.',
              prevalence: '~50% of menopausal women',
              colour: 'primary',
            },
            {
              title: 'Alopecia Areata',
              desc: 'An autoimmune condition causing patchy, sometimes total hair loss. Unpredictable: can resolve on its own or progress. Affects about 0.6% of UK women.',
              prevalence: '~0.6% of women',
              colour: 'primary',
            },
            {
              title: 'Traction Alopecia',
              desc: 'Caused by tight hairstyles pulling on follicles over time. Reversible if caught early, permanent if the tension continues. Disproportionately affects Black women.',
              prevalence: 'Varies by hairstyle practice',
              colour: 'primary',
            },
            {
              title: 'Telogen Effluvium',
              desc: 'Temporary, diffuse shedding triggered by stress, illness, surgery, crash diets or medication changes. Hair usually regrows within 6 to 9 months once the trigger resolves.',
              prevalence: 'Second most common type in women',
              colour: 'primary',
            },
          ].map((type) => (
            <div key={type.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-base font-semibold text-foreground mb-1">{type.title}</h3>
              <span className="inline-block text-xs font-medium text-primary mb-3">{type.prevalence}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The crucial difference from men: women&apos;s hair loss rarely 
            leads to complete baldness. Instead, the hair thins progressively, 
            becoming finer and sparser. This makes it easier to dismiss 
            (&quot;It&apos;s just thinning&quot;) but no less distressing for the women 
            living with it.
          </p>

          {/* Mental health */}
          <section id="mental-health">
            <h2>The Mental Health Data</h2>
            <p>
              This is where the numbers get difficult. Hair loss in women 
              carries a psychological weight that research consistently 
              shows is severe.
            </p>
          </section>
        </div>

        {/* Mental health stat cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 my-8">
          {[
            { stat: '78%', label: 'experience shame, anxiety or depression', source: '[5]', icon: Heart },
            { stat: '55%', label: 'report lost confidence', source: '[6]', icon: Users },
            { stat: '31%', label: 'feel depressed due to hair loss', source: '[6]', icon: AlertTriangle },
            { stat: '46%', label: 'too embarrassed to see their GP', source: '[6]', icon: Stethoscope },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
              <item.icon className="mx-auto h-5 w-5 text-primary mb-2" />
              <p className="text-3xl font-bold text-foreground">{item.stat}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.label}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-2">{item.source}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            A 2022 UK population-based study found that people with alopecia 
            areata were 30 to 38% more likely to develop new-onset depression 
            or anxiety than matched controls [7]. The psychological impact 
            was greater in women than in men [7].
          </p>
          <p>
            Nearly 70% of women in a 2022 Hair Gain survey said their hair 
            was crucial to their wellbeing and self-esteem [6]. For context, 
            39% of women in the same survey said they&apos;d experienced thinning 
            before the age of 35. That&apos;s a lot of young women carrying 
            something they feel they can&apos;t talk about.
          </p>

          {/* Career and relationships */}
          <section id="career-relationships">
            <h2>Career and Relationship Impact</h2>
            <p>
              The consequences go beyond how women feel about themselves. 
              The data shows measurable effects on careers and relationships.
            </p>
          </section>
        </div>

        {/* Impact data cards */}
        <div className="grid gap-5 sm:grid-cols-3 my-8">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-6">
            <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-3" />
            <p className="text-2xl font-bold text-foreground">63%</p>
            <p className="text-sm text-muted-foreground mt-1">of women report career-related problems due to hair loss [8]</p>
          </div>
          <div className="rounded-2xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 p-6">
            <Heart className="h-5 w-5 text-red-600 dark:text-red-400 mb-3" />
            <p className="text-2xl font-bold text-foreground">40%</p>
            <p className="text-sm text-muted-foreground mt-1">have experienced relationship problems connected to hair loss [8]</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <Users className="h-5 w-5 text-primary mb-3" />
            <p className="text-2xl font-bold text-foreground">82%</p>
            <p className="text-sm text-muted-foreground mt-1">higher risk of unemployment for those with alopecia areata [7]</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            That 82% unemployment figure comes from a rigorous UK 
            population-based cohort study, not a small survey [7]. The same 
            study found a 56% higher risk of taking sick leave. These aren&apos;t 
            abstract statistics; they represent real careers derailed and 
            real income lost.
          </p>
          <p>
            A quarter of women in one survey said hair loss had negatively 
            affected their love life, with 14% specifically saying they felt 
            undesirable to their partner [6]. The loneliness of dealing with 
            an issue that feels too shameful to discuss openly compounds 
            every other impact.
          </p>

          {/* NHS gap */}
          <section id="nhs-gap">
            <h2>Why NHS Care Is Falling Short</h2>
            <p>
              Alopecia UK, the national charity, published a damning 
              report in 2025 based on Freedom of Information requests to 
              every Integrated Care Board in England [9]. The findings were 
              stark.
            </p>
          </section>
        </div>

        {/* NHS gap stats */}
        <div className="my-8 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h3 className="text-base font-semibold text-foreground mb-4">NHS Alopecia Care: Key Findings</h3>
          <div className="space-y-4 text-sm">
            {[
              { stat: '64%', desc: 'of people with alopecia are dissatisfied with NHS care' },
              { stat: '6 out of 42', desc: 'Integrated Care Boards have a patient pathway for alopecia' },
              { stat: '46%', desc: 'dissatisfied with GP care specifically' },
              { stat: '72%', desc: 'dissatisfied with psychological support from the NHS' },
              { stat: '36%', desc: 'dissatisfied with dermatology appointments' },
            ].map((item) => (
              <div key={item.desc} className="flex items-baseline gap-3">
                <span className="text-xl font-bold text-primary shrink-0 w-20 text-right">{item.stat}</span>
                <span className="text-muted-foreground">{item.desc}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
              Source: Alopecia UK &quot;Health inequality in plain sight&quot; report (2025) and earlier community survey (2023) [9][10]
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The core problem is structural. Without a dedicated care pathway, 
            GPs have no clear route for referral. Many women report being told 
            their hair loss is &quot;just cosmetic&quot; and sent away without 
            treatment options [9].
          </p>
          <p>
            Wig provision through the NHS exists but is inconsistent. Some 
            areas provide funding for one or two synthetic wigs per year; 
            others offer nothing. There&apos;s no national standard, and women 
            often don&apos;t know they may be eligible [10].
          </p>
          <p>
            The 72% dissatisfaction with psychological support is perhaps 
            the most concerning figure. When hair loss drives depression, 
            anxiety and social withdrawal, the absence of mental health 
            support isn&apos;t a gap: it&apos;s a failure.
          </p>

          {/* Treatment options */}
          <section id="treatments">
            <h2>What Treatment Options Exist for Women</h2>
            <p>
              Outside the NHS bottleneck, women have more options than many 
              realise. Here&apos;s what&apos;s available in the UK, organised by 
              how quickly each delivers results.
            </p>
            <h3>Immediate Results</h3>
            <p>
              <strong>Hair systems and toppers</strong> offer instant 
              transformation. A topper clips onto your existing hair to add 
              volume at the crown and parting. A full hair system provides 
              complete coverage. Both use real or high-quality synthetic hair, 
              and can be customised to match your natural colour and texture. 
              No drugs, no surgery, no waiting.
            </p>
            <p>
              <strong>Mesh integration systems</strong> (sometimes called 
              Intralace or Volumizer systems) weave a breathable mesh into 
              your existing hair, adding volume without covering what you 
              still have. They&apos;re popular for women with diffuse thinning 
              who want to keep their natural hair visible.
            </p>
            <h3>Medium-Term (3 – 12 Months)</h3>
            <p>
              <strong>Minoxidil</strong> is available over the counter at 
              2% and 5% concentrations. It&apos;s the only medication widely 
              used for female pattern hair loss in the UK (finasteride 
              is not licensed for women). Results typically appear after 
              3 to 6 months. Read our{' '}
              <Link href="/blog/finasteride-minoxidil-side-effects" className="text-primary hover:underline">
                side effects guide
              </Link>{' '}
              for the full data.
            </p>
            <p>
              <strong>PRP therapy</strong> involves injecting platelet-rich 
              plasma from your own blood into the scalp. Research is 
              promising for female pattern hair loss, with most protocols 
              requiring 3 to 4 sessions at £200 to £500 each, followed 
              by annual maintenance sessions.
            </p>
            <h3>Complementary Options</h3>
            <p>
              <strong>Low-level laser therapy</strong> (LLLT) uses light 
              energy to stimulate follicles. Evidence is limited but 
              growing. Home devices (laser caps and combs) cost £200 to 
              £800 and carry no meaningful side effects.
            </p>
            <p>
              <strong>Trichology consultations</strong> can identify the 
              specific cause of hair loss and rule out underlying conditions 
              (thyroid disorders, iron deficiency, PCOS) that may be 
              treatable. Our directory lists trichologists across the UK.
            </p>
          </section>

          {/* Find a clinic */}
          <section id="find-clinic">
            <h2>Find a Clinic That Treats Women</h2>
            <p>
              Not every hair restoration clinic serves women, and not every 
              one that does has the specialist experience women&apos;s hair loss 
              requires. Our directory lets you filter clinics by gender 
              suitability so you can find a clinic that specifically 
              treats female clients.
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
                Find Clinics for Women Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics offering hair systems, toppers, PRP, 
                trichology and other treatments for women. Check reviews 
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
                  href="/treatments/trichology"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  <Stethoscope className="h-4 w-4" />
                  Trichology Clinics
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
          <p className="text-xs text-muted-foreground mb-4">Data verified March 2026.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">NHS / Clinical</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={1}>
            <li>Aventus Clinic / NHS data — female hair loss prevalence and statistics <a href="https://aventusclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Wimpole Clinic — 8 million women UK hair loss figure <a href="https://wimpoleclinic.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Gan &amp; Sinclair — prevalence of female pattern hair loss by age (PubMed / NIH) <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>DermNet NZ / British Association of Dermatologists — female pattern hair loss <a href="https://dermnetnz.org/topics/female-pattern-hair-loss" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Surveys and Reports</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={5}>
            <li>Chemist4U — 2025 women and alopecia study (78% shame, anxiety, depression) <a href="https://www.chemist-4-u.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Hair Gain / Gerrardinternational — 2022 UK hair loss survey (2,000+ respondents) <a href="https://gerrardinternational.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Thompson et al. — 2022 UK population-based cohort study: alopecia areata, depression, anxiety and employment <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Belgravia Centre / Hairline International — career and relationship impact data <a href="https://www.belgraviacentre.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Charity and Advocacy</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={9}>
            <li>Alopecia UK — &quot;Health inequality in plain sight&quot; report (2025 FOI findings) <a href="https://www.alopecia.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Alopecia UK — NHS satisfaction survey and wig provision research (2023) <a href="https://www.alopecia.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Types and Conditions</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={11}>
            <li>Belgravia Centre — postpartum telogen effluvium prevalence (20-45%) <a href="https://www.belgraviacentre.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>My Menopause Centre — menopause-related hair thinning statistics <a href="https://www.mymenopausecentre.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Finasteride & Minoxidil Side Effects', href: '/blog/finasteride-minoxidil-side-effects', icon: '💊' },
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
