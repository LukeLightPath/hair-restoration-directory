import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // Check admin auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Fetch all inquiries with listing info
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('id, name, email, phone, message, listing_id, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }

  // Get listing names
  const listingIds = [...new Set((inquiries || []).map(i => i.listing_id).filter(Boolean))]
  const { data: listings } = listingIds.length > 0
    ? await supabase
        .from('listings')
        .select('id, title, city, email, phone')
        .in('id', listingIds)
    : { data: [] }

  const listingMap = new Map((listings || []).map(l => [l.id, l]))

  // Build CSV
  function esc(val: string | null | undefined): string {
    if (val == null) return ''
    const str = String(val)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const headers = ['Date', 'Lead Name', 'Lead Email', 'Lead Phone', 'Clinic', 'City', 'Clinic Email', 'Clinic Phone', 'Message']
  const rows = (inquiries || []).map(inq => {
    const listing = listingMap.get(inq.listing_id)
    return [
      new Date(inq.created_at).toISOString().split('T')[0],
      esc(inq.name),
      esc(inq.email),
      esc(inq.phone),
      esc(listing?.title),
      esc(listing?.city),
      esc(listing?.email),
      esc(listing?.phone),
      esc(inq.message),
    ].join(',')
  })

  const csv = [headers.join(','), ...rows].join('\n')
  const date = new Date().toISOString().split('T')[0]

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="inquiries-${date}.csv"`,
    },
  })
}
