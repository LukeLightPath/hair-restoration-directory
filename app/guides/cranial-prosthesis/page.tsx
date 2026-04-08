import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Heart, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Cranial Prosthesis? Medical Wigs Explained | Complete Guide',
  description:
    'A complete guide to cranial prostheses (medical wigs). Learn what sets them apart from standard wigs, who they\'re designed for, NHS availability and UK costs.',
  alternates: { canonical: canonicalUrl('/guides/cranial-prosthesis') },
  openGraph: {
    title: 'What Is a Cranial Prosthesis? | Hair Restoration Guide',
    description: 'Everything you need to know about cranial prostheses: how they differ from standard wigs, NHS options and UK costs.',
    url: canonicalUrl('/guides/cranial-prosthesis'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What is the difference between a cranial prosthesis and a regular wig?',
    answer: 'A cranial prosthesis is custom-made to medical specifications for people whose hair loss is caused by a medical condition or treatment. It\'s designed for sensitive or irritated scalps, uses medical-grade materials and is fitted by a specialist. A regular wig is a general cosmetic product that doesn\'t account for medical needs. Insurance and NHS funding are typically only available for cranial prostheses, not off-the-shelf wigs.',
  },
  {
    question: 'Can I get a cranial prosthesis on the NHS?',
    answer: 'In some cases, yes. If your hair loss is caused by a medical condition or medical treatment, your GP or consultant can refer you. In England, you\'ll pay a prescription charge (currently around £31). In Scotland and Wales, NHS wigs are free. Availability and quality vary by NHS trust, and there may be a waiting list.',
  },
  {
    question: 'How much does a cranial prosthesis cost privately?',
    answer: 'Private cranial prostheses typically cost £500 to £3,000 in the UK, depending on whether the hair is synthetic or human, the cap construction and whether it\'s custom-made. Some health insurance policies cover part or all of the cost if prescribed by a medical professional.',
  },
  {
    question: 'How long does a cranial prosthesis last?',
    answer: 'A human hair cranial prosthesis typically lasts 1 to 2 years with careful maintenance. Synthetic versions last 6 to 12 months. The lifespan depends on daily wear, how well it\'s maintained and the quality of the construction.',
  },
  {
    question: 'Is a cranial prosthesis comfortable on a sensitive scalp?',
    answer: 'Yes, they\'re specifically designed with comfort in mind. The cap interior uses soft, hypoallergenic materials. The construction is lightweight and breathable. Many are designed for scalps that are sensitive from chemotherapy, radiation or medical conditions. Your specialist will ensure the fit doesn\'t cause irritation.',
  },
]

export default function CranialProsthesisGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is a Cranial Prosthesis? Medical Wigs Explained',
    description: 'A complete guide to cranial prostheses: how they differ from standard wigs, NHS funding, UK costs and who they\'re for.',
    url: canonicalUrl('/guides/cranial-prosthesis'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Cranial Prosthesis' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Cranial Prosthesis?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A cranial prosthesis is a medical-grade wig designed specifically for people who have lost
            their hair due to medical conditions or treatments such as chemotherapy, alopecia, burns
            or radiation therapy. Unlike standard wigs, cranial prostheses are custom-fitted to the
            individual, made with hypoallergenic materials and designed for sensitive scalps. They may
            be partially funded through the NHS or private health insurance.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 5 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'vs-wigs', label: 'How It Differs from a Standard Wig' },
              { id: 'who-for', label: 'Who Are They Designed For?' },
              { id: 'fitting', label: 'The Fitting Process' },
              { id: 'nhs', label: 'NHS Availability' },
              { id: 'cost', label: 'Private Cost in the UK' },
              { id: 'maintenance', label: 'Care & Maintenance' },
              { id: 'choosing', label: 'How to Find a Specialist' },
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
          <section id="vs-wigs">
            <h2>How It Differs from a Standard Wig</h2>
            <ul>
              <li><strong>Custom fit:</strong> Made to your exact head measurements rather than a standard size.</li>
              <li><strong>Medical-grade materials:</strong> Hypoallergenic cap lining designed for sensitive, post-treatment scalps.</li>
              <li><strong>Silicone gripper lining:</strong> Many cranial prostheses have a silicone-lined interior that holds the piece securely without needing clips or adhesive, which is important for scalps with no hair to grip.</li>
              <li><strong>Prescribed:</strong> Can be prescribed by a medical professional, making it eligible for NHS funding or insurance claims.</li>
              <li><strong>Specialist fitting:</strong> Fitted by a trained cranial prosthesis specialist, not just a wig retailer.</li>
            </ul>
          </section>

          <section id="who-for">
            <h2>Who Are They Designed For?</h2>
            <ul>
              <li>Cancer patients experiencing hair loss from chemotherapy or radiation</li>
              <li>People with alopecia totalis or alopecia universalis (complete hair loss)</li>
              <li>Those with hair loss from burns, scarring or skin conditions</li>
              <li>People with trichotillomania (compulsive hair pulling)</li>
              <li>Anyone whose hair loss is medically caused and needs a comfortable, secure solution</li>
            </ul>
          </section>

          <section id="fitting">
            <h2>The Fitting Process</h2>
            <ol>
              <li><strong>Referral or self-referral:</strong> Your GP, oncologist or dermatologist can refer you. You can also approach a cranial prosthesis specialist directly.</li>
              <li><strong>Consultation:</strong> A private, sensitive discussion about your needs, preferences and timeline (especially if hair loss hasn&apos;t started yet).</li>
              <li><strong>Measurement and templating:</strong> Precise head measurements and sometimes a plaster cast or template of your head shape.</li>
              <li><strong>Colour and style matching:</strong> If possible, matching to your natural hair (bring photos from before hair loss began).</li>
              <li><strong>Fitting and adjustment:</strong> Once the prosthesis is made, it&apos;s fitted, trimmed and styled to suit you.</li>
            </ol>
            <p>Many specialists recommend starting the process before hair loss begins (for example, before chemotherapy starts) so that colour and style can be matched accurately.</p>
          </section>

          <section id="nhs">
            <h2>NHS Availability</h2>
            <p>
              The NHS provides wigs for medical hair loss, but the service varies significantly by region:
            </p>
            <ul>
              <li><strong>England:</strong> Prescription charge of approximately £31 per wig. You can usually get one or two per year.</li>
              <li><strong>Scotland and Wales:</strong> Free of charge.</li>
              <li><strong>Quality varies:</strong> NHS wigs range from basic synthetic to reasonable quality. Some NHS trusts offer better options than others.</li>
              <li><strong>Waiting times:</strong> There can be a waiting list depending on your area.</li>
            </ul>
            <p>Many people choose to go private for a better quality prosthesis, better fitting experience and more choice. Some private health insurance policies cover cranial prostheses when prescribed.</p>
          </section>

          <section id="cost">
            <h2>Private Cost in the UK</h2>
            <ul>
              <li><strong>Synthetic cranial prosthesis:</strong> £200 to £800</li>
              <li><strong>Human hair cranial prosthesis:</strong> £800 to £3,000</li>
              <li><strong>Custom-made premium:</strong> £1,500 to £3,000+</li>
            </ul>
          </section>

          <section id="maintenance">
            <h2>Care &amp; Maintenance</h2>
            <ul>
              <li>Wash gently with specialist wig shampoo (or sulphate-free shampoo for human hair)</li>
              <li>Air dry on a wig stand; avoid excessive heat on synthetic pieces</li>
              <li>Clean the silicone lining regularly to maintain grip</li>
              <li>Store properly when not in use to maintain shape</li>
              <li>Book periodic check-ups with your specialist for adjustments</li>
            </ul>
          </section>

          <section id="choosing">
            <h2>How to Find a Specialist</h2>
            <ul>
              <li><strong>Look for cranial prosthesis credentials.</strong> Not all wig specialists are trained in medical prosthetics. Ask about specific cranial prosthesis qualifications.</li>
              <li><strong>Hospital partnerships.</strong> Many specialists work alongside NHS hospitals and oncology departments, which is a good indicator of credibility.</li>
              <li><strong>Sensitive environment.</strong> A good specialist will offer a private, compassionate consultation space and take the time you need.</li>
              <li><strong>Reviews from medical patients.</strong> Look for reviews from people in similar medical situations, not just cosmetic wig reviews.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Heart className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Cranial Prosthesis Specialists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare specialists offering cranial prostheses across the UK.</p>
              <Link href="/treatments/cranial-prosthesis" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Specialists
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
