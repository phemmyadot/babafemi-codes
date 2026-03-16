import { defineField, defineType } from 'sanity'

export const skillsSchema = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'groups',
      title: 'Skill Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Group Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
  ],
})
