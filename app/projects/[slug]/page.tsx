import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects, getProfile } from '@/lib/data'
import { ProjectDetailsView } from '@/components/ProjectDetailsView'
import { MinimalFooter } from '@/components/MinimalFooter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vinguyen.id.vn'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Vi Nguyen (duvnguyen) Portfolio',
    }
  }

  const pageUrl = `${siteUrl}/projects/${slug}`
  const pageTitle = `${project.title} — Case Study`

  return {
    title: pageTitle,
    description: project.subtitle,
    keywords: [
      'duvnguyen',
      'vi nguyen',
      'Nguyễn Đức Vĩ',
      'Nguyen Duc Vi',
      project.title,
      `${project.title} vi nguyen`,
      `${project.title} duvnguyen`,
      ...project.toolsUsed,
      'software engineer case study',
      'backend architecture',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Vi Nguyen (duvnguyen)`,
      description: project.subtitle,
      url: pageUrl,
      type: 'article',
      images: project.imageUrl
        ? [
            {
              url: project.imageUrl.startsWith('http') ? project.imageUrl : `${siteUrl}${project.imageUrl}`,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Vi Nguyen (duvnguyen)`,
      description: project.subtitle,
      creator: '@DuvNguyen',
      images: project.imageUrl
        ? [project.imageUrl.startsWith('http') ? project.imageUrl : `${siteUrl}${project.imageUrl}`]
        : undefined,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const [project, profile, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
    getProjects(),
  ])

  if (!project) {
    notFound()
  }

  // Calculate next project in order
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0]

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.subtitle,
    url: `${siteUrl}/projects/${slug}`,
    image: project.imageUrl
      ? project.imageUrl.startsWith('http')
        ? project.imageUrl
        : `${siteUrl}${project.imageUrl}`
      : undefined,
    author: {
      '@type': 'Person',
      name: 'Vi Nguyen',
      alternateName: 'vinguyen',
      url: siteUrl,
    },
    about: project.toolsUsed,
  }

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailsView
        project={project}
        nextProject={nextProject && nextProject.slug !== project.slug ? nextProject : undefined}
      />
      <MinimalFooter profile={profile} />
    </div>
  )
}
