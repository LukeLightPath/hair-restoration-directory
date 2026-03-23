import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/* ──────────────────────────────────────────────
 * Bot Detection — blocked user-agent substrings
 * ────────────────────────────────────────────── */
const BLOCKED_UA = [
  'python-requests', 'python-urllib', 'python-httpx',
  'scrapy', 'httpclient', 'curl/', 'wget/',
  'libwww-perl', 'java/', 'php/', 'go-http-client',
  'node-fetch', 'axios/', 'postman', 'insomnia',
  'mechanize', 'phantom', 'selenium', 'headless',
  'crawl', 'spider', 'scrape', 'harvest',
]

/* Good bots we should never block */
const ALLOWED_BOTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot',
  'yandexbot', 'baiduspider', 'facebot',
  'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'discordbot',
]

function isBlockedBot(ua: string): boolean {
  const lower = ua.toLowerCase()
  // Never block legitimate crawlers
  if (ALLOWED_BOTS.some(bot => lower.includes(bot))) return false
  // Block known scraper signatures
  return BLOCKED_UA.some(blocked => lower.includes(blocked))
}

/* ──────────────────────────────────────────────
 * Honeypot — track IPs that hit /trap
 * In-memory set; resets on cold start.
 * ────────────────────────────────────────────── */
const trappedIPs = new Set<string>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return '127.0.0.1'
}

/* ──────────────────────────────────────────────
 * Middleware
 * ────────────────────────────────────────────── */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ua = request.headers.get('user-agent') || ''
  const clientIp = getClientIp(request)

  // ── Honeypot trap ──
  if (pathname === '/trap') {
    trappedIPs.add(clientIp)
    console.warn(`[Bot Trap] IP ${clientIp} hit honeypot — blocked`)
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── Block previously trapped IPs ──
  if (trappedIPs.has(clientIp)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── Block scraper user agents ──
  if (ua && isBlockedBot(ua)) {
    console.warn(`[Bot Block] Blocked UA: ${ua.substring(0, 80)}`)
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── Supabase auth (for protected routes) ──
  let supabaseResponse = NextResponse.next({ request })

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard')) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
      }
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
      }
      // Check if user is super_admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'super_admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT static files and Next.js internals.
     * This ensures bot detection runs on every page request.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
}
