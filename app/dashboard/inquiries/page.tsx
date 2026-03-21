import { createClient } from '@/lib/supabase/server'
import { formatDateShort } from '@/lib/utils'
import { Mail, Phone, MessageSquare } from 'lucide-react'

export default async function InquiriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's claimed listing
  const { data: listing } = await supabase
    .from('listings')
    .select('id, title')
    .eq('claimed_by', user!.id)
    .single()

  if (!listing) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
        <h1 className="text-xl font-semibold text-foreground mb-2">No listing claimed</h1>
        <p className="text-sm text-muted-foreground">Claim your listing to start receiving inquiries.</p>
      </div>
    )
  }

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .eq('listing_id', listing.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground mb-2">Inquiries</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {inquiries?.length || 0} enquir{(inquiries?.length || 0) !== 1 ? 'ies' : 'y'} for {listing.title}
      </p>

      {(!inquiries || inquiries.length === 0) ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/50 p-8 text-center">
          <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No inquiries yet. They will appear here when visitors contact you.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-card-foreground">{inq.name}</p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {inq.email}
                    </span>
                    {inq.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {inq.phone}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{formatDateShort(inq.created_at)}</span>
              </div>
              {inq.message && (
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  {inq.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
