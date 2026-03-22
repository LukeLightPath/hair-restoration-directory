'use client'

import { useState } from 'react'
import {
  Save, Loader2, CheckCircle, AlertCircle,
  Phone, Mail, Globe, MapPin, FileText, BookOpen,
  Scissors, Link2, ShieldCheck, Search as SearchIcon, Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICE_LABELS, TREATMENT_CATEGORY_LABELS } from '@/lib/types'
import type { Listing, ListingServices, ListingSocials } from '@/lib/types'

/* ── Tab definitions ── */
const TABS = [
  { id: 'details', label: 'Details', icon: FileText },
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'socials', label: 'Social Links', icon: Link2 },
  { id: 'admin', label: 'Admin', icon: ShieldCheck },
  { id: 'seo', label: 'SEO', icon: SearchIcon },
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

interface AdminListingEditorProps {
  listing: Listing
  services: ListingServices | null
  socials: ListingSocials | null
}

export default function AdminListingEditor({ listing, services, socials }: AdminListingEditorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('details')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  /* ── Form state — includes admin-only fields ── */
  const [form, setForm] = useState({
    title: listing.title || '',
    description: listing.description || '',
    phone: listing.phone || '',
    email: listing.email || '',
    website: listing.website || '',
    street: listing.street || '',
    postcode: listing.postcode || '',
    city: listing.city || '',
    county: listing.county || '',
    country: listing.country || '',
    booking_url: listing.booking_url || '',
    pricing_tier: listing.pricing_tier || '',
    men_women_both: listing.men_women_both || '',
    free_consultation: listing.free_consultation || '',
    has_private_room: listing.has_private_room ?? false,
  })

  const [adminForm, setAdminForm] = useState({
    treatment_category: listing.treatment_category || '',
    business_status: listing.business_status || 'OPERATIONAL',
    google_rating: listing.google_rating?.toString() || '',
    google_review_count: listing.google_review_count?.toString() || '0',
    claimed: listing.claimed ?? false,
    claim_status: listing.claim_status || 'none',
    featured: listing.featured ?? false,
    slug: listing.slug || '',
  })

  const [seoForm, setSeoForm] = useState({
    meta_title: listing.meta_title || '',
    meta_description: listing.meta_description || '',
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

  function updateAdminField(field: string, value: string | boolean) {
    setAdminForm(prev => ({ ...prev, [field]: value }))
  }

  function updateSeoField(field: string, value: string) {
    setSeoForm(prev => ({ ...prev, [field]: value }))
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
      // Merge all form data
      const listingPayload = {
        ...form,
        ...seoForm,
        treatment_category: adminForm.treatment_category || null,
        business_status: adminForm.business_status,
        google_rating: adminForm.google_rating ? parseFloat(adminForm.google_rating) : null,
        google_review_count: parseInt(adminForm.google_review_count || '0', 10),
        claimed: adminForm.claimed,
        claim_status: adminForm.claim_status,
        featured: adminForm.featured,
        slug: adminForm.slug,
      }

      const res = await fetch(`/api/admin/listings/${listing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing: listingPayload,
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

  const inputClass = 'w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow'
  const labelClass = 'block text-sm font-medium text-foreground mb-1.5'

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit: {listing.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {listing.city} — Admin editor (all fields unlocked)
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {/* ── Feedback banner ── */}
      {feedback && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium',
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
      <div className="flex gap-1 rounded-xl bg-muted p-1 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ── Details Tab ── */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Basic info */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              Basic Information
            </h2>

            <div>
              <label htmlFor="adm-title" className={labelClass}>Clinic name</label>
              <input id="adm-title" value={form.title} onChange={e => updateField('title', e.target.value)} className={inputClass} />
            </div>

            <div>
              <label htmlFor="adm-desc" className={labelClass}>Description</label>
              <textarea id="adm-desc" rows={5} value={form.description} onChange={e => updateField('description', e.target.value)} className={cn(inputClass, 'resize-y')} />
              <p className="mt-1 text-xs text-muted-foreground">{form.description.length} / 1000 characters</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-gender" className={labelClass}>Clients served</label>
                <select id="adm-gender" value={form.men_women_both} onChange={e => updateField('men_women_both', e.target.value)} className={inputClass}>
                  <option value="">Not specified</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Both">Men &amp; Women</option>
                </select>
              </div>
              <div>
                <label htmlFor="adm-pricing" className={labelClass}>Pricing tier</label>
                <select id="adm-pricing" value={form.pricing_tier} onChange={e => updateField('pricing_tier', e.target.value)} className={inputClass}>
                  <option value="">Not specified</option>
                  <option value="£">£ — Budget-friendly</option>
                  <option value="££">££ — Mid-range</option>
                  <option value="£££">£££ — Premium</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-consultation" className={labelClass}>Free consultation</label>
                <select id="adm-consultation" value={form.free_consultation} onChange={e => updateField('free_consultation', e.target.value)} className={inputClass}>
                  <option value="">Not specified</option>
                  <option value="Yes">Yes</option>
                  <option value="Mentioned">Mentioned on website</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-2.5 w-full cursor-pointer hover:border-amber-500/30 transition-colors">
                  <input type="checkbox" checked={form.has_private_room} onChange={e => updateField('has_private_room', e.target.checked)} className="h-4 w-4 rounded border-input text-amber-600 focus:ring-amber-500" />
                  <span className="text-sm text-foreground">Private room available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Phone className="h-5 w-5 text-amber-500" />
              Contact Information
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-phone" className={labelClass}>Phone number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input id="adm-phone" value={form.phone} onChange={e => updateField('phone', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="+44 7123 456789" />
                </div>
              </div>
              <div>
                <label htmlFor="adm-email" className={labelClass}>Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input id="adm-email" type="email" value={form.email} onChange={e => updateField('email', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="info@yourclinic.co.uk" />
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-website" className={labelClass}>Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input id="adm-website" value={form.website} onChange={e => updateField('website', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="https://www.yourclinic.co.uk" />
                </div>
              </div>
              <div>
                <label htmlFor="adm-booking" className={labelClass}>Booking URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input id="adm-booking" value={form.booking_url} onChange={e => updateField('booking_url', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="https://booking.yourclinic.co.uk" />
                </div>
              </div>
            </div>
          </div>

          {/* Address — all fields editable for admin */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              Address
            </h2>
            <div className="sm:col-span-2">
              <label htmlFor="adm-street" className={labelClass}>Street address</label>
              <input id="adm-street" value={form.street} onChange={e => updateField('street', e.target.value)} className={inputClass} placeholder="123 High Street" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="adm-city" className={labelClass}>City</label>
                <input id="adm-city" value={form.city} onChange={e => updateField('city', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="adm-county" className={labelClass}>County</label>
                <input id="adm-county" value={form.county} onChange={e => updateField('county', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="adm-postcode" className={labelClass}>Postcode</label>
                <input id="adm-postcode" value={form.postcode} onChange={e => updateField('postcode', e.target.value)} className={inputClass} placeholder="L1 4JF" />
              </div>
            </div>
            <div>
              <label htmlFor="adm-country" className={labelClass}>Country</label>
              <input id="adm-country" value={form.country} onChange={e => updateField('country', e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── Services Tab ── */}
      {activeTab === 'services' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-2">
            <Scissors className="h-5 w-5 text-amber-500" />
            Services Offered
          </h2>
          <p className="text-sm text-muted-foreground mb-6">Toggle services for this listing.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(SERVICE_LABELS).map(([key, label]) => (
              <label
                key={key}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-all',
                  serviceForm[key]
                    ? 'border-amber-500/30 bg-amber-500/5 shadow-sm'
                    : 'border-input bg-background hover:border-amber-500/20'
                )}
              >
                <input type="checkbox" checked={serviceForm[key] || false} onChange={() => toggleService(key)} className="h-4 w-4 rounded border-input text-amber-600 focus:ring-amber-500" />
                <span className={cn('text-sm font-medium', serviceForm[key] ? 'text-amber-700 dark:text-amber-400' : 'text-foreground')}>{label}</span>
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
            <Link2 className="h-5 w-5 text-amber-500" />
            Social Media Links
          </h2>
          <div className="space-y-4 mt-4">
            {SOCIAL_PLATFORMS.map(platform => (
              <div key={platform.key}>
                <label htmlFor={`adm-${platform.key}`} className={labelClass}>{platform.label}</label>
                <input
                  id={`adm-${platform.key}`}
                  value={socialForm[platform.key as keyof typeof socialForm]}
                  onChange={e => updateSocial(platform.key, e.target.value)}
                  className={inputClass}
                  placeholder={platform.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── Admin Tab ── */}
      {activeTab === 'admin' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-500" />
              Admin-Only Fields
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-slug" className={labelClass}>Slug</label>
                <input id="adm-slug" value={adminForm.slug} onChange={e => updateAdminField('slug', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="adm-status" className={labelClass}>Business status</label>
                <select id="adm-status" value={adminForm.business_status} onChange={e => updateAdminField('business_status', e.target.value)} className={inputClass}>
                  <option value="OPERATIONAL">Operational</option>
                  <option value="CLOSED_TEMPORARILY">Closed temporarily</option>
                  <option value="CLOSED_PERMANENTLY">Closed permanently</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-category" className={labelClass}>Treatment category</label>
                <select id="adm-category" value={adminForm.treatment_category} onChange={e => updateAdminField('treatment_category', e.target.value)} className={inputClass}>
                  <option value="">Not set</option>
                  {Object.entries(TREATMENT_CATEGORY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label} ({value})</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="adm-claim-status" className={labelClass}>Claim status</label>
                <select id="adm-claim-status" value={adminForm.claim_status} onChange={e => updateAdminField('claim_status', e.target.value)} className={inputClass}>
                  <option value="none">None</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="adm-grating" className={labelClass}>Google rating</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input id="adm-grating" type="number" step="0.1" min="0" max="5" value={adminForm.google_rating} onChange={e => updateAdminField('google_rating', e.target.value)} className={cn(inputClass, 'pl-10')} placeholder="4.8" />
                </div>
              </div>
              <div>
                <label htmlFor="adm-gcount" className={labelClass}>Google review count</label>
                <input id="adm-gcount" type="number" min="0" value={adminForm.google_review_count} onChange={e => updateAdminField('google_review_count', e.target.value)} className={inputClass} placeholder="42" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3 cursor-pointer hover:border-amber-500/30 transition-colors">
                <input type="checkbox" checked={adminForm.claimed} onChange={e => updateAdminField('claimed', e.target.checked)} className="h-4 w-4 rounded border-input text-amber-600 focus:ring-amber-500" />
                <span className="text-sm text-foreground font-medium">Claimed</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-input bg-background px-4 py-3 cursor-pointer hover:border-amber-500/30 transition-colors">
                <input type="checkbox" checked={adminForm.featured} onChange={e => updateAdminField('featured', e.target.checked)} className="h-4 w-4 rounded border-input text-amber-600 focus:ring-amber-500" />
                <span className="text-sm text-foreground font-medium">Featured listing</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── SEO Tab ── */}
      {activeTab === 'seo' && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-amber-500" />
            SEO / Meta
          </h2>

          <div>
            <label htmlFor="adm-meta-title" className={labelClass}>Meta title</label>
            <input id="adm-meta-title" value={seoForm.meta_title} onChange={e => updateSeoField('meta_title', e.target.value)} className={inputClass} placeholder="Clinic Name | Hair Systems in City" />
            <p className="mt-1 text-xs text-muted-foreground">{seoForm.meta_title.length} / 60 characters</p>
          </div>

          <div>
            <label htmlFor="adm-meta-desc" className={labelClass}>Meta description</label>
            <textarea id="adm-meta-desc" rows={3} value={seoForm.meta_description} onChange={e => updateSeoField('meta_description', e.target.value)} className={cn(inputClass, 'resize-y')} placeholder="Compelling description for search results..." />
            <p className="mt-1 text-xs text-muted-foreground">{seoForm.meta_description.length} / 160 characters</p>
          </div>
        </div>
      )}

      {/* ── Bottom save bar ── */}
      <div className="sticky bottom-20 md:bottom-4 z-40">
        <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-lg p-4 shadow-xl flex items-center justify-between">
          <p className="text-sm text-muted-foreground hidden sm:block">
            Editing as admin — all fields unlocked
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-amber-700 hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
