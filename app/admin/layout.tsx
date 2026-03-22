import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import AdminNav, { AdminMobileNav } from '@/components/admin-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') {
    redirect('/dashboard')
  }

  const initials = (profile?.full_name || user.email || '?')
    .split(' ')
    .map((w: string) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white text-xs font-bold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">
                {profile?.full_name || user.email}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Super Admin</p>
            </div>
          </div>
        </div>

        <AdminNav />

        <div className="p-3 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to site
          </Link>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-destructive hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
        <AdminMobileNav />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
