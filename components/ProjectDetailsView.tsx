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
} from 'lucide-react'
import type { ProjectItem } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ProjectDetailsViewProps {
  project: ProjectItem
  nextProject?: ProjectItem
}

// Clean text helper to strictly eliminate any emoji
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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')

  const galleryItems = project.gallery && project.gallery.length > 0 ? project.gallery : []
  const currentSlide = galleryItems[currentSlideIndex]

  const handlePrevSlide = () => {
    if (galleryItems.length === 0) return
    setSlideDirection('left')
    setCurrentSlideIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    if (galleryItems.length === 0) return
    setSlideDirection('right')
    setCurrentSlideIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))
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
  }, [galleryItems.length])

  const showcaseImage = project.imageUrl || '/assets/png/studymate/homepage.png'
  const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pb-16 sm:pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pt-2 sm:pt-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          Back to Projects
        </Link>

        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/80 text-xs sm:text-sm font-semibold text-zinc-800 shadow-2xs">
          {displayBadge}
        </div>
      </div>

      {/* Main Hero Bento Card */}
      <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] shadow-sm p-8 sm:p-12 md:p-14 mb-8 sm:mb-10">
        <div className="max-w-3xl">
          {/* Project Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 mb-4 leading-tight">
            {cleanText(project.title)}
          </h1>

          {/* Subtitle / Architectural Summary */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-8">
            {project.subtitle}
          </p>

          {/* Action Buttons Row */}
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
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                <Code2 className="w-4 h-4 text-zinc-600" />
                {project.githubFrontend ? 'Backend Repo' : 'Source Code'}
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
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm sm:text-base font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                <Code2 className="w-4 h-4 text-zinc-600" />
                Frontend Repo
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Showcase Image Bento Card (Click to open full lightbox) */}
      <div
        onClick={() =>
          setActiveLightboxImage({
            src: showcaseImage,
            alt: `${project.title} Preview`,
          })
        }
        className="relative w-full h-[320px] sm:h-[460px] md:h-[580px] rounded-[32px] sm:rounded-[44px] overflow-hidden bg-zinc-100 border border-black/[0.06] shadow-sm mb-10 sm:mb-14 cursor-pointer group"
      >
        <Image
          src={showcaseImage}
          alt={project.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-zinc-900 shadow-md flex items-center gap-2">
            <Eye className="w-4 h-4 text-zinc-600" />
            Click to view full image
          </div>
        </div>
      </div>

      {/* 2-Column Content Layout (Architecture & Narrative + Specifications) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 sm:mb-14 items-start">
        {/* Left Column (8 cols): Project Overview & Architecture Narrative */}
        <div className="lg:col-span-8 bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] p-8 sm:p-12 shadow-2xs">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-5">
            Architecture & Engineering
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-6">
            Project Overview & System Highlights
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            {project.overview && project.overview.length > 0 ? (
              project.overview.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
            ) : (
              <p>{project.subtitle}</p>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Tools & Quick Access */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Tools & Technologies */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Quick Links */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-4">
              Repository & Links
            </h3>
            <div className="space-y-3">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs sm:text-sm font-semibold text-zinc-900"
                >
                  <span>Live Application</span>
                  <ExternalLink className="w-4 h-4 text-zinc-500" />
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs sm:text-sm font-semibold text-zinc-900"
                >
                  <span>Backend Repository</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </a>
              )}
              {project.githubFrontend && (
                <a
                  href={project.githubFrontend}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs sm:text-sm font-semibold text-zinc-900"
                >
                  <span>Frontend Repository</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot Gallery Interactive Slider Bento Card */}
      {galleryItems.length > 0 && currentSlide && (
        <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] p-6 sm:p-10 md:p-12 shadow-2xs mb-10 sm:mb-14">
          {/* Header Row with Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-3">
                Interface Previews
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                Application Screenshots
              </h3>
            </div>

            {/* Slider Action Buttons & Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-medium text-zinc-500 px-3.5 py-1.5 rounded-full bg-zinc-100">
                {String(currentSlideIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
              </span>

              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center text-zinc-700 hover:text-zinc-950 transition-colors shadow-2xs cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Slide Viewport */}
          <div
            onClick={() =>
              setActiveLightboxImage({
                src: currentSlide.imageUrl,
                alt: currentSlide.caption || `${project.title} Screenshot ${currentSlideIndex + 1}`,
              })
            }
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 border border-black/[0.06] shadow-inner cursor-pointer group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideIndex}
                initial={{ opacity: 0, x: slideDirection === 'right' ? 25 : -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection === 'right' ? -25 : 25 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentSlide.imageUrl}
                  alt={currentSlide.caption || `${project.title} Screenshot`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Hint & Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
              {currentSlide.caption ? (
                <span className="text-xs sm:text-sm font-medium text-white/95 backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-full">
                  {currentSlide.caption}
                </span>
              ) : (
                <div />
              )}

              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-900 shadow-md flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-zinc-600" />
                Inspect Full View
              </div>
            </div>
          </div>

          {/* Mini Thumbnail Navigation Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pt-5 pb-1">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSlideDirection(idx > currentSlideIndex ? 'right' : 'left')
                  setCurrentSlideIndex(idx)
                }}
                className={`relative shrink-0 w-20 h-14 sm:w-28 sm:h-18 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'border-2 border-zinc-950 scale-105 shadow-sm opacity-100 ring-2 ring-zinc-950/10'
                    : 'border-zinc-200/80 opacity-50 hover:opacity-90'
                }`}
                aria-label={`Go to screenshot ${idx + 1}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption || `Thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Project Teaser Bento Card */}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block bg-white rounded-[32px] sm:rounded-[44px] border border-black/[0.06] p-8 sm:p-12 shadow-2xs hover:border-zinc-300 transition-colors"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                Up Next
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
                {cleanText(nextProject.title)}
              </h4>
              <p className="mt-2 text-sm sm:text-base text-zinc-500 line-clamp-1">
                {nextProject.subtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white group-hover:bg-zinc-800 transition-colors shadow-2xs shrink-0">
              View Project
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </Link>
      )}

      {/* Clean Modern Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center cursor-default"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={activeLightboxImage.src}
                  alt={activeLightboxImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {activeLightboxImage.alt && (
                <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-xs sm:text-sm text-white/90 font-medium">
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
