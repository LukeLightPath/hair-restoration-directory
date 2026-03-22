/**
 * Phase 1 — HTTP-based email scraper
 * Fetches clinic websites via plain HTTP and extracts email addresses.
 *
 * Usage:
 *   node scripts/scrape-emails-http.js              # full run
 *   node scripts/scrape-emails-http.js --dry-run    # preview only
 *   node scripts/scrape-emails-http.js --limit 10   # test with N
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

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
const DELAY_MS = 500

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/** Broad email regex — intentionally greedy, we filter after */
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

/** Junk addresses to ignore */
const JUNK_PATTERNS = [
  /noreply/i, /no-reply/i, /donotreply/i,
  /admin@wordpress/i, /@example\./i, /@sentry\./i, /@wixpress\./i,
  /@test\./i, /@localhost/i, /@email\./i, /support@wordpress/i,
  /@yourwebsite/i, /@yourdomain/i, /@domain\./i, /@company\./i,
  /\.png$/i, /\.jpg$/i, /\.jpeg$/i, /\.gif$/i, /\.svg$/i, /\.webp$/i,
  /\.woff$/i, /\.woff2$/i, /\.eot$/i, /\.ttf$/i,
  /@[0-9]+\./i,
  /@sentry-next/i, /@vercel/i,
  /webpack/i, /turbopack/i,
]

/** Preferred email prefixes — higher = better */
const PREFIX_SCORES = {
  'info@': 10,
  'enquiries@': 9,
  'enquiry@': 9,
  'contact@': 8,
  'hello@': 7,
  'bookings@': 6,
  'appointments@': 6,
  'reception@': 5,
  'mail@': 4,
  'salon@': 3,
  'clinic@': 3,
  'studio@': 3,
}

function isJunk(email) {
  return JUNK_PATTERNS.some(p => p.test(email))
}

function scoreEmail(email) {
  const lower = email.toLowerCase()
  for (const [prefix, score] of Object.entries(PREFIX_SCORES)) {
    if (lower.startsWith(prefix)) return score
  }
  return 1 // unknown prefix gets base score
}

function pickBestEmail(emails) {
  if (emails.length === 0) return null
  if (emails.length === 1) return emails[0]
  // Sort by score descending, pick the best
  return emails.sort((a, b) => scoreEmail(b) - scoreEmail(a))[0]
}

function extractEmails(html) {
  const raw = html.match(EMAIL_RE) || []
  // Dedupe and lowercase
  const unique = [...new Set(raw.map(e => e.toLowerCase()))]
  // Filter junk
  return unique.filter(e => !isJunk(e))
}

/** Normalise a base URL for path joining */
function baseUrl(website) {
  let url = website.trim()
  if (!url.startsWith('http')) url = 'https://' + url
  // Remove trailing path, keep origin
  try {
    const u = new URL(url)
    return u.origin
  } catch {
    return url.replace(/\/+$/, '')
  }
}

const CONTACT_PATHS = ['/contact', '/contact-us', '/about', '/about-us', '/get-in-touch']

async function fetchPage(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml')) {
      return null
    }
    return await res.text()
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n=== Phase 1: HTTP Email Scraper${DRY_RUN ? ' (DRY RUN)' : ''} ===\n`)

  let query = supabase
    .from('listings')
    .select('id, title, city, website')
    .is('email', null)
    .not('website', 'is', null)
    .order('city')

  if (LIMIT > 0) query = query.limit(LIMIT)

  const { data: listings, error } = await query
  if (error) { console.error('Query error:', error); process.exit(1) }

  // Filter out listings whose "website" is just a social media link
  const validListings = listings.filter(l => {
    const w = l.website.toLowerCase()
    return !w.includes('facebook.com') && !w.includes('instagram.com') &&
           !w.includes('tiktok.com') && !w.includes('twitter.com') &&
           !w.includes('youtube.com') && !w.includes('booksy.com') &&
           !w.includes('fresha.com') && !w.includes('treatwell.co.uk')
  })

  console.log(`Found ${listings.length} listings missing email with a website`)
  console.log(`  (${listings.length - validListings.length} skipped — social/booking links)`)
  console.log(`  Processing ${validListings.length} real websites\n`)

  let found = 0, notFound = 0, errors = 0

  for (let i = 0; i < validListings.length; i++) {
    const listing = validListings[i]
    const base = baseUrl(listing.website)
    const progress = `[${i + 1}/${validListings.length}]`

    process.stdout.write(`  ${progress} ${listing.title} (${listing.city})... `)

    // Collect emails from all pages
    const allEmails = []

    // 1) Fetch homepage (use original URL to handle subpages)
    let homepageUrl = listing.website.trim()
    if (!homepageUrl.startsWith('http')) homepageUrl = 'https://' + homepageUrl
    const homeHtml = await fetchPage(homepageUrl)
    if (homeHtml) {
      allEmails.push(...extractEmails(homeHtml))
    }

    // 2) Try contact pages
    for (const path of CONTACT_PATHS) {
      const url = base + path
      const html = await fetchPage(url)
      if (html) {
        allEmails.push(...extractEmails(html))
      }
    }

    // Dedupe across all pages
    const uniqueEmails = [...new Set(allEmails)]

    if (uniqueEmails.length === 0) {
      console.log('NO EMAIL FOUND')
      notFound++
      await sleep(DELAY_MS)
      continue
    }

    const best = pickBestEmail(uniqueEmails)
    const others = uniqueEmails.filter(e => e !== best)

    if (DRY_RUN) {
      console.log(`FOUND: ${best}${others.length ? ` (also: ${others.join(', ')})` : ''}`)
      found++
      await sleep(DELAY_MS)
      continue
    }

    // Update Supabase
    const { error: updateErr } = await supabase
      .from('listings')
      .update({ email: best })
      .eq('id', listing.id)

    if (updateErr) {
      console.log(`UPDATE FAILED: ${updateErr.message}`)
      errors++
    } else {
      console.log(`SAVED: ${best}${others.length ? ` (also: ${others.join(', ')})` : ''}`)
      found++
    }

    await sleep(DELAY_MS)
  }

  console.log(`\n--- Summary ---`)
  console.log(`Emails found:    ${found}`)
  console.log(`Not found:       ${notFound}`)
  console.log(`Errors:          ${errors}`)
  console.log(`Total processed: ${validListings.length}`)

  if (notFound > 0) {
    console.log(`\nRun Phase 2 (browser scraper) for the remaining ${notFound} listings.`)
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
