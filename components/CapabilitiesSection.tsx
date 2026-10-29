'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Server, Database, Layers, ShieldCheck } from 'lucide-react'
import { cardHoverVariants } from '@/lib/motion'

interface CapabilityItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const capabilities: CapabilityItem[] = [
  {
    icon: Server,
    title: 'Backend Architecture',
    description:
      'Designing modular RESTful APIs, layered services, and maintainable backends with NestJS and Spring Boot.',
  },
  {
    icon: Database,
    title: 'Database & Caching',
    description:
      'Relational schema modeling, query optimization with PostgreSQL, and sub-millisecond Redis caching.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Engineering',
    description:
      'Modern, performant web applications engineered with Next.js 15 App Router, React 19, and TypeScript.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Integrations',
    description:
      'Granular RBAC access controls, webhook verification, payment gateways, and third-party API pipelines.',
  },
]

interface CapabilitiesSectionProps {
  profile?: {
    capabilitiesHeading?: string
    capabilities?: { title: string; description: string }[]
  }
}

export function CapabilitiesSection({ profile }: CapabilitiesSectionProps = {}) {
  const heading =
    profile?.capabilitiesHeading ||
    'Collaborate with engineering teams to build impactful systems.'
  const items =
    profile?.capabilities && profile.capabilities.length > 0
      ? profile.capabilities.map((c, i) => ({
          icon: capabilities[i % capabilities.length].icon,
          title: c.title,
          description: c.description,
        }))
      : capabilities

  return (
    <section className="w-full py-10 sm:py-16 md:py-24 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-14">
        {/* Minimal Pill Badge (Strictly no emojis) */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-zinc-200/80 bg-white text-zinc-700 text-xs sm:text-sm font-medium shadow-2xs mb-4">
          Capabilities
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
          {heading}
        </h2>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="flex flex-col items-start bg-white/70 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-black/[0.05] transition-colors shadow-2xs"
            >
              {/* Clean Monochrome Functional Icon */}
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-zinc-100 text-zinc-800 mb-4 sm:mb-5">
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base sm:text-lg text-zinc-900 tracking-tight mb-2 sm:mb-2.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
