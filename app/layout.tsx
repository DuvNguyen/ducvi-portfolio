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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vinguyen.id.vn'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vi Nguyen | Software Engineer',
    template: '%s | Vi Nguyen',
  },
  description:
    'Vi Nguyen is a software engineer specializing in backend systems, distributed architectures, and modern web applications (Java, Spring Boot, NestJS, TypeScript, PostgreSQL, Kafka, Redis).',
  keywords: [
    'Vi Nguyen',
    'Software Engineer',
    'Backend Engineer',
    'Java',
    'Spring Boot',
    'NestJS',
    'TypeScript',
    'PostgreSQL',
    'Kafka',
    'Redis',
    'Distributed Systems',
  ],
  authors: [{ name: 'Vi Nguyen' }],
  creator: 'Vi Nguyen',
  icons: {
    icon: '/assets/png/avatar.png',
    apple: '/assets/png/avatar.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Vi Nguyen | Software Engineer',
    description:
      'Software engineer specializing in backend systems, distributed architectures, and modern web applications (Java, Spring Boot, NestJS, TypeScript, PostgreSQL, Kafka, Redis).',
    siteName: 'Vi Nguyen Portfolio',
    images: [
      {
        url: '/assets/png/avatar.png',
        width: 800,
        height: 800,
        alt: 'Vi Nguyen - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Vi Nguyen | Software Engineer',
    description:
      'Software engineer specializing in backend systems, distributed architectures, and modern web applications.',
    images: ['/assets/png/avatar.png'],
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
