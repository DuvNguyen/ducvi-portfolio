import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vinguyen.id.vn'
  const projects = await getProjects()

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => !project.hidden && project.slug !== 'metrohcmc')
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...projectEntries,
  ]
}
