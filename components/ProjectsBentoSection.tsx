'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ProjectItem } from '@/lib/defaultData'
import { cardHoverVariants, pillButtonVariants } from '@/lib/motion'

interface ProjectsBentoSectionProps {
  projects: ProjectItem[]
}

// Helper to remove any accidental emoji from titles/badges
function cleanText(text?: string) {
  if (!text) return ''
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .trim()
}

export function ProjectsBentoSection({ projects }: ProjectsBentoSectionProps) {
  return (
    <section id="projects" className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center px-4 py-1 rounded-full border border-zinc-200/80 bg-white text-zinc-700 text-xs sm:text-sm font-medium shadow-2xs mb-5">
          Featured Work
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
          Selected Engineering Projects
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
          Real-world applications engineered with modular architectures, scalable databases, and performance trade-offs.
        </p>
      </div>

      {/* Bento Grid (2 Columns on tablet/desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {projects.map((project) => {
          const imageSrc = project.imageUrl || '/assets/png/studymate/homepage.png'
          const displayBadge = cleanText(project.statusBadge) || project.toolsUsed[0]

          return (
            <motion.div
              key={project._id || project.slug}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="group flex flex-col justify-between bg-white rounded-[32px] sm:rounded-[36px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Top Badge & Key Tags */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-semibold tracking-wide">
                    {displayBadge}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.toolsUsed.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] text-zinc-400 font-medium px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Image Preview */}
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 border border-black/[0.04]">
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Title & Description */}
                <div className="mt-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors">
                    {cleanText(project.title)}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 transition-colors shadow-2xs"
                >
                  Case Study <span className="text-zinc-400 font-light">↗</span>
                </Link>

                <div className="flex items-center gap-2">
                  {project.liveDemo && (
                    <motion.a
                      variants={pillButtonVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                    >
                      Live Demo
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
                      className="inline-flex items-center px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-700 text-xs font-medium hover:bg-zinc-50 transition-colors shadow-2xs"
                    >
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
