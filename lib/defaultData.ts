export interface CaseStudyProcess {
  tabRationale?: string
  contentCuration?: string
  architectureData?: string
}

export interface CaseStudyChallenge {
  title?: string
  issue: string
  attempted: string
  solution: string
  reason: string
}

export interface CaseStudyResults {
  summary?: string
  modulesCount?: string
  practicalImpact?: string
}

export interface CaseStudyStat {
  value: string
  label: string
  description: string
}

export interface CaseStudyLessons {
  whatToDoDifferently?: string
  nextSteps?: string
}

export interface ProjectItem {
  _id: string
  title: string
  slug: string
  order: number
  subtitle: string
  role?: string
  statusBadge?: string
  stats?: CaseStudyStat[]
  mainImage?: any
  imageUrl?: string
  overview?: string[]
  problemStatement?: string
  process?: CaseStudyProcess
  challenges?: CaseStudyChallenge[]
  results?: CaseStudyResults
  lessons?: CaseStudyLessons
  toolsUsed: string[]
  liveDemo?: string
  hideLiveDemo?: boolean
  hidden?: boolean
  githubFrontend?: string
  githubBackend?: string
  gallery?: { imageUrl: string; caption?: string; alt?: string }[]
}

export interface PostItem {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  readingTime: string
  tags: string[]
  featured?: boolean
  imageUrl?: string
  content: string
}

export interface CapabilityItem {
  title: string
  description: string
}

export interface SocialLinkItem {
  name: string
  url: string
}

export interface SkillItem {
  name: string
  experience?: string
  yearsOrLevel?: string
  highlights?: string[]
}

export interface ProfileData {
  name: string
  headline: string
  statusText: string
  roleTitle?: string
  location?: string
  availability?: string
  heroHeadline?: string
  heroBio: string
  aboutSubtitle: string
  aboutParagraphs: string[]
  skills: SkillItem[]
  email: string
  socialLinks?: SocialLinkItem[]
  linkedin: string
  github: string
  cvUrl: string
  capabilitiesHeading?: string
  capabilities?: CapabilityItem[]
  contactHeading?: string
  contactSubtitle?: string
  marqueeSkills?: string[]
}

export const defaultProfile: ProfileData = {
  name: 'Vi Nguyen',
  headline: 'Vi Nguyen — Backend & Software Engineer',
  statusText: 'Available for Opportunities',
  roleTitle: 'Backend & Software Engineer',
  location: 'Ho Chi Minh City, Vietnam (Open to Remote / Relocation)',
  availability: 'Available Immediately • Full-Time',
  heroHeadline: 'Architecting high-performance APIs, robust backends, and distributed systems.',
  heroBio:
    'Backend & Software Engineer specializing in NestJS, Spring Boot, PostgreSQL, and distributed architectures. Focused on clean system design, sub-millisecond Redis caching, event-driven pipelines, and shipping reliable applications.',
  aboutSubtitle:
    'Passionate software engineer focused on distributed backend architectures, clean API contracts, and practical AI integrations.',
  aboutParagraphs: [
    "Hi, I'm Vi Nguyen — a software engineer with a strong focus on backend systems, clean architecture, and scalable web applications. My core expertise centers around NestJS, Java Spring Boot, TypeScript, and databases like PostgreSQL and Redis.",
    "I love solving real engineering problems: designing granular multi-role RBAC security models, eliminating query bottlenecks, orchestrating event-driven messaging with Kafka, and integrating intelligent AI recommendation workflows. I treat every project with production standards — emphasizing type safety, automated CI/CD pipelines, comprehensive API contracts, and maintainability.",
    "I am currently actively seeking full-time backend and software engineering opportunities (remote, hybrid, or on-site). If you are looking for an engineer who communicates clearly, takes ownership, and writes reliable, testable code, let's connect!",
  ],
  skills: [
    {
      name: 'NestJS',
      yearsOrLevel: 'Proficient • Core Backend Framework',
      experience:
        'Architected modular, maintainable backend services following SOLID principles. Built custom metadata reflection decorators and reusable Guard layers for multi-tier RBAC, integrated TypeORM with PostgreSQL, and engineered asynchronous microservices across StudyMate LMS and Slack Chat.',
      highlights: ['StudyMate LMS', 'Slack Chat Microservices', 'RBAC Guards & Decorators', 'TypeORM Integration'],
    },
    {
      name: 'Spring Boot',
      yearsOrLevel: 'Proficient • Enterprise Java',
      experience:
        'Developed robust RESTful services and enterprise backends using Java and Spring Boot. Implemented Spring Security with stateless JWT and Google OAuth2, designed JPA Specifications for complex multi-facet filtering, and integrated Redis caching in VietSneaker.',
      highlights: ['VietSneaker Marketplace', 'Spring Security & JWT', 'JPA Specifications', 'OAuth2 Social Login'],
    },
    {
      name: 'Next.js',
      yearsOrLevel: 'Proficient • Full-Stack SSR & App Router',
      experience:
        'Engineered high-performance web applications using Next.js 14 & 15 App Router, Server Components, and Incremental Static Regeneration (ISR). Integrated headless Sanity CMS with visual editing, dynamic routing, and fast client-side transitions.',
      highlights: ['App Router & ISR', 'StudyMate & VietSneaker UI', 'Sanity Studio CMS', 'Server & Client Components'],
    },
    {
      name: 'React',
      yearsOrLevel: 'Proficient • Modern Frontend',
      experience:
        'Crafted interactive, component-driven user interfaces with modern React (hooks, context, state management). Focused on performance optimization, accessible UI components with Tailwind CSS, and fluid interactive modal dialogs.',
      highlights: ['React 18 & 19', 'Custom Hooks & State', 'Framer Motion Animations', 'Tailwind UI Systems'],
    },
    {
      name: 'TypeScript',
      yearsOrLevel: 'Proficient • Type Safety',
      experience:
        'Applied strict TypeScript across frontend and backend codebases. Defined shared DTO contracts, domain entities, and runtime schema validation with Zod and class-validator to ensure end-to-end type safety and prevent runtime regressions.',
      highlights: ['End-to-End Type Safety', 'Zod & Class-Validator', 'Shared DTO Contracts', 'Generic Utility Types'],
    },
    {
      name: 'PostgreSQL',
      yearsOrLevel: 'Intermediate • Relational DB',
      experience:
        'Designed normalized relational schemas, index strategies, and complex entity relations using TypeORM. Implemented a Database-per-Service pattern in Slack Chat with 3 isolated PostgreSQL instances for complete domain separation.',
      highlights: ['Database-per-Service Pattern', 'TypeORM Migrations', 'Foreign Keys & Indexes', 'Transaction Management'],
    },
    {
      name: 'Redis',
      yearsOrLevel: 'Intermediate • Caching & Pub/Sub',
      experience:
        'Leveraged Redis for sub-millisecond query caching, user session storage, and refresh token rotation. Integrated the Socket.IO Redis Adapter to distribute real-time WebSocket events horizontally across multi-replica chat nodes.',
      highlights: ['Socket.IO Redis Adapter', 'Query Cache (VietSneaker)', 'Token Rotation', 'Pub/Sub Event Bus'],
    },
    {
      name: 'Docker',
      yearsOrLevel: 'Intermediate • Containerization',
      experience:
        'Created multi-stage Dockerfiles for optimized production builds. Orchestrated local development environments using Docker Compose—managing PostgreSQL, Kafka, Zookeeper, Redis, and backend service instances seamlessly.',
      highlights: ['Docker Compose Multi-Container', 'Multi-Stage Builds', 'Kafka & DB Containerization', 'Local Dev Environments'],
    },
    {
      name: 'Apache Kafka',
      yearsOrLevel: 'Practical • Distributed Streaming',
      experience:
        'Implemented event-driven messaging and Event-Carried State Transfer across microservices. Partitioned topic streams using channelId for strict FIFO message ordering, decoupling burst chat throughput from database write constraints.',
      highlights: ['Event-Carried State Transfer', 'FIFO Partitioning', 'Consumer Groups', 'Decoupled Microservices'],
    },
    {
      name: 'CI/CD',
      yearsOrLevel: 'Practical • Automation Pipelines',
      experience:
        'Configured automated GitHub Actions workflows for continuous integration, code linting, automated testing, and zero-downtime continuous deployment pipelines targeting Vercel and cloud platforms upon branch merges.',
      highlights: ['GitHub Actions Workflows', 'Automated Typecheck & Lint', 'Vercel Continuous Deployment', 'Branch Protection'],
    },
    {
      name: 'RESTful API',
      yearsOrLevel: 'Proficient • API Architecture',
      experience:
        'Designed standardized, resource-oriented RESTful APIs with consistent HTTP status conventions, pagination, filtering, and structured error responses. Implemented secure webhook endpoints with Svix cryptographic signature verification.',
      highlights: ['API Contract Design', 'Svix Cryptographic Webhooks', 'Pagination & Filtering', 'Idempotent Operations'],
    },
    {
      name: 'GIT',
      yearsOrLevel: 'Proficient • Version Control',
      experience:
        'Proficient with Git workflows, Git Flow branching strategies, interactive rebasing, semantic commit conventions, and pull request reviews across solo and collaborative university projects.',
      highlights: ['Feature Branching & PRs', 'Interactive Rebase', 'Semantic Commits', 'Conflict Resolution'],
    },
    {
      name: 'Swagger',
      yearsOrLevel: 'Proficient • OpenAPI Documentation',
      experience:
        'Documented RESTful APIs with OpenAPI 3.0 / Swagger annotations in NestJS (@nestjs/swagger) and Spring Boot (springdoc-openapi). Generated interactive API sandboxes to streamline frontend-backend testing and contracts.',
      highlights: ['OpenAPI 3.0 Specifications', '@nestjs/swagger Decorators', 'Springdoc OpenAPI', 'Interactive Testing Sandbox'],
    },
    {
      name: 'AI-Assisted Engineering',
      yearsOrLevel: 'Proficient • Agentic Workflows',
      experience:
        'Proficient with modern developer AI tools including Claude Code, Google Antigravity / Codex, Model Context Protocol (MCP) servers, SKILL.md runbook specs, plugins, and structured prompt engineering to accelerate delivery and code review.',
      highlights: ['Claude Code', 'Antigravity / Codex', 'MCP Protocols', 'SKILL.md Specifications', 'Automated Code Review'],
    },
    {
      name: 'Conversational Alignment',
      yearsOrLevel: 'Proficient • Spoken Collaboration',
      experience:
        'Believer in connecting by speaking out. Proactive in discussions, articulating technical trade-offs clearly, clarifying ambiguous requirements through direct conversation, and keeping cross-functional teams aligned.',
      highlights: ['Proactive Dialogue', 'Architectural Discussions', 'Requirement Clarification', 'Cross-Functional Alignment'],
    },
  ],
  capabilitiesHeading: 'What I bring to an engineering team.',
  capabilities: [
    {
      title: 'Backend Architecture',
      description:
        'Designing modular RESTful APIs, layered services, and maintainable backends with NestJS and Spring Boot.',
    },
    {
      title: 'Database & Caching',
      description:
        'Relational schema modeling, query optimization with PostgreSQL, and sub-millisecond Redis caching.',
    },
    {
      title: 'Product Development',
      description:
        'Building modern web interfaces with Next.js 15 and React 19 that connect directly to scalable backend services.',
    },
    {
      title: 'Security & Integrations',
      description:
        'Granular RBAC access controls, webhook verification, payment gateways, and third-party API pipelines.',
    },
    {
      title: 'Conversational Alignment',
      description:
        'Connecting by speaking out. Proactive in discussing requirements, clarifying ambiguities through direct conversation, and articulating trade-offs openly.',
    },
    {
      title: 'AI & Agentic Workflows',
      description:
        'Leveraging modern AI tools — Claude Code, Antigravity, MCP servers, SKILL.md runbooks, plugins, and structured prompt reviews to accelerate engineering velocity.',
    },
  ],
  contactHeading: "Let's discuss how I can bring value to your engineering team",
  contactSubtitle:
    'Actively interviewing for Backend and Software Engineer roles. Whether you have an open headcount, a contract project, or want to discuss system architecture, my inbox is always open.',
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
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/nducviinformation/',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/DuvNguyen',
    },
  ],
  linkedin: 'https://linkedin.com/in/nducviinformation/',
  github: 'https://github.com/DuvNguyen',
  cvUrl: '/assets/cv.pdf',
}

export const defaultProjects: ProjectItem[] = [
  {
    _id: '1',
    title: 'StudyMate — LMS',
    slug: 'studymate',
    order: 1,
    role: 'Lead Full-Stack Developer (Solo Project)',
    subtitle:
      'A Learning Management System engineered for deep technical mastery, featuring role-based access control, modular curriculum trees, and low-latency video streaming.',
    statusBadge: 'Fullstack LMS 📚',
    stats: [
      {
        value: '4',
        label: 'Core Engineering Tracks',
        description: 'DSA, OOP, System Design, and Spring Boot structured curriculum.',
      },
      {
        value: '20+',
        label: 'Specialized Modules',
        description: 'Deep dive topics covering algorithms, enterprise patterns, and interview prep.',
      },
      {
        value: '90%',
        label: 'Bandwidth Offloaded',
        description: 'Hybrid Cloudinary CDN and YouTube delivery for adaptive low-latency streaming.',
      },
    ],
    imageUrl: '/assets/png/studymate/homepage.png',
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
      { imageUrl: '/assets/png/studymate/featuredCourse.png', caption: 'Featured Courses' },
      { imageUrl: '/assets/png/studymate/courseDetail.png', caption: 'Course Detail' },
      { imageUrl: '/assets/png/studymate/myCourse.png', caption: 'My Courses' },
      { imageUrl: '/assets/png/studymate/learn.png', caption: 'Learning Interface' },
      { imageUrl: '/assets/png/studymate/signin.png', caption: 'Sign In Page' },
    ],
  },
  {
    _id: '2',
    title: 'VietSneaker — Marketplace',
    slug: 'vietsneaker',
    order: 2,
    role: 'Backend Lead & AI Integration (University Team Project)',
    subtitle:
      'A curated second-hand sneaker marketplace featuring multi-dimensional filtering, dynamic catalog indexing, and an AI-driven personalized recommendation assistant.',
    statusBadge: 'Spring Boot + AI 👟',
    stats: [
      {
        value: '500+',
        label: 'Cataloged Sneaker Models',
        description: 'Standardized condition appraisals and metadata across top streetwear brands.',
      },
      {
        value: '65%',
        label: 'Query Latency Reduction',
        description: 'JPA Specifications combined with Redis cache cutting response times below 90ms.',
      },
      {
        value: '1',
        label: 'AI Conversational Stylist',
        description: 'Contextual DeepSeek recommendation engine tailoring suggestions to buyer budget.',
      },
    ],
    imageUrl: '/assets/png/vietsneaker/homepage.png',
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
      'Swagger',
    ],
    liveDemo: 'https://vietsneaker.vercel.app/',
    githubBackend: 'https://github.com/DuvNguyen/VietSneaker',
    gallery: [
      { imageUrl: '/assets/png/vietsneaker/allProducts.png', caption: 'All Products' },
      { imageUrl: '/assets/png/vietsneaker/productDetail.png', caption: 'Product Detail' },
      { imageUrl: '/assets/png/vietsneaker/cart.png', caption: 'Shopping Cart' },
      { imageUrl: '/assets/png/vietsneaker/login.png', caption: 'Login Page' },
    ],
  },
  {
    _id: '3',
    title: 'Slack — Chat Platform',
    slug: 'slack',
    order: 3,
    role: 'Solo Backend & Cloud Architect (Personal Research Project)',
    subtitle:
      'A distributed real-time messaging architecture engineered with NestJS, Apache Kafka, Socket.IO, and Redis, implementing a strict Database-per-Service microservices pattern.',
    statusBadge: 'Microservices & Kafka 💬',
    stats: [
      {
        value: '3',
        label: 'Decoupled Microservices',
        description: 'Database-per-Service architecture separating Identity, Workspace, and Chat domains.',
      },
      {
        value: '0ms',
        label: 'Cross-Replica Broadcast Lag',
        description: 'Socket.IO horizontal scaling powered by Redis Pub/Sub multi-node message distribution.',
      },
      {
        value: '100%',
        label: 'FIFO Message Durability',
        description: 'Apache Kafka event streams with channelId partitioning ensuring strict ordering.',
      },
    ],
    imageUrl: '/assets/png/slack/homepage.png',
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
      'Slack is a comprehensive real-time communication platform built on a decoupled microservices architecture. Designed to emulate the core functionalities of Slack, it scales efficiently to support secure instant messaging, workspace configuration, and real-time updates.',
      'The backend utilizes a Database-per-Service pattern with three distinct PostgreSQL databases mapped via TypeORM. A reverse-proxy API Gateway serves as the unified entry point for client traffic. This gateway forwards authentication, user settings, and SSO requests to the Identity Service, workspace and channel updates to the Workspace Service, and live messages to the Chat Service.',
      'Real-time communications are enabled by WebSockets (Socket.IO), which are horizontally scaled using a Redis Adapter. Asynchronous background event streams are managed using Apache Kafka, ensuring reliability. The frontend is built on Next.js and styled with Tailwind CSS to deliver a highly interactive, responsive user experience.',
    ],
    toolsUsed: [
      'NestJS',
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'TypeORM',
      'Redis',
      'Apache Kafka',
      'Socket.IO',
      'Tailwind CSS',
      'Cloudinary',
      'Docker',
      'OAuth2 / JWT',
    ],
    githubBackend: 'https://github.com/DuvNguyen/slack-backend',
    githubFrontend: 'https://github.com/DuvNguyen/slack-frontend',
    gallery: [
      { imageUrl: '/assets/png/slack/auth.png', caption: 'Google Authentication & Register' },
      { imageUrl: '/assets/png/slack/channel_chat.png', caption: 'Real-time Channel Chat' },
      { imageUrl: '/assets/png/slack/channel_and_profile.png', caption: 'Channel and Profile Settings' },
      { imageUrl: '/assets/png/slack/self_dm.png', caption: 'Self Direct Message Feature' },
      { imageUrl: '/assets/png/slack/invite.png', caption: 'Workspace Member Invitation' },
      { imageUrl: '/assets/png/slack/darkmode.png', caption: 'Sleek Dark Mode Interface' },
    ],
  },
  {
    _id: '4',
    title: 'CareFlow — Hospital System',
    slug: 'careflow',
    order: 4,
    role: 'Backend & AI Architect (University Capstone Project)',
    subtitle:
      'An outpatient clinical healthcare platform engineered with 12+ Spring Boot microservices, PostgreSQL pgvector RAG, dual voice-to-text dictation, and evidence-based clinical decision support.',
    statusBadge: 'Microservices & Clinical RAG 🏥',
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
    imageUrl: '/assets/png/careflow/homepage.png',
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
      { imageUrl: '/assets/png/careflow/homepage.png', caption: 'Doctor Web Dashboard & Overview' },
      { imageUrl: '/assets/png/careflow/queue-lanes.png', caption: '3-Lane Outpatient Queue Management' },
      { imageUrl: '/assets/png/careflow/consultation.png', caption: 'Clinical Consultation Workspace & Vitals' },
      { imageUrl: '/assets/png/careflow/clinical-rag.png', caption: 'Clinical RAG Assistant & Guidelines' },
      { imageUrl: '/assets/png/careflow/voice-stt.png', caption: 'Dual Voice-to-Text Dictation & Auto-Fill' },
      { imageUrl: '/assets/png/careflow/pharmacy.png', caption: 'Pharmacy Dispensing & DDI Verification' },
    ],
  },
]

export const defaultPosts: PostItem[] = [
  {
    _id: 'post-rbac-nestjs',
    title: 'Designing Granular Multi-Role RBAC in NestJS with Custom Decorators & PostgreSQL',
    slug: 'designing-multi-role-rbac-nestjs-postgresql',
    publishedAt: '2025-02-18T10:00:00Z',
    excerpt:
      'A deep dive into architecting a flexible Role-Based Access Control (RBAC) system in NestJS using reflection decorators, guards, and efficient PostgreSQL schema design.',
    readingTime: '6 min read',
    tags: ['NestJS', 'Architecture', 'Security', 'PostgreSQL'],
    featured: true,
    content: `Role-Based Access Control (RBAC) is one of the most critical security layers in any enterprise backend. While many beginner tutorials demonstrate simple hardcoded role checks like \`@Roles('ADMIN')\`, real-world applications demand granular permissions, multi-tenant isolation, and resource-level access control.

In this article, I share the architectural patterns I used when engineering the authentication and authorization layer for **StudyMate LMS**, handling Students, Instructors, Auditors, and System Administrators.

---

## 1. The Pitfalls of Naive Role Checks

A standard naive approach often embeds role checks directly within the controller or service:

\`\`\`typescript
@Get('course/:id/grades')
async getGrades(@Req() req, @Param('id') courseId: string) {
  if (req.user.role !== 'INSTRUCTOR' && req.user.role !== 'ADMIN') {
    throw new ForbiddenException('Access denied');
  }
  return this.gradesService.findByCourse(courseId);
}
\`\`\`

Why does this fail at scale?
1. **Coupled Business & Authorization Logic:** Controllers become littered with role comparisons.
2. **Brittle Role Escalation:** Adding a new role (e.g., "Teaching Assistant" or "Auditor") requires modifying hundreds of endpoints.
3. **Missing Resource Ownership:** Knowing the user is an \`INSTRUCTOR\` doesn't mean they own *this specific course*.

---

## 2. Decoupling Roles from Granular Permissions

Instead of assigning roles directly to routes, assign **Permissions** to Roles, and attach **Permission Requirements** to routes:

- **Role:** \`INSTRUCTOR\`
- **Permissions:** \`courses:create\`, \`courses:read\`, \`grades:update\`, \`content:publish\`

### Database Schema Design

We normalize this in PostgreSQL with four key tables:

\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id VARCHAR(64) PRIMARY KEY, -- e.g. 'ADMIN', 'INSTRUCTOR', 'STUDENT'
  description TEXT
);

CREATE TABLE permissions (
  id VARCHAR(64) PRIMARY KEY, -- e.g. 'courses:write', 'analytics:view'
  category VARCHAR(64) NOT NULL
);

CREATE TABLE role_permissions (
  role_id VARCHAR(64) REFERENCES roles(id) ON DELETE CASCADE,
  permission_id VARCHAR(64) REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);
\`\`\`

---

## 3. Custom Metadata Reflection in NestJS

NestJS allows us to attach metadata to handler routes using \`SetMetadata\` or \`Reflector.createDecorator\`:

\`\`\`typescript
// permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
\`\`\`

Now our controller endpoint looks declarative and clean:

\`\`\`typescript
@Get('course/:id/grades')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermissions('grades:read')
async getGrades(@Param('id') courseId: string) {
  return this.gradesService.findByCourse(courseId);
}
\`\`\`

---

## 4. Crafting the PermissionsGuard

The Guard pulls the required permissions from route metadata and evaluates the authenticated user's permissions:

\`\`\`typescript
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No special permissions required
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.permissions) {
      throw new ForbiddenException('User permissions could not be verified');
    }

    const hasAll = requiredPermissions.every((perm) =>
      user.permissions.includes(perm)
    );

    if (!hasAll) {
      throw new ForbiddenException('Insufficient privileges for this resource');
    }

    return true;
  }
}
\`\`\`

---

## 5. Performance: Caching User Permissions

Loading permissions from PostgreSQL on every single API request introduces unnecessary database round-trips. 

To solve this:
1. **JWT Payload Claims:** For lightweight permissions, embed the permission list into the signed JWT access token.
2. **Redis In-Memory Session Cache:** For dynamic systems where permissions can be revoked immediately by an admin, store \`user:{id}:permissions\` in Redis with a 15-minute TTL. Upon permission updates, emit an invalidation event.

---

## Conclusion

By separating roles from granular permissions and using declarative NestJS decorators, the authorization codebase becomes extensible, audit-proof, and pleasant to maintain. You can onboard new user types without changing a single line of controller logic.`,
  },
  {
    _id: 'post-redis-spring-boot',
    title: 'Sub-Millisecond Read Performance: Redis Caching Patterns in Spring Boot',
    slug: 'sub-millisecond-redis-caching-spring-boot',
    publishedAt: '2025-01-28T09:30:00Z',
    excerpt:
      'Practical caching strategies in Spring Boot: cache-aside, cache-through, TTL eviction, and mitigating cache stampede in high-traffic e-commerce backends.',
    readingTime: '7 min read',
    tags: ['Spring Boot', 'Redis', 'Performance', 'Java'],
    featured: true,
    content: `In high-concurrency systems, the database is almost always the first bottleneck. During the development of **VietSneaker**, a multi-vendor marketplace with catalog search and filtering, recurring queries for hot product catalogs began consuming database connections.

To ensure sub-millisecond response times, I implemented a robust caching tier using **Redis** and **Spring Boot Cache Abstraction**. Here is a practical breakdown of the architecture, serialization choices, and cache stampede protections.

---

## 1. Choosing the Right Caching Pattern: Cache-Aside

For our read-heavy product catalog, we implemented the **Cache-Aside (Lazy-Loading)** pattern:
1. Application queries Redis for the cache key (e.g., \`products:page:1:brand:nike\`).
2. If **Cache Hit**: return the cached payload immediately.
3. If **Cache Miss**: query MySQL via Spring Data JPA, serialize the result into Redis with a defined TTL, and return it.

\`\`\`mermaid
flowchart LR
    Client --> API[Spring Boot Service]
    API -- 1. Query Cache --> Redis[(Redis Cache)]
    Redis -. Hit .-> API
    API -- 2. Miss: Query DB --> MySQL[(MySQL DB)]
    MySQL -. Result .-> API
    API -- 3. Store Cache --> Redis
\`\`\`

---

## 2. Spring Boot Redis Configuration & JSON Serialization

Default Spring Redis templates often use standard Java binary serialization (\`JdkSerializationRedisSerializer\`), which produces opaque byte strings that are unreadable in \`redis-cli\` and sensitive to class versioning.

Instead, we configure **Jackson JSON Serialization**:

\`\`\`java
@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))
            .disableCachingNullValues()
            .serializeKeysWith(
                RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer())
            )
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()
                )
            );
    }
}
\`\`\`

---

## 3. Implementing @Cacheable and Cache Invalidation

Spring's declarative annotations keep our business service clean:

\`\`\`java
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Cacheable(value = "products", key = "#id", unless = "#result == null")
    public ProductResponseDTO getProductById(Long id) {
        return productRepository.findById(id)
            .map(ProductResponseDTO::fromEntity)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    @CacheEvict(value = "products", key = "#id")
    @Transactional
    public ProductResponseDTO updateProduct(Long id, UpdateProductDTO dto) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.updateFromDto(dto);
        Product saved = productRepository.save(product);
        return ProductResponseDTO.fromEntity(saved);
    }
}
\`\`\`

---

## 4. Preventing Cache Stampede & Cache Penetration

### Problem 1: Cache Penetration (Non-existent IDs)
Attackers repeatedly query non-existent IDs (\`id=999999\`), which miss the cache every time and hammer the database.
- **Solution:** Cache null values with a very short TTL (e.g., 60 seconds), or implement a Bloom Filter.

### Problem 2: Cache Stampede (Hot Key Expiration)
When a heavily accessed key expires, hundreds of concurrent threads simultaneously discover a cache miss and query the database at once.
- **Solution:** Use distributed locking with Redis (\`Redisson\` or \`SETNX\` lock) so only one worker recalculates the cache while others wait briefly.

---

## 5. Measured Impact

| Metric | Before Redis | With Redis Cache | Improvement |
| :--- | :--- | :--- | :--- |
| **Catalog Response Time (p95)** | 185 ms | 12 ms | **93.5% reduction** |
| **Database CPU Utilization** | 78% under load | 14% under load | **82% reduction** |
| **Max Concurrent Users** | ~400 req/sec | ~3,200 req/sec | **8x throughput** |

---

## Key Takeaway

Caching is not just adding an annotation. Strategic key naming, choosing clean JSON serialization, setting intelligent TTLs, and having an explicit invalidation strategy are essential to building rock-solid, production-grade backends.`,
  },
  {
    _id: 'post-kafka-docker-microservices',
    title: 'Event-Driven Microservices: Decoupling Chat Workloads with Apache Kafka & Docker',
    slug: 'event-driven-microservices-kafka-docker',
    publishedAt: '2025-01-10T14:00:00Z',
    excerpt:
      'How I architected an asynchronous message streaming pipeline to handle burst chat throughput without bottlenecking relational databases.',
    readingTime: '8 min read',
    tags: ['Kafka', 'Microservices', 'Docker', 'System Design'],
    featured: false,
    content: `When designing real-time systems like chat applications, order execution engines, or notification pipelines, naive synchronous HTTP calls between microservices quickly collapse under load spikes.

If service A synchronously calls service B, and service B writes to a slow relational database, service A's connection pool fills up in seconds.

In this article, I discuss how we decoupled real-time chat message ingestion from persistence using **Apache Kafka**, partition key ordering, and containerized orchestration with **Docker Compose**.

---

## 1. The Architectural Challenge

In our real-time chat architecture:
- Users connect via WebSocket gateways.
- High-velocity messages (thousands of messages per second in active channels) must be broadcasted immediately to connected participants.
- Simultaneously, messages must be persisted, user notifications queued, and search indices updated.

Synchronously inserting every message into PostgreSQL inside the WebSocket loop created severe thread blocking.

---

## 2. Event-Driven Solution Architecture

\`\`\`mermaid
flowchart TD
    Client1[Client WebSocket] --> WS[WebSocket Gateway Service]
    WS -- 1. Emit to Socket.IO Adapter --> Redis[(Redis Pub/Sub)]
    Redis --> WS2[Other Connected Clients]
    WS -- 2. Produce Event (channelId key) --> Kafka[Apache Kafka Cluster]
    Kafka --> CG1[Chat Persistence Consumer]
    Kafka --> CG2[Notification Consumer]
    CG1 --> Postgres[(PostgreSQL Database)]
    CG2 --> PushService[Push Notification Worker]
\`\`\`

By emitting an event to Kafka, the WebSocket Gateway responds in under **3ms**, completely independent of database latency or disk I/O.

---

## 3. Strict FIFO Ordering via Kafka Partition Keys

In chat applications, message ordering matters. If Alice sends *"Hello"* and then *"How are you?"*, Bob must never see them in reverse order.

Kafka guarantees ordering **within a single partition**, but not across multiple partitions in a topic.

To maintain strict ordering:
\`\`\`typescript
await this.kafkaProducer.send({
  topic: 'chat.messages.v1',
  messages: [
    {
      key: message.channelId, // All messages for a given channel hash to the same partition
      value: JSON.stringify({
        messageId: message.id,
        channelId: message.channelId,
        senderId: message.senderId,
        content: message.content,
        timestamp: message.createdAt,
      }),
    },
  ],
});
\`\`\`

By using \`channelId\` as the Kafka message key, Kafka's default murmur2 hash algorithm ensures all messages belonging to the same channel always land on the identical partition and are consumed in exact sequence.

---

## 4. Orchestrating with Docker Compose

Running Kafka locally with Zookeeper (or KRaft mode) alongside multiple microservices can be tedious. We encapsulated the entire topology in Docker Compose:

\`\`\`yaml
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
\`\`\`

---

## 5. Handling Consumer Failures with Dead Letter Queues (DLQ)

What happens if a corrupted message fails JSON parsing or triggers an unrecoverable database constraint in the consumer?

If the consumer crashes without committing its offset, it creates a poison pill loop. To prevent this:
1. Wrap processing in a try/catch.
2. After 3 failed retry attempts with exponential backoff, route the poison message to a **Dead Letter Queue (DLQ)** topic (\`chat.messages.dlq\`).
3. Commit the offset and alert the engineering team.

---

## Summary

Asynchronous event streaming transforms brittle monolithic dependencies into resilient, decoupled microservices. Implementing Kafka with partition-key hashing preserves domain ordering while safeguarding application uptime during massive traffic spikes.`,
  },
]
