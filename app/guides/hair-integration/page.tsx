import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, HelpCircle, MapPin, Link as LinkIcon } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is Hair Integration? How It Works, Cost & Suitability | Guide',
  description:
    'A complete guide to hair integration systems. Learn how mesh-based integration works, who it suits, UK costs and how it compares to wigs and hair systems.',
  alternates: { canonical: canonicalUrl('/guides/hair-integration') },
  openGraph: {
    title: 'What Is Hair Integration? | Hair Restoration Guide',
    description: 'Everything you need to know about hair integration: how it works, costs, maintenance and who it suits.',
    url: canonicalUrl('/guides/hair-integration'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What is the difference between hair integration and a wig?',
    answer: 'A wig covers the entire head and sits on top of all your hair. Integration works with your existing hair, pulling it through a mesh base and adding extra hair where you need it. The result is a blend of your own hair and added hair, which many people find more natural-feeling than wearing a full wig.',
  },
  {
    question: 'How long does a hair integration system last?',
    answer: 'Typically 6 to 12 months depending on the quality, your hair growth rate and how well you maintain it. As your natural hair grows, the mesh needs regular tightening (every 4 to 6 weeks) to keep it sitting properly.',
  },
  {
    question: 'Is hair integration suitable for severe hair loss?',
    answer: 'Integration works best with mild to moderate thinning where you still have reasonable coverage. It needs enough existing hair to pull through the mesh and provide a natural blend. For extensive hair loss, a full wig or bonded hair system is usually a better choice.',
  },
  {
    question: 'How much does hair integration cost in the UK?',
    answer: 'An initial hair integration system and fitting typically costs £300 to £1,500 depending on the size and hair quality. Maintenance appointments every 4 to 6 weeks cost £40 to £100 per visit. Annual maintenance runs roughly £400 to £1,000 on top of the initial cost.',
  },
  {
    question: 'Can I wash my hair normally with integration?',
    answer: 'Yes, though you need to be gentle. Use sulphate-free shampoo and avoid pulling or tugging at the mesh. Don\'t scratch the scalp aggressively. Condition the ends but avoid getting heavy conditioners on the mesh attachments. Your specialist will give you specific care instructions.',
  },
]

export default function HairIntegrationGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is Hair Integration? How It Works, Cost & Suitability',
    description: 'A complete guide to hair integration systems: how they work, who they suit, UK costs and maintenance.',
    url: canonicalUrl('/guides/hair-integration'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Hair Integration' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is Hair Integration?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Hair integration is a non-surgical solution for thinning hair that blends added hair with
            your own existing hair. A fine mesh base is placed over the thinning area, your natural
            hair is pulled through the mesh, and additional hair is attached to fill in the gaps.
            The result is a seamless combination of your real hair and the added hair, creating
            natural-looking volume and coverage.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 5 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-works', label: 'How Hair Integration Works' },
              { id: 'process', label: 'The Fitting Process' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'maintenance', label: 'Maintenance' },
              { id: 'who-for', label: 'Who Is Integration For?' },
              { id: 'choosing', label: 'How to Choose a Specialist' },
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
            <h2>How Hair Integration Works</h2>
            <p>
              A fine net or mesh base (usually made of nylon or polyester) is custom-sized to cover your
              thinning area. Your own hair is pulled through small openings in the mesh using a hook
              tool. Additional human or synthetic hair is then attached to the mesh to fill in any thin
              spots.
            </p>
            <p>
              Because your natural hair is incorporated into the system, it moves and falls in the same
              direction as the added hair. This is what makes integration feel more natural than a
              traditional wig for people who still have a reasonable amount of their own hair.
            </p>
          </section>

          <section id="process">
            <h2>The Fitting Process</h2>
            <ol>
              <li><strong>Consultation:</strong> The specialist assesses your hair density, coverage needs and colour match.</li>
              <li><strong>Mesh fitting:</strong> A mesh base is custom-cut or selected to cover your thinning area.</li>
              <li><strong>Integration:</strong> Your natural hair is threaded through the mesh.</li>
              <li><strong>Hair attachment:</strong> Additional hair is woven or tied into the mesh where coverage is needed.</li>
              <li><strong>Cutting and blending:</strong> The specialist cuts and styles everything together for a seamless finish.</li>
            </ol>
            <p>An initial fitting typically takes 1.5 to 3 hours depending on the size of the area and the amount of blending needed.</p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Initial system and fitting:</strong> £300 to £1,500</li>
              <li><strong>Maintenance appointments (every 4 to 6 weeks):</strong> £40 to £100</li>
              <li><strong>Replacement system (every 6 to 12 months):</strong> £200 to £800</li>
            </ul>
          </section>

          <section id="maintenance">
            <h2>Maintenance</h2>
            <p>As your natural hair grows, the mesh lifts away from the scalp. Regular tightening appointments (every 4 to 6 weeks) keep the system sitting flat and looking natural.</p>
            <ul>
              <li>Wash gently with sulphate-free shampoo</li>
              <li>Use a wide-tooth comb or soft brush</li>
              <li>Avoid heavy styling products near the mesh</li>
              <li>Don&apos;t tug or pull when brushing through tangles</li>
            </ul>
          </section>

          <section id="who-for">
            <h2>Who Is Integration For?</h2>
            <ul>
              <li>Women with mild to moderate diffuse thinning</li>
              <li>People who want to keep their own hair as part of the solution</li>
              <li>Anyone who finds full wigs uncomfortable or too heavy</li>
              <li>Those who want a more natural feel than a clip-on topper</li>
            </ul>
            <p>Integration isn&apos;t ideal for people with very little remaining hair. The system relies on your existing hair for blending and sometimes for anchoring. If your hair is too sparse, a full wig or bonded hair system will give a better result.</p>
          </section>

          <section id="choosing">
            <h2>How to Choose a Specialist</h2>
            <ul>
              <li><strong>Integration-specific experience.</strong> This is a niche service. Find someone who does it regularly.</li>
              <li><strong>Before-and-after work.</strong> Ask to see results on clients with similar hair loss to yours.</li>
              <li><strong>Clear maintenance plan.</strong> A good specialist will explain the ongoing commitment upfront.</li>
              <li><strong>Comfortable environment.</strong> Private consultation space and a patient, unhurried approach.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <LinkIcon className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Integration Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare clinics offering hair integration across the UK.</p>
              <Link href="/treatments/hair-integration" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Integration Specialists
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
              { label: 'Wigs', href: '/guides/wigs', icon: '👸' },
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
