/**
 * Backfill county data from postcodes using postcodes.io (free, no API key).
 * 
 * Usage: node scripts/backfill-counties.js
 * 
 * What it does:
 * 1. Fetches all listings with a postcode but no county
 * 2. Sends postcodes in batches of 100 to postcodes.io bulk lookup
 * 3. Updates each listing with the county (admin_county or admin_district) 
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Need service role for writes
)

async function main() {
  console.log('Fetching listings...')
  
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, postcode, county, city')
    .eq('business_status', 'OPERATIONAL')

  if (error) {
    console.error('Supabase error:', error.message)
    process.exit(1)
  }

  console.log(`Total operational listings: ${listings.length}`)
  
  const withPostcode = listings.filter(l => l.postcode && l.postcode.trim())
  const withoutPostcode = listings.filter(l => !l.postcode || !l.postcode.trim())
  const alreadyHasCounty = listings.filter(l => l.county && l.county.trim())
  const needsCounty = withPostcode.filter(l => !l.county || !l.county.trim())

  console.log(`Has postcode: ${withPostcode.length}`)
  console.log(`No postcode: ${withoutPostcode.length}`)
  console.log(`Already has county: ${alreadyHasCounty.length}`)
  console.log(`Needs county (has postcode): ${needsCounty.length}`)

  if (needsCounty.length === 0) {
    console.log('Nothing to backfill!')
    return
  }

  // Process in batches of 100 (postcodes.io limit)
  const batches = []
  for (let i = 0; i < needsCounty.length; i += 100) {
    batches.push(needsCounty.slice(i, i + 100))
  }

  let updated = 0
  let failed = 0

  for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
    const batch = batches[batchIdx]
    console.log(`\nBatch ${batchIdx + 1}/${batches.length} (${batch.length} postcodes)...`)

    const postcodes = batch.map(l => l.postcode.trim())

    try {
      const res = await fetch('https://api.postcodes.io/postcodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcodes }),
      })

      if (!res.ok) {
        console.error(`  API error: ${res.status} ${res.statusText}`)
        failed += batch.length
        continue
      }

      const { result: results } = await res.json()

      for (const item of results) {
        const listing = batch.find(l => l.postcode.trim() === item.query)
        if (!listing) continue

        if (!item.result) {
          console.log(`  ✗ ${listing.city} (${item.query}) — postcode not found`)
          failed++
          continue
        }

        // Use admin_county first, fall back to admin_district (for metropolitan areas)
        const county = item.result.admin_county || item.result.admin_district || null
        const region = item.result.region || item.result.country || null

        if (!county) {
          console.log(`  ✗ ${listing.city} (${item.query}) — no county in response`)
          failed++
          continue
        }

        const { error: updateError } = await supabase
          .from('listings')
          .update({ county })
          .eq('id', listing.id)

        if (updateError) {
          console.error(`  ✗ ${listing.city}: ${updateError.message}`)
          failed++
        } else {
          console.log(`  ✓ ${listing.city} → ${county}`)
          updated++
        }
      }
    } catch (err) {
      console.error(`  Batch error:`, err.message)
      failed += batch.length
    }

    // Rate limiting: small delay between batches
    if (batchIdx < batches.length - 1) {
      await new Promise(r => setTimeout(r, 500))
    }
  }

  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`)
}

main().catch(console.error)
