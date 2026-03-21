import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ScrollToTop from '@/components/scroll-to-top'
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from '@/components/google-tag-manager'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hairrestorationguide.com'),
  title: {
    default: 'Hair Restoration Guide | Find Non-Surgical Hair Clinics Near You',
    template: '%s | Hair Restoration Guide',
  },
  description:
    'The UK\'s most comprehensive directory for non-surgical hair restoration clinics. Find hair systems, SMP, wigs and more near you.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Hair Restoration Guide',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <GoogleTagManagerScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleTagManagerNoScript />
        {/* Skip navigation — WCAG 2.1 AA */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
