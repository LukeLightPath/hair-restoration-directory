import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const MAX_IMAGES = 10
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function generateId() {
  return crypto.randomUUID()
}

/* ── GET: list images for a listing ── */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('listing_images')
    .select('*')
    .eq('listing_id', id)
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ images: data })
}

/* ── POST: upload a new gallery image ── */
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
    .select('id, claimed_by')
    .eq('id', id)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }
  if (listing.claimed_by !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  /* Check current image count */
  const { count } = await supabase
    .from('listing_images')
    .select('id', { count: 'exact', head: true })
    .eq('listing_id', id)

  if ((count || 0) >= MAX_IMAGES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_IMAGES} images allowed per listing` },
      { status: 400 }
    )
  }

  /* Parse multipart form */
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const altText = (formData.get('alt_text') as string) || null

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

  /* Upload to Supabase Storage */
  const ext = file.name.split('.').pop() || 'jpg'
  const fileName = `${generateId()}.${ext}`
  const storagePath = `${id}/${fileName}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('clinic-images')
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
  }

  /* Get the public URL */
  const { data: urlData } = supabase.storage
    .from('clinic-images')
    .getPublicUrl(storagePath)

  /* Insert into listing_images table */
  const { data: imageRecord, error: insertError } = await supabase
    .from('listing_images')
    .insert({
      listing_id: id,
      storage_path: urlData.publicUrl,
      alt_text: altText,
      sort_order: (count || 0) + 1,
      uploaded_by: user.id,
    })
    .select()
    .single()

  if (insertError) {
    // Clean up uploaded file
    await supabase.storage.from('clinic-images').remove([storagePath])
    return NextResponse.json({ error: `Save failed: ${insertError.message}` }, { status: 500 })
  }

  return NextResponse.json({ image: imageRecord }, { status: 201 })
}
