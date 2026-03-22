import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Scissors, Zap, Wand2, Microscope, Sun, Syringe, Brain, Puzzle, Crown } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { TREATMENTS } from '@/lib/types'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Hair Restoration Treatments UK | Browse All Options',
  description:
    'Explore every hair restoration treatment available in the UK. Compare clinics offering hair systems, SMP, wigs, PRP and more. Find clinics near you.',
}

/* ── Unique icon per treatment ── */
const TREATMENT_ICONS: Record<string, typeof Scissors> = {
  'hair-systems': Scissors,
  'smp': Zap,
  'wigs': Crown,
  'extensions': Wand2,
  'prp': Syringe,
  'transplant': Puzzle,
  'trichology': Microscope,
  'laser': Sun,
  'fitting': Brain,
}

const TREATMENT_GRADIENTS: Record<string, string> = {
  'hair-systems': 'from-teal-500/15 to-teal-500/5',
  'smp': 'from-blue-500/15 to-blue-500/5',
  'wigs': 'from-purple-500/15 to-purple-500/5',
  'extensions': 'from-amber-500/15 to-amber-500/5',
  'prp': 'from-rose-500/15 to-rose-500/5',
  'transplant': 'from-emerald-500/15 to-emerald-500/5',
  'trichology': 'from-indigo-500/15 to-indigo-500/5',
  'laser': 'from-orange-500/15 to-orange-500/5',
  'fitting': 'from-cyan-500/15 to-cyan-500/5',
}

export default async function TreatmentsIndexPage() {
  const supabase = await createClient()

  const enabledTreatments = TREATMENTS.filter(t => t.enabled)
  const treatmentCounts: Record<string, number> = {}

  for (const treatment of enabledTreatments) {
    const { count } = await supabase
      .from('listing_services')
      .select('listing_id', { count: 'exact', head: true })
      .eq(treatment.dbColumn, true)

    treatmentCounts[treatment.slug] = count || 0
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments' },
        ]}
      />

      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
          <Scissors className="h-3 w-3" /> Treatment Guide
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Hair Restoration Treatments
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Explore all the treatments available at clinics across the UK.
          Click a treatment to find clinics that offer it or narrow down by city.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {enabledTreatments.map((treatment) => {
          const count = treatmentCounts[treatment.slug] || 0
          if (count === 0) return null

          const Icon = TREATMENT_ICONS[treatment.slug] || Scissors
          const gradient = TREATMENT_GRADIENTS[treatment.slug] || 'from-primary/15 to-primary/5'

          return (
            <Link
              key={treatment.slug}
              href={`/treatments/${treatment.slug}`}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/25 hover:-translate-y-1"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-300 group-hover:via-primary/40" />

              <div className="flex items-start justify-between mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1">
                  {count} clinic{count !== 1 ? 's' : ''}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                {treatment.label}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {treatment.shortDescription}
              </p>

              <span className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Find clinics <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
