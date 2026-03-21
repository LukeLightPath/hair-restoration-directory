import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Sun, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is Laser Hair Therapy (LLLT)? How It Works, Evidence & Cost | Guide',
  description:
    'A complete guide to low-level laser therapy for hair loss. Learn how LLLT works, what the clinical evidence shows, home devices vs clinic treatments and UK costs.',
  alternates: { canonical: canonicalUrl('/guides/laser-therapy') },
  openGraph: {
    title: 'What Is Laser Hair Therapy (LLLT)? | Hair Restoration Guide',
    description: 'Everything you need to know about LLLT: how it works, clinical evidence, devices and UK costs.',
    url: canonicalUrl('/guides/laser-therapy'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Does laser therapy actually work for hair loss?',
    answer: 'Clinical trials show modest improvements in hair density, particularly for early-stage androgenetic alopecia. Several devices have FDA clearance. Results are not dramatic; expect subtle improvements in thickness and density rather than regrowth on bald areas. It works best as a supplement to other treatments.',
  },
  {
    question: 'Are laser caps safe?',
    answer: 'Yes. LLLT devices used for hair loss are very low power and produce no heat. There are no known serious side effects. Some users report mild scalp tingling during use, but this is not harmful. The main risk is wasting money on a device that may not deliver noticeable results for your specific situation.',
  },
  {
    question: 'How much does a laser cap cost?',
    answer: 'Home laser caps range from £200 to £800 in the UK. Premium medical-grade devices (such as Capillus or iRestore) sit at the higher end. Clinic-based laser sessions cost £30 to £75 per visit, but a home device is a one-off purchase with no ongoing costs.',
  },
  {
    question: 'How often do I need to use it?',
    answer: 'Most manufacturers recommend 3 to 4 sessions per week, with each session lasting 15 to 30 minutes depending on the device. You need to be consistent; missing sessions reduces effectiveness. Results typically start showing after 3 to 6 months of regular use.',
  },
  {
    question: 'Can I use LLLT alongside other hair loss treatments?',
    answer: 'Yes, and this is how it tends to work best. Many people use LLLT alongside finasteride, minoxidil, PRP or post-transplant recovery. There are no known interactions with other hair loss treatments. It\'s often recommended as an add-on rather than a standalone solution.',
  },
]

export default function LaserTherapyGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is Laser Hair Therapy (LLLT)? How It Works, Evidence & Cost',
    description: 'A complete guide to low-level laser therapy for hair loss: how it works, clinical evidence, devices and UK costs.',
    url: canonicalUrl('/guides/laser-therapy'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Laser Therapy' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is Laser Hair Therapy (LLLT)?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Low-level laser therapy (LLLT) uses specific wavelengths of red light to stimulate
            cellular activity in hair follicles. The idea is that the light energy increases blood
            flow and extends the growth phase of the hair cycle, encouraging thicker, stronger growth.
            It&apos;s painless, has no known side effects and can be done at home with a wearable device.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 5 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-works', label: 'How LLLT Works' },
              { id: 'evidence', label: 'What the Evidence Shows' },
              { id: 'devices', label: 'Home Devices vs Clinic Treatments' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'who-for', label: 'Who Is LLLT For?' },
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
            <h2>How LLLT Works</h2>
            <p>
              LLLT devices emit red light at wavelengths between 630 and 670 nanometres. At the cellular
              level, the light is absorbed by mitochondria in hair follicle cells, which is thought to
              increase adenosine triphosphate (ATP) production. More energy in the cells means better
              follicle function.
            </p>
            <p>
              The treatment is entirely painless. You don&apos;t feel heat, and there&apos;s no sensation
              beyond the weight of the device on your head. Sessions last 15 to 30 minutes, and most
              manufacturers recommend 3 to 4 sessions per week.
            </p>
          </section>

          <section id="evidence">
            <h2>What the Evidence Shows</h2>
            <p>
              Several clinical trials have shown that LLLT can produce modest improvements in hair density.
              The FDA has cleared multiple devices for treating androgenetic alopecia, and randomised
              controlled trials report increased hair counts compared to placebo devices.
            </p>
            <p>
              However, the improvements are generally subtle. Nobody is going from an advanced Norwood
              stage to a full head of hair with a laser cap alone. Most studies show an increase in hair
              count and thickness in early-stage thinning, which is why LLLT works best as a supporting
              treatment alongside medication or other therapies.
            </p>
            <p>
              The honest summary: it probably helps, but expectations should be realistic. If you&apos;re
              looking for a low-risk, painless add-on to your existing routine, it&apos;s worth considering.
              If you&apos;re expecting a standalone solution, you&apos;ll likely be disappointed.
            </p>
          </section>

          <section id="devices">
            <h2>Home Devices vs Clinic Treatments</h2>
            <h3>Home Devices (Laser Caps, Combs, Helmets)</h3>
            <p>
              Wearable laser caps are the most popular option. They look like baseball caps with laser
              diodes built into the lining. You wear them at home while watching telly, reading, or
              working. The upfront cost is higher, but there are no ongoing clinic fees.
            </p>
            <h3>Clinic Treatments</h3>
            <p>
              Some clinics offer LLLT as an in-office treatment, often as part of a broader hair loss
              programme (combined with PRP, for example). Clinic devices tend to be more powerful, but
              the convenience of a home device usually wins out for most people.
            </p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Home laser cap:</strong> £200 to £800 (one-off purchase)</li>
              <li><strong>Laser comb / helmet:</strong> £100 to £400</li>
              <li><strong>Clinic sessions:</strong> £30 to £75 per visit</li>
            </ul>
            <p>
              Over five years, a home device is one of the cheapest hair loss treatments available because
              it&apos;s a single purchase with no consumables or ongoing fees.
            </p>
          </section>

          <section id="who-for">
            <h2>Who Is LLLT For?</h2>
            <ul>
              <li>People with early-stage thinning who want a painless, low-risk option</li>
              <li>Anyone already using finasteride or minoxidil who wants an additional boost</li>
              <li>Post-transplant patients looking to support graft health and recovery</li>
              <li>People who prefer a treatment with no chemicals, no drugs and no side effects</li>
            </ul>
            <p>
              LLLT is not suitable as a standalone treatment for advanced hair loss. It works on follicles
              that are still present but miniaturised; it won&apos;t regrow hair where follicles are gone entirely.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Sun className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Laser Therapy Clinics Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare clinics offering laser hair therapy across the UK. Read reviews and book a consultation.</p>
              <Link href="/treatments/laser-therapy" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Laser Therapy Clinics
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
              { label: 'PRP Treatment', href: '/guides/prp-treatment', icon: '💉' },
              { label: 'Trichology', href: '/guides/trichology', icon: '🔬' },
              { label: 'Hair Transplant', href: '/guides/hair-transplant', icon: '🔬' },
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
