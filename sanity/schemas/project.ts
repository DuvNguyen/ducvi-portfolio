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
      name: 'role',
      title: 'Role / Ownership (Vai trò)',
      type: 'string',
      description: 'e.g. "Một mình làm toàn bộ (Solo Fullstack Developer)"',
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
      description: 'e.g., "Personal Project ☕", "Live Demo 🟢", "Fullstack LMS 📚"',
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
      title: 'Backend / Main GitHub URL',
      type: 'url',
    }),
    // 1. Problem Statement (Vấn đề)
    defineField({
      name: 'problemStatement',
      title: 'Vấn đề (Problem Statement)',
      type: 'text',
      rows: 4,
      description: 'Mô tả vấn đề gặp phải, lý do dự án ra đời (tự học lan man, nguồn thiếu kiểm chứng...)',
    }),
    // 2. Engineering Process (Quá trình)
    defineField({
      name: 'process',
      title: 'Quá trình thực hiện (Engineering Process)',
      type: 'object',
      fields: [
        defineField({
          name: 'tabRationale',
          title: 'Vì sao chia 4 tab (Tab Rationale & Criteria)',
          type: 'text',
          rows: 3,
          description: 'Lý do chia 4 tab (DSA, OOP, System Design, Spring Boot) và tiêu chí phân loại',
        }),
        defineField({
          name: 'contentCuration',
          title: 'Cách chọn và kiểm chứng nội dung (Content Selection & Verification)',
          type: 'text',
          rows: 3,
          description: 'Cách chọn và kiểm chứng nguồn tin cậy (NeetCode 150, roadmap.sh, Effective Java...)',
        }),
        defineField({
          name: 'architectureData',
          title: 'Cấu trúc dữ liệu & Code (Data Architecture & Rendering)',
          type: 'text',
          rows: 3,
          description: 'Lưu nội dung ở đâu, cấu trúc file/DB ra sao, render thế nào (Markdown, SSG, SSR...)',
        }),
      ],
    }),
    // 3. Technical Challenges (Khó khăn kỹ thuật: Gặp gì -> Thử gì -> Chọn gì -> Vì sao)
    defineField({
      name: 'challenges',
      title: 'Khó khăn & Giải pháp kỹ thuật (Technical Challenges)',
      type: 'array',
      description: 'Các vấn đề kỹ thuật có thật được giải quyết (Gặp gì → Thử gì → Chọn gì → Vì sao)',
      of: [
        {
          type: 'object',
          title: 'Thách thức kỹ thuật',
          fields: [
            defineField({
              name: 'title',
              title: 'Tên vấn đề / Thách thức',
              type: 'string',
            }),
            defineField({
              name: 'issue',
              title: 'Gặp gì (The Challenge / Context)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'attempted',
              title: 'Thử gì (Explored Alternatives)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'solution',
              title: 'Chọn gì (Chosen Decision)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'reason',
              title: 'Vì sao (Rationale & Trade-offs)',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
    // 4. Results & Metrics (Kết quả)
    defineField({
      name: 'results',
      title: 'Kết quả & Thước đo (Results & Metrics)',
      type: 'object',
      fields: [
        defineField({
          name: 'summary',
          title: 'Tóm tắt kết quả',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'modulesCount',
          title: 'Số module và số bài học đã có',
          type: 'string',
          description: 'e.g. "4 Trụ Cột, 24+ Chuyên đề, 150+ Bài tập & Ghi chú"',
        }),
        defineField({
          name: 'practicalImpact',
          title: 'Thực tế dùng để học được bao nhiêu',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    // 5. Lessons & Next Steps (Bài học & Bước tiếp theo)
    defineField({
      name: 'lessons',
      title: 'Bài học & Hướng phát triển (Lessons & Next Steps)',
      type: 'object',
      fields: [
        defineField({
          name: 'whatToDoDifferently',
          title: 'Làm khác đi điều gì (What would you do differently)',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'nextSteps',
          title: 'Bước tiếp theo là gì (Future Iterations & Roadmap)',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    // 6. Screenshots & GIF Gallery (Full CRUD in Studio: Add, Edit, Replace, Reorder, Delete)
    defineField({
      name: 'gallery',
      title: 'Project Screenshots & GIF Gallery (CRUD)',
      type: 'array',
      description: 'Hỗ trợ thêm, sửa, thay thế, đổi thứ tự và xóa ảnh chụp màn hình / GIF',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption / Tiêu đề ảnh hoặc GIF',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
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
