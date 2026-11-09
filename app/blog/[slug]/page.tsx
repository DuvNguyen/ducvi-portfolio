import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  ArrowUpRight,
  FileText,
  Sparkles,
} from 'lucide-react'
import { getPosts, getPostBySlug, getProfile } from '@/lib/data'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { MinimalFooter } from '@/components/MinimalFooter'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Vi Nguyen',
    }
  }

  return {
    title: `${post.title} | Vi Nguyen`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Vi Nguyen'],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post, allPosts, profile] = await Promise.all([
    getPostBySlug(slug),
    getPosts(),
    getProfile(),
  ])

  if (!post) {
    notFound()
  }

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-zinc-950">
      <main className="flex-1 w-full max-w-[860px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            Portfolio Home
          </Link>
        </div>

        {/* Article Header Card */}
        <header className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/[0.06] p-6 sm:p-10 md:p-12 shadow-2xs mb-8 sm:mb-10">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-zinc-950 leading-[1.2]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Meta Bar */}
          <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200 bg-zinc-100">
                <Image
                  src="/assets/png/avatar.png"
                  alt={profile.name || 'Vi Nguyen'}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-zinc-900">{profile.name || 'Vi Nguyen'}</div>
                <div className="text-xs text-zinc-500">{profile.roleTitle || 'Backend & Software Engineer'}</div>
              </div>
            </div>

            {/* Date & Read time */}
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {formattedDate}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium bg-zinc-100 px-2.5 py-1 rounded-full text-zinc-700">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {post.readingTime || '5 min read'}
              </span>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="bg-white rounded-[28px] sm:rounded-[36px] border border-black/[0.06] p-6 sm:p-10 md:p-12 shadow-2xs mb-12">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Author Bio & Recruiter Callout */}
        <section className="bg-gradient-to-br from-white to-zinc-50 rounded-[28px] sm:rounded-[32px] border border-zinc-200 p-6 sm:p-8 md:p-10 shadow-2xs mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-zinc-300 shadow-sm shrink-0">
              <Image
                src="/assets/png/avatar.png"
                alt={profile.name || 'Vi Nguyen'}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-zinc-950">Written by {profile.name || 'Vi Nguyen'}</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available for Hire
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Backend & Software Engineer specializing in scalable APIs with NestJS, Spring Boot, PostgreSQL, and Redis.
                Actively seeking full-time backend and software engineering positions.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-500 font-medium">
              Want to discuss system architecture or discuss open opportunities?
            </span>
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href={profile.cvUrl || '/assets/cv.pdf'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}?subject=Regarding%20Article:%20${encodeURIComponent(post.title)}`}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-zinc-300 bg-white text-zinc-800 text-xs font-medium hover:bg-zinc-100 transition-colors shadow-2xs"
              >
                Contact Me
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>
        </section>

        {/* Other Articles Recommendation */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 mb-5">
              More Engineering Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {other.readingTime || '5 min read'}
                    </span>
                    <h3 className="mt-1 text-sm sm:text-base font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-600 line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-zinc-600">
                    Read Article <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <MinimalFooter profile={profile} />
    </div>
  )
}
