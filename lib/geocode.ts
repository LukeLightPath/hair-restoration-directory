/**
 * Postcode → lat/lng geocoding
 *
 * Phase 1: Uses postcodes.io (free, UK-only, no API key)
 * Phase 2: Swap to Google Geocoding API for international support
 */

interface GeoResult {
  lat: number
  lng: number
}

/** Loose UK postcode pattern — catches most valid formats */
export const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i

/**
 * Geocode a UK postcode to lat/lng coordinates.
 * Returns null if the postcode is invalid or not found.
 */
export async function geocodePostcode(postcode: string): Promise<GeoResult | null> {
  const cleaned = postcode.trim().toUpperCase()

  if (!UK_POSTCODE_RE.test(cleaned)) {
    return null
  }

  try {
    const encoded = encodeURIComponent(cleaned.replace(/\s+/g, ''))
    const res = await fetch(`https://api.postcodes.io/postcodes/${encoded}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours — postcodes don't move
    })

    if (!res.ok) return null

    const data = await res.json()

    if (data.status !== 200 || !data.result) return null

    return {
      lat: data.result.latitude,
      lng: data.result.longitude,
    }
  } catch {
    return null
  }
}
