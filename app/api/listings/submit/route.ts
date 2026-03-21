import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clinic_name, city, street, phone, email, website, description } = body

    if (!clinic_name?.trim() || !city?.trim()) {
      return NextResponse.json(
        { error: 'Clinic name and city are required' },
        { status: 400 }
      )
    }

    // Get user session
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
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const supabase = await createServiceClient()

    // Check for duplicate submissions by same user
    const { data: existing } = await supabase
      .from('listing_submissions')
      .select('id')
      .eq('submitted_by', user.id)
      .eq('status', 'pending')
      .limit(1)

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'You already have a pending submission. Please wait for it to be reviewed.' },
        { status: 409 }
      )
    }

    const { error } = await supabase
      .from('listing_submissions')
      .insert({
        clinic_name: clinic_name.trim(),
        city: city.trim(),
        street: street?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        website: website?.trim() || null,
        description: description?.trim() || null,
        submitted_by: user.id,
      })

    if (error) {
      console.error('Listing submission error:', error)
      return NextResponse.json({ error: 'Failed to submit listing' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Listing submitted for review' })
  } catch (err) {
    console.error('Listing submit API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
