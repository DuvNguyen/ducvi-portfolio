import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, User, Sparkles } from 'lucide-react'
import { getProfile } from '@/lib/data'
import { AboutBentoSection } from '@/components/AboutBentoSection'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { MinimalFooter } from '@/components/MinimalFooter'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About Vi Nguyen (duvnguyen) | Nguyễn Đức Vĩ — Background & Mindset',
  description:
    'Learn more about Vi Nguyen (duvnguyen / Nguyễn Đức Vĩ) — Backend & Software Engineer specializing in NestJS, Spring Boot, PostgreSQL, and scalable systems.',
  openGraph: {
    title: 'About Vi Nguyen (duvnguyen) | Nguyễn Đức Vĩ',
    description:
      'Learn more about Vi Nguyen (duvnguyen / Nguyễn Đức Vĩ) — Backend & Software Engineer specializing in NestJS, Spring Boot, PostgreSQL, and scalable systems.',
    type: 'profile',
  },
}

export default async function AboutPage() {
  const profile = await getProfile()

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-zinc-950">
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-16">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Banner Card */}
        <section className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-6 sm:p-10 md:p-14 shadow-2xs mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <User className="w-3.5 h-3.5 text-zinc-700" />
              Software Engineer Profile
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.18]">
              Vi Nguyen (duvnguyen) — Nguyễn Đức Vĩ
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Backend & Software Engineer based in Ho Chi Minh City, Vietnam. Specializing in high-performance APIs,
              resilient microservices, and practical AI integrations with NestJS, Java Spring Boot, PostgreSQL, and Redis.
            </p>
          </div>
        </section>

        {/* Core Capabilities */}
        <div className="-mx-3.5 sm:-mx-6 md:-mx-8">
          <CapabilitiesSection profile={profile} />
          <AboutBentoSection profile={profile} />
        </div>
      </main>

      <MinimalFooter profile={profile} />
    </div>
  )
}
