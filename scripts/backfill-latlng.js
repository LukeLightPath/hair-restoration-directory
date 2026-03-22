/**
 * Backfill latitude/longitude from postcodes via postcodes.io
 * Then update the PostGIS location column.
 *
 * Usage: node scripts/backfill-latlng.js
 *
 * postcodes.io bulk endpoint accepts up to 100 postcodes per request.
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BATCH_SIZE = 100

async function bulkGeocode(postcodes) {
  const res = await fetch('https://api.postcodes.io/postcodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postcodes }),
  })
  if (!res.ok) throw new Error(`postcodes.io error: ${res.status}`)
  const data = await res.json()
  return data.result // Array of { query, result: { latitude, longitude, ... } | null }
}

async function main() {
  // 1. Fetch all listings that have a postcode but no lat/lng
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, postcode')
    .is('latitude', null)
    .not('postcode', 'is', null)
    .neq('postcode', '')

  if (error) {
    console.error('Error fetching listings:', error)
    process.exit(1)
  }

  console.log(`Found ${listings.length} listings with postcodes but no lat/lng\n`)

  if (listings.length === 0) {
    console.log('Nothing to backfill!')
    process.exit(0)
  }

  let updated = 0
  let failed = 0
  let noResult = 0

  // 2. Process in batches
  for (let i = 0; i < listings.length; i += BATCH_SIZE) {
    const batch = listings.slice(i, i + BATCH_SIZE)
    const postcodes = batch.map(l => l.postcode.trim())

    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: geocoding ${postcodes.length} postcodes...`)

    try {
      const results = await bulkGeocode(postcodes)

      for (let j = 0; j < batch.length; j++) {
        const listing = batch[j]
        const geoResult = results[j]

        if (!geoResult || !geoResult.result) {
          console.log(`  ✗ No result for "${listing.postcode}" (${listing.title}, ${listing.city})`)
          noResult++
          continue
        }

        const { latitude, longitude } = geoResult.result

        const { error: updateErr } = await supabase
          .from('listings')
          .update({ latitude, longitude })
          .eq('id', listing.id)

        if (updateErr) {
          console.log(`  ✗ Update failed for ${listing.title}: ${updateErr.message}`)
          failed++
        } else {
          updated++
        }
      }
    } catch (err) {
      console.error(`  Batch error:`, err.message)
      failed += batch.length
    }

    // Small delay between batches to be polite to the API
    if (i + BATCH_SIZE < listings.length) {
      await new Promise(r => setTimeout(r, 500))
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Updated: ${updated}`)
  console.log(`No geocode result: ${noResult}`)
  console.log(`Failed: ${failed}`)

  // 3. Now backfill the PostGIS location column from the new lat/lng
  console.log('\nBackfilling PostGIS location column...')

  const { error: sqlErr } = await supabase.rpc('exec_sql', {
    query: `UPDATE listings SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND location IS NULL`
  })

  // If exec_sql RPC doesn't exist, we'll do it row by row
  if (sqlErr) {
    console.log('RPC exec_sql not available, you can run this SQL manually:')
    console.log(`UPDATE listings SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND location IS NULL;`)
  } else {
    console.log('Location column backfilled successfully!')
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
