import { SERVICE_LABELS } from '@/lib/types'
import type { ListingServices } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ServiceBadgesProps {
  services: ListingServices
  className?: string
  maxVisible?: number
}

export default function ServiceBadges({ services, className, maxVisible = 12 }: ServiceBadgesProps) {
  const activeServices = Object.entries(services)
    .filter(([key, value]) => key !== 'listing_id' && value === true)
    .map(([key]) => ({
      key,
      label: SERVICE_LABELS[key] || key.replace('has_', '').replace(/_/g, ' '),
    }))

  if (activeServices.length === 0) return null

  const visible = activeServices.slice(0, maxVisible)
  const remaining = activeServices.length - maxVisible

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visible.map(({ key, label }) => (
        <span
          key={key}
          className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary"
        >
          {label}
        </span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          +{remaining} more
        </span>
      )}
    </div>
  )
}
