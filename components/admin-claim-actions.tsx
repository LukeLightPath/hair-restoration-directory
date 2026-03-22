'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface ClaimActionsProps {
  listingId: string
  onActionComplete?: (action: 'approve' | 'reject') => void
}

export default function AdminClaimActions({ listingId, onActionComplete }: ClaimActionsProps) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const [done, setDone] = useState<'approve' | 'reject' | null>(null)
  const [error, setError] = useState('')

  async function handleAction(action: 'approve' | 'reject') {
    if (action === 'reject') {
      const confirmed = window.confirm('Are you sure you want to reject this claim? The user will need to re-submit.')
      if (!confirmed) return
    }

    setLoading(action)
    setError('')

    try {
      const res = await fetch('/api/admin/claims', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listingId, action }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed')
        setLoading(null)
        return
      }

      setDone(action)
      onActionComplete?.(action)
    } catch {
      setError('Something went wrong')
      setLoading(null)
    }
  }

  if (done) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        done === 'approve'
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
          : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
      }`}>
        {done === 'approve' ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
        {done === 'approve' ? 'Approved' : 'Rejected'}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {error && <span className="text-xs text-destructive">{error}</span>}
      <button
        onClick={() => handleAction('approve')}
        disabled={loading !== null}
        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all disabled:opacity-50 active:scale-[0.97]"
      >
        {loading === 'approve' ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
        Approve
      </button>
      <button
        onClick={() => handleAction('reject')}
        disabled={loading !== null}
        className="inline-flex items-center gap-1 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-all disabled:opacity-50 active:scale-[0.97] dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/15"
      >
        {loading === 'reject' ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3" />}
        Reject
      </button>
    </div>
  )
}
