/**
 * In-memory rate limiter for API routes.
 * Uses a sliding window approach keyed by IP address.
 *
 * Note: Resets on serverless cold starts, but still effective
 * against sustained scraping within a single instance lifetime.
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up expired entries every 60 seconds to prevent memory leaks
let lastCleanup = Date.now()
const CLEANUP_INTERVAL = 60_000

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now

  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Check if a request should be rate limited.
 *
 * @param identifier - Unique identifier (usually IP address)
 * @param limit - Maximum requests allowed in the window (default: 60)
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 * @returns Object with `limited` boolean and `remaining` count
 */
export function rateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60_000
): { limited: boolean; remaining: number } {
  cleanup()

  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return { limited: false, remaining: limit - 1 }
  }

  entry.count++

  if (entry.count > limit) {
    return { limited: true, remaining: 0 }
  }

  return { limited: false, remaining: limit - entry.count }
}

/**
 * Helper to extract client IP from a Request object.
 * Checks common forwarding headers used by Vercel/proxies.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  return '127.0.0.1'
}

/**
 * Convenience function: check rate limit and return a 429 Response if exceeded.
 * Returns null if the request is within limits.
 */
export function checkRateLimit(
  request: Request,
  limit: number = 60,
  windowMs: number = 60_000
): Response | null {
  const ip = getClientIp(request)
  const { limited, remaining } = rateLimit(ip, limit, windowMs)

  if (limited) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(windowMs / 1000)),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  return null
}
