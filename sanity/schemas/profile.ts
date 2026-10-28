import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile & Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      initialValue: 'Vi Nguyen',
    }),
    defineField({
      name: 'statusText',
      title: 'Status Tag',
      type: 'string',
      description: 'e.g. "Open to Internship Opportunities"',
      initialValue: 'Open to Internship Opportunities',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main heading on the homepage banner',
      initialValue: 'Building digital products, robust backends, and scalable systems.',
    }),
    defineField({
      name: 'heroBio',
      title: 'Hero Short Bio',
      type: 'text',
      rows: 3,
      initialValue:
        'Final-year Information Technology student skilled in fullstack web development. I enjoy building clean, functional applications using modern frameworks and always eager to learn and improve with every project.',
    }),
    defineField({
      name: 'capabilitiesHeading',
      title: 'Capabilities Section Heading',
      type: 'string',
      initialValue: 'Collaborate with engineering teams to build impactful systems.',
    }),
    defineField({
      name: 'capabilities',
      title: 'Core Capabilities (4 Pillars)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
      initialValue:
        'I enjoy learning about software development and applying what I know through personal and academic projects.',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Details Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'skills',
      title: 'Core Technical Competencies (Skills List)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'marqueeSkills',
      title: 'Marquee Running Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      initialValue: 'Tell me about your next project or role',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Section Subtitle / Note',
      type: 'text',
      rows: 2,
      initialValue:
        'Currently open to Backend and Full-Stack Developer opportunities. Feel free to reach out directly to discuss how I can contribute.',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'nducvi.information@gmail.com',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://linkedin.com/in/nducviinformation/',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      initialValue: 'https://github.com/DuvNguyen',
    }),
    defineField({
      name: 'cvFile',
      title: 'CV PDF File',
      type: 'file',
    }),
  ],
})
