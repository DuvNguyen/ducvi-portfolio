'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      // Header stays visible at the top of the page (within 50px)
      // When scrolling down, it animates up and hides; returns when hitting the top
      setIsVisible(scrollY <= 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Inside Sanity Studio, hide the floating header so CMS has full viewport control
  if (pathname.startsWith('/studio')) {
    return null
  }

  const isHome = pathname === '/'

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : -90,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-4 z-50 w-full px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto pointer-events-none mb-2 sm:mb-4"
    >
      <div
        className={`flex items-center justify-between bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-sm transition-all ${
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
        <nav className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium text-zinc-600">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 hover:text-zinc-950 transition-colors"
          >
            {!isHome && <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />}
            Projects
          </Link>
          <Link href="/#about" className="hover:text-zinc-950 transition-colors">
            About
          </Link>
          <a
            href="/#contact"
            className="rounded-full bg-zinc-950 px-4 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
