'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return (
    <div
      className="fixed inset-0 z-50 w-full h-full min-h-screen overflow-hidden bg-[#101112]"
      style={{
        zoom: '1.2',
      }}
    >
      <NextStudio config={config} />
    </div>
  )
}
