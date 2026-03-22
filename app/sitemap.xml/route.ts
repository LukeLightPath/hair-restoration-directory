import { citySlug } from '@/lib/utils'
import { TREATMENTS } from '@/lib/types'

// Blog posts are static files, so we maintain the slug list here
const BLOG_SLUGS = [
  'finasteride-minoxidil-side-effects',
  'hair-loss-treatments-compared',
  'hair-system-annual-cost',
  'hair-system-cost-uk',
  'hair-systems-vs-transplants',
  'smp-vs-hair-systems',
  'spotting-bad-hair-clinics',
  'uk-hair-loss-statistics',
  'uk-hair-restoration-market-2026',
  'womens-hair-loss-uk',
]

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: string
  priority: number
}

function toXml(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) =>
    `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

  // Static pages
  const entries: SitemapEntry[] = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/uk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/treatments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/for-clinics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Guide pages
  const guideSlugs = [
    'hair-systems', 'scalp-micropigmentation', 'wigs', 'extensions',
    'prp-treatment', 'hair-transplant', 'trichology', 'laser-therapy',
    'fitting-service', 'hair-toppers', 'hair-integration', 'cranial-prosthesis',
  ]
  for (const slug of guideSlugs) {
    entries.push({ url: `${baseUrl}/guides/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 })
  }

  // Treatment pages (national)
  const enabledTreatments = TREATMENTS.filter((t) => t.enabled)
  for (const t of enabledTreatments) {
    entries.push({ url: `${baseUrl}/treatments/${t.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 })
  }

  // Blog pages
  for (const slug of BLOG_SLUGS) {
    entries.push({ url: `${baseUrl}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 })
  }

  // Dynamic pages from Supabase
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey
    )

    const { data: listings } = await supabase
      .from('listings')
      .select('slug, city, updated_at')
      .eq('business_status', 'OPERATIONAL')

    // Listing pages
    for (const listing of listings || []) {
      entries.push({
        url: `${baseUrl}/uk/${citySlug(listing.city)}/${listing.slug}`,
        lastModified: new Date(listing.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // City pages (deduplicated)
    const cities = new Set((listings || []).map((l) => l.city))
    for (const city of cities) {
      entries.push({ url: `${baseUrl}/uk/${citySlug(city)}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 })
    }

    // Treatment + city combo pages
    for (const treatment of enabledTreatments) {
      for (const city of cities) {
        entries.push({
          url: `${baseUrl}/treatments/${treatment.slug}/${citySlug(city)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.75,
        })
      }
    }
  } catch {
    // Supabase unavailable — static pages still returned
  }

  return new Response(toXml(entries), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
