import { createClient } from '@/lib/supabase/server'
import { FileText, MessageSquare, Eye, Globe, Phone, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatDateShort } from '@/lib/utils'
import DashboardClaimSearch from '@/components/dashboard-claim-search'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single()

  // Get user's claimed listing
  const { data: listing } = await supabase
    .from('listings')
    .select('id, title, city, slug, google_rating, google_review_count')
    .eq('claimed_by', user!.id)
    .single()

  // Get recent inquiries
  const { data: recentInquiries } = listing
    ? await supabase
        .from('inquiries')
        .select('id, name, email, created_at')
        .eq('listing_id', listing.id)
        .order('created_at', { ascending: false })
        .limit(5)
    : { data: [] }

  // Get total inquiry count
  const { count: totalInquiries } = listing
    ? await supabase
        .from('inquiries')
        .select('id', { count: 'exact', head: true })
        .eq('listing_id', listing.id)
    : { count: 0 }

  // Get this month's analytics
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: monthlyAnalytics } = listing
    ? await supabase
        .from('listing_analytics')
        .select('page_views, phone_clicks, website_clicks, inquiry_clicks')
        .eq('listing_id', listing.id)
        .gte('date', startOfMonth.toISOString().split('T')[0])
    : { data: [] }

  const monthViews = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.page_views || 0), 0)
  const monthWebsiteClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.website_clicks || 0), 0)
  const monthPhoneClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.phone_clicks || 0), 0)
  const monthInquiryClicks = (monthlyAnalytics || []).reduce((sum, a) => sum + (a.inquiry_clicks || 0), 0)

  const firstName = (profile?.full_name || 'there').split(' ')[0]

  return (
    <>
      {/* Welcome card */}
      <div className="rounded-2xl overflow-hidden mb-8 shadow-lg shadow-primary/5">
        <div className="relative p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #2F6364 0%, #1A4344 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="relative">
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-white/70 text-sm">
              Here&apos;s how your listing is performing this month.
            </p>
          </div>
        </div>
      </div>

      {!listing ? (
        <DashboardClaimSearch />
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Profile Visits', value: monthViews, icon: Eye, color: 'text-blue-500', gradient: 'from-blue-500/10 to-blue-500/5' },
              { label: 'Website Clicks', value: monthWebsiteClicks, icon: Globe, color: 'text-emerald-500', gradient: 'from-emerald-500/10 to-emerald-500/5' },
              { label: 'Phone Clicks', value: monthPhoneClicks, icon: Phone, color: 'text-amber-500', gradient: 'from-amber-500/10 to-amber-500/5' },
              { label: 'Enquiry Clicks', value: monthInquiryClicks, icon: MessageSquare, color: 'text-primary', gradient: 'from-primary/10 to-primary/5' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </div>
            ))}
          </div>

          {/* Listing info */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">{listing.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{listing.city}</p>
                {listing.google_rating && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ⭐ {listing.google_rating} ({listing.google_review_count} reviews)
                  </p>
                )}
              </div>
              <Link
                href="/dashboard/listing"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/15 transition-colors"
              >
                Edit listing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent inquiries */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">Recent Enquiries</h2>
              <Link
                href="/dashboard/inquiries"
                className="text-sm font-medium text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {(!recentInquiries || recentInquiries.length === 0) ? (
              <div className="p-8 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No enquiries yet. They&apos;ll appear here when clients reach out.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {inq.name.split(' ').map((w: string) => w[0]?.toUpperCase()).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{inq.name}</p>
                        <p className="text-xs text-muted-foreground">{inq.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDateShort(inq.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
