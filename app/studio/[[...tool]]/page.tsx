'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  useEffect(() => {
    document.title = 'Vi Nguyen'
    const observer = new MutationObserver(() => {
      if (document.title !== 'Vi Nguyen') {
        document.title = 'Vi Nguyen'
      }
    })
    const head = document.querySelector('head')
    if (head) {
      observer.observe(head, { childList: true, subtree: true, characterData: true })
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full min-h-screen overflow-hidden bg-[#101112]"
      style={{
        zoom: '1.35',
      }}
    >
      <NextStudio config={config} />
    </div>
  )
}
