import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

const SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-secret'

/**
 * Generate an HMAC token for a listing ID.
 * This prevents anyone from unsubscribing other listings.
 */
export function generateUnsubscribeToken(listingId: string): string {
  return crypto.createHmac('sha256', SECRET).update(listingId).digest('hex').slice(0, 32)
}

/**
 * Build the full unsubscribe URL for a listing.
 */
export function buildUnsubscribeUrl(listingId: string): string {
  const token = generateUnsubscribeToken(listingId)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'
  return `${baseUrl}/api/unsubscribe?id=${listingId}&token=${token}`
}

/**
 * GET /api/unsubscribe?id=xxx&token=xxx
 * One-click unsubscribe — sets notifications_off = true on the listing.
 * Redirects to a confirmation page.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const token = searchParams.get('token')

  if (!id || !token) {
    return NextResponse.redirect(new URL('/unsubscribed?status=invalid', request.url))
  }

  // Verify token
  const expected = generateUnsubscribeToken(id)
  if (token !== expected) {
    return NextResponse.redirect(new URL('/unsubscribed?status=invalid', request.url))
  }

  // Update the listing
  const supabase = await createServiceClient()
  const { error } = await supabase
    .from('listings')
    .update({ notifications_off: true })
    .eq('id', id)

  if (error) {
    console.error('[Unsubscribe] Failed:', error)
    return NextResponse.redirect(new URL('/unsubscribed?status=error', request.url))
  }

  console.log(`[Unsubscribe] Listing ${id} opted out of notifications`)
  return NextResponse.redirect(new URL('/unsubscribed?status=success', request.url))
}
