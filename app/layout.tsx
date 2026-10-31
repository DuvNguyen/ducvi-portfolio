import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import './globals.css'
import '@/sass/main.scss'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vi Nguyen',
  description:
    'Vi Nguyen is a final-year Information Technology student who enjoys building full-stack web applications through personal and academic projects.',
  icons: {
    icon: '/assets/png/avatar.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
