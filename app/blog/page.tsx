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
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-4">
              <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
              Technical Writing & Insights
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
              Architectural Deep Dives & Backend Engineering
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Practical reflections on microservices, query optimization, high-throughput caching with Redis,
              and security protocols based on real-world engineering projects.
            </p>
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
