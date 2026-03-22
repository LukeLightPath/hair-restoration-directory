import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/server'
const ImageManager = dynamic(() => import('@/components/image-manager'))
import type { ListingImage } from '@/lib/types'

export default async function DashboardImagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/dashboard/images')

  /* Fetch claimed listing with images */
  const { data: listing, error } = await supabase
    .from('listings')
    .select(`
      *,
      listing_images(*)
    `)
    .eq('claimed_by', user.id)
    .single()

  if (!listing || error) {
    redirect('/dashboard')
  }

  const images = ((listing.listing_images as ListingImage[] | null) || [])
    .sort((a, b) => a.sort_order - b.sort_order)

  return (
    <ImageManager
      listingId={listing.id}
      listingTitle={listing.title}
      initialImages={images}
      initialLogoUrl={listing.logo_url || null}
    />
  )
}
