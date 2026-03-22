'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQ_ITEMS = [
  {
    question: 'Is it free to claim my listing?',
    answer:
      'Yes, claiming your listing is completely free. Once claimed, you can update your profile, add photos and start receiving client enquiries at no cost.',
  },
  {
    question: 'How do I claim my listing?',
    answer:
      'Search for your clinic in our directory, then click "Claim this listing." You\'ll create an account and verify your ownership. The whole process takes less than five minutes.',
  },
  {
    question: 'What if my clinic isn\'t listed yet?',
    answer:
      'No problem. You can submit your clinic details through our sign-up process and we\'ll create a listing for you. Once it\'s live, you\'ll be able to manage it from your dashboard.',
  },
  {
    question: 'What happens after I claim my listing?',
    answer:
      'You\'ll get access to your dashboard where you can update your profile, add photos, list your services in detail and view performance analytics. Client enquiries will be delivered directly to your email.',
  },
  {
    question: 'Can I edit my listing after claiming it?',
    answer:
      'Absolutely. You have full control over your listing. Update your description, services, photos, contact details and opening hours at any time from your dashboard.',
  },
  {
    question: 'How do client enquiries work?',
    answer:
      'When a potential client views your listing and submits an enquiry, you\'ll receive it via email with their details and message. You can respond directly and start the conversation.',
  },
  {
    question: 'Do you charge a commission on bookings?',
    answer:
      'No. We don\'t take a cut of your bookings or consultations. When a client contacts you through our platform, that relationship is yours.',
  },
  {
    question: 'How does the verified badge help my clinic?',
    answer:
      'The verified badge signals to potential clients that your clinic has been confirmed by a real owner. Verified listings stand out in search results and build more trust with people comparing options.',
  },
]

export default function ForClinicsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between p-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-card-foreground pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
