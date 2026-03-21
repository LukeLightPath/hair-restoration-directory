'use client'

import { useEffect, useRef } from 'react'
import { pushEvent } from '@/lib/analytics'

interface PageViewTrackerProps {
  listingId: string
}

export default function PageViewTracker({ listingId }: PageViewTrackerProps) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    // Push view_item event to GTM dataLayer for GA4
    pushEvent('view_item', { listing_id: listingId })

    // Track in Supabase internal analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: listingId, event_type: 'page_view' }),
      keepalive: true,
    }).catch(() => { /* analytics is best-effort */ })
  }, [listingId])

  return null
}
