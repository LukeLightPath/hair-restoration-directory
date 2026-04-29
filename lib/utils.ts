/**
 * Shared utility functions
 */

/** Generate a URL-safe slug from title and city */
export function slugify(title: string, city: string): string {
  return `${title}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Slugify a city name for use in URLs */
export function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Convert a city slug back to display format */
export function cityFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Format a date string to a readable format */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Format a date string to a short format */
export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Render star rating as filled/empty stars */
export function renderStars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

/** Truncate text to a given length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/** Get the site URL, works in both server and client */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'
}

/** Build full canonical URL for a path */
export function canonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/+$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${cleanPath}`
}

/** cn() — merge class names conditionally */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Resolve a city slug back to its exact database name by fetching all
 * distinct cities and matching against their slugified form.
 *
 * This handles hyphenated cities (Weston-super-Mare, Stoke-on-Trent, etc.)
 * that cityFromSlug() cannot reverse correctly because hyphens are ambiguous
 * in URL slugs.
 */
export async function resolveCityFromSlug(
  supabase: { from: (table: string) => any },
  slug: string
): Promise<string | null> {
  const { data: rows } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  if (!rows || rows.length === 0) return null

  const uniqueCities = Array.from<string>(new Set(rows.map((r: { city: string }) => r.city)))
  return uniqueCities.find(city => citySlug(city) === slug) ?? null
}
