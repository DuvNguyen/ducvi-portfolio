import { client, sanityFetch, isSanityConfigured } from './sanity.client'
import { projectsQuery, projectBySlugQuery, profileQuery } from './sanity.queries'
import {
  defaultProjects,
  defaultProfile,
  type ProjectItem,
  type ProfileData,
  type SkillItem,
} from './defaultData'
import { urlForImage } from './sanity.image'

function normalizeSkills(rawSkills: any[] | undefined): SkillItem[] {
  if (!rawSkills || !Array.isArray(rawSkills) || rawSkills.length === 0) {
    return defaultProfile.skills
  }

  const defaultMap = new Map<string, SkillItem>()
  for (const s of defaultProfile.skills) {
    defaultMap.set(s.name.toLowerCase().trim(), s)
  }

  return rawSkills
    .map((item): SkillItem | null => {
      if (!item) return null

      if (typeof item === 'string') {
        const trimmed = item.trim()
        if (!trimmed) return null
        const fallback = defaultMap.get(trimmed.toLowerCase())
        return {
          name: trimmed,
          experience:
            fallback?.experience ||
            `Applied ${trimmed} in engineering projects, focusing on scalable architecture, clean code principles, and reliable delivery.`,
          yearsOrLevel: fallback?.yearsOrLevel || 'Competency',
          highlights: fallback?.highlights,
        }
      }

      if (typeof item === 'object') {
        const name = (item.name || item.title || '').trim()
        if (!name) return null
        const fallback = defaultMap.get(name.toLowerCase())
        return {
          name,
          experience:
            item.experience?.trim() ||
            fallback?.experience ||
            `Applied ${name} in engineering projects, focusing on scalable architecture, clean code principles, and reliable delivery.`,
          yearsOrLevel: item.yearsOrLevel?.trim() || fallback?.yearsOrLevel || 'Competency',
          highlights:
            Array.isArray(item.highlights) && item.highlights.length > 0
              ? item.highlights.filter(Boolean)
              : fallback?.highlights,
        }
      }

      return null
    })
    .filter((s): s is SkillItem => s !== null)
}

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

    const visibleData = data.filter(
      (item) =>
        !item.hidden &&
        item.slug !== 'metrohcmc' &&
        item._id !== 'project-metrohcmc'
    )

    const mappedSanityProjects: ProjectItem[] = visibleData.map((item) => {
      let resolvedImg: string | undefined = undefined
      if (item.mainImage) {
        if (typeof item.mainImage === 'string' && item.mainImage.trim() !== '') {
          resolvedImg = item.mainImage.trim()
        } else if (item.mainImage.asset) {
          const url = urlForImage(item.mainImage)
          if (url && url.trim() !== '') resolvedImg = url.trim()
        }
      }

      const liveDemoClean =
        typeof item.liveDemo === 'string' && item.liveDemo.trim() !== ''
          ? item.liveDemo.trim()
          : undefined

      return {
        _id: item._id,
        title: item.title,
        slug: item.slug || item._id,
        order: item.order || 99,
        subtitle: item.subtitle || '',
        statusBadge: item.statusBadge,
        imageUrl: resolvedImg,
        toolsUsed: item.toolsUsed || [],
        liveDemo: liveDemoClean,
        hideLiveDemo: Boolean(item.hideLiveDemo),
        hidden: Boolean(item.hidden),
        githubFrontend: item.githubFrontend,
        githubBackend: item.githubBackend,
      }
    })

    const sanitySlugs = new Set(mappedSanityProjects.map((p) => p.slug))
    const missingDefaults = defaultProjects.filter(
      (dp) => !dp.hidden && !sanitySlugs.has(dp.slug) && dp.slug !== 'metrohcmc'
    )

    const combinedProjects = [...mappedSanityProjects, ...missingDefaults]
    combinedProjects.sort((a, b) => (a.order || 99) - (b.order || 99))
    return combinedProjects
  } catch (error) {
    console.warn('Error fetching projects from Sanity, falling back to default data:', error)
    return defaultProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  if (slug === 'metrohcmc' || slug === 'project-metrohcmc') {
    return null
  }

  const defaultProj = defaultProjects.find((p) => p.slug === slug && !p.hidden) || null

  if (!isSanityConfigured) {
    return defaultProj
  }

  try {
    const item = await sanityFetch<any>({
      query: projectBySlugQuery,
      params: { slug },
      revalidate: 60,
    })

    if (!item || item.hidden) {
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

    const liveDemoClean =
      typeof item.liveDemo === 'string' && item.liveDemo.trim() !== ''
        ? item.liveDemo.trim()
        : defaultProj?.liveDemo?.trim()

    return {
      _id: item._id,
      title: item.title,
      slug: item.slug || slug,
      order: item.order || 1,
      role: item.role || defaultProj?.role,
      subtitle: item.subtitle || defaultProj?.subtitle || '',
      statusBadge: item.statusBadge || defaultProj?.statusBadge,
      stats: item.stats?.length ? item.stats : defaultProj?.stats,
      imageUrl: mainImgUrl || defaultProj?.imageUrl,
      problemStatement: item.problemStatement || defaultProj?.problemStatement,
      process: item.process || defaultProj?.process,
      challenges: item.challenges?.length ? item.challenges : defaultProj?.challenges,
      results: item.results || defaultProj?.results,
      lessons: item.lessons || defaultProj?.lessons,
      overview: overview.length > 0 ? overview : defaultProj?.overview,
      toolsUsed: item.toolsUsed || defaultProj?.toolsUsed || [],
      liveDemo: liveDemoClean,
      hideLiveDemo: typeof item.hideLiveDemo === 'boolean' ? item.hideLiveDemo : defaultProj?.hideLiveDemo || false,
      hidden: typeof item.hidden === 'boolean' ? item.hidden : defaultProj?.hidden || false,
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
      skills: normalizeSkills(data.skills),
      marqueeSkills: data.marqueeSkills?.length ? data.marqueeSkills : defaultProfile.marqueeSkills,
      contactHeading: data.contactHeading || defaultProfile.contactHeading,
      contactSubtitle: data.contactSubtitle || defaultProfile.contactSubtitle,
      email: data.email || defaultProfile.email,
      socialLinks: data.socialLinks?.length
        ? data.socialLinks
        : data.linkedin || data.github
          ? [
              ...(data.linkedin ? [{ name: 'LinkedIn', url: data.linkedin }] : []),
              ...(data.github ? [{ name: 'GitHub', url: data.github }] : []),
            ]
          : defaultProfile.socialLinks,
      linkedin:
        data.socialLinks?.find((s: any) => s.name?.toLowerCase().includes('linkedin'))?.url ||
        data.linkedin ||
        defaultProfile.linkedin,
      github:
        data.socialLinks?.find((s: any) => s.name?.toLowerCase().includes('github'))?.url ||
        data.github ||
        defaultProfile.github,
      cvUrl: data.cvUrl || defaultProfile.cvUrl,
    }
  } catch (error) {
    console.warn('Error fetching profile from Sanity, falling back:', error)
    return defaultProfile
  }
}
