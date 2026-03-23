import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Search, HelpCircle,
  CheckCircle, BookOpen,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Non-Surgical Hair Replacement for Alopecia: Options Explained (UK)',
  description:
    'A guide to non-surgical solutions for alopecia areata, totalis, universalis and androgenetic alopecia. Covers hair systems, toppers, SMP, integration and what to expect at your first consultation.',
  alternates: {
    canonical: canonicalUrl('/blog/non-surgical-hair-replacement-alopecia'),
  },
  openGraph: {
    title: 'Non-Surgical Hair Replacement for Alopecia | Hair Restoration Guide',
    description:
      'Practical guide to non-surgical options for every type of alopecia in the UK.',
    url: canonicalUrl('/blog/non-surgical-hair-replacement-alopecia'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Will a hair system look natural with alopecia totalis?',
    answer:
      'Yes. A custom-fitted hair system is designed to cover the entire scalp and can look completely natural. Because the base is matched to your skin tone and the hair density is customised, even people who know you well may not realise you\'re wearing one. The key is choosing a provider with experience in medical hair loss. They\'ll understand the specific requirements when fitting to a scalp without any natural hair.',
  },
  {
    question: 'Can I swim or exercise with non-surgical hair replacement?',
    answer:
      'It depends on the type. Bonded hair systems (attached with adhesive or tape) stay in place during swimming, exercise and sleeping. Wigs and clip-in toppers should be removed before swimming but are generally fine during moderate exercise if properly secured. SMP has no restrictions once healed. If your lifestyle involves regular sports or swimming, a bonded system tends to be the most practical choice.',
  },
  {
    question: 'How much does a non-surgical hair system cost in the UK?',
    answer:
      'Initial fitting and system typically costs between £200 and £1,500, depending on hair quality, base type and customisation. Ongoing maintenance (re-bonding every 4 to 6 weeks) adds roughly £60 to £80 per session, and you\'ll need a replacement system every 3 to 6 months. Over a year, expect to spend between £1,000 and £3,200. Our directory lets you compare clinics and pricing in your area.',
  },
  {
    question: 'Is SMP a good option for alopecia areata?',
    answer:
      'It depends on the pattern of your alopecia. If you have stable, well-defined patches that haven\'t changed in over a year, SMP can camouflage those areas effectively by matching the pigment to surrounding hair follicles. But if your alopecia is still active and patches are appearing or expanding, SMP isn\'t usually recommended because new bald patches could appear in areas that haven\'t been treated.',
  },
  {
    question: 'What should I ask at a first consultation?',
    answer:
      'Good questions to ask include: how much experience do you have with alopecia clients? Can I see before-and-after examples of similar cases? What\'s the total ongoing cost, not just the initial fitting? How often will I need maintenance appointments? Can I try different options before committing? What happens if my alopecia changes? A reputable clinic will answer all of these openly.',
  },
  {
    question: 'Can I get a wig on the NHS for alopecia?',
    answer:
      'Yes. Alopecia is a recognised medical condition and your GP can refer you to a dermatologist who can prescribe a wig. In Scotland and Wales, NHS wigs are free. In England, there\'s a charge of £80.15 for synthetic wigs, though exemptions apply for people on certain benefits. For long-term alopecia, you may be eligible for regular replacements.',
  },
]

export default function AlopeciaOptionsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Non-Surgical Hair Replacement for Alopecia: Your Options Explained',
    description:
      'A practical guide to non-surgical solutions for every type of alopecia in the UK.',
    url: canonicalUrl('/blog/non-surgical-hair-replacement-alopecia'),
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
            { label: 'Non-Surgical Options for Alopecia' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Complete Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Non-Surgical Hair Replacement for Alopecia: Your Options Explained
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Whether you're dealing with alopecia areata, totalis, universalis or pattern hair loss,
            there are non-surgical options that can make a real difference. This guide explains
            which solutions suit which type and what to expect when you start exploring them.
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
              { id: 'types', label: 'Understanding Different Types of Alopecia' },
              { id: 'solutions', label: 'Matching Solutions to Your Type' },
              { id: 'hair-systems', label: 'Hair Systems' },
              { id: 'toppers', label: 'Hair Toppers & Integration' },
              { id: 'smp', label: 'Scalp Micropigmentation' },
              { id: 'wigs', label: 'Wigs' },
              { id: 'first-consultation', label: 'What to Expect at Your First Consultation' },
              { id: 'support', label: 'Charities & Support' },
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

          <section id="types">
            <h2>Understanding Different Types of Alopecia</h2>
            <p>
              Alopecia is a broad term covering several distinct conditions, and the right non-surgical
              solution depends heavily on which type you're dealing with, how much hair you've lost and
              whether the condition is still active.
            </p>
          </section>
        </div>

        {/* Alopecia type cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              title: 'Alopecia Areata',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              desc: 'Causes one or more coin-sized bald patches on the scalp. These patches can appear suddenly and may come and go over time. The hair follicles aren\'t destroyed, which means regrowth is possible. It affects about 1 in 50 people at some point in their lives.',
              coverage: 'Partial (patches)',
            },
            {
              title: 'Alopecia Totalis',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
              desc: 'A more advanced form where all hair on the scalp is lost. It can develop gradually from areata or occur rapidly. Some people experience cycles of loss and regrowth, while others experience permanent loss.',
              coverage: 'Complete scalp loss',
            },
            {
              title: 'Alopecia Universalis',
              colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
              desc: 'The most extensive form. All hair on the body is lost, including eyebrows, eyelashes and body hair. This is relatively rare and can be particularly challenging because it affects facial features.',
              coverage: 'Complete body hair loss',
            },
            {
              title: 'Androgenetic Alopecia',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              desc: 'Pattern hair loss caused by a combination of genetics and hormones (DHT). The most common form of hair loss, affecting roughly 50% of men by age 50 and a significant number of women. It\'s progressive but predictable.',
              coverage: 'Gradual thinning (crown and hairline)',
            },
            {
              title: 'Traction Alopecia',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              desc: 'Caused by repeated pulling on the hair from tight hairstyles (braids, ponytails, weaves). If caught early, changing styling habits can allow regrowth. If the follicles are damaged beyond repair, the loss becomes permanent.',
              coverage: 'Hairline and temples',
            },
            {
              title: 'Scarring (Cicatricial) Alopecia',
              colour: 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20',
              desc: 'A group of conditions where inflammation destroys hair follicles and replaces them with scar tissue. Unlike other forms, the damage is permanent. Early treatment focuses on stopping the inflammation from spreading.',
              coverage: 'Variable (often patches)',
            },
          ].map((card) => (
            <div key={card.title} className={`rounded-2xl border p-5 ${card.colour}`}>
              <h3 className="text-base font-semibold text-foreground mb-1">{card.title}</h3>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {card.coverage}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Matching solutions */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="solutions">
            <h2>Matching Solutions to Your Type</h2>
            <p>
              There's no single solution that works for every type of alopecia. Here's a realistic
              breakdown of what tends to work best for each.
            </p>
          </section>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 my-8">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Alopecia Type</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Hair System</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Topper</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">SMP</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Wig</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Integration</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { type: 'Areata (patches)', system: '✓', topper: '★', smp: '✓*', wig: '✓', integration: '★' },
                { type: 'Totalis (full scalp)', system: '★', topper: '✗', smp: '✓', wig: '★', integration: '✗' },
                { type: 'Universalis (full body)', system: '★', topper: '✗', smp: '✓', wig: '★', integration: '✗' },
                { type: 'Androgenetic (pattern)', system: '★', topper: '★', smp: '★', wig: '✓', integration: '✓' },
                { type: 'Traction', system: '✓', topper: '★', smp: '✓', wig: '✓', integration: '✓' },
                { type: 'Scarring', system: '✓', topper: '✓*', smp: '✓*', wig: '✓', integration: '✗' },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                  <td className="py-3 px-3 font-medium text-foreground">{row.type}</td>
                  <td className="py-3 px-3">{row.system}</td>
                  <td className="py-3 px-3">{row.topper}</td>
                  <td className="py-3 px-3">{row.smp}</td>
                  <td className="py-3 px-3">{row.wig}</td>
                  <td className="py-3 px-3">{row.integration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-muted-foreground mt-2">
            ★ = Often the best fit &nbsp; ✓ = Suitable &nbsp; ✓* = Suitable with conditions &nbsp; ✗ = Not suitable
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">

          <section id="hair-systems">
            <h2>Hair Systems</h2>
            <p>
              A hair system is a custom-made piece that bonds directly to your scalp with adhesive or tape.
              Unlike a wig, you wear it continuously for weeks at a time, sleeping, showering and exercising
              in it. The base is made from lace, polyurethane or a combination, and the hair (human or
              synthetic) is matched to your desired style and colour.
            </p>
            <p>
              For people with totalis or universalis, a hair system is often the go-to solution because it
              provides full, natural-looking coverage regardless of how much natural hair remains. For
              androgenetic alopecia, systems work well too, particularly at more advanced stages where
              there isn't enough coverage for a topper.
            </p>
            <p>
              The maintenance commitment is real. You'll need professional re-bonding every 4 to 6 weeks
              and a new unit every 3 to 6 months. But many people find the daily convenience outweighs
              the periodic upkeep.
            </p>
            <p>
              <Link href="/guides/hair-systems" className="text-primary hover:underline">
                Read our full hair systems guide →
              </Link>
            </p>
          </section>

          <section id="toppers">
            <h2>Hair Toppers & Integration Systems</h2>
            <p>
              Toppers clip into your existing hair and cover a specific area of thinning, usually the crown
              or parting. Integration systems work similarly but use a mesh base that your own hair is pulled
              through, blending with the added hair.
            </p>
            <p>
              These are ideal for alopecia areata (especially when patches are concentrated in one area),
              androgenetic alopecia at early to moderate stages and traction alopecia at the hairline.
              They require some existing hair to clip or integrate into, so they're not suitable for
              totalis or universalis.
            </p>
            <p>
              The advantage is a more lightweight, natural feel compared to a full wig or system. Many
              people wear toppers daily and remove them at night for comfort.
            </p>
            <p>
              <Link href="/guides/hair-toppers" className="text-primary hover:underline">
                Read our full topper guide →
              </Link>
            </p>
          </section>

          <section id="smp">
            <h2>Scalp Micropigmentation (SMP)</h2>
            <p>
              SMP deposits tiny dots of pigment into the scalp to replicate the look of hair follicles.
              The result resembles a closely buzzed head. For pattern hair loss and traction alopecia
              with stable, defined areas, it can be very effective.
            </p>
            <p>
              For alopecia areata, SMP is worth considering only if the condition has been stable for
              a sustained period (most practitioners suggest at least a year without new patches). If
              your alopecia is still active, new patches could appear in untreated areas and the overall
              look won't be consistent.
            </p>
            <p>
              With scarring alopecia, SMP is sometimes possible but depends on the extent and texture
              of the scar tissue. A specialist SMP clinic can assess whether your scalp will hold pigment
              effectively.
            </p>
            <p>
              <Link href="/guides/scalp-micropigmentation" className="text-primary hover:underline">
                Read our full SMP guide →
              </Link>
            </p>
          </section>

          <section id="wigs">
            <h2>Wigs</h2>
            <p>
              Wigs offer flexibility that other options don't. You can change your look, try different
              styles and take it off whenever you want. For people whose alopecia fluctuates (patches
              appearing and resolving), a wig avoids the commitment of a bonded system.
            </p>
            <p>
              Modern wigs are significantly better than they used to be. Lace front wigs create a natural
              hairline, monofilament caps allow multi-directional parting and lightweight constructions
              are comfortable even for all-day wear. Medical-grade wigs are designed specifically for
              sensitive scalps.
            </p>
            <p>
              NHS wigs are available for people with alopecia (free in Scotland and Wales, £80.15 in
              England with exemptions for people on benefits). Your GP refers you to a dermatologist
              who can prescribe one.
            </p>
            <p>
              <Link href="/guides/wigs" className="text-primary hover:underline">
                Read our full wig guide →
              </Link>
            </p>
          </section>

          <section id="first-consultation">
            <h2>What to Expect at Your First Consultation</h2>
            <p>
              Walking into a clinic for the first time can feel daunting. Knowing what to expect helps.
            </p>
            <p>
              A good clinic will start with a private conversation about your hair loss, your lifestyle
              and what you're hoping to achieve. They won't rush you. You should feel comfortable
              asking questions and exploring different options without any pressure to commit on the day.
            </p>
            <p>
              Things worth asking:
            </p>
            <ul>
              <li>How much experience do you have working with people who have alopecia?</li>
              <li>Can I see before-and-after photos of similar cases?</li>
              <li>What's the total cost including maintenance, not just the initial fitting?</li>
              <li>How often will I need to come back for appointments?</li>
              <li>What happens if my hair loss changes?</li>
              <li>Do you offer a trial or sample before I commit?</li>
            </ul>
            <p>
              Most initial consultations are free and last 30 to 60 minutes. Some clinics will let you
              try on samples or see demonstrations. Don't feel obliged to book anything on the spot.
            </p>
          </section>

          <section id="support">
            <h2>Charities & Support</h2>
            <p>
              Living with alopecia affects more than just how you look. These organisations offer free
              support, peer groups and practical advice.
            </p>
            <ul>
              <li>
                <a href="https://www.alopecia.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Alopecia UK
                </a>{' '}
                offers information on all types of alopecia, peer support groups (in person and online),
                a service directory and dedicated resources for men, women and children.
              </li>
              <li>
                <a href="https://www.alopecia-awareness.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Alopecia Awareness
                </a>{' '}
                runs support groups across the UK for people experiencing alopecia.
              </li>
              <li>
                <a href="https://bhns.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  British Hair & Nail Society
                </a>{' '}
                provides patient information leaflets and a specialist finder for hair and scalp conditions.
              </li>
              <li>
                <a href="https://www.trichologists.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Institute of Trichologists
                </a>{' '}
                maintains a register of qualified trichologists who specialise in hair and scalp disorders.
              </li>
            </ul>
            <p>
              For a full list, see our{' '}
              <Link href="/support" className="text-primary hover:underline">
                charities and support page
              </Link>.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Search className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find a Clinic That Specialises in Alopecia
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics offering hair systems, toppers, wigs and SMP. Compare
                Google reviews and book a free consultation.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Search Clinics Near You
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
            <li>NHS.uk — Alopecia areata overview and treatment options <a href="https://www.nhs.uk/conditions/alopecia/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Alopecia UK — Types of alopecia and support resources <a href="https://www.alopecia.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>British Association of Dermatologists — Patient information on alopecia areata <a href="https://www.bad.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk — Wigs and fabric supports: eligibility and costs <a href="https://www.nhs.uk/nhs-services/help-with-health-costs/wigs-and-fabric-supports/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Institute of Trichologists — Trichology and hair loss conditions <a href="https://www.trichologists.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Support & Charities', href: '/support', icon: '💜' },
              { label: 'Hair Systems Guide', href: '/guides/hair-systems', icon: '✂️' },
              { label: 'All Treatments Compared', href: '/blog/hair-loss-treatments-compared', icon: '⚖️' },
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
