import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile & Settings',
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
      title: 'Current Status',
      type: 'string',
      description: 'e.g. "Open to Internship Opportunities 🟢"',
      initialValue: 'Open to Internship Opportunities 🟢',
    }),
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Hey, My name is Vi Nguyen',
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
      title: 'Skills List',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
