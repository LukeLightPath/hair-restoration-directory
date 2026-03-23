import Link from 'next/link'
import { Shield, Lock, UserX, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  Directory: [
    { href: '/uk', label: 'All Locations' },
    { href: '/search', label: 'Search Clinics' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/blog', label: 'Blog' },
    { href: '/support', label: 'Support & Charities' },
  ],
  'For Clinics': [
    { href: '/signup', label: 'List Your Clinic' },
    { href: '/login', label: 'Clinic Login' },
    { href: '/for-clinics', label: 'Why List With Us' },
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
      {/* Support contact */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Need help or have feedback?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </div>
            <a
              href="mailto:support@hairrestorationguide.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-primary/5 hover:border-primary/20 transition-all hover:shadow-md shrink-0"
            >
              <Mail className="h-4 w-4 text-primary" />
              support@hairrestorationguide.com
            </a>
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
                className=""
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

        {/* Honeypot — hidden link only bots follow */}
        <a
          href="/trap"
          style={{ opacity: 0, position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden' }}
          tabIndex={-1}
          aria-hidden="true"
        >
          Do not follow this link
        </a>
      </div>
    </footer>
  )
}
