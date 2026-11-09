import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { getProfile } from '@/lib/data'
import { ContactBentoSection } from '@/components/ContactBentoSection'
import { MinimalFooter } from '@/components/MinimalFooter'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact Vi Nguyen (duvnguyen) | Nguyễn Đức Vĩ — Get in Touch',
  description:
    'Contact Vi Nguyen (duvnguyen / Nguyễn Đức Vĩ) for full-time backend and software engineering roles, collaboration, or consultation.',
  openGraph: {
    title: 'Contact Vi Nguyen (duvnguyen) | Nguyễn Đức Vĩ',
    description:
      'Contact Vi Nguyen (duvnguyen / Nguyễn Đức Vĩ) for full-time backend and software engineering roles, collaboration, or consultation.',
    type: 'website',
  },
}

export default async function ContactPage() {
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

        {/* Contact Bento Section */}
        <div className="-mx-3.5 sm:-mx-6 md:-mx-8">
          <ContactBentoSection profile={profile} />
        </div>
      </main>

      <MinimalFooter profile={profile} />
    </div>
  )
}
