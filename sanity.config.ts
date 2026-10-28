import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Vi Nguyen Portfolio Studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
})
