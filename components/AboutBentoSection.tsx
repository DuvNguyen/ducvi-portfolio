'use client'

import React from 'react'
import type { ProfileData } from '@/lib/defaultData'

interface AboutBentoSectionProps {
  profile: ProfileData
}

export function AboutBentoSection({ profile }: AboutBentoSectionProps) {
  return (
    <section id="about" className="w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] p-8 sm:p-12 md:p-16 shadow-2xs">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-4">
            Background & Mindset
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            About My Engineering Journey
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Right Column: Key Skills & Technical Disciplines */}
          <div className="lg:col-span-5 bg-zinc-50/80 rounded-3xl p-6 sm:p-8 border border-black/[0.04]">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Core Technical Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-zinc-200/70 text-xs sm:text-sm font-medium text-zinc-800 shadow-2xs"
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
