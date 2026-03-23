import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Search, HelpCircle, Heart, BookOpen, Phone,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Hair Loss and Men\'s Mental Health: Why It Matters (UK)',
  description:
    'How hair loss affects men\'s confidence, self-esteem and mental health. Statistics, real talk and practical next steps including non-surgical options and support helplines.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-loss-mens-mental-health'),
  },
  openGraph: {
    title: 'Hair Loss and Men\'s Mental Health | Hair Restoration Guide',
    description:
      'How hair loss affects confidence and mental health, and what men can do about it.',
    url: canonicalUrl('/blog/hair-loss-mens-mental-health'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Is it normal to feel depressed about hair loss?',
    answer:
      'Yes, and you\'re not unusual for feeling that way. Research consistently shows that hair loss is linked to increased rates of anxiety, depression and social withdrawal in men. A 2019 study in the Journal of Cosmetic Dermatology found that men with androgenetic alopecia reported significantly lower self-esteem and higher anxiety levels than those without. Hair is tied to identity, and losing it can genuinely affect how you feel about yourself.',
  },
  {
    question: 'At what age do men typically start losing their hair?',
    answer:
      'About 25% of men who experience pattern hair loss notice the first signs before the age of 21. By 35, roughly two thirds of men have some degree of visible thinning. By 50, about 85% of men have significantly thinner hair. These are averages though. Some men keep a full head of hair well into their 60s, while others notice thinning in their late teens.',
  },
  {
    question: 'Do non-surgical options look natural enough for everyday life?',
    answer:
      'Modern hair systems are virtually undetectable when properly fitted. They\'re custom-matched to your natural hair colour, density and texture. You can swim, shower and exercise in them. SMP (scalp micropigmentation) is also very convincing for the buzzed-head look. Most people won\'t know unless you tell them. The key is choosing a provider with good before-and-after photos and genuine client reviews.',
  },
  {
    question: 'Should I talk to my GP about hair loss?',
    answer:
      'It\'s worth doing, especially if the hair loss is sudden or patchy (which could indicate alopecia areata or another medical condition) or if it\'s significantly affecting your mental health. Your GP can rule out underlying causes, prescribe finasteride if appropriate and refer you to a dermatologist. If hair loss is contributing to depression or anxiety, your GP can also discuss mental health support options.',
  },
  {
    question: 'Will shaving my head help with the anxiety?',
    answer:
      'For some men, yes. Shaving your head takes control of the situation, and many men feel liberated by the decision. But it\'s not for everyone. If you\'re not ready or don\'t want to, that\'s completely valid. Non-surgical options like hair systems, SMP and toppers give you alternatives that let you keep the look you want. There\'s no right answer here; it comes down to what makes you feel most like yourself.',
  },
]

export default function MensMentalHealthPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hair Loss and Men\'s Mental Health: Why It Matters',
    description:
      'How hair loss affects men\'s confidence and mental health, and practical next steps.',
    url: canonicalUrl('/blog/hair-loss-mens-mental-health'),
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
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
            { label: 'Hair Loss & Men\'s Mental Health' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Heart className="h-3 w-3" /> Mental Health
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Hair Loss and Men&apos;s Mental Health: Why Nobody Talks About It
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            One in three men will experience noticeable hair loss by 35. Most won't talk
            to anyone about how it makes them feel. Here's why that matters, what the
            research actually shows and what you can do about it.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 8 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this article</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'numbers', label: 'The Numbers' },
              { id: 'silence', label: 'Why Men Don\'t Talk About It' },
              { id: 'impact', label: 'How Hair Loss Affects Mental Health' },
              { id: 'practical', label: 'Practical Steps That Help' },
              { id: 'options', label: 'Non-Surgical Options at a Glance' },
              { id: 'helplines', label: 'Helplines & Support' },
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

          <section id="numbers">
            <h2>The Numbers</h2>
            <p>
              Male pattern hair loss (androgenetic alopecia) is the most common form of hair loss in men.
              By 35, about 66% of men have some degree of visible thinning. By 50, that figure rises
              to around 85%. Around 25% of men who experience it will notice the first signs before
              they turn 21.
            </p>
            <p>
              Those are big numbers. And yet hair loss is rarely talked about as a men's health issue in
              the same way that fitness, diet or mental health are. It tends to be treated as something
              cosmetic and trivial, which means a lot of men suffer in silence.
            </p>
          </section>

          <section id="silence">
            <h2>Why Men Don't Talk About It</h2>
            <p>
              There's a persistent cultural message that men should be above caring about their appearance.
              Phrases like "just shave it off" or "it's only hair" are well-meaning but miss the point.
              Hair is part of how people see themselves. Losing it, especially when it happens young and
              without warning, can shake your sense of identity.
            </p>
            <p>
              Men are socialised to see hair loss as something to accept quietly. Complaining about it
              risks being seen as vain. So most men deal with it alone: obsessively checking their hairline
              in mirrors, avoiding certain lighting or angles in photos, wearing hats to avoid conversations
              about it. The silence compounds the problem.
            </p>
            <p>
              This is starting to change. Male grooming is no longer taboo. More men talk openly about
              skincare, fitness and body image. But hair loss remains one of the last subjects where
              asking for help still feels difficult for many.
            </p>
          </section>

          <section id="impact">
            <h2>How Hair Loss Affects Mental Health</h2>
            <p>
              Research backs up what most men experiencing hair loss already know intuitively: it affects
              how you feel about yourself.
            </p>
            <p>
              A systematic review published in the Journal of the European Academy of Dermatology and
              Venereology found that androgenetic alopecia was associated with increased rates of
              depression, anxiety and lower quality of life scores. A 2019 study in the Journal of
              Cosmetic Dermatology reported that men with pattern hair loss had significantly lower
              self-esteem and higher levels of social anxiety than age-matched controls.
            </p>
            <p>
              The impact tends to be worse for younger men. Losing hair at 22 hits differently than
              gradual thinning at 50 because it conflicts with how you expect to look at that age.
              It can affect dating confidence, job interviews and social situations.
            </p>
            <p>
              None of this means hair loss is a medical emergency. But it does mean the emotional impact
              is real, measurable and worth taking seriously.
            </p>
          </section>

          <section id="practical">
            <h2>Practical Steps That Help</h2>
            <p>
              There's no single fix, but a combination of practical action and honest reflection tends
              to work better than either alone.
            </p>
            <p>
              <strong>Talk to someone.</strong> Not necessarily a therapist (though that's fine too). A friend, a
              partner, a sibling. The act of saying "this is bothering me" out loud is more powerful than
              it sounds. Organisations like Andy's Man Club run free weekly groups where men can talk about
              anything that's on their mind, no pressure and no judgement.
            </p>
            <p>
              <strong>See your GP.</strong> If hair loss is affecting your mood or daily life, mention it. Your
              GP can discuss treatment options (finasteride is available on prescription), rule out
              underlying causes and, if needed, talk about mental health support.
            </p>
            <p>
              <strong>Explore your options.</strong> There are more practical solutions for hair loss now than at
              any point in history. Hair systems, SMP and toppers give you real alternatives to "just
              accept it." Understanding what's available can be a first step towards feeling more in
              control.
            </p>
            <p>
              <strong>Be sceptical of miracle cures.</strong> The internet is full of expensive products
              promising to regrow hair with no evidence behind them. Stick to options backed by clinical
              data or demonstrated results (we cover these in our{' '}
              <Link href="/blog/hair-loss-treatments-compared" className="text-primary hover:underline">
                treatment comparison guide
              </Link>).
            </p>
          </section>

          <section id="options">
            <h2>Non-Surgical Options at a Glance</h2>
            <p>
              If you want to do something about your hair loss, these are the main non-surgical options
              in the UK. Each one is covered in depth in our guides.
            </p>
          </section>
        </div>

        {/* Options summary */}
        <div className="grid gap-4 sm:grid-cols-3 my-8">
          {[
            {
              title: 'Hair Systems',
              desc: 'Custom-made piece bonded to your scalp. Wear it 24/7, including swimming and exercise. Maintenance every 4-6 weeks.',
              link: '/guides/hair-systems',
              cost: '£200-£1,500 initial',
            },
            {
              title: 'SMP',
              desc: 'Pigment dots on the scalp replicating the look of a close buzz cut. 2-3 sessions, minimal upkeep afterwards.',
              link: '/guides/scalp-micropigmentation',
              cost: '£800-£3,500',
            },
            {
              title: 'Hair Toppers',
              desc: 'Clips into existing hair to cover thinning areas. Good for crown and parting coverage. Daily wear.',
              link: '/guides/hair-toppers',
              cost: '£100-£800',
            },
          ].map((opt) => (
            <Link
              key={opt.title}
              href={opt.link}
              className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/25"
            >
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                {opt.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{opt.desc}</p>
              <p className="text-xs font-medium text-primary">{opt.cost}</p>
            </Link>
          ))}
        </div>

        {/* Helplines */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="helplines">
            <h2>Helplines & Support</h2>
            <p>
              If hair loss is affecting your mental health, or if you're struggling with anything at
              all, these organisations offer free, confidential support.
            </p>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              name: 'CALM',
              url: 'https://www.thecalmzone.net',
              desc: 'Campaign Against Living Miserably. Helpline and webchat for men in the UK.',
              phone: '0800 58 58 58 (5pm-midnight, daily)',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
            },
            {
              name: 'Andy\'s Man Club',
              url: 'https://www.andysmanclub.co.uk',
              desc: 'Free weekly peer support groups for men across the UK. No referral needed.',
              phone: 'Groups run Monday 7pm, find your local club online',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
            },
            {
              name: 'Samaritans',
              url: 'https://www.samaritans.org',
              desc: 'Confidential emotional support available 24/7, 365 days a year.',
              phone: '116 123 (free, 24/7)',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
            },
            {
              name: 'Mind',
              url: 'https://www.mind.org.uk',
              desc: 'Information and support for mental health problems including body image and self-esteem.',
              phone: '0300 123 3393',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
            },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${org.colour}`}
            >
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {org.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">{org.desc}</p>
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Phone className="h-3 w-3" /> {org.phone}
              </p>
            </a>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            For more organisations, see our full{' '}
            <Link href="/support" className="text-primary hover:underline">
              charities and support page
            </Link>.
          </p>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Search className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to Explore Your Options?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics offering hair systems, SMP and other non-surgical
                solutions. Compare reviews and book a free consultation. No commitment.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Find Clinics Near You
                <Search className="h-4 w-4" />
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
          <p className="text-xs text-muted-foreground mb-4">Information verified March 2026.</p>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>American Hair Loss Association — men's hair loss statistics <a href="https://americanhairloss.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Journal of the European Academy of Dermatology and Venereology — psychological impact of androgenetic alopecia <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Journal of Cosmetic Dermatology — self-esteem and anxiety in men with pattern hair loss (2019) <a href="https://pubmed.ncbi.nlm.nih.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk — hair loss overview and when to see your GP <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Support & Charities', href: '/support', icon: '💜' },
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
