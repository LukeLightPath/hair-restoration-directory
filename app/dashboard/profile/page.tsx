'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle, AlertCircle, Mail, Phone, Bell, BellOff, User } from 'lucide-react'

interface ProfileData {
  full_name: string
  notification_email: string
  notification_phone: string
  email_notifications_on: boolean
  sms_notifications_on: boolean
  auth_email: string
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!data) return

    setSaving(true)
    setStatus('idle')
    setErrorMsg('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.full_name,
          notification_email: data.notification_email,
          notification_phone: data.notification_phone,
          email_notifications_on: data.email_notifications_on,
          sms_notifications_on: data.sms_notifications_on,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to save')
      }

      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
        <p className="text-sm text-muted-foreground">Failed to load profile.</p>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your details and how you receive enquiry notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-xl">
        {/* ── Your Details ── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-card-foreground">Your Details</h2>
          </div>

          <div className="p-5 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="full_name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                Full name
              </label>
              <input
                id="full_name"
                type="text"
                value={data.full_name}
                onChange={e => setData({ ...data, full_name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Login email (read-only) */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Login email
              </label>
              <div className="w-full rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm text-muted-foreground cursor-not-allowed">
                {data.auth_email}
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-1">
                This is your login email and cannot be changed here.
              </p>
            </div>
          </div>
        </div>

        {/* ── Notification Preferences ── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-card-foreground">Notification Preferences</h2>
          </div>

          <div className="p-5 space-y-5">
            {/* Email notifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">Email notifications</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={data.email_notifications_on}
                  onClick={() => setData({ ...data, email_notifications_on: !data.email_notifications_on })}
                  className={`
                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20
                    ${data.email_notifications_on ? 'bg-primary' : 'bg-muted-foreground/25'}
                  `}
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0
                      transition-transform duration-200 ease-in-out
                      ${data.email_notifications_on ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {data.email_notifications_on && (
                <div>
                  <label htmlFor="notification_email" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Send enquiry emails to
                  </label>
                  <input
                    id="notification_email"
                    type="email"
                    value={data.notification_email}
                    onChange={e => setData({ ...data, notification_email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder={data.auth_email || 'your@email.com'}
                  />
                  <p className="text-[11px] text-muted-foreground/70 mt-1">
                    Leave blank to use your login email ({data.auth_email}).
                  </p>
                </div>
              )}

              {!data.email_notifications_on && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <BellOff className="h-3 w-3" />
                  You won&apos;t receive email notifications for new enquiries.
                </p>
              )}
            </div>

            <hr className="border-border" />

            {/* SMS notifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">SMS notifications</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={data.sms_notifications_on}
                  onClick={() => setData({ ...data, sms_notifications_on: !data.sms_notifications_on })}
                  className={`
                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20
                    ${data.sms_notifications_on ? 'bg-primary' : 'bg-muted-foreground/25'}
                  `}
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0
                      transition-transform duration-200 ease-in-out
                      ${data.sms_notifications_on ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {data.sms_notifications_on && (
                <div>
                  <label htmlFor="notification_phone" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Send SMS alerts to
                  </label>
                  <input
                    id="notification_phone"
                    type="tel"
                    value={data.notification_phone}
                    onChange={e => setData({ ...data, notification_phone: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="07xxx xxxxxx"
                  />
                  <p className="text-[11px] text-muted-foreground/70 mt-1">
                    Leave blank to use your listing&apos;s phone number. Must be a UK mobile.
                  </p>
                </div>
              )}

              {!data.sms_notifications_on && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <BellOff className="h-3 w-3" />
                  You won&apos;t receive SMS notifications for new enquiries.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Save ── */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Saving…' : 'Save changes'}
          </button>

          {status === 'success' && (
            <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              <CheckCircle className="h-4 w-4" />
              Saved
            </span>
          )}

          {status === 'error' && (
            <span className="flex items-center gap-1 text-sm text-destructive animate-in fade-in">
              <AlertCircle className="h-4 w-4" />
              {errorMsg}
            </span>
          )}
        </div>
      </form>
    </>
  )
}
