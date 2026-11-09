'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock, BookOpen } from 'lucide-react'
import type { PostItem } from '@/lib/defaultData'

interface HomeBlogSectionProps {
  posts: PostItem[]
}

export function HomeBlogSection({ posts }: HomeBlogSectionProps) {
  if (!posts || posts.length === 0) return null

  // Take the top 3 posts
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-3.5 sm:px-6 md:px-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-black/[0.06] p-5 sm:p-10 md:p-14 shadow-2xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-zinc-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
              Technical Writing & Insights
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
              Engineering Notes & Architecture
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl">
              Practical write-ups on backend distributed patterns, database query performance, and security architecture.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-950 hover:text-zinc-600 transition-colors group self-start sm:self-auto shrink-0"
          >
            Browse all articles
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {displayPosts.map((post) => {
            const formattedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recent'

            return (
              <article
                key={post._id || post.slug}
                className="group flex flex-col justify-between bg-zinc-50/70 rounded-2xl sm:rounded-3xl border border-black/[0.04] p-5 sm:p-6 hover:bg-white hover:border-zinc-300 hover:shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      {formattedDate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white px-2 py-0.5 rounded-full border border-zinc-200/60 text-zinc-600">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      {post.readingTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {post.tags?.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white border border-zinc-200/70 text-[10px] font-medium text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors"
                  >
                    Read
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
