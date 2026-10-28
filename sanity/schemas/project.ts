import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first on the homepage',
      initialValue: 1,
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the project card',
    }),
    defineField({
      name: 'statusBadge',
      title: 'Status Badge',
      type: 'string',
      description: 'e.g., "Live Demo 🟢", "Microservices ⚡", "Team Project 👥"',
    }),
    defineField({
      name: 'mainImage',
      title: 'Showcase Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'overview',
      title: 'Project Overview (Case Study Details)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'toolsUsed',
      title: 'Tools / Tech Stack Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'liveDemo',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'githubFrontend',
      title: 'Frontend GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'githubBackend',
      title: 'Backend GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'architectureImage',
      title: 'Architecture Diagram / System Design',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional system architecture or flow diagram',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Screenshots Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption / Screen Title',
            },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
