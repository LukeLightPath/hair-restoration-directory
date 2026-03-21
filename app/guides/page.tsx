import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, BookOpen, Scissors, Zap, Syringe, Crown,
  Wand2, Puzzle, Microscope, Sun, Brain, Heart,
  Link as LinkIcon, Grip,
} from 'lucide-react'
import { canonicalUrl } from '@/lib/utils'
import Breadcrumbs from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Hair Restoration Guides | Learn About Treatments',
  description:
    'Detailed guides on hair restoration treatments: hair systems, SMP, PRP, transplants, wigs, extensions and more. Read before choosing a clinic.',
  alternates: {
    canonical: canonicalUrl('/guides'),
  },
}

const GUIDES = [
  {
    slug: 'hair-systems',
    title: 'What Is a Hair System?',
    description: 'Base types, hair types, attachment methods, maintenance and what to look for in a clinic.',
    icon: Scissors,
    readTime: '8 min',
  },
  {
    slug: 'scalp-micropigmentation',
    title: 'What Is SMP?',
    description: 'How scalp micropigmentation works, session breakdown, styles, fading timeline and UK costs.',
    icon: Zap,
    readTime: '7 min',
  },
  {
    slug: 'hair-transplant',
    title: 'What Is a Hair Transplant?',
    description: 'FUE vs FUT, recovery timeline, costs and how to choose the right surgeon.',
    icon: Puzzle,
    readTime: '8 min',
  },
  {
    slug: 'wigs',
    title: 'What Is a Wig?',
    description: 'Human hair vs synthetic, cap constructions, fitting, UK pricing and maintenance.',
    icon: Crown,
    readTime: '7 min',
  },
  {
    slug: 'prp-treatment',
    title: 'What Is PRP Treatment?',
    description: 'How platelet-rich plasma therapy works, the clinical evidence, sessions and UK costs.',
    icon: Syringe,
    readTime: '6 min',
  },
  {
    slug: 'extensions',
    title: 'What Are Hair Extensions?',
    description: 'Tape-in, micro ring, weave and fusion methods, hair quality grades and aftercare.',
    icon: Wand2,
    readTime: '6 min',
  },
  {
    slug: 'trichology',
    title: 'What Is Trichology?',
    description: 'What a trichologist does, conditions treated, consultation process and finding a practitioner.',
    icon: Microscope,
    readTime: '5 min',
  },
  {
    slug: 'laser-therapy',
    title: 'What Is Laser Therapy (LLLT)?',
    description: 'How low-level laser therapy works, clinical evidence, home devices vs clinic treatments.',
    icon: Sun,
    readTime: '5 min',
  },
  {
    slug: 'hair-toppers',
    title: 'What Is a Hair Topper?',
    description: 'How toppers work, base types, attachment methods and who they suit.',
    icon: Grip,
    readTime: '5 min',
  },
  {
    slug: 'hair-integration',
    title: 'What Is Hair Integration?',
    description: 'Mesh-based integration systems, fitting process, maintenance and suitability.',
    icon: LinkIcon,
    readTime: '5 min',
  },
  {
    slug: 'fitting-service',
    title: 'What Is a Fitting Service?',
    description: 'Professional hair system fitting: why it matters, the process and ongoing maintenance.',
    icon: Brain,
    readTime: '4 min',
  },
  {
    slug: 'cranial-prosthesis',
    title: 'What Is a Cranial Prosthesis?',
    description: 'Medical-grade wigs for medical hair loss, NHS availability and private UK costs.',
    icon: Heart,
    readTime: '5 min',
  },
]

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />

      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
          <BookOpen className="h-3 w-3" /> Treatment Guides
        </span>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Hair Restoration Guides
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Understand your options before choosing a clinic. Each guide breaks down a treatment
          in plain language.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/25 hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 transition-transform duration-300 group-hover:scale-110">
              <guide.icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
              {guide.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {guide.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{guide.readTime} read</span>
              <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
