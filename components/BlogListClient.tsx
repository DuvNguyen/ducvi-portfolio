'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Clock, Calendar, Tag, Search, BookOpen } from 'lucide-react'
import type { PostItem } from '@/lib/defaultData'

interface BlogListClientProps {
  posts: PostItem[]
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Collect unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags?.forEach((t) => tagSet.add(t))
    })
    return ['All', ...Array.from(tagSet)]
  }, [posts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag))
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesTag && matchesSearch
    })
  }, [posts, selectedTag, searchQuery])

  return (
    <div className="w-full">
      {/* Search and Tag Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-12">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-50 border border-zinc-200/90 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:bg-white transition-all shadow-2xs"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {allTags.map((tag) => {
            const isActive = selectedTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-2xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Post Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 rounded-3xl border border-dashed border-zinc-300">
          <BookOpen className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
          <p className="text-base font-medium text-zinc-700">No articles match your query.</p>
          <p className="text-xs text-zinc-500 mt-1">Try clearing your search query or selecting &quot;All&quot; tags.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedTag('All')
            }}
            className="mt-4 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => {
              const formattedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'

              return (
                <motion.article
                  key={post._id || post.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col justify-between bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-200"
                >
                  <div>
                    {/* Meta Header */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {formattedDate}
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {post.readingTime || '5 min read'}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 text-sm text-zinc-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between">
                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap max-w-[70%]">
                      {post.tags?.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/70 text-[11px] font-medium text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {(post.tags?.length || 0) > 2 && (
                        <span className="text-[11px] text-zinc-400 font-medium">
                          +{(post.tags?.length || 0) - 2}
                        </span>
                      )}
                    </div>

                    {/* Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors"
                    >
                      Read
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
