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

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin(request)
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = 50
    const offset = (page - 1) * limit

    const supabase = await createServiceClient()

    let query = supabase
      .from('listings')
      .select('id, title, city, slug, claimed, claim_status, google_rating, treatment_category, business_status', { count: 'exact' })
      .order('title', { ascending: true })
      .range(offset, offset + limit - 1)

    if (search) {
      query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Admin listings query error:', error)
      return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
    }

    return NextResponse.json({
      results: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (err) {
    console.error('Admin listings API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
