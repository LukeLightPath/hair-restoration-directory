'use client'

import Link from 'next/link'
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function ForgotPasswordError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We couldn&apos;t load the password reset form. Please try again or contact support.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
