'use client'

import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface MinimalFooterProps {
  profile: ProfileData
}

export function MinimalFooter({ profile }: MinimalFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500 font-medium border-t border-black/[0.05] pt-8">
        {/* Left: Clean Copyright */}
        <p className="tracking-tight text-zinc-500">
          &copy; {currentYear} {profile.name || 'Vi Nguyen'}. All rights reserved.
        </p>

        {/* Right: Minimal Social Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-300">/</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-300">/</span>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-zinc-950 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
