import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { citySlug } from '@/lib/utils'
import { TREATMENTS } from '@/lib/types'

export async function GET() {
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hairrestorationguide.com'

  // Fetch cities from listings
  const { data: listings } = await supabase
    .from('listings')
    .select('city')
    .eq('business_status', 'OPERATIONAL')

  const cities = [...new Set((listings || []).map((l) => l.city))].sort()

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const enabledTreatments = TREATMENTS.filter((t) => t.enabled)

  const markdown = `# Hair Restoration Guide

> The UK's largest independent directory of non-surgical hair restoration clinics. Compare 400+ clinics across ${cities.length} cities. Check real Google reviews, compare services and book free consultations. Covers hair systems, scalp micropigmentation (SMP), wigs, extensions, PRP, trichology, laser therapy and more.

Hair Restoration Guide is a free-to-use directory that helps people experiencing hair loss find reputable clinics near them. It is not a clinic and does not provide treatments directly. All clinics listed are real UK businesses with verified Google Business profiles.

## Directory Pages

- [UK Clinic Directory](${baseUrl}/uk): Browse all clinics by city
- [Treatment Finder](${baseUrl}/treatments): Find clinics by treatment type
- [Search](${baseUrl}/search): Full-text search across all listings
${cities.map((city) => `- [${city} Clinics](${baseUrl}/uk/${citySlug(city)}): Hair clinics in ${city}`).join('\n')}

## Treatment Pages

${enabledTreatments.map((t) => `- [${t.label}](${baseUrl}/treatments/${t.slug}): ${t.shortDescription}`).join('\n')}

## Guides

- [Hair Systems Guide](${baseUrl}/guides/hair-systems): Complete guide to non-surgical hair replacement systems
- [SMP Guide](${baseUrl}/guides/scalp-micropigmentation): Guide to scalp micropigmentation
- [Wigs Guide](${baseUrl}/guides/wigs): Guide to custom and ready-to-wear wigs
- [Extensions Guide](${baseUrl}/guides/extensions): Guide to professional hair extensions
- [PRP Guide](${baseUrl}/guides/prp-treatment): Guide to platelet-rich plasma therapy
- [Trichology Guide](${baseUrl}/guides/trichology): Guide to trichology services
- [Laser Therapy Guide](${baseUrl}/guides/laser-therapy): Guide to low-level laser therapy
- [Fitting Service Guide](${baseUrl}/guides/fitting-service): Guide to hair system fitting
- [Hair Toppers Guide](${baseUrl}/guides/hair-toppers): Guide to hair toppers
- [Hair Integration Guide](${baseUrl}/guides/hair-integration): Guide to hair integration systems
- [Cranial Prosthesis Guide](${baseUrl}/guides/cranial-prosthesis): Guide to medical-grade hair prosthetics

## Blog

${(posts || []).map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug})`).join('\n')}

## Optional

- [About Us](${baseUrl}/about): About Hair Restoration Guide
- [For Clinics](${baseUrl}/for-clinics): Information for clinic owners
- [Contact](${baseUrl}/contact): Get in touch
- [Privacy Policy](${baseUrl}/privacy): Privacy and data handling
- [Terms of Service](${baseUrl}/terms): Terms and conditions
`

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
