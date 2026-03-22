import { createServiceClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
const AdminListingEditor = dynamic(() => import('@/components/admin-listing-editor'))

export default async function AdminEditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServiceClient()

  // Get listing with all relations
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (!listing) {
    notFound()
  }

  const { data: services } = await supabase
    .from('listing_services')
    .select('*')
    .eq('listing_id', id)
    .single()

  const { data: socials } = await supabase
    .from('listing_socials')
    .select('*')
    .eq('listing_id', id)
    .single()

  return (
    <>
      <Link
        href="/admin/listings"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to listings
      </Link>

      <AdminListingEditor
        listing={listing}
        services={services}
        socials={socials}
      />
    </>
  )
}
