'use client'

import { useState, useEffect } from 'react'
import { Shield, X } from 'lucide-react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't already accepted
    const accepted = localStorage.getItem('cookie_consent')
    if (!accepted) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  function handleDismiss() {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-4xl px-4 pb-4">
        <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 p-5 sm:p-6">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">We value your privacy</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies to improve your experience and analyse site traffic. By clicking
                  &ldquo;Accept all&rdquo;, you agree to our use of cookies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 sm:ml-4">
              <button
                onClick={handleDismiss}
                className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                Reject all
              </button>
              <button
                onClick={handleAccept}
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.97]"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
