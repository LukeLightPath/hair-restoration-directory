'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const next = searchParams.get('next') || '/dashboard'
    const code = searchParams.get('code')

    async function handleCallback() {
      // Flow 1: PKCE — exchange code for session
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace(next)
          return
        }
        console.error('[AuthCallback] Code exchange failed:', error.message)
      }

      // Flow 2: Implicit — hash fragments are auto-detected by the Supabase
      // browser client on initialisation. Listen for the auth state change.
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          subscription.unsubscribe()
          router.replace(next)
        }
      })

      // Check if we already have a session (hash was processed before listener)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        subscription.unsubscribe()
        router.replace(next)
        return
      }

      // Timeout — if nothing works after 4 seconds, show error
      setTimeout(async () => {
        const { data: { user: u } } = await supabase.auth.getUser()
        if (u) {
          subscription.unsubscribe()
          router.replace(next)
        } else {
          subscription.unsubscribe()
          setError(true)
        }
      }, 4000)
    }

    handleCallback()
  }, [router, searchParams])

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <p className="text-lg font-semibold text-foreground mb-2">Link expired</p>
          <p className="text-sm text-muted-foreground mb-6">
            This link has expired or is invalid. Please request a new one.
          </p>
          <a
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-all"
          >
            Request new link
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">Completing sign-in...</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  )
}
