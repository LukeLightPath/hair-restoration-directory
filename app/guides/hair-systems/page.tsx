import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, ArrowRight, Scissors, CheckCircle,
  Clock, ShieldCheck, HelpCircle, MapPin
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Hair System? Types, Bases, Hair & Attachment Methods Explained',
  description:
    'A complete guide to non-surgical hair systems. Learn about lace, skin and mono bases, European, Indian and Chinese hair types, attachment methods and how to choose the right system for you.',
  alternates: {
    canonical: canonicalUrl('/guides/hair-systems'),
  },
  openGraph: {
    title: 'What Is a Hair System? Complete Guide | Hair Restoration Guide',
    description:
      'Everything you need to know about non-surgical hair systems: base types, hair types, attachment methods, maintenance and how to find the right clinic.',
    url: canonicalUrl('/guides/hair-systems'),
    type: 'article',
  },
}

/* ── FAQ data (drives both UI and JSON-LD) ── */
const FAQS = [
  {
    question: 'How long does a hair system last?',
    answer:
      'With proper care, most hair systems last between 3 and 6 months. Premium systems made with European hair can push closer to 9 months. How long yours lasts comes down to the base material, the quality of the hair, your attachment method and your maintenance routine.',
  },
  {
    question: 'Can you swim and exercise with a hair system?',
    answer:
      'Yes. Medical-grade adhesives and bonding are built to hold up during swimming, gym sessions and day-to-day life. Plenty of wearers play contact sports, run and swim regularly without any problems.',
  },
  {
    question: 'Will a hair system look natural?',
    answer:
      'When it\'s well-made and professionally fitted, a hair system is virtually undetectable. Lace front bases are especially good at creating a natural-looking hairline. The real difference comes from having an experienced clinic match the base, hair type and density to your own hair.',
  },
  {
    question: 'How much does a hair system cost?',
    answer:
      'In the UK, you\'re typically looking at £150 to £800+, depending on the base material, hair type and level of customisation. European hair systems sit at the higher end of that range. Most clinics charge a separate fitting fee on top, though many offer free initial consultations.',
  },
  {
    question: 'What\'s the difference between a hair system and a wig?',
    answer:
      'A hair system (sometimes called a hair replacement system) is semi-permanently attached to your scalp with adhesive, tape or clips. You wear it around the clock for weeks at a time. A traditional wig, by contrast, sits on top of the head and is usually taken off each day.',
  },
  {
    question: 'Do hair systems damage your existing hair?',
    answer:
      'Not when they\'re fitted and maintained correctly by a professional. The area underneath is usually shaved or trimmed short to create a secure bond. What matters most is following proper removal and re-application steps so there\'s no unnecessary stress on the surrounding hair.',
  },
]

export default function HairSystemsGuidePage() {
  /* ── Build JSON-LD ── */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is a Hair System? Types, Bases, Hair & Attachment Methods Explained',
    description:
      'A complete guide to non-surgical hair systems. Learn about lace, skin and mono bases, European, Indian and Chinese hair types, attachment methods and how to choose the right system.',
    url: canonicalUrl('/guides/hair-systems'),
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
            { label: 'Guides', href: '/guides' },
            { label: 'Hair Systems' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Hair System?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A hair system is a non-surgical hair replacement: a lightweight base that sits
            on your scalp, giving you a natural, full head of hair. It&apos;s one of the most
            popular options for men and women dealing with hair loss, and modern systems,
            when fitted properly, are virtually undetectable.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 8 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-works', label: 'How a Hair System Works' },
              { id: 'base-types', label: 'Types of Bases' },
              { id: 'hair-types', label: 'Types of Hair' },
              { id: 'attachment-methods', label: 'Attachment Methods' },
              { id: 'maintenance', label: 'Maintenance & Lifespan' },
              { id: 'who-for', label: 'Who Are Hair Systems For?' },
              { id: 'choosing-clinic', label: 'How to Choose a Clinic' },
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
            <h2>How a Hair System Works</h2>
            <p>
              Two main components: a <strong>base</strong> (the thin material that sits
              against your scalp) and <strong>hair</strong> (human or synthetic strands
              knotted or injected into that base). The base gets custom-cut to match your
              area of hair loss, then attached using adhesive, tape or clips.
            </p>
            <p>
              No surgery. No downtime. A skilled technician can fit one in under two hours,
              and you leave with a full head of natural-looking hair.
            </p>
            <p>
              Today&apos;s systems are breathable, lightweight and built to be worn
              continuously for weeks, including through showering, exercise and sleep.
            </p>
          </section>

          {/* 2. Base Types */}
          <section id="base-types">
            <h2>Types of Bases</h2>
            <p>
              The base sits against your scalp and affects everything: how natural the system
              looks, how long it lasts, how it feels on your skin. Three main types.
            </p>
          </section>
        </div>

        {/* Base type cards (outside prose for custom layout) */}
        <div className="grid gap-5 sm:grid-cols-3 my-8">
          {[
            {
              name: 'Lace Base',
              icon: '🕸️',
              pros: ['Most natural-looking hairline', 'Highly breathable', 'Lightweight feel'],
              cons: ['Shorter lifespan (4–8 weeks)', 'More delicate to handle'],
              best: 'Best for achieving an undetectable, natural front hairline.',
            },
            {
              name: 'Skin / Poly Base',
              icon: '🎯',
              pros: ['Very secure adhesion', 'Easy to clean & maintain', 'Smooth, flat profile'],
              cons: ['Less breathable than lace', 'Can look less natural up close'],
              best: 'Best for durability and low-maintenance daily wear.',
            },
            {
              name: 'Mono Base',
              icon: '🔲',
              pros: ['Strong and durable', 'Natural-looking part line', 'Good mid-range option'],
              cons: ['Slightly thicker than lace', 'Can feel warmer in heat'],
              best: 'Best as an all-rounder that balances durability and aesthetics.',
            },
          ].map((base) => (
            <div
              key={base.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="text-2xl mb-3">{base.icon}</div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{base.name}</h3>
              <div className="space-y-2 text-sm mb-3">
                {base.pros.map((pro) => (
                  <div key={pro} className="flex items-start gap-1.5 text-success">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{pro}</span>
                  </div>
                ))}
                {base.cons.map((con) => (
                  <div key={con} className="flex items-start gap-1.5 text-amber-500">
                    <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{con}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-primary font-medium border-t border-border pt-3">
                {base.best}
              </p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            Many systems combine materials. A <strong>lace front with a poly
            perimeter</strong> gives you the natural hairline of lace with the secure adhesion
            of skin around the edges.
          </p>

          {/* 3. Hair Types */}
          <section id="hair-types">
            <h2>Types of Hair</h2>
            <p>
              The hair itself makes a huge difference to how the system looks, how it feels,
              and how long it holds up. Three main types are used.
            </p>

            <h3>European Hair</h3>
            <p>
              The gold standard. European hair is fine, soft, and behaves the most naturally of
              the three. It blends well with Caucasian hair textures and gives the most realistic
              result, though it&apos;s also the most expensive option.
            </p>

            <h3>Indian Hair</h3>
            <p>
              Slightly coarser than European hair and more widely available, which makes it a
              solid mid-range option. It holds styling well, it&apos;s durable, and offers good
              value for money.
            </p>

            <h3>Chinese Hair</h3>
            <p>
              The most affordable option. Chinese hair is thicker and coarser in its natural
              state, though it can be processed to appear finer. It&apos;s durable but may not
              blend as naturally with finer hair textures without treatment.
            </p>
          </section>

          {/* 4. Attachment Methods */}
          <section id="attachment-methods">
            <h2>Attachment Methods</h2>
            <p>
              How you secure the system to your scalp affects comfort, hold strength, and
              how often you&apos;ll need to re-do the attachment. Three main options.
            </p>

            <h3>Tape</h3>
            <p>
              Double-sided medical-grade tape goes around the base&apos;s perimeter. It&apos;s
              straightforward to apply and remove yourself at home, which makes it popular
              with people who prefer DIY maintenance. Each application typically lasts 1–2 weeks.
            </p>

            <h3>Adhesive (Glue)</h3>
            <p>
              Liquid adhesive gives you the strongest, longest-lasting bond, often holding for
              3–6 weeks before needing a re-application. If you&apos;re active (gym, sports,
              swimming), this is usually the best option. You&apos;ll need a solvent to remove it.
            </p>

            <h3>Clips</h3>
            <p>
              Small snap clips are sewn into the base and grip onto existing hair. This is a
              non-permanent option: you can remove the system yourself each day. Best for
              those with sufficient surrounding hair and who prefer a removable solution.
            </p>
          </section>

          {/* 5. Maintenance */}
          <section id="maintenance">
            <h2>Maintenance &amp; Lifespan</h2>
            <p>
              Owning a hair system does take some upkeep, but the routine is simpler than most
              people assume.
            </p>
            <ul>
              <li>
                <strong>Re-bonding:</strong> Every 2–6 weeks depending on your attachment method.
                Many clinics offer this as a service, or you can learn to do it yourself.
              </li>
              <li>
                <strong>Washing:</strong> Use sulphate-free, gentle shampoos. You can wash a
                hair system just like natural hair. Most people wash every 2–3 days.
              </li>
              <li>
                <strong>Styling:</strong> Hair systems can be cut, coloured and styled by a
                professional. Avoid excessive heat to extend lifespan.
              </li>
              <li>
                <strong>Lifespan:</strong> 3–9 months depending on the base type and hair quality.
                Lace systems last the shortest; skin/poly bases last the longest.
              </li>
            </ul>
          </section>

          {/* 6. Who Are Hair Systems For? */}
          <section id="who-for">
            <h2>Who Are Hair Systems For?</h2>
            <p>
              Hair systems work for a broad range of people dealing with hair loss.
            </p>
            <ul>
              <li>Men with male pattern baldness (any Norwood stage)</li>
              <li>Women with thinning hair or alopecia</li>
              <li>People who aren&apos;t candidates for surgical transplants or simply don&apos;t want surgery</li>
              <li>Anyone after an immediate, non-invasive option</li>
              <li>People recovering from medical treatments that cause hair loss</li>
            </ul>
            <p>
              There&apos;s no minimum or maximum age. Hair systems are used by people in
              their 20s through to their 70s, and they work with all hair types and textures.
            </p>
          </section>

          {/* 7. Choosing a Clinic */}
          <section id="choosing-clinic">
            <h2>How to Choose a Clinic</h2>
            <p>
              The clinic you choose matters as much as the system itself. A few things worth
              paying attention to:
            </p>
            <ul>
              <li>
                <strong>Experience with hair systems specifically.</strong> Not every hair clinic
                specialises in non-surgical systems. Look for places where this is a core service,
                not an afterthought.
              </li>
              <li>
                <strong>Real client photos and reviews.</strong> Before-and-after galleries and
                Google reviews tell you more than any marketing page will.
              </li>
              <li>
                <strong>Free consultations.</strong> Reputable clinics will offer a no-obligation
                consultation so you can discuss your situation before committing.
              </li>
              <li>
                <strong>Ongoing support.</strong> You&apos;ll need regular maintenance, so choose
                a clinic that offers aftercare appointments, not just the initial fitting.
              </li>
            </ul>
          </section>
        </div>

        {/* ═══ CTA — Find clinics ═══ */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Scissors className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find Hair System Clinics Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Compare {' '} clinics offering hair systems across the UK. Read real reviews,
                check services and book a free consultation.
              </p>
              <Link
                href="/treatments/hair-systems"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
              >
                <MapPin className="h-4 w-4" />
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

        {/* ═══ Related Guides Teaser ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Explore More Treatments</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Scalp Micropigmentation (SMP)', href: '/treatments/smp', icon: '🔵' },
              { label: 'PRP Hair Treatment', href: '/treatments/prp', icon: '💉' },
              { label: 'Hair Extensions', href: '/treatments/extensions', icon: '💇' },
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
