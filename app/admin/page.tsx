import { createClient } from '@/lib/supabase/server'
import { Eye, Globe, Phone, MessageSquare, FileText, ShieldCheck, Clock, Users } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'

export default async function AdminOverviewPage() {
  const supabase = await createClient()

  // Total listings
  const { count: totalListings } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })

  // Claimed listings
  const { count: claimedListings } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('claimed', true)

  // Pending claims
  const { count: pendingClaims } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('claim_status', 'pending')

  // This month date range
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const startDate = startOfMonth.toISOString().split('T')[0]

  // Monthly analytics aggregate
  const { data: monthlyAnalytics } = await supabase
    .from('listing_analytics')
    .select('page_views, phone_clicks, website_clicks, inquiry_clicks')
    .gte('date', startDate)

  const monthViews = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.page_views || 0), 0)
  const monthWebsiteClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.website_clicks || 0), 0)
  const monthPhoneClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.phone_clicks || 0), 0)
  const monthInquiryClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.inquiry_clicks || 0), 0)

  // Total enquiries this month
  const { count: monthlyInquiries } = await supabase
    .from('inquiries')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString())

  // Total registered users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })

  // Recent claim requests
  const { data: recentClaims } = await supabase
    .from('listings')
    .select('id, title, city, claim_status, claim_requested_at, claim_requested_by')
    .neq('claim_status', 'none')
    .order('claim_requested_at', { ascending: false })
    .limit(8)

  // Get claimer profiles
  const claimerIds = (recentClaims || [])
    .map(c => c.claim_requested_by)
    .filter(Boolean) as string[]

  const { data: claimerProfiles } = claimerIds.length > 0
    ? await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', claimerIds)
    : { data: [] }

  const profileMap = new Map((claimerProfiles || []).map(p => [p.id, p.full_name]))

  // Recent enquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('id, name, email, listing_id, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get listing names for recent inquiries
  const inquiryListingIds = (recentInquiries || []).map(i => i.listing_id).filter(Boolean)
  const { data: inquiryListings } = inquiryListingIds.length > 0
    ? await supabase
        .from('listings')
        .select('id, title')
        .in('id', inquiryListingIds)
    : { data: [] }

  const listingNameMap = new Map((inquiryListings || []).map(l => [l.id, l.title]))

  const stats = [
    { label: 'Total Listings', value: totalListings || 0, icon: FileText, color: 'text-blue-500', gradient: 'from-blue-500/10 to-blue-500/5' },
    { label: 'Claimed', value: claimedListings || 0, icon: ShieldCheck, color: 'text-emerald-500', gradient: 'from-emerald-500/10 to-emerald-500/5' },
    { label: 'Pending Claims', value: pendingClaims || 0, icon: Clock, color: 'text-amber-500', gradient: 'from-amber-500/10 to-amber-500/5' },
    { label: 'Registered Users', value: totalUsers || 0, icon: Users, color: 'text-purple-500', gradient: 'from-purple-500/10 to-purple-500/5' },
  ]

  const trafficStats = [
    { label: 'Page Views', value: monthViews, icon: Eye, color: 'text-blue-500', gradient: 'from-blue-500/10 to-blue-500/5' },
    { label: 'Website Clicks', value: monthWebsiteClicks, icon: Globe, color: 'text-emerald-500', gradient: 'from-emerald-500/10 to-emerald-500/5' },
    { label: 'Phone Clicks', value: monthPhoneClicks, icon: Phone, color: 'text-amber-500', gradient: 'from-amber-500/10 to-amber-500/5' },
    { label: 'Enquiries', value: monthlyInquiries || 0, icon: MessageSquare, color: 'text-primary', gradient: 'from-primary/10 to-primary/5' },
  ]

  return (
    <>
      {/* Welcome banner */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-lg shadow-amber-500/5">
        <div className="relative p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #92400E 0%, #78350F 50%, #451A03 100%)' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative">
            <h1 className="text-2xl font-bold text-white mb-1">
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-sm">
              Directory overview and management tools.
            </p>
          </div>
        </div>
      </div>

      {/* Directory stats */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Directory</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{stat.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic stats (this month) */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">This Month</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trafficStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-card-foreground">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent claims */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">Recent Claim Activity</h2>
          </div>
          {(!recentClaims || recentClaims.length === 0) ? (
            <div className="p-8 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No claim activity yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{claim.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {claim.city} — {profileMap.get(claim.claim_requested_by!) || 'Unknown user'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      claim.claim_status === 'pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        : claim.claim_status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}>
                      {claim.claim_status}
                    </span>
                    {claim.claim_requested_at && (
                      <span className="text-[10px] text-muted-foreground">{formatDateShort(claim.claim_requested_at)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent enquiries */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">Recent Enquiries</h2>
          </div>
          {(!recentInquiries || recentInquiries.length === 0) ? (
            <div className="p-8 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">No enquiries yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {inq.name.split(' ').map((w: string) => w[0]?.toUpperCase()).slice(0, 2).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{inq.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        → {listingNameMap.get(inq.listing_id) || 'Unknown clinic'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-3">{formatDateShort(inq.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
