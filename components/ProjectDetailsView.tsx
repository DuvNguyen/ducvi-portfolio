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
  TrendingUp,
  Compass,
  CheckCircle2,
  BookOpen,
} from 'lucide-react'
import type { ProjectItem } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'

interface ProjectDetailsViewProps {
  project: ProjectItem
  nextProject?: ProjectItem
}

// Clean text helper to strictly eliminate any unwanted raw emoji in text
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

  // Smoothly scroll to a specific slide index
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

  // Update current slide index as user swipes / scrolls
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

  // Mouse drag handlers to emulate phone swipe on desktop
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
  const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]

  const hasStructuredCaseStudy = Boolean(
    project.problemStatement || project.process || (project.challenges && project.challenges.length > 0)
  )

  return (
    <div className="w-full max-w-[1200px] mx-auto px-3.5 sm:px-6 md:px-8 pb-12 sm:pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6 pt-2 sm:pt-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>Back to Projects</span>
        </Link>

        <div className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-zinc-200/80 text-xs sm:text-sm font-semibold text-zinc-800 shadow-2xs">
          {displayBadge}
        </div>
      </div>

      {/* 1. TỔNG QUAN: Main Hero Bento Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] shadow-sm p-5 sm:p-10 md:p-14 mb-6 sm:mb-10">
        <div className="max-w-3xl">
          {/* Role Pill Badge */}
          {project.role && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span>Vai trò: {project.role}</span>
            </div>
          )}

          {/* Project Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 mb-3 sm:mb-4 leading-tight">
            {cleanText(project.title)}
          </h1>

          {/* Subtitle / Architectural Summary */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal mb-6 sm:mb-8">
            {project.subtitle}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
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
      </div>

      {/* Showcase Image Bento Card (Click to open full lightbox) */}
      <div
        onClick={() =>
          setActiveLightboxImage({
            src: showcaseImage,
            alt: `${project.title} Preview`,
          })
        }
        className="relative w-full h-[220px] sm:h-[380px] md:h-[520px] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-zinc-100 border border-black/[0.06] shadow-sm mb-6 sm:mb-10 cursor-pointer group"
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
            <span>Click to inspect preview</span>
          </div>
        </div>
      </div>

      {/* STRUCTURED CASE STUDY SECTIONS */}
      {hasStructuredCaseStudy ? (
        <div className="space-y-6 sm:space-y-10 mb-6 sm:mb-10">
          {/* 2. VẤN ĐỀ (PROBLEM STATEMENT BENTO) */}
          {project.problemStatement && (
            <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <AlertCircle className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Bối cảnh & Vấn đề
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-3 sm:mb-4">
                Vấn đề gặp phải khi tự học & Lý do xây dựng dự án
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed font-normal">
                {project.problemStatement}
              </p>
            </div>
          )}

          {/* 3. QUÁ TRÌNH (ENGINEERING PROCESS BENTO) */}
          {project.process && (
            <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="p-2 rounded-xl bg-zinc-100 text-zinc-800">
                  <Compass className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Quá trình thực hiện
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-6 sm:mb-8">
                Chiến lược tổ chức & Kiểm chứng kiến trúc
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Process Card 1: Tab Rationale */}
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-50/80 border border-black/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      01 / Kiến trúc phân chia
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-zinc-950 mb-2.5">
                      Vì sao chia 4 Tab (DSA, OOP, System Design, Spring Boot)?
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {project.process.tabRationale}
                    </p>
                  </div>
                </div>

                {/* Process Card 2: Content Verification */}
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-50/80 border border-black/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      02 / Kiểm chứng nguồn tin
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-zinc-950 mb-2.5">
                      Cách chọn lọc & Tiêu chuẩn kiểm chứng
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {project.process.contentCuration}
                    </p>
                  </div>
                </div>

                {/* Process Card 3: Data & Rendering */}
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-50/80 border border-black/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      03 / Dữ liệu & Render
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-zinc-950 mb-2.5">
                      Cấu trúc code & Cơ chế render bài học
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {project.process.architectureData}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. KHÓ KHĂN: TECHNICAL CHALLENGES (GẶP GÌ -> THỬ GÌ -> CHỌN GÌ -> VÌ SAO) */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="p-2 rounded-xl bg-zinc-100 text-zinc-800">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Thách thức kỹ thuật
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-6 sm:mb-8">
                Khó khăn có thật & Quyết định đánh đổi (Trade-offs)
              </h2>

              <div className="space-y-6">
                {project.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-5 sm:p-7 md:p-8"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-mono font-semibold">
                        {idx + 1}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-zinc-900">
                        {c.title || `Vấn đề kỹ thuật ${idx + 1}`}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      {/* Step 1: Gặp gì */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-700 flex items-center gap-1.5 mb-2">
                          <AlertCircle className="w-3.5 h-3.5" /> Gặp gì
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.issue}</p>
                      </div>

                      {/* Step 2: Thử gì */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 flex items-center gap-1.5 mb-2">
                          <Lightbulb className="w-3.5 h-3.5" /> Thử gì
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.attempted}</p>
                      </div>

                      {/* Step 3: Chọn gì */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 flex items-center gap-1.5 mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Chọn gì
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.solution}</p>
                      </div>

                      {/* Step 4: Vì sao */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200/80 flex flex-col justify-between">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-700 flex items-center gap-1.5 mb-2">
                          <Compass className="w-3.5 h-3.5" /> Vì sao
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">{c.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. KẾT QUẢ & SỐ LIỆU (RESULTS & METRICS BENTO) */}
          {project.results && (
            <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                  Kết quả & Thước đo
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-6 sm:mb-8">
                Đo lường hiệu quả & Ứng dụng thực tế
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                {/* Metrics Highlight Card */}
                <div className="md:col-span-5 p-6 rounded-2xl sm:rounded-3xl bg-zinc-950 text-white flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                      Quy mô nội dung
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {project.results.modulesCount || '4 Trụ cột chuyên sâu'}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.results.summary}
                  </p>
                </div>

                {/* Practical Impact Story Card */}
                <div className="md:col-span-7 p-6 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-black/[0.04] flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                      Thực tế sử dụng để tự học
                    </span>
                    <p className="text-sm sm:text-base text-zinc-800 leading-relaxed font-normal">
                      {project.results.practicalImpact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Fallback Legacy 2-Column Layout for older projects */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-10 items-start">
          <div className="lg:col-span-8 bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-4 sm:mb-5">
              Architecture & Engineering
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-5 sm:mb-6">
              Project Overview & System Highlights
            </h2>
            <div className="space-y-4 text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
              {project.overview && project.overview.length > 0 ? (
                project.overview.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
              ) : (
                <p>{project.subtitle}</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-[24px] sm:rounded-[36px] border border-black/[0.06] p-5 sm:p-7 shadow-2xs">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3.5">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. THƯ VIỆN ẢNH CHỤP THỰC TẾ & GIF (FULL CRUD FROM STUDIO) */}
      {galleryItems.length > 0 && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs mb-6 sm:mb-10">
          {/* Header Row with Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
            <div>
              <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-2.5">
                Thư viện ảnh chụp & GIF
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950">
                Giao diện & Minh họa thực tế
              </h3>
            </div>

            {/* Slider Action Buttons & Counter */}
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
            className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl sm:rounded-3xl border border-black/[0.06] shadow-inner select-none cursor-grab active:cursor-grabbing bg-zinc-100"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full shrink-0 snap-center aspect-[16/10] sm:aspect-[16/9] md:h-[480px] lg:h-[540px] flex items-center justify-center bg-zinc-100 overflow-hidden group"
                onClick={() => {
                  if (!hasMovedRef.current) {
                    setActiveLightboxImage({
                      src: item.imageUrl,
                      alt: item.caption || `${project.title} Screenshot ${idx + 1}`,
                    })
                  }
                }}
              >
                <div className="relative w-full h-full p-2 sm:p-4">
                  {item.imageUrl && item.imageUrl.trim() !== '' && (
                    <Image
                      src={item.imageUrl}
                      alt={item.caption || `${project.title} Screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-contain object-center pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
                      priority={idx === 0}
                    />
                  )}
                </div>

                {/* Hint & Caption Overlay */}
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
        </div>
      )}

      {/* 7. BÀI HỌC & BƯỚC TIẾP THEO (LESSONS & ROADMAP BENTO) */}
      {project.lessons && (
        <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-12 shadow-2xs mb-6 sm:mb-10">
          <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              Chiêm nghiệm & Phát triển
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 mb-6 sm:mb-8">
            Bài học rút ra & Hướng đi kế tiếp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Differently */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-black/[0.04]">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                Làm khác đi điều gì (Retrospective)
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                {project.lessons.whatToDoDifferently}
              </p>
            </div>

            {/* Next Steps */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-black/[0.04]">
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-2">
                Bước tiếp theo là gì (Next Milestones)
              </span>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                {project.lessons.nextSteps}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Project Teaser Bento Card */}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-6 sm:p-10 md:p-12 shadow-2xs hover:border-zinc-300 transition-colors"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400 block mb-1.5 sm:mb-2">
                Up Next
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">
                {cleanText(nextProject.title)}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm md:text-base text-zinc-500 line-clamp-1">
                {nextProject.subtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white group-hover:bg-zinc-800 transition-colors shadow-2xs shrink-0 self-end sm:self-auto">
              <span>View Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
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
