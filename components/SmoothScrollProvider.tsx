'use client'

import React from 'react'
import { ReactLenis } from 'lenis/react'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * SmoothScrollProvider powered by Lenis
 * Replicates the heavy, weighted physical scroll feel from benjaminsharvell
 * (lerp: 0.08, duration: 1.4, wheelMultiplier: 0.85)
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
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
