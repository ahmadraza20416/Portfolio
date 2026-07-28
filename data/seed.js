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
    title: "Humanity Edge Portal",
    description: "Built a full-stack MERN charity website with volunteer management, campaigns, secure payments, and a comprehensive admin panel. Boosted donor engagement via blogs and videos, resulting in +50% donations and +30% volunteer retention.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Stripe"],
    imageUrl: "/images/project-1.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 1,
    visible: true
  },
  {
    title: "Ecommerce Website",
    description: "Built a MERN stack e-commerce website with authentication, product listings, cart, and secure payments. Improved UX with responsive design and performance optimization, boosting engagement and sales.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Redux"],
    imageUrl: "/images/project-2.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 2,
    visible: true
  },
  {
    title: "Attendance App",
    description: "Developed a MERN-based student management system with full admin CRUD functionality. Enabled student login via admin-provided credentials and attendance tracking with check-in/check-out functionality.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js"],
    imageUrl: "/images/project-3.jpg",
    githubUrl: "https://github.com/AhmadRazaCodeBits",
    liveUrl: "#",
    order: 3,
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
  skills: "Ahmad is proficient in: JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, PostgreSQL, Git, Figma, and Sass. He specializes in the MERN stack for full-stack web development.",
  experience: "Ahmad currently works as a MERN Stack Developer at Symtera Technology, Lahore (since Feb 2026). Previously, he interned at Tiers Limited (May-Aug 2023) where he built MERN stack web applications.",
  projects: "Ahmad has built several notable projects:\n• Humanity Edge Portal - A charity platform with +50% donation increase\n• Ecommerce Website - Full-featured online store\n• Attendance App - Student management system\nCheck out the Work section for more details!",
  education: "Ahmad holds a BS in Computer Science from the University of Engineering and Technology, Lahore (2020-2024).",
  contact: "You can reach Ahmad at:\n📧 ahmadraza20416@gmail.com\n📱 +923079618398\n💼 linkedin.com/in/ahmad-raza416\n🐙 github.com/AhmadRazaCodeBits",
  hire: "Ahmad is currently available for freelance work and new opportunities! Feel free to reach out via the contact form or email at ahmadraza20416@gmail.com",
  location: "Ahmad is based in Lahore, Punjab, Pakistan.",
  fallback: "I'm not sure about that. Try asking about Ahmad's skills, experience, projects, education, or contact information!"
};
