import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Questions or feedback? Get in touch with the Hair Restoration Guide team.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question, suggestion, or business enquiry? We&apos;re here to help.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-card-foreground mb-1">Email</p>
            <a href="mailto:hello@hairrestorationguide.com" className="text-sm text-primary hover:text-primary-hover transition-colors">
              hello@hairrestorationguide.com
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-card-foreground mb-1">Location</p>
            <p className="text-sm text-muted-foreground">United Kingdom</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground mb-5">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="contact-message"
                required
                rows={5}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-y"
                placeholder="Tell us more..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
