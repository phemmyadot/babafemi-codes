import { defineField, defineType } from 'sanity'

export const profileSchema = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', title: 'First Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'lastName',  title: 'Last Name',  type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'tagline',   title: 'Tagline',    type: 'string', description: 'e.g. "Engineering Experiences. Shipping Solutions."' }),
    defineField({
      name: 'titles',
      title: 'Typewriter Titles',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Roles cycled in the hero typewriter',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph in the About section',
    }),
    defineField({ name: 'email',    title: 'Email',    type: 'string' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'github',   title: 'GitHub URL',   type: 'url' }),
    defineField({ name: 'hashnode', title: 'Hashnode URL', type: 'url' }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
      description: 'Upload your resume PDF — served via Sanity CDN',
      options: { accept: '.pdf' },
    }),
    defineField({ name: 'openToWork', title: 'Open to Work', type: 'boolean', initialValue: true }),
    defineField({ name: 'credlyUrl', title: 'Credly Profile URL', type: 'url', description: 'Link to your Credly badge/profile — used on certification badges' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
