'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null)

  // Extract unique categories in the order they first appear
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  const filtered = active ? posts.filter((p) => p.category === active) : posts

  return (
    <>
      {/* Category filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
            active === null
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
              active === cat
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post count */}
      <p className="text-xs text-muted-foreground mb-6">
        Showing {filtered.length} of {posts.length} articles
        {active && (
          <>
            {' '}in <span className="font-medium text-foreground">{active}</span>
          </>
        )}
      </p>

      {/* Post grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
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
    </>
  )
}
