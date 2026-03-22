/**
 * Clean bad emails + run browser scraper for all listings missing email.
 * Combines cleanup + Phase 2 in one script to avoid connection issues.
 */
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const puppeteer = require('puppeteer')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const LIMIT = (() => {
  const idx = args.indexOf('--limit')
  return idx !== -1 ? parseInt(args[idx + 1], 10) : 0
})()

// ── Email helpers ──
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

const JUNK_PATTERNS = [
  /noreply/i, /no-reply/i, /donotreply/i,
  /admin@wordpress/i, /@example\./i, /@sentry\./i, /@wixpress\./i,
  /@test\./i, /@localhost/i, /@email\./i, /support@wordpress/i,
  /@yourwebsite/i, /@yourdomain/i, /@domain\./i, /@company\./i,
  /\.png$/i, /\.jpg$/i, /\.jpeg$/i, /\.gif$/i, /\.svg$/i, /\.webp$/i,
  /\.woff$/i, /\.woff2$/i, /\.eot$/i, /\.ttf$/i,
  /@[0-9]+\./i, /@sentry-next/i, /@vercel/i,
  /webpack/i, /turbopack/i,
  // Font / builder false positives
  /impallari/i, /@indiantypefoundry/i, /@latofonts/i, /@typemade/i,
  /@webador/i, /@godaddy/i, /@mystore/i, /@mysite/i, /@sansoxygen/i,
  /@nelson\.com$/i, /@thundercat/i, /wweeiihhuuaanngg/i,
  /example@/i, /@nhs\.net$/i,
  /@squarespace/i, /@weebly/i, /@shopify/i, /@wix\./i,
  /@mailchimp/i, /@constantcontact/i,
  /@googleapis/i, /@gstatic/i, /@google/i,
  /@rsms/i, /@fontawesome/i, /@icloud/i,
]

const PREFIX_SCORES = {
  'info@': 10, 'enquiries@': 9, 'enquiry@': 9,
  'contact@': 8, 'hello@': 7, 'bookings@': 6,
  'appointments@': 6, 'reception@': 5, 'mail@': 4,
  'salon@': 3, 'clinic@': 3, 'studio@': 3,
}

function isJunk(email) { return JUNK_PATTERNS.some(p => p.test(email)) }
function scoreEmail(email) {
  const lower = email.toLowerCase()
  for (const [prefix, score] of Object.entries(PREFIX_SCORES)) {
    if (lower.startsWith(prefix)) return score
  }
  return 1
}
function pickBestEmail(emails) {
  if (emails.length <= 1) return emails[0] || null
  return emails.sort((a, b) => scoreEmail(b) - scoreEmail(a))[0]
}
function extractEmails(text) {
  const raw = text.match(EMAIL_RE) || []
  const unique = [...new Set(raw.map(e => e.toLowerCase()))]
  return unique.filter(e => !isJunk(e))
}
function baseUrl(website) {
  let url = website.trim()
  if (!url.startsWith('http')) url = 'https://' + url
  try { return new URL(url).origin } catch { return url.replace(/\/+$/, '') }
}

const CONTACT_PATHS = ['/contact', '/contact-us', '/about', '/about-us', '/get-in-touch']

async function scrapePageEmails(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 })
    await new Promise(r => setTimeout(r, 1000))
    return await page.evaluate(() => {
      const results = []
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        const email = a.getAttribute('href').replace('mailto:', '').split('?')[0].trim()
        if (email) results.push(email)
      })
      const bodyText = document.body ? document.body.innerText : ''
      const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
      results.push(...(bodyText.match(emailRegex) || []))
      return results
    })
  } catch { return [] }
}

async function main() {
  console.log(`\n=== Email Scraper (cleanup + browser)${DRY_RUN ? ' (DRY RUN)' : ''} ===\n`)

  // Step 1: Clean bad emails from previous HTTP run
  const BAD_EMAILS = [
    'support@webador.com', 'example@mysite.com', 'team@latofonts.com',
    'contact@sansoxygen.com', 'info@indiantypefoundry.com', 'impallari@gmail.com',
  ]
  console.log('Cleaning false positive emails...')
  for (const bad of BAD_EMAILS) {
    const { data } = await supabase.from('listings').update({ email: null }).eq('email', bad).select('title')
    if (data && data.length > 0) console.log(`  Cleared ${bad} from ${data[0].title}`)
  }
  console.log('')

  // Step 2: Get listings missing email
  let query = supabase
    .from('listings')
    .select('id, title, city, website')
    .is('email', null)
    .not('website', 'is', null)
    .order('city')

  if (LIMIT > 0) query = query.limit(LIMIT)
  const { data: listings, error } = await query
  if (error) { console.error('Query error:', error); process.exit(1) }

  const validListings = listings.filter(l => {
    const w = l.website.toLowerCase()
    return !w.includes('facebook.com') && !w.includes('instagram.com') &&
           !w.includes('tiktok.com') && !w.includes('twitter.com') &&
           !w.includes('youtube.com') && !w.includes('booksy.com') &&
           !w.includes('fresha.com') && !w.includes('treatwell.co.uk')
  })

  console.log(`Listings missing email: ${listings.length}`)
  console.log(`  Skipped (social/booking): ${listings.length - validListings.length}`)
  console.log(`  To scrape: ${validListings.length}\n`)

  if (validListings.length === 0) { console.log('Nothing to process!'); process.exit(0) }

  console.log('Launching headless browser...\n')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  let found = 0, notFound = 0, errors = 0

  for (let i = 0; i < validListings.length; i++) {
    const listing = validListings[i]
    const base = baseUrl(listing.website)
    process.stdout.write(`  [${i + 1}/${validListings.length}] ${listing.title} (${listing.city})... `)

    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort()
      else req.continue()
    })

    const allEmails = []
    let homepageUrl = listing.website.trim()
    if (!homepageUrl.startsWith('http')) homepageUrl = 'https://' + homepageUrl
    allEmails.push(...await scrapePageEmails(page, homepageUrl))

    if (extractEmails(allEmails.join(' ')).length === 0) {
      for (const path of CONTACT_PATHS) {
        allEmails.push(...await scrapePageEmails(page, base + path))
        if (extractEmails(allEmails.join(' ')).length > 0) break
      }
    }

    await page.close()
    const uniqueEmails = extractEmails(allEmails.join(' '))

    if (uniqueEmails.length === 0) {
      console.log('NO EMAIL FOUND')
      notFound++
      continue
    }

    const best = pickBestEmail(uniqueEmails)
    const others = uniqueEmails.filter(e => e !== best)

    if (DRY_RUN) {
      console.log(`FOUND: ${best}${others.length ? ` (also: ${others.join(', ')})` : ''}`)
      found++
      continue
    }

    const { error: updateErr } = await supabase
      .from('listings').update({ email: best }).eq('id', listing.id)

    if (updateErr) { console.log(`FAILED: ${updateErr.message}`); errors++ }
    else { console.log(`SAVED: ${best}${others.length ? ` (also: ${others.join(', ')})` : ''}`); found++ }
  }

  await browser.close()

  console.log(`\n--- Summary ---`)
  console.log(`Emails found:    ${found}`)
  console.log(`Not found:       ${notFound}`)
  console.log(`Errors:          ${errors}`)
  console.log(`Total processed: ${validListings.length}`)
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
