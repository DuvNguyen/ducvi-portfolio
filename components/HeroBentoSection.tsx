'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ProfileData } from '@/lib/defaultData'
import {
  containerVariants,
  itemVariants,
  pillButtonVariants,
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
    <section className="w-full pt-4 sm:pt-6 md:pt-10 pb-4 sm:pb-6 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Main Soft Bento Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] shadow-sm p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Top Navigation Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-12 text-xs sm:text-sm"
        >
          {/* Left: Email, Copy, and CV Action Buttons */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 justify-center sm:justify-start max-w-full">
            <span className="text-zinc-600 font-medium text-xs sm:text-sm select-all max-w-[210px] sm:max-w-none truncate">
              {displayEmail}
            </span>

            {/* Copy Button */}
            <motion.button
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center min-h-[32px] px-3.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs sm:text-sm font-medium hover:bg-zinc-50 transition-colors cursor-pointer shadow-2xs"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    className="text-emerald-700 font-medium"
                  >
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
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
              className="inline-flex items-center justify-center min-h-[32px] px-3.5 py-1 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs sm:text-sm font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              CV
            </motion.a>
          </div>

          {/* Right: Clean Social Navigation */}
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-3 sm:gap-5 text-zinc-500 font-medium text-xs sm:text-sm">
            {(profile.socialLinks && profile.socialLinks.length > 0
              ? profile.socialLinks
              : [
                  { name: 'LinkedIn', url: profile.linkedin },
                  { name: 'GitHub', url: profile.github },
                ]
            ).map((social, idx) => (
              <React.Fragment key={social.name || idx}>
                {idx > 0 && <span className="text-zinc-300 font-light">/</span>}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-950 transition-colors py-1"
                >
                  {social.name}
                </a>
              </React.Fragment>
            ))}
            <span className="text-zinc-300 font-light">/</span>
            <a
              href={`mailto:${displayEmail}`}
              className="hover:text-zinc-950 transition-colors py-1"
            >
              Email
            </a>
          </div>
        </motion.div>

        {/* Center Hero Content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2 sm:py-4">
          {/* Avatar: Clean, unobstructed headshot (no floating text covering the face) */}
          <motion.div variants={itemVariants} className="relative mb-5 sm:mb-7">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-zinc-200/90 shadow-md bg-zinc-100 ring-4 ring-black/[0.02]">
              <Image
                src="/assets/png/avatar.png"
                alt={profile.name || 'Vi Nguyen'}
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Clean, Bold Hero Heading - Harmonious proportion */}
          <motion.h1
            variants={itemVariants}
            className="text-[28px] sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-zinc-950 leading-[1.2] sm:leading-[1.16] max-w-2xl sm:max-w-3xl"
          >
            {profile.heroHeadline || 'Building digital products, robust backends, and scalable systems.'}
          </motion.h1>

          {/* Subtitle / Bio - Comfortable reading size on mobile */}
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-600 max-w-2xl leading-relaxed font-normal"
          >
            {profile.heroBio}
          </motion.p>

          {/* Primary CTA Button with Clean Lucide SVG Vector Arrow (Strictly no Unicode emoji) */}
          <motion.div variants={itemVariants} className="mt-7 sm:mt-10">
            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href="#projects"
              className="inline-flex items-center gap-2.5 rounded-full bg-zinc-950 px-8 py-3.5 sm:px-10 sm:py-4.5 text-base sm:text-lg font-semibold text-white hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
