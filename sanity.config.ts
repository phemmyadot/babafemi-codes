import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { projectSchema } from './src/sanity/schemas/project'
import { skillsSchema } from './src/sanity/schemas/skills'
import { experienceSchema } from './src/sanity/schemas/experience'

export default defineConfig({
  name:    'babafemi-codes',
  title:   'babafemi.codes',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [projectSchema, skillsSchema, experienceSchema],
  },
})
