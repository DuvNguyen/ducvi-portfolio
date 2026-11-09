'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, FileText, Copy, Check, Mail } from 'lucide-react'
import type { ProfileData } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ContactBentoSectionProps {
  profile: ProfileData
}

export function ContactBentoSection({ profile }: ContactBentoSectionProps) {
  const [copied, setCopied] = useState(false)
  const displayEmail = profile.email || 'nducvi.information@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(displayEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="w-full py-8 sm:py-12 md:py-16 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Contact Bento Card */}
      <div className="relative bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] shadow-sm p-6 sm:p-12 md:p-16 text-center overflow-hidden">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-5 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {profile.availability || 'Available Immediately • Open to Interview Requests'}
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 leading-tight max-w-2xl mx-auto">
          {profile.contactHeading || "Let's discuss how I can bring value to your engineering team"}
        </h2>

        {/* Divider */}
        <div className="w-16 sm:w-28 md:w-32 h-px bg-zinc-200 mx-auto my-5 sm:my-8" />

        {/* Subtitle / Note */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
          {profile.contactSubtitle ||
            'Currently interviewing for Backend and Software Engineer roles. Feel free to reach out directly to discuss opportunities.'}
        </p>

        {/* Action Buttons Row */}
        <div className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          {/* Primary Action Button (Email Me) */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={`mailto:${displayEmail}?subject=Interview%20Invitation%20-%20Backend%20Engineer%20Role`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4 text-zinc-300" />
            Send Email
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </motion.a>

          {/* Copy Email Button */}
          <motion.button
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-500" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>

          {/* CV Download Button */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={profile.cvUrl || '/assets/cv.pdf'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
          >
            <FileText className="w-4 h-4 text-zinc-500" />
            Download CV
          </motion.a>

          {/* LinkedIn Action Button */}
          {profile.linkedin && (
            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              LinkedIn
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </motion.a>
          )}
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          Guaranteed response within 24 hours. Based in Vietnam, open to remote and relocation.
        </p>
      </div>
    </section>
  )
}
