'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import type { ProjectItem } from '@/lib/defaultData'
import { pillButtonVariants } from '@/lib/motion'
import { motion } from 'framer-motion'

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

interface SingleCardProps {
  project: ProjectItem
  index: number
  total: number
}

function StackingCard({ project, index, total }: SingleCardProps) {
  const imageSrc =
    project.imageUrl && project.imageUrl.trim() !== ''
      ? project.imageUrl
      : '/assets/png/studymate/homepage.png'
  const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]
  const projectNumber = String(index + 1).padStart(2, '0')
  const totalCount = String(total).padStart(2, '0')

  // Top offset: 32px step creates the vertical layered depth
  const topOffset = 48 + index * 32
  // Diagonal offset: shift slightly rightwards and gentle rotation to fan out diagonally
  const xOffset = index * 14
  const rotateDeg = index * 0.6
  const isLast = index === total - 1

  return (
    <div
      className={`sticky w-full flex items-start justify-center ${
        isLast ? 'pb-10 sm:pb-16' : 'pb-14 sm:pb-20'
      }`}
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1, // Higher index sits on top
      }}
    >
      <div
        className="w-full bg-white rounded-[32px] sm:rounded-[40px] border border-zinc-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.03),0_20px_45px_-10px_rgba(0,0,0,0.12)] p-6 sm:p-10 md:p-12 overflow-hidden transition-transform duration-500 ease-out origin-top-left"
        style={{
          transform: `translateX(${xOffset}px) rotate(${rotateDeg}deg)`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Header Info Row */}
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                <span className="text-sm font-mono font-semibold text-zinc-500 tracking-wider">
                  {projectNumber} / {totalCount}
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-xs sm:text-sm font-semibold tracking-wide">
                  {displayBadge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-zinc-950 mb-3.5 leading-snug">
                {cleanText(project.title)}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 leading-relaxed font-normal mb-6">
                {project.subtitle}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.toolsUsed.slice(0, 5).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200/80 text-zinc-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-zinc-100">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-200 bg-white text-zinc-800 text-sm sm:text-base font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
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
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-200 bg-white text-zinc-800 text-sm sm:text-base font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                >
                  <Code2 className="w-4 h-4 text-zinc-600" />
                  Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Right Column: High-Res Project Preview Mockup */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 border border-black/[0.05] shadow-inner group">
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StackingProjectsSection({ projects }: StackingProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-zinc-200/80 bg-white text-zinc-700 text-xs sm:text-sm font-medium shadow-2xs mb-5">
          Featured Work
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
          Selected Engineering Projects
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
          Real-world applications engineered with modular architectures, scalable databases, and performance trade-offs.
        </p>
      </div>

      {/* Stacking Cards List without artificial empty void */}
      <div className="relative">
        {projects.map((project, index) => (
          <StackingCard
            key={project._id || project.slug}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
