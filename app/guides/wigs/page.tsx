import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, ArrowRight, Crown, CheckCircle,
  Clock, HelpCircle, MapPin
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Wig? Types, Fitting & What to Expect | Complete Guide',
  description:
    'A complete guide to wigs for hair loss. Learn about human hair vs synthetic, cap constructions, fitting, costs in the UK and how to choose the right wig.',
  alternates: { canonical: canonicalUrl('/guides/wigs') },
  openGraph: {
    title: 'What Is a Wig? Types, Fitting & What to Expect | Hair Restoration Guide',
    description: 'Everything you need to know about wigs: human hair vs synthetic, cap types, fitting, maintenance and UK pricing.',
    url: canonicalUrl('/guides/wigs'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What is the difference between a wig and a hair system?',
    answer: 'A wig is designed to be removed daily. You put it on in the morning and take it off at night. A hair system is semi-permanently bonded to your scalp with adhesive or tape and worn continuously for weeks. Wigs offer more flexibility; hair systems offer a more permanent feel.',
  },
  {
    question: 'How long does a human hair wig last?',
    answer: 'A well-made human hair wig typically lasts 1 to 3 years with proper care. How long yours lasts depends on how often you wear it, whether you heat-style it regularly and how well you maintain it. Synthetic wigs tend to last 4 to 6 months with daily wear.',
  },
  {
    question: 'Can you tell someone is wearing a wig?',
    answer: 'A high-quality wig with a lace front is very difficult to detect. The lace creates a natural-looking hairline that blends with your skin. Cheaper wigs without lace fronts can be more obvious, particularly at the hairline.',
  },
  {
    question: 'How much does a good wig cost in the UK?',
    answer: 'Synthetic wigs range from £50 to £500. Human hair wigs range from £200 to £3,000+, with premium European hair at the top end. Medical-grade wigs sit in the £300 to £1,500 range. Custom-made wigs cost more than ready-to-wear.',
  },
  {
    question: 'Can I get a wig on the NHS?',
    answer: 'In some cases, yes. If your hair loss is caused by a medical condition or treatment (such as chemotherapy or alopecia), you may be eligible for an NHS wig. In England, you\'ll pay a prescription charge (currently around £31 per wig). In Scotland and Wales, NHS wigs are free.',
  },
]

export default function WigsGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is a Wig? Types, Fitting & What to Expect',
    description: 'A complete guide to wigs for hair loss. Human hair vs synthetic, cap constructions, fitting, UK costs and choosing the right wig.',
    url: canonicalUrl('/guides/wigs'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Wigs' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Wig?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A wig is a head covering made from human hair, synthetic fibre or a blend of both.
            For people experiencing hair loss, wigs offer an immediate transformation without
            surgery, adhesives or any permanent commitment. Modern wigs have come a long way from
            the obvious, costume-like pieces of the past.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 7 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'hair-types', label: 'Human Hair vs Synthetic' },
              { id: 'cap-types', label: 'Cap Constructions' },
              { id: 'fitting', label: 'Getting Fitted' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'maintenance', label: 'Maintenance & Care' },
              { id: 'who-for', label: 'Who Are Wigs For?' },
              { id: 'choosing-specialist', label: 'How to Choose a Wig Specialist' },
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
          <section id="hair-types">
            <h2>Human Hair vs Synthetic</h2>
            <p>
              The first decision when choosing a wig is the hair type. Both have genuine advantages,
              and the right choice depends on your budget, lifestyle and how much styling flexibility you want.
            </p>
          </section>
        </div>

        {/* Hair type comparison cards */}
        <div className="grid gap-5 sm:grid-cols-2 my-8">
          {[
            {
              name: 'Human Hair', icon: '💇',
              pros: ['Looks and feels the most natural', 'Can be heat-styled, coloured and cut', 'Lasts 1 to 3 years with care'],
              cons: ['Higher price point (£200 to £3,000+)', 'Needs styling after washing', 'Affected by weather and humidity'],
              best: 'Best for the most natural look with full styling freedom.',
            },
            {
              name: 'Synthetic Hair', icon: '🎨',
              pros: ['More affordable (£50 to £500)', 'Holds its style after washing', 'Lightweight and low maintenance'],
              cons: ['Cannot be heat-styled (unless heat-friendly)', 'Shorter lifespan (4 to 6 months)', 'Can have an unnatural sheen'],
              best: 'Best for budget-friendly, low-maintenance daily wear.',
            },
          ].map((type) => (
            <div key={type.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
              <div className="text-2xl mb-3">{type.icon}</div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{type.name}</h3>
              <div className="space-y-2 text-sm mb-3">
                {type.pros.map((pro) => (
                  <div key={pro} className="flex items-start gap-1.5 text-success">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{pro}</span>
                  </div>
                ))}
                {type.cons.map((con) => (
                  <div key={con} className="flex items-start gap-1.5 text-amber-500">
                    <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{con}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-primary font-medium border-t border-border pt-3">{type.best}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="cap-types">
            <h2>Cap Constructions</h2>
            <p>The cap is the foundation of a wig: the structure that the hair is attached to. It affects how natural the wig looks, how comfortable it feels and how breathable it is.</p>
            <h3>Lace Front</h3>
            <p>A sheer lace panel along the front edge creates an invisible hairline. The hair is individually hand-tied to the lace, so it looks like it&apos;s growing from your scalp. The most popular option for a natural appearance.</p>
            <h3>Full Lace</h3>
            <p>The entire cap is made of lace, allowing for versatile parting and styling in any direction. More expensive, but offers the most natural look from every angle. Popular for people who want to wear their hair up.</p>
            <h3>Monofilament Top</h3>
            <p>A fine mesh material at the crown where each hair is individually knotted. The scalp shows through the mesh, creating a realistic parting line. Often combined with a wefted back for comfort.</p>
            <h3>Standard Wefted</h3>
            <p>Hair is machine-sewn onto strips of fabric (wefts) attached to the cap. The most affordable construction. Less natural at the parting but comfortable, breathable and lighter in weight.</p>
          </section>

          <section id="fitting">
            <h2>Getting Fitted</h2>
            <p>A proper fitting makes all the difference. Here&apos;s what to expect:</p>
            <ul>
              <li><strong>Head measurement:</strong> The specialist measures circumference, front to nape and ear to ear to ensure a secure fit.</li>
              <li><strong>Colour matching:</strong> Your natural hair colour, skin tone and eyebrow shade are matched for the most natural result.</li>
              <li><strong>Style consultation:</strong> Discussion about length, density, texture and parting preference.</li>
              <li><strong>Cutting and styling:</strong> The specialist customises the wig: trimming layers, shaping the fringe and styling it to suit your face.</li>
            </ul>
            <p>Ready-to-wear wigs can be adjusted at home with internal straps and clips. Custom wigs take 4 to 8 weeks to produce.</p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <p>Wig prices vary depending on the hair type, cap construction and whether it&apos;s ready-to-wear or custom made.</p>
            <ul>
              <li><strong>Synthetic wigs:</strong> £50 to £500</li>
              <li><strong>Human hair (ready-to-wear):</strong> £200 to £1,500</li>
              <li><strong>Human hair (custom):</strong> £500 to £3,000+</li>
              <li><strong>Medical/NHS wigs:</strong> £300 to £1,500 (prescription charge of ~£31 in England; free in Scotland and Wales)</li>
            </ul>
            <p>If your hair loss is medical, your GP can refer you for an NHS wig. Quality and availability vary by NHS trust, so many people choose to go private for a wider selection.</p>
          </section>

          <section id="maintenance">
            <h2>Maintenance &amp; Care</h2>
            <ul>
              <li><strong>Human hair:</strong> Wash every 7 to 10 wears with sulphate-free shampoo. Condition after every wash. Store on a wig stand.</li>
              <li><strong>Synthetic:</strong> Wash every 15 to 20 wears with specialist synthetic shampoo. Air dry on a stand. Don&apos;t brush when wet.</li>
            </ul>
            <p>Avoid sleeping in your wig if possible. Friction against a pillow causes tangling and shortens the lifespan. Use a silk or satin pillowcase if you do need to wear it overnight.</p>
          </section>

          <section id="who-for">
            <h2>Who Are Wigs For?</h2>
            <ul>
              <li>Women and men with alopecia (any type)</li>
              <li>People going through chemotherapy or other medical treatments</li>
              <li>Anyone with thinning hair who wants a full, instant transformation</li>
              <li>People who want to change their look without chemical or surgical treatments</li>
              <li>Those who prefer a removable option over a bonded hair system</li>
            </ul>
            <p>Wigs are especially popular among women, though they&apos;re increasingly used by men too. The ability to remove a wig at the end of the day appeals to people who want flexibility.</p>
          </section>

          <section id="choosing-specialist">
            <h2>How to Choose a Wig Specialist</h2>
            <ul>
              <li><strong>Experience with hair loss clients.</strong> A specialist who regularly works with people dealing with hair loss will understand your needs better than a fashion wig retailer.</li>
              <li><strong>Private consultation room.</strong> Trying on wigs can feel vulnerable. A good specialist offers a private, comfortable space.</li>
              <li><strong>Range of stock.</strong> Being able to try multiple styles and colours in person is far better than ordering online.</li>
              <li><strong>Aftercare support.</strong> Look for a clinic that offers styling, maintenance tips and adjustments.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Crown className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Wig Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare wig specialists across the UK. Read reviews, check services and book a free consultation.</p>
              <Link href="/treatments/wigs" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Wig Specialists
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
              { label: 'Cranial Prosthesis', href: '/guides/cranial-prosthesis', icon: '🏥' },
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
