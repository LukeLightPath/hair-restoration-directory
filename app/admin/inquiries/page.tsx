import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Mail, Phone, Globe, Search, Download } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1'))
  const perPage = 25
  const search = params.search || ''
  const from = (page - 1) * perPage

  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('inquiries')
    .select('id, name, email, phone, message, listing_id, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + perPage - 1)

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: inquiries, count } = await query

  // Get listing info for all inquiries
  const listingIds = [...new Set((inquiries || []).map(i => i.listing_id).filter(Boolean))]
  const { data: listings } = listingIds.length > 0
    ? await supabase
        .from('listings')
        .select('id, title, city, email, phone, notifications_off')
        .in('id', listingIds)
    : { data: [] }

  const listingMap = new Map((listings || []).map(l => [l.id, l]))

  const totalPages = Math.ceil((count || 0) / perPage)

  // Stats
  const { count: totalInquiries } = await supabase
    .from('inquiries')
    .select('id', { count: 'exact', head: true })

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: monthlyInquiries } = await supabase
    .from('inquiries')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString())

  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - 7)

  const { count: weeklyInquiries } = await supabase
    .from('inquiries')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfWeek.toISOString())

  function getDeliveryStatus(listing: { email: string | null; phone: string | null; notifications_off: boolean | null } | undefined) {
    if (!listing) return { label: 'Unknown', style: 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400' }
    if (listing.notifications_off) return { label: 'Opted out', style: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' }
    if (listing.email) return { label: 'Emailed', style: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' }
    if (listing.phone) return { label: 'Texted', style: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' }
    return { label: 'Not delivered', style: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' }
  }

  const stats = [
    { label: 'Total Leads', value: totalInquiries || 0, icon: MessageSquare, color: 'text-blue-500', gradient: 'from-blue-500/10 to-blue-500/5' },
    { label: 'This Month', value: monthlyInquiries || 0, icon: Mail, color: 'text-emerald-500', gradient: 'from-emerald-500/10 to-emerald-500/5' },
    { label: 'Last 7 Days', value: weeklyInquiries || 0, icon: Phone, color: 'text-amber-500', gradient: 'from-amber-500/10 to-amber-500/5' },
  ]

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            All leads submitted through the enquiry form.
          </p>
        </div>
        <Link
          href="/api/admin/export-inquiries"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
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

      {/* Search + table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <form className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
            />
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lead</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clinic</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Message</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(!inquiries || inquiries.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
                    <p className="text-sm text-muted-foreground">No enquiries found.</p>
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => {
                  const listing = listingMap.get(inq.listing_id)
                  const status = getDeliveryStatus(listing)
                  const initials = inq.name.split(' ').map((w: string) => w[0]?.toUpperCase()).slice(0, 2).join('')

                  return (
                    <tr key={inq.id} className="hover:bg-muted/20 transition-colors">
                      {/* Lead info */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-card-foreground truncate">{inq.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <a href={`mailto:${inq.email}`} className="hover:text-primary transition-colors truncate">{inq.email}</a>
                              {inq.phone && (
                                <>
                                  <span className="text-border">·</span>
                                  <a href={`tel:${inq.phone}`} className="hover:text-primary transition-colors whitespace-nowrap">{inq.phone}</a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Clinic */}
                      <td className="px-4 py-3">
                        {listing ? (
                          <div className="min-w-0">
                            <Link
                              href={`/admin/listings/${inq.listing_id}`}
                              className="text-sm font-medium text-card-foreground hover:text-primary transition-colors truncate block"
                            >
                              {listing.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">{listing.city}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Unknown</span>
                        )}
                      </td>

                      {/* Message */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {inq.message ? (
                          <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">{inq.message}</p>
                        ) : (
                          <span className="text-xs text-muted-foreground/50 italic">No message</span>
                        )}
                      </td>

                      {/* Delivery status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${status.style}`}>
                          {status.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateShort(inq.created_at)}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {from + 1}–{Math.min(from + perPage, count || 0)} of {count?.toLocaleString()} results
            </p>
            <div className="flex gap-1">
              {page > 1 && (
                <Link
                  href={`/admin/inquiries?page=${page - 1}${search ? `&search=${search}` : ''}`}
                  className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted transition-colors"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/inquiries?page=${page + 1}${search ? `&search=${search}` : ''}`}
                  className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
