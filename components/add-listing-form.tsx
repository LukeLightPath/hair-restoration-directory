'use client'

import { useState } from 'react'
import { Building2, MapPin, Phone, Mail, Globe, FileText, Loader2, CheckCircle } from 'lucide-react'

export default function AddListingForm() {
  const [formData, setFormData] = useState({
    clinic_name: '',
    city: '',
    street: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/listings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit listing')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 mb-4">
          <CheckCircle className="h-6 w-6 text-success" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Submission received</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Thanks for submitting your clinic. We&apos;ll review it and add it to the directory shortly. You&apos;ll be able to manage it from your dashboard once it&apos;s approved.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">Add your clinic</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details below and we&apos;ll add your clinic to the directory after a quick review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Clinic name */}
        <div>
          <label htmlFor="add-clinic-name" className="block text-sm font-medium text-foreground mb-1.5">
            Clinic name <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="add-clinic-name"
              name="clinic_name"
              type="text"
              value={formData.clinic_name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="e.g. The Hair Studio"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label htmlFor="add-city" className="block text-sm font-medium text-foreground mb-1.5">
            City <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="add-city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="e.g. Manchester"
            />
          </div>
        </div>

        {/* Street */}
        <div>
          <label htmlFor="add-street" className="block text-sm font-medium text-foreground mb-1.5">
            Street address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="add-street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="e.g. 12 High Street"
            />
          </div>
        </div>

        {/* Phone & Email row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="add-phone" className="block text-sm font-medium text-foreground mb-1.5">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="add-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="+44 7123 456789"
              />
            </div>
          </div>
          <div>
            <label htmlFor="add-email" className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="add-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="info@example.com"
              />
            </div>
          </div>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="add-website" className="block text-sm font-medium text-foreground mb-1.5">
            Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="add-website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="https://www.example.com"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="add-description" className="block text-sm font-medium text-foreground mb-1.5">
            Short description
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <textarea
              id="add-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
              placeholder="Briefly describe your clinic and the services you offer..."
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? 'Submitting...' : 'Submit for review'}
        </button>
      </form>
    </div>
  )
}
