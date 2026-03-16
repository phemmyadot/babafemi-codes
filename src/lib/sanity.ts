import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export function getClient() {
  return createClient({
    projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2025-02-19', 
    useCdn:     process.env.NODE_ENV === 'production',
    token:      process.env.SANITY_API_TOKEN,
  })
}
const builder = createImageUrlBuilder(getClient())

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
