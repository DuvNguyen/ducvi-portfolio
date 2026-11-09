import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, FileText, Sparkles } from 'lucide-react'
import { getPosts, getProfile } from '@/lib/data'
import { BlogListClient } from '@/components/BlogListClient'
import { MinimalFooter } from '@/components/MinimalFooter'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog & Engineering Notes | Vi Nguyen',
  description:
    'Technical deep dives into backend architecture, NestJS, Spring Boot, PostgreSQL optimization, and event-driven microservices by Vi Nguyen.',
  openGraph: {
    title: 'Blog & Engineering Notes | Vi Nguyen',
    description:
      'Technical deep dives into backend architecture, NestJS, Spring Boot, PostgreSQL optimization, and event-driven microservices by Vi Nguyen.',
    type: 'website',
  },
}

export default async function BlogIndexPage() {
  const [posts, profile] = await Promise.all([getPosts(), getProfile()])

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-zinc-950">
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-16">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Header Bento Card */}
        <section className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-6 sm:p-10 md:p-14 shadow-2xs mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Engineering Notes & Insights
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
              Architectural Deep Dives & Backend Engineering
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Practical reflections on microservices, query optimization, high-throughput caching with Redis,
              and security protocols based on real-world engineering projects.
            </p>

            {/* Recruiter Quick Callout */}
            <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-600">
              <span className="font-medium text-zinc-900">Are you hiring?</span>
              <Link
                href="/#projects"
                className="text-zinc-950 font-semibold underline underline-offset-4 hover:text-zinc-600 transition-colors"
              >
                Review My Production Projects
              </Link>
              <span className="text-zinc-300">•</span>
              <a
                href={profile.cvUrl || '/assets/cv.pdf'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-zinc-950 underline underline-offset-4 hover:text-zinc-600 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>
          </div>
        </section>

        {/* Blog Post List & Interactive Filters */}
        <section>
          <BlogListClient posts={posts} />
        </section>
      </main>

      <MinimalFooter profile={profile} />
    </div>
  )
}
