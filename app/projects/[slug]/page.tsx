import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects, getProfile } from '@/lib/data'
import { ProjectDetailsView } from '@/components/ProjectDetailsView'
import { MinimalFooter } from '@/components/MinimalFooter'

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

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <ProjectDetailsView
        project={project}
        nextProject={nextProject && nextProject.slug !== project.slug ? nextProject : undefined}
      />
      <MinimalFooter profile={profile} />
    </div>
  )
}
