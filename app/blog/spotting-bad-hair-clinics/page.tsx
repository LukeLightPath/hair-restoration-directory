import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, MapPin, HelpCircle,
  FileText, AlertTriangle, CheckCircle,
  XCircle, Search, ShieldCheck
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'How to Spot a Bad Hair Clinic: Red Flags and What Good Ones Get Right (2026)',
  description:
    'A checklist for choosing a UK hair clinic. Red flags to walk away from, green flags to look for, how to read reviews and which professional bodies matter.',
  alternates: {
    canonical: canonicalUrl('/blog/spotting-bad-hair-clinics'),
  },
  openGraph: {
    title: 'How to Spot a Bad Hair Clinic: Red Flags & Green Flags | Hair Restoration Guide',
    description:
      'Pressure selling, hidden costs, fake reviews. How to tell a good UK hair clinic from a bad one, backed by CQC data and real patient experiences.',
    url: canonicalUrl('/blog/spotting-bad-hair-clinics'),
    type: 'article',
  },
}

/* ── FAQ data ── */
const FAQS = [
  {
    question: 'Does a clinic need to be CQC registered?',
    answer:
      'If it performs hair transplant surgery, yes. In England, all clinics offering hair restoration surgery must be registered with the Care Quality Commission. Operating without CQC registration is illegal. For non-surgical treatments like hair systems, SMP or trichology, CQC registration is not required, but clinics may hold other accreditations.',
  },
  {
    question: 'What does a good consultation look like?',
    answer:
      'A good consultation starts with questions about your medical history, lifestyle and what you want to achieve. The clinician should examine your hair and scalp, explain what type of hair loss you have, discuss all suitable options (not just the most expensive one), set realistic expectations, and give you a clear price breakdown with no pressure to book on the spot.',
  },
  {
    question: 'Should I trust Google Reviews for hair clinics?',
    answer:
      'With caution. Google Reviews are useful but can be manipulated. Look for reviews that mention specific details (staff names, procedures, timelines), check for a steady stream over time rather than sudden clusters, and read the negative reviews carefully. Cross-reference with Trustpilot and forum discussions for a fuller picture.',
  },
  {
    question: 'What professional bodies should a hair clinic belong to?',
    answer:
      'For hair transplant surgeons: BAHRS (British Association of Hair Restoration Surgery) and ISHRS (International Society of Hair Restoration Surgery). For trichologists: the Institute of Trichologists, whose register is accredited by the Professional Standards Authority. For cosmetic procedures generally: the JCCP (Joint Council for Cosmetic Practitioners).',
  },
  {
    question: 'Is a free consultation a red flag?',
    answer:
      'Not necessarily. Many reputable clinics offer free initial consultations. The red flag is what happens during the consultation. If a free consultation turns into a hard sell with time-limited discounts and pressure to commit, that is the problem. A legitimate free consultation is informative and leaves you free to decide in your own time.',
  },
  {
    question: 'How can I check if a hair clinic is legitimate?',
    answer:
      'For surgical clinics: search the CQC website for their registration. Check the surgeon is GMC-registered. Look for BAHRS membership. For non-surgical clinics: check for Institute of Trichologists membership, read a cross-section of reviews, verify their physical address exists, and see how long they have been operating.',
  },
]

export default function SpottingBadHairClinicsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Spot a Bad Hair Clinic: Red Flags and What Good Ones Get Right (2026)',
    description:
      'A checklist for choosing a UK hair clinic. Red flags to walk away from, green flags to look for, how to read reviews and which professional bodies matter.',
    url: canonicalUrl('/blog/spotting-bad-hair-clinics'),
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
            { label: 'Spotting Bad Hair Clinics' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <FileText className="h-3 w-3" /> Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            How to Spot a Bad Hair Clinic: Red Flags and What Good Ones Get Right
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The UK hair restoration market is growing fast, and not every 
            clinic deserves your trust. From pressure selling and hidden 
            costs to fake reviews and unlicensed practitioners, here&apos;s 
            a practical checklist for telling the good from the bad.
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
              { id: 'red-flags', label: 'The Red Flags: Walk Away If You See These' },
              { id: 'green-flags', label: 'Green Flags: What Good Clinics Do' },
              { id: 'reading-reviews', label: 'How to Actually Read Clinic Reviews' },
              { id: 'regulation', label: 'UK Regulation: What\'s Required and What\'s Not' },
              { id: 'consultation-checklist', label: 'Your Consultation Checklist' },
              { id: 'find-clinic', label: 'Find Verified Clinics' },
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
          <section id="red-flags">
            <h2>The Red Flags: Walk Away If You See These</h2>
            <p>
              Not every bad clinic is obviously dodgy. Some look professional, 
              have slick websites and run polished Instagram feeds. The red 
              flags are often in the process, not the appearance.
            </p>
          </section>
        </div>

        {/* Red flags cards */}
        <div className="space-y-4 my-8">
          {[
            {
              title: 'Pressure to book on the same day',
              desc: 'Phrases like "this price is only available today" or "we only have one slot left this month" are sales tactics, not medical advice. A clinic that is genuinely good does not need to rush you. Any reputable provider will give you time to think, get a second opinion and make your own decision.',
              severity: 'Critical',
            },
            {
              title: 'No named practitioner or surgeon',
              desc: 'If you cannot find out who will actually perform your treatment before you commit, that is a serious concern. For hair transplants, you should know the surgeon\'s name, qualifications and GMC registration number. For non-surgical treatments, you should know who will be working on you and what their training is.',
              severity: 'Critical',
            },
            {
              title: 'Vague or hidden pricing',
              desc: '"Prices start from..." with no clear upper limit. Or a consultation that ends with a price but no breakdown of what is included. A good clinic gives you an itemised quote covering the treatment, follow-up visits, aftercare products and anything else you will need to pay for.',
              severity: 'High',
            },
            {
              title: 'Guaranteed results or unrealistic promises',
              desc: 'No hair treatment works for everyone. Any clinic guaranteeing a specific number of grafts, a perfect hairline or full regrowth is either lying or doesn\'t understand the biology. Honest clinics discuss typical outcomes, show a range of before-and-after results and explain the limitations.',
              severity: 'High',
            },
            {
              title: 'No visible negative reviews',
              desc: 'Every business gets the occasional negative review. A clinic with exclusively 5-star reviews and no criticism at all is more suspicious than one with a few 3-star reviews that it has responded to thoughtfully. A BBC investigation found that fake Google Reviews are a "significant and persistent problem" among UK medical clinics [1].',
              severity: 'Medium',
            },
            {
              title: 'The "consultation" is actually a sales pitch',
              desc: 'If your first appointment involves more talk about pricing packages, finance options and limited-time offers than it does about your hair, your medical history and your expectations, you are talking to a salesperson, not a clinician. Walk out.',
              severity: 'Critical',
            },
          ].map((flag) => (
            <div key={flag.title} className="rounded-2xl border border-red-500/20 bg-red-50/30 dark:bg-red-950/10 p-5 flex gap-4">
              <XCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-foreground">{flag.title}</h3>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    flag.severity === 'Critical'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      : flag.severity === 'High'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {flag.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{flag.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="green-flags">
            <h2>Green Flags: What Good Clinics Do</h2>
            <p>
              Good clinics aren&apos;t just the absence of red flags. They 
              actively do things that build trust.
            </p>
          </section>
        </div>

        {/* Green flags cards */}
        <div className="space-y-4 my-8">
          {[
            {
              title: 'They ask more questions than they answer',
              desc: 'A good first consultation is 70% listening. The clinician should ask about your medical history, when your hair loss started, what you have tried, what your expectations are and how hair loss affects your daily life. If they jump straight to recommending a treatment without understanding your situation, they are selling, not diagnosing.',
            },
            {
              title: 'Transparent pricing with a written quote',
              desc: 'You should leave a consultation with a clear, written breakdown of costs. This includes the treatment itself, any follow-up visits, aftercare products and ongoing maintenance. No surprises later. Some clinics publish their pricing on their website, which is an even stronger trust signal.',
            },
            {
              title: 'They tell you when treatment is not right for you',
              desc: 'The best clinics turn away clients who are not suitable candidates. If a hair transplant surgeon tells you your donor area is insufficient, or a trichologist says your thinning is likely temporary and does not need treatment, that is a clinic putting your interests first.',
            },
            {
              title: 'Consistent before-and-after photos',
              desc: 'Look for photos taken in the same lighting, from the same angles, with no obvious editing. A clinic that shows 50 results across a range of ages, hair types and Norwood stages is more trustworthy than one showing 5 hand-picked perfect outcomes.',
            },
            {
              title: 'Named practitioners with verifiable credentials',
              desc: 'The clinic should openly identify who will perform your treatment and make it easy to verify their qualifications. For surgeons: GMC registration and BAHRS membership. For trichologists: Institute of Trichologists registration. For SMP artists: training certifications and portfolio of past work.',
            },
            {
              title: 'Structured aftercare',
              desc: 'Good clinics have a clear aftercare programme: follow-up appointments, written care instructions, a point of contact if something goes wrong. For hair transplants, this should extend to 12 months. For hair systems, it should include a maintenance schedule. If a clinic disappears after taking payment, that tells you everything.',
            },
          ].map((flag) => (
            <div key={flag.title} className="rounded-2xl border border-green-500/20 bg-green-50/30 dark:bg-green-950/10 p-5 flex gap-4">
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">{flag.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{flag.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          {/* Reading reviews */}
          <section id="reading-reviews">
            <h2>How to Actually Read Clinic Reviews</h2>
            <p>
              73% of patients use online reviews to choose a healthcare 
              provider [2]. That makes reviews powerful, and it also makes 
              them a target for manipulation. Here&apos;s how to read them 
              more critically.
            </p>
          </section>
        </div>

        {/* Review reading guide */}
        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Search className="h-5 w-5 text-primary mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-3">Signs of genuine reviews</h3>
            <div className="space-y-2 text-sm">
              {[
                'Mention specific staff names or procedures',
                'Include both positives and minor criticisms',
                'Appear steadily over months, not in sudden clusters',
                'Come from reviewer profiles with history across multiple businesses',
                'Describe a personal story or timeline',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-3">Signs of fake or incentivised reviews</h3>
            <div className="space-y-2 text-sm">
              {[
                'Vague language with no specific details ("amazing service, best clinic ever!")',
                '20+ reviews posted within the same week',
                'Reviewer profiles with one review or no profile photo',
                'Overly long reviews that read like marketing copy',
                'Multiple reviews using identical phrases or structure',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-red-500" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            The most useful reviews are the 3-star ones. They tend to be 
            the most honest, covering both what went well and what didn&apos;t. 
            Pay close attention to how the clinic responds to negative 
            reviews: a thoughtful, empathetic response is a strong trust 
            signal. A defensive or dismissive reply is not.
          </p>
          <p>
            Cross-reference reviews across platforms. If a clinic has 
            250 reviews on Google and 3 on Trustpilot, or if the Google 
            reviews are all 5 stars but Trustpilot shows a 2.4, something 
            is off.
          </p>

          {/* Regulation */}
          <section id="regulation">
            <h2>UK Regulation: What&apos;s Required and What&apos;s Not</h2>
            <p>
              Understanding the regulatory landscape helps you know what 
              to verify and what voluntary credentials to look for.
            </p>
          </section>
        </div>

        {/* Regulation table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Body</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">What It Covers</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Required?</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">How to Check</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { body: 'CQC', covers: 'All surgical hair restoration in England', req: 'Legally required', check: 'cqc.org.uk' },
                { body: 'GMC', covers: 'Doctors performing surgical treatments', req: 'Legally required', check: 'gmc-uk.org' },
                { body: 'BAHRS', covers: 'Hair transplant surgeons (quality standards)', req: 'Voluntary', check: 'bahrs.co.uk' },
                { body: 'ISHRS', covers: 'Hair restoration surgeons (international)', req: 'Voluntary', check: 'ishrs.org' },
                { body: 'Institute of Trichologists', covers: 'Trichology practitioners', req: 'Voluntary (PSA accredited)', check: 'trichologists.org.uk' },
                { body: 'JCCP', covers: 'Cosmetic practitioners', req: 'Voluntary', check: 'jccp.org.uk' },
              ].map((row, i) => (
                <tr key={row.body} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-4 font-medium text-foreground">{row.body}</td>
                  <td className="py-3 px-4">{row.covers}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold ${row.req.includes('Legally') ? 'text-red-600 dark:text-red-400' : 'text-primary'}`}>
                      {row.req}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs">{row.check}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Scotland, Wales and Northern Ireland have their own equivalents to CQC. Sources: [3][4][5]
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            An important distinction: non-surgical treatments (hair systems, 
            SMP, trichology, PRP) do not require CQC registration. This means 
            the regulatory bar is lower, which makes your own due diligence 
            more important for these services. The voluntary credentials 
            (BAHRS, IOT, JCCP) matter more here because they signal a 
            clinic&apos;s choice to meet higher standards.
          </p>

          {/* Consultation checklist */}
          <section id="consultation-checklist">
            <h2>Your Consultation Checklist</h2>
            <p>
              Take this list with you. A good clinic will welcome the 
              questions; a bad one will get uncomfortable.
            </p>
          </section>
        </div>

        {/* Checklist */}
        <div className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <ShieldCheck className="h-6 w-6 text-primary mb-4" />
          <h3 className="text-base font-semibold text-foreground mb-4">Questions to Ask at Your Consultation</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Who will perform my treatment, and what are their qualifications?',
              'Are you CQC registered? (if surgical)',
              'Can I see before-and-after photos of patients with similar hair loss to mine?',
              'What type of hair loss do I have, and how did you reach that diagnosis?',
              'What are all the costs involved, including follow-ups and products?',
              'What happens if I am not happy with the result?',
              'What is the aftercare programme?',
              'How many of these treatments do you perform per month?',
              'Can I think about it and come back, or is this price time-limited?',
              'What are the risks and potential complications?',
            ].map((q) => (
              <div key={q} className="flex items-start gap-2 text-sm">
                <span className="mt-1 h-4 w-4 shrink-0 rounded border border-primary/30 flex items-center justify-center text-[10px] text-primary">?</span>
                <span className="text-muted-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            If the answer to &quot;Can I think about it?&quot; involves pressure, 
            a sudden discount or any suggestion that the price will go 
            up if you leave, you have your answer. Leave.
          </p>

          <section id="find-clinic">
            <h2>Find Verified Clinics</h2>
            <p>
              Our directory includes Google ratings, review counts, 
              service listings and pricing tier information for clinics 
              across the UK. It&apos;s a useful starting point for comparing 
              options before booking consultations.
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
                Browse Clinics with Reviews and Ratings
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Compare clinics by Google rating, review count, 
                services offered and location. Make an informed choice.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
                  Search All Clinics
                </Link>
                <Link
                  href="/treatments/hair-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
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
          <p className="text-xs text-muted-foreground mb-4">Verified March 2026.</p>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Investigations and Reports</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={1}>
            <li>BBC / Oakwood Solicitors — fake Google Reviews among UK medical clinics <a href="https://www.bbc.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Repugen / Sprypt — 73% of patients use online reviews to choose healthcare providers <a href="https://www.repugen.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Regulatory Bodies</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={3}>
            <li>BAHRS — UK regulation of hair restoration surgery and CQC requirements <a href="https://www.bahrs.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Care Quality Commission — independent regulator of health and social care in England <a href="https://www.cqc.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Institute of Trichologists — voluntary register accredited by Professional Standards Authority <a href="https://www.trichologists.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-6 mb-3">Clinic Standards</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside" start={6}>
            <li>NHS — hair loss treatment information and clinic standards <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Dr Mark Tam — choosing a hair transplant surgeon checklist <a href="https://drmarktam.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Harris Hair Transplant — identifying unregulated clinics in the UK <a href="https://harrishairtransplant.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'All Treatments Compared', href: '/blog/hair-loss-treatments-compared', icon: '⚖️' },
              { label: 'Hair System Annual Cost', href: '/blog/hair-system-annual-cost', icon: '💷' },
              { label: 'Finasteride Side Effects', href: '/blog/finasteride-minoxidil-side-effects', icon: '💊' },
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
