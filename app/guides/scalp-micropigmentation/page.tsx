import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, ArrowRight, Zap, CheckCircle,
  Clock, HelpCircle, MapPin
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is Scalp Micropigmentation (SMP)? Process, Cost & Results Explained',
  description:
    'A complete guide to scalp micropigmentation. Learn how SMP works, what it costs in the UK, how long it lasts, and whether it\'s the right treatment for your hair loss.',
  alternates: {
    canonical: canonicalUrl('/guides/scalp-micropigmentation'),
  },
  openGraph: {
    title: 'What Is Scalp Micropigmentation (SMP)? | Hair Restoration Guide',
    description:
      'Everything you need to know about SMP: the process, session breakdown, costs, fading timeline and how to choose a practitioner.',
    url: canonicalUrl('/guides/scalp-micropigmentation'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Does SMP hurt?',
    answer:
      'Most people describe it as mild discomfort rather than real pain. The needles used are finer than standard tattoo needles, and practitioners apply a topical numbing cream before starting. Some areas of the scalp are more sensitive than others (the temples and sides tend to be felt more), but the majority of clients find it very manageable.',
  },
  {
    question: 'How long does SMP last before it fades?',
    answer:
      'SMP typically lasts 2 to 5 years before noticeable fading. How quickly it fades depends on your skin type, sun exposure and aftercare. Oilier skin tends to fade faster. A touch-up session every few years keeps the result looking fresh, and these are usually quicker and cheaper than the original treatment.',
  },
  {
    question: 'Can you tell the difference between SMP and real hair?',
    answer:
      'When done well, SMP is very convincing. From a normal conversational distance, the pigment dots replicate the look of closely shaved hair follicles. Up close and in direct sunlight, a trained eye might notice the difference, but to most people, it simply looks like a buzzed head.',
  },
  {
    question: 'How much does SMP cost in the UK?',
    answer:
      'UK pricing typically falls between £800 and £3,500 for the full course of sessions. The cost depends on the area being treated (a full head costs more than just the hairline or crown), the practitioner\'s experience and the clinic\'s location. Most clinics include all sessions in one package price.',
  },
  {
    question: 'Can SMP cover scars from hair transplants?',
    answer:
      'Yes. Scar camouflage is one of the most common uses of SMP. It works on both FUE dot scars and FUT strip scars. The practitioner matches pigment to the surrounding follicle appearance so the scar blends in. Results vary depending on the scar tissue, but most clients see a significant improvement.',
  },
  {
    question: 'Is SMP suitable for women?',
    answer:
      'Absolutely. SMP can add the appearance of density to thinning areas, particularly along the parting line or crown. For women, SMP is typically used to reduce the contrast between the hair and scalp rather than creating a fully buzzed look. It works well alongside existing hair.',
  },
]

export default function SMPGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is Scalp Micropigmentation (SMP)? Process, Cost & Results Explained',
    description:
      'A complete guide to scalp micropigmentation. Learn how SMP works, what it costs, how long it lasts and whether it\'s right for you.',
    url: canonicalUrl('/guides/scalp-micropigmentation'),
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
            { label: 'Guides', href: '/guides' },
            { label: 'Scalp Micropigmentation' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is Scalp Micropigmentation (SMP)?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Scalp micropigmentation is a non-surgical cosmetic treatment that deposits tiny dots
            of pigment into the scalp. The result replicates the look of real hair follicles,
            giving the appearance of a closely shaved head or adding density to thinning areas.
            It&apos;s become one of the fastest-growing hair loss treatments in the UK over the
            past five years.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 7 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-works', label: 'How SMP Works' },
              { id: 'session-breakdown', label: 'The Session Breakdown' },
              { id: 'styles', label: 'SMP Styles and Uses' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'fading', label: 'How Long Does It Last?' },
              { id: 'aftercare', label: 'Aftercare' },
              { id: 'who-for', label: 'Who Is SMP For?' },
              { id: 'choosing-practitioner', label: 'How to Choose a Practitioner' },
              { id: 'faqs', label: 'Frequently Asked Questions' },
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
          {/* 1. How It Works */}
          <section id="how-it-works">
            <h2>How SMP Works</h2>
            <p>
              A trained practitioner uses a specialist needle (finer than a standard tattoo needle,
              typically 1 to 3 points) to deposit pigment into the upper dermis of the scalp. Each
              dot replicates the appearance of a single hair follicle.
            </p>
            <p>
              The pigment is specifically formulated for scalp use. Unlike body tattoo ink, SMP
              pigment is designed not to spread, change colour or turn blue-green over time. It
              stays as a defined dot.
            </p>
            <p>
              The depth of needle penetration matters. Too shallow and the pigment fades quickly.
              Too deep and dots can blur or spread. This is why practitioner skill is the single
              biggest factor in getting a good result.
            </p>
          </section>

          {/* 2. Session Breakdown */}
          <section id="session-breakdown">
            <h2>The Session Breakdown</h2>
            <p>
              SMP is completed over 2 to 3 sessions, spaced roughly 7 to 14 days apart.
              Here&apos;s what each session typically involves:
            </p>
            <ul>
              <li>
                <strong>Session 1:</strong> The practitioner maps out the hairline shape, establishes
                density patterns and lays down the first layer of pigment. This session takes 2 to
                4 hours depending on the area being treated. After this session, the result will look
                lighter once healed.
              </li>
              <li>
                <strong>Session 2:</strong> Building on the healed first layer, the practitioner adds
                density and refines the hairline. The pigment will appear darker and more natural at
                this stage. Around 2 to 3 hours.
              </li>
              <li>
                <strong>Session 3 (if needed):</strong> A final refinement session to adjust density,
                blend any areas and perfect the overall look. Usually 1 to 2 hours. Not every client
                needs a third session.
              </li>
            </ul>
          </section>

          {/* 3. Styles and Uses */}
          <section id="styles">
            <h2>SMP Styles and Uses</h2>
            <p>
              SMP isn&apos;t one-size-fits-all. Practitioners adapt the technique depending on
              what the client needs:
            </p>
            <ul>
              <li>
                <strong>Buzzed head look:</strong> The most common style. Pigment covers the entire
                scalp to simulate a freshly shaved head. Works for any level of hair loss, including
                complete baldness.
              </li>
              <li>
                <strong>Density fill:</strong> For people with thinning hair who still have coverage.
                Pigment is placed between existing hairs to reduce the visible contrast between hair
                and scalp. Popular with women.
              </li>
              <li>
                <strong>Hairline restoration:</strong> Recreates a receded hairline without treating
                the full scalp. Often used alongside existing hair.
              </li>
              <li>
                <strong>Scar camouflage:</strong> Covers FUE dot scars, FUT strip scars or scarring
                from injuries or burns. The pigment is matched to surrounding follicle appearance.
              </li>
            </ul>
          </section>

          {/* 4. Cost */}
          <section id="cost">
            <h2>Cost in the UK</h2>
            <p>
              SMP pricing in the UK generally ranges from £800 to £3,500 for a full course of
              sessions. The main factors that affect cost:
            </p>
            <ul>
              <li>
                <strong>Treatment area:</strong> A full head treatment costs more than just the
                hairline or crown. Scar camouflage for a small area is usually at the lower end.
              </li>
              <li>
                <strong>Practitioner experience:</strong> More experienced practitioners charge more,
                and in this field, experience makes a real difference to the result.
              </li>
              <li>
                <strong>Location:</strong> London clinics tend to charge at the higher end of the
                range. Clinics outside of London are often more competitive.
              </li>
              <li>
                <strong>Touch-ups:</strong> Most clinics include all initial sessions in the package
                price. Touch-ups a few years later typically cost £200 to £500.
              </li>
            </ul>
          </section>

          {/* 5. How Long Does It Last? */}
          <section id="fading">
            <h2>How Long Does It Last?</h2>
            <p>
              SMP is semi-permanent. The pigment gradually fades over 2 to 5 years, depending on
              your skin type and lifestyle. It doesn&apos;t disappear completely; it lightens over
              time.
            </p>
            <p>
              Sun exposure speeds up fading, which is why practitioners recommend using SPF on
              the scalp. Oilier skin types tend to fade faster because the natural oils break
              down the pigment more quickly.
            </p>
            <p>
              When fading becomes noticeable, a single touch-up session can bring the result
              back to full strength. Touch-ups are quicker and less expensive than the original
              treatment because the foundation work is already in place.
            </p>
          </section>

          {/* 6. Aftercare */}
          <section id="aftercare">
            <h2>Aftercare</h2>
            <p>
              The first few days after each session are the most important. Typical aftercare
              guidelines:
            </p>
            <ul>
              <li>Avoid washing or wetting the scalp for 3 to 4 days</li>
              <li>No swimming, saunas, steam rooms or heavy sweating for at least a week</li>
              <li>Keep the scalp out of direct sunlight during the healing period</li>
              <li>Don&apos;t shave the treated area for at least 5 days</li>
              <li>Avoid touching or scratching the treated area (mild scabbing is normal)</li>
            </ul>
            <p>
              After the initial healing period, the daily routine is straightforward: shave your
              head as normal and apply a decent moisturiser. Many practitioners recommend using
              an SPF daily, especially in the summer months.
            </p>
          </section>

          {/* 7. Who Is SMP For? */}
          <section id="who-for">
            <h2>Who Is SMP For?</h2>
            <p>
              SMP suits a broad range of people, but it&apos;s particularly well suited if you:
            </p>
            <ul>
              <li>Like (or are open to) the closely shaved head look</li>
              <li>Want a low-maintenance solution with no ongoing daily routine</li>
              <li>Have complete hair loss and want the appearance of a full head of stubble</li>
              <li>Have thinning hair and want to reduce visible scalp show-through</li>
              <li>Want to cover scars from transplants, injuries or surgery</li>
              <li>Aren&apos;t suitable for (or aren&apos;t interested in) surgical options</li>
            </ul>
            <p>
              SMP works on all skin tones and all stages of hair loss. The pigment colour is
              custom-matched to your natural hair colour and skin tone.
            </p>
          </section>

          {/* 8. Choosing a Practitioner */}
          <section id="choosing-practitioner">
            <h2>How to Choose a Practitioner</h2>
            <p>
              The skill of your practitioner is everything with SMP. A few things to look for:
            </p>
            <ul>
              <li>
                <strong>Portfolio of healed work.</strong> Fresh SMP looks good on everyone. What
                matters is how it looks after healing. Ask to see healed results, not just fresh
                photos taken in the chair.
              </li>
              <li>
                <strong>Dedicated SMP specialist.</strong> Look for someone who does SMP as their
                primary focus, not as a side service alongside other beauty treatments.
              </li>
              <li>
                <strong>In-person consultation.</strong> A good practitioner will want to see your
                scalp, discuss your expectations and design a hairline before committing to anything.
              </li>
              <li>
                <strong>Client reviews.</strong> Google reviews from real clients are worth more
                than any marketing material.
              </li>
              <li>
                <strong>Pigments and equipment.</strong> Ask what brand of pigment they use and
                whether it&apos;s specifically formulated for scalp micropigmentation (not repurposed
                body tattoo ink).
              </li>
            </ul>
          </section>
        </div>

        {/* ═══ CTA ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Zap className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find SMP Clinics Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Compare SMP practitioners across the UK. Read real reviews,
                check portfolios and book a free consultation.
              </p>
              <Link
                href="/treatments/scalp-micropigmentation"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4" />
                Browse SMP Clinics
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

        {/* ═══ Related Guides ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Explore More Treatments</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Hair Systems', href: '/guides/hair-systems', icon: '✂️' },
              { label: 'Hair Transplant', href: '/guides/hair-transplant', icon: '🔬' },
              { label: 'PRP Treatment', href: '/guides/prp-treatment', icon: '💉' },
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
