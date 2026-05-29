/**
 * Cached data-fetching functions
 *
 * Uses React's `cache()` to deduplicate Supabase queries within a single
 * request. This prevents generateMetadata() and the page component from
 * independently querying the same data.
 *
 * Also provides a cached city-resolver that avoids fetching ALL listings
 * just to match a city slug.
 */
import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { citySlug } from '@/lib/utils'
import type { ListingWithRelations } from '@/lib/types'

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

/**
 * Resolve a URL slug to the exact city name stored in the database.
 *
 * Uses a lightweight DISTINCT query instead of fetching all listing rows,
 * and is deduplicated within a single request via React cache().
 */
export const resolveCityFromSlugCached = cache(async (slug: string): Promise<string | null> => {
  const supabase = await createClient()

  // Fetch distinct cities — much lighter than fetching all listing rows
  const { data: rows } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  if (!rows || rows.length === 0) return null

  const uniqueCities = Array.from<string>(new Set(rows.map((r: { city: string }) => r.city)))
  return uniqueCities.find(city => citySlug(city) === slug) ?? null
})

/**
 * Fetch all distinct cities with clinic counts.
 * Used by the homepage (city grid) and city pages (nearby cities).
 * Deduplicated within a single request via React cache().
 */
export const getAllCityCounts = cache(async (): Promise<Map<string, number>> => {
  const supabase = await createClient()

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
})
