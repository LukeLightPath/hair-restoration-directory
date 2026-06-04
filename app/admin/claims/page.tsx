import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { ShieldCheck, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'
import AdminClaimActions from '@/components/admin-claim-actions'

export default async function AdminClaimsPage() {
  const supabase = await createServiceClient()

  // Get all listings with non-none claim status
  const { data: pendingClaims } = await supabase
    .from('listings')
    .select('id, title, city, claim_status, claim_requested_by, claim_requested_at, claim_requested_name, claim_requested_email')
    .eq('claim_status', 'pending')
    .order('claim_requested_at', { ascending: false })

  const { data: historyClaims } = await supabase
    .from('listings')
    .select('id, title, city, claim_status, claim_requested_by, claim_requested_at, claimed_by, claim_requested_name, claim_requested_email')
    .in('claim_status', ['approved', 'rejected'])
    .order('claim_requested_at', { ascending: false })
    .limit(50)

  // Get all claimer profiles
  const allClaimerIds = [
    ...(pendingClaims || []).map(c => c.claim_requested_by),
    ...(historyClaims || []).map(c => c.claim_requested_by),
  ].filter(Boolean) as string[]

  const uniqueClaimerIds = [...new Set(allClaimerIds)]

  const { data: profiles } = uniqueClaimerIds.length > 0
    ? await supabase.from('profiles').select('id, full_name').in('id', uniqueClaimerIds)
    : { data: [] }

  // Get email addresses from auth.users via admin API
  // Since we're using service client, we can query auth.users
  const profileMap = new Map((profiles || []).map(p => [p.id, p.full_name || 'Unknown']))

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Claim Requests</h1>
        <p className="text-sm text-muted-foreground">Review and manage clinic ownership claims.</p>
      </div>

      {/* Pending claims */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Pending</h2>
          {(pendingClaims?.length || 0) > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-[20px] rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
              {pendingClaims!.length}
            </span>
          )}
        </div>

        {(!pendingClaims || pendingClaims.length === 0) ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">No pending claims. All clear.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {pendingClaims.map((claim) => (
                <div key={claim.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10">
                      <Clock className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{claim.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{claim.city}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Requested by <span className="font-medium text-foreground/80">{claim.claim_requested_name || profileMap.get(claim.claim_requested_by!) || 'Unknown'}</span>
                        {claim.claim_requested_email && (
                          <> (<span className="font-medium text-foreground/80">{claim.claim_requested_email}</span>)</>)}
                        {claim.claim_requested_at && (
                          <> on {formatDateShort(claim.claim_requested_at)}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="sm:shrink-0 ml-13 sm:ml-0">
                    <AdminClaimActions listingId={claim.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* History */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">History</h2>

        {(!historyClaims || historyClaims.length === 0) ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">No claim history yet.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {historyClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      claim.claim_status === 'approved'
                        ? 'bg-emerald-100 dark:bg-emerald-500/10'
                        : 'bg-red-100 dark:bg-red-500/10'
                    }`}>
                      {claim.claim_status === 'approved'
                        ? <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        : <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{claim.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {claim.city} — {claim.claim_requested_name || profileMap.get(claim.claim_requested_by!) || 'Unknown'}
                        {claim.claim_requested_email && <> ({claim.claim_requested_email})</>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      claim.claim_status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}>
                      {claim.claim_status}
                    </span>
                    {claim.claim_requested_at && (
                      <span className="text-[10px] text-muted-foreground hidden sm:inline">{formatDateShort(claim.claim_requested_at)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
