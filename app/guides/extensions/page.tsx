import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Wand2, CheckCircle, Clock, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Are Hair Extensions? Methods, Maintenance & Cost | Complete Guide',
  description:
    'A complete guide to hair extensions. Learn about tape-in, micro ring, weave and fusion methods, how long they last, UK costs and how to find the right specialist.',
  alternates: { canonical: canonicalUrl('/guides/extensions') },
  openGraph: {
    title: 'What Are Hair Extensions? | Hair Restoration Guide',
    description: 'Everything you need to know about hair extensions: methods, maintenance, costs and choosing a specialist.',
    url: canonicalUrl('/guides/extensions'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Do hair extensions damage your natural hair?',
    answer: 'When applied and maintained correctly by a professional, extensions should not cause damage. Problems tend to arise when extensions are left in too long, applied to hair that\'s too fine to support them or removed incorrectly. Choosing an experienced technician and following their aftercare advice is the best way to avoid issues.',
  },
  {
    question: 'How long do hair extensions last?',
    answer: 'It depends on the method. Tape-ins last 6 to 8 weeks before needing re-application. Micro rings last 3 to 4 months. Weaves last 6 to 8 weeks. Fusion bonds last 3 to 6 months. The hair itself can often be reused for multiple applications if it\'s good quality.',
  },
  {
    question: 'Can hair extensions help with hair loss?',
    answer: 'Extensions can add volume and length to thinning hair, but they\'re not a treatment for the underlying cause of hair loss. If your hair is thinning significantly, extensions may put too much stress on the remaining hair. For hair loss specifically, alternative options like hair toppers, integration systems or hair systems may be more suitable.',
  },
  {
    question: 'How much do extensions cost in the UK?',
    answer: 'A full head of tape-in extensions typically costs £200 to £500. Micro rings run £250 to £600. Weaves cost £150 to £400. Fusion bonds are the most expensive at £300 to £800. These prices include the hair and application. Re-application is usually cheaper because you can reuse the hair.',
  },
  {
    question: 'Can you wash and style hair extensions normally?',
    answer: 'Yes, but with some care. Use sulphate-free shampoo and avoid applying conditioner directly to the bonds or tape. You can heat-style human hair extensions just like natural hair. Brush gently from the ends upwards and avoid sleeping with wet extensions to prevent tangling.',
  },
]

export default function ExtensionsGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Are Hair Extensions? Methods, Maintenance & Cost',
    description: 'A complete guide to hair extensions: methods, maintenance, UK costs and choosing the right specialist.',
    url: canonicalUrl('/guides/extensions'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Hair Extensions' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Are Hair Extensions?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Hair extensions are strands of real or synthetic hair attached to your existing hair to add
            length, volume or both. They&apos;re one of the most popular hair services in the UK,
            used by people who want thicker, longer hair without waiting months or years for natural growth.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 6 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'methods', label: 'Extension Methods' },
              { id: 'hair-quality', label: 'Hair Quality Grades' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'maintenance', label: 'Maintenance & Aftercare' },
              { id: 'who-for', label: 'Who Are Extensions For?' },
              { id: 'choosing-specialist', label: 'How to Choose a Specialist' },
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
          <section id="methods">
            <h2>Extension Methods</h2>
            <p>There are several ways to attach extensions. Each method has different pros, cons and lifespans.</p>
          </section>
        </div>

        {/* Method cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          {[
            {
              name: 'Tape-In', icon: '📎',
              pros: ['Quick to apply (1 to 2 hours)', 'Lies flat against the head', 'Reusable hair for multiple applications'],
              cons: ['Needs re-taping every 6 to 8 weeks', 'Not ideal for very fine hair'],
              best: 'Best for a quick, comfortable method with easy removal.',
            },
            {
              name: 'Micro Ring / Nano Ring', icon: '⭕',
              pros: ['No heat or glue needed', 'Lasts 3 to 4 months', 'Adjustable and gentle on hair'],
              cons: ['Application takes 2 to 3 hours', 'Rings can be visible if hair is very fine'],
              best: 'Best for longer-lasting wear without adhesives.',
            },
            {
              name: 'Weave / Sew-In', icon: '🧵',
              pros: ['Very secure hold', 'Works well with thicker hair', 'No chemicals or adhesives'],
              cons: ['Needs a braid base (can feel tight initially)', 'Lasts 6 to 8 weeks'],
              best: 'Best for thick, coarse hair types wanting maximum volume.',
            },
            {
              name: 'Fusion / Pre-Bonded', icon: '🔗',
              pros: ['Longest lasting (3 to 6 months)', 'Very natural movement', 'Individual strand placement'],
              cons: ['Most expensive method', 'Heat used during application', 'Longest application time (3 to 5 hours)'],
              best: 'Best for the most long-lasting, natural-looking result.',
            },
          ].map((method) => (
            <div key={method.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl mb-3">{method.icon}</div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{method.name}</h3>
              <div className="space-y-2 text-sm mb-3">
                {method.pros.map((pro) => (
                  <div key={pro} className="flex items-start gap-1.5 text-success"><CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span className="text-muted-foreground">{pro}</span></div>
                ))}
                {method.cons.map((con) => (
                  <div key={con} className="flex items-start gap-1.5 text-amber-500"><Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span className="text-muted-foreground">{con}</span></div>
                ))}
              </div>
              <p className="text-xs text-primary font-medium border-t border-border pt-3">{method.best}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="hair-quality">
            <h2>Hair Quality Grades</h2>
            <p>Not all extension hair is created equal. The quality of the hair affects how natural it looks, how long it lasts and how well it blends.</p>
            <h3>Remy Hair</h3>
            <p>The cuticles are kept intact and aligned in one direction. This prevents tangling and gives the most natural movement and shine. Remy is the standard for quality extensions.</p>
            <h3>Virgin Hair</h3>
            <p>Completely unprocessed hair that has never been coloured, permed or chemically treated. The highest quality available. Expensive, but lasts the longest and can be re-coloured to match.</p>
            <h3>Non-Remy / Standard</h3>
            <p>Cuticles may be stripped or mixed in direction. More affordable, but more prone to tangling and has a shorter lifespan. Often coated in silicone to appear smooth initially, which washes off over time.</p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Tape-in (full head):</strong> £200 to £500</li>
              <li><strong>Micro ring (full head):</strong> £250 to £600</li>
              <li><strong>Weave/sew-in:</strong> £150 to £400</li>
              <li><strong>Fusion bonds:</strong> £300 to £800</li>
            </ul>
            <p>These prices typically include the hair and application. Re-application is cheaper because you can reuse the hair. Budget around £100 to £200 for maintenance appointments.</p>
          </section>

          <section id="maintenance">
            <h2>Maintenance &amp; Aftercare</h2>
            <ul>
              <li>Use sulphate-free shampoo and conditioner</li>
              <li>Brush gently from ends upwards with a soft bristle brush</li>
              <li>Avoid applying conditioner or oils directly to bonds or tape</li>
              <li>Tie hair in a loose braid or plait before sleeping</li>
              <li>Don&apos;t sleep with wet extensions (causes matting)</li>
              <li>Book maintenance appointments on time to avoid damage</li>
            </ul>
          </section>

          <section id="who-for">
            <h2>Who Are Extensions For?</h2>
            <ul>
              <li>People wanting added length they can&apos;t achieve with natural growth</li>
              <li>Anyone looking for more volume, especially with finer hair</li>
              <li>People wanting to add colour without dyeing their natural hair</li>
              <li>Those with mild thinning who want a fuller look (not severe hair loss)</li>
            </ul>
            <p>Extensions aren&apos;t recommended for people with significant hair loss or very fragile hair. The weight of extensions can put stress on weakened follicles. In those cases, toppers or integration systems are usually a better fit.</p>
          </section>

          <section id="choosing-specialist">
            <h2>How to Choose a Specialist</h2>
            <ul>
              <li><strong>Specialisation matters.</strong> Look for someone whose primary focus is extensions, not a general stylist who occasionally fits them.</li>
              <li><strong>Ask about the hair source.</strong> Good specialists will tell you exactly what grade of hair they use and where it comes from.</li>
              <li><strong>Before-and-after photos.</strong> Ask to see photos of their own work, particularly on hair types similar to yours.</li>
              <li><strong>Consultation first.</strong> A responsible specialist will assess your hair&apos;s condition before recommending a method and turn you away if extensions aren&apos;t suitable.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Wand2 className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Extension Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Browse extension specialists across the UK. Compare services, read reviews and book a consultation.</p>
              <Link href="/treatments/extensions" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Extension Specialists
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
              { label: 'Hair Toppers', href: '/guides/hair-toppers', icon: '👑' },
              { label: 'Hair Integration', href: '/guides/hair-integration', icon: '🔗' },
              { label: 'Hair Systems', href: '/guides/hair-systems', icon: '✂️' },
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
