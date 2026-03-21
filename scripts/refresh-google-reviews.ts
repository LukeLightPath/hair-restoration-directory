#!/usr/bin/env npx tsx
/**
 * Monthly Google Reviews Refresh Script
 *
 * Fetches fresh review data from the Google Places API (New) for all listings
 * that have a google_place_id, and updates Supabase.
 *
 * Usage:
 *   npx tsx scripts/refresh-google-reviews.ts                # full run
 *   npx tsx scripts/refresh-google-reviews.ts --dry-run      # preview only
 *   npx tsx scripts/refresh-google-reviews.ts --limit 5      # test with 5 listings
 *
 * Required env vars:
 *   GOOGLE_PLACES_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (not the anon key — needs write access)
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

/* ── Config ───────────────────────────────────────────────── */

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!GOOGLE_API_KEY) {
  console.error('❌ Missing GOOGLE_PLACES_API_KEY in .env')
  process.exit(1)
}
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const LIMIT = (() => {
  const idx = args.indexOf('--limit')
  return idx !== -1 ? parseInt(args[idx + 1], 10) : 0
})()
const DELAY_MS = 120 // ms between API calls to stay within quota

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/* ── Types ────────────────────────────────────────────────── */

interface GoogleReview {
  authorAttribution?: { displayName?: string }
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
}

interface PlaceDetailsResponse {
  rating?: number
  userRatingCount?: number
  reviews?: GoogleReview[]
}

/* ── Helpers ──────────────────────────────────────────────── */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchPlaceDetails(placeId: string): Promise<PlaceDetailsResponse | null> {
  const url = `https://places.googleapis.com/v1/places/${placeId}`
  const fields = 'rating,userRatingCount,reviews'

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_API_KEY!,
        'X-Goog-FieldMask': fields,
      },
    })

    if (!res.ok) {
      const body = await res.text()
      console.warn(`  ⚠ API error (${res.status}): ${body.slice(0, 200)}`)
      return null
    }

    return (await res.json()) as PlaceDetailsResponse
  } catch (err) {
    console.warn(`  ⚠ Fetch error: ${err}`)
    return null
  }
}

/* ── Main ─────────────────────────────────────────────────── */

async function main() {
  console.log(`\n🔄 Google Reviews Refresh${DRY_RUN ? ' (DRY RUN)' : ''}`)
  console.log(`   ${new Date().toISOString()}\n`)

  // Fetch listings with a google_place_id
  let query = supabase
    .from('listings')
    .select('id, title, city, google_place_id')
    .not('google_place_id', 'is', null)
    .order('title')

  if (LIMIT > 0) {
    query = query.limit(LIMIT)
  }

  const { data: listings, error } = await query

  if (error) {
    console.error('❌ Failed to fetch listings:', error.message)
    process.exit(1)
  }

  if (!listings || listings.length === 0) {
    console.log('ℹ No listings with google_place_id found.')
    return
  }

  console.log(`📋 Found ${listings.length} listings to refresh\n`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const listing of listings) {
    process.stdout.write(`  ${listing.title} (${listing.city})... `)

    const data = await fetchPlaceDetails(listing.google_place_id!)

    if (!data) {
      console.log('SKIPPED (API error)')
      failed++
      await sleep(DELAY_MS)
      continue
    }

    if (DRY_RUN) {
      console.log(
        `OK — rating: ${data.rating ?? 'n/a'}, reviews: ${data.userRatingCount ?? 0}, ` +
        `snippets: ${data.reviews?.length ?? 0}`
      )
      updated++
      await sleep(DELAY_MS)
      continue
    }

    // Update listing rating/count
    const { error: updateErr } = await supabase
      .from('listings')
      .update({
        google_rating: data.rating ?? null,
        google_review_count: data.userRatingCount ?? 0,
        last_google_sync: new Date().toISOString(),
      })
      .eq('id', listing.id)

    if (updateErr) {
      console.log(`FAILED (update: ${updateErr.message})`)
      failed++
      await sleep(DELAY_MS)
      continue
    }

    // Replace google reviews: delete old, insert new
    await supabase
      .from('listing_reviews')
      .delete()
      .eq('listing_id', listing.id)
      .eq('source', 'google')

    if (data.reviews && data.reviews.length > 0) {
      const reviewRows = data.reviews.slice(0, 5).map((r) => ({
        listing_id: listing.id,
        author: r.authorAttribution?.displayName || null,
        rating: r.rating ?? null,
        review_text: r.text?.text || null,
        source: 'google',
      }))

      const { error: insertErr } = await supabase
        .from('listing_reviews')
        .insert(reviewRows)

      if (insertErr) {
        console.log(`WARN (reviews insert: ${insertErr.message})`)
      }
    }

    console.log(
      `✅ rating: ${data.rating ?? 'n/a'}, count: ${data.userRatingCount ?? 0}, ` +
      `reviews: ${data.reviews?.length ?? 0}`
    )
    updated++
    await sleep(DELAY_MS)
  }

  console.log(`\n── Summary ──────────────────────────`)
  console.log(`  ✅ Updated: ${updated}`)
  console.log(`  ⏭️  Skipped: ${skipped}`)
  console.log(`  ❌ Failed:  ${failed}`)
  console.log(`  📊 Total:   ${listings.length}`)
  console.log(`\nDone.\n`)
}

main().catch(console.error)
