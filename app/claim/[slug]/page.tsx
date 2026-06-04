'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Shield, Loader2, CheckCircle, AlertCircle, ArrowLeft, Check, Mail, User } from 'lucide-react'
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
  const params = useParams()
  const slug = params.slug as string

  const [listing, setListing] = useState<ListingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already_claimed'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  useEffect(() => {
    async function init() {
      const supabase = createClient()

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

  function isValidEmail(value: string) {
    return value.includes('@') && value.includes('.')
  }

  async function handleClaim() {
    if (!listing || !name.trim() || !isValidEmail(email) || !agreedToTerms) return
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listing.id, name: name.trim(), email: email.trim() }),
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
            href="/uk"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Browse Clinics
          </Link>
        </div>
      </div>
    )
  }

  const canSubmit = name.trim() && isValidEmail(email) && agreedToTerms && !submitting

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
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

          <div className="space-y-4 mb-6">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreedToTerms}
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${agreedToTerms ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-primary/50'}`}
            >
              {agreedToTerms && <Check className="h-3.5 w-3.5" />}
            </button>
            <label
              className="text-sm text-muted-foreground leading-snug cursor-pointer select-none"
              onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
              I agree to the <Link href="/terms" className="font-medium text-primary hover:text-primary-hover transition-colors" target="_blank">Terms &amp; Conditions</Link> and <Link href="/privacy" className="font-medium text-primary hover:text-primary-hover transition-colors" target="_blank">Privacy Policy</Link>
            </label>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 mb-4">
              <p className="text-sm text-destructive">{errorMsg}</p>
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={!canSubmit}
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
