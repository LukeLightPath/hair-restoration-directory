import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

/* Bot User-Agent patterns — these should not trigger analytics writes */
const BOT_UA_PATTERNS = /bot|crawl|spider|slurp|bingbot|googlebot|yandex|baidu|duckduck|facebookexternalhit|twitterbot|linkedinbot|semrush|ahref|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|anthropic/i

export async function POST(request: NextRequest) {
  try {
    /* ── Skip writes for bots — they inflate analytics and burn IO ── */
    const userAgent = request.headers.get('user-agent') || ''
    if (BOT_UA_PATTERNS.test(userAgent)) {
      return NextResponse.json({ success: true, skipped: 'bot' })
    }

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

    // Step 1: Ensure the row exists (ignore if it already does)
    await supabase
      .from('listing_analytics')
      .upsert(
        {
          listing_id,
          date: today,
          page_views: 0,
          phone_clicks: 0,
          website_clicks: 0,
          inquiry_clicks: 0,
        },
        { onConflict: 'listing_id,date', ignoreDuplicates: true }
      )

    // Step 2: Increment the specific column using raw rpc
    const { error } = await supabase.rpc('increment_analytics', {
      p_listing_id: listing_id,
      p_date: today,
      p_column: column,
    })

    // If RPC fails (function may not exist), fall back to select + update
    if (error) {
      console.warn('RPC increment failed, using fallback:', error.message)

      // Read current value
      const { data: current } = await supabase
        .from('listing_analytics')
        .select(column)
        .eq('listing_id', listing_id)
        .eq('date', today)
        .single()

      const currentVal = (current as Record<string, number> | null)?.[column] || 0

      // Update with incremented value
      const { error: updateError } = await supabase
        .from('listing_analytics')
        .update({ [column]: currentVal + 1 })
        .eq('listing_id', listing_id)
        .eq('date', today)

      if (updateError) {
        console.error('Analytics update error:', updateError)
        return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Analytics API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

