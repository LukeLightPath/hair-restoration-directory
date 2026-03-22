'use client'

import { useState, useEffect, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Loader2, Eye, Globe, Phone, MessageSquare, BarChart3 } from 'lucide-react'

interface AnalyticsRow {
  id: string
  title: string
  city: string
  slug: string
  google_rating: number | null
  google_review_count: number
  claimed: boolean
  page_views: number
  phone_clicks: number
  website_clicks: number
  inquiry_clicks: number
  inquiry_count: number
  total: number
}

type SortKey = 'title' | 'city' | 'page_views' | 'phone_clicks' | 'website_clicks' | 'inquiry_clicks' | 'inquiry_count' | 'total' | 'google_rating'

const DATE_RANGES = [
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
  { label: 'Last 30 days', value: '30days' },
  { label: 'All time', value: 'all' },
]

function getDateRange(range: string) {
  const now = new Date()
  let from = ''
  const to = now.toISOString().split('T')[0]

  switch (range) {
    case 'week': {
      const d = new Date(now)
      d.setDate(d.getDate() - d.getDay() + 1) // Monday
      from = d.toISOString().split('T')[0]
      break
    }
    case 'month': {
      const d = new Date(now.getFullYear(), now.getMonth(), 1)
      from = d.toISOString().split('T')[0]
      break
    }
    case '30days': {
      const d = new Date(now)
      d.setDate(d.getDate() - 30)
      from = d.toISOString().split('T')[0]
      break
    }
    case 'all':
      from = ''
      break
  }

  return { from, to }
}

export default function AdminAnalyticsTable() {
  const [data, setData] = useState<AnalyticsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState('month')
  const [sortKey, setSortKey] = useState<SortKey>('total')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchData()
  }, [dateRange])

  async function fetchData() {
    setLoading(true)
    try {
      const { from, to } = getDateRange(dateRange)
      const params = new URLSearchParams()
      if (from) params.set('from', from)
      if (to) params.set('to', to)

      const res = await fetch(`/api/admin/analytics?${params.toString()}`)
      const json = await res.json()
      setData(json.results || [])
    } catch {
      setData([])
    } finally {
      setLoading(false)
    }
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const filtered = useMemo(() => {
    let rows = [...data]

    // Client-side search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter(r => r.title.toLowerCase().includes(q) || r.city.toLowerCase().includes(q))
    }

    // Sort
    rows.sort((a, b) => {
      const aVal = a[sortKey] ?? 0
      const bVal = b[sortKey] ?? 0
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })

    return rows
  }, [data, search, sortKey, sortOrder])

  // Totals
  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, r) => ({
        page_views: acc.page_views + r.page_views,
        phone_clicks: acc.phone_clicks + r.phone_clicks,
        website_clicks: acc.website_clicks + r.website_clicks,
        inquiry_clicks: acc.inquiry_clicks + r.inquiry_clicks,
        inquiry_count: acc.inquiry_count + r.inquiry_count,
        total: acc.total + r.total,
      }),
      { page_views: 0, phone_clicks: 0, website_clicks: 0, inquiry_clicks: 0, inquiry_count: 0, total: 0 }
    )
  }, [filtered])

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="h-3 w-3 opacity-40" />
    return sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
  }

  const columnHeaders: { key: SortKey; label: string; icon?: React.ElementType; hideOnMobile?: boolean }[] = [
    { key: 'title', label: 'Clinic' },
    { key: 'page_views', label: 'Views', icon: Eye, hideOnMobile: true },
    { key: 'website_clicks', label: 'Web', icon: Globe, hideOnMobile: true },
    { key: 'phone_clicks', label: 'Phone', icon: Phone, hideOnMobile: true },
    { key: 'inquiry_clicks', label: 'Enq clicks', icon: MessageSquare, hideOnMobile: true },
    { key: 'inquiry_count', label: 'Enquiries', hideOnMobile: true },
    { key: 'total', label: 'Total', icon: BarChart3 },
    { key: 'google_rating', label: 'Rating', hideOnMobile: true },
  ]

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clinics..."
            className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
        <div className="flex gap-1.5 rounded-xl border border-input bg-background p-1">
          {DATE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => setDateRange(range.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                dateRange === range.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <Loader2 className="mx-auto h-6 w-6 text-muted-foreground animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {columnHeaders.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors ${
                        col.hideOnMobile ? 'hidden lg:table-cell' : ''
                      }`}
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1.5">
                        {col.icon && <col.icon className="h-3.5 w-3.5" />}
                        <span className="text-xs uppercase tracking-wider">{col.label}</span>
                        <SortIcon column={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground truncate max-w-[200px]">{row.title}</p>
                        <p className="text-xs text-muted-foreground">{row.city}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-mono text-xs">{row.page_views.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-mono text-xs">{row.website_clicks.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-mono text-xs">{row.phone_clicks.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-mono text-xs">{row.inquiry_clicks.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="font-mono text-xs">{row.inquiry_count.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-foreground">{row.total.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {row.google_rating ? (
                        <span className="text-xs">⭐ {row.google_rating} <span className="text-muted-foreground">({row.google_review_count})</span></span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Totals row */}
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/50 font-semibold">
                  <td className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">
                    Totals ({filtered.length} clinics)
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs">{totals.page_views.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs">{totals.website_clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs">{totals.phone_clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs">{totals.inquiry_clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs">{totals.inquiry_count.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-xs">{totals.total.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
