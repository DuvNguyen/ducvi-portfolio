'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function Header() {
  const pathname = usePathname()

  // On the homepage and inside Sanity Studio, hide the floating header
  if (pathname === '/' || pathname.startsWith('/studio')) {
    return null
  }

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto pointer-events-none mb-4 sm:mb-6">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-sm pointer-events-auto transition-all">
        {/* Left: Avatar + Brand & Home Link */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100 shadow-2xs">
            <Image
              src="/assets/png/avatar.png"
              alt="Vi Nguyen"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
            Vi Nguyen
          </span>
        </Link>

        {/* Center / Right: Clean Navigation */}
        <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-zinc-600">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
            Projects
          </Link>
          <Link href="/#about" className="hover:text-zinc-950 transition-colors">
            About
          </Link>
          <a
            href="mailto:nducvi.information@gmail.com"
            className="rounded-full bg-zinc-950 px-4 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
