import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { citySlug } from '@/lib/utils'
import { TREATMENTS } from '@/lib/types'

export async function GET() {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

  // Fetch cities with clinic counts
  const { data: listings } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')
    .eq('hidden', false)

  const cityMap = new Map<string, number>()
  for (const l of listings || []) {
    cityMap.set(l.city, (cityMap.get(l.city) || 0) + 1)
  }
  const sortedCities = [...cityMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const enabledTreatments = TREATMENTS.filter((t) => t.enabled)
  const totalClinics = (listings || []).length

  const markdown = `# Hair Restoration Guide — Full Context

> The UK's largest independent directory of non-surgical hair restoration clinics. ${totalClinics} clinics across ${sortedCities.length} cities. Free to use for consumers. Clinics are listed at no cost. Revenue model is based on premium features for claimed listings.

## About

Hair Restoration Guide is an independent UK directory that helps people experiencing hair loss find reputable non-surgical clinics near them. It covers treatments including hair systems, scalp micropigmentation (SMP), wigs, extensions, PRP therapy, trichology, laser therapy, hair toppers, hair integration and cranial prosthetics.

The directory is not a clinic and does not provide treatments directly. All clinics listed are real UK businesses with verified Google Business profiles. The directory aggregates Google ratings, review counts, opening hours, services offered, pricing tiers and contact details.

Key features:
- Free clinic search and comparison for consumers
- Google review data and ratings displayed for every listing
- Filter by treatment type, city, gender focus and pricing tier
- Inquiry form delivers leads directly to clinic email at no cost
- Clinic owners can claim and manage their free listing
- Treatment guides explain each hair restoration option in plain language

## Treatments Covered

${enabledTreatments.map((t) => `### ${t.label}

${t.seoDescription}

- Treatment page: [${t.label}](${baseUrl}/treatments/${t.slug})
- Guide: [${t.label} Guide](${baseUrl}/guides/${t.slug})
`).join('\n')}

## Cities Covered

The directory covers clinics in the following UK cities:

${sortedCities.map(([city, count]) => `- [${city}](${baseUrl}/uk/${citySlug(city)}): ${count} clinic${count !== 1 ? 's' : ''}`).join('\n')}

## Blog Posts

${(posts || []).map((p) => `### ${p.title}

${p.excerpt || ''}

- [Read full article](${baseUrl}/blog/${p.slug})
`).join('\n')}

## Directory Structure

- Homepage: [${baseUrl}](${baseUrl})
- UK Directory: [${baseUrl}/uk](${baseUrl}/uk)
- Treatments: [${baseUrl}/treatments](${baseUrl}/treatments)
- Guides: [${baseUrl}/guides](${baseUrl}/guides)
- Blog: [${baseUrl}/blog](${baseUrl}/blog)
- Search: [${baseUrl}/search](${baseUrl}/search)
- For Clinics: [${baseUrl}/for-clinics](${baseUrl}/for-clinics)
- About: [${baseUrl}/about](${baseUrl}/about)
- Contact: [${baseUrl}/contact](${baseUrl}/contact)

## URL Structure

Listing URLs follow the pattern: \`/uk/{city-slug}/{clinic-slug}\`
Treatment URLs follow the pattern: \`/treatments/{treatment-slug}\`
Treatment + City URLs follow the pattern: \`/treatments/{treatment-slug}/{city-slug}\`
City URLs follow the pattern: \`/uk/{city-slug}\`
Blog URLs follow the pattern: \`/blog/{post-slug}\`
Guide URLs follow the pattern: \`/guides/{treatment-slug}\`
`

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
