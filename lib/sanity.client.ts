import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const isSanityConfigured =
  Boolean(projectId) &&
  projectId !== 'dummy_project_id' &&
  projectId !== 'your_sanity_project_id'

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null

export async function sanityFetch<T = any>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}): Promise<T | null> {
  if (!client) {
    return null
  }
  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}
