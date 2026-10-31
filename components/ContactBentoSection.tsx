'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ProfileData } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ContactBentoSectionProps {
  profile: ProfileData
}

export function ContactBentoSection({ profile }: ContactBentoSectionProps) {
  const displayEmail = profile.email || 'contact@vinguyen.id.vn'

  return (
    <section id="contact" className="w-full py-8 sm:py-12 md:py-16 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Contact Bento Card */}
      <div className="relative bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] shadow-sm p-6 sm:p-12 md:p-20 text-center overflow-hidden">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 leading-tight max-w-2xl mx-auto">
          {profile.contactHeading || 'Tell me about your next project or role'}
        </h2>

        {/* Divider */}
        <div className="w-16 sm:w-28 md:w-32 h-px bg-zinc-200 mx-auto my-5 sm:my-8" />

        {/* Subtitle / Note */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed font-normal">
          {profile.contactSubtitle ||
            'Currently open to Backend and Full-Stack Developer opportunities. Feel free to reach out directly to discuss how I can contribute.'}
        </p>

        {/* Action Buttons Row */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          {/* Primary Action Button (Email Me) */}
          <motion.a
            variants={pillButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            href={`mailto:${displayEmail}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Email Me
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </motion.a>

          {/* Dynamic Social Action Buttons */}
          {(profile.socialLinks && profile.socialLinks.length > 0
            ? profile.socialLinks
            : [
                { name: 'LinkedIn', url: profile.linkedin },
                { name: 'GitHub', url: profile.github },
              ]
          ).map((social, idx) => (
            <motion.a
              key={social.name || idx}
              variants={pillButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              {social.name}
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
