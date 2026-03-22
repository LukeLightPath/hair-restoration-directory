import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Crown, CheckCircle, Clock, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Hair Topper? Types, Attachment & Cost | Complete Guide',
  description:
    'A complete guide to hair toppers. Learn how they work, base types, attachment methods, UK costs and how to choose the right topper for thinning hair.',
  alternates: { canonical: canonicalUrl('/guides/hair-toppers') },
  openGraph: {
    title: 'What Is a Hair Topper? | Hair Restoration Guide',
    description: 'Everything you need to know about hair toppers: types, attachment, maintenance and UK costs.',
    url: canonicalUrl('/guides/hair-toppers'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What is the difference between a topper and a wig?',
    answer: 'A topper covers only the top or crown of the head, clipping into your existing hair for support. A wig covers the entire head. Toppers are designed for partial coverage (thinning on top while still having hair around the sides and back). They\'re lighter, more discreet and blend with your own hair.',
  },
  {
    question: 'How does a topper stay in place?',
    answer: 'Most toppers attach with small pressure-sensitive clips that grip your existing hair. Some use a combination of clips and adhesive tape. As long as you have some hair to anchor the clips to, a topper stays secure during daily activities. More advanced toppers can be bonded semi-permanently for those with very thin hair.',
  },
  {
    question: 'How much does a hair topper cost?',
    answer: 'Synthetic toppers range from £50 to £200. Human hair toppers range from £150 to £800+, with custom pieces at the higher end. The cost depends on the hair type, base size, construction quality and whether it\'s ready-to-wear or made to measure.',
  },
  {
    question: 'Can I style a hair topper like my own hair?',
    answer: 'Human hair toppers can be washed, heat-styled, coloured and cut just like natural hair. Synthetic toppers hold their shape but generally cannot be heat-styled (unless they\'re made from heat-friendly fibre). Most people have their topper cut and blended by a specialist after purchase.',
  },
  {
    question: 'How long does a topper last?',
    answer: 'Human hair toppers last 6 months to 2 years with daily wear, depending on maintenance. Synthetic toppers last 3 to 6 months. Rotating between two toppers extends the life of both. Proper care, including gentle washing and storing on a stand, makes a noticeable difference.',
  },
]

export default function HairToppersGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is a Hair Topper? Types, Attachment & Cost',
    description: 'A complete guide to hair toppers: how they work, base types, attachment methods and UK costs.',
    url: canonicalUrl('/guides/hair-toppers'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Hair Toppers' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Hair Topper?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A hair topper (sometimes called a wiglet or top piece) is a partial hair piece that covers
            thinning areas on the top of the head. Unlike a full wig, a topper clips into your existing
            hair and blends with it, adding volume and coverage exactly where you need it. They&apos;re
            particularly popular among women experiencing thinning along the parting or crown.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 5 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-they-work', label: 'How Hair Toppers Work' },
              { id: 'base-types', label: 'Base Types' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'maintenance', label: 'Maintenance' },
              { id: 'who-for', label: 'Who Are Toppers For?' },
              { id: 'choosing', label: 'How to Choose the Right Topper' },
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
          <section id="how-they-work">
            <h2>How Hair Toppers Work</h2>
            <p>
              A topper sits on top of your head and clips into your surrounding hair using small
              pressure-sensitive clips. Your own hair falls over and blends with the topper&apos;s
              hair, creating a natural, blended look. The result is instant additional volume and
              coverage over thinning areas.
            </p>
            <p>
              Toppers come in various sizes, from small pieces (roughly 12 x 12 cm) that cover
              just the crown to larger pieces that cover most of the top of the head. The right
              size depends on how much coverage you need.
            </p>
          </section>

          <section id="base-types">
            <h2>Base Types</h2>
            <ul>
              <li><strong>Silk top:</strong> A realistic scalp appearance where hair is injected through silk material. Looks very natural at the parting. Premium option.</li>
              <li><strong>Monofilament:</strong> Fine mesh where hair is individually tied. Scalp shows through for a natural look. Good balance of appearance and breathability.</li>
              <li><strong>Lace:</strong> Sheer lace base that creates an undetectable hairline at the front. Very breathable and lightweight.</li>
              <li><strong>Wefted:</strong> Machine-sewn construction. Most affordable but less natural at the parting. Good for adding bulk and volume.</li>
            </ul>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Synthetic toppers:</strong> £50 to £200</li>
              <li><strong>Human hair (ready-to-wear):</strong> £150 to £500</li>
              <li><strong>Human hair (custom):</strong> £400 to £800+</li>
            </ul>
          </section>

          <section id="maintenance">
            <h2>Maintenance</h2>
            <ul>
              <li>Wash every 7 to 10 wears (human hair) or 15 to 20 wears (synthetic)</li>
              <li>Use sulphate-free products to extend the lifespan</li>
              <li>Store on a topper stand or wig head when not in use</li>
              <li>Replace clips when they lose grip (most are easy to swap out)</li>
              <li>Have it trimmed and blended by a specialist periodically</li>
            </ul>
          </section>

          <section id="who-for">
            <h2>Who Are Toppers For?</h2>
            <ul>
              <li>Women with thinning on the crown, parting or top of the head</li>
              <li>People who still have enough surrounding hair to anchor clips</li>
              <li>Anyone who doesn&apos;t want a full wig but needs coverage on top</li>
              <li>People with alopecia affecting specific areas</li>
              <li>Those who want a removable, non-committal solution</li>
            </ul>
            <p>Toppers require enough surrounding hair to support the clips. If your hair is too thin or too sparse to hold clips securely, a full wig, integration system or bonded hair system may be a better option.</p>
          </section>

          <section id="choosing">
            <h2>How to Choose the Right Topper</h2>
            <ul>
              <li><strong>Match your hair colour and texture.</strong> Bring a sample of your natural hair (or photos) when shopping.</li>
              <li><strong>Get the right base size.</strong> The base should cover your thinning area with about 1 cm of overlap onto thicker hair for blending.</li>
              <li><strong>Try before you buy.</strong> Visiting a specialist in person is far better than ordering online for your first topper.</li>
              <li><strong>Consider a custom piece.</strong> If off-the-shelf toppers don&apos;t match well, a custom topper made to your colour and measurements will give the best result.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Crown className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Hair Topper Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare clinics offering hair toppers across the UK. Read reviews and book a consultation.</p>
              <Link href="/treatments/hair-toppers" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Topper Specialists
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
              { label: 'Wigs', href: '/guides/wigs', icon: '👸' },
              { label: 'Hair Integration', href: '/guides/hair-integration', icon: '🔗' },
              { label: 'Hair Extensions', href: '/guides/extensions', icon: '💇' },
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
