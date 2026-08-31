// Seed data extracted from Ahmad Raza's resume
// This serves as the initial data AND the JSON storage fallback

export const seedProfile = {
  name: "Ahmad Raza",
  title: "Full-Stack MERN & GenAI Engineer",
  bio: "Full-stack engineer specializing in MERN stack (React 19, Next.js 15, Node.js, Express, MongoDB) and GenAI chatbot automation pipelines. Currently developing production applications at Symtera Technology.",
  aboutText: "Hi! I'm Ahmad Raza, a Full-Stack MERN & GenAI Engineer based in Lahore, Pakistan with a degree in Computer Science (BSCS).\n\nI currently build scalable web platforms and intelligent automation software at Symtera Technology. Over the past 3+ years, I've engineered full-stack applications—ranging from charity portals boosting donations by 50% to real-time e-commerce analytics dashboards and GenAI chatbots.\n\nMy philosophy is simple: write clean, type-safe code, optimize for lightning-fast performance (<1s page loads), and deliver intuitive glassmorphic UIs that convert visitors into active clients. Whether you need a brand-new Web App, a GenAI integration, or a performance overhaul, I bring production-ready expertise to every build.",
  aboutBullets: [
    "BS in Computer Science",
    "MERN Stack Developer at Symtera Technology",
    "GenAI Chatbots & API Automation Specialist",
    "Available for Freelance & Full-Time Engineering Roles"
  ],
  email: "ahmadraza20416@gmail.com",
  phone: "+923079618398",
  location: "Lahore, Punjab, Pakistan",
  avatarUrl: "/images/profile image.jpeg",
  aboutImageUrl: "/images/profile image.jpeg",
  resumeUrl: "/images/Ahmad_Raza_d.pdf",
  availableForWork: true,
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/AhmadRazaCodeBits", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/ahmad-raza416", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com/", icon: "twitter" }
  ],
  seoTitle: "Ahmad Raza | Full-Stack MERN & GenAI Engineer Portfolio",
  seoDescription: "Skilled MERN stack engineer with expertise in building dynamic web applications, Next.js 15, Node.js, and GenAI chatbot integrations.",
  ogImage: "/images/og-image.jpg"
};

export const seedSkills = [
  { name: "JavaScript", iconUrl: "/icons/icon-javscript.svg", order: 1, visible: true },
  { name: "React.js", iconUrl: "/icons/icon-react.svg", order: 2, visible: true },
  { name: "Next.js", iconUrl: "/icons/icon-nextjs.svg", order: 3, visible: true },
  { name: "Node.js", iconUrl: "/icons/icon-nodejs.svg", order: 4, visible: true },
  { name: "Express.js", iconUrl: "/icons/icon-express.svg", order: 5, visible: true },
  { name: "MongoDB", iconUrl: "/icons/icon-mongodb.svg", order: 6, visible: true },
  { name: "TypeScript", iconUrl: "/icons/icon-typescript.svg", order: 7, visible: true },
  { name: "Tailwind CSS", iconUrl: "/icons/icon-tailwindcss.svg", order: 8, visible: true },
  { name: "PostgreSQL", iconUrl: "/icons/icon-postgresql.svg", order: 9, visible: true },
  { name: "Git", iconUrl: "/icons/icon-git.svg", order: 10, visible: true },
  { name: "Figma", iconUrl: "/icons/icon-figma.svg", order: 11, visible: true },
  { name: "Sass", iconUrl: "/icons/icon-sass.svg", order: 12, visible: true },
];

export const seedExperience = [
  {
    company: "Symtera Technology",
    companyLogo: "",
    role: "MERN Stack Developer",
    startDate: "Feb 2026",
    endDate: "Present",
    location: "Lahore",
    description: [
      "Develop and maintain scalable front-end and back-end solutions for production applications.",
      "Write clean, efficient, and reusable code for real-world projects.",
      "Collaborate with team members to deliver high-quality software on deadline."
    ],
    order: 1,
    visible: true
  },
  {
    company: "Tiers Limited",
    companyLogo: "",
    role: "MERN Stack Internee",
    startDate: "May 2023",
    endDate: "Aug 2023",
    location: "Lahore",
    description: [
      "Developed MERN stack (MongoDB, Express.js, React.js, Node.js) web applications.",
      "Applied user-centered design principles to improve UX across multiple projects."
    ],
    order: 2,
    visible: true
  }
];

export const seedProjects = [
  {
    title: "GenAI Tools Directory & Hub",
    description: "All-in-one directory and productivity platform featuring dynamic AI search, custom bookmarking, live tech news feed, and system health monitoring telemetry.",
    category: "AI & Automation",
    techStack: ["Next.js 15", "TypeScript", "Prisma", "MongoDB", "Tailwind CSS"],
    imageUrl: "/images/projects/genai-tools.png",
    githubUrl: "https://github.com/ahmadraza20416/gen-ai-tools",
    liveUrl: "https://gen-ai-tools-lake.vercel.app",
    features: [
      "Dynamic real-time search & categorized directory",
      "User tool bookmarking and preference tracking",
      "Automated link health verification background cron",
      "System telemetry and storage diagnostics dashboard"
    ],
    order: 1,
    visible: true
  },
  {
    title: "EdgeRAG - In-Browser AI Search Engine",
    description: "Client-side private document retrieval and embedding engine running Transformers.js and ONNX runtime directly in the browser without sending data to external servers.",
    category: "AI & Automation",
    techStack: ["Vite", "React", "Transformers.js", "ONNX", "Tailwind CSS"],
    imageUrl: "/images/projects/edgerag.png",
    githubUrl: "https://github.com/ahmadraza20416/edgerag",
    liveUrl: "https://ml-tau-one.vercel.app",
    features: [
      "Zero server cost local vector embeddings",
      "Real-time semantic document search in browser",
      "Hardware-accelerated ONNX runtime inference",
      "Responsive interactive query visualizer"
    ],
    order: 2,
    visible: true
  },
  {
    title: "HuntForge AI Decision Platform",
    description: "Autonomous career intelligence and outreach platform featuring AI lead scoring, ATS resume optimization, pitch generation, and multi-channel cadence sequences.",
    category: "AI & Automation",
    techStack: ["Next.js 14", "TypeScript", "OpenAI API", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/images/projects/huntforge.png",
    githubUrl: "https://github.com/ahmadraza20416/huntforge-ai",
    liveUrl: "https://huntforge-ai.vercel.app",
    features: [
      "Multi-source job scraper & lead scoring engine",
      "Automated custom pitch and sequence generator",
      "ATS compatibility analysis and optimization",
      "Lead export and CRM tracking interface"
    ],
    order: 3,
    visible: true
  },
  {
    title: "DropIn - Spatial Social Hangout",
    description: "Real-time interactive social space featuring proximity-based audio/chat radar, group venue voting, live location sharing, and WebRTC streaming.",
    category: "Full Stack",
    techStack: ["Next.js 14", "WebRTC", "MongoDB", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/images/projects/dropin.png",
    githubUrl: "https://github.com/ahmadraza20416/dropin-social",
    liveUrl: "https://dropin-social.vercel.app",
    features: [
      "Proximity-based discovery & live radar interface",
      "WebRTC audio calls and group signal coordination",
      "Venue polling & collaborative hangout planning",
      "Comprehensive administration & user moderation panel"
    ],
    order: 4,
    visible: true
  },
  {
    title: "MGS - Madni General Store",
    description: "Enterprise multi-vendor retail & grocery platform featuring real-time POS, vendor assortment management, automated inventory tracking, and mobile apps.",
    category: "Full Stack",
    techStack: ["Next.js 16", "Node.js", "Express", "MongoDB", "React Native"],
    imageUrl: "/images/projects/mgs.png",
    githubUrl: "https://github.com/ahmadraza20416/MGS-Madni-gernel-store",
    liveUrl: "https://madnigs.vercel.app",
    features: [
      "Omnichannel e-commerce with Next.js Turbopack storefront",
      "Admin POS and vendor cashbook accounting",
      "Expiry date alerts and automated inventory restocking",
      "Cross-platform Expo/React Native mobile client"
    ],
    order: 5,
    visible: true
  },
  {
    title: "SlideEdge - AI Presentation Generator",
    description: "Interactive slide creation platform with real-time dnd-kit deck reordering, automated slide formatting, and presentation exports.",
    category: "Web Apps",
    techStack: ["Vite", "React 19", "Express", "DND Kit", "Tailwind CSS"],
    imageUrl: "/images/projects/slideedge.png",
    githubUrl: "https://github.com/ahmadraza20416/presentation-generator",
    liveUrl: "https://slideedge-client.vercel.app",
    features: [
      "Drag-and-drop slide layout customization",
      "Automated theme and visual styling templates",
      "Exportable presentation decks and slide bundles",
      "Optimized React 19 client with sub-second renders"
    ],
    order: 6,
    visible: true
  },
  {
    title: "Ninja HRMS & Payroll Management",
    description: "Enterprise HR management platform featuring employee lifecycle management, onboarding wizards, attendance tracking, leave workflows, and payroll boards.",
    category: "Full Stack",
    techStack: ["Turborepo", "Vite React", "Fastify", "Redux Toolkit", "Material UI"],
    imageUrl: "/images/projects/ninja-hr.png",
    githubUrl: "https://github.com/ahmadraza20416/ninja-hr",
    liveUrl: "https://ninja-hr-web.vercel.app",
    features: [
      "Employee Self-Service (ESS) workspace",
      "Automated payroll calculation and payslip generation",
      "Leave approval workflows and attendance tracking",
      "Fastify high-throughput modular backend"
    ],
    order: 7,
    visible: true
  },
  {
    title: "Next Expense & Khatta Ledger Tracker",
    description: "Personal finance and collaborative Khatta ledger tracking app with spending trend charts, budget pacing gauges, and debt settlement records.",
    category: "Web Apps",
    techStack: ["Next.js 14", "MongoDB", "Recharts", "Zustand", "Tailwind CSS"],
    imageUrl: "/images/projects/expense-tracker.png",
    githubUrl: "https://github.com/ahmadraza20416/expense-tracker",
    liveUrl: "https://next-expense-tracker-tau-roan.vercel.app",
    features: [
      "Real-time budget pacing & burn rate analytics",
      "Khatta ledger with individual balance tracking",
      "Interactive category breakdown & history filters",
      "Lightweight state management via Zustand"
    ],
    order: 8,
    visible: true
  },
  {
    title: "Duocam - Dual-Camera Gesture Suite",
    description: "Advanced dual-camera capture, hand gesture tracking, real-time media layer compositing, and visual effect filters.",
    category: "Web Apps",
    techStack: ["Vite", "React", "MediaPipe", "Canvas API", "Tailwind CSS"],
    imageUrl: "/images/projects/duocam.png",
    githubUrl: "https://github.com/ahmadraza20416/duocam",
    liveUrl: "https://duocam-web.vercel.app",
    features: [
      "Simultaneous front/rear dual-camera streaming",
      "Hand landmark tracking and gesture classification",
      "Real-time canvas shader filters and recording",
      "Client-side video frame encoding and export"
    ],
    order: 9,
    visible: true
  },
  {
    title: "Aegis - Voice Security & Triage Copilot",
    description: "Ultra-low-latency real-time voice triage agent with AssemblyAI streaming STT, multi-agent dispatch coordination, and telemetry dashboards.",
    category: "AI & Automation",
    techStack: ["Python", "FastAPI", "AssemblyAI", "Groq", "SQLite"],
    imageUrl: "/images/projects/aegis-voice.png",
    githubUrl: "https://github.com/ahmadraza20416/labab-aegis-voice-agent",
    liveUrl: "https://labab-voice-agent.vercel.app",
    features: [
      "Sub-300ms streaming speech-to-text with AssemblyAI",
      "Multi-agent emergency triage & severity classifier",
      "Automated unit dispatch and ETA calculation",
      "Live interactive visualizer and audio player"
    ],
    order: 10,
    visible: true
  },
  {
    title: "Aerodroid - Android Desktop Emulator",
    description: "Modern Android virtualization manager and emulator built with C# .NET 8 WPF, multi-core acceleration, and keymapping support.",
    category: "Full Stack",
    techStack: ["C# .NET 8", "WPF", "Android SDK", "PowerShell"],
    imageUrl: "/images/projects/aerodroid.png",
    githubUrl: "https://github.com/ahmadraza20416/Aerodroid",
    liveUrl: "https://aerodroid-web.vercel.app",
    features: [
      "Hardware-accelerated Android AVD lifecycle management",
      "Custom macro recorder and keymapping engine",
      "Automated SDK installer and environment doctor",
      "Fast native WPF interface with dark theme"
    ],
    order: 11,
    visible: true
  },
  {
    title: "Alpaca AI Quantitative Trading Agent",
    description: "Algorithmic trading bot with multi-timeframe volatility engines, Monte Carlo risk simulation, gamma exposure filters, and Model Context Protocol (MCP) server.",
    category: "AI & Automation",
    techStack: ["Python", "Alpaca API", "MCP Protocol", "Pandas", "NumPy"],
    imageUrl: "/images/projects/alpaca-trading.png",
    githubUrl: "https://github.com/ahmadraza20416/labab-alpaca-trading-agent",
    liveUrl: "https://github.com/ahmadraza20416/labab-alpaca-trading-agent",
    features: [
      "Multi-timeframe momentum and volatility skew analysis",
      "Monte Carlo simulation & automated delta hedging",
      "MCP protocol server for autonomous AI interaction",
      "Real-time position tracking and profit guardian"
    ],
    order: 12,
    visible: true
  },
  {
    title: "AutoJobApplyBot - Autonomous Career Agent",
    description: "End-to-end automated job hunting platform with ATS resume parser, LinkedIn feed scrapers, intelligent scoring, and candidate CRM dashboard.",
    category: "AI & Automation",
    techStack: ["Python", "Flask", "Vite React", "Gemini AI", "Tailwind CSS"],
    imageUrl: "/images/projects/autojobapply.png",
    githubUrl: "https://github.com/ahmadraza20416/auto-job-apply-bot",
    liveUrl: "https://autojobapplybot-web.vercel.app",
    features: [
      "Automated LinkedIn & career board job scraper",
      "Gemini AI resume match scoring and tailoring",
      "Application review queue and status CRM",
      "Interactive React dashboard with live scheduler"
    ],
    order: 13,
    visible: true
  }
];

export const seedTestimonials = [
  {
    name: "Ali Hassan",
    role: "Project Manager",
    company: "Symtera Technology",
    avatarUrl: "",
    text: "Ahmad is an exceptional developer who consistently delivers high-quality code. His attention to detail and ability to solve complex problems make him an invaluable team member.",
    order: 1,
    visible: true
  },
  {
    name: "Sarah Khan",
    role: "UI/UX Designer",
    company: "Freelance Client",
    avatarUrl: "",
    text: "Working with Ahmad was a fantastic experience. He translated my designs into pixel-perfect, responsive web applications with smooth animations and excellent performance.",
    order: 2,
    visible: true
  },
  {
    name: "Usman Ahmed",
    role: "CEO",
    company: "Tech Startup",
    avatarUrl: "",
    text: "Ahmad built our entire web platform from scratch. His expertise in the MERN stack and his commitment to writing clean, maintainable code exceeded our expectations.",
    order: 3,
    visible: true
  }
];

export const seedNavItems = [
  { label: "Experience", href: "#experience", order: 1, visible: true },
  { label: "Projects", href: "#projects", order: 2, visible: true },
  { label: "Skills", href: "#skills", order: 3, visible: true },
  { label: "Services", href: "#services", order: 4, visible: true },
  { label: "About", href: "#about", order: 5, visible: true },
  { label: "Contact", href: "#contact", order: 6, visible: true },
];

export const seedChatbotResponses = {
  greeting: "Hi! 👋 I'm Ahmad's portfolio assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
  skills: "Ahmad is proficient in: JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, PostgreSQL, Fastify, Python, FastAPI, WebRTC, and AI/LLM integration.",
  experience: "Ahmad currently works as a MERN Stack Developer at Symtera Technology, Lahore (since Feb 2026). Previously, he interned at Tiers Limited (May-Aug 2023) where he built MERN stack web applications.",
  projects: "Ahmad has built an extensive suite of production projects including:\n• GenAI Tools Directory & Platform (Next.js 15, Prisma, MongoDB)\n• EdgeRAG In-Browser Vector Engine (Transformers.js, ONNX)\n• HuntForge AI Career Decision Platform\n• DropIn Real-time Proximity Social Space\n• MGS Madni General Store (Omnichannel E-commerce)\n• SlideEdge AI Presentation Generator\n• Ninja HR & Payroll Management System\n• Next Expense & Khatta Ledger Tracker\n• Aegis Real-Time Voice Triage AI Agent\n• Aerodroid Android Desktop Emulator\n• Alpaca AI Quantitative Trading Agent\n• AutoJobApplyBot Career Copilot\nCheck out the Selected Work section to test live demos!",
  education: "Ahmad holds a BS in Computer Science from the University of Engineering and Technology, Lahore (2020-2024).",
  contact: "You can reach Ahmad at:\n📧 ahmadraza20416@gmail.com\n📱 +923079618398\n💼 linkedin.com/in/ahmad-raza416\n🐙 github.com/ahmadraza20416",
  hire: "Ahmad is currently available for freelance work and new opportunities! Feel free to reach out via the contact form or email at ahmadraza20416@gmail.com",
  location: "Ahmad is based in Lahore, Punjab, Pakistan.",
  fallback: "I'm not sure about that. Try asking about Ahmad's skills, experience, projects, education, or contact information!"
};
