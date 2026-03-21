import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Puzzle, CheckCircle, Clock, HelpCircle, MapPin } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

export const metadata: Metadata = {
  title: 'What Is a Hair Transplant? FUE, FUT & What to Expect | Complete Guide',
  description:
    'A complete guide to hair transplants in the UK. Learn about FUE and FUT methods, recovery timelines, costs, who is suitable and how to choose the right surgeon.',
  alternates: { canonical: canonicalUrl('/guides/hair-transplant') },
  openGraph: {
    title: 'What Is a Hair Transplant? FUE, FUT & What to Expect | Hair Restoration Guide',
    description: 'Everything you need to know about hair transplants: FUE vs FUT, recovery, costs and choosing a surgeon.',
    url: canonicalUrl('/guides/hair-transplant'),
    type: 'article',
  },
}

const FAQS = [
  {
    question: 'How much does a hair transplant cost in the UK?',
    answer: 'UK prices typically range from £3,000 to £15,000 depending on the number of grafts. Most clinics charge per graft (£2 to £5 each). A typical session for moderate hair loss uses 2,000 to 3,000 grafts. Some clinics offer fixed package pricing.',
  },
  {
    question: 'Is a hair transplant permanent?',
    answer: 'The transplanted hair is permanent because it comes from the donor area (back and sides of the head), which is genetically resistant to DHT. However, your non-transplanted hair can still thin over time, which is why many surgeons recommend finasteride or minoxidil alongside the transplant.',
  },
  {
    question: 'How long until I see the final result?',
    answer: 'Transplanted hairs fall out within 2 to 4 weeks (this is normal and expected). New growth starts around month 3 to 4. By month 8, you\'ll see significant coverage. The final result is visible at 12 to 18 months.',
  },
  {
    question: 'Does a hair transplant hurt?',
    answer: 'The procedure is done under local anaesthetic, so you shouldn\'t feel pain during the surgery. Most patients describe mild discomfort rather than actual pain. Post-op soreness and tightness in the donor area are common for a few days but manageable with painkillers.',
  },
  {
    question: 'Am I too young / too old for a transplant?',
    answer: 'Most reputable surgeons won\'t operate on someone under 25 because hair loss patterns aren\'t fully established yet. There\'s no strict upper age limit, but the quality and density of your donor hair matters more than your age. A good surgeon will assess your donor area and advise honestly.',
  },
]

export default function HairTransplantGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: 'What Is a Hair Transplant? FUE, FUT & What to Expect',
    description: 'A complete guide to hair transplants in the UK: FUE and FUT methods, recovery, costs and choosing a surgeon.',
    url: canonicalUrl('/guides/hair-transplant'),
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
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Hair Transplant' }]} />

        <header className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <BookOpen className="h-3 w-3" /> Treatment Guide
          </span>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            What Is a Hair Transplant?
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A hair transplant is a surgical procedure that moves hair follicles from one part
            of your head (the donor area, usually the back and sides) to areas that are thinning
            or bald. The transplanted hair is your own, grows naturally and is permanent. It&apos;s
            the only treatment that restores real, growing hair to bald areas.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Updated March 2026 &middot; 8 min read</p>
        </header>

        <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-12">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm">
            {[
              { id: 'fue-vs-fut', label: 'FUE vs FUT' },
              { id: 'procedure', label: 'What Happens on the Day' },
              { id: 'recovery', label: 'Recovery Timeline' },
              { id: 'cost', label: 'Cost in the UK' },
              { id: 'who-for', label: 'Who Is It Suitable For?' },
              { id: 'choosing-surgeon', label: 'How to Choose a Surgeon' },
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
          <section id="fue-vs-fut">
            <h2>FUE vs FUT</h2>
            <p>There are two main transplant methods. Both achieve the same goal but differ in how follicles are extracted from the donor area.</p>
          </section>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 my-8">
          {[
            {
              name: 'FUE (Follicular Unit Extraction)', icon: '🎯',
              pros: ['No linear scar', 'Faster healing (7 to 10 days)', 'Can wear hair very short afterwards'],
              cons: ['More expensive per graft', 'Longer procedure time', 'Larger donor area needs shaving'],
              best: 'Best for people who want to wear their hair short or avoid a strip scar.',
            },
            {
              name: 'FUT (Follicular Unit Transplantation)', icon: '📏',
              pros: ['More grafts possible in one session', 'Lower cost per graft', 'Higher graft survival rate'],
              cons: ['Linear scar on donor area', 'Longer recovery for donor site', 'Needs hair length to cover scar'],
              best: 'Best for maximising graft count, especially for larger areas of loss.',
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
          <p>FUE is far more common in the UK today. Most modern clinics specialise in FUE, and it&apos;s what most patients request. FUT still has a place for cases where maximum graft count is the priority.</p>

          <section id="procedure">
            <h2>What Happens on the Day</h2>
            <ol>
              <li><strong>Preparation:</strong> The surgeon marks the hairline design and donor area. You agree on graft count and placement.</li>
              <li><strong>Anaesthesia:</strong> Local anaesthetic is injected into the donor and recipient areas. This is the most uncomfortable part for most patients.</li>
              <li><strong>Extraction:</strong> Individual follicles (FUE) or a strip of scalp (FUT) are removed from the donor area.</li>
              <li><strong>Preparation:</strong> The surgical team examines and prepares each graft under magnification.</li>
              <li><strong>Implantation:</strong> Grafts are placed one by one into tiny incisions in the recipient area, following the agreed design.</li>
            </ol>
            <p>The procedure takes 4 to 8 hours depending on the number of grafts. Most patients watch films, listen to music or sleep during the process. You go home the same day.</p>
          </section>

          <section id="recovery">
            <h2>Recovery Timeline</h2>
            <ul>
              <li><strong>Days 1 to 3:</strong> Swelling, redness and mild soreness. Sleep propped up. Follow the clinic&apos;s washing instructions carefully.</li>
              <li><strong>Week 1:</strong> Small scabs form around each graft. Don&apos;t pick at them. The donor area starts to heal.</li>
              <li><strong>Weeks 2 to 4:</strong> Transplanted hairs fall out (this is entirely normal, called &quot;shock loss&quot;). The scalp returns to normal appearance.</li>
              <li><strong>Months 3 to 4:</strong> New growth begins. Fine, thin hairs start to appear.</li>
              <li><strong>Months 6 to 8:</strong> Noticeable coverage. Hair is still maturing in thickness and texture.</li>
              <li><strong>Months 12 to 18:</strong> Final result. Full thickness and density achieved.</li>
            </ul>
          </section>

          <section id="cost">
            <h2>Cost in the UK</h2>
            <ul>
              <li><strong>FUE (per graft):</strong> £2 to £5</li>
              <li><strong>Typical session (2,000 to 3,000 grafts):</strong> £4,000 to £10,000</li>
              <li><strong>Large session (4,000+ grafts):</strong> £8,000 to £15,000</li>
            </ul>
            <p>
              Hair transplants are not available on the NHS. Some clinics offer finance plans to
              spread the cost over 12 to 24 months. Be cautious of prices that seem too good to be
              true, particularly from overseas clinics marketing aggressively to UK patients.
            </p>
          </section>

          <section id="who-for">
            <h2>Who Is It Suitable For?</h2>
            <ul>
              <li>Men and women with stable hair loss patterns (ideally over 25)</li>
              <li>People with sufficient donor hair (good density on the back and sides)</li>
              <li>Norwood 2 to 5 tends to get the best results</li>
              <li>Those wanting a permanent, natural result they don&apos;t need to maintain daily</li>
            </ul>
            <p>
              Transplants aren&apos;t suitable for everyone. If your donor area is thin, if your
              hair loss is still progressing rapidly, or if you&apos;re Norwood 6 to 7 with very
              limited donor supply, a surgeon may advise against it. A good surgeon will tell you
              honestly whether you&apos;re a candidate.
            </p>
          </section>

          <section id="choosing-surgeon">
            <h2>How to Choose a Surgeon</h2>
            <ul>
              <li><strong>GMC-registered surgeon.</strong> Verify they&apos;re on the General Medical Council register and qualified to perform the procedure.</li>
              <li><strong>Before-and-after gallery.</strong> Look for cases similar to your level of hair loss. Ask if photos are of the surgeon&apos;s own patients.</li>
              <li><strong>In-person consultation.</strong> A reputable surgeon will want to examine your scalp, assess your donor area and discuss realistic expectations face to face.</li>
              <li><strong>Avoid hard-sell tactics.</strong> If a clinic pressures you with limited-time discounts or rush you through the consultation, that&apos;s a warning sign.</li>
              <li><strong>ISHRS membership.</strong> Membership of the International Society of Hair Restoration Surgery is a positive indicator of expertise and commitment to the field.</li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="my-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
          <div className="relative p-8 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <Puzzle className="mx-auto h-8 w-8 text-white/80 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Find Hair Transplant Clinics Near You</h2>
              <p className="text-white/70 max-w-lg mx-auto mb-6">Compare hair transplant surgeons across the UK. Read reviews, check credentials and book a consultation.</p>
              <Link href="/treatments/hair-transplant" className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:shadow-xl active:scale-[0.98]">
                <MapPin className="h-4 w-4" /> Browse Transplant Clinics
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
              { label: 'PRP Treatment', href: '/guides/prp-treatment', icon: '💉' },
              { label: 'SMP', href: '/guides/scalp-micropigmentation', icon: '🔵' },
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
