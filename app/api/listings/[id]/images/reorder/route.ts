import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/* ── PUT: reorder gallery images ── */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

  /* Parse body */
  const { imageIds } = await req.json() as { imageIds: string[] }

  if (!Array.isArray(imageIds) || imageIds.length === 0) {
    return NextResponse.json({ error: 'imageIds array required' }, { status: 400 })
  }

  /* Update sort_order for each image */
  const errors: string[] = []
  for (let i = 0; i < imageIds.length; i++) {
    const { error } = await supabase
      .from('listing_images')
      .update({ sort_order: i + 1 })
      .eq('id', imageIds[i])
      .eq('listing_id', id)

    if (error) errors.push(error.message)
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join('; ') }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
