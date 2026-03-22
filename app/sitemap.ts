import type { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import { TREATMENTS } from '@/lib/types'

// Prevent static generation — sitemap queries Supabase at request time
export const dynamic = 'force-dynamic'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServiceClient()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
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
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Treatment pages (national) — only enabled treatments
  const enabledTreatments = TREATMENTS.filter((t) => t.enabled)
  const treatmentPages: MetadataRoute.Sitemap = enabledTreatments.map((t) => ({
    url: `${baseUrl}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Listing pages
  const { data: listings } = await supabase
    .from('listings')
    .select('slug, city, updated_at')
    .eq('business_status', 'OPERATIONAL')

  const listingPages: MetadataRoute.Sitemap = (listings || []).map((listing) => ({
    url: `${baseUrl}/uk/${citySlug(listing.city)}/${listing.slug}`,
    lastModified: new Date(listing.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // City pages (deduplicated)
  const cities = new Set((listings || []).map((l) => l.city))
  const cityPages: MetadataRoute.Sitemap = Array.from(cities).map((city) => ({
    url: `${baseUrl}/uk/${citySlug(city)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Treatment + city combo pages — only enabled treatments
  const treatmentCityPages: MetadataRoute.Sitemap = []
  for (const treatment of enabledTreatments) {
    for (const city of cities) {
      treatmentCityPages.push({
        url: `${baseUrl}/treatments/${treatment.slug}/${citySlug(city)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })
    }
  }

  // Blog pages (static files, not database)
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...guidePages, ...treatmentPages, ...cityPages, ...treatmentCityPages, ...listingPages, ...blogPages]
}
