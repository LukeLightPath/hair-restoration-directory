/**
 * Export all listings missing an email address to CSV
 *
 * Usage: node scripts/export-missing-emails.js
 * Output: scripts/output/missing-emails.csv
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function escapeCsv(val) {
  if (val == null) return ''
  const str = String(val)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

async function main() {
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, street, phone, website, google_place_id, treatment_category, claimed_by')
    .is('email', null)
    .order('city')

  if (error) { console.error('Query error:', error); process.exit(1) }

  const headers = ['id', 'title', 'city', 'street', 'phone', 'website', 'google_place_id', 'treatment_category', 'claimed']
  const rows = listings.map(l => [
    escapeCsv(l.id),
    escapeCsv(l.title),
    escapeCsv(l.city),
    escapeCsv(l.street),
    escapeCsv(l.phone),
    escapeCsv(l.website),
    escapeCsv(l.google_place_id),
    escapeCsv(l.treatment_category),
    l.claimed_by ? 'YES' : 'NO',
  ].join(','))

  const csv = [headers.join(','), ...rows].join('\n')

  const outDir = path.join(__dirname, 'output')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'missing-emails.csv')
  fs.writeFileSync(outPath, csv, 'utf-8')

  console.log(`\nExported ${listings.length} listings missing email to:`)
  console.log(`  ${outPath}\n`)

  // Summary breakdown
  const hasWebsite = listings.filter(l => l.website && l.website.trim())
  const hasPhone = listings.filter(l => l.phone && l.phone.trim())
  const noContact = listings.filter(l => (!l.website || !l.website.trim()) && (!l.phone || !l.phone.trim()))

  console.log(`Breakdown:`)
  console.log(`  Has website:     ${hasWebsite.length}`)
  console.log(`  Has phone only:  ${listings.length - hasWebsite.length - noContact.length}`)
  console.log(`  No contact info: ${noContact.length}`)

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
