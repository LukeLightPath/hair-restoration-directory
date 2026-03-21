import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog | Hair Restoration Insights & Data',
  description:
    'Data-driven articles on hair restoration in the UK. Costs, treatment comparisons, statistics and guides backed by real numbers.',
  alternates: {
    canonical: canonicalUrl('/blog'),
  },
}

const POSTS = [
  {
    slug: 'uk-hair-loss-statistics',
    title: 'UK Hair Loss by the Numbers: Who\'s Affected and What the Data Shows',
    excerpt:
      'Over 14.5 million adults in the UK experience hair loss. Here\'s what the data says about prevalence by age, gender, mental health impact and where the clinics are.',
    date: '2026-03-21',
    readTime: '11 min',
    category: 'Data Report',
  },
  {
    slug: 'hair-loss-treatments-compared',
    title: 'Every Hair Loss Treatment Compared: Cost, Results, and What the Data Shows',
    excerpt:
      'Seven treatments side by side. Real UK pricing, effectiveness data, and a stage-by-stage guide to what actually works.',
    date: '2026-03-20',
    readTime: '14 min',
    category: 'Complete Guide',
  },
  {
    slug: 'smp-vs-hair-systems',
    title: 'SMP vs Hair Systems: Which Is Right for You?',
    excerpt:
      'A neutral comparison of scalp micropigmentation and hair systems. Real UK costs, daily routines, and a decision framework to help you choose.',
    date: '2026-03-20',
    readTime: '9 min',
    category: 'Comparison',
  },
  {
    slug: 'hair-systems-vs-transplants',
    title: 'Hair Systems vs Hair Transplants: Which One Actually Makes Sense?',
    excerpt:
      'An honest, data-backed comparison of the two most popular hair restoration options. Real UK costs, realistic timelines, and a clear decision framework.',
    date: '2026-03-20',
    readTime: '12 min',
    category: 'Comparison',
  },
  {
    slug: 'hair-system-cost-uk',
    title: 'How Much Does a Hair System Cost in the UK?',
    excerpt:
      'A breakdown of what you\'ll actually pay for a hair system in 2026, from initial fitting to ongoing maintenance. Real UK pricing data, not marketing fluff.',
    date: '2026-03-20',
    readTime: '10 min',
    category: 'Cost Guide',
  },
]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
          <BookOpen className="h-3 w-3" /> Insights
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Data-backed articles on hair restoration costs, treatments and trends across the UK.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/25 hover:-translate-y-1"
          >
            <span className="inline-flex items-center rounded-full bg-primary/8 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider mb-4">
              {post.category}
            </span>
            <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} read
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-4">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
