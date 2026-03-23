import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

/* ── DELETE: remove a specific gallery image ── */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const { id, imageId } = await params
  const supabase = await createClient()

  /* Auth check */
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  /* Ownership check */
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

  // Use service client for storage + DB writes — ownership already verified
  const svc = await createServiceClient()

  /* Get the image record to find storage path */
  const { data: image } = await svc
    .from('listing_images')
    .select('id, storage_path')
    .eq('id', imageId)
    .eq('listing_id', id)
    .single()

  if (!image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  /* Extract the storage key from the full public URL */
  const publicUrlPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/clinic-images/`
  const storageKey = image.storage_path.replace(publicUrlPrefix, '')

  /* Delete from storage */
  if (storageKey) {
    await svc.storage.from('clinic-images').remove([storageKey])
  }

  /* Delete from database */
  const { error } = await svc
    .from('listing_images')
    .delete()
    .eq('id', imageId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
