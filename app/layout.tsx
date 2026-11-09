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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vinguyen.id.vn'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vi Nguyen (vinguyen) — Software Engineer & Backend Developer',
    template: '%s | Vi Nguyen (vinguyen)',
  },
  description:
    'Vi Nguyen (vinguyen) is a Software Engineer specializing in backend systems, distributed architectures, microservices, and modern web applications (Java, Spring Boot, NestJS, TypeScript, PostgreSQL, Kafka, Redis, Next.js).',
  keywords: [
    'vinguyen',
    'vi nguyen',
    'vinguyen portfolio',
    'vi nguyen portfolio',
    'vinguyen.id.vn',
    'https://www.vinguyen.id.vn',
    'nguyen duc vi',
    'nguyễn đức vĩ',
    'duvnguyen',
    'DuvNguyen',
    'nducvi',
    'Software Engineer',
    'Backend Engineer',
    'Full Stack Developer',
    'Java',
    'Spring Boot',
    'Microservices',
    'NestJS',
    'TypeScript',
    'PostgreSQL',
    'pgvector',
    'Kafka',
    'Redis',
    'Next.js',
    'CareFlow',
    'StudyMate',
    'VietSneaker',
    'Slack',
    'Distributed Systems',
  ],
  authors: [{ name: 'Vi Nguyen', url: siteUrl }],
  creator: 'Vi Nguyen (vinguyen)',
  publisher: 'Vi Nguyen',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-192x192.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google9c904255966af260',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: siteUrl,
    title: 'Vi Nguyen (vinguyen) — Software Engineer & Backend Developer',
    description:
      'Vi Nguyen (vinguyen) is a Software Engineer specializing in backend systems, distributed architectures, microservices, and modern web applications (Java, Spring Boot, NestJS, TypeScript, PostgreSQL, Kafka, Redis).',
    siteName: 'Vi Nguyen (vinguyen) Portfolio',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Vi Nguyen (vinguyen) - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vi Nguyen (vinguyen) — Software Engineer & Backend Developer',
    description:
      'Software Engineer specializing in backend systems, distributed architectures, microservices, and modern web applications.',
    creator: '@DuvNguyen',
    images: ['/assets/og-image.png'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vi Nguyen',
  alternateName: ['vinguyen', 'Nguyen Duc Vi', 'Nguyễn Đức Vĩ', 'DuvNguyen', 'nducvi'],
  jobTitle: 'Software Engineer',
  description:
    'Software Engineer specializing in backend architecture, Spring Boot microservices, NestJS, and modern full-stack web applications.',
  url: siteUrl,
  image: `${siteUrl}/assets/png/avatar.png`,
  email: 'nducvi.information@gmail.com',
  sameAs: [
    'https://github.com/DuvNguyen',
    'https://linkedin.com/in/nducviinformation/',
    'https://github.com/ntkhai268/careflow',
  ],
  knowsAbout: [
    'Software Engineering',
    'Backend Architecture',
    'Spring Boot',
    'Microservices',
    'NestJS',
    'TypeScript',
    'PostgreSQL',
    'pgvector',
    'Redis',
    'Apache Kafka',
    'Next.js',
    'Docker',
    'REST APIs',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vi Nguyen (vinguyen) Portfolio',
  alternateName: ['vinguyen', 'Vi Nguyen', 'vinguyen.id.vn'],
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Vi Nguyen',
    alternateName: 'vinguyen',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
