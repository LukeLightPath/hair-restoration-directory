'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Send, Loader2, CheckCircle, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pushEvent } from '@/lib/analytics'

interface ContactFormProps {
  listingId: string
  clinicName: string
  className?: string
  ctaLabel?: string
  freeConsultation?: boolean
}

export default function ContactForm({ listingId, clinicName, className, ctaLabel, freeConsultation }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [shake, setShake] = useState(false)
  const [consent, setConsent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const data = {
      listing_id: listingId,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || null,
      message: formData.get('message') as string || null,
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Something went wrong')
      }

      setStatus('success')

      // Push generate_lead event to GTM dataLayer for GA4
      pushEvent('generate_lead', {
        listing_id: listingId,
        clinic_name: clinicName,
      })

      // Track the enquiry click in Supabase
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listingId, event_type: 'inquiry_click' }),
        keepalive: true,
      }).catch(() => { /* analytics is best-effort */ })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
      // Trigger validation shake
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('rounded-xl border border-success/30 bg-success/5 p-8 text-center animate-fade-in', className)}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Enquiry Sent</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your enquiry has been sent to <strong>{clinicName}</strong>. They will get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        'space-y-4 transition-transform',
        shake && 'animate-validation-shake',
        className
      )}
    >
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
          placeholder="John Smith"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
          Phone number <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
          placeholder="+44 7XXX XXX XXX"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all resize-y"
          placeholder="I'd like to book a consultation..."
        />
      </div>

      {/* GDPR consent checkbox */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={consent}
          onClick={() => setConsent(!consent)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            consent
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-card hover:border-primary/50'
          }`}
        >
          {consent && <Check className="h-3.5 w-3.5" />}
        </button>
        <label
          className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
          onClick={() => setConsent(!consent)}
        >
          I consent to my details being shared with {clinicName} so they can respond to my
          enquiry. See our{' '}
          <Link href="/privacy" className="font-medium text-primary hover:text-primary-hover transition-colors" target="_blank">
            Privacy Policy
          </Link>.
        </label>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/5 border border-destructive/20 px-3 py-2.5 text-sm text-destructive animate-fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !consent}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {ctaLabel || (freeConsultation ? 'Book My Free Consultation' : 'Book a Consultation')}
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Your enquiry will be sent directly to {clinicName}.
      </p>
    </form>
  )
}
