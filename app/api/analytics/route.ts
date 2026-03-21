import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listing_id, event_type } = body

    if (!listing_id || !event_type) {
      return NextResponse.json(
        { error: 'Missing required fields: listing_id, event_type' },
        { status: 400 }
      )
    }

    const validEvents = ['page_view', 'phone_click', 'website_click', 'inquiry_click']
    if (!validEvents.includes(event_type)) {
      return NextResponse.json(
        { error: `Invalid event_type. Must be one of: ${validEvents.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()
    const today = new Date().toISOString().split('T')[0]

    // Map event type to column
    const columnMap: Record<string, string> = {
      page_view: 'page_views',
      phone_click: 'phone_clicks',
      website_click: 'website_clicks',
      inquiry_click: 'inquiry_clicks',
    }

    const column = columnMap[event_type]

    // Try upsert
    const { error } = await supabase
      .from('listing_analytics')
      .upsert(
        {
          listing_id,
          date: today,
          [column]: 1,
        },
        { onConflict: 'listing_id,date' }
      )

    if (error) {
      console.error('Analytics upsert error:', error)
      return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
