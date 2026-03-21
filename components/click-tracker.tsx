'use client'

import { useCallback, type ReactNode, type MouseEvent } from 'react'
import { pushEvent } from '@/lib/analytics'

interface ClickTrackerProps {
  listingId: string
  eventType: 'phone_click' | 'website_click' | 'inquiry_click'
  children: ReactNode
  className?: string
}

export default function ClickTracker({ listingId, eventType, children, className }: ClickTrackerProps) {
  const handleClick = useCallback((e: MouseEvent) => {
    // Push to GTM dataLayer for GA4
    pushEvent(eventType, { listing_id: listingId })

    // Fire internal Supabase analytics in the background — don't block the click
    navigator.sendBeacon?.(
      '/api/analytics',
      new Blob(
        [JSON.stringify({ listing_id: listingId, event_type: eventType })],
        { type: 'application/json' }
      )
    ) || fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: listingId, event_type: eventType }),
      keepalive: true,
    }).catch(() => { /* analytics is best-effort */ })
  }, [listingId, eventType])

  return (
    <span onClick={handleClick} className={className}>
      {children}
    </span>
  )
}
