'use client'

import React from 'react'

interface TechItem {
  name: string
  category: string
}

const technologies: TechItem[] = [
  { name: 'NestJS', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Cache & Queue' },
  { name: 'Next.js 15', category: 'Full-Stack' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Apache Kafka', category: 'Event Streaming' },
  { name: 'Clerk & Auth', category: 'Security' },
  { name: 'RESTful API', category: 'Architecture' },
]

export function TechMarquee() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 overflow-hidden">
      {/* Subtle Container with soft fade edges */}
      <div className="relative overflow-hidden py-4 border-y border-black/[0.05]">
        {/* Left & Right gradient fade masks for clean edge transitions */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-canvas to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-canvas to-transparent z-10" />

        {/* Marquee Track (seamless duplicate for infinite loop) */}
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {/* First loop */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-16 pr-10 sm:pr-16">
            {technologies.map((tech, index) => (
              <div
                key={`t1-${index}`}
                className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-900 transition-colors cursor-default select-none group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
                <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-500 group-hover:text-zinc-900 transition-colors">
                  {tech.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400/80 font-medium hidden sm:inline">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>

          {/* Duplicate loop for infinite illusion */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-16 pr-10 sm:pr-16" aria-hidden="true">
            {technologies.map((tech, index) => (
              <div
                key={`t2-${index}`}
                className="flex items-center gap-2.5 text-zinc-400 hover:text-zinc-900 transition-colors cursor-default select-none group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-zinc-800 transition-colors" />
                <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-500 group-hover:text-zinc-900 transition-colors">
                  {tech.name}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400/80 font-medium hidden sm:inline">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
