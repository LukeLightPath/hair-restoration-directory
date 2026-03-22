'use client'

import { useState } from 'react'
import {
  Save, Loader2, CheckCircle, AlertCircle,
  Phone, Mail, Globe, MapPin, FileText, BookOpen,
  Users, Scissors, Link2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICE_LABELS } from '@/lib/types'
import type { Listing, ListingServices, ListingSocials } from '@/lib/types'

/* ── Tab definitions ── */
const TABS = [
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'socials', label: 'Social Links', icon: Link2 },
] as const

type TabId = typeof TABS[number]['id']

/* ── Social platform config ── */
const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourclinic' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourclinic' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourclinic' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourclinic' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'https://x.com/yourclinic' },
] as const

interface ListingEditorProps {
  listing: Listing
  services: ListingServices | null
  socials: ListingSocials | null
}

export default function ListingEditor({ listing, services, socials }: ListingEditorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('details')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  /* ── Form state ── */
  const [form, setForm] = useState({
    title: listing.title || '',
    description: listing.description || '',
    phone: listing.phone || '',
    email: listing.email || '',
    website: listing.website || '',
    street: listing.street || '',
    postcode: listing.postcode || '',
    booking_url: listing.booking_url || '',
    pricing_tier: listing.pricing_tier || '',
    men_women_both: listing.men_women_both || '',
    free_consultation: listing.free_consultation || '',
    has_private_room: listing.has_private_room ?? false,
  })

  const [serviceForm, setServiceForm] = useState<Record<string, boolean>>(() => {
    if (!services) return {}
    const result: Record<string, boolean> = {}
    for (const [key, val] of Object.entries(services)) {
      if (key.startsWith('has_')) result[key] = !!val
    }
    return result
  })

  const [socialForm, setSocialForm] = useState({
    instagram: socials?.instagram || '',
    facebook: socials?.facebook || '',
    tiktok: socials?.tiktok || '',
    youtube: socials?.youtube || '',
    twitter: socials?.twitter || '',
  })

  function updateField(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleService(key: string) {
    setServiceForm(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function updateSocial(key: string, value: string) {
    setSocialForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch(`/api/listings/${listing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing: form,
          services: serviceForm,
          socials: socialForm,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      setFeedback({ type: 'success', message: 'Changes saved successfully.' })
      setTimeout(() => setFeedback(null), 4000)
    } catch (err) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Listing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your clinic&apos;s details. Changes go live immediately.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {/* ── Feedback banner ── */}
      {feedback && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300',
            feedback.type === 'success'
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-destructive/10 text-destructive border border-destructive/20'
          )}
        >
          {feedback.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {feedback.message}
        </div>
      )}

      {/* ── Tab navigation ── */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ── Details Tab ── */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Basic info card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Basic Information
            </h2>

            <div>
              <label htmlFor="ed-title" className="block text-sm font-medium text-foreground mb-1.5">
                Clinic name
              </label>
              <input
                id="ed-title"
                value={form.title}
                onChange={e => updateField('title', e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Your clinic name"
              />
            </div>

            <div>
              <label htmlFor="ed-desc" className="block text-sm font-medium text-foreground mb-1.5">
                Description
              </label>
              <textarea
                id="ed-desc"
                rows={5}
                value={form.description}
                onChange={e => updateField('description', e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-y"
                placeholder="Tell potential clients about your clinic…"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {form.description.length} / 1000 characters
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ed-gender" className="block text-sm font-medium text-foreground mb-1.5">
                  Clients served
                </label>
                <select
                  id="ed-gender"
                  value={form.men_women_both}
                  onChange={e => updateField('men_women_both', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Not specified</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Both">Men &amp; Women</option>
                </select>
              </div>
              <div>
                <label htmlFor="ed-pricing" className="block text-sm font-medium text-foreground mb-1.5">
                  Pricing tier
                </label>
                <select
                  id="ed-pricing"
                  value={form.pricing_tier}
                  onChange={e => updateField('pricing_tier', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Not specified</option>
                  <option value="£">£ — Budget-friendly</option>
                  <option value="££">££ — Mid-range</option>
                  <option value="£££">£££ — Premium</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ed-consultation" className="block text-sm font-medium text-foreground mb-1.5">
                  Free consultation
                </label>
                <select
                  id="ed-consultation"
                  value={form.free_consultation}
                  onChange={e => updateField('free_consultation', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Not specified</option>
                  <option value="Yes">Yes</option>
                  <option value="Mentioned">Mentioned on website</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-2.5 w-full cursor-pointer hover:border-primary/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={form.has_private_room}
                    onChange={e => updateField('has_private_room', e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Private room available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Contact info card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ed-phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="ed-phone"
                    value={form.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="+44 7123 456789"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ed-email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="ed-email"
                    type="email"
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="info@yourclinic.co.uk"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ed-website" className="block text-sm font-medium text-foreground mb-1.5">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="ed-website"
                    value={form.website}
                    onChange={e => updateField('website', e.target.value)}
                    className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="https://www.yourclinic.co.uk"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ed-booking" className="block text-sm font-medium text-foreground mb-1.5">
                  Booking URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="ed-booking"
                    value={form.booking_url}
                    onChange={e => updateField('booking_url', e.target.value)}
                    className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="https://booking.yourclinic.co.uk"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Address
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="ed-street" className="block text-sm font-medium text-foreground mb-1.5">
                  Street address
                </label>
                <input
                  id="ed-street"
                  value={form.street}
                  onChange={e => updateField('street', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="123 High Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  City
                </label>
                <input
                  value={listing.city}
                  disabled
                  className="w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-muted-foreground">Contact support to change city</p>
              </div>
              <div>
                <label htmlFor="ed-postcode" className="block text-sm font-medium text-foreground mb-1.5">
                  Postcode
                </label>
                <input
                  id="ed-postcode"
                  value={form.postcode}
                  onChange={e => updateField('postcode', e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="L1 4JF"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── Services Tab ── */}
      {activeTab === 'services' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-2">
            <Scissors className="h-5 w-5 text-primary" />
            Services Offered
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Toggle the services your clinic provides. These appear as badges on your listing.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <label
                key={key}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-all',
                  serviceForm[key]
                    ? 'border-primary/30 bg-primary/5 shadow-sm'
                    : 'border-input bg-background hover:border-primary/20'
                )}
              >
                <input
                  type="checkbox"
                  checked={serviceForm[key] || false}
                  onChange={() => toggleService(key)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className={cn(
                  'text-sm font-medium',
                  serviceForm[key] ? 'text-primary' : 'text-foreground'
                )}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── Socials Tab ── */}
      {activeTab === 'socials' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-2">
            <Link2 className="h-5 w-5 text-primary" />
            Social Media Links
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Add your social media profiles so potential clients can find you.
          </p>

          <div className="space-y-4">
            {SOCIAL_PLATFORMS.map(platform => (
              <div key={platform.key}>
                <label htmlFor={`ed-${platform.key}`} className="block text-sm font-medium text-foreground mb-1.5">
                  {platform.label}
                </label>
                <input
                  id={`ed-${platform.key}`}
                  value={socialForm[platform.key as keyof typeof socialForm]}
                  onChange={e => updateSocial(platform.key, e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder={platform.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom save bar (mobile-friendly) ── */}
      <div className="sticky bottom-20 md:bottom-4 z-40">
        <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-lg p-4 shadow-xl flex items-center justify-between">
          <p className="text-sm text-muted-foreground hidden sm:block">
            Remember to save your changes
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
