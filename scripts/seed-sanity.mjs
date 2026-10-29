import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// Read token from environment variable or argument
const token = process.env.SANITY_API_TOKEN || process.argv[2]
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'in94orx5'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!token) {
  console.error('\n❌ ERROR: Missing SANITY_API_TOKEN.')
  console.log('Usage: SANITY_API_TOKEN=your_token node scripts/seed-sanity.mjs')
  console.log('or:    node scripts/seed-sanity.mjs your_token\n')
  console.log('👉 To get a write token: Go to https://sanity.io/manage/project/in94orx5/api')
  console.log('   Click "Tokens" -> "Add API token" -> Select "Editor" permission -> Save & copy.\n')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Helper to upload image to Sanity CDN
async function uploadImage(relPath) {
  try {
    const fullPath = path.join(rootDir, 'public', relPath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`)
      return null
    }
    const stream = fs.createReadStream(fullPath)
    const asset = await client.assets.upload('image', stream, {
      filename: path.basename(fullPath),
    })
    console.log(`  ✓ Uploaded image: ${relPath} -> ${asset._id}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (err) {
    console.warn(`  ⚠ Failed uploading image ${relPath}:`, err.message)
    return null
  }
}

// Convert string paragraph to Sanity block
function toBlocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _key: `block_${i}`,
    _type: 'block',
    style: 'normal',
    children: [
      {
        _key: `span_${i}`,
        _type: 'span',
        text,
      },
    ],
  }))
}

async function seed() {
  console.log(`\n🚀 Starting Sanity Seed for Project [${projectId}] on Dataset [${dataset}]...\n`)

  // 1. Seed Profile & Site Content
  console.log('📦 Seeding Profile & Site Content document...')
  const profileDoc = {
    _id: 'profile-main',
    _type: 'profile',
    name: 'Vi Nguyen',
    statusText: 'Open to Internship Opportunities',
    heroHeadline: 'Building digital products, robust backends, and scalable systems.',
    heroBio:
      'Final-year Information Technology student skilled in fullstack web development. I enjoy building clean, functional applications using modern frameworks and always eager to learn and improve with every project.',
    capabilitiesHeading: 'Collaborate with engineering teams to build impactful systems.',
    capabilities: [
      {
        _key: 'cap_1',
        title: 'Backend Architecture',
        description:
          'Designing modular RESTful APIs, layered services, and maintainable backends with NestJS and Spring Boot.',
      },
      {
        _key: 'cap_2',
        title: 'Database & Caching',
        description:
          'Relational schema modeling, query optimization with PostgreSQL, and sub-millisecond Redis caching.',
      },
      {
        _key: 'cap_3',
        title: 'Full-Stack Engineering',
        description:
          'Modern, performant web applications engineered with Next.js 15 App Router, React 19, and TypeScript.',
      },
      {
        _key: 'cap_4',
        title: 'Security & Integrations',
        description:
          'Granular RBAC access controls, webhook verification, payment gateways, and third-party API pipelines.',
      },
    ],
    aboutSubtitle:
      'I enjoy learning about software development and applying what I know through personal and academic projects.',
    aboutParagraphs: [
      "Hey! I'm Vi Nguyen, a final-year Information Technology student. I've been learning full-stack web development on my own and through team projects at university, mainly using NestJS, Spring Boot, and React.",
      "I don't have professional work experience yet, but I'm genuinely interested in software development and always trying to improve through building things. I'm open to internship opportunities where I can contribute and keep growing.",
    ],
    skills: [
      'NestJS',
      'Spring Boot',
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Apache Kafka',
      'CI/CD',
      'RESTful API',
      'GIT',
      'Swagger',
    ],
    contactHeading: 'Tell me about your next project or role',
    contactSubtitle:
      'Currently open to Backend and Full-Stack Developer opportunities. Feel free to reach out directly to discuss how I can contribute.',
    marqueeSkills: [
      'NestJS',
      'Spring Boot',
      'Next.js 15',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Apache Kafka',
      'REST APIs',
      'Microservices',
      'Tailwind CSS',
    ],
    email: 'nducvi.information@gmail.com',
    linkedin: 'https://linkedin.com/in/nducviinformation/',
    github: 'https://github.com/DuvNguyen',
  }

  await client.createOrReplace(profileDoc)
  console.log('✓ Profile document created / replaced.\n')

  // 2. Seed Projects
  const projects = [
    {
      id: 'project-studymate',
      title: 'StudyMate — LMS',
      slug: 'studymate',
      order: 1,
      subtitle:
        'A Learning Management System built as a personal project, featuring role-based access, course management, and video content delivery.',
      statusBadge: 'Fullstack LMS',
      mainImagePath: 'assets/png/studymate/homepage.png',
      overview: [
        'StudyMate is a comprehensive E-Learning platform engineered with a focus on scalability and security. The system manages complex permissions across four distinct roles: Students, Instructors, Staff, and Admins, ensuring a tailored experience for every user type.',
        'The backend is built on NestJS and TypeScript, adhering to SOLID principles and layered architecture. It handles an end-to-end e-commerce flow, including course enrollments, shopping carts, and an internal wallet system for instructor payouts. Integration with Clerk for authentication and Svix for real-time user synchronization ensures a seamless and secure onboarding process.',
        'On the frontend, Next.js 15 and React 19 power a high-performance, responsive UI. Features include a unified video player for YouTube and CDN content, instant search with URL synchronization, and data-rich analytics dashboards for administrators.',
      ],
      toolsUsed: [
        'NestJS',
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'TypeORM',
        'Clerk',
        'Redis',
        'Tailwind CSS',
        'Cloudinary',
        'YouTube API',
        'Svix',
        'Swagger',
      ],
      liveDemo: 'https://studymatelms.vercel.app/',
      githubBackend: 'https://github.com/DuvNguyen/studymate_backend',
      githubFrontend: 'https://github.com/DuvNguyen/studymate_frontend',
      gallery: [
        { path: 'assets/png/studymate/featuredCourse.png', caption: 'Featured Courses' },
        { path: 'assets/png/studymate/courseDetail.png', caption: 'Course Detail' },
        { path: 'assets/png/studymate/myCourse.png', caption: 'My Courses' },
        { path: 'assets/png/studymate/learn.png', caption: 'Learning Interface' },
        { path: 'assets/png/studymate/signin.png', caption: 'Sign In Page' },
      ],
    },
    {
      id: 'project-vietsneaker',
      title: 'VietSneaker — Marketplace',
      slug: 'vietsneaker',
      order: 2,
      subtitle:
        'A second-hand sneaker marketplace built as a team project, with product listings, a basic recommendation system, and an admin panel.',
      statusBadge: 'Spring Boot + AI',
      mainImagePath: 'assets/png/vietsneaker/homepage.png',
      overview: [
        'VietSneaker is a specialized marketplace designed to provide a seamless shopping experience for second-hand sneaker enthusiasts. The platform balances a high-performance customer interface with a robust administrative system for inventory and revenue management.',
        'The backend is built with Java and Spring Boot, implementing a layered architecture with Spring Security, JWT, and OAuth2 for secure role-based access control. Key features include a dynamic product catalog, advanced search/filtering, and an AI-driven recommendation engine integrated via OpenRouter/DeepSeek APIs.',
        'The frontend utilizes Next.js and TypeScript for a responsive, SEO-optimized experience, featuring a modern UI built with Tailwind CSS and Shadcn UI.',
      ],
      toolsUsed: [
        'Java',
        'Spring Boot',
        'Spring Security',
        'MySQL',
        'Redis',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Cloudinary',
        'OpenRouter AI',
        'OAuth2 / JWT',
      ],
      liveDemo: 'https://vietsneaker.vercel.app/',
      githubBackend: 'https://github.com/DuvNguyen/VietSneaker_backend',
      githubFrontend: 'https://github.com/DuvNguyen/VietSneaker_frontend',
      gallery: [
        { path: 'assets/png/vietsneaker/productDetail.png', caption: 'Product Details' },
        { path: 'assets/png/vietsneaker/allProducts.png', caption: 'All Products Catalog' },
        { path: 'assets/png/vietsneaker/cart.png', caption: 'Shopping Cart' },
        { path: 'assets/png/vietsneaker/login.png', caption: 'Login & Authentication' },
      ],
    },
    {
      id: 'project-metrohcmc',
      title: 'Metro HCMC — E-Ticketing',
      slug: 'metrohcmc',
      order: 3,
      subtitle:
        'An online ticketing system for the HCMC metro network, designed with a focus on ticket booking, schedule lookups, and clear route navigation.',
      statusBadge: 'Spring Boot + React',
      mainImagePath: 'assets/png/metrohcmc/homepage.png',
      overview: [
        'Metro HCMC is an e-ticketing and transit information system for urban commuters in Ho Chi Minh City. The application provides an end-to-end booking flow, live schedule lookups, and interactive route planning for the city railway network.',
        'The backend is built on Spring Boot with PostgreSQL and Spring Data JPA, providing transactional integrity for seat reservations, ticket generation, and schedule calculations. JWT-based authentication ensures secure access across passenger and admin portals.',
        'The frontend is built with React and TypeScript, featuring a step-by-step booking stepper, interactive station maps, and clear pricing matrices.',
      ],
      toolsUsed: [
        'Java',
        'Spring Boot',
        'Spring Security',
        'PostgreSQL',
        'Spring Data JPA',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Docker',
        'Swagger',
      ],
      liveDemo: 'https://metro-tau-nine.vercel.app/',
      githubBackend: 'https://github.com/DuvNguyen/Metro_Ticket_Booking_Full_Flow',
      githubFrontend: 'https://github.com/DuvNguyen/fe-metro-ticket',
      gallery: [
        { path: 'assets/png/metrohcmc/couponManagement.png', caption: 'Coupon Management' },
        { path: 'assets/png/metrohcmc/lineManagement.png', caption: 'Metro Line Management' },
        { path: 'assets/png/metrohcmc/stationManagement.png', caption: 'Station Management' },
      ],
    },
    {
      id: 'project-slack',
      title: 'Slack Chat Platform',
      slug: 'slack',
      order: 4,
      subtitle:
        'A personal project built as a real-time chat application designed with a microservice architecture using NestJS, Next.js, and Apache Kafka.',
      statusBadge: 'Microservices & Kafka',
      mainImagePath: 'assets/png/slack/homepage.png',
      overview: [
        'Slack Chat Platform is a distributed real-time messaging system engineered to explore scalable microservices and event-driven architectures. The platform replicates core workspace collaboration features including direct messaging, multi-user channels, and live presence.',
        'The architecture is decomposed into decoupled microservices powered by NestJS and Node.js, communicating asynchronously through Apache Kafka event streams for high-throughput message publishing and consumption. Socket.io WebSockets manage sub-millisecond client broadcasts.',
        'Data persistence is managed across PostgreSQL for relational workspace metadata and Redis for ephemeral presence tracking and session caching. The frontend is built with Next.js 15 and Tailwind CSS.',
      ],
      toolsUsed: [
        'NestJS',
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'TypeORM',
        'Apache Kafka',
        'Redis',
        'Docker',
        'Socket.io',
        'Tailwind CSS',
      ],
      githubBackend: 'https://github.com/DuvNguyen/slack-clone-microservices',
      gallery: [
        { path: 'assets/png/slack/auth.png', caption: 'Google Authentication & Register' },
        { path: 'assets/png/slack/channel_chat.png', caption: 'Real-time Channel Chat' },
        { path: 'assets/png/slack/channel_and_profile.png', caption: 'Channel and Profile Settings' },
        { path: 'assets/png/slack/self_dm.png', caption: 'Self Direct Message Feature' },
        { path: 'assets/png/slack/invite.png', caption: 'Workspace Member Invitation' },
        { path: 'assets/png/slack/darkmode.png', caption: 'Sleek Dark Mode Interface' },
      ],
    },
  ]

  for (const proj of projects) {
    console.log(`🖼 Uploading assets for ${proj.title}...`)
    const mainImageRef = await uploadImage(proj.mainImagePath)

    const galleryRefs = []
    if (proj.gallery) {
      for (let i = 0; i < proj.gallery.length; i++) {
        const item = proj.gallery[i]
        const uploaded = await uploadImage(item.path)
        if (uploaded) {
          galleryRefs.push({
            _key: `gal_${i}`,
            _type: 'image',
            asset: uploaded.asset,
            caption: item.caption,
          })
        }
      }
    }

    const doc = {
      _id: proj.id,
      _type: 'project',
      title: proj.title,
      slug: { _type: 'slug', current: proj.slug },
      order: proj.order,
      role: proj.role,
      subtitle: proj.subtitle,
      statusBadge: proj.statusBadge,
      toolsUsed: proj.toolsUsed,
      liveDemo: proj.liveDemo,
      githubBackend: proj.githubBackend,
      githubFrontend: proj.githubFrontend,
      problemStatement: proj.problemStatement,
      process: proj.process,
      challenges: proj.challenges,
      results: proj.results,
      lessons: proj.lessons,
      overview: proj.overview ? toBlocks(proj.overview) : [],
      ...(mainImageRef ? { mainImage: mainImageRef } : {}),
      ...(galleryRefs.length > 0 ? { gallery: galleryRefs } : {}),
    }

    await client.createOrReplace(doc)
    console.log(`✓ Project [${proj.title}] synced to Sanity.\n`)
  }

  console.log('🎉 ALL DATA SUCCESSFULLY SEEDED INTO SANITY!')
  console.log('You can now open http://localhost:3000/studio and edit any project or profile text!\n')
}

seed().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
