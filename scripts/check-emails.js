/**
 * Check how many listings are missing email addresses
 */
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function main() {
  // Get all listings
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, email, claimed_by, website, phone')
    .order('city')

  if (error) { console.error('Error:', error); process.exit(1) }

  const total = listings.length
  const hasEmail = listings.filter(l => l.email && l.email.trim())
  const missingEmail = listings.filter(l => !l.email || !l.email.trim())
  const claimed = listings.filter(l => l.claimed_by)
  const unreachable = missingEmail.filter(l => !l.claimed_by)
  const hasWebsite = missingEmail.filter(l => l.website && l.website.trim())
  const hasPhone = missingEmail.filter(l => l.phone && l.phone.trim())

  console.log('\n=== Email Coverage Report ===\n')
  console.log(`Total listings:          ${total}`)
  console.log(`Has email:               ${hasEmail.length}  (${(hasEmail.length/total*100).toFixed(1)}%)`)
  console.log(`Missing email:           ${missingEmail.length}  (${(missingEmail.length/total*100).toFixed(1)}%)`)
  console.log(`Claimed (has owner):     ${claimed.length}`)
  console.log(`Completely unreachable:  ${unreachable.length}  (no email AND not claimed)`)
  console.log()
  console.log(`Of the ${missingEmail.length} missing email:`)
  console.log(`  - Has website:         ${hasWebsite.length}  (could scrape for email)`)
  console.log(`  - Has phone only:      ${hasPhone.filter(l => !l.website || !l.website.trim()).length}`)
  console.log(`  - No contact at all:   ${missingEmail.filter(l => (!l.website || !l.website.trim()) && (!l.phone || !l.phone.trim())).length}`)

  if (missingEmail.length > 0 && missingEmail.length <= 50) {
    console.log('\n--- Listings Missing Email ---\n')
    for (const l of missingEmail) {
      console.log(`  ${l.title} (${l.city}) — website: ${l.website || 'NONE'} | phone: ${l.phone || 'NONE'} | claimed: ${l.claimed_by ? 'YES' : 'NO'}`)
    }
  } else if (missingEmail.length > 50) {
    console.log('\n--- First 50 Listings Missing Email ---\n')
    for (const l of missingEmail.slice(0, 50)) {
      console.log(`  ${l.title} (${l.city}) — website: ${l.website || 'NONE'} | phone: ${l.phone || 'NONE'} | claimed: ${l.claimed_by ? 'YES' : 'NO'}`)
    }
    console.log(`  ... and ${missingEmail.length - 50} more`)
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
