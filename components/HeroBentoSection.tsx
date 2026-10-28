'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProfileData } from '@/lib/defaultData'
import {
  containerVariants,
  itemVariants,
  pillButtonVariants,
  floatingBadgeAnimation,
} from '@/lib/motion'

interface HeroBentoSectionProps {
  profile: ProfileData
}

export function HeroBentoSection({ profile }: HeroBentoSectionProps) {
  const [copied, setCopied] = useState(false)
  const displayEmail = profile.email || 'contact@vinguyen.id.vn'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(displayEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full pt-6 md:pt-10 pb-6 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Main Soft Bento Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white rounded-[32px] md:rounded-[44px] border border-black/[0.06] shadow-sm p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Top Navigation Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 sm:pb-14 text-sm"
        >
          {/* Left: Email, Copy, and CV Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5 justify-center sm:justify-start">
            <span className="text-zinc-600 font-medium select-all">
              {displayEmail}
            </span>

            {/* Copy Button */}
            <motion.button
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={handleCopyEmail}
              className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-medium hover:bg-zinc-50 transition-colors cursor-pointer shadow-2xs"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    className="text-emerald-700 font-semibold"
                  >
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                  >
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CV Download / View Button */}
            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href={profile.cvUrl || '/assets/cv.pdf'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              CV
            </motion.a>
          </div>

          {/* Right: Clean Social Navigation */}
          <div className="flex items-center gap-4 text-zinc-500 font-medium text-xs sm:text-sm">
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
              href={`mailto:${displayEmail}`}
              className="hover:text-zinc-950 transition-colors"
            >
              Email
            </a>
          </div>
        </motion.div>

        {/* Center Hero Content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2 sm:py-6">
          {/* Avatar with Subtle Floating Name Badge */}
          <motion.div variants={itemVariants} className="relative mb-6 sm:mb-8">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm bg-zinc-100">
              <Image
                src="/assets/png/avatar.png"
                alt={profile.name || 'Vi Nguyen'}
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover"
                priority
              />
            </div>

            {/* Pill Name Tag (No emojis / icon spam as instructed) */}
            <motion.div
              animate={floatingBadgeAnimation.animate}
              transition={floatingBadgeAnimation.transition}
              className="absolute -right-6 -top-1 bg-white border border-zinc-200/80 rounded-full px-3 py-0.5 text-xs font-medium text-zinc-800 shadow-xs select-none"
            >
              {profile.name || 'Vi Nguyen'}
            </motion.div>
          </motion.div>

          {/* Clean, Bold Hero Heading - Harmonious 3-line proportion */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-zinc-950 leading-[1.18] sm:leading-[1.16] max-w-2xl sm:max-w-3xl"
          >
            Building digital products, robust backends, and scalable systems.
          </motion.h1>

          {/* Subtitle / Bio */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm sm:text-base md:text-lg text-zinc-500 max-w-2xl leading-relaxed"
          >
            {profile.heroBio}
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div variants={itemVariants} className="mt-8 sm:mt-9">
            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Explore Projects <span className="text-zinc-400 font-light">↗</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
