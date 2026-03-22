'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShieldCheck, BarChart3, FileText, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_LINKS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/inquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/claims', label: 'Claims', icon: ShieldCheck },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/listings', label: 'Listings', icon: FileText },
]

export default function AdminNav() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex-1 p-3 space-y-1">
      {ADMIN_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
            isActive(link.href, link.exact)
              ? 'text-amber-600 bg-amber-500/8 font-medium border-l-2 border-amber-500 dark:text-amber-400 dark:bg-amber-400/8'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          <link.icon className={cn('h-4 w-4 shrink-0', isActive(link.href, link.exact) && 'text-amber-500 dark:text-amber-400')} />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function AdminMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-around py-2">
      {ADMIN_LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 transition-colors',
              active ? 'text-amber-500 dark:text-amber-400' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <link.icon className="h-5 w-5" />
            <span className="text-[10px]">{link.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
