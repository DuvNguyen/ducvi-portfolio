'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  // Start hidden at the top of the homepage so there is no reserved space or gap at first
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop
    let accumulatedUpScroll = 0
    let accumulatedDownScroll = 0

    // Thresholds modeled after iOS Safari / Facebook mobile navigation bars:
    // - Downward scroll hides promptly (15px) so content has full viewport focus.
    // - Upward scroll requires an intentional gesture (50px accumulated upward scroll)
    //   so micro-scrolls (e.g. 5-30px) when reading lines won't trigger the header.
    const SCROLL_UP_THRESHOLD = 50
    const SCROLL_DOWN_THRESHOLD = 15
    const TOP_OFFSET = 80 // When near the top, keep hidden so hero stays clean

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop

      // Prevent iOS rubber-banding bounce at top from triggering false reveals
      if (currentScrollY < 0) return

      const diff = currentScrollY - lastScrollY

      // 1. Hide when near the very top of the page (no header & no gap at first)
      if (currentScrollY <= TOP_OFFSET) {
        setIsVisible(false)
        accumulatedUpScroll = 0
        accumulatedDownScroll = 0
        lastScrollY = currentScrollY
        return
      }

      // 2. Scrolling DOWN -> hide header
      if (diff > 0) {
        accumulatedUpScroll = 0
        accumulatedDownScroll += diff

        if (accumulatedDownScroll >= SCROLL_DOWN_THRESHOLD) {
          setIsVisible(false)
        }
        lastScrollY = currentScrollY
        return
      }

      // 3. Scrolling UP (diff < 0) -> requires intentional upward distance
      if (diff < 0) {
        accumulatedDownScroll = 0
        accumulatedUpScroll += Math.abs(diff)

        // Only reveal if user has intentionally scrolled up past threshold
        if (accumulatedUpScroll >= SCROLL_UP_THRESHOLD) {
          setIsVisible(true)
        }
        lastScrollY = currentScrollY
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isHome])

  // Inside Sanity Studio, hide the floating header so CMS has full viewport control
  if (pathname.startsWith('/studio')) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-4 inset-x-0 z-50 w-full px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto pointer-events-none"
    >
      <div
        className={`flex items-center justify-between bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-sm hover:shadow-md transition-all ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
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
        <nav className="flex items-center gap-2.5 sm:gap-5 text-xs sm:text-sm font-medium text-zinc-600">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 hover:text-zinc-950 transition-colors"
          >
            {!isHome && <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />}
            Projects
          </Link>
          <Link
            href="/blog"
            className={`hover:text-zinc-950 transition-colors ${
              pathname.startsWith('/blog') ? 'text-zinc-950 font-semibold' : ''
            }`}
          >
            Blog
          </Link>
          <Link href="/#about" className="hover:text-zinc-950 transition-colors">
            About
          </Link>
          <a
            href="/assets/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-950 transition-colors"
          >
            CV
          </a>
          <Link
            href="/#contact"
            className="rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
