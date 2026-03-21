import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Syringe, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is PRP Hair Treatment? Process, Cost & Evidence | Complete Guide',
  description:
    'A complete guide to PRP (platelet-rich plasma) hair treatment. Learn how it works, how many sessions you need, UK costs and what the clinical evidence actually shows.',
  alternates: { canonical: canonicalUrl('/guides/prp-treatment') },
  openGraph: {
    title: 'What Is PRP Hair Treatment? | Hair Restoration Guide',
    description: 'Everything you need to know about PRP for hair loss: the process, sessions, costs and clinical evidence.',
    url: canonicalUrl('/guides/prp-treatment'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Does PRP actually work for hair loss?',
    answer: 'The evidence is promising but not definitive. Several studies show improvements in hair density and thickness, particularly for androgenetic alopecia. However, results vary between individuals and the research base is still growing. PRP tends to work best as a supporting treatment alongside medication or other therapies, rather than a standalone solution.',
  },
  {
    question: 'How many PRP sessions do I need?',
    answer: 'Most clinics recommend an initial course of 3 to 4 sessions, spaced 4 to 6 weeks apart. After that, maintenance sessions every 3 to 6 months help sustain results. You\'ll typically see initial improvements after 2 to 3 months.',
  },
  {
    question: 'Is PRP painful?',
    answer: 'The treatment involves multiple injections into the scalp, which most people describe as uncomfortable but tolerable. Many clinics apply a topical numbing cream before the injections to reduce discomfort. The blood draw at the start feels like a standard blood test.',
  },
  {
    question: 'How much does PRP cost in the UK?',
    answer: 'Individual sessions typically cost £200 to £500. An initial course of 3 to 4 sessions runs £600 to £2,000. Some clinics offer package deals for the full course. Ongoing maintenance sessions add roughly £400 to £1,000 per year.',
  },
  {
    question: 'Are there any side effects?',
    answer: 'Because PRP uses your own blood, allergic reactions are extremely unlikely. Common side effects are mild: soreness at injection sites, minor swelling and occasional temporary headache. These usually resolve within a day or two. Serious complications are very rare.',
  },
]

export default function PRPGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is PRP Hair Treatment? Process, Cost & Evidence',
    description: 'A complete guide to PRP hair treatment: how it works, sessions, UK costs and clinical evidence.',
    url: canonicalUrl('/guides/prp-treatment'),
    datePublished: '2026-03-21', dateModified: '2026-03-21',
    author: { '@type': 'Organization', name: 'Hair Restoration Guide', url: SITE },
    publisher: { '@type': 'Organization', name: 'Hair Restoration Guide', url: SITE },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question', name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'PRP Treatment' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is PRP Hair Treatment?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            PRP (platelet-rich plasma) is a non-surgical treatment that uses your own blood to
            stimulate hair growth. A small sample of blood is drawn, processed to concentrate
            the platelets, then injected into the scalp. The growth factors in the plasma are
            thought to reactivate dormant follicles and improve hair density.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 6 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-works', label: 'How PRP Works' },
              { id: 'session', label: 'What Happens During a Session' },
              { id: 'evidence', label: 'What the Evidence Shows' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'who-for', label: 'Who Is PRP For?' },
              { id: 'choosing-clinic', label: 'How to Choose a Clinic' },
              { id: 'faqs', label: 'Frequently Asked Questions' },
            ].map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/8 text-[10px] font-bold text-primary group-hover:bg-primary/15 transition-colors">{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="how-it-works">
            <h2>How PRP Works</h2>
            <p>
              The theory behind PRP is straightforward. Platelets in your blood contain growth
              factors: proteins that promote tissue repair and cell growth. By concentrating
              these platelets and injecting them directly into the scalp, the treatment aims to
              stimulate underperforming hair follicles and encourage new growth.
            </p>
            <p>
              PRP has been used in medicine for years (in orthopaedics and wound healing, for
              example). Its application in hair restoration is more recent, with growing clinical
              interest over the past decade.
            </p>
          </section>

          <section id="session">
            <h2>What Happens During a Session</h2>
            <p>A typical PRP session takes around 45 to 60 minutes:</p>
            <ol>
              <li><strong>Blood draw:</strong> A small amount of blood is taken from your arm (similar to a standard blood test).</li>
              <li><strong>Centrifuge processing:</strong> The blood is placed in a centrifuge, which spins it at high speed to separate the platelet-rich plasma from the red blood cells.</li>
              <li><strong>Numbing:</strong> A topical anaesthetic cream is applied to the scalp (and sometimes local anaesthetic injections for more sensitive areas).</li>
              <li><strong>Injection:</strong> The concentrated plasma is injected into the scalp at multiple points across the thinning areas, using a fine needle.</li>
            </ol>
            <p>
              There&apos;s no real downtime. Most people go back to work the same day. You might
              have mild soreness or redness at the injection sites for a day or two.
            </p>
          </section>

          <section id="evidence">
            <h2>What the Evidence Shows</h2>
            <p>
              PRP for hair loss has a growing body of research, but the evidence is mixed. Several
              studies report improvements in hair density and thickness, particularly for
              androgenetic alopecia (male and female pattern hair loss).
            </p>
            <p>
              However, study sizes tend to be small, and treatment protocols vary between clinics
              (different concentrations, injection depths and session frequencies). This makes it hard
              to draw firm conclusions about exactly how effective PRP is compared to other treatments.
            </p>
            <p>
              The honest takeaway: PRP shows promise, but it&apos;s not a guaranteed fix. It tends
              to work best for early-stage thinning and as a complement to other treatments
              (particularly finasteride or post-transplant recovery). If you&apos;re expecting a
              dramatic transformation on its own, you may be disappointed.
            </p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Single session:</strong> £200 to £500</li>
              <li><strong>Initial course (3 to 4 sessions):</strong> £600 to £2,000</li>
              <li><strong>Annual maintenance (2 to 4 sessions):</strong> £400 to £1,000</li>
            </ul>
            <p>
              PRP is not available on the NHS for hair loss. It&apos;s considered a cosmetic treatment.
              Some clinics offer package discounts when you book the full initial course upfront.
            </p>
          </section>

          <section id="who-for">
            <h2>Who Is PRP For?</h2>
            <ul>
              <li>People with early to moderate hair thinning (not advanced baldness)</li>
              <li>Those wanting a non-surgical, drug-free option to support hair growth</li>
              <li>Post-transplant patients looking to improve graft survival and density</li>
              <li>People already taking finasteride or minoxidil who want an additional boost</li>
              <li>Both men and women with androgenetic alopecia</li>
            </ul>
            <p>
              PRP is unlikely to produce significant results on completely bald areas. It works
              on follicles that are still present but underperforming, not on areas where
              follicles have been lost entirely.
            </p>
          </section>

          <section id="choosing-clinic">
            <h2>How to Choose a Clinic</h2>
            <ul>
              <li><strong>Medical setting.</strong> PRP involves blood processing and injections. Look for clinics with qualified medical professionals (doctors, nurses or registered practitioners).</li>
              <li><strong>Equipment quality.</strong> The centrifuge and preparation kit matter. Ask what system they use. More advanced kits produce a higher platelet concentration.</li>
              <li><strong>Honest expectations.</strong> Be wary of clinics that promise dramatic results. A trustworthy clinic will explain the evidence honestly and set realistic expectations.</li>
              <li><strong>Before-and-after photos.</strong> Ask to see results from their own patients, not stock images.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Syringe className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find PRP Clinics Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare clinics offering PRP treatment across the UK. Read reviews and book a consultation.</p>
              <Link href="/treatments/prp-treatment" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse PRP Clinics
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section id="faqs" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-200 hover:border-primary/20">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-semibold text-card-foreground hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3"><HelpCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary" />{faq.question}</span>
                  <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border ml-7">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Explore More Treatments</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair Transplant', href: '/guides/hair-transplant', icon: '🔬' },
              { label: 'Laser Therapy', href: '/guides/laser-therapy', icon: '☀️' },
              { label: 'Trichology', href: '/guides/trichology', icon: '🔬' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-card-foreground hover:border-primary/20 hover:shadow-sm transition-all group">
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
