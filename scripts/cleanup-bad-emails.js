/**
 * Clean up false positive emails that were scraped from
 * font CSS, website builder templates, or unrelated businesses.
 *
 * Sets the email back to NULL for these listings.
 *
 * Usage:
 *   node scripts/cleanup-bad-emails.js --dry-run    # preview
 *   node scripts/cleanup-bad-emails.js              # live
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')

// Known bad domains/emails from font stylesheets, website builders, etc.
const BAD_PATTERNS = [
  // Google Fonts author emails embedded in CSS
  'impallari@gmail.com',
  '@indiantypefoundry.com',
  '@latofonts.com',
  '@typemade.mx',
  'wweeiihhuuaanngg@gmail.com',
  // Website builder template emails
  '@webador.com',
  '@godaddy.com',
  '@mystore.com',
  '@mysite.com',
  '@sansoxygen.com',
  '@nelson.com',
  'example@',
  'hi@mystore.com',
  // Generic NHS catch-all (not a clinic-specific email)
  'stsft.adviceandcomplaints@nhs.net',
  // Unrelated business
  '@thundercattattoostudio.com',
]

function isBadEmail(email) {
  if (!email) return false
  const lower = email.toLowerCase()
  return BAD_PATTERNS.some(pattern => lower.includes(pattern.toLowerCase()))
}

async function main() {
  console.log(`\n=== Cleanup False Positive Emails${DRY_RUN ? ' (DRY RUN)' : ''} ===\n`)

  // Get all listings that have an email
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, email')
    .not('email', 'is', null)
    .order('title')

  if (error) { console.error('Query error:', error); process.exit(1) }

  const toClean = listings.filter(l => isBadEmail(l.email))

  if (toClean.length === 0) {
    console.log('No false positive emails found. All clean!')
    process.exit(0)
  }

  console.log(`Found ${toClean.length} false positive emails to clean:\n`)

  let cleaned = 0
  for (const listing of toClean) {
    console.log(`  ${listing.title} (${listing.city}) — BAD: ${listing.email}`)

    if (!DRY_RUN) {
      const { error: updateErr } = await supabase
        .from('listings')
        .update({ email: null })
        .eq('id', listing.id)

      if (updateErr) {
        console.log(`    UPDATE FAILED: ${updateErr.message}`)
      } else {
        console.log(`    → Set to NULL`)
        cleaned++
      }
    } else {
      cleaned++
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Cleaned: ${cleaned}/${toClean.length}`)

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
