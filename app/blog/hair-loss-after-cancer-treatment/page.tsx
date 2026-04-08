import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Search, Heart, Clock, HelpCircle,
  CheckCircle, Ribbon, BookOpen,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Hair Loss After Cancer Treatment: Non-Surgical Options & Support (UK)',
  description:
    'A practical guide to hair loss during and after cancer treatment. Covers chemotherapy timelines, NHS wig referrals, non-surgical options and UK support charities.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-loss-after-cancer-treatment'),
  },
  openGraph: {
    title: 'Hair Loss After Cancer Treatment | Hair Restoration Guide',
    description:
      'Practical guide to non-surgical hair options during and after cancer treatment in the UK.',
    url: canonicalUrl('/blog/hair-loss-after-cancer-treatment'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'Will my hair definitely fall out during chemotherapy?',
    answer:
      'Not necessarily. Hair loss depends on the type of chemotherapy drugs used, the dosage and your individual response. Some drugs cause significant thinning rather than complete loss, while others (particularly taxanes and anthracyclines) are more likely to cause total hair loss. Your oncology team can tell you what to expect based on your specific treatment plan.',
  },
  {
    question: 'How long after chemo does hair start growing back?',
    answer:
      'Most people notice soft regrowth starting within a few weeks to three months after their final chemotherapy session. A full covering of hair typically returns within three to six months, though it may be thinner or a different texture at first. If your hair hasn\'t started growing back six months after finishing treatment, speak to your GP or oncology team.',
  },
  {
    question: 'Can I get a free wig on the NHS?',
    answer:
      'In Scotland and Wales, NHS wigs are provided free of charge. In England, there\'s a standard charge of £80.15 for a synthetic wig, though you may be exempt if you receive certain benefits, are under 16, or are 16 to 18 in full-time education. Your cancer nurse can arrange a referral to an NHS wig supplier.',
  },
  {
    question: 'What\'s the difference between a wig and a hair system?',
    answer:
      'A wig sits on top of your head and can be removed easily. A hair system is bonded to the scalp with adhesive or tape and is worn continuously for several weeks at a time. Hair systems tend to look more natural because they\'re custom-fitted, but they require professional maintenance every 4 to 6 weeks. Both are good options during and after treatment.',
  },
  {
    question: 'Is scalp micropigmentation suitable during cancer treatment?',
    answer:
      'SMP is generally not recommended during active cancer treatment because the immune system is often compromised, which affects healing. It can be a good option once treatment has finished and your medical team confirms your immune system has recovered. SMP works particularly well for adding the appearance of density once hair begins to grow back.',
  },
  {
    question: 'Will scalp cooling prevent all hair loss?',
    answer:
      'Scalp cooling (cold cap therapy) can reduce hair loss for some patients, but it doesn\'t work for everyone and results vary. It tends to be most effective with certain types of chemotherapy. Your oncology team can advise whether scalp cooling is suitable for your treatment plan. Even with scalp cooling, some thinning is common.',
  },
  {
    question: 'Where can I get emotional support for cancer-related hair loss?',
    answer:
      'Several UK charities offer dedicated support. Cancer Hair Care provides free consultations and workshops. Macmillan offers a helpline (0808 808 00 00) and online community. My New Hair connects you with trained hairdressers who specialise in medical hair loss. Your hospital\'s cancer support team can also refer you to local services.',
  },
]

export default function CancerHairLossPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hair Loss After Cancer Treatment: Non-Surgical Options & Support',
    description:
      'A practical guide to hair loss during and after cancer treatment in the UK.',
    url: canonicalUrl('/blog/hair-loss-after-cancer-treatment'),
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
            { label: 'Hair Loss After Cancer Treatment' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Ribbon className="h-3 w-3" /> Cancer Support Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Hair Loss After Cancer Treatment: Your Options and Where to Find Support
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Losing your hair during cancer treatment can feel like losing a part of who you are.
            This guide covers what to expect, the non-surgical options available to you
            and the UK charities that can help.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 12 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'what-happens', label: 'What Happens to Your Hair During Treatment' },
              { id: 'regrowth', label: 'When Hair Grows Back' },
              { id: 'options', label: 'Non-Surgical Options Explained' },
              { id: 'nhs-wigs', label: 'NHS Wig Referrals: How They Work' },
              { id: 'scalp-cooling', label: 'Scalp Cooling' },
              { id: 'finding-provider', label: 'Finding a Provider' },
              { id: 'support', label: 'Charities & Support Organisations' },
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

          {/* Section 1 */}
          <section id="what-happens">
            <h2>What Happens to Your Hair During Treatment</h2>
            <p>
              Not all cancer treatments cause hair loss. It depends on the type of drugs, the dose and your body's
              response. Chemotherapy is the most common cause, but radiotherapy to the head and some hormonal
              therapies can also affect your hair.
            </p>
            <p>
              If your treatment does cause hair loss, you'll typically notice it starting two to three weeks after
              your first session. It might come out gradually (more hair on your pillow, in the shower, in your
              brush) or it can happen quite quickly over a day or two. Your scalp may feel tender or tingly around
              the time the hair begins to thin.
            </p>
            <p>
              Hair loss from chemotherapy isn't limited to your head. Eyebrows, eyelashes, body hair and facial hair
              can all be affected, though the extent varies widely from person to person.
            </p>
            <p>
              A common concern is whether the hair will come back. For most people, it does. But during those weeks
              and months of treatment, having practical options makes a real difference to how you feel.
            </p>
          </section>

          {/* Section 2 */}
          <section id="regrowth">
            <h2>When Hair Grows Back</h2>
            <p>
              For most people, hair starts to regrow within a few weeks to three months after finishing
              chemotherapy. Some people notice soft fuzz appearing even before their treatment ends.
            </p>
            <p>
              The regrowth process is gradual. You'll likely have a visible covering of hair within three
              to six months, though it may be patchy at first, especially around the hairline and crown.
              Full thickness and length take longer. Most people feel comfortable without a wig or head
              covering somewhere between six and twelve months after treatment.
            </p>
            <p>
              The hair that grows back may look and feel different. It's common for the texture to change:
              previously straight hair might come back curly (sometimes called "chemo curls"), or the colour
              may be slightly different. These changes are usually temporary and settle over the first year
              or so, though occasionally they're permanent.
            </p>
            <p>
              In rare cases, particularly with very high doses of certain drugs, hair may not grow back
              fully. If your hair hasn't started to return six months after finishing treatment, it's
              worth speaking to your GP or oncology team.
            </p>
          </section>

          {/* Section 3 */}
          <section id="options">
            <h2>Non-Surgical Options Explained</h2>
            <p>
              There are several non-surgical options available during and after treatment. The right choice
              depends on the extent of your hair loss, your lifestyle and how you want to feel when you
              look in the mirror.
            </p>
          </section>
        </div>

        {/* Options cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              title: 'Wigs',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
              points: [
                'Available in synthetic (from £60) or human hair (from £150 upwards)',
                'Full head coverage; easy to put on and remove',
                'NHS referral available (free in Scotland and Wales)',
                'Synthetic wigs keep their style after washing',
                'Medical-grade wigs have soft linings for sensitive scalps',
              ],
              best: 'The most popular choice during treatment. Offers flexibility and a wide range of styles without commitment.',
              link: '/guides/wigs',
            },
            {
              title: 'Hair Toppers',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              points: [
                'Covers specific areas of thinning rather than the whole head',
                'Clips into existing hair for a natural blend',
                'Monofilament bases let you part the hair in any direction',
                'Available in synthetic or human hair',
                'Less coverage than a full wig but more natural for partial loss',
              ],
              best: 'Ideal if you\'re experiencing thinning rather than complete loss, especially during hormonal treatments.',
              link: '/guides/hair-toppers',
            },
            {
              title: 'Hair Systems',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              points: [
                'Custom-made to match your natural hair',
                'Bonded to the scalp with adhesive; worn continuously',
                'Professional maintenance every 4 to 6 weeks',
                'Very natural-looking when properly fitted',
                'Works for any extent of hair loss',
              ],
              best: 'A good long-term option once treatment is complete and you\'re looking for something more permanent than a lift-on wig.',
              link: '/guides/hair-systems',
            },
            {
              title: 'Scalp Micropigmentation (SMP)',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              points: [
                'Creates the appearance of closely-shaved hair follicles',
                'Particularly effective for adding visual density',
                'Can camouflage patchy regrowth or thin areas',
                'Low maintenance once completed',
                'Best suited for after treatment has finished',
              ],
              best: 'Works well once hair has started growing back, especially for creating the illusion of fuller density between regrowing hairs.',
              link: '/guides/scalp-micropigmentation',
            },
          ].map((card) => (
            <div key={card.title} className={`rounded-2xl border p-5 ${card.colour}`}>
              <h3 className="text-base font-semibold text-foreground mb-3">{card.title}</h3>
              <div className="space-y-1.5 mb-3">
                {card.points.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-muted-foreground">{p}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <strong>Best for:</strong> {card.best}
              </p>
              <Link
                href={card.link}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Read our full guide <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">

          {/* Section 4 */}
          <section id="nhs-wigs">
            <h2>NHS Wig Referrals: How They Work</h2>
            <p>
              If you're going through cancer treatment, you can get a wig through the NHS. The process
              and cost differ depending on where you live.
            </p>
          </section>
        </div>

        {/* NHS table */}
        <div className="overflow-x-auto -mx-4 px-4 my-8">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Country</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Cost</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">How to Get One</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Replacement</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">England</td>
                <td className="py-3 px-3">£80.15 (synthetic), free if on certain benefits or under 16</td>
                <td className="py-3 px-3">Cancer nurse refers you to an NHS wig supplier</td>
                <td className="py-3 px-3">Typically every 6 months</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-3 font-medium text-foreground">Scotland</td>
                <td className="py-3 px-3">Free</td>
                <td className="py-3 px-3">Consultant refers to the orthotic department</td>
                <td className="py-3 px-3">Up to 4 synthetic or 1 human hair wig per year</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Wales</td>
                <td className="py-3 px-3">Free (via voucher)</td>
                <td className="py-3 px-3">Hospital appointment provides a voucher for an approved supplier</td>
                <td className="py-3 px-3">Replacement every 6 months via voucher</td>
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <td className="py-3 px-3 font-medium text-foreground">Northern Ireland</td>
                <td className="py-3 px-3">Free</td>
                <td className="py-3 px-3">Referral through your oncology or dermatology team</td>
                <td className="py-3 px-3">Varies by health trust</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            If you're in England and think you might be eligible for a free wig, ask your cancer nurse
            or check the{' '}
            <a href="https://www.nhsbsa.nhs.uk/exemption-certificates/nhs-help-health-costs" target="_blank" rel="noopener noreferrer">
              NHS help with health costs
            </a>{' '}
            guidance. If you've already paid and later discover you were eligible, you can claim a
            refund using form HC5(W) within three months.
          </p>
          <p>
            Beyond NHS wigs, several charities offer additional financial help. Macmillan Cancer Support
            provides one-off grants that can go towards the cost of a wig, and the Little Princess Trust
            supplies free real-hair wigs to children and young people up to 24.
          </p>

          {/* Section 5 */}
          <section id="scalp-cooling">
            <h2>Scalp Cooling</h2>
            <p>
              Scalp cooling (sometimes called cold cap therapy) is available at many NHS chemotherapy
              units. It works by cooling the scalp before, during and after each infusion, which reduces
              blood flow to the hair follicles and can limit the amount of chemotherapy drug that reaches
              them.
            </p>
            <p>
              It doesn't work for everyone, and results vary depending on the drugs used. Some people
              keep most of their hair; others experience significant thinning despite cooling. Your
              oncology team can tell you whether scalp cooling is compatible with your treatment plan.
            </p>
            <p>
              Scalp cooling doesn't remove the need for non-surgical options entirely. Even with
              successful cooling, some thinning is common, which means a topper or lighter coverage
              option may still be helpful for confidence.
            </p>
          </section>

          {/* Section 6 */}
          <section id="finding-provider">
            <h2>Finding a Provider</h2>
            <p>
              When choosing a clinic or provider for non-surgical hair replacement during or after
              treatment, a few things are worth looking for:
            </p>
            <ul>
              <li><strong>Experience with medical hair loss.</strong> Some clinics specialise in working with cancer patients and understand the sensitivity involved. Look for clinics that mention medical hair loss or chemotherapy on their profile.</li>
              <li><strong>Private consultation room.</strong> Trying on wigs or being measured for a hair system can feel vulnerable. A private space makes the experience more comfortable.</li>
              <li><strong>Patience and empathy.</strong> A good provider will let you take your time, try different options and won't pressure you into a decision.</li>
              <li><strong>NHS wig supplier status.</strong> If you want to use your NHS referral, check that the provider is an approved NHS wig supplier.</li>
            </ul>
          </section>
        </div>

        {/* CTA to directory */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Search className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Find a Clinic Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics that offer wigs, hair systems and other non-surgical
                options. Compare Google reviews and book a free consultation.
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
                  href="/guides/wigs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/25 transition-all active:scale-[0.98]"
                >
                  Read Our Wig Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <section id="support">
            <h2>Charities & Support Organisations</h2>
            <p>
              You don't have to work things out on your own. These UK organisations offer free
              advice, emotional support and practical help for people dealing with cancer-related
              hair loss.
            </p>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              name: 'Cancer Hair Care',
              url: 'https://www.cancerhaircare.co.uk',
              desc: 'Free consultations, workshops and hair care packs. 24/7 support via phone and video. The UK\'s leading charity for cancer-related hair loss.',
            },
            {
              name: 'Macmillan Cancer Support',
              url: 'https://www.macmillan.org.uk',
              desc: 'Comprehensive support including a free helpline (0808 808 00 00), grants for wig costs and an online community of people going through treatment.',
            },
            {
              name: 'My New Hair',
              url: 'https://www.mynewhair.org',
              desc: 'Network of trained hairdressers who specialise in wig cutting and styling for cancer patients. Use their salon finder to find one near you.',
            },
            {
              name: 'Hair Reborn',
              url: 'https://www.hairreborn.uk',
              desc: 'Free haircare support and complimentary salon appointments (up to 3 visits) during chemotherapy, delivered through a UK-wide network of volunteer salons.',
            },
            {
              name: 'Little Princess Trust',
              url: 'https://www.littleprincesses.org.uk',
              desc: 'Free real-hair wigs for children and young people up to 24. Also accepts hair donations and funds childhood cancer research.',
            },
            {
              name: 'Look Good Feel Better',
              url: 'https://www.lookgoodfeelbetter.co.uk',
              desc: 'Free confidence-boosting workshops including sessions on hair loss and scalp care. Available in person and online.',
            },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {org.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{org.desc}</p>
            </a>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            For a full list of charities and professional bodies, see our{' '}
            <Link href="/support" className="text-primary hover:underline">
              support and charities page
            </Link>.
          </p>
        </div>

        {/* ═══ FAQs ═══ */}
        <section id="faqs" className="mb-12 scroll-mt-20 mt-12">
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

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">NHS & Government</h3>
          <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>NHS.uk — Hair loss information and treatments <a href="https://www.nhs.uk/conditions/hair-loss/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk — Wigs and fabric supports: eligibility and costs <a href="https://www.nhs.uk/nhs-services/help-with-health-costs/wigs-and-fabric-supports/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS Wales — Wig provision and voucher process <a href="https://www.nhs.wales" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS Scotland — Wig referral pathway for oncology and dermatology patients <a href="https://www.scot.nhs.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>

          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mt-4 mb-2">Cancer Charities</h3>
          <ol start={5} className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>Cancer Research UK — Hair loss during and after chemotherapy <a href="https://www.cancerresearchuk.org/about-cancer/coping/physically/hair-loss" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Macmillan Cancer Support — Coping with hair loss <a href="https://www.macmillan.org.uk/cancer-information/coping/hair-loss" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Cancer Hair Care — Wig suppliers and support services <a href="https://www.cancerhaircare.co.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Breast Cancer Now — Timeline and regrowth expectations <a href="https://www.breastcancernow.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
          </ol>
        </section>

        {/* ═══ Related ═══ */}
        <section className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Related Reading</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Support & Charities', href: '/support', icon: '💜' },
              { label: 'Full Wig Guide', href: '/guides/wigs', icon: '👩' },
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
