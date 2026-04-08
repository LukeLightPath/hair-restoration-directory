import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Brain, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Hair System Fitting Service? What to Expect | Guide',
  description:
    'A complete guide to professional hair system fitting. Learn what happens during a fitting, why it matters, costs in the UK and how to find the right fitter.',
  alternates: { canonical: canonicalUrl('/guides/fitting-service') },
  openGraph: {
    title: 'What Is a Hair System Fitting Service? | Hair Restoration Guide',
    description: 'Everything you need to know about professional hair system fitting: the process, maintenance appointments and UK costs.',
    url: canonicalUrl('/guides/fitting-service'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Can I fit a hair system myself?',
    answer: 'Some people do learn to apply and maintain their hair system at home. Many YouTube channels and online communities cover DIY hair system application. However, for the initial fit, having a professional do it gives you the best result: they\'ll custom-cut the base, set the hairline and ensure the system sits correctly. Most people get their first few fittings done professionally and then decide if they want to learn the process themselves.',
  },
  {
    question: 'How long does a fitting appointment take?',
    answer: 'A first fitting usually takes 1.5 to 2.5 hours. This includes base cutting, scalp preparation, adhesive application, placement, and styling. Follow-up maintenance appointments (re-bonding) are quicker, typically 45 minutes to 1.5 hours.',
  },
  {
    question: 'How often do I need a re-bonding appointment?',
    answer: 'Every 2 to 6 weeks, depending on your attachment method. Tape users typically come in every 2 to 3 weeks. Adhesive (glue) users can go 4 to 6 weeks between appointments. Your fitter will advise based on your lifestyle and attachment preferences.',
  },
  {
    question: 'How much does a fitting service cost?',
    answer: 'An initial fitting and cut typically costs £50 to £150 on top of the hair system itself. Maintenance re-bonding appointments run £30 to £80 per visit. Some clinics offer monthly packages that bring the per-visit cost down.',
  },
]

export default function FittingServiceGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is a Hair System Fitting Service? What to Expect',
    description: 'A complete guide to professional hair system fitting: the process, maintenance appointments and UK costs.',
    url: canonicalUrl('/guides/fitting-service'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Fitting Service' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Hair System Fitting Service?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A fitting service is the professional application and styling of a hair system.
            A skilled fitter custom-cuts the base to match your scalp, applies the system using adhesive
            or tape, blends it with any remaining hair, and cuts and styles it to look completely natural.
            The fitter is what turns a piece of material and hair into something nobody can tell apart
            from the real thing.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 4 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'why-it-matters', label: 'Why Professional Fitting Matters' },
              { id: 'process', label: 'The Fitting Process' },
              { id: 'maintenance', label: 'Ongoing Maintenance' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'choosing', label: 'How to Choose a Fitter' },
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
          <section id="why-it-matters">
            <h2>Why Professional Fitting Matters</h2>
            <p>
              A hair system is only as good as its fitting. The same system can look completely natural
              or obviously fake depending on who applies it. A professional fitter knows how to:
            </p>
            <ul>
              <li>Custom-cut the base to match your exact area of hair loss</li>
              <li>Position the hairline at a realistic height and shape for your age and face</li>
              <li>Blend the system&apos;s hair with your own remaining hair</li>
              <li>Apply adhesive or tape for a secure, comfortable bond</li>
              <li>Cut and style the system so it moves and sits naturally</li>
            </ul>
          </section>

          <section id="process">
            <h2>The Fitting Process</h2>
            <ol>
              <li><strong>Scalp preparation:</strong> The area is cleaned and any existing hair trimmed or shaved short to create a smooth bonding surface.</li>
              <li><strong>Base cutting:</strong> The system&apos;s base is carefully trimmed to match the exact contours of your hair loss area.</li>
              <li><strong>Adhesive or tape application:</strong> The chosen attachment method is applied. The fitter positions the system on the scalp, starting with the front hairline.</li>
              <li><strong>Blending:</strong> If you have surrounding hair, the fitter blends the system&apos;s edges with your natural hair.</li>
              <li><strong>Cutting and styling:</strong> The system is cut, layered and styled to achieve a natural, finished look.</li>
            </ol>
          </section>

          <section id="maintenance">
            <h2>Ongoing Maintenance</h2>
            <p>
              You&apos;ll need regular maintenance appointments to re-bond the system, clean the
              scalp and base, and restyle as needed. How often depends on your attachment method:
            </p>
            <ul>
              <li><strong>Tape attachment:</strong> Every 2 to 3 weeks</li>
              <li><strong>Adhesive (glue):</strong> Every 4 to 6 weeks</li>
              <li><strong>Clips:</strong> No fixed schedule (you remove and reattach as needed)</li>
            </ul>
            <p>
              Some clinics offer monthly maintenance packages. Others charge per visit. Many also
              teach clients how to do basic maintenance at home between professional appointments.
            </p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Initial fitting and cut:</strong> £50 to £150</li>
              <li><strong>Maintenance re-bond:</strong> £30 to £80 per visit</li>
              <li><strong>Monthly subscription packages:</strong> £60 to £120/month (where available)</li>
            </ul>
            <p>These prices are for the fitting service only; the hair system itself is a separate cost.</p>
          </section>

          <section id="choosing">
            <h2>How to Choose a Fitter</h2>
            <ul>
              <li><strong>Specialist experience.</strong> Choose someone who fits hair systems regularly, not a general hairdresser who does it occasionally.</li>
              <li><strong>Before-and-after photos.</strong> A confident fitter will have a portfolio showing their work on different clients and hair loss patterns.</li>
              <li><strong>Private space.</strong> The fitting should be done in a private room where you feel comfortable.</li>
              <li><strong>Ongoing relationship.</strong> You&apos;ll see your fitter regularly, so finding someone you trust and get along with matters.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Brain className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Fitting Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare clinics offering professional hair system fitting across the UK.</p>
              <Link href="/treatments/fitting-service" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Fitting Specialists
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
              { label: 'Hair Systems', href: '/guides/hair-systems', icon: '✂️' },
              { label: 'Hair Toppers', href: '/guides/hair-toppers', icon: '👑' },
              { label: 'Hair Integration', href: '/guides/hair-integration', icon: '🔗' },
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
