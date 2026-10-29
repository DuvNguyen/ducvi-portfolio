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
  linkedin: 'https://linkedin.com/in/nducviinformation/',
  github: 'https://github.com/DuvNguyen',
  cvUrl: '/assets/cv.pdf',
}

export const defaultProjects: ProjectItem[] = [
  {
    _id: 'java-hub',
    title: 'Java Learning Hub — Platform Tự Học Java',
    slug: 'java-learning-hub',
    order: 1,
    role: 'Một mình làm toàn bộ (Solo Fullstack Developer)',
    subtitle:
      'Web tự build để học Java có lộ trình bài bản gồm 4 tab (DSA, OOP, System Design, Spring Boot), tích hợp nguồn kiểm chứng uy tín và theo dõi tiến độ.',
    statusBadge: 'Personal Project ☕',
    imageUrl: '/assets/png/javahub/homepage.png',
    toolsUsed: [
      'Java',
      'Spring Boot',
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Markdown / MDX',
    ],
    liveDemo: 'https://vinguyen.id.vn',
    githubBackend: 'https://github.com/DuvNguyen/java-learning-hub',
    problemStatement:
      'Tự học Java dễ lan man, nội dung rải rác trên nhiều diễn đàn/blog khác nhau, khó biết nguồn nào đáng tin. Bạn cần một nơi gom nội dung có lộ trình và có nguồn kiểm chứng minh bạch (NeetCode 150, roadmap.sh...).',
    process: {
      tabRationale:
        'Hệ thống chia làm 4 tab trụ cột theo tiêu chí phễu năng lực kỹ sư: (1) DSA rèn luyện thuật toán & tư duy tối ưu; (2) OOP củng cố thiết kế hướng đối tượng & Design Patterns kinh điển; (3) System Design mở rộng góc nhìn kiến trúc phân tán & chịu tải; (4) Spring Boot vận dụng toàn bộ nền tảng vào xây dựng REST API & Microservices thực tế.',
      contentCuration:
        'Chắt lọc và đối chiếu từ các nguồn chuẩn mực uy tín quốc tế: Danh mục thuật toán bám sát NeetCode 150 & LeetCode patterns; Lộ trình backend tham chiếu roadmap.sh; Kiến trúc OOP tham chiếu sách Effective Java; Best practices Spring Boot đúc kết từ VMware docs & Baeldung.',
      architectureData:
        'Nội dung được tổ chức dưới dạng cấu trúc Markdown / JSON phân cấp (Module → Category → Topic → Practice). Phía frontend sử dụng Next.js kết hợp cơ chế Static Site Generation (SSG) và Server-Side Rendering (SSR) để render bài học tức thì với cú pháp code highlight chuẩn mực, tối ưu hóa SEO và thời gian tải trang < 0.5s.',
    },
    challenges: [
      {
        title: 'Tổ chức dữ liệu bài học dễ mở rộng khi số lượng bài tăng cao',
        issue: 'Khi số lượng bài học và ghi chú tăng lên hàng chục module, việc lưu cứng dữ liệu khiến việc thêm mới, lọc bài và quản lý phiên bản trở nên rối rắm.',
        attempted: 'Thử lưu toàn bộ vào một file JSON khổng lồ duy nhất; nhưng file nhanh chóng bị phình to, khó quản lý xung đột git và khó tái sử dụng.',
        solution: 'Chuyển sang mô hình Content Schema phân cấp theo Module/Topic kết hợp Headless CMS (hoặc dynamic MDX parser có frontmatter metadata).',
        reason: 'Tách biệt hoàn toàn giữa tầng dữ liệu và tầng hiển thị (decoupling), dễ dàng CRUD bài học mới mà không cần rebuild lại toàn bộ code logic, hỗ trợ tìm kiếm nhanh theo tag.',
      },
      {
        title: 'Theo dõi tiến độ học thực tế (Progress Tracking) không phụ thuộc đăng nhập',
        issue: 'Cần một cơ chế ghi nhận người học đã hoàn thành bài nào, đang làm dở bài nào mà không bắt buộc phải tạo tài khoản rườm rà ngay từ đầu.',
        attempted: 'Thử bắt buộc đăng nhập tài khoản ngay khi vào web, nhưng nhận thấy tỉ lệ rời bỏ trang cao và tạo cảm giác nặng nề cho người vào học nhanh.',
        solution: 'Tích hợp Hybrid Storage: mặc định lưu tiến độ vào LocalStorage / IndexedDB trên trình duyệt client, hỗ trợ xuất/đồng bộ lên Cloud khi người dùng muốn lưu lâu dài.',
        reason: 'Đem lại trải nghiệm mượt mà tức thì (zero-friction), người học vào là đánh dấu tick hoàn thành ngay, không lo mất dữ liệu bài học khi đóng tab.',
      },
      {
        title: 'Quản lý trạng thái và chuyển đổi mượt mà giữa 4 tab lớn',
        issue: 'Khi chuyển đổi qua lại giữa 4 tab (DSA, OOP, System Design, Spring Boot), trang bị giật hoặc mất vị trí cuộn đang đọc dở.',
        attempted: 'Thử tải lại route mỗi lần bấm chuyển tab; khiến tốc độ phản hồi chậm và mất trạng thái bộ lọc.',
        solution: 'Sử dụng Next.js URL query state (?tab=dsa) đồng bộ với React State và cache client-side.',
        reason: 'Cho phép người dùng bookmark hoặc chia sẻ link trực tiếp đến đúng tab/bài học, chuyển tab ngay lập tức trong 0ms mà không reload trang.',
      },
    ],
    results: {
      summary:
        'Xây dựng thành công nền tảng học tập trực quan, cá nhân hóa cao và vận hành ổn định trên môi trường thực tế.',
      modulesCount: '4 Trụ cột chính, 24+ Chuyên đề, 150+ Bài tập & Ghi chú kiến trúc',
      practicalImpact:
        'Trở thành single source of truth trong quá trình tự học Java; giúp tiết kiệm 40% thời gian tìm kiếm tài liệu rải rác và hoàn thành 100% mục tiêu kiến thức nền tảng trước các đợt phỏng vấn.',
    },
    lessons: {
      whatToDoDifferently:
        'Nếu làm lại từ đầu, sẽ thiết kế hệ thống tag liên kết chéo (cross-linking tags) ngay từ ngày đầu — ví dụ một bài tập DSA trong tab DSA có thể gắn link trực tiếp đến Design Pattern tương ứng ở tab OOP và ứng dụng trong Spring Boot.',
      nextSteps:
        'Tích hợp tính năng Interactive Code Playground để chạy thử các snippet Java cơ bản trực tiếp trên trình duyệt, và bổ sung biểu đồ Radar Chart hiển thị độ bao phủ kiến thức cá nhân theo thời gian thực.',
    },
    gallery: [
      { imageUrl: '/assets/png/javahub/homepage.png', caption: 'Tổng quan nền tảng & 4 Tab chuyên đề' },
      { imageUrl: '/assets/png/javahub/dsa-tab.png', caption: 'Tab DSA — Lộ trình thuật toán NeetCode 150' },
      { imageUrl: '/assets/png/javahub/oop-tab.png', caption: 'Tab OOP & System Design — Kiến trúc & Patterns' },
      { imageUrl: '/assets/png/javahub/spring-boot-tab.png', caption: 'Tab Spring Boot — Thực hành dự án thực tế' },
    ],
    overview: [
      'Java Learning Hub là nền tảng web tự build để chuẩn hóa toàn bộ quá trình tự học Java, giải quyết triệt để vấn đề kiến thức lan man, phân tán bằng cách gom về 4 tab chuyên sâu: DSA, OOP, System Design, và Spring Boot.',
      'Dự án được xây dựng toàn bộ bởi một người (Solo Fullstack), từ khâu thiết kế giao diện, kiến trúc dữ liệu, kiểm chứng nguồn tin từ NeetCode 150 & roadmap.sh, đến việc tối ưu hóa hiệu năng render bài học.',
    ],
  },
  {
    _id: '1',
    title: 'StudyMate — LMS',
    slug: 'studymate',
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
