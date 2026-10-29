'use client'

import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2, ExternalLink } from 'lucide-react'
import type { ProjectItem } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'
import { motion, type PanInfo } from 'framer-motion'

interface StackingProjectsSectionProps {
  projects: ProjectItem[]
}

// Clean text helper to strictly prevent any emoji
function cleanText(text?: string) {
  if (!text) return ''
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .trim()
}

/* =========================================================================
   1. DESKTOP STACKING CARDS (Layered Depth, 24px step, 12px fan, 0.5deg rot)
   ========================================================================= */

interface DesktopCardProps {
  project: ProjectItem
  index: number
  total: number
}

function DesktopStackingCard({ project, index, total }: DesktopCardProps) {
  const imageSrc =
    project.imageUrl && project.imageUrl.trim() !== ''
      ? project.imageUrl
      : '/assets/png/studymate/homepage.png'
  const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]
  const projectNumber = String(index + 1).padStart(2, '0')
  const totalCount = String(total).padStart(2, '0')

  const topDesktop = 32 + index * 24
  const xOffsetDesktop = index * 12
  const rotateDesktop = index * 0.5
  const isLast = index === total - 1

  return (
    <div
      className={`sticky stacking-card-item w-full flex items-start justify-center ${
        isLast ? 'pb-24' : 'pb-36'
      }`}
      style={{
        zIndex: index + 1,
        ['--top-desktop' as any]: `${topDesktop}px`,
      }}
    >
      <div
        className="stacking-card-content w-full min-h-[480px] flex flex-col justify-between bg-white rounded-[36px] border border-zinc-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.03),0_20px_45px_-10px_rgba(0,0,0,0.10)] p-8 lg:p-10 overflow-hidden"
        style={{
          ['--x-desktop' as any]: `${xOffsetDesktop}px`,
          ['--rot-desktop' as any]: `${rotateDesktop}deg`,
        }}
      >
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Details */}
          <div className="col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Header Info Row */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-sm font-mono font-semibold text-zinc-500 tracking-wider">
                  {projectNumber} / {totalCount}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-sm font-semibold tracking-wide">
                  {displayBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight text-zinc-950 mb-3 leading-snug">
                {cleanText(project.title)}
              </h3>

              {/* Description */}
              <p className="text-base lg:text-lg text-zinc-600 leading-relaxed font-normal mb-5">
                {project.subtitle}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.toolsUsed.slice(0, 5).map((tool) => (
                  <span
                    key={tool}
                    className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-100">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center min-h-[42px] gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                Case Study
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </Link>

              {project.liveDemo && (
                <motion.a
                  variants={pillButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[42px] gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-800 text-sm font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                </motion.a>
              )}

              {project.githubBackend && (
                <motion.a
                  variants={pillButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  href={project.githubBackend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[42px] gap-2 px-5 py-2.5 rounded-full border border-zinc-200 bg-white text-zinc-800 text-sm font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                >
                  <Code2 className="w-4 h-4 text-zinc-600" />
                  Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Right Column: High-Res Project Preview Mockup */}
          <div className="col-span-7">
            <div className="relative w-full h-[320px] lg:h-[350px] rounded-3xl overflow-hidden bg-zinc-100/90 border border-black/[0.05] shadow-inner group shrink-0">
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                sizes="55vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   2. MOBILE COVERFLOW CAROUSEL (Adapted from benjaminsharvell/testimonials)
   ========================================================================= */

interface MobileCoverflowProps {
  projects: ProjectItem[]
}

function MobileCoverflowCarousel({ projects }: MobileCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = projects.length

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40
    if (info.offset.x < -swipeThreshold) {
      handleNext()
    } else if (info.offset.x > swipeThreshold) {
      handlePrev()
    }
  }

  const getOffset = (index: number) => {
    if (count <= 1) return 0
    let diff = index - activeIndex
    if (diff > count / 2) diff -= count
    else if (diff < -count / 2) diff += count
    return diff
  }

  return (
    <div className="w-full overflow-hidden py-4">
      {/* Coverflow Stage: Center card + side peeking cards */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        {projects.map((project, index) => {
          const offset = getOffset(index)
          const isCurrent = offset === 0
          const isPeekLeft = offset === -1
          const isPeekRight = offset === 1
          const isVisible = Math.abs(offset) <= 1

          const imageSrc =
            project.imageUrl && project.imageUrl.trim() !== ''
              ? project.imageUrl
              : '/assets/png/studymate/homepage.png'
          const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]
          const projectNumber = String(index + 1).padStart(2, '0')
          const totalCount = String(count).padStart(2, '0')

          return (
            <motion.div
              key={project._id || project.slug}
              initial={false}
              animate={{
                scale: isCurrent ? 1 : isVisible ? 0.88 : 0.75,
                opacity: isCurrent ? 1 : isVisible ? 0.45 : 0,
                x: isCurrent ? '0%' : isPeekLeft ? '-72%' : isPeekRight ? '72%' : offset < 0 ? '-140%' : '140%',
                zIndex: isCurrent ? 30 : isVisible ? 10 : 0,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              drag={isCurrent ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (isPeekLeft) handlePrev()
                if (isPeekRight) handleNext()
              }}
              className={`absolute w-[calc(100%-32px)] max-w-sm cursor-pointer select-none ${
                isCurrent ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              <div className="flex flex-col justify-between bg-white rounded-3xl border border-zinc-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.03),0_20px_45px_-10px_rgba(0,0,0,0.12)] p-5 overflow-hidden">
                {/* Header Info Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-mono font-semibold text-zinc-500 tracking-wider">
                    {projectNumber} / {totalCount}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-semibold tracking-wide">
                    {displayBadge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-zinc-950 mb-1 leading-snug line-clamp-1">
                  {cleanText(project.title)}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed font-normal line-clamp-2 mb-3">
                  {project.subtitle}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {project.toolsUsed.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-zinc-100 mb-3.5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center h-9 gap-1.5 rounded-full bg-zinc-950 px-4 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
                  >
                    Case Study
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>

                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-9 gap-1.5 px-3.5 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                    >
                      Live Demo
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                  )}

                  {project.githubBackend && (
                    <a
                      href={project.githubBackend}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-9 gap-1.5 px-3.5 rounded-full border border-zinc-200 bg-white text-zinc-800 text-xs font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                    >
                      <Code2 className="w-3 h-3 text-zinc-600" />
                      Code
                    </a>
                  )}
                </div>

                {/* Preview Mockup: Aspect 16/10 with object-contain to show 100% full image */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100/90 border border-black/[0.05] shadow-inner shrink-0">
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 400px"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Pagination Controls & Indicator Dots */}
      <div className="mt-6 flex items-center justify-center gap-4 relative z-40">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className="size-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project._id || project.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-zinc-950' : 'w-2 bg-zinc-300'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="size-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* =========================================================================
   3. ROOT STACKING PROJECTS SECTION (Responsive: Desktop Stacking, Mobile Coverflow)
   ========================================================================= */

export function StackingProjectsSection({ projects }: StackingProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200/80 bg-white text-zinc-700 text-xs sm:text-sm font-medium shadow-2xs mb-4">
          Featured Work
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
          Selected Engineering Projects
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
          Real-world applications engineered with modular architectures, scalable databases, and performance trade-offs.
        </p>
      </div>

      {/* Desktop View: Natural Sticky Deck with Layered Rotation & Fan */}
      <div className="hidden md:block relative">
        {projects.map((project, index) => (
          <DesktopStackingCard
            key={project._id || project.slug}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Mobile View: Coverflow Swipeable Carousel (From benjaminsharvell testimonials) */}
      <div className="block md:hidden">
        <MobileCoverflowCarousel projects={projects} />
      </div>
    </section>
  )
}
