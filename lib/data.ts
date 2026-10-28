import { client, sanityFetch, isSanityConfigured } from './sanity.client'
import { projectsQuery, projectBySlugQuery, profileQuery } from './sanity.queries'
import { defaultProjects, defaultProfile, type ProjectItem, type ProfileData } from './defaultData'
import { urlForImage } from './sanity.image'

export async function getProjects(): Promise<ProjectItem[]> {
  if (!isSanityConfigured) {
    return defaultProjects
  }

  try {
    const data = await sanityFetch<any[]>({
      query: projectsQuery,
      revalidate: 60,
    })

    if (!data || data.length === 0) {
      return defaultProjects
    }

    return data.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug || item._id,
      order: item.order || 99,
      subtitle: item.subtitle || '',
      statusBadge: item.statusBadge,
      imageUrl: item.mainImage ? urlForImage(item.mainImage) : undefined,
      toolsUsed: item.toolsUsed || [],
      liveDemo: item.liveDemo,
      githubFrontend: item.githubFrontend,
      githubBackend: item.githubBackend,
    }))
  } catch (error) {
    console.warn('Error fetching projects from Sanity, falling back to default data:', error)
    return defaultProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  if (!isSanityConfigured) {
    return defaultProjects.find((p) => p.slug === slug) || null
  }

  try {
    const item = await sanityFetch<any>({
      query: projectBySlugQuery,
      params: { slug },
      revalidate: 60,
    })

    if (!item) {
      return defaultProjects.find((p) => p.slug === slug) || null
    }

    // Convert portable text blocks to string array if present
    let overview: string[] = []
    if (Array.isArray(item.overview)) {
      overview = item.overview
        .map((block: any) =>
          block.children?.map((c: any) => c.text).join('') || ''
        )
        .filter(Boolean)
    }

    const gallery = Array.isArray(item.gallery)
      ? item.gallery.map((g: any) => ({
          imageUrl: urlForImage(g),
          caption: g.caption || '',
        }))
      : []

    return {
      _id: item._id,
      title: item.title,
      slug: item.slug || slug,
      order: item.order || 1,
      subtitle: item.subtitle || '',
      statusBadge: item.statusBadge,
      imageUrl: item.mainImage ? urlForImage(item.mainImage) : undefined,
      overview: overview.length > 0 ? overview : undefined,
      toolsUsed: item.toolsUsed || [],
      liveDemo: item.liveDemo,
      githubFrontend: item.githubFrontend,
      githubBackend: item.githubBackend,
      gallery,
    }
  } catch (error) {
    console.warn('Error fetching project by slug from Sanity, falling back:', error)
    return defaultProjects.find((p) => p.slug === slug) || null
  }
}

export async function getProfile(): Promise<ProfileData> {
  if (!isSanityConfigured) {
    return defaultProfile
  }

  try {
    const data = await sanityFetch<any>({
      query: profileQuery,
      revalidate: 60,
    })

    if (!data) {
      return defaultProfile
    }

    return {
      name: data.name || defaultProfile.name,
      headline: data.headline || defaultProfile.headline,
      statusText: data.statusText || defaultProfile.statusText,
      heroHeadline: data.heroHeadline || defaultProfile.heroHeadline,
      heroBio: data.heroBio || defaultProfile.heroBio,
      capabilitiesHeading: data.capabilitiesHeading || defaultProfile.capabilitiesHeading,
      capabilities: data.capabilities?.length ? data.capabilities : defaultProfile.capabilities,
      aboutSubtitle: data.aboutSubtitle || defaultProfile.aboutSubtitle,
      aboutParagraphs: data.aboutParagraphs?.length
        ? data.aboutParagraphs
        : defaultProfile.aboutParagraphs,
      skills: data.skills?.length ? data.skills : defaultProfile.skills,
      marqueeSkills: data.marqueeSkills?.length ? data.marqueeSkills : defaultProfile.marqueeSkills,
      contactHeading: data.contactHeading || defaultProfile.contactHeading,
      contactSubtitle: data.contactSubtitle || defaultProfile.contactSubtitle,
      email: data.email || defaultProfile.email,
      linkedin: data.linkedin || defaultProfile.linkedin,
      github: data.github || defaultProfile.github,
      cvUrl: data.cvUrl || defaultProfile.cvUrl,
    }
  } catch (error) {
    console.warn('Error fetching profile from Sanity, falling back:', error)
    return defaultProfile
  }
}
