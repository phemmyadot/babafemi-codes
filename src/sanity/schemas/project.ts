import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name:  'project',
  title: 'Project',
  type:  'document',
  fields: [
    defineField({
      name:       'title',
      title:      'Title',
      type:       'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name:       'description',
      title:      'Description',
      type:       'text',
      rows:       3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name:    'thumbnail',
      title:   'Thumbnail',
      type:    'image',
      options: { hotspot: true },
    }),
    defineField({
      name:  'tags',
      title: 'Tags',
      type:  'array',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name:    'category',
      title:   'Category',
      type:    'string',
      options: {
        list: [
          { title: 'Mobile',     value: 'mobile' },
          { title: 'Web',        value: 'web' },
          { title: 'Full Stack', value: 'fullstack' },
          { title: 'Backend',    value: 'backend' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name:        'categoryLabel',
      title:       'Category Display Label',
      type:        'string',
      description: 'Override the filter pill label (e.g. "Full Stack" instead of "fullstack")',
    }),
    defineField({
      name:  'repository',
      title: 'GitHub Repository URL',
      type:  'url',
    }),
    defineField({
      name:  'liveUrl',
      title: 'Live URL',
      type:  'url',
    }),
    defineField({
      name:    'featured',
      title:   'Featured',
      type:    'boolean',
      initialValue: false,
    }),
    defineField({
      name:    'order',
      title:   'Display Order',
      type:    'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title:    'title',
      subtitle: 'category',
      media:    'thumbnail',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name:  'orderAsc',
      by:    [{ field: 'order', direction: 'asc' }],
    },
  ],
})
