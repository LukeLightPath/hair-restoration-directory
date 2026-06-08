/**
 * Cached data-fetching functions
 *
 * Uses React's `cache()` for per-request deduplication and Next.js
 * `unstable_cache()` for cross-request caching.  DB functions
 * (get_distinct_cities, get_city_counts, get_treatment_counts)
 * replace full-table scans with lightweight aggregation queries.
 */
import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import type { ListingWithRelations } from '@/lib/types'

/* ── Column selections for listing cards ──────────────────── */

/**
 * Only the columns the ClinicCard component actually needs.
 * Avoids pulling heavy text fields (opening_hours, meta_*, services_list, etc.)
 */
export const LISTING_CARD_COLUMNS = `
  id, slug, title, city, county, country, street, phone, website,
  description, treatment_category, google_rating, google_review_count,
  pricing_tier, men_women_both, claimed, featured, featured_sort_order,
  logo_url, business_status
` as const

/* ── Single-listing fetches (per-request dedup only) ──────── */

/**
 * Fetch a full listing by slug, including all relations.
 * Deduplicated within a single request via React cache().
 */
export const getListingBySlug = cache(async (slug: string) => {
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      listing_services(*),
      listing_materials(*),
      listing_socials(*),
      listing_reviews(*),
      listing_images(*)
    `)
    .eq('slug', slug)
    .single()

  return listing as unknown as ListingWithRelations | null
})

/**
 * Fetch listing metadata only (for generateMetadata).
 * Falls through to the full listing cache to avoid a separate query.
 */
export const getListingMeta = cache(async (slug: string) => {
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('title, city, meta_title, meta_description, description')
    .eq('slug', slug)
    .single()

  return listing
})

/* ── Cross-request cached city data ───────────────────────── */

/**
 * Resolve a URL slug to the exact city name stored in the database.
 *
 * Uses a DB function that returns ~200 distinct city names instead of
 * fetching all 1,900+ listing rows.  Cached across requests for 1 hour.
 */
export const resolveCityFromSlugCached = cache(async (slug: string): Promise<string | null> => {
  const cities = await getDistinctCities()
  return cities.find(city => citySlug(city) === slug) ?? null
})

/**
 * Fetch all distinct cities (cross-request cached).
 * Uses the get_distinct_cities() DB function — returns ~200 rows
 * instead of scanning all 1,900+ listings.
 */
export const getDistinctCities = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = await createStaticClient()

    const { data, error } = await supabase.rpc('get_distinct_cities')

    if (error || !data) {
      console.error('get_distinct_cities RPC failed, falling back:', error?.message)
      // Fallback: lightweight query
      const { data: rows } = await supabase
        .from('listings')
        .select('city')
        .eq('business_status', 'OPERATIONAL')
        .eq('hidden', false)
      return Array.from(new Set((rows || []).map((r: { city: string }) => r.city))).sort()
    }

    return (data as { city: string }[]).map(r => r.city)
  },
  ['distinct-cities'],
  { revalidate: 3600 }
)

/**
 * Fetch all distinct cities with clinic counts (cross-request cached).
 * Uses the get_city_counts() DB function — returns ~200 rows of {city, count}
 * instead of scanning all 1,900+ listings and counting in JS.
 */
export const getAllCityCounts = unstable_cache(
  async (): Promise<Map<string, number>> => {
    const supabase = await createStaticClient()

    const { data, error } = await supabase.rpc('get_city_counts')

    if (error || !data) {
      console.error('get_city_counts RPC failed, falling back:', error?.message)
      // Fallback: lightweight query
      const { data: rows } = await supabase
        .from('listings')
        .select('city')
        .eq('business_status', 'OPERATIONAL')
        .eq('hidden', false)
      const cityMap = new Map<string, number>()
      for (const row of rows || []) {
        cityMap.set(row.city, (cityMap.get(row.city) || 0) + 1)
      }
      return cityMap
    }

    const cityMap = new Map<string, number>()
    for (const row of data as { city: string; count: number }[]) {
      cityMap.set(row.city, Number(row.count))
    }
    return cityMap
  },
  ['city-counts'],
  { revalidate: 3600 }
)

/**
 * Fetch city counts with county info (cross-request cached).
 * Used by the /uk all-cities page.
 */
export const getCityCountsWithCounty = unstable_cache(
  async (): Promise<{ city: string; county: string | null; count: number }[]> => {
    const supabase = await createStaticClient()

    const { data, error } = await supabase.rpc('get_city_counts_with_county')

    if (error || !data) {
      console.error('get_city_counts_with_county RPC failed, falling back:', error?.message)
      // Fallback
      const { data: rows } = await supabase
        .from('listings')
        .select('city, county')
        .eq('business_status', 'OPERATIONAL')
        .eq('hidden', false)
      const cityData = new Map<string, { count: number; county: string | null }>()
      for (const row of rows || []) {
        const existing = cityData.get(row.city)
        if (existing) {
          existing.count += 1
        } else {
          cityData.set(row.city, { count: 1, county: row.county })
        }
      }
      return Array.from(cityData.entries()).map(([city, { count, county }]) => ({ city, county, count }))
    }

    return (data as { city: string; county: string | null; count: number }[]).map(r => ({
      city: r.city,
      county: r.county,
      count: Number(r.count),
    }))
  },
  ['city-counts-with-county'],
  { revalidate: 3600 }
)

/**
 * Fetch treatment counts (cross-request cached).
 * Replaces the N+1 loop of 11 sequential count queries with a single RPC.
 */
export const getTreatmentCounts = unstable_cache(
  async (): Promise<Record<string, number>> => {
    const supabase = await createStaticClient()

    const { data, error } = await supabase.rpc('get_treatment_counts')

    if (error || !data) {
      console.error('get_treatment_counts RPC failed:', error?.message)
      return {}
    }

    const counts: Record<string, number> = {}
    for (const row of data as { treatment: string; count: number }[]) {
      counts[row.treatment] = Number(row.count)
    }
    return counts
  },
  ['treatment-counts'],
  { revalidate: 3600 }
)
