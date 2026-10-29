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

    return data.map((item) => {
      let resolvedImg: string | undefined = undefined
      if (item.mainImage) {
        if (typeof item.mainImage === 'string' && item.mainImage.trim() !== '') {
          resolvedImg = item.mainImage.trim()
        } else if (item.mainImage.asset) {
          const url = urlForImage(item.mainImage)
          if (url && url.trim() !== '') resolvedImg = url.trim()
        }
      }

      return {
        _id: item._id,
        title: item.title,
        slug: item.slug || item._id,
        order: item.order || 99,
        subtitle: item.subtitle || '',
        statusBadge: item.statusBadge,
        imageUrl: resolvedImg,
        toolsUsed: item.toolsUsed || [],
        liveDemo: item.liveDemo,
        githubFrontend: item.githubFrontend,
        githubBackend: item.githubBackend,
      }
    })
  } catch (error) {
    console.warn('Error fetching projects from Sanity, falling back to default data:', error)
    return defaultProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const defaultProj = defaultProjects.find((p) => p.slug === slug) || null

  if (!isSanityConfigured) {
    return defaultProj
  }

  try {
    const item = await sanityFetch<any>({
      query: projectBySlugQuery,
      params: { slug },
      revalidate: 60,
    })

    if (!item) {
      return defaultProj
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

    // Safely extract gallery images with valid non-empty URLs
    const gallery = Array.isArray(item.gallery)
      ? item.gallery
          .map((g: any) => {
            let url = ''
            if (typeof g === 'string') {
              url = g.trim()
            } else if (g?.imageUrl && typeof g.imageUrl === 'string') {
              url = g.imageUrl.trim()
            } else if (g?.asset) {
              url = urlForImage(g)?.trim() || ''
            }
            return {
              imageUrl: url,
              caption: g?.caption || '',
              alt: g?.alt || '',
            }
          })
          .filter((g: any) => Boolean(g.imageUrl && g.imageUrl !== ''))
      : []

    let mainImgUrl: string | undefined = undefined
    if (item.mainImage) {
      if (typeof item.mainImage === 'string' && item.mainImage.trim() !== '') {
        mainImgUrl = item.mainImage.trim()
      } else if (item.mainImage.asset) {
        const url = urlForImage(item.mainImage)
        if (url && url.trim() !== '') mainImgUrl = url.trim()
      }
    }

    return {
      _id: item._id,
      title: item.title,
      slug: item.slug || slug,
      order: item.order || 1,
      role: item.role || defaultProj?.role,
      subtitle: item.subtitle || defaultProj?.subtitle || '',
      statusBadge: item.statusBadge || defaultProj?.statusBadge,
      stats: item.stats || defaultProj?.stats,
      imageUrl: mainImgUrl || defaultProj?.imageUrl,
      problemStatement: item.problemStatement || defaultProj?.problemStatement,
      process: item.process || defaultProj?.process,
      challenges: item.challenges || defaultProj?.challenges,
      results: item.results || defaultProj?.results,
      lessons: item.lessons || defaultProj?.lessons,
      overview: overview.length > 0 ? overview : defaultProj?.overview,
      toolsUsed: item.toolsUsed || defaultProj?.toolsUsed || [],
      liveDemo: item.liveDemo || defaultProj?.liveDemo,
      githubFrontend: item.githubFrontend || defaultProj?.githubFrontend,
      githubBackend: item.githubBackend || defaultProj?.githubBackend,
      gallery: gallery.length > 0 ? gallery : (defaultProj?.gallery || []),
    }
  } catch (error) {
    console.warn('Error fetching project by slug from Sanity, falling back:', error)
    return defaultProj
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
