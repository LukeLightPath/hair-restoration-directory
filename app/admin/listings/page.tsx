'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ListingRow {
  id: string
  title: string
  city: string
  slug: string
  claimed: boolean
  claim_status: string
  google_rating: number | null
  treatment_category: string | null
  business_status: string
}

const TREATMENT_LABELS: Record<string, string> = {
  'Cosmetic Systems': 'Hair Replacement',
  'Advanced Scalp Therapies': 'Scalp Treatments',
  'Both': 'Full Service',
  'Wig Specialist': 'Wig Specialist',
  'General Salon': 'General Salon',
}

export default function AdminListingsPage() {
  const [data, setData] = useState<ListingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    fetchData()
  }, [debouncedSearch, page])

  async function fetchData() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString() })
      if (debouncedSearch) params.set('search', debouncedSearch)

      const res = await fetch(`/api/admin/listings?${params.toString()}`)
      const json = await res.json()
      setData(json.results || [])
      setTotalPages(json.totalPages || 1)
      setTotal(json.total || 0)
    } catch {
      setData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">All Listings</h1>
        <p className="text-sm text-muted-foreground">Search and edit any listing in the directory.</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by clinic name or city..."
          className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        {loading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-3">{total.toLocaleString()} listings found</p>

      {/* Listing table */}
      {loading && data.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <Loader2 className="mx-auto h-6 w-6 text-muted-foreground animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Loading listings...</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="divide-y divide-border">
            {data.map((listing) => (
              <Link
                key={listing.id}
                href={`/admin/listings/${listing.id}`}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <MapPin className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{listing.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">{listing.city}</span>
                      {listing.treatment_category && (
                        <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {TREATMENT_LABELS[listing.treatment_category] || listing.treatment_category}
                        </span>
                      )}
                      {listing.google_rating && (
                        <span className="text-[10px] text-muted-foreground">⭐ {listing.google_rating}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {listing.business_status !== 'OPERATIONAL' && (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400">
                      Closed
                    </span>
                  )}
                  {listing.claimed ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <ShieldCheck className="h-2.5 w-2.5" />
                      Claimed
                    </span>
                  ) : listing.claim_status === 'pending' ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                      Pending
                    </span>
                  ) : null}
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  page <= 1
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <ChevronLeft className="h-3 w-3" />
                Previous
              </button>
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  page >= totalPages
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
