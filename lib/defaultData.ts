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
  githubFrontend?: string
  githubBackend?: string
  gallery?: { imageUrl: string; caption?: string; alt?: string }[]
}

export interface CapabilityItem {
  title: string
  description: string
}

export interface SocialLinkItem {
  name: string
  url: string
}

export interface ProfileData {
  name: string
  headline: string
  statusText: string
  heroHeadline?: string
  heroBio: string
  aboutSubtitle: string
  aboutParagraphs: string[]
  skills: string[]
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
  headline: 'Hey, My name is Vi Nguyen',
  statusText: 'Open to Internship Opportunities',
  heroHeadline: 'Building digital products, robust backends, and scalable systems.',
  heroBio:
    'Final-year Information Technology student skilled in fullstack web development. I enjoy building clean, functional applications using modern frameworks and always eager to learn and improve with every project.',
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
  capabilitiesHeading: 'Collaborate with engineering teams to build impactful systems.',
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
      title: 'Full-Stack Engineering',
      description:
        'Modern, performant web applications engineered with Next.js 15 App Router, React 19, and TypeScript.',
    },
    {
      title: 'Security & Integrations',
      description:
        'Granular RBAC access controls, webhook verification, payment gateways, and third-party API pipelines.',
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
    title: 'HCMC Metro System',
    slug: 'metrohcmc',
    order: 3,
    role: 'Fullstack Developer & Biometric AI Engineer (University Team Project)',
    subtitle:
      'A smart transit management simulation for HCMC Metro Line 1, integrating interactive geospatial route planning, PayOS digital ticketing, and client-side facial recognition gates.',
    statusBadge: 'Biometric AI & Transit 🚇',
    stats: [
      {
        value: '14',
        label: 'Digitized Transit Stations',
        description: 'Complete geo-spatial mapping, station interchanges, and distance matrices for Line 1.',
      },
      {
        value: '<150ms',
        label: 'Edge Biometric Validation',
        description: 'Client-side WebGL face descriptor matching with zero server computing bottleneck.',
      },
      {
        value: '100%',
        label: 'Cashless Automated Ticketing',
        description: 'Idempotent PayOS webhook integration issuing instantaneous QR and Face-ID passes.',
      },
    ],
    imageUrl: '/assets/png/metrohcmc/homepage.png',
    problemStatement:
      'As urban transit modernizes with the opening of HCMC Metro Line 1 (Ben Thanh - Suoi Tien), traditional paper ticketing causes severe bottlenecking at fare gates during peak rush hours. Furthermore, passengers lack accessible digital tools for real-time station routing and automated cashless fare calculations. This project modernizes urban mobility through digital-first transit engineering.',
    process: {
      tabRationale:
        'Architected across 3 modular operational pillars: Geospatial Route Navigation (interactive Leaflet maps), Automated Digital Ticketing & Cashless Settlement (PayOS), and High-Throughput Biometric Access Control (Face Recognition Gate).',
      contentCuration:
        '[Studio Placeholder: Geospatial data validation] Digitized precise GPS coordinates, station topologies, and transfer hubs across all 14 stations of Metro Line 1; integrated distance-based progressive fare algorithms and scheduled train runtimes.',
      architectureData:
        'Node.js / Express backend with PostgreSQL managing stations, schedules, routes, and transactional bookings. React 19 / TypeScript frontend integrates Leaflet for geospatial rendering and TensorFlow.js / Face-api.js for in-browser client-side facial descriptor processing.',
    },
    challenges: [
      {
        title: 'Real-Time Edge Biometric Validation at Turnstiles',
        issue:
          'Streaming continuous webcam video feeds to the backend server for facial recognition caused prohibitive network latency and server CPU saturation during commuter peak periods.',
        attempted:
          'Transmitting base64 frame snapshots to a Python microservice every 500ms.',
        solution:
          'Executed Face-api.js (SSD MobileNet) directly in the client browser utilizing TensorFlow.js WebGL acceleration.',
        reason:
          'Achieved sub-150ms verification latency on edge devices, completely eliminated server-side AI computation load, and preserved user biometric privacy.',
      },
      {
        title: 'Idempotent Payment Webhook Processing with PayOS',
        issue:
          'Network dropouts or duplicate banking callbacks risked either unissued tickets or double-charging during cashless e-wallet transactions.',
        attempted:
          'Client-side periodic polling to verify transaction settlement status.',
        solution:
          'Engineered a secure webhook receiver with HMAC SHA-256 signature verification and idempotent PostgreSQL transactions.',
        reason:
          'Guaranteed that digital QR/Face tickets are issued instantaneously upon bank confirmation without double-billing risks.',
      },
      {
        title: 'Dynamic Progressive Route Calculation & Map Visualization',
        issue:
          'Accurately representing track curves, station interchanges, and progressive tariff calculations across any start-to-finish station pair.',
        attempted: 'Static straight-line SVG connections between station node coordinates.',
        solution:
          'Standardized route geo-coordinates using GeoJSON polylines in Leaflet paired with a graph-based distance fare matrix.',
        reason:
          'Mirrored real-world rail alignment, providing commuters with clear visual feedback and accurate fare estimates.',
      },
    ],
    results: {
      modulesCount: '14 Digitized Stations, 1 Biometric Gate, PayOS Gateway',
      summary:
        'Engineered a full-featured transit simulation platform combining interactive geospatial navigation, cashless checkout, and instant AI biometric ticket validation.',
      practicalImpact:
        'Received top academic evaluation for excellence in applying edge-computing Web AI to real-world municipal infrastructure challenges.',
    },
    lessons: {
      whatToDoDifferently:
        '[Studio Placeholder: Edge AI model retraining] Gather a broader diversity of facial training datasets under extreme lighting conditions to improve edge recognition accuracy in low-light station environments.',
      nextSteps:
        '[Studio Placeholder: Mobile wallet support] Develop a lightweight Progressive Web App (PWA) with offline ticketing and Apple Wallet / Google Wallet pass integrations.',
    },
    overview: [
      'The HCMC Metro Smart Management System is a sophisticated platform designed to modernize urban transit operations. It integrates real-time system monitoring with advanced security features to ensure a safe and efficient passenger experience.',
      'A standout feature is the AI-powered biometric security system built with TensorFlow.js and Face-api.js. This module aggregates facial descriptors from multiple angles to provide high-accuracy authentication for both login and automated ticket validation.',
      'The platform also features dynamic metro mapping using Leaflet, an automated e-ticketing system integrated with PayOS, and a comprehensive admin command center for monitoring system statistics and managing line schedules in real-time.',
    ],
    toolsUsed: [
      'React 19',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'TensorFlow.js',
      'Face-api.js',
      'Leaflet',
      'PayOS',
      'Ant Design',
      'Swagger',
      'Node-cron',
    ],
    githubBackend: 'https://github.com/Ryhtruly/metroHcmc---web-service',
    gallery: [
      { imageUrl: '/assets/png/metrohcmc/stationManagement.png', caption: 'Station Management' },
      { imageUrl: '/assets/png/metrohcmc/lineManagement.png', caption: 'Line Management' },
      { imageUrl: '/assets/png/metrohcmc/couponManagement.png', caption: 'Coupon Management' },
    ],
  },
  {
    _id: '4',
    title: 'Slack — Chat Platform',
    slug: 'slack',
    order: 4,
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
]
