'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Loader2, CheckCircle, Clock, ShieldCheck } from 'lucide-react'
import AddListingForm from './add-listing-form'

interface SearchResult {
  id: string
  title: string
  city: string
  slug: string
  claimed: boolean
  claim_status: string
}

export default function DashboardClaimSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [claimingId, setClaimingId] = useState<string | null>(null)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [claimError, setClaimError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      setSearched(true)
      try {
        const res = await fetch(`/api/listings/search?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  async function handleClaim(listingId: string) {
    setClaimingId(listingId)
    setClaimError('')

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listingId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setClaimError(data.error || 'Failed to submit claim')
        setClaimingId(null)
        return
      }

      setClaimSuccess(true)
    } catch {
      setClaimError('Something went wrong. Please try again.')
      setClaimingId(null)
    }
  }

  if (claimSuccess) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 mb-4">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Claim submitted</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-5">
          Your claim is now being reviewed. We&apos;ll notify you once it&apos;s approved and you can start managing your listing.
        </p>
        <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm font-medium text-amber-700 dark:bg-amber-500/10 dark:border-amber-400/30 dark:text-amber-400">
          <Clock className="h-4 w-4" />
          Pending review
        </div>
      </div>
    )
  }

  if (showAddForm) {
    return (
      <div>
        <button
          onClick={() => setShowAddForm(false)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 flex items-center gap-1"
        >
          ← Back to search
        </button>
        <AddListingForm />
      </div>
    )
  }

  const unclaimedResults = results.filter(r => !r.claimed && r.claim_status === 'none')
  const claimedResults = results.filter(r => r.claimed || r.claim_status !== 'none')

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="text-center mb-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Claim your clinic</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Search for your clinic below to claim it. Once approved, you can manage your profile, upload photos and respond to enquiries.
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by clinic name or city..."
          className="w-full rounded-xl border border-input bg-background pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          autoFocus
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Error */}
      {claimError && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 mb-4">
          <p className="text-sm text-destructive">{claimError}</p>
        </div>
      )}

      {/* Results */}
      {searched && !loading && (
        <div className="space-y-2 mb-4">
          {unclaimedResults.length > 0 ? (
            <>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {unclaimedResults.length} clinic{unclaimedResults.length !== 1 ? 's' : ''} found
              </p>
              {unclaimedResults.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between rounded-xl border border-border p-3.5 transition-all hover:bg-muted/50 hover:border-primary/20"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">{listing.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClaim(listing.id)}
                    disabled={claimingId === listing.id}
                    className="shrink-0 ml-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md disabled:opacity-50 active:scale-[0.97]"
                  >
                    {claimingId === listing.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-3 w-3" />
                    )}
                    {claimingId === listing.id ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">
                {results.length > 0 && claimedResults.length > 0
                  ? 'All matching clinics have already been claimed.'
                  : 'No clinics found matching your search.'}
              </p>
            </div>
          )}

          {/* Already claimed listings (shown but not claimable) */}
          {claimedResults.length > 0 && unclaimedResults.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Already claimed:</p>
              {claimedResults.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 p-3.5 opacity-60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{listing.title}</p>
                      <p className="text-xs text-muted-foreground">{listing.city}</p>
                    </div>
                  </div>
                  <span className="shrink-0 ml-3 text-xs text-muted-foreground font-medium">Claimed</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Can't find your clinic? */}
      {searched && !loading && (
        <div className="border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Can&apos;t find your clinic?</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center justify-center rounded-xl border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 hover:border-primary/40 transition-all"
          >
            Add your clinic
          </button>
        </div>
      )}
    </div>
  )
}
