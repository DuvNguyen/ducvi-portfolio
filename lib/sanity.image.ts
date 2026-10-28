import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'dummy_project_id',
  dataset: dataset || 'production',
})

export const urlForImage = (source: any) => {
  if (!source || !source.asset) return ''
  return imageBuilder.image(source).auto('format').fit('max').url()
}
