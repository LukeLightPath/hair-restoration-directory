'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Phone, ExternalLink, BadgeCheck, Shield, Camera, ArrowRight, Scissors, Award, Users, Layers, Navigation } from 'lucide-react'
import { cn, citySlug, truncate } from '@/lib/utils'
import type { ListingCardData, ListingImage } from '@/lib/types'
import { TREATMENT_CATEGORY_LABELS } from '@/lib/types'

/* ── Gender-aligned placeholder images ── */
const PLACEHOLDER_WOMEN = [
  '/images/clinic-placeholder-women-1.png',
  '/images/clinic-placeholder-women-2.png',
  '/images/clinic-placeholder-women-3.png',
]
const PLACEHOLDER_MEN = [
  '/images/clinic-placeholder-men-1.png',
  '/images/clinic-placeholder-men-2.png',
  '/images/clinic-placeholder-men-3.png',
]
const PLACEHOLDER_UNISEX = [
  '/images/clinic-placeholder-unisex-1.png',
  '/images/clinic-placeholder-unisex-2.png',
  '/images/clinic-placeholder-unisex-3.png',
]

function getPlaceholder(id: string, gender?: string | null): string {
  const pool =
    gender === 'Women' ? PLACEHOLDER_WOMEN :
    gender === 'Men' ? PLACEHOLDER_MEN :
    PLACEHOLDER_UNISEX
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return pool[hash % pool.length]
}

/* ── Service icon mapping ── */
const SERVICE_ICONS: Record<string, string> = {
  'Hair Systems': '✂️',
  'Scalp Micropigmentation': '🔵',
  'Wigs': '👩',
  'Extensions': '💇',
  'PRP Treatment': '💉',
  'Trichology': '🔬',
  'Laser Therapy': '⚡',
  'Fitting Service': '📐',
  'Hair Toppers': '👒',
  'Hair Integration': '🧩',
  'Cranial Prosthesis': '🩺',
}

/* Services hidden from badge display */
const HIDDEN_SERVICES = new Set(['Hair Transplant'])

interface ClinicCardProps {
  listing: ListingCardData
  services?: string[]
  images?: ListingImage[]
  className?: string
  priority?: boolean
  distanceMiles?: number
}

export default function ClinicCard({ listing, services, images, className, priority = false, distanceMiles }: ClinicCardProps) {
  const href = `/uk/${citySlug(listing.city)}/${listing.slug}`
  const hasRealImages = images && images.length > 0
  const heroImage = hasRealImages ? images[0].storage_path : getPlaceholder(listing.id, listing.men_women_both)
  const isClaimed = listing.claimed

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden',
        'transition-all duration-300 ease-out',
        'hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1.5',
        listing.featured && 'ring-1 ring-accent/30 border-accent/20',
        className
      )}
    >
      {/* ── Image Hero ── */}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={heroImage}
          alt={hasRealImages ? `${listing.title} clinic photo` : `Hair restoration clinic`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          {...(priority ? { priority: true, loading: 'eager' as const } : {})}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

        {/* Photos coming soon overlay */}
        {!hasRealImages && !isClaimed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
            <div className="rounded-full bg-white/15 backdrop-blur-sm p-3 mb-2">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-white/90 tracking-wide">Photos coming soon</span>
          </div>
        )}

        {/* Featured badge */}
        {listing.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-lg shadow-accent/20 z-10">
            <Award className="h-3 w-3" />
            Featured
          </span>
        )}

        {/* Verified / Unclaimed badge */}
        <div className="absolute top-3 right-3 z-10">
          {isClaimed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white shadow-md">
              <Shield className="h-3 w-3" />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-amber-300/80 bg-amber-500/70 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white shadow-md">
              Unclaimed
            </span>
          )}
        </div>

        {/* Rating overlay on image */}
        {listing.google_rating && (
          <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur-sm px-2.5 py-1.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-white">{listing.google_rating}</span>
            <span className="text-xs text-white/70">
              ({listing.google_review_count})
            </span>
          </div>
        )}

        {/* Image count indicator */}
        {hasRealImages && images.length > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/50 backdrop-blur-sm px-2 py-0.5 text-xs text-white z-10">
            <Camera className="h-3 w-3" />
            {images.length}
          </span>
        )}
      </Link>

      {/* ── Card Body ── */}
      <Link href={href} className="flex flex-col flex-1 p-5">
        {/* Title + Logo + Category */}
        <div className="mb-3">
          <div className="flex items-center gap-2.5">
            {listing.logo_url && (
              <div className="relative h-8 w-8 shrink-0 rounded-lg overflow-hidden border border-border shadow-sm">
                <Image
                  src={listing.logo_url}
                  alt={`${listing.title} logo`}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors font-sans leading-snug">
              {listing.title}
            </h3>
          </div>
          {listing.men_women_both && (
            <span className="mt-1.5 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {listing.men_women_both === 'Both' ? 'Men & Women' : listing.men_women_both}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>{listing.street ? `${listing.street}, ` : ''}{listing.city}</span>
          {distanceMiles !== undefined && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary shrink-0">
              <Navigation className="h-3 w-3" />
              {distanceMiles} mi
            </span>
          )}
        </div>

        {/* Description */}
        {listing.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Service badges with icons */}
        {services && services.length > 0 && (() => {
          const visible = services.filter(s => !HIDDEN_SERVICES.has(s))
          if (visible.length === 0) return null
          return (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-border">
            {visible.slice(0, 4).map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1 rounded-lg bg-primary/6 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {SERVICE_ICONS[service] && (
                  <span className="text-[10px] leading-none">{SERVICE_ICONS[service]}</span>
                )}
                {service}
              </span>
            ))}
            {visible.length > 4 && (
              <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{visible.length - 4} more
              </span>
            )}
          </div>
          )
        })()}

        {/* Quick info footer */}
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          {listing.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">Call</span>
            </span>
          )}
          {listing.website && (
            <span className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">Website</span>
            </span>
          )}
          {services && services.filter(s => !HIDDEN_SERVICES.has(s)).length > 0 && (
            <span className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {services.filter(s => !HIDDEN_SERVICES.has(s)).length} {services.filter(s => !HIDDEN_SERVICES.has(s)).length === 1 ? 'service' : 'services'}
            </span>
          )}

        </div>
      </Link>

      {/* ── Claim CTA (unclaimed only) ── */}
      {!isClaimed && (
        <div className="border-t border-dashed border-border px-5 py-3 bg-primary/[0.02]">
          <Link
            href={`/claim/${listing.slug}`}
            className="group/claim flex items-center justify-between text-xs text-primary font-medium transition-colors hover:text-primary-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Is this your clinic? <span className="underline underline-offset-2 decoration-primary/40">Claim this listing</span></span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/claim:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
