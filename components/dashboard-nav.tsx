'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, MessageSquare, Image, ShieldCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const SIDEBAR_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/listing', label: 'My Listing', icon: FileText },
  { href: '/dashboard/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/dashboard/images', label: 'Images', icon: Image },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
]

export default function DashboardNav() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex-1 p-3 space-y-1">
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
            isActive(link.href, link.exact)
              ? 'text-primary bg-primary/8 font-medium border-l-2 border-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          <link.icon className={cn('h-4 w-4 shrink-0', isActive(link.href, link.exact) && 'text-primary')} />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function DashboardMobileNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()

  return (
    <nav className="flex justify-around py-2">
      {SIDEBAR_LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 transition-colors',
              active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <link.icon className="h-5 w-5" />
            <span className="text-[10px]">{link.label}</span>
          </Link>
        )
      })}
      {isAdmin && (
        <Link
          href="/admin"
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-amber-500 dark:text-amber-400"
        >
          <ShieldCheck className="h-5 w-5" />
          <span className="text-[10px]">Admin</span>
        </Link>
      )}
    </nav>
  )
}
