import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('full_name, phone, notification_email, notification_phone, email_notifications_on, sms_notifications_on')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('[Profile GET] Error:', error)
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }

  return NextResponse.json({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    notification_email: profile?.notification_email || '',
    notification_phone: profile?.notification_phone || '',
    email_notifications_on: profile?.email_notifications_on ?? true,
    sms_notifications_on: profile?.sms_notifications_on ?? true,
    auth_email: user.email || '',
  })
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const {
    full_name,
    notification_email,
    notification_phone,
    email_notifications_on,
    sms_notifications_on,
  } = body

  // Validate email format if provided
  if (notification_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notification_email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }

  // Validate phone format if provided (basic UK check)
  if (notification_phone) {
    const digits = notification_phone.replace(/[\s\-()]/g, '')
    if (!/^(\+?44|0)\d{9,10}$/.test(digits)) {
      return NextResponse.json({ error: 'Invalid UK phone number' }, { status: 400 })
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: full_name || null,
      notification_email: notification_email || null,
      notification_phone: notification_phone || null,
      email_notifications_on: email_notifications_on ?? true,
      sms_notifications_on: sms_notifications_on ?? true,
    })
    .eq('id', user.id)

  if (error) {
    console.error('[Profile PUT] Error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
