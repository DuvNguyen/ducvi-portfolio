import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'role',
      title: 'Role & Ownership',
      type: 'string',
      description: 'e.g. "Lead Full-Stack Developer (Solo Project)", "Backend Engineer"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle & Executive Summary',
      type: 'text',
      rows: 3,
      description: 'Summary shown on the homepage card and case study header',
    }),
    defineField({
      name: 'statusBadge',
      title: 'Status Badge',
      type: 'string',
      description: 'e.g. "Fullstack LMS", "Distributed Chat Platform", "Production Transit System"',
    }),
    defineField({
      name: 'stats',
      title: 'Key Impact Numbers / Metrics (SDv26 Bar)',
      type: 'array',
      description: '3 key impact numbers shown in the top metrics bar (e.g. 500+, <150ms, 90%)',
      of: [
        {
          type: 'object',
          title: 'Impact Metric',
          fields: [
            defineField({ name: 'value', title: 'Value / Metric (e.g. 400+, 90%, <150ms)', type: 'string' }),
            defineField({ name: 'label', title: 'Metric Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description / Context', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Showcase Image / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main showcase hero screenshot displayed at the top of the case study',
    }),
    defineField({
      name: 'toolsUsed',
      title: 'Tools & Tech Stack Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Technologies used in the project (e.g. Next.js 15, PostgreSQL, Redis, Docker)',
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
      title: 'Backend / Main GitHub URL',
      type: 'url',
    }),

    // Chapter 01: Problem Statement
    defineField({
      name: 'problemStatement',
      title: 'Chapter 01 — The Challenge & Problem Space',
      type: 'text',
      rows: 4,
      description: 'The real-world problem, context, and motivation behind building this project',
    }),

    // Chapter 02: Engineering Process & Architecture
    defineField({
      name: 'process',
      title: 'Chapter 02 — The Approach & System Design',
      type: 'object',
      fields: [
        defineField({
          name: 'tabRationale',
          title: 'Architectural Rationale & Core Subsystems',
          type: 'text',
          rows: 3,
          description: 'Rationale behind modular subsystems, pillars, or system partitioning',
        }),
        defineField({
          name: 'contentCuration',
          title: 'Data Curation & Engineering Decisions',
          type: 'text',
          rows: 3,
          description: 'How content/data was validated, structured, or audited against real-world criteria',
        }),
        defineField({
          name: 'architectureData',
          title: 'Data Architecture & System Flow',
          type: 'text',
          rows: 3,
          description: 'Database schema, caching tiers, state management, and rendering pipelines',
        }),
      ],
    }),

    // Chapter 03: Technical Challenges Framework
    defineField({
      name: 'challenges',
      title: 'Chapter 03 — Technical Challenges & Decisions',
      type: 'array',
      description: 'Engineering challenges solved: Challenge → Explored → Decision → Rationale',
      of: [
        {
          type: 'object',
          title: 'Engineering Challenge',
          fields: [
            defineField({
              name: 'title',
              title: 'Challenge Title',
              type: 'string',
            }),
            defineField({
              name: 'issue',
              title: '1. Root Problem / Engineering Challenge',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'attempted',
              title: '2. Explored Alternatives & Trade-offs',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'solution',
              title: '3. Chosen Architecture / Solution',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'reason',
              title: '4. Decision Rationale & Engineering Impact',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),

    // Chapter 04: Results & Metrics
    defineField({
      name: 'results',
      title: 'Chapter 04 — Outcomes & Tangible Impact',
      type: 'object',
      fields: [
        defineField({
          name: 'summary',
          title: 'Executive Outcome Summary',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'modulesCount',
          title: 'Delivered Scope & Key Deliverables',
          type: 'string',
          description: 'e.g. "4 Core Pillars, 24+ Modules, 150+ Benchmarks"',
        }),
        defineField({
          name: 'practicalImpact',
          title: 'Practical Impact & Engineering Application',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    // Retrospective & Next Steps
    defineField({
      name: 'lessons',
      title: 'Retrospective — Key Takeaways & Roadmap',
      type: 'object',
      fields: [
        defineField({
          name: 'whatToDoDifferently',
          title: 'What to Do Differently (Architectural Retrospective)',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'nextSteps',
          title: 'Next Steps & Future Milestones',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    // Screenshots & GIF Gallery (Full CRUD in Studio)
    defineField({
      name: 'gallery',
      title: 'Visual Showcase & Interface Gallery (CRUD)',
      type: 'array',
      description: 'Add, edit, replace, reorder, and remove UI screenshots or GIFs',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption / Feature Name',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),

    // Fallback block overview for backward compatibility
    defineField({
      name: 'overview',
      title: 'Legacy Overview (Block Text)',
      type: 'array',
      of: [{ type: 'block' }],
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
  ],
  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
