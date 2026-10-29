'use client'

import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface AboutBentoSectionProps {
  profile: ProfileData
}

export function AboutBentoSection({ profile }: AboutBentoSectionProps) {
  return (
    <section id="about" className="w-full py-8 sm:py-12 md:py-16 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-14 shadow-2xs">
        {/* Section Header */}
        <div className="mb-6 sm:mb-10">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Background & Mindset
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            About My Engineering Journey
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left Column: Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Right Column: Key Skills & Technical Disciplines */}
          <div className="lg:col-span-5 bg-zinc-50/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-black/[0.04]">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3.5 sm:mb-4">
              Core Technical Competencies
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-zinc-200/80 text-xs sm:text-sm font-medium text-zinc-700 shadow-2xs transition-colors hover:border-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
