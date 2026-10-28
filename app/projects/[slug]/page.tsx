import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects, getProfile } from '@/lib/data'
import { ProjectDetailsView } from '@/components/ProjectDetailsView'
import { Footer } from '@/components/Footer'

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
      title: 'Project Not Found | Vi Nguyen Portfolio',
    }
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.subtitle,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const [project, profile] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectDetailsView project={project} />
      <Footer profile={profile} />
    </>
  )
}
