import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

async function verifyAdmin(request: NextRequest) {
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabaseAuth.auth.getUser()
  if (!user) return null

  const supabase = await createServiceClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') return null
  return user
}

/**
 * GET — Returns all featured clinics, ordered by featured_sort_order.
 */
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from('listings')
      .select('id, title, city, google_rating, featured_sort_order')
      .eq('featured', true)
      .order('featured_sort_order', { ascending: true })

    if (error) {
      console.error('Featured clinics fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch featured clinics' }, { status: 500 })
    }

    return NextResponse.json({ clinics: data || [] })
  } catch (err) {
    console.error('Featured clinics API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * PUT — Replace the full set of featured clinics.
 * Body: { clinics: [{ id: string, featured_sort_order: number }] }
 * Any listing NOT in the array gets featured = false.
 */
export async function PUT(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const clinics: { id: string; featured_sort_order: number }[] = body.clinics || []

    if (clinics.length > 6) {
      return NextResponse.json({ error: 'Maximum 6 featured clinics allowed' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // 1. Un-feature all currently featured listings
    const { error: clearError } = await supabase
      .from('listings')
      .update({ featured: false, featured_sort_order: 0 })
      .eq('featured', true)

    if (clearError) {
      console.error('Error clearing featured:', clearError)
      return NextResponse.json({ error: 'Failed to update featured clinics' }, { status: 500 })
    }

    // 2. Set featured + sort order for each selected clinic
    for (const clinic of clinics) {
      const { error: updateError } = await supabase
        .from('listings')
        .update({ featured: true, featured_sort_order: clinic.featured_sort_order })
        .eq('id', clinic.id)

      if (updateError) {
        console.error(`Error featuring clinic ${clinic.id}:`, updateError)
        return NextResponse.json({ error: `Failed to feature clinic ${clinic.id}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, count: clinics.length })
  } catch (err) {
    console.error('Featured clinics PUT error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
