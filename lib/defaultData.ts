export interface ProjectItem {
  _id: string
  title: string
  slug: string
  order: number
  subtitle: string
  statusBadge?: string
  mainImage?: any
  imageUrl?: string
  overview?: string[]
  toolsUsed: string[]
  liveDemo?: string
  githubFrontend?: string
  githubBackend?: string
  gallery?: { imageUrl: string; caption?: string }[]
}

export interface ProfileData {
  name: string
  headline: string
  statusText: string
  heroBio: string
  aboutSubtitle: string
  aboutParagraphs: string[]
  skills: string[]
  email: string
  linkedin: string
  github: string
  cvUrl: string
}

export const defaultProfile: ProfileData = {
  name: 'Vi Nguyen',
  headline: 'Hey, My name is Vi Nguyen',
  statusText: 'Open to Internship Opportunities 🟢',
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
  email: 'nducvi.information@gmail.com',
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
    subtitle:
      'A Learning Management System built as a personal project, featuring role-based access, course management, and video content delivery.',
    statusBadge: 'Fullstack LMS 📚',
    imageUrl: '/assets/png/studymate/homepage.png',
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
    subtitle:
      'A second-hand sneaker marketplace built as a team project, with product listings, a basic recommendation system, and an admin panel.',
    statusBadge: 'Spring Boot + AI 👟',
    imageUrl: '/assets/png/vietsneaker/homepage.png',
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
    subtitle:
      'A team university project simulating a metro management system with route tracking, ticketing, and basic monitoring features.',
    statusBadge: 'Biometric AI & Transit 🚇',
    imageUrl: '/assets/png/metrohcmc/homepage.png',
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
    subtitle:
      'A personal project built as a real-time chat application designed with a microservice architecture using NestJS, Next.js, and Apache Kafka.',
    statusBadge: 'Microservices & Kafka 💬',
    imageUrl: '/assets/png/slack/homepage.png',
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
