/**
 * Phase 2 — Browser-based email scraper (Puppeteer)
 * For listings where Phase 1 HTTP scrape didn't find an email.
 * Uses a real browser to render JS-heavy pages and extract emails.
 *
 * Usage:
 *   node scripts/scrape-emails-browser.js              # full run
 *   node scripts/scrape-emails-browser.js --dry-run    # preview only
 *   node scripts/scrape-emails-browser.js --limit 10   # test with N
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

// ---------------------------------------------------------------------------
// Email extraction helpers (same as Phase 1 but enhanced)
// ---------------------------------------------------------------------------

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
  // Google Font / website builder false positives from Phase 1
  /impallari/i, /@indiantypefoundry/i, /@latofonts/i, /@typemade/i,
  /@webador/i, /@godaddy/i, /@mystore/i, /@mysite/i, /@sansoxygen/i,
  /@nelson\.com$/i, /@thundercat/i, /wweeiihhuuaanngg/i,
  /example@/i, /@nhs\.net$/i,
  // More CMS / builder patterns
  /@squarespace/i, /@weebly/i, /@shopify/i, /@wix\./i,
  /@mailchimp/i, /@constantcontact/i,
]

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
  return 1
}

function pickBestEmail(emails) {
  if (emails.length === 0) return null
  if (emails.length === 1) return emails[0]
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
  try {
    const u = new URL(url)
    return u.origin
  } catch {
    return url.replace(/\/+$/, '')
  }
}

const CONTACT_PATHS = ['/contact', '/contact-us', '/about', '/about-us', '/get-in-touch']

// ---------------------------------------------------------------------------
// Browser scraping
// ---------------------------------------------------------------------------

async function scrapePageEmails(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 })
    // Wait a bit for any lazy-loaded content
    await new Promise(r => setTimeout(r, 1000))

    // Extract emails from:
    // 1. All mailto: links
    // 2. Text content of the page
    // 3. Any href attributes
    const emails = await page.evaluate(() => {
      const results = []

      // mailto: links
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        const email = a.getAttribute('href').replace('mailto:', '').split('?')[0].trim()
        if (email) results.push(email)
      })

      // Page text content
      const bodyText = document.body ? document.body.innerText : ''
      const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
      const textEmails = bodyText.match(emailRegex) || []
      results.push(...textEmails)

      return results
    })

    return emails
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\n=== Phase 2: Browser Email Scraper${DRY_RUN ? ' (DRY RUN)' : ''} ===\n`)

  let query = supabase
    .from('listings')
    .select('id, title, city, website')
    .is('email', null)
    .not('website', 'is', null)
    .order('city')

  if (LIMIT > 0) query = query.limit(LIMIT)

  const { data: listings, error } = await query
  if (error) { console.error('Query error:', error); process.exit(1) }

  // Filter out social/booking links
  const validListings = listings.filter(l => {
    const w = l.website.toLowerCase()
    return !w.includes('facebook.com') && !w.includes('instagram.com') &&
           !w.includes('tiktok.com') && !w.includes('twitter.com') &&
           !w.includes('youtube.com') && !w.includes('booksy.com') &&
           !w.includes('fresha.com') && !w.includes('treatwell.co.uk')
  })

  console.log(`Found ${listings.length} listings still missing email with a website`)
  console.log(`  (${listings.length - validListings.length} skipped — social/booking links)`)
  console.log(`  Processing ${validListings.length} real websites\n`)

  if (validListings.length === 0) {
    console.log('Nothing to process!')
    process.exit(0)
  }

  // Launch browser
  console.log('Launching headless browser...\n')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  let found = 0, notFound = 0, errors = 0

  for (let i = 0; i < validListings.length; i++) {
    const listing = validListings[i]
    const base = baseUrl(listing.website)
    const progress = `[${i + 1}/${validListings.length}]`

    process.stdout.write(`  ${progress} ${listing.title} (${listing.city})... `)

    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    // Block images, fonts, stylesheets to speed things up
    await page.setRequestInterception(true)
    page.on('request', req => {
      const type = req.resourceType()
      if (['image', 'font', 'media'].includes(type)) {
        req.abort()
      } else {
        req.continue()
      }
    })

    const allEmails = []

    // 1) Homepage
    let homepageUrl = listing.website.trim()
    if (!homepageUrl.startsWith('http')) homepageUrl = 'https://' + homepageUrl
    const homeEmails = await scrapePageEmails(page, homepageUrl)
    allEmails.push(...homeEmails)

    // 2) Contact pages (only if homepage didn't yield results)
    if (extractEmails(allEmails.join(' ')).length === 0) {
      for (const path of CONTACT_PATHS) {
        const url = base + path
        const pageEmails = await scrapePageEmails(page, url)
        allEmails.push(...pageEmails)
        // Stop once we find something
        if (extractEmails(allEmails.join(' ')).length > 0) break
      }
    }

    await page.close()

    // Dedupe and filter
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
