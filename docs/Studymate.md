
# GITHUB LINK: 
## backend: https://github.com/DuvNguyen/studymate_backend
## front-end: https://github.com/DuvNguyen/studymate_frontend


# 1. Backend
Based on my exploration of the repository, StudyMate is a robust and feature-rich Learning Management System (LMS). It implements complex business logic like multi-role access control, E-commerce, financial ledgers, and third-party integrations.

Here are a few options for how you can describe this project on your CV. You can adjust the bullet points based on the specific areas you contributed to most!

### Option 1: Detailed & Impact-focused (Recommended)

**StudyMate - Learning Management System (LMS)** | _Backend Engineer_ _Technologies: Node.js, TypeScript, NestJS, PostgreSQL, TypeORM, Clerk, Cloudinary, YouTube API_

- Engineered a scalable RESTful API backend for a comprehensive E-Learning platform using **NestJS** and **TypeScript**, strictly adhering to Layered Architecture and SOLID principles.
- Implemented secure authentication and Role-Based Access Control (RBAC) using **Clerk**, managing complex permissions across Students, Instructors, Staff, and Admins.
- Integrated real-time user synchronization via Webhooks using **Svix** to maintain data consistency between the identity provider and the local database.
- Architected a robust **PostgreSQL** database using **TypeORM**, optimizing queries for complex relationships including multi-tier course structures, quizzes, and lesson progress tracking.
- Developed a complete E-commerce and financial module supporting shopping carts, order processing, enrollments, discount coupons, and an internal wallet/payout system for instructors.
- Built an instructor onboarding workflow with a KYC (Know Your Customer) document verification system and course approval processes.
- Integrated **Cloudinary** for scalable media storage and the **YouTube Data API v3** for optimized, centralized video content delivery.
- Ensured high application security and reliability by implementing rate limiting (Throttler), data validation (DTOs/class-validator), and Helmet.

---

### Option 2: Concise (If you have limited space)

**StudyMate (LMS Platform)** | _Backend Engineer_ _Technologies: NestJS, TypeScript, PostgreSQL, TypeORM, Clerk, Cloudinary_

- Developed a scalable backend for a multi-role E-learning platform using **NestJS**, **TypeScript**, and **PostgreSQL**.
- Integrated **Clerk Auth** and **Svix Webhooks** for secure authentication, real-time user synchronization, and Role-Based Access Control (RBAC).
- Built an E-commerce engine handling course enrollments, shopping carts, orders, and an internal financial wallet for instructor payouts.
- Implemented complex business workflows including Instructor KYC verification, course approval pipelines, and lesson progress tracking.
- Managed seamless third-party media integrations using **Cloudinary** for file uploads and the **YouTube Data API** for video hosting.

---

### Option 3: Highlight by Domain (Good for showcasing specific skills)

**StudyMate (LMS)** | _Backend Developer_ **Tech Stack**: NestJS, TypeScript, PostgreSQL, TypeORM, Clerk Auth

- **System Architecture**: Designed a maintainable API using NestJS layered architecture (Controllers, Services, Repositories) with comprehensive DTO validation.
- **Security & Auth**: Integrated Clerk for JWT-based authentication and built a custom RBAC guard to secure endpoints for different user types (Admin, Staff, Instructor, Student).
- **Database Design**: Structured relational schemas in PostgreSQL via TypeORM to handle courses, sections, lessons, quizzes, and multi-layered category trees.
- **E-Commerce & Finance**: Developed modules for course purchasing (Cart, Orders, Coupons) and an instructor ledger system (Wallets, Payouts).
- **Integrations**: Connected Cloudinary for dynamic asset management and YouTube Data API for video streaming capabilities.

Let me know if you would like me to adjust any of the bullet points to better match your exact contributions, or if you need any other details!




# 2. Front-end:
Based on my analysis of the `studymate-frontend` repository, here is a professional CV project description written entirely in English. I have highlighted the key technologies, architectural patterns, and features I found in the codebase. You can adjust the bullet points based on what you want to emphasize the most.

### Option 1: Comprehensive & Full-Stack/Architecture Focus

_(Use this if you want to highlight the complexity of the project and your ability to handle business logic and role-based systems)_

**StudyMate – Learning Management System (LMS)** | _Frontend Web Developer_ **Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Clerk (Auth), Axios, Recharts

- **Role-Based Architecture:** Engineered a scalable Next.js App Router architecture supporting distinct, personalized dashboards and complex workflows for Students, Instructors, and Administrators.
- **Authentication & Security:** Integrated Clerk for secure authentication and seamless user onboarding, including implementing a multi-step KYC (Know Your Customer) verification flow for instructors.
- **E-Commerce & Financial Systems:** Developed the end-to-end purchasing flow including shopping cart, checkout, coupon application, and refund requests. Built a comprehensive virtual wallet system allowing instructors to track earnings, view transaction histories, and request payouts, alongside an admin reconciliation module.
- **Interactive Learning Experience:** Implemented a unified video player component handling both YouTube and CDN-hosted content, coupled with real-time lesson progress tracking and interactive course discussion forums.
- **State Management & Performance:** Designed highly reusable custom React hooks (e.g., `useWallet`, `useCourses`, `useVideos`) to optimize client-side data fetching, state management, and implement an instant search system with URL parameter synchronization.
- **Modern UI/UX:** Built a highly responsive, Neo-Brutalist user interface from scratch using Tailwind CSS 4, delivering a unique visual experience with dynamic interactive elements and data visualizations (Recharts) for the admin analytics dashboard.

---

### Option 2: UI/UX & Frontend Optimization Focus

_(Use this if you want to emphasize your skills in modern UI development, performance, and user experience)_

**StudyMate – Learning Management System (LMS)** | _Frontend Developer_ **Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Custom Hooks

- **Modern Interface Design:** Spearheaded the development of a unique Neo-Brutalist frontend using Tailwind CSS 4, focusing on visual excellence, rich micro-animations, and responsive layouts across all devices.
- **High-Performance Search:** Implemented an instant-search and multi-tier category filtering system using custom debounced hooks, providing users with immediate feedback and seamless URL state synchronization.
- **Optimized Video Streaming:** Created a `UnifiedVideoPlayer` component to dynamically render and optimize multimedia content from various sources (YouTube, CDN), ensuring a smooth learning experience for students.
- **Advanced State Management:** Architected a suite of custom React hooks to handle complex application states, including real-time notifications, shopping cart persistence, and user progress tracking without relying on heavy third-party state libraries.
- **Interactive Dashboards:** Developed specialized, data-rich dashboards for different user personas (Students, Instructors, Admins), utilizing React Server Components and Recharts to render performance analytics and financial ledgers efficiently.

---

### Option 3: Concise Version

_(Use this if you have limited space on your CV)_

**StudyMate – Learning Management System** | _Frontend Developer_ _Next.js, React, TypeScript, Tailwind CSS, Clerk_

- Developed a modern LMS platform featuring complex role-based routing (Admin, Instructor, Student) using Next.js App Router and React 19.
- Built an end-to-end e-commerce flow and custom financial wallet system for instructors to manage earnings and payouts.
- Implemented secure authentication and a custom KYC verification process using Clerk.
- Engineered a high-performance UI featuring a Neo-Brutalist design, instant search, and unified video streaming capabilities.

---

**Tips for your CV:**

- **Metrics:** If you have any concrete numbers (e.g., _"reduced load time by X%"_, _"served X concurrent users"_, _"integrated Y API endpoints"_), definitely add them to these bullet points!
- **Tailoring:** Choose the bullet points that best match the job description you are applying for.

