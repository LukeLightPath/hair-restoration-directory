import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/server'
const ListingEditor = dynamic(() => import('@/components/listing-editor'))
import type { ListingServices, ListingSocials } from '@/lib/types'

export default async function DashboardListingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?redirect=/dashboard/listing')

  /* ── Fetch claimed listing with relations ── */
  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      listing_services(*),
      listing_socials(*)
    `)
    .eq('claimed_by', user.id)
    .single()

  if (!listing) {
    redirect('/dashboard')
  }

  const services = (listing.listing_services as ListingServices | null) ?? null
  const socials = (listing.listing_socials as ListingSocials | null) ?? null

  return (
    <ListingEditor
      listing={listing}
      services={services}
      socials={socials}
    />
  )
}
