'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Shield, Loader2, CheckCircle, AlertCircle, ArrowLeft, LogIn } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ListingInfo {
  id: string
  title: string
  city: string
  slug: string
  claim_status: string
  claimed: boolean
}

export default function ClaimPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [listing, setListing] = useState<ListingInfo | null>(null)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already_claimed'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function init() {
      const supabase = createClient()

      // Check auth
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email || '' })
      }

      // Get listing
      const { data } = await supabase
        .from('listings')
        .select('id, title, city, slug, claim_status, claimed')
        .eq('slug', slug)
        .single()

      if (data) {
        setListing(data as ListingInfo)
        if (data.claimed || data.claim_status !== 'none') {
          setStatus('already_claimed')
        }
      }

      setLoading(false)
    }

    init()
  }, [slug])

  async function handleClaim() {
    if (!listing || !user) return
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listing.id }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        if (res.status === 409) {
          setStatus('already_claimed')
        } else {
          setStatus('error')
          setErrorMsg(data.error || 'Something went wrong. Please try again.')
        }
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Listing Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find a clinic with that URL. It may have been removed or the link is incorrect.
        </p>
        <Link
          href="/uk"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All Clinics
        </Link>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-5">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Log in to Claim</h1>
          <p className="text-muted-foreground mb-2">
            You need to be logged in to claim <span className="font-medium text-foreground">{listing.title}</span>.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            If you don&apos;t have an account yet, you can create one for free.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/login?redirect=/claim/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md"
            >
              Log In
            </Link>
            <Link
              href={`/signup?redirect=/claim/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Already claimed or pending
  if (status === 'already_claimed') {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 mb-5">
            <AlertCircle className="h-6 w-6 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Already Claimed</h1>
          <p className="text-muted-foreground mb-6">
            <span className="font-medium text-foreground">{listing.title}</span> has already been claimed or has a pending claim.
            If you believe this is an error, please contact us.
          </p>
          <Link
            href={`mailto:luke@lightpath.agency?subject=Claim query: ${listing.title}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    )
  }

  // Success
  if (status === 'success') {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 mb-5">
            <CheckCircle className="h-6 w-6 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Claim Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Your claim for <span className="font-medium text-foreground">{listing.title}</span> has been submitted.
            We&apos;ll review it and get back to you within 24 hours.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Claim form
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Gradient header */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary-hover to-accent" />

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-5">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Claim Your Listing</h1>
            <p className="text-muted-foreground">
              Confirm you are the owner of <span className="font-medium text-foreground">{listing.title}</span> in {listing.city}.
            </p>
          </div>

          {/* What you get */}
          <div className="rounded-xl bg-primary/[0.03] border border-primary/10 p-5 mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">When approved, you&apos;ll be able to:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                Update your clinic profile and description
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                Add photos and your logo
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                Receive and respond to client enquiries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                View analytics and performance data
              </li>
            </ul>
          </div>

          {/* Logged in as */}
          <div className="rounded-xl bg-muted/30 border border-border p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Claiming as</p>
            <p className="text-sm font-medium text-foreground">{user.email}</p>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 mb-4">
              <p className="text-sm text-destructive">{errorMsg}</p>
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
            {submitting ? 'Submitting Claim...' : 'Submit Claim Request'}
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Claims are reviewed manually. We may contact you to verify ownership.
          </p>
        </div>
      </div>
    </div>
  )
}
