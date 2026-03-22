/**
 * Backfill latitude/longitude from Google Places API (New)
 * Uses google_place_id to fetch location coordinates.
 * Then updates the PostGIS location column.
 *
 * Usage:
 *   node scripts/backfill-latlng-google.js              # full run
 *   node scripts/backfill-latlng-google.js --dry-run    # preview only
 *   node scripts/backfill-latlng-google.js --limit 5    # test with 5
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

if (!GOOGLE_API_KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY in .env.local')
  process.exit(1)
}

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const LIMIT = (() => {
  const idx = args.indexOf('--limit')
  return idx !== -1 ? parseInt(args[idx + 1], 10) : 0
})()
const DELAY_MS = 120

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function fetchLocation(placeId) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'location,addressComponents',
    },
  })
  if (!res.ok) {
    const body = await res.text()
    console.warn(`  API error (${res.status}): ${body.slice(0, 200)}`)
    return null
  }
  return await res.json()
}

function extractPostcode(addressComponents) {
  if (!addressComponents) return null
  const pc = addressComponents.find(c =>
    c.types && c.types.includes('postal_code')
  )
  return pc ? (pc.shortText || pc.longText || null) : null
}

async function main() {
  console.log(`\nBackfill lat/lng from Google Places API${DRY_RUN ? ' (DRY RUN)' : ''}\n`)

  let query = supabase
    .from('listings')
    .select('id, title, city, google_place_id')
    .is('latitude', null)
    .not('google_place_id', 'is', null)
    .order('title')

  if (LIMIT > 0) query = query.limit(LIMIT)

  const { data: listings, error } = await query
  if (error) { console.error('Error:', error); process.exit(1) }

  console.log(`Found ${listings.length} listings to backfill\n`)
  if (listings.length === 0) { process.exit(0) }

  let updated = 0, failed = 0, noLocation = 0

  for (const listing of listings) {
    process.stdout.write(`  ${listing.title} (${listing.city})... `)

    const data = await fetchLocation(listing.google_place_id)
    if (!data || !data.location) {
      console.log('NO LOCATION')
      noLocation++
      await sleep(DELAY_MS)
      continue
    }

    const lat = data.location.latitude
    const lng = data.location.longitude
    const postcode = extractPostcode(data.addressComponents)

    if (DRY_RUN) {
      console.log(`OK — ${lat}, ${lng}${postcode ? ` (${postcode})` : ''}`)
      updated++
      await sleep(DELAY_MS)
      continue
    }

    const updateData = { latitude: lat, longitude: lng }
    if (postcode) updateData.postcode = postcode

    const { error: updateErr } = await supabase
      .from('listings')
      .update(updateData)
      .eq('id', listing.id)

    if (updateErr) {
      console.log(`FAILED: ${updateErr.message}`)
      failed++
    } else {
      console.log(`OK — ${lat}, ${lng}${postcode ? ` (${postcode})` : ''}`)
      updated++
    }
    await sleep(DELAY_MS)
  }

  console.log(`\n--- Summary ---`)
  console.log(`Updated: ${updated}`)
  console.log(`No location: ${noLocation}`)
  console.log(`Failed: ${failed}`)

  if (!DRY_RUN && updated > 0) {
    // Backfill PostGIS location column
    console.log('\nNow run this SQL in Supabase SQL Editor to backfill the location column:')
    console.log(`UPDATE listings SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND location IS NULL;`)
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
