/**
 * Push an event to the GTM dataLayer.
 * Safe to call server-side or when GTM is not loaded — silently no-ops.
 */
export function pushEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null>
) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
