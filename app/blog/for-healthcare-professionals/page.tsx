import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Search, HelpCircle,
  CheckCircle, BookOpen, Stethoscope,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Non-Surgical Hair Replacement: A Guide for Healthcare Professionals (UK)',
  description:
    'Clinical overview of non-surgical hair replacement options for GPs, dermatologists, trichologists and nurses. Covers hair systems, SMP, wigs and when to refer patients.',
  alternates: {
    canonical: canonicalUrl('/blog/for-healthcare-professionals'),
  },
  openGraph: {
    title: 'Non-Surgical Hair Replacement for Healthcare Professionals | Hair Restoration Guide',
    description:
      'A clinical overview of non-surgical hair replacement options for UK healthcare professionals.',
    url: canonicalUrl('/blog/for-healthcare-professionals'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Should I refer a patient to a non-surgical provider or a dermatologist first?',
    answer:
      'If the cause of hair loss hasn\'t been established, a dermatology referral should come first to rule out scarring alopecia, thyroid conditions or other underlying pathology. Once a diagnosis is in place and the patient is interested in cosmetic management, a non-surgical provider is appropriate. Many patients pursue both tracks simultaneously: medical management of the condition alongside a practical covering solution.',
  },
  {
    question: 'Are non-surgical hair systems safe for immunocompromised patients?',
    answer:
      'Lift-on wigs and clip-in toppers carry no specific risk for immunocompromised patients and are commonly used during chemotherapy. Bonded hair systems (attached with adhesive) are generally safe but can occasionally cause skin irritation on a sensitive or treatment-affected scalp. SMP should be deferred until the immune system has recovered, as the procedure involves micro-needling. The patient\'s oncology or dermatology team should confirm fitness for any procedure involving skin penetration.',
  },
  {
    question: 'How do NHS wig referrals work in practice?',
    answer:
      'The referring clinician (usually a dermatologist, oncologist or cancer nurse specialist) issues a prescription or referral letter. In England, the patient takes this to an approved NHS wig supplier and pays the standard charge of £80.15 for a synthetic wig (exemptions apply for those on certain benefits, under 16 or 16-18 in full-time education). In Scotland and Wales, NHS wigs are provided free of charge. In Northern Ireland, provision varies by health trust.',
  },
  {
    question: 'What training or accreditation should I look for in a non-surgical provider?',
    answer:
      'There is no single mandatory accreditation for non-surgical hair replacement in the UK. However, look for providers with membership of relevant professional bodies such as the Institute of Trichologists, the Trichological Society or BABTAC. For cancer-related hair loss, salons trained through the My New Hair programme or listed on the Cancer Hair Care directory have specific experience with medical hair loss patients. Client reviews and before-and-after evidence are also useful indicators of quality.',
  },
  {
    question: 'Is there clinical evidence supporting non-surgical hair replacement for psychological wellbeing?',
    answer:
      'Several studies demonstrate measurable improvements in quality of life, self-esteem and social functioning following hair replacement. A 2020 review in the Journal of Cosmetic Dermatology found that both wigs and hair systems were associated with reduced anxiety and depression scores in patients with alopecia. While the evidence base is smaller than for pharmacological interventions, the psychological benefit is well documented and clinically relevant.',
  },
  {
    question: 'Can patients combine pharmaceutical treatment with non-surgical options?',
    answer:
      'Yes. Finasteride, minoxidil and non-surgical hair replacement are not mutually exclusive. Many patients use pharmaceutical treatments to slow or stabilise further loss while wearing a hair system or topper for immediate cosmetic coverage. SMP can also be combined with medication. There are no known interactions between topical or oral hair loss treatments and non-surgical solutions.',
  },
]

export default function HealthcareProfessionalsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Non-Surgical Hair Replacement: A Guide for Healthcare Professionals',
    description:
      'Clinical overview of non-surgical hair replacement options for UK healthcare professionals.',
    url: canonicalUrl('/blog/for-healthcare-professionals'),
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
            { label: 'For Healthcare Professionals' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Stethoscope className="h-3 w-3" /> Clinical Resource
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Non-Surgical Hair Replacement: A Guide for Healthcare Professionals
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A clinical overview of non-surgical hair replacement for GPs, dermatologists,
            trichologists and nurses. What your patients are asking about, what the options
            are and when referral is appropriate.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 10 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'context', label: 'Why Patients Ask About Non-Surgical Options' },
              { id: 'overview', label: 'Overview of Non-Surgical Options' },
              { id: 'when-to-suggest', label: 'When to Suggest Non-Surgical Options' },
              { id: 'when-to-refer', label: 'When to Refer to a Specialist' },
              { id: 'what-clinics-offer', label: 'What Directory Clinics Typically Offer' },
              { id: 'nhs-pathway', label: 'The NHS Wig Pathway' },
              { id: 'professional-bodies', label: 'Professional Bodies and Resources' },
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

        {/* ═══ Disclaimer ═══ */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20 p-5 mb-12">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Hair Restoration Guide is a directory service,
            not a medical provider. This page is intended as an informational resource and does not constitute
            medical advice. Clinical decisions should always be based on individual patient assessment.
          </p>
        </div>

        {/* ═══ Content ═══ */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">

          <section id="context">
            <h2>Why Patients Ask About Non-Surgical Options</h2>
            <p>
              Hair loss is one of those topics that patients often raise at the end of an appointment,
              almost as an afterthought. They mention it casually, but the emotional weight behind the
              question is usually significant.
            </p>
            <p>
              For many patients, hair loss affects confidence, social functioning and mental health.
              Research published in the Journal of the European Academy of Dermatology and Venereology
              has consistently linked androgenetic alopecia with increased rates of anxiety and
              depression. In oncology settings, hair loss during chemotherapy is frequently cited as
              one of the most distressing side effects.
            </p>
            <p>
              Patients are increasingly aware that non-surgical options exist beyond the traditional
              wig. Hair systems, scalp micropigmentation and integration pieces have improved
              considerably in the last decade. Understanding what these options involve, even at a
              high level, allows you to have an informed conversation when patients ask.
            </p>
          </section>

          <section id="overview">
            <h2>Overview of Non-Surgical Options</h2>
            <p>
              Non-surgical hair replacement covers a range of approaches. The table below provides
              a clinical summary of each.
            </p>
          </section>
        </div>

        {/* Options table */}
        <div className="overflow-x-auto -mx-4 px-4 my-8">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Option</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">How It Works</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Suitable For</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Maintenance</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Typical Cost</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                {
                  option: 'Wigs',
                  how: 'Lift-on full head covering. Synthetic or human hair. Medical-grade versions have soft cap linings.',
                  suitable: 'Chemotherapy, alopecia totalis/universalis, any extensive loss',
                  maintenance: 'Wash and restyle every 1-2 weeks. Replace every 6-12 months.',
                  cost: '£60-£2,000+',
                },
                {
                  option: 'Hair Systems',
                  how: 'Custom piece bonded to scalp with adhesive/tape. Worn continuously. Natural hair or synthetic.',
                  suitable: 'Androgenetic, totalis, traction, scarring (stable)',
                  maintenance: 'Professional re-bonding every 4-6 weeks. New unit every 3-6 months.',
                  cost: '£200-£1,500 initial',
                },
                {
                  option: 'Toppers / Integration',
                  how: 'Partial piece clipped or integrated into existing hair. Covers crown, parting or specific thin areas.',
                  suitable: 'Alopecia areata (patches), early androgenetic, traction, diffuse thinning',
                  maintenance: 'Daily application and removal (clip-in) or salon maintenance every 4-8 weeks (integration).',
                  cost: '£100-£800',
                },
                {
                  option: 'Scalp Micropigmentation (SMP)',
                  how: 'Pigment deposited into the dermis with micro-needles. Creates appearance of hair follicles or density.',
                  suitable: 'Androgenetic, stable alopecia, scarring (if tissue holds pigment)',
                  maintenance: 'Touch-up every 3-5 years. Minimal ongoing care.',
                  cost: '£800-£3,500',
                },
                {
                  option: 'Cranial Prosthesis',
                  how: 'Medical-grade custom wig fitted to exact head measurements. Sometimes vacuum-fitted for security.',
                  suitable: 'Long-term total hair loss, burns/trauma',
                  maintenance: 'Fitted by specialist. Replace every 12-18 months.',
                  cost: '£1,500-£4,000+',
                },
              ].map((row, i) => (
                <tr key={row.option} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-3 font-medium text-foreground">{row.option}</td>
                  <td className="py-3 px-3">{row.how}</td>
                  <td className="py-3 px-3">{row.suitable}</td>
                  <td className="py-3 px-3">{row.maintenance}</td>
                  <td className="py-3 px-3">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">

          <section id="when-to-suggest">
            <h2>When to Suggest Non-Surgical Options</h2>
            <p>
              Non-surgical hair replacement isn't a treatment in the medical sense. It doesn't
              address the underlying condition. But for many patients, it addresses the thing they
              care about most: how they look and feel right now.
            </p>
            <p>
              Consider mentioning non-surgical options when:
            </p>
            <ul>
              <li><strong>Pharmaceutical options have plateaued or aren't suitable.</strong> Not every patient wants to take finasteride, and minoxidil doesn't work for everyone. For patients who've tried medical management without satisfactory results, non-surgical options offer a practical alternative.</li>
              <li><strong>The patient is about to start chemotherapy.</strong> Proactive wig fitting before treatment begins gives the stylist access to the patient's natural hair for colour and style matching. Many cancer nurse specialists already recommend this, but it's worth reinforcing.</li>
              <li><strong>The condition is stable but permanent.</strong> Scarring alopecia, long-standing totalis and advanced androgenetic alopecia with follicular miniaturisation are unlikely to respond to further medical treatment. Non-surgical coverage is often the most realistic path to the patient's desired outcome.</li>
              <li><strong>Hair loss is significantly affecting mental health.</strong> If a patient describes social withdrawal, avoidance behaviours or low mood linked to their hair loss, a practical solution alongside psychological support can be part of a broader management plan.</li>
              <li><strong>The patient asks.</strong> Sometimes patients just want to know what's out there. Having a few trusted resources to point them towards is more helpful than a vague "there are options available."</li>
            </ul>
          </section>

          <section id="when-to-refer">
            <h2>When to Refer to a Specialist</h2>
            <p>
              Before a patient explores cosmetic options, certain clinical situations warrant further
              investigation.
            </p>
            <ul>
              <li><strong>Sudden or rapid onset hair loss</strong> without an obvious cause (e.g. not chemotherapy-related). This may indicate alopecia areata, thyroid dysfunction, iron deficiency or other systemic conditions requiring investigation.</li>
              <li><strong>Signs of scarring alopecia.</strong> Scalp redness, scaling, pain or loss of follicular ostia suggest an inflammatory process that needs dermatological assessment and potential biopsy. Active scarring alopecia needs treatment to prevent further follicle destruction.</li>
              <li><strong>Hair loss in children or adolescents.</strong> Paediatric hair loss has a broader differential diagnosis and often benefits from specialist assessment. Trichotillomania, in particular, requires psychological rather than cosmetic intervention.</li>
              <li><strong>Hair loss accompanied by other systemic symptoms.</strong> Rash, joint pain, unexplained weight changes or fatigue alongside hair loss may point to autoimmune or endocrine conditions.</li>
            </ul>
            <p>
              Once the clinical picture is clear and stable, non-surgical options become
              appropriate alongside whatever medical management is in place.
            </p>
          </section>

          <section id="what-clinics-offer">
            <h2>What Directory Clinics Typically Offer</h2>
            <p>
              The clinics listed in our directory specialise in non-surgical hair replacement. Most
              offer a free initial consultation where the patient can discuss their situation, see
              samples and understand the costs involved.
            </p>
            <p>
              A typical first appointment lasts 30 to 60 minutes and covers:
            </p>
            <ul>
              <li>Assessment of the patient's hair loss pattern and extent</li>
              <li>Discussion of lifestyle requirements (swimming, exercise, work environment)</li>
              <li>Demonstration of relevant options with sample pieces</li>
              <li>Colour and style matching</li>
              <li>Explanation of ongoing maintenance schedule and costs</li>
            </ul>
            <p>
              Most clinics will not pressure a patient into booking immediately. The better providers
              encourage patients to take time to think and come back with questions.
            </p>
            <p>
              Our directory covers 424+ clinics across the UK. Patients can search by location,
              read Google reviews and filter by the specific services they're interested in.
            </p>
          </section>

          <section id="nhs-pathway">
            <h2>The NHS Wig Pathway</h2>
            <p>
              NHS wig provision remains an important route for patients, particularly those going
              through cancer treatment or living with long-term alopecia. The pathway differs
              across the four nations.
            </p>
          </section>
        </div>

        {/* NHS table */}
        <div className="overflow-x-auto -mx-4 px-4 my-8">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Nation</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Cost to Patient</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Referral Route</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Provision</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">England</td>
                <td className="py-3 px-3">£80.15 (synthetic), exemptions available</td>
                <td className="py-3 px-3">Dermatologist, oncologist or cancer nurse specialist</td>
                <td className="py-3 px-3">Typically 1 wig per 6 months</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-3 font-medium text-foreground">Scotland</td>
                <td className="py-3 px-3">Free</td>
                <td className="py-3 px-3">Consultant referral to orthotic department</td>
                <td className="py-3 px-3">Up to 4 synthetic or 1 human hair per year</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Wales</td>
                <td className="py-3 px-3">Free (voucher system)</td>
                <td className="py-3 px-3">Hospital referral provides voucher for approved supplier</td>
                <td className="py-3 px-3">Replacement every 6 months via voucher</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-3 font-medium text-foreground">Northern Ireland</td>
                <td className="py-3 px-3">Free</td>
                <td className="py-3 px-3">Oncology or dermatology team referral</td>
                <td className="py-3 px-3">Varies by health trust</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            NHS wigs are a starting point, but many patients find them limited in terms of choice
            and quality. Clinics in the directory can offer a wider range of styles, materials and
            custom fitting that the NHS pathway may not cover. The two options aren't mutually
            exclusive: some patients use an NHS wig as an everyday backup while investing in a
            custom system or topper for social occasions.
          </p>

          <section id="professional-bodies">
            <h2>Professional Bodies and Resources</h2>
            <p>
              The following organisations provide patient information, professional directories
              and clinical guidance relevant to hair loss management.
            </p>
          </section>
        </div>

        {/* Professional bodies cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              name: 'Institute of Trichologists',
              url: 'https://www.trichologists.org.uk',
              desc: 'UK\'s primary trichology body, accredited by the Professional Standards Authority. Maintains a register of qualified trichologists searchable by location.',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
            },
            {
              name: 'British Hair & Nail Society',
              url: 'https://bhns.org.uk',
              desc: 'Promotes education and research into hair and nail disorders. Provides patient information leaflets and a "Find a Specialist" tool for dermatologists.',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
            },
            {
              name: 'British Association of Dermatologists',
              url: 'https://www.bad.org.uk',
              desc: 'Professional body for UK dermatologists. Their Skin Health Info hub offers peer-reviewed patient information leaflets on alopecia and other hair conditions.',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
            },
            {
              name: 'British Skin Foundation',
              url: 'https://www.britishskinfoundation.org.uk',
              desc: 'Funds research into skin disease including conditions that cause hair loss. Shares patient stories and raises awareness of psychological impact.',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
            },
            {
              name: 'Trichological Society',
              url: 'https://www.trichological.org.uk',
              desc: 'Professional body for trichology practitioners. Provides educational resources and supports research into hair and scalp conditions.',
              colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
            },
            {
              name: 'Cancer Hair Care',
              url: 'https://www.cancerhaircare.co.uk',
              desc: 'Specialist charity offering free consultations and workshops for cancer patients experiencing hair loss. Maintains a directory of trained suppliers.',
              colour: 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20',
            },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${org.colour}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {org.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{org.desc}</p>
            </a>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            For a full list of UK charities and support organisations, see our{' '}
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
                Point Patients to the Directory
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Patients can search by location, read Google reviews and compare clinics
                offering the specific services they need. No sign-up required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
                >
                  Search Clinics
                  <Search className="h-4 w-4" />
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  Charities & Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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
            <li>The psychological consequences of androgenetic alopecia: a systematic review. J Cosmet Dermatol. 2023;22(1):89-95 <a href="https://pubmed.ncbi.nlm.nih.gov/36054087/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Do you know how to recommend a wig to your patient? J Cosmet Dermatol. 2021;20(3):735-742 <a href="https://doi.org/10.1111/jocd.13602" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk: wigs and fabric supports, eligibility and costs <a href="https://www.nhs.uk/nhs-services/help-with-health-costs/wigs-and-fabric-supports/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS Scotland: wig provision policy <a href="https://www.nhsinform.scot/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>British Association of Dermatologists: patient information on alopecia <a href="https://www.bad.org.uk/pils/alopecia-areata/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Institute of Trichologists: PSA-accredited register <a href="https://www.trichologists.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Professional Standards Authority: accredited registers <a href="https://www.professionalstandards.org.uk/check-practitioners/accredited-registers" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Support & Charities', href: '/support', icon: '💜' },
              { label: 'Cancer & Hair Loss', href: '/blog/hair-loss-after-cancer-treatment', icon: '🎗️' },
              { label: 'Alopecia Options Guide', href: '/blog/non-surgical-hair-replacement-alopecia', icon: '📖' },
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
