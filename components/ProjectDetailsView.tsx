'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  ExternalLink,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Compass,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import type { ProjectItem } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ProjectDetailsViewProps {
  project: ProjectItem
  nextProject?: ProjectItem
}

function cleanText(text?: string) {
  if (!text) return ''
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .trim()
}

export function ProjectDetailsView({ project, nextProject }: ProjectDetailsViewProps) {
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const sliderRef = React.useRef<HTMLDivElement>(null)
  const isDraggingRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const scrollLeftRef = React.useRef(0)
  const hasMovedRef = React.useRef(false)

  const galleryItems = (project.gallery && project.gallery.length > 0 ? project.gallery : [])
    .filter((item) => Boolean(item && item.imageUrl && item.imageUrl.trim() !== ''))

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    })
    setCurrentSlideIndex(index)
  }

  const handleSliderScroll = () => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.clientWidth
    if (slideWidth === 0) return
    const newIndex = Math.round(container.scrollLeft / slideWidth)
    if (newIndex >= 0 && newIndex < galleryItems.length && newIndex !== currentSlideIndex) {
      setCurrentSlideIndex(newIndex)
    }
  }

  const handlePrevSlide = React.useCallback(() => {
    if (galleryItems.length === 0) return
    const prev = currentSlideIndex === 0 ? galleryItems.length - 1 : currentSlideIndex - 1
    scrollToSlide(prev)
  }, [galleryItems.length, currentSlideIndex])

  const handleNextSlide = React.useCallback(() => {
    if (galleryItems.length === 0) return
    const next = currentSlideIndex === galleryItems.length - 1 ? 0 : currentSlideIndex + 1
    scrollToSlide(next)
  }, [galleryItems.length, currentSlideIndex])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !sliderRef.current) return
    isDraggingRef.current = false
    const container = sliderRef.current
    const slideWidth = container.clientWidth
    if (slideWidth > 0) {
      const nearestIndex = Math.round(container.scrollLeft / slideWidth)
      scrollToSlide(nearestIndex)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setActiveLightboxImage(null)
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide()
      } else if (e.key === 'ArrowRight') {
        handleNextSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrevSlide, handleNextSlide])

  const showcaseImage =
    project.imageUrl && project.imageUrl.trim() !== ''
      ? project.imageUrl
      : '/assets/png/studymate/homepage.png'
  const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0] || 'ENGINEERING'

  // Default key impact stats fallback (matching SDv26 keynums format)
  const stats = project.stats && project.stats.length > 0
    ? project.stats
    : [
        {
          value: project.results?.modulesCount?.split(',')[0]?.trim() || '4',
          label: 'Core Architecture Modules',
          description: 'Specialized enterprise engineering components designed and delivered.',
        },
        {
          value: String(project.toolsUsed?.length || 8),
          label: 'Technologies Orchestrated',
          description: 'Modern full-stack toolchain integrated into a production system.',
        },
        {
          value: '100%',
          label: 'Verified Reliability',
          description: 'Tested and proven functional across responsive cross-device views.',
        },
      ]

  const hasStructuredCaseStudy = Boolean(
    project.problemStatement || project.process || (project.challenges && project.challenges.length > 0)
  )

  const chapter1Image = galleryItems[0]?.imageUrl || showcaseImage
  const chapter2Image = galleryItems[1]?.imageUrl || galleryItems[0]?.imageUrl || showcaseImage
  const chapter4Image = galleryItems[2]?.imageUrl || galleryItems[1]?.imageUrl || showcaseImage

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pb-16 sm:pb-28">
      {/* 1. TOP BREADCRUMB & METRICS BAR */}
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 pt-3 sm:pt-5">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>Work</span>
          <span className="text-zinc-300">/</span>
          <span className="text-zinc-950 font-semibold">{cleanText(project.title)}</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs sm:text-sm font-semibold text-zinc-800 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{displayBadge}</span>
        </div>
      </div>

      {/* 2. SDv26 HERO HEADER (.phead-b) */}
      <header className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-12 md:p-16 mb-8 sm:mb-12">
        <div className="max-w-4xl">
          {/* Eyebrow / Tagline */}
          <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-6 h-px bg-zinc-400 inline-block" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-zinc-400">
              CASE STUDY · {displayBadge.toUpperCase()}
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] mb-4 sm:mb-6">
            {cleanText(project.title)}
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="text-base sm:text-xl text-zinc-600 leading-relaxed font-normal mb-6 sm:mb-8 max-w-3xl">
            {project.subtitle}
          </p>

          {/* Role Pill */}
          {project.role && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
              <span>Role: {project.role}</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveDemo && (
              <motion.a
                variants={pillButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
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
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4.5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                <span>{project.githubFrontend ? 'Backend Repo' : 'GitHub Repository'}</span>
              </motion.a>
            )}

            {project.githubFrontend && (
              <motion.a
                variants={pillButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                href={project.githubFrontend}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4.5 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                <span>Frontend Repo</span>
              </motion.a>
            )}
          </div>
        </div>
      </header>

      {/* 3. SDv26 KEY IMPACT NUMBERS (.keynums) */}
      <section className="mb-8 sm:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200/90 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-zinc-200/90 shadow-2xs">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-10 relative group hover:bg-zinc-50/80 transition-colors flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-none mb-3 tabular-nums font-mono">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                  {stat.label}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mt-2.5">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SDv26 BUILT WITH TECH GRID (.techgrid) */}
      <section className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12 mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-px bg-zinc-400 inline-block" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            01 / TECH STACK
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-6">
          Built <span className="font-serif italic font-normal text-zinc-500">with</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {project.toolsUsed.map((tool) => (
            <div
              key={tool}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-2xs hover:border-zinc-400 hover:bg-white transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-zinc-950 transition-colors" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-800 truncate">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SDv26 HERO SHOWCASE SHOT (.shot-b.glow) */}
      <section className="mb-10 sm:mb-16">
        <div
          onClick={() =>
            setActiveLightboxImage({
              src: showcaseImage,
              alt: `${project.title} Preview`,
            })
          }
          className="relative w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-black/[0.08] shadow-md cursor-pointer group bg-zinc-950/5"
        >
          <img
            src={showcaseImage}
            alt={project.title}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-zinc-900 shadow-md flex items-center gap-2">
              <Eye className="w-4 h-4 text-zinc-600" />
              <span>Click to inspect preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SDv26 CHAPTER BY CHAPTER (.chap-b) */}
      {hasStructuredCaseStudy ? (
        <section className="space-y-8 sm:space-y-12 mb-10 sm:mb-16">
          {/* Eyebrow & Chapter Header */}
          <div className="px-2">
            <p className="text-xs font-mono font-semibold tracking-widest uppercase text-zinc-400 mb-2 flex items-center gap-2.5">
              <span className="w-6 h-px bg-zinc-400 inline-block" />
              <span>02 / THE WORK</span>
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Chapter by <span className="font-serif italic font-normal text-zinc-500">chapter.</span>
            </h2>
          </div>

          {/* CHAPTER 01: THE CHALLENGE */}
          {project.problemStatement && (
            <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                    01
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-1 mb-4">
                    The Challenge & Problem Space
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                    {project.problemStatement}
                  </p>
                </div>

                <div
                  onClick={() =>
                    setActiveLightboxImage({
                      src: chapter1Image,
                      alt: 'The Challenge View',
                    })
                  }
                  className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-2xs cursor-pointer group self-center"
                >
                  <img
                    src={chapter1Image}
                    alt="The Challenge View"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-900 shadow-md">
                      Inspect Full View
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 02: THE APPROACH & ARCHITECTURE (FLIPPED ON DESKTOP) */}
          {project.process && (
            <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div
                  onClick={() =>
                    setActiveLightboxImage({
                      src: chapter2Image,
                      alt: 'System Architecture View',
                    })
                  }
                  className="lg:col-span-5 order-2 lg:order-1 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-2xs cursor-pointer group self-center"
                >
                  <img
                    src={chapter2Image}
                    alt="System Architecture View"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-900 shadow-md">
                      Inspect Full View
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                    02
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-1 mb-4">
                    The Approach & System Design
                  </h3>
                  <div className="space-y-3.5">
                    {project.process.tabRationale && (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block mb-1">
                          Subsystem Decomposition
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                          {project.process.tabRationale}
                        </p>
                      </div>
                    )}
                    {project.process.contentCuration && (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block mb-1">
                          Curation & Verification Standards
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                          {project.process.contentCuration}
                        </p>
                      </div>
                    )}
                    {project.process.architectureData && (
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-400 block mb-1">
                          Data Architecture & State Handling
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                          {project.process.architectureData}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 03: TECHNICAL CHALLENGES & TRADE-OFFS */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12">
              <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                03
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-1 mb-6">
                Technical Challenges & Solutions
              </h3>

              <div className="space-y-6">
                {project.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-5 sm:p-7 md:p-8"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-mono font-semibold">
                        {idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900">
                        {c.title || `Technical Hurdle ${idx + 1}`}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      {/* Step 1: Challenge */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-700 flex items-center gap-1.5 mb-2">
                          <AlertCircle className="w-3.5 h-3.5" /> The Challenge
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.issue}</p>
                      </div>

                      {/* Step 2: Explored */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 flex items-center gap-1.5 mb-2">
                          <Lightbulb className="w-3.5 h-3.5" /> Explored Options
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.attempted}</p>
                      </div>

                      {/* Step 3: Decision */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 flex items-center gap-1.5 mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Chosen Solution
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.solution}</p>
                      </div>

                      {/* Step 4: Rationale */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-700 flex items-center gap-1.5 mb-2">
                          <Compass className="w-3.5 h-3.5" /> Rationale & Trade-offs
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHAPTER 04: OUTCOMES & METRICS (FLIPPED ON DESKTOP) */}
          {project.results && (
            <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                    04
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mt-1 mb-4">
                    Outcomes & Tangible Impact
                  </h3>
                  <div className="p-5 rounded-2xl bg-zinc-950 text-white mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                      Scope Delivered
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      {project.results.modulesCount || 'Full Production Release'}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.results.summary}
                    </p>
                  </div>
                  {project.results.practicalImpact && (
                    <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1.5">
                        Practical Application
                      </span>
                      <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                        {project.results.practicalImpact}
                      </p>
                    </div>
                  )}
                </div>

                <div
                  onClick={() =>
                    setActiveLightboxImage({
                      src: chapter4Image,
                      alt: 'Outcomes View',
                    })
                  }
                  className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-2xs cursor-pointer group self-center"
                >
                  <img
                    src={chapter4Image}
                    alt="Outcomes View"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-900 shadow-md">
                      Inspect Full View
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* Legacy Overview Fallback */
        <section className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mb-4">
            Project Overview
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {project.overview && project.overview.length > 0 ? (
              project.overview.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            ) : (
              <p>{project.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* 7. SDv26 VISUAL SHOWCASE GALLERY CAROUSEL */}
      {galleryItems.length > 0 && (
        <section className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
            <div>
              <p className="text-xs font-mono font-semibold tracking-widest uppercase text-zinc-400 mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-zinc-400 inline-block" />
                <span>03 / INTERFACE GALLERY</span>
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
                Visual Showcase & <span className="font-serif italic font-normal text-zinc-500">Previews</span>
              </h3>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
              <span className="text-xs sm:text-sm font-mono font-medium text-zinc-500 px-3 py-1 rounded-full bg-zinc-100">
                {String(currentSlideIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
              </span>

              <button
                onClick={handlePrevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleNextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Swipeable Photo Track */}
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl sm:rounded-3xl border border-black/[0.08] shadow-sm select-none cursor-grab active:cursor-grabbing bg-zinc-950"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full shrink-0 snap-center aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-zinc-950 overflow-hidden group"
                onClick={() => {
                  if (!hasMovedRef.current) {
                    setActiveLightboxImage({
                      src: item.imageUrl,
                      alt: item.caption || `${project.title} Screenshot ${idx + 1}`,
                    })
                  }
                }}
              >
                <div className="relative w-full h-full">
                  {item.imageUrl && item.imageUrl.trim() !== '' && (
                    <Image
                      src={item.imageUrl}
                      alt={item.caption || `${project.title} Screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-cover object-top pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
                      priority={idx === 0}
                    />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pointer-events-none">
                  {item.caption ? (
                    <span className="text-xs sm:text-sm font-medium text-white/95 backdrop-blur-md bg-black/40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full">
                      {item.caption}
                    </span>
                  ) : (
                    <div />
                  )}

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-zinc-900 shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Inspect Full View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Thumbnail Navigation Strip */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pt-4 sm:pt-5 pb-1">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`relative shrink-0 w-16 h-11 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'border-2 border-zinc-950 scale-105 shadow-sm opacity-100 ring-2 ring-zinc-950/10'
                    : 'border-zinc-200/80 opacity-50 hover:opacity-90'
                }`}
                aria-label={`Go to screenshot ${idx + 1}`}
              >
                {item.imageUrl && item.imageUrl.trim() !== '' && (
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || `Thumbnail ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 8. SDv26 RETROSPECTIVE & FUTURE ROADMAP */}
      {project.lessons && (
        <section className="bg-white rounded-[28px] sm:rounded-[40px] border border-black/[0.06] shadow-2xs p-6 sm:p-10 md:p-12 mb-8 sm:mb-12">
          <p className="text-xs font-mono font-semibold tracking-widest uppercase text-zinc-400 mb-2 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-400 inline-block" />
            <span>04 / RETROSPECTIVE & ROADMAP</span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 mb-6 sm:mb-8">
            Key Takeaways & <span className="font-serif italic font-normal text-zinc-500">Future Milestones</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-400 block mb-2">
                What To Do Differently (Retrospective)
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                {project.lessons.whatToDoDifferently}
              </p>
            </div>

            <div className="p-6 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-400 block mb-2">
                Next Steps & Architectural Roadmap
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                {project.lessons.nextSteps}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 9. SDv26 NEXT CASE STUDY BANNER (.next-b) */}
      {nextProject && (
        <section>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block bg-zinc-950 text-white rounded-[28px] sm:rounded-[40px] p-6 sm:p-12 md:p-16 hover:bg-zinc-900 transition-colors shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                  Next Case Study →
                </span>
                <h4 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  {cleanText(nextProject.title)}
                </h4>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl line-clamp-2">
                  {nextProject.subtitle}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-950 group-hover:bg-zinc-100 transition-colors shrink-0 self-end sm:self-auto">
                <span>View Case Study</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 10. LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center cursor-default"
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                {activeLightboxImage.src && activeLightboxImage.src.trim() !== '' && (
                  <Image
                    src={activeLightboxImage.src}
                    alt={activeLightboxImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
              {activeLightboxImage.alt && (
                <div className="mt-3 sm:mt-4 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-xs sm:text-sm text-white/90 font-medium text-center">
                  {activeLightboxImage.alt}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
