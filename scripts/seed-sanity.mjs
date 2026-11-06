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
      {
        _key: 'skill_nestjs',
        _type: 'skillItem',
        name: 'NestJS',
        yearsOrLevel: 'Proficient • Core Backend Framework',
        experience:
          'Architected modular, maintainable backend services following SOLID principles. Built custom metadata reflection decorators and reusable Guard layers for multi-tier RBAC, integrated TypeORM with PostgreSQL, and engineered asynchronous microservices across StudyMate LMS and Slack Chat.',
        highlights: ['StudyMate LMS', 'Slack Chat Microservices', 'RBAC Guards & Decorators', 'TypeORM Integration'],
      },
      {
        _key: 'skill_springboot',
        _type: 'skillItem',
        name: 'Spring Boot',
        yearsOrLevel: 'Proficient • Enterprise Java',
        experience:
          'Developed robust RESTful services and enterprise backends using Java and Spring Boot. Implemented Spring Security with stateless JWT and Google OAuth2, designed JPA Specifications for complex multi-facet filtering, and integrated Redis caching in VietSneaker.',
        highlights: ['VietSneaker Marketplace', 'Spring Security & JWT', 'JPA Specifications', 'OAuth2 Social Login'],
      },
      {
        _key: 'skill_nextjs',
        _type: 'skillItem',
        name: 'Next.js',
        yearsOrLevel: 'Proficient • Full-Stack SSR & App Router',
        experience:
          'Engineered high-performance web applications using Next.js 14 & 15 App Router, Server Components, and Incremental Static Regeneration (ISR). Integrated headless Sanity CMS with visual editing, dynamic routing, and fast client-side transitions.',
        highlights: ['App Router & ISR', 'StudyMate & VietSneaker UI', 'Sanity Studio CMS', 'Server & Client Components'],
      },
      {
        _key: 'skill_react',
        _type: 'skillItem',
        name: 'React',
        yearsOrLevel: 'Proficient • Modern Frontend',
        experience:
          'Crafted interactive, component-driven user interfaces with modern React (hooks, context, state management). Focused on performance optimization, accessible UI components with Tailwind CSS, and fluid interactive modal dialogs.',
        highlights: ['React 18 & 19', 'Custom Hooks & State', 'Framer Motion Animations', 'Tailwind UI Systems'],
      },
      {
        _key: 'skill_typescript',
        _type: 'skillItem',
        name: 'TypeScript',
        yearsOrLevel: 'Proficient • Type Safety',
        experience:
          'Applied strict TypeScript across frontend and backend codebases. Defined shared DTO contracts, domain entities, and runtime schema validation with Zod and class-validator to ensure end-to-end type safety and prevent runtime regressions.',
        highlights: ['End-to-End Type Safety', 'Zod & Class-Validator', 'Shared DTO Contracts', 'Generic Utility Types'],
      },
      {
        _key: 'skill_postgres',
        _type: 'skillItem',
        name: 'PostgreSQL',
        yearsOrLevel: 'Intermediate • Relational DB',
        experience:
          'Designed normalized relational schemas, index strategies, and complex entity relations using TypeORM. Implemented a Database-per-Service pattern in Slack Chat with 3 isolated PostgreSQL instances for complete domain separation.',
        highlights: ['Database-per-Service Pattern', 'TypeORM Migrations', 'Foreign Keys & Indexes', 'Transaction Management'],
      },
      {
        _key: 'skill_redis',
        _type: 'skillItem',
        name: 'Redis',
        yearsOrLevel: 'Intermediate • Caching & Pub/Sub',
        experience:
          'Leveraged Redis for sub-millisecond query caching, user session storage, and refresh token rotation. Integrated the Socket.IO Redis Adapter to distribute real-time WebSocket events horizontally across multi-replica chat nodes.',
        highlights: ['Socket.IO Redis Adapter', 'Query Cache (VietSneaker)', 'Token Rotation', 'Pub/Sub Event Bus'],
      },
      {
        _key: 'skill_docker',
        _type: 'skillItem',
        name: 'Docker',
        yearsOrLevel: 'Intermediate • Containerization',
        experience:
          'Created multi-stage Dockerfiles for optimized production builds. Orchestrated local development environments using Docker Compose—managing PostgreSQL, Kafka, Zookeeper, Redis, and backend service instances seamlessly.',
        highlights: ['Docker Compose Multi-Container', 'Multi-Stage Builds', 'Kafka & DB Containerization', 'Local Dev Environments'],
      },
      {
        _key: 'skill_kafka',
        _type: 'skillItem',
        name: 'Apache Kafka',
        yearsOrLevel: 'Practical • Distributed Streaming',
        experience:
          'Implemented event-driven messaging and Event-Carried State Transfer across microservices. Partitioned topic streams using channelId for strict FIFO message ordering, decoupling burst chat throughput from database write constraints.',
        highlights: ['Event-Carried State Transfer', 'FIFO Partitioning', 'Consumer Groups', 'Decoupled Microservices'],
      },
      {
        _key: 'skill_cicd',
        _type: 'skillItem',
        name: 'CI/CD',
        yearsOrLevel: 'Practical • Automation Pipelines',
        experience:
          'Configured automated GitHub Actions workflows for continuous integration, code linting, automated testing, and zero-downtime continuous deployment pipelines targeting Vercel and cloud platforms upon branch merges.',
        highlights: ['GitHub Actions Workflows', 'Automated Typecheck & Lint', 'Vercel Continuous Deployment', 'Branch Protection'],
      },
      {
        _key: 'skill_rest',
        _type: 'skillItem',
        name: 'RESTful API',
        yearsOrLevel: 'Proficient • API Architecture',
        experience:
          'Designed standardized, resource-oriented RESTful APIs with consistent HTTP status conventions, pagination, filtering, and structured error responses. Implemented secure webhook endpoints with Svix cryptographic signature verification.',
        highlights: ['API Contract Design', 'Svix Cryptographic Webhooks', 'Pagination & Filtering', 'Idempotent Operations'],
      },
      {
        _key: 'skill_git',
        _type: 'skillItem',
        name: 'GIT',
        yearsOrLevel: 'Proficient • Version Control',
        experience:
          'Proficient with Git workflows, Git Flow branching strategies, interactive rebasing, semantic commit conventions, and pull request reviews across solo and collaborative university projects.',
        highlights: ['Feature Branching & PRs', 'Interactive Rebase', 'Semantic Commits', 'Conflict Resolution'],
      },
      {
        _key: 'skill_swagger',
        _type: 'skillItem',
        name: 'Swagger',
        yearsOrLevel: 'Proficient • OpenAPI Documentation',
        experience:
          'Documented RESTful APIs with OpenAPI 3.0 / Swagger annotations in NestJS (@nestjs/swagger) and Spring Boot (springdoc-openapi). Generated interactive API sandboxes to streamline frontend-backend testing and contracts.',
        highlights: ['OpenAPI 3.0 Specifications', '@nestjs/swagger Decorators', 'Springdoc OpenAPI', 'Interactive Testing Sandbox'],
      },
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
    socialLinks: [
      {
        _key: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/nducviinformation/',
      },
      {
        _key: 'github',
        name: 'GitHub',
        url: 'https://github.com/DuvNguyen',
      },
    ],
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
      role: 'Lead Full-Stack Developer (Solo Project)',
      subtitle:
        'A Learning Management System engineered for deep technical mastery, featuring role-based access control, modular curriculum trees, and low-latency video streaming.',
      statusBadge: 'Fullstack LMS',
      mainImagePath: 'assets/png/studymate/homepage.png',
      problemStatement:
        'Mastering enterprise software engineering—from Data Structures & Algorithms and Object-Oriented Design to Spring Boot and Distributed Systems—often overwhelms developers due to fragmented tutorials, unverified roadmaps, and a lack of structured retention tracking. StudyMate was conceived to bridge this gap: a purpose-built learning platform combining validated curriculum tracks, real-world coding benchmarks, and an interactive study workflow.',
      process: {
        tabRationale:
          'Structured into 4 fundamental pillars (DSA, OOP, System Design, Spring Boot) to guide learners through a disciplined engineering progression—transitioning from algorithmic problem-solving and clean object modeling to cloud-native enterprise backend architectures.',
        contentCuration:
          'Curated and cross-referenced against authoritative global standards: NeetCode 150 for core algorithms, roadmap.sh for career progression milestones, Joshua Bloch’s "Effective Java" for best practices, and official Spring.io architecture references.',
        architectureData:
          'Organized hierarchically into Course → Section → Lesson → Exercise entities stored in PostgreSQL via TypeORM. Next.js 15 Incremental Static Regeneration (ISR) ensures sub-second lesson rendering, paired with hybrid video streaming across Cloudinary CDN and YouTube APIs.',
      },
      challenges: [
        {
          title: 'Low-Latency Educational Video Streaming',
          issue:
            'Streaming raw high-definition instructional video directly from self-hosted storage caused bandwidth bottlenecks and high initial buffering times on mobile networks.',
          attempted:
            'Self-hosting video assets directly on the primary backend file server and Node.js streaming pipe.',
          solution:
            'Engineered a unified hybrid media player integrating Cloudinary CDN with adaptive bitrate delivery and YouTube API fallbacks.',
          reason:
            'Offloaded 90% of egress traffic from the core backend, enabled smooth playback across variable bandwidth conditions, and drastically cut infrastructure costs.',
        },
        {
          title: 'Real-Time User Synchronization with Clerk & Webhooks',
          issue:
            'External authentication via Clerk created potential race conditions and state desynchronization with internal PostgreSQL profile records during onboarding.',
          attempted:
            'Client-side polling from the frontend immediately following identity token generation.',
          solution:
            'Implemented an asynchronous Webhook pipeline with Svix cryptographic signature verification and transactional atomic upserts.',
          reason:
            'Guaranteed strict eventual consistency between authentication sessions and application state with zero client-side latency overhead.',
        },
        {
          title: 'Multi-Tier Role-Based Access Control (RBAC)',
          issue:
            'Managing granular authorization boundaries across 4 distinct user tiers (Student, Instructor, Staff, Admin) risked permission leakage and code duplication across controllers.',
          attempted: 'Imperative inline role checking within each individual route controller.',
          solution:
            'Engineered NestJS custom metadata reflection decorators and reusable Guard layers.',
          reason:
            'Centralized all authorization logic in a declarative, DRY paradigm, preventing privilege escalation and making future role extensions effortless.',
        },
      ],
      results: {
        modulesCount: '4 Core Tracks, 20+ Modules, 100+ Exercises',
        summary:
          'Engineered an end-to-end full-stack learning platform with sub-second page transitions, robust RBAC security, and an interactive checkout simulator.',
        practicalImpact:
          'Actively utilized as a structured personal training hub and interview preparation resource, successfully helping peers organize their backend software knowledge.',
      },
      lessons: {
        whatToDoDifferently:
          'Incorporate Redis cache invalidation layers for high-traffic course catalogs upfront rather than relying solely on database read queries during early stages.',
        nextSteps:
          'Integrate an in-browser sandbox code runner powered by WebAssembly/Docker and an AI-powered conversational tutor for real-time problem hints.',
      },
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
      role: 'Backend Lead & AI Integration (University Team Project)',
      subtitle:
        'A curated second-hand sneaker marketplace featuring multi-dimensional filtering, dynamic catalog indexing, and an AI-driven personalized recommendation assistant.',
      statusBadge: 'Spring Boot + AI',
      mainImagePath: 'assets/png/vietsneaker/homepage.png',
      problemStatement:
        'The circular fashion and second-hand sneaker market in Southeast Asia suffers from fragmented marketplaces, inconsistent condition grading, and high friction in finding exact sizing. Buyers struggle with discovery and authenticity verification, while sellers lack automated pricing benchmarks. VietSneaker was built to provide a reliable, high-performance marketplace tailored to sneaker enthusiasts.',
      process: {
        tabRationale:
          '[Studio Placeholder: Category hierarchy criteria] Decomposed the platform into high-efficiency subsystems: Dynamic Product Catalog, Multi-Attribute Filter Engine (brand, condition grade, size, silhouette), Transaction Cart & Checkout, and an Admin Verification Console.',
        contentCuration:
          '[Studio Placeholder: Sneaker grading standards] Standardized metadata across 500+ sneaker references from major brands (Nike, Adidas, Jordan); established rigorous condition appraisal standards (8/10, 9/10, Deadstock) and dynamic market pricing brackets.',
        architectureData:
          'Layered Controller-Service-Repository architecture built with Spring Boot and Spring Data JPA over MySQL. Redis caching handles frequent catalog queries, while OpenRouter/DeepSeek API endpoints power the contextual AI recommendation engine.',
      },
      challenges: [
        {
          title: 'Contextual Sneaker Recommendation via Generative AI',
          issue:
            'New users lack historical interaction data (cold-start problem), rendering traditional collaborative filtering methods ineffective for personalized discovery.',
          attempted:
            'Hardcoded static recommendation rules based purely on top-selling inventory.',
          solution:
            'Integrated OpenRouter / DeepSeek API with prompt-engineered contextual analysis combined with structured product catalog metadata.',
          reason:
            'Delivered a conversational sales assistant experience capable of interpreting nuanced style preferences, sizing nuances, and budget constraints.',
        },
        {
          title: 'High-Performance Multi-Facet Filtering at Scale',
          issue:
            'Complex database queries combining brand, sizing, condition rating, and price range resulted in high MySQL latency as inventory grew.',
          attempted:
            'Complex dynamic SQL queries with multiple nested JOINs and wildcard LIKE operators.',
          solution:
            'Implemented Spring Data JPA Specifications combined with Redis query cache layers for popular filter permutations.',
          reason:
            'Reduced API response times by 65% (from 280ms to under 90ms), maintaining smooth browsing and sub-second pagination.',
        },
        {
          title: 'Stateless Authentication with Google OAuth2 & JWT',
          issue:
            'Needed to seamlessly support both third-party Google OAuth2 sign-in and local credentials while maintaining secure session longevity and revocation.',
          attempted: 'Server-side stateful HTTP session storage in backend memory.',
          solution:
            'Stateless Spring Security architecture utilizing dual JWTs (Access Token + Refresh Token rotation backed by Redis).',
          reason:
            'Maintained total horizontal scalability across backend instances while mitigating token compromise risks via automated rotation.',
        },
      ],
      results: {
        modulesCount: '500+ Cataloged Sneakers, 12 Smart Filters, 1 AI Stylist',
        summary:
          'Successfully developed a production-ready circular commerce platform for authentic second-hand sneakers, combining rapid faceted search with an AI styling assistant.',
        practicalImpact:
          'Awarded top honors in university senior project evaluation; demonstrated an end-to-end commerce pipeline from merchant listing to customer fulfillment.',
      },
      lessons: {
        whatToDoDifferently:
          '[Studio Placeholder: Team workflow learnings] Establish stricter OpenAPI/Swagger API contracts earlier in the development sprint to minimize frontend-backend integration bottlenecks.',
        nextSteps:
          '[Studio Placeholder: Payment integration roadmap] Integrate automated payment webhooks (VNPay / Stripe) and implement a reverse-auction bidding feature for rare sneaker drops.',
      },
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
      githubBackend: 'https://github.com/DuvNguyen/VietSneaker',
      gallery: [
        { path: 'assets/png/vietsneaker/productDetail.png', caption: 'Product Details' },
        { path: 'assets/png/vietsneaker/allProducts.png', caption: 'All Products Catalog' },
        { path: 'assets/png/vietsneaker/cart.png', caption: 'Shopping Cart' },
        { path: 'assets/png/vietsneaker/login.png', caption: 'Login & Authentication' },
      ],
    },
    {
      id: 'project-slack',
      title: 'Slack — Chat Platform',
      slug: 'slack',
      order: 3,
      role: 'Solo Backend & Cloud Architect (Personal Research Project)',
      subtitle:
        'A distributed real-time messaging architecture engineered with NestJS, Apache Kafka, Socket.IO, and Redis, implementing a strict Database-per-Service microservices pattern.',
      statusBadge: 'Microservices & Kafka',
      mainImagePath: 'assets/png/slack/homepage.png',
      problemStatement:
        'Monolithic chat applications inevitably encounter severe concurrency bottlenecks as concurrent active connections (CCU) scale: unified databases experience thread exhaustion, message history queries degrade real-time dispatch, and single-point failures can take down the entire collaboration platform. This project was developed as a deep engineering exploration into horizontally scalable distributed systems.',
      process: {
        tabRationale:
          'Decomposed the architecture into 3 decoupled microservices: Identity Service (Authentication, Profile & SSO), Workspace Service (Workspaces, Channel Trees, Permissions), and Chat Service (Persistent Real-Time Messaging & Presence).',
        contentCuration:
          '[Studio Placeholder: Distributed architecture references] Synthesized engineering design patterns from Slack and Discord architecture whitepapers, focusing on WebSocket connection handling, Redis Pub/Sub multiplexing, and Kafka event streaming.',
        architectureData:
          'Strict Database-per-Service pattern with 3 isolated PostgreSQL databases via TypeORM. Unified API Gateway handles ingress routing and JWT validation; Apache Kafka coordinates asynchronous cross-service domain events; Redis Socket.IO adapter distributes real-time broadcasts.',
      },
      challenges: [
        {
          title: 'Horizontal Scaling of WebSocket State across Replicas',
          issue:
            'When scaling the Chat Service across multiple container instances, clients connected to different nodes could not receive instantaneous messages from one another.',
          attempted:
            'Sticky sessions configured on the reverse proxy load balancer.',
          solution:
            'Implemented the Socket.IO Redis Adapter utilizing Redis Pub/Sub as the message distribution bus across all running nodes.',
          reason:
            'Allowed messages dispatched to any node to broadcast globally in sub-milliseconds, enabling seamless, zero-downtime horizontal pod autoscaling.',
        },
        {
          title: 'Guaranteed Message Ordering & Durability with Apache Kafka',
          issue:
            'Under burst message traffic, asynchronous event processing risked out-of-order message persistence and delivery across active channels.',
          attempted:
            'Synchronous blocking database writes directly inside the incoming WebSocket handler.',
          solution:
            'Partitioned Kafka message streams with channelId as the partition key, consumed by dedicated Consumer Groups.',
          reason:
            'Ensured strict FIFO message ordering per channel, decoupled high-throughput write bursts from database constraints, and prevented message loss.',
        },
        {
          title: 'Cross-Domain Data Isolation (Database-per-Service Pattern)',
          issue:
            'The Chat Service required user metadata (usernames, avatars) for incoming messages but was strictly forbidden from querying the Identity database directly.',
          attempted:
            'Synchronous internal HTTP REST calls between services on every inbound message.',
          solution:
            'Implemented Event-Carried State Transfer via Kafka: Chat Service subscribes to UserUpdated events to maintain a lightweight local read cache.',
          reason:
            'Completely eliminated runtime coupling and synchronous latency overhead, allowing the Chat Service to remain fully operational even if Identity Service restarts.',
        },
      ],
      results: {
        modulesCount: '3 Microservices, 1 API Gateway, Kafka & Redis Cluster',
        summary:
          'Engineered a highly resilient, enterprise-grade real-time messaging system modeling Slack’s architecture, with workspace channels, direct messages, and event-driven data propagation.',
        practicalImpact:
          'Served as a comprehensive capstone for mastering distributed microservice patterns, asynchronous message queuing with Kafka, and high-concurrency WebSocket architectures.',
      },
      lessons: {
        whatToDoDifferently:
          '[Studio Placeholder: Dev environment optimization] The initial local Docker Compose setup was memory-intensive running 3 PostgreSQL instances alongside Kafka and Zookeeper; separate lightweight dev profiles should be adopted earlier.',
        nextSteps:
          '[Studio Placeholder: Enterprise features roadmap] Implement S3 presigned URLs for large multimedia attachment handling and End-to-End Encryption (E2EE) for direct 1-on-1 private messaging.',
      },
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
      githubBackend: 'https://github.com/DuvNguyen/slack-backend',
      githubFrontend: 'https://github.com/DuvNguyen/slack-frontend',
      gallery: [
        { path: 'assets/png/slack/auth.png', caption: 'Google Authentication & Register' },
        { path: 'assets/png/slack/channel_chat.png', caption: 'Real-time Channel Chat' },
        { path: 'assets/png/slack/channel_and_profile.png', caption: 'Channel and Profile Settings' },
        { path: 'assets/png/slack/self_dm.png', caption: 'Self Direct Message Feature' },
        { path: 'assets/png/slack/invite.png', caption: 'Workspace Member Invitation' },
        { path: 'assets/png/slack/darkmode.png', caption: 'Sleek Dark Mode Interface' },
      ],
    },
    {
      id: 'project-careflow',
      title: 'CareFlow — Hospital System',
      slug: 'careflow',
      order: 4,
      role: 'Backend & AI Architect (University Capstone Project)',
      subtitle:
        'An outpatient clinical healthcare platform engineered with 12+ Spring Boot microservices, PostgreSQL pgvector RAG, dual voice-to-text dictation, and evidence-based clinical decision support.',
      statusBadge: 'Microservices & Clinical RAG',
      stats: [
        {
          value: '12+',
          label: 'Decoupled Microservices',
          description: 'Spring Boot 3 domain services with independent schemas, Eureka discovery, RabbitMQ event bus, and Spring Cloud Gateway.',
        },
        {
          value: '1,095',
          label: 'Clinical Guideline Chunks',
          description: 'Hybrid Search (HNSW dense vector + BM25 sparse full-text via RRF k=60) indexing Ministry of Health phác đồ, 15,844 ICD-10 codes, and 701 DDI pairs in pgvector.',
        },
        {
          value: '0%',
          label: 'Form Re-render Lag',
          description: 'Zustand decoupled state store powering real-time dual voice dictation (Consultation Clinical STT & Voice Prescription) with 1-click JSON auto-fill.',
        },
      ],
      mainImagePath: 'assets/png/careflow/homepage.png',
      problemStatement:
        'Outpatient clinics in public hospitals face severe operational bottlenecks: physicians must process dozens of patients daily, track fluctuating vital signs, document detailed clinical notes, and review complex prescriptions against national guidelines in minutes. Fragmented legacy monoliths lack intelligent clinical decision support, while naive large language models suffer from medical hallucinations and lack Vietnamese clinical context. CareFlow was built to resolve these challenges through a resilient, decoupled microservices architecture with an evidence-grounded Clinical RAG system and real-time voice dictation.',
      process: {
        tabRationale:
          'Architected into 12+ microservices following Domain-Driven Design (DDD) and Database-per-Service patterns: Identity & eKYC, Patient Demographics, Electronic Medical Records (EMR), Appointment Scheduling, FIFO Queue Engine, Clinical Consultation, Prescription & Pharmacy, Laboratory Orders, Push Notifications, Analytics, Hospital Directory, and AI Clinical Assistant.',
        contentCuration:
          'Curated and indexed 100% verified Vietnamese medical datasets: 15,844 ICD-10 disease records, 701 contraindicated drug-drug interaction (DDI) pairs from Decision 5948/QĐ-BYT, and Ministry of Health practice guidelines (Type 2 Diabetes, Hypertension, Community-Acquired Pneumonia). Structured with hierarchical breadcrumbs [Guideline > Specialty > Section] and dense 768-dimensional embeddings.',
        architectureData:
          'Polyglot persistence: dedicated PostgreSQL databases per microservice + high-performance PostgreSQL 16 pgvector (0.8.7) on port 5433 with HNSW and GIN indexes. Event-driven communication coordinated via RabbitMQ and Spring Cloud Gateway ingress. Next.js 15 doctor frontend styled with SJD Barcelona medical design principles, utilizing Zustand for atomic state updates.',
      },
      challenges: [
        {
          title: 'Mitigating Clinical Hallucinations with Hybrid RAG & Reciprocal Rank Fusion (RRF)',
          issue:
            'Standard dense vector search frequently fails on exact drug names, chemical formulas, and medical codes, while simple keyword matching lacks semantic comprehension of complex clinical symptoms, risking life-critical medical hallucinations.',
          attempted:
            'Pure dense vector similarity search using Cosine distance alone.',
          solution:
            'Implemented a two-tier Hybrid Search engine in Spring Boot 3 combining pgvector HNSW dense cosine search (<=>) with GIN BM25 sparse full-text ranking (tsv_content), fused using Reciprocal Rank Fusion (RRF, k=60) to retrieve Top 5 guideline chunks, accompanied by strict Human-in-the-Loop prompt guardrails and verifiable evidenceRefs citations.',
          reason:
            'Achieved 100% traceable clinical evidence linking directly to official Ministry of Health decisions, eliminating ungrounded medical hallucinations and ensuring doctor review before any clinical action.',
        },
        {
          title: 'Zero-Latency Voice Dictation & Eliminating Form Re-render Freezes',
          issue:
            'Integrating real-time speech-to-text (Consultation STT) and live vital monitoring into a complex clinical workspace (>2,600 LOC) caused severe React re-rendering cascades, freezing keyboard input during doctor consultations.',
          attempted:
            'Centralized React Context Provider wrapping the entire consultation tree, triggering top-down re-renders on every streaming audio chunk and timer tick.',
          solution:
            'Engineered an isolated global store using Zustand (useVoiceStore), decoupling MediaRecorder audio capture, recording duration counters, and transcription status from UI components. Built an instant Cancel/Retry mechanism and an on-demand snapshot extractor that pulls form state only when switching to the AI assistant tab.',
          reason:
            'Completely eliminated UI re-rendering overhead (0% form lag) while enabling seamless one-click JSON auto-fill across 11 clinical form fields.',
        },
        {
          title: 'System-Wide SDD Refactoring & 0-Regression Baseline Harmonization',
          issue:
            'Coordinating breaking changes across 12+ microservices and a monorepo with 23,000+ symbols risked breaking cross-service contracts, event payloads, and dual voice pipelines during develop (R0–R7) integration.',
          attempted:
            'Manual grep searches and ad-hoc endpoint adjustments across individual services.',
          solution:
            'Applied GitNexus code intelligence graph (23,803 symbols, 52,888 relationships, 850 execution flows) for upstream/downstream impact analysis before refactoring, combined with Spec-Driven Development (SDD) contracts and automated test suites (13/13 passing in AI service).',
          reason:
            'Successfully resolved 7 complex merge conflicts with zero regressions, harmonizing dual voice processing (Consultation STT and Voice Prescription) with clean microservice boundaries.',
        },
      ],
      results: {
        modulesCount: '12+ Microservices, 1,095 Vector Chunks, 701 DDI Rules, 2 Frontends',
        summary:
          'Delivered an enterprise-grade outpatient healthcare ecosystem featuring Spring Boot 3 microservices, an evidence-grounded Clinical RAG engine, and an ergonomic Doctor Web interface built to international SJD Barcelona standards.',
        practicalImpact:
          'Successfully presented in university capstone with end-to-end simulated outpatient patient journeys—from mobile queue check-in to real-time doctor consultation, AI guideline recommendations, and automated prescription safety validation.',
      },
      lessons: {
        whatToDoDifferently:
          'Define formal OpenAPI/Swagger and AsyncAPI event contracts upfront before service decomposition to minimize inter-team coordination overhead and mocking delays.',
        nextSteps:
          'Deploy on-premise Whisper STT and quantized Vietnamese medical Small Language Models (e.g. Qwen 2.5 7B via LoRA) directly on local hospital GPU nodes to guarantee 100% data sovereignty and zero cloud egress.',
      },
      overview: [
        'CareFlow is an enterprise-scale outpatient clinical healthcare platform architected as a distributed microservices system. Designed to streamline high-volume outpatient workflows in public hospitals, the system manages the complete patient journey from native mobile registration and QR code check-in to real-time queue management, multi-stage clinical consultation, laboratory orders, and pharmacy dispensing.',
        'The backend is built with Spring Boot 3 and Java 21, comprising 12+ decoupled microservices adhering to Domain-Driven Design (DDD) and Database-per-Service principles. An integrated Clinical RAG AI service leverages PostgreSQL 16 with pgvector (0.8.7) to index 1,095 clinical guideline chunks from official Ministry of Health directives, 15,844 ICD-10 diagnostic codes, and 701 contraindicated drug-drug interaction (DDI) rules. Hybrid Search combines HNSW dense cosine search with GIN BM25 full-text queries via Reciprocal Rank Fusion (RRF, k=60), delivering 100% auditable clinical evidence citations and preventing LLM medical hallucinations.',
        'The Doctor Web frontend is engineered with Next.js 15, React 19, TypeScript, and Tailwind CSS, following clinical UI standards modeled on SJD Barcelona Children\'s Hospital. It features a Dual Voice Speech-to-Text (STT) architecture—Consultation Clinical STT with an atomic Zustand store (useVoiceStore) for effortless voice symptom dictation, and Voice Prescription drafting with automated entity parsing and 1-click order fulfillment.',
      ],
      toolsUsed: [
        'Java 21',
        'Spring Boot 3',
        'Spring Cloud Gateway',
        'PostgreSQL',
        'pgvector',
        'Next.js 15',
        'React 19',
        'TypeScript',
        'Zustand',
        'Tailwind CSS',
        'RabbitMQ',
        'Docker',
        'Gemini 2.5 Flash',
        'Python',
        'GitNexus',
        'REST APIs',
      ],
      hideLiveDemo: true,
      githubBackend: 'https://github.com/ntkhai268/careflow',
      gallery: [
        { path: 'assets/png/careflow/homepage.png', caption: 'Doctor Web Dashboard & Overview' },
        { path: 'assets/png/careflow/queue-lanes.png', caption: '3-Lane Outpatient Queue Management' },
        { path: 'assets/png/careflow/consultation.png', caption: 'Clinical Consultation Workspace & Vitals' },
        { path: 'assets/png/careflow/clinical-rag.png', caption: 'Clinical RAG Assistant & Guidelines' },
        { path: 'assets/png/careflow/voice-stt.png', caption: 'Dual Voice-to-Text Dictation & Auto-Fill' },
        { path: 'assets/png/careflow/pharmacy.png', caption: 'Pharmacy Dispensing & DDI Verification' },
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
      stats: proj.stats
        ? proj.stats.map((s, i) => ({
            _key: `stat_${i}`,
            value: s.value,
            label: s.label,
            description: s.description,
          }))
        : [],
      toolsUsed: proj.toolsUsed,
      liveDemo: proj.liveDemo,
      hideLiveDemo: Boolean(proj.hideLiveDemo),
      hidden: Boolean(proj.hidden),
      githubBackend: proj.githubBackend,
      githubFrontend: proj.githubFrontend,
      problemStatement: proj.problemStatement,
      process: proj.process,
      challenges: proj.challenges
        ? proj.challenges.map((c, i) => ({
            _key: `challenge_${i}`,
            title: c.title,
            issue: c.issue,
            attempted: c.attempted,
            solution: c.solution,
            reason: c.reason,
          }))
        : [],
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
