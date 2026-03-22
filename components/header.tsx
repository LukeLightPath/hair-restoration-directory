'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, Search, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/uk', label: 'Find a Clinic' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/guides', label: 'Guides' },
  { href: '/search', label: 'Search' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
          <Image
            src="/logo-icon.png"
            alt="Hair Restoration Guide"
            width={36}
            height={36}
            className=""
            priority
          />
          <span className="hidden sm:inline">
            <span className="font-heading font-semibold">Hair Restoration</span>{' '}
            <span className="text-muted-foreground font-normal">Guide</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/search"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            aria-label="Search clinics"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.98]"
          >
            List Your Clinic
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border bg-card',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        )}
      >
        <nav aria-label="Mobile navigation" className="space-y-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors',
                isActive(link.href)
                  ? 'text-primary bg-primary/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
          ))}
          <hr className="my-2 border-border" />
          <Link
            href="/login"
            className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setMobileOpen(false)}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="block rounded-xl bg-accent px-3 py-2.5 text-center text-base font-semibold text-accent-foreground shadow-sm hover:bg-accent-hover transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            List Your Clinic
          </Link>
        </nav>
      </div>
    </header>
  )
}
