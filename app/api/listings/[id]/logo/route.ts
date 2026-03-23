import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

/* ── POST: upload or replace clinic logo ── */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  /* Auth + ownership check */
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('id, claimed_by, logo_url')
    .eq('id', id)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }
  if (listing.claimed_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  /* Parse form data */
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: JPEG, PNG, WebP' },
      { status: 400 }
    )
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File too large. Maximum 5 MB' },
      { status: 400 }
    )
  }

  // Use service client for storage + DB writes — ownership already verified
  const svc = await createServiceClient()

  /* Delete old logo from storage if exists */
  if (listing.logo_url) {
    const publicUrlPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/clinic-images/`
    const oldKey = listing.logo_url.replace(publicUrlPrefix, '')
    if (oldKey) {
      await svc.storage.from('clinic-images').remove([oldKey])
    }
  }

  /* Upload new logo */
  const ext = file.name.split('.').pop() || 'png'
  const storagePath = `${id}/logo.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await svc.storage
    .from('clinic-images')
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
  }

  /* Get public URL */
  const { data: urlData } = svc.storage
    .from('clinic-images')
    .getPublicUrl(storagePath)

  /* Update listing */
  const { error: updateError } = await svc
    .from('listings')
    .update({ logo_url: urlData.publicUrl, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ logo_url: urlData.publicUrl }, { status: 201 })
}

/* ── DELETE: remove logo ── */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  /* Auth + ownership check */
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: listing } = await supabase
    .from('listings')
    .select('id, claimed_by, logo_url')
    .eq('id', id)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }
  if (listing.claimed_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Use service client for storage + DB writes — ownership already verified
  const svc = await createServiceClient()

  /* Delete from storage */
  if (listing.logo_url) {
    const publicUrlPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/clinic-images/`
    const oldKey = listing.logo_url.replace(publicUrlPrefix, '')
    if (oldKey) {
      await svc.storage.from('clinic-images').remove([oldKey])
    }
  }

  /* Clear logo_url on listing */
  const { error } = await svc
    .from('listings')
    .update({ logo_url: null, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
