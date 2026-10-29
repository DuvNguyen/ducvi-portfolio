'use client'

import React from 'react'
import { ReactLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * SmoothScrollProvider powered by Lenis
 * Replicates the heavy, weighted physical scroll feel from benjaminsharvell
 * (lerp: 0.08, duration: 1.4, wheelMultiplier: 0.85)
 * Disabled inside /studio so Sanity Studio has full native pane control.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()

  if (pathname.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      ref={(instance) => {
        if (typeof window !== 'undefined') {
          ;(window as any).lenis = instance?.lenis
        }
      }}
      options={{
        lerp: 0.08,
        duration: 1.4,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
