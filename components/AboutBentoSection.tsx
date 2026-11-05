'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Briefcase, Layers } from 'lucide-react'
import type { ProfileData, SkillItem } from '@/lib/defaultData'

interface AboutBentoSectionProps {
  profile: ProfileData
}

export function AboutBentoSection({ profile }: AboutBentoSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null)

  const currentIndex = selectedSkill
    ? profile.skills.findIndex((s) => s.name === selectedSkill.name)
    : -1

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedSkill(profile.skills[currentIndex - 1])
    } else {
      setSelectedSkill(profile.skills[profile.skills.length - 1])
    }
  }, [currentIndex, profile.skills])

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < profile.skills.length - 1) {
      setSelectedSkill(profile.skills[currentIndex + 1])
    } else {
      setSelectedSkill(profile.skills[0])
    }
  }, [currentIndex, profile.skills])

  // Handle keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!selectedSkill) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkill(null)
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedSkill, handlePrev, handleNext])

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
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSkill(skill)}
                  className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-zinc-200/80 text-xs sm:text-sm font-medium text-zinc-700 shadow-2xs transition-all duration-150 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                  aria-haspopup="dialog"
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal Dialog */}
      <AnimatePresence>
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedSkill(null)}
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Tag + Close Button */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200/70">
                    <Briefcase className="w-3 h-3 text-zinc-500" />
                    {selectedSkill.yearsOrLevel || 'Core Competency'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {currentIndex + 1} / {profile.skills.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h3
                id="skill-modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3"
              >
                {selectedSkill.name}
              </h3>

              {/* Experience Details */}
              <div className="space-y-4 my-2">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                    Hands-on Experience & Applied Architecture
                  </h4>
                  <div className="bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-100 text-sm sm:text-base text-zinc-700 leading-relaxed">
                    {selectedSkill.experience ||
                      `Hands-on practical experience applying ${selectedSkill.name} across full-stack applications, distributed microservices, and modern web architectures.`}
                  </div>
                </div>

                {/* Highlights / Projects */}
                {selectedSkill.highlights && selectedSkill.highlights.length > 0 && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-zinc-500" />
                      Key Highlights & Projects
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedSkill.highlights.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-white text-zinc-800 border border-zinc-200 shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Quick Navigation between competencies */}
              <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-zinc-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSkill(null)}
                    className="text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    Close (Esc)
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-zinc-100"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Horizontal scrollable pills strip inside modal */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                  {profile.skills.map((s, idx) => {
                    const isActive = s.name === selectedSkill.name
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSkill(s)}
                        className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-zinc-900 text-white font-medium shadow-xs'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {s.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
