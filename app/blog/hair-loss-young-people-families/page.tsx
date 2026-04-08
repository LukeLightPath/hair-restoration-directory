import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, Search, HelpCircle,
  CheckCircle, Heart, Users,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'Hair Loss in Children and Young People: Support and Options (UK)',
  description:
    'How hair loss affects children and teenagers, what non-surgical options are available for young people, and where families can find support in the UK.',
  alternates: {
    canonical: canonicalUrl('/blog/hair-loss-young-people-families'),
  },
  openGraph: {
    title: 'Hair Loss Support for Young People & Families | Hair Restoration Guide',
    description:
      'Guide to hair loss in children and teenagers, covering options and UK family support.',
    url: canonicalUrl('/blog/hair-loss-young-people-families'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'At what age can a child have a hair system fitted?',
    answer:
      'There\'s no fixed minimum age. Lightweight wigs and toppers can be worn by children as young as three or four, depending on comfort and willingness. Bonded hair systems (attached with adhesive) are more commonly introduced from around age eight onwards, when the child is old enough to manage the maintenance and understand the process. Some specialist clinics, such as those working with the Little Princess Trust, have specific experience fitting young children and can advise based on the individual case.',
  },
  {
    question: 'Can children get wigs on the NHS?',
    answer:
      'Yes. Children under 16 are exempt from NHS wig charges in England, meaning they receive wigs free of charge. In Scotland, Wales and Northern Ireland, NHS wigs are free for all ages. The referral usually comes through a paediatric dermatologist, oncologist or specialist nurse. Children are typically entitled to more frequent replacements than adults because of growth.',
  },
  {
    question: 'Is scalp micropigmentation suitable for teenagers?',
    answer:
      'SMP is generally recommended only for older teenagers (16+) and usually only once hair loss has stabilised. Most reputable SMP clinics will require parental consent for anyone under 18. If the hair loss is still progressing (as with active alopecia areata), SMP isn\'t usually advisable because new patches could appear in untreated areas. A specialist can assess whether the timing is right.',
  },
  {
    question: 'How do I explain hair loss to my child?',
    answer:
      'Keep it honest and age-appropriate. Younger children respond well to simple, factual language: "Your body is doing something different with your hair right now." Avoid suggesting it\'s something wrong with them. Older children and teenagers will want more detail and may benefit from speaking to other young people who\'ve been through the same thing. Alopecia UK runs a children and young people\'s group, and the Little Princess Trust has resources specifically for young people.',
  },
  {
    question: 'Will school accommodate a child wearing a wig or hair system?',
    answer:
      'Most schools are supportive once they understand the situation. It\'s worth speaking to the school in advance, ideally with a letter from the child\'s dermatologist or GP explaining the condition. Key points to cover: the child wears a wig/system for a medical reason, it should be treated the same as glasses or hearing aids, and PE considerations (clip-in pieces may need to be removed for contact sports; bonded systems generally stay on). Many schools are experienced with this already.',
  },
  {
    question: 'Where can I find emotional support for my child?',
    answer:
      'Alopecia UK runs a dedicated children and young people\'s support group for families. The Little Princess Trust provides free wigs and has resources for young people facing hair loss. Contact (for families with disabled children) offers information and support for parents whose children have medical conditions including alopecia. For teenagers going through cancer treatment, Teenage Cancer Trust provides age-specific support including peer groups.',
  },
]

export default function YoungPeopleFamiliesPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hair Loss in Children and Young People: Support and Options',
    description:
      'How hair loss affects children and teenagers, and what families can do about it.',
    url: canonicalUrl('/blog/hair-loss-young-people-families'),
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
            { label: 'Hair Loss in Young People & Families' },
          ]}
        />

        {/* ═══ Hero ═══ */}
        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Users className="h-3 w-3" /> Family Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Hair Loss in Children and Young People: What Families Need to Know
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Hair loss in a child or teenager can feel overwhelming for the whole family.
            This guide covers why it happens, what options are available for young people
            and where to find support in the UK.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Updated March 2026 &middot; 9 min read
          </p>
        </header>

        {/* ═══ Table of Contents ═══ */}
        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'how-it-affects', label: 'How Hair Loss Affects Young People' },
              { id: 'common-causes', label: 'Common Causes in Children and Teenagers' },
              { id: 'options', label: 'Options for Young People' },
              { id: 'choosing-clinic', label: 'What to Look for in a Clinic' },
              { id: 'school', label: 'School and Social Life' },
              { id: 'support', label: 'Charities and Support Organisations' },
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

          <section id="how-it-affects">
            <h2>How Hair Loss Affects Young People</h2>
            <p>
              For adults, hair loss is tough. For children and teenagers, it can be especially
              difficult because it happens during the years when fitting in matters most. School,
              friendships and self-image are all wrapped up in appearance, and losing hair at an
              age when nobody else around you has can shake a young person's confidence in ways
              that aren't always obvious.
            </p>
            <p>
              Some children deal with it openly and adapt quickly. Others withdraw, avoid social
              situations or become anxious about PE, swimming or sleepovers where their hair loss
              might be visible. There's no single right way to respond, and every child handles
              it differently.
            </p>
            <p>
              What research consistently shows is that practical solutions (having a wig, a
              system or even just a plan) reduce anxiety significantly. The child feels more in
              control, and parents feel less helpless. That doesn't mean everyone needs a wig.
              Some children prefer headscarves, hats or simply going without. But knowing the
              options exist, and that the choice is theirs, makes a real difference.
            </p>
          </section>

          <section id="common-causes">
            <h2>Common Causes in Children and Teenagers</h2>
            <p>
              Hair loss in young people has a different set of causes compared to adults.
              The most common include:
            </p>
          </section>
        </div>

        {/* Causes cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              title: 'Alopecia Areata',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              desc: 'The most common cause of hair loss in children. Affects around 1 in 50 people at some point, with many cases first appearing in childhood. Causes one or more round bald patches. Some children experience regrowth within months; for others, patches persist or spread.',
            },
            {
              title: 'Cancer Treatment',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
              desc: 'Chemotherapy is a common cause of temporary hair loss in young people undergoing cancer treatment. Hair typically begins to grow back within a few months of finishing treatment, though it may come back with a different texture initially.',
            },
            {
              title: 'Trichotillomania',
              colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
              desc: 'A condition where a person repeatedly pulls out their own hair, often without realising it. More common in teenagers than younger children. Requires psychological support rather than cosmetic intervention, though a covering solution can help while treatment is ongoing.',
            },
            {
              title: 'Tinea Capitis (Scalp Ringworm)',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              desc: 'A fungal infection of the scalp that causes patchy hair loss. Common in primary school-age children. Treatable with antifungal medication. Hair typically regrows fully once the infection clears.',
            },
            {
              title: 'Alopecia Totalis / Universalis',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              desc: 'Complete loss of hair on the scalp (totalis) or the entire body (universalis). Less common than areata but can occur in children. Long-term management usually involves wigs or hair systems.',
            },
            {
              title: 'Traction Alopecia',
              colour: 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/20',
              desc: 'Caused by tight hairstyles (braids, ponytails, weaves) that pull on the hair over time. More common in teenagers. If caught early, changing styling habits allows regrowth. If follicles are damaged, the loss can become permanent.',
            },
          ].map((card) => (
            <div key={card.title} className={`rounded-2xl border p-5 ${card.colour}`}>
              <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20">
          <p>
            If your child is losing hair and you're not sure why, a GP appointment is the first
            step. They can check for common causes and refer to a paediatric dermatologist if needed.
          </p>

          <section id="options">
            <h2>Options for Young People</h2>
            <p>
              The right option depends on the child's age, the extent of hair loss and, most
              importantly, what the young person themselves feels comfortable with.
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
                'Available in lightweight designs suitable for children',
                'Free on the NHS for under-16s in England; free for all ages in Scotland, Wales and NI',
                'Little Princess Trust provides free real-hair wigs for under-24s',
                'Easy to put on and remove, giving the child control',
                'Wide range of styles, colours and lengths available',
              ],
              best: 'The most common choice for children. Low commitment, easy to manage and the child can choose when to wear it.',
              link: '/guides/wigs',
            },
            {
              title: 'Hair Toppers',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
              points: [
                'Clips into existing hair to cover patches or thinning areas',
                'More natural look than a full wig for partial hair loss',
                'Lightweight and comfortable for all-day wear',
                'Can be removed easily by the child or parent',
                'Good for alopecia areata where some hair remains',
              ],
              best: 'Works well for older children and teenagers with partial hair loss who want something less noticeable than a wig.',
              link: '/guides/hair-toppers',
            },
            {
              title: 'Hair Systems',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
              points: [
                'Custom-made to match natural hair colour and style',
                'Bonded to the scalp so it stays on through all activities',
                'Suitable for older children (typically 8+) with extensive loss',
                'Requires professional maintenance every 4-6 weeks',
                'Very natural-looking when properly fitted',
              ],
              best: 'A good option for older children with totalis or extensive areata who want something they don\'t have to think about daily.',
              link: '/guides/hair-systems',
            },
            {
              title: 'SMP (Older Teens)',
              colour: 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20',
              points: [
                'Creates appearance of closely buzzed hair follicles',
                'Generally recommended for 16+ only',
                'Requires parental consent for under-18s',
                'Best suited for stable, non-progressing hair loss',
                'Low maintenance once completed',
              ],
              best: 'May suit older teenage boys who prefer the shaved/buzzed look. Not appropriate for younger children or active alopecia.',
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

          <section id="choosing-clinic">
            <h2>What to Look for in a Clinic</h2>
            <p>
              Finding the right clinic for a child is different from finding one for an adult.
              Sensitivity, patience and experience with young people matter more than anything else.
            </p>
            <p>
              When looking for a provider, consider:
            </p>
            <ul>
              <li><strong>Experience with young clients.</strong> Ask specifically whether they've worked with children or teenagers before. Some clinics specialise in paediatric hair loss and will be much better equipped to handle the appointment in a way that's comfortable for a young person.</li>
              <li><strong>A private consultation room.</strong> This isn't optional for young people. Trying on wigs or being measured for a system is personal, and a child or teenager needs to feel safe and private during the process.</li>
              <li><strong>Willingness to go at the child's pace.</strong> A good provider won't rush. They'll let the child look at options, ask questions and take breaks if needed. Some children may need more than one visit before they're ready to commit.</li>
              <li><strong>Transparent pricing.</strong> Ask about the full cost upfront, including maintenance. If the provider is evasive about pricing, that's a red flag.</li>
              <li><strong>NHS wig supplier status.</strong> If you're planning to use an NHS referral, check that the clinic is an approved supplier.</li>
            </ul>
          </section>

          <section id="school">
            <h2>School and Social Life</h2>
            <p>
              One of the first questions parents ask is how school will handle it. In most cases,
              schools are supportive once they understand the situation.
            </p>
            <p>
              A few practical steps that help:
            </p>
            <ul>
              <li><strong>Speak to the school early.</strong> A brief conversation with the head teacher or class teacher, ideally supported by a letter from the child's GP or dermatologist, sets the right tone from the start.</li>
              <li><strong>Frame it like any other medical need.</strong> A wig or hair system is no different from glasses or a hearing aid. Most schools already have policies for medical equipment and will treat it as such.</li>
              <li><strong>PE and sport considerations.</strong> Clip-on wigs and toppers may need to be removed for contact sports. Bonded systems usually stay on during all activities. Discuss this with the school's PE department so everyone's on the same page.</li>
              <li><strong>Let the child lead.</strong> Some children want to tell their friends. Others prefer to keep it private. Both approaches are fine. Ask the child what they're comfortable with and respect their decision.</li>
            </ul>
            <p>
              Bullying is a worry for many parents. If the school knows about the situation early,
              they can be proactive rather than reactive. Most children find that their peers are
              more accepting than they expected, especially when the child is confident and matter-of-fact
              about it.
            </p>
          </section>

          <section id="support">
            <h2>Charities and Support Organisations</h2>
            <p>
              These organisations offer free support for young people and families dealing with
              hair loss in the UK.
            </p>
          </section>
        </div>

        {/* Charity cards */}
        <div className="grid gap-4 sm:grid-cols-2 my-8">
          {[
            {
              name: 'Little Princess Trust',
              url: 'https://www.littleprincesses.org.uk',
              desc: 'Provides free real-hair wigs to children and young people up to 24 who have lost their hair due to cancer treatment or other conditions. Also funds childhood cancer research.',
              colour: 'border-rose-200 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/20',
            },
            {
              name: 'Alopecia UK',
              url: 'https://www.alopecia.org.uk',
              desc: 'Runs a children and young people\'s support group for families affected by alopecia. Provides age-appropriate resources, peer support and information for parents.',
              colour: 'border-sky-200 bg-sky-50/50 dark:border-sky-800 dark:bg-sky-950/20',
            },
            {
              name: 'Teenage Cancer Trust',
              url: 'https://www.teenagecancertrust.org',
              desc: 'Specialist support for teenagers and young adults going through cancer, including dedicated units in NHS hospitals, peer support groups and information about side effects like hair loss.',
              colour: 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20',
            },
            {
              name: 'Contact',
              url: 'https://www.contact.org.uk',
              desc: 'Information, advice and support for families whose children have a disability or medical condition, including alopecia. Offers a free helpline and local support groups.',
              colour: 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20',
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
                <Heart className="h-4 w-4 text-rose-500 dark:text-rose-400" />
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
            For a complete list of UK charities, professional bodies and support services, see our{' '}
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
                Find a Clinic Near You
              </h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">
                Browse UK clinics that offer wigs, hair systems and other options for young
                people. Compare reviews and find one that specialises in paediatric hair loss.
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
            <li>NHS.uk: alopecia areata in children <a href="https://www.nhs.uk/conditions/alopecia/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Alopecia UK: children and young people <a href="https://www.alopecia.org.uk/children-and-young-people" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>Little Princess Trust: wig provision for children and young people <a href="https://www.littleprincesses.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>NHS.uk: wigs and fabric supports, exemptions for under-16s <a href="https://www.nhs.uk/nhs-services/help-with-health-costs/wigs-and-fabric-supports/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
            <li>British Association of Dermatologists: alopecia areata patient information <a href="https://www.bad.org.uk/pils/alopecia-areata/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">↗</a></li>
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
