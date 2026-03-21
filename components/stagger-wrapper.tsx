'use client'

import { useEffect, useRef, useState } from 'react'

interface StaggerWrapperProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export default function StaggerWrapper({ children, className = '', staggerDelay = 100 }: StaggerWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ['--stagger-delay' as string]: `${staggerDelay}ms`,
      }}
    >
      {isVisible ? children : (
        <div style={{ visibility: 'hidden' }}>{children}</div>
      )}
    </div>
  )
}

/* Wrapper for individual items within a stagger group */
export function StaggerItem({
  children,
  index,
  className = '',
  delay = 100,
}: {
  children: React.ReactNode
  index: number
  className?: string
  delay?: number
}) {
  return (
    <div
      className={`animate-stagger-in ${className}`}
      style={{ animationDelay: `${index * delay}ms` }}
    >
      {children}
    </div>
  )
}
