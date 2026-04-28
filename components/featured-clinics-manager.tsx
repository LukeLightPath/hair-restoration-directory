'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Award, Search, Loader2, X, ChevronUp, ChevronDown,
  Save, CheckCircle, AlertCircle, Star, MapPin, Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedClinic {
  id: string
  title: string
  city: string
  google_rating: number | null
  featured_sort_order: number
}

interface SearchResult {
  id: string
  title: string
  city: string
  google_rating: number | null
}

const MAX_FEATURED = 6

export default function FeaturedClinicsManager() {
  const [clinics, setClinics] = useState<FeaturedClinic[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [dirty, setDirty] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Load featured clinics on mount
  useEffect(() => {
    fetchFeatured()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function fetchFeatured() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/featured')
      const json = await res.json()
      setClinics(json.clinics || [])
    } catch {
      setClinics([])
    } finally {
      setLoading(false)
    }
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await fetch(`/api/admin/listings?search=${encodeURIComponent(value)}&page=1`)
        const json = await res.json()
        const results: SearchResult[] = (json.results || []).map((r: SearchResult) => ({
          id: r.id,
          title: r.title,
          city: r.city,
          google_rating: r.google_rating,
        }))
        // Filter out already-featured clinics
        const featuredIds = new Set(clinics.map(c => c.id))
        setSearchResults(results.filter(r => !featuredIds.has(r.id)))
        setShowDropdown(true)
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
  }

  function addClinic(result: SearchResult) {
    if (clinics.length >= MAX_FEATURED) return

    const newClinic: FeaturedClinic = {
      ...result,
      featured_sort_order: clinics.length + 1,
    }
    setClinics(prev => [...prev, newClinic])
    setDirty(true)
    setSearchQuery('')
    setSearchResults([])
    setShowDropdown(false)
  }

  function removeClinic(id: string) {
    setClinics(prev => {
      const filtered = prev.filter(c => c.id !== id)
      // Recalculate sort orders
      return filtered.map((c, i) => ({ ...c, featured_sort_order: i + 1 }))
    })
    setDirty(true)
  }

  function moveClinic(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= clinics.length) return

    setClinics(prev => {
      const arr = [...prev]
      const temp = arr[index]
      arr[index] = arr[newIndex]
      arr[newIndex] = temp
      return arr.map((c, i) => ({ ...c, featured_sort_order: i + 1 }))
    })
    setDirty(true)
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/featured', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinics: clinics.map(c => ({
            id: c.id,
            featured_sort_order: c.featured_sort_order,
          })),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      setFeedback({ type: 'success', message: 'Featured clinics updated. Homepage will reflect changes on next visit.' })
      setDirty(false)
      setTimeout(() => setFeedback(null), 5000)
    } catch (err) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center" id="featured">
        <Loader2 className="mx-auto h-6 w-6 text-muted-foreground animate-spin mb-2" />
        <p className="text-sm text-muted-foreground">Loading featured clinics...</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden" id="featured">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5">
            <Award className="h-4.5 w-4.5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Featured Clinics</h2>
            <p className="text-xs text-muted-foreground">
              These clinics appear in the &quot;Top-Rated Clinics&quot; section on the homepage.
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-muted-foreground rounded-full bg-muted px-2.5 py-1">
          {clinics.length}/{MAX_FEATURED}
        </span>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={cn(
            'flex items-center gap-2 px-5 py-3 text-sm font-medium border-b',
            feedback.type === 'success'
              ? 'bg-success/5 text-success border-success/10'
              : 'bg-destructive/5 text-destructive border-destructive/10'
          )}
        >
          {feedback.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {feedback.message}
        </div>
      )}

      {/* Search to add */}
      {clinics.length < MAX_FEATURED && (
        <div className="p-5 border-b border-border" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search clinics to add..."
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />}

            {/* Search dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card shadow-xl z-50 max-h-64 overflow-auto">
                {searchResults.map(result => (
                  <button
                    key={result.id}
                    onClick={() => addClinic(result)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground">{result.city}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {result.google_rating && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          {result.google_rating}
                        </span>
                      )}
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showDropdown && searchQuery && !searching && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card shadow-xl z-50 p-4 text-center">
                <p className="text-sm text-muted-foreground">No clinics found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      )}

      {clinics.length >= MAX_FEATURED && (
        <div className="px-5 py-3 border-b border-border bg-amber-50/50 dark:bg-amber-500/5">
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Maximum of {MAX_FEATURED} featured clinics reached. Remove one to add another.
          </p>
        </div>
      )}

      {/* Featured list */}
      {clinics.length === 0 ? (
        <div className="p-8 text-center">
          <Award className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
          <p className="text-sm text-muted-foreground">No featured clinics yet. Use the search above to add some.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {clinics.map((clinic, index) => (
            <div
              key={clinic.id}
              className="flex items-center gap-3 px-5 py-3.5 group hover:bg-muted/30 transition-colors"
            >
              {/* Position number */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white text-xs font-bold shadow-sm">
                {index + 1}
              </span>

              {/* Clinic info */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{clinic.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {clinic.city}
                  </span>
                  {clinic.google_rating && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      {clinic.google_rating}
                    </span>
                  )}
                </div>
              </div>

              {/* Reorder + remove controls */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveClinic(index, 'up')}
                  disabled={index === 0}
                  className={cn(
                    'rounded-lg p-1.5 transition-colors',
                    index === 0
                      ? 'text-muted-foreground/30 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  title="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveClinic(index, 'down')}
                  disabled={index === clinics.length - 1}
                  className={cn(
                    'rounded-lg p-1.5 transition-colors',
                    index === clinics.length - 1
                      ? 'text-muted-foreground/30 cursor-not-allowed'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  title="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeClinic(clinic.id)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                  title="Remove from featured"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save bar */}
      {dirty && (
        <div className="p-4 border-t border-border bg-amber-50/50 dark:bg-amber-500/5 flex items-center justify-between">
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            You have unsaved changes.
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      )}
    </div>
  )
}
