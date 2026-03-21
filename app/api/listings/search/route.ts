import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }

  const supabase = await createClient()

  // Require auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, title, city, slug, claimed, claim_status')
    .eq('business_status', 'OPERATIONAL')
    .or(`title.ilike.%${q}%,city.ilike.%${q}%`)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .limit(10)

  if (error) {
    console.error('Listing search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  return NextResponse.json({ results: listings || [] })
}
