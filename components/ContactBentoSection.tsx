'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import type { ProfileData } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ContactBentoSectionProps {
  profile: ProfileData
}

export function ContactBentoSection({ profile }: ContactBentoSectionProps) {
  const displayEmail = profile.email || 'contact@vinguyen.id.vn'

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Contact Bento Card */}
      <div className="relative bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] shadow-sm p-8 sm:p-14 md:p-20 text-center overflow-hidden">
        {/* Subtle Icon Badge (Clean & functional, no emojis) */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-800 mb-6 mx-auto">
          <Mail className="w-5 h-5 stroke-[1.75]" />
        </div>

        {/* Section Heading (Clean, bold typography) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight max-w-2xl mx-auto">
          Tell me about your next project or role
        </h2>

        {/* Subtitle / Note */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed font-normal">
          Currently open to Backend and Full-Stack Developer opportunities. Feel free to reach out directly to discuss how I can contribute.
        </p>

        {/* Action Buttons Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* Primary Action Button (Email Me) */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={`mailto:${displayEmail}`}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Email Me
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </motion.a>

          {/* Secondary Action Button (LinkedIn) */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
          >
            LinkedIn
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </motion.a>

          {/* Tertiary Action Button (GitHub) */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
