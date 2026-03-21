import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewCardProps {
  review: {
    id: string
    author: string | null
    rating: number | null
    review_text?: string | null
  }
}

/* Generate a consistent gradient for avatar initials */
const AVATAR_GRADIENTS = [
  'from-primary to-primary-hover',
  'from-teal-500 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-violet-500 to-purple-500',
  'from-rose-500 to-pink-500',
  'from-blue-500 to-cyan-500',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('')
}

function getGradient(name: string): string {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length]
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const authorName = review.author || 'Anonymous'
  const initials = getInitials(authorName)
  const gradient = getGradient(authorName)

  return (
    <div className="relative rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/15">
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-5 text-4xl leading-none text-primary/8 font-serif select-none" aria-hidden>
        &ldquo;
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-sm font-semibold shadow-sm`}>
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{authorName}</p>
          {review.rating && (
            <div className="flex items-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.round(review.rating!)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review text */}
      {review.review_text && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {review.review_text}
        </p>
      )}
    </div>
  )
}
