'use client'

import { useState, useEffect } from 'react'
import { Shield, X, ChevronDown, Lock } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
}

const COOKIE_CATEGORIES = [
  {
    key: 'necessary' as const,
    label: 'Strictly Necessary',
    description: 'Essential for the website to function. These cannot be disabled.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    label: 'Analytics',
    description: 'Help us understand how visitors interact with the site so we can improve it.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    label: 'Marketing',
    description: 'Used to deliver relevant ads and track campaign performance.',
    locked: false,
  },
]

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  function saveAndClose(prefs: CookiePreferences) {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs))
    setVisible(false)
  }

  function handleAcceptAll() {
    saveAndClose({ necessary: true, analytics: true, marketing: true })
  }

  function handleRejectAll() {
    saveAndClose({ necessary: true, analytics: false, marketing: false })
  }

  function handleSavePreferences() {
    saveAndClose({ ...preferences, necessary: true })
  }

  function togglePreference(key: keyof CookiePreferences) {
    if (key === 'necessary') return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
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
            onClick={handleRejectAll}
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
                onClick={() => setShowPreferences((prev) => !prev)}
                className="group rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex items-center gap-1.5"
              >
                Manage preferences
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    showPreferences ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <button
                onClick={handleRejectAll}
                className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                Reject all
              </button>
              <button
                onClick={handleAcceptAll}
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.97]"
              >
                Accept all
              </button>
            </div>
          </div>

          {/* Preferences panel */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showPreferences ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="border-t border-border pt-4 space-y-3">
              {COOKIE_CATEGORIES.map((category) => (
                <div
                  key={category.key}
                  className="flex items-center justify-between gap-4 rounded-xl bg-muted/50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{category.label}</p>
                      {category.locked && (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => togglePreference(category.key)}
                    disabled={category.locked}
                    aria-label={`Toggle ${category.label} cookies`}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      category.locked
                        ? 'bg-primary/60 cursor-not-allowed'
                        : preferences[category.key]
                          ? 'bg-primary cursor-pointer'
                          : 'bg-border cursor-pointer hover:bg-muted-foreground/30'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        preferences[category.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleSavePreferences}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.97]"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
