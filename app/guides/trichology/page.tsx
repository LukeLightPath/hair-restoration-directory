import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Microscope, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is Trichology? Diagnosis, Treatment & Finding a Trichologist | Guide',
  description:
    'A complete guide to trichology. Learn what a trichologist does, what conditions they treat, what to expect from a consultation and how to find one in the UK.',
  alternates: { canonical: canonicalUrl('/guides/trichology') },
  openGraph: {
    title: 'What Is Trichology? | Hair Restoration Guide',
    description: 'Everything you need to know about trichology: what it is, conditions treated, consultations and finding a trichologist.',
    url: canonicalUrl('/guides/trichology'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'What is the difference between a trichologist and a dermatologist?',
    answer: 'A dermatologist is a medical doctor who specialises in skin conditions (including the scalp). A trichologist specialises specifically in hair and scalp health but is not a medical doctor. Dermatologists can prescribe medication and perform medical procedures; trichologists focus on diagnosis, non-medical treatments and lifestyle guidance. For serious medical conditions, a trichologist may refer you to a dermatologist.',
  },
  {
    question: 'How much does a trichology consultation cost?',
    answer: 'An initial consultation typically costs £75 to £250 in the UK. Follow-up appointments are usually £50 to £150. Some trichologists offer packages that include follow-up sessions and treatment products. Trichology is not routinely available on the NHS.',
  },
  {
    question: 'Is trichology covered by the NHS?',
    answer: 'Trichology itself is not widely available on the NHS. Your GP can refer you to a dermatologist for medical hair and scalp conditions, but specialist trichology consultations are typically private. Some NHS hospitals have trichology departments, but availability varies by region.',
  },
  {
    question: 'What qualifications should a trichologist have?',
    answer: 'Look for membership of the Institute of Trichologists (MIT) or the Trichological Society. Members must complete accredited training, examinations and ongoing professional development. Be cautious of anyone calling themselves a trichologist without these credentials.',
  },
  {
    question: 'Can a trichologist help with hair loss?',
    answer: 'Yes, particularly in diagnosing the cause. Many people don\'t know why they\'re losing hair, and a trichologist can identify underlying factors: nutritional deficiencies, scalp conditions, hormonal imbalances, stress, or styling damage. Once the cause is identified, they can recommend appropriate treatment or refer you to a specialist.',
  },
]

export default function TrichologyGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is Trichology? Diagnosis, Treatment & Finding a Trichologist',
    description: 'A complete guide to trichology: what a trichologist does, conditions treated and how to find one in the UK.',
    url: canonicalUrl('/guides/trichology'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Trichology' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is Trichology?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Trichology is the scientific study of hair and scalp health. A trichologist is a
            specialist who diagnoses and treats conditions affecting the hair and scalp, from
            pattern hair loss and alopecia to dandruff, psoriasis and damage from styling.
            Think of them as the go-to expert when you need answers about why your hair is
            behaving the way it is.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 5 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'what-they-do', label: 'What a Trichologist Does' },
              { id: 'conditions', label: 'Conditions They Treat' },
              { id: 'consultation', label: 'What to Expect from a Consultation' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'who-for', label: 'Who Should See a Trichologist?' },
              { id: 'choosing', label: 'How to Find a Qualified Trichologist' },
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
          <section id="what-they-do">
            <h2>What a Trichologist Does</h2>
            <p>
              A trichologist examines the hair and scalp using specialist microscopy and diagnostic techniques
              to identify the root cause of hair problems. They don&apos;t just look at what&apos;s happening
              on the surface; they consider the full picture: diet, hormones, medical history, stress levels
              and styling habits.
            </p>
            <p>
              Treatment recommendations might include topical products, dietary changes, supplements, scalp
              treatments, or referral to a dermatologist or GP for issues that need medical attention.
            </p>
          </section>

          <section id="conditions">
            <h2>Conditions They Treat</h2>
            <ul>
              <li><strong>Androgenetic alopecia:</strong> Male and female pattern hair loss</li>
              <li><strong>Alopecia areata:</strong> Patchy hair loss caused by the immune system</li>
              <li><strong>Telogen effluvium:</strong> Excessive shedding triggered by stress, illness or hormonal changes</li>
              <li><strong>Scalp psoriasis and eczema:</strong> Inflammatory conditions affecting the scalp</li>
              <li><strong>Seborrhoeic dermatitis:</strong> Flaky, itchy scalp (severe dandruff)</li>
              <li><strong>Traction alopecia:</strong> Hair loss from tight hairstyles or extensions</li>
              <li><strong>Nutritional deficiencies:</strong> Hair thinning linked to low iron, zinc, vitamin D or protein</li>
              <li><strong>Post-partum hair loss:</strong> Shedding after pregnancy</li>
            </ul>
          </section>

          <section id="consultation">
            <h2>What to Expect from a Consultation</h2>
            <p>A first appointment usually lasts 45 to 60 minutes and covers:</p>
            <ol>
              <li><strong>Medical and lifestyle history:</strong> Diet, medication, stress, family history of hair loss, styling habits.</li>
              <li><strong>Scalp examination:</strong> Using a trichoscope or dermascope (a magnified camera) to examine the scalp and hair follicles in detail.</li>
              <li><strong>Hair analysis:</strong> Assessing hair density, shaft diameter and growth patterns.</li>
              <li><strong>Diagnosis:</strong> Identifying the likely cause of your hair or scalp problem.</li>
              <li><strong>Treatment plan:</strong> Recommendations for products, lifestyle changes, or referrals if medical treatment is needed.</li>
            </ol>
            <p>Some trichologists may request blood tests (arranged through your GP) to check for deficiencies or hormonal imbalances.</p>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>Initial consultation:</strong> £75 to £250</li>
              <li><strong>Follow-up appointments:</strong> £50 to £150</li>
              <li><strong>Scalp treatments (in-clinic):</strong> £50 to £100 per session</li>
            </ul>
            <p>Trichology is primarily a private service. Some NHS hospitals have trichology departments, but availability is limited and waiting lists can be long.</p>
          </section>

          <section id="who-for">
            <h2>Who Should See a Trichologist?</h2>
            <ul>
              <li>Anyone experiencing unexplained hair loss or thinning</li>
              <li>People whose GP hasn&apos;t been able to identify the cause of their hair loss</li>
              <li>Anyone with persistent scalp problems (itching, flaking, soreness)</li>
              <li>People wanting a professional assessment before committing to a treatment</li>
              <li>Those who want to understand whether their hair loss is temporary or progressive</li>
            </ul>
            <p>A trichologist is often the best first step if you don&apos;t know what&apos;s causing your hair loss. They can point you in the right direction before you spend money on treatments that may not address the underlying problem.</p>
          </section>

          <section id="choosing">
            <h2>How to Find a Qualified Trichologist</h2>
            <ul>
              <li><strong>Institute of Trichologists (MIT):</strong> The main professional body in the UK. Members have completed accredited training and examinations.</li>
              <li><strong>Trichological Society:</strong> Another recognised professional body with qualified members.</li>
              <li><strong>Ask about qualifications.</strong> A qualified trichologist will have specific trichology credentials, not just general beauty or hairdressing qualifications.</li>
              <li><strong>Check reviews.</strong> Google reviews from real clients give a good sense of the practitioner&apos;s approach and bedside manner.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Microscope className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Trichologists Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare qualified trichologists across the UK. Read reviews and book a consultation.</p>
              <Link href="/treatments/trichology" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Trichologists
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
              { label: 'Laser Therapy', href: '/guides/laser-therapy', icon: '☀️' },
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
