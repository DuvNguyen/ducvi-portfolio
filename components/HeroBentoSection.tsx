'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  FileText,
  Sparkles,
  MapPin,
  Briefcase,
  Calendar,
  Layers,
} from 'lucide-react'
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
    <section className="w-full pt-3.5 sm:pt-6 md:pt-8 pb-4 sm:pb-6 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
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

          {/* Primary CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href="#projects"
              className="inline-flex items-center gap-2.5 rounded-full bg-zinc-950 px-7 py-3 sm:px-9 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg cursor-pointer group"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-zinc-400 group-hover:text-white transition-colors" />
            </motion.a>

            <motion.a
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href={profile.cvUrl || '/assets/cv.pdf'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              <FileText className="w-4 h-4 text-zinc-500" />
              Download CV
            </motion.a>
          </motion.div>
        </div>

        {/* Recruiter Fast-Track Card: Designed for 30-Second HR & Hiring Manager Evaluation */}
        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-12 w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50/80 to-white/90 backdrop-blur-xs p-5 sm:p-7 md:p-8 text-left shadow-2xs"
        >
          {/* Header row: badge + status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-zinc-200/70">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Recruiter Fast-Track
              </span>
              <span className="hidden sm:inline-block text-xs text-zinc-500 font-medium">
                60-second snapshot for Hiring Managers
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {profile.statusText || 'Available for Opportunities'}
            </div>
          </div>

          {/* 4-Item Quick-Scan Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                Target Role
              </div>
              <div className="text-sm font-semibold text-zinc-900">
                {profile.roleTitle || 'Backend & Software Engineer'}
              </div>
              <div className="text-xs text-zinc-500">
                Full-Time • Junior / Entry-Level
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-500" />
                Core Stack
              </div>
              <div className="text-sm font-semibold text-zinc-900">
                NestJS • Spring Boot
              </div>
              <div className="text-xs text-zinc-500">
                PostgreSQL • Redis • Kafka
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                Location
              </div>
              <div className="text-sm font-semibold text-zinc-900">
                Ho Chi Minh City, VN
              </div>
              <div className="text-xs text-zinc-500">
                Open to Remote / Relocation
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                Notice Period
              </div>
              <div className="text-sm font-semibold text-emerald-700">
                Available Immediately
              </div>
              <div className="text-xs text-zinc-500">
                Flexible start date
              </div>
            </div>
          </div>

          {/* Quick CTA Actions Row */}
          <div className="pt-4 border-t border-zinc-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-zinc-600">
              Actively interviewing — response guaranteed within 24 hours.
            </div>
            <div className="flex items-center flex-wrap gap-2.5">
              <a
                href={profile.cvUrl || '/assets/cv.pdf'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                Download CV (PDF)
              </a>
              <a
                href={`mailto:${displayEmail}?subject=Interview%20Invitation%20-%20Backend%20Engineer%20Role`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-300 bg-white text-zinc-800 text-xs sm:text-sm font-medium hover:bg-zinc-100 transition-colors shadow-2xs"
              >
                Schedule an Interview
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
