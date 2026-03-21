import Link from 'next/link'
import { Shield, Lock, UserX, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Directory: [
    { href: '/uk', label: 'All Cities' },
    { href: '/search', label: 'Search Clinics' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/blog', label: 'Blog' },
  ],
  'For Clinics': [
    { href: '/signup', label: 'List Your Clinic' },
    { href: '/login', label: 'Clinic Login' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      {/* Newsletter signup */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground mt-1">
                New clinics, hair restoration tips and industry updates. Straight to your inbox.
              </p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all hover:shadow-md shrink-0 active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-b border-border py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-primary" />
              UK Focused Directory
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-primary" />
              Data Protected
            </span>
            <span className="flex items-center gap-1.5">
              <UserX className="h-4 w-4 text-primary" />
              No Sign-Up Needed
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
              <img
                src="/logo-icon.png"
                alt="Hair Restoration Guide"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-heading font-semibold">Hair Restoration Guide</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The UK&apos;s most comprehensive directory for non-surgical hair restoration clinics.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground font-heading">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hair Restoration Guide. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for people experiencing hair loss.
          </p>
        </div>
      </div>
    </footer>
  )
}
