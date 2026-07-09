// ============================================================
// portfolioData.js — Centralized configuration for Mohamed Yunus's Portfolio
// All external links, personal info, assets, projects, certificates,
// skills, education, experience, and contact content are managed here.
// Update this file to change content across the entire portfolio.
// ============================================================

export const personalInfo = {
  name: "MOHAMED YUNUS A",
  firstName: "Mohamed Yunus",
  brandName: "Mohamed Yunus",
  title: "AI & Data Science Student | Full Stack Developer",
  location: "Perambalur, Tamil Nadu",
  phone: "+91 9360461743",
  emails: {
    primary: "mohamedyunus.f5coders@gmail.com",
    secondary: "mohamedyunus.f5coders@gmail.com",
  },
  summary:
    "AI & Data Science Engineering student with experience in building AI-powered and full-stack applications. Skilled in Python, Machine Learning, TensorFlow Lite, PHP, JavaScript, SQL, and cloud-based deployments. Experienced in developing ERP systems, digital twin solutions, voice-based mobile applications, and real-time analytics dashboards. Passionate about scalable, secure, and performance-driven software development.",
  resumeUrl: "/Yunus_resume.pdf",
};

export const socialLinks = {
  github: "#",
  linkedin: "#",
  instagram: "#",
};

export const heroContent = {
  greeting: "Hi, I'm Mohamed Yunus",
  titleHighlight: "AI & Full Stack Developer",
  subtitle:
    "I build AI-powered applications, ERP systems, full-stack websites, dashboards, automation workflows, and real-time business solutions.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: {
    text: "Contact Me",
    href: "mailto:mohamedyunus.f5coders@gmail.com?subject=Portfolio Inquiry – Mohamed Yunus",
  },
  ctaResume: { text: "Download Resume", href: "/Yunus_resume.pdf" },
};

export const aboutContent = {
  heading: "About Me",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Mohamed Yunus A</span>. I am an AI & Data Science Engineering student from Perambalur, Tamil Nadu. I have experience in building AI-powered applications, full-stack websites, ERP systems, digital twin solutions, voice-based mobile applications, and real-time analytics dashboards.`,
  techStack: [
    "Python",
    "PHP",
    "JavaScript",
    "Machine Learning",
    "TensorFlow Lite",
    "SQL",
    "MySQL",
    "MongoDB",
    "React.js",
    "Chart.js",
    "Firebase",
    "AWS",
    "Git",
    "GitHub",
    "VS Code",
    "Hostinger",
    "n8n",
    "Make",
  ],
};

export const skillsContent = {
  badge: "My Process",
  heading: "Here's how I turn ideas into real-world digital products",
  description:
    "I follow a structured, practical, and business-focused development process to convert ideas into responsive websites, ERP dashboards, automation systems, and AI-powered solutions.",
  cards: [
    {
      number: "01",
      title: "Research",
      text: "I begin by understanding the business goal, user problem, workflow, required features, and technical constraints before planning the solution.",
    },
    {
      number: "02",
      title: "Design",
      text: "I create clean layouts, user-friendly interfaces, structured data flows, and simple user journeys that make the product easy to use.",
    },
    {
      number: "03",
      title: "Develop",
      text: "I build responsive frontends, functional backends, database logic, dashboards, automation flows, and integrations using the right tech stack.",
    },
    {
      number: "04",
      title: "Deploy",
      text: "I test, optimize, fix errors, deploy the project, verify links, check responsiveness, and make the final product production-ready.",
    },
  ],
  endText: "Ready to build!",
};

export const technicalSkills = {
  categories: [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 58 },
        { name: "PHP", level: 56 },
        { name: "JavaScript", level: 54 },
        { name: "SQL", level: 52 },
      ],
    },
    {
      title: "Frontend Technologies",
      skills: [
        { name: "HTML5", level: 60 },
        { name: "CSS3", level: 56 },
        { name: "JavaScript", level: 54 },
        { name: "React.js", level: 48 },
        { name: "Chart.js", level: 46 },
      ],
    },
    {
      title: "Backend Technologies",
      skills: [
        { name: "PHP", level: 56 },
        { name: "Authentication Systems", level: 50 },
        { name: "Session Management", level: 48 },
        { name: "CRUD Operations", level: 55 },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", level: 54 },
        { name: "MongoDB", level: 48 },
        { name: "IndexedDB", level: 44 },
        { name: "SQL", level: 52 },
      ],
    },
    {
      title: "AI / ML Tools",
      skills: [
        { name: "TensorFlow Lite", level: 46 },
        { name: "NumPy", level: 48 },
        { name: "Pandas", level: 48 },
        { name: "Machine Learning Algorithms", level: 45 },
      ],
    },
    {
      title: "Cloud & Dev Tools",
      skills: [
        { name: "AWS", level: 42 },
        { name: "Firebase", level: 45 },
        { name: "Git", level: 50 },
        { name: "GitHub", level: 52 },
        { name: "VS Code", level: 60 },
        { name: "Hostinger", level: 56 },
        { name: "n8n", level: 48 },
        { name: "Make", level: 46 },
      ],
    },
  ],
};

export const contentCreation = {
  badge: "Engagement",
  heading: "Extracurricular Activities & Initiatives",
  description:
    "Beyond core coding, I actively engage in leading coding groups, community volunteering, career mentoring, and social initiatives.",
  categories: [
    {
      title: "Co-Founder – F5 Coders",
      description:
        "Conducted workshops, coding bootcamps, and technical training sessions for engineering and school-level students. Built learning roadmaps for Python, AI/ML, and practical problem solving.",
      stats: "F5 Coders",
      icon: "💻",
    },
    {
      title: "Career Guidance Mentor",
      description:
        "Provided career counselling, engineering course guidance, and skill-building pathways to help 12th standard students choose the right academic direction after schooling.",
      stats: "Mentorship",
      icon: "🎓",
    },
    {
      title: "Maatram Foundation Volunteer",
      description:
        "Participated in and assisted with social events and development initiatives organized by Maatram Foundation.",
      stats: "Community",
      icon: "🌟",
    },
    {
      title: "Bhumi’s Daan Utsav Participant",
      description:
        "Contributed to community welfare programs, awareness campaigns, and social development drives.",
      stats: "Volunteering",
      icon: "🤝",
    },
  ],
};

export const leadershipList = [
  {
    title: "Secretary – AI & DS",
    description:
      "Coordinated departmental events, maintained activity reports, and ensured smooth execution of academic and technical activities.",
    role: "Department Secretary",
    badge: "Leadership",
  },
  {
    title: "ERP Systems Architecture",
    description:
      "Designed, developed, and deployed end-to-end ERP systems including billing, inventory, purchase orders, and analytics dashboards.",
    role: "Lead Developer",
    badge: "Responsibility",
  },
  {
    title: "Client-Focused Web Development",
    description:
      "Created and maintained production-grade websites for businesses, ensuring responsive UI and optimized backend performance.",
    role: "Full Stack Developer",
    badge: "Responsibility",
  },
  {
    title: "Academic Excellence",
    description:
      "Secured 3rd Rank Academic Topper in the B.Tech Artificial Intelligence & Data Science program.",
    role: "Anna University Academic Topper",
    badge: "Achievement",
  },
  {
    title: "Technical Mentorship",
    description:
      "Trained 99+ students in Python, AI/ML fundamentals, and problem-solving as a technical mentor.",
    role: "Technical Mentor",
    badge: "Achievement",
  },
  {
    title: "Production ERP Deployment",
    description:
      "Developed production-level ERP and billing systems used across multiple retail businesses.",
    role: "ERP Developer",
    badge: "Achievement",
  },
  {
    title: "Live Corporate Sites Deployment",
    description:
      "Built and deployed full-stack corporate websites including ecolinellc.com and techpulsegc.com for real clients.",
    role: "Full Stack Developer",
    badge: "Achievement",
  },
];

export const internshipsList = [
  {
    organization: "Ecoline LLC",
    role: "Software & ERP Development Intern",
    duration: "Jun – Jul 2025",
    description:
      "Contributed to the development of the Invoice–PO–Inventory ERP system. Improved UI performance by 40% and reduced page load time by 30% through optimized frontend and backend logic.",
    skills: [
      "Invoice ERP",
      "Purchase Order",
      "Inventory ERP",
      "Frontend Optimization",
      "Backend Logic",
    ],
    tech: ["PHP", "JavaScript", "MySQL", "ERP System"],
  },
  {
    organization: "Plasmid",
    role: "AI & Data Science Intern",
    duration: "May – Jun 2024",
    description:
      "Gained hands-on experience with Python, Pandas, NumPy, and basic ML algorithms. Learned real-time problem solving and applied AI/ML concepts to practical datasets.",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Basic ML Algorithms",
      "AI/ML Concepts",
    ],
    tech: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
  {
    organization: "Novitech",
    role: "AI / ML Intern",
    duration: "Jan – Feb 2024",
    description:
      "Worked on machine learning model development, preprocessing, and evaluation.",
    skills: [
      "Machine Learning",
      "Model Development",
      "Preprocessing",
      "Evaluation",
    ],
    tech: ["Python", "Machine Learning"],
  },
];

export const softSkillsList = [
  {
    name: "Teamwork",
    icon: "🤝",
    desc: "Collaborating effectively with cross-functional teams to build and deliver successful projects.",
  },
  {
    name: "Communication",
    icon: "💬",
    desc: "Expressing ideas clearly and establishing strong communication lines with peers and clients.",
  },
  {
    name: "Research Writing",
    icon: "📝",
    desc: "Documenting findings, compiling analysis, and producing structured technical research reports.",
  },
  {
    name: "Leadership",
    icon: "👑",
    desc: "Coordinating departmental activities, mentoring peers, and leading project execution.",
  },
  {
    name: "Time Management",
    icon: "⏰",
    desc: "Balancing academic requirements, mentoring responsibilities, and client project timelines.",
  },
];

export const projects = [
  {
    id: "edge-ai-digital-twin",
    number: "01",
    badge: "🤖 AI Healthcare",
    title: "Decentralized Edge AI Digital Twin for Diabetes Management",
    description:
      "Built an offline-capable AI system using TensorFlow Lite for glucose trend prediction and metabolic simulation. Designed real-time dashboards, sensor analytics, and a privacy-first health monitoring interface.",
    techTags: ["TensorFlow Lite", "Python", "AI/ML", "Dashboard", "Edge AI"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: true,
  },
  {
    id: "ecolinellc-website",
    number: "02",
    badge: "🏢 Corporate Website",
    title: "ecolinellc.com",
    description:
      "Designed and deployed a complete business website with responsive UI, service sections, dashboards, contact automation, and optimized performance.",
    techTags: ["Full Stack", "HTML5", "CSS3", "JavaScript", "PHP"],
    links: {
      github: "#",
      demo: "https://ecolinellc.com",
    },
    isFlagship: true,
  },
  {
    id: "techpulsegc-website",
    number: "03",
    badge: "🏢 Corporate Website",
    title: "techpulsegc.com",
    description:
      "Created a modern corporate website with analytics sections, service modules, SEO optimization, responsive UI/UX, and a clean professional layout.",
    techTags: ["Full Stack", "SEO", "Responsive UI", "JavaScript"],
    links: {
      github: "#",
      demo: "https://techpulsegc.com",
    },
    isFlagship: true,
  },
  {
    id: "ecoline-invoice-erp",
    number: "04",
    badge: "🚀 ERP System",
    title: "ERP Invoice Management for Ecoline LLC",
    description:
      "Developed an ERP system for invoice management, purchase orders, inventory, billing, and analytics dashboards for Ecoline LLC.",
    techTags: ["PHP", "MySQL", "JavaScript", "ERP", "Invoice Management"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: false,
  },
  {
    id: "rainbow-prints-website",
    number: "05",
    badge: "🌐 Business Website",
    title: "rainbowprintstry.com",
    description:
      "Developed a business website for Rainbow Prints with responsive pages and service-focused layout.",
    techTags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    links: {
      github: "#",
      demo: "https://rainbowprintstry.com",
    },
    isFlagship: false,
  },
  {
    id: "rainbow-xerox-website",
    number: "06",
    badge: "🌐 Business Website",
    title: "rainbowxeroxpblr.com",
    description:
      "Developed a business website for Rainbow Xerox Perambalur with responsive UI and service information sections.",
    techTags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    links: {
      github: "#",
      demo: "https://rainbowxeroxpblr.com",
    },
    isFlagship: false,
  },
  {
    id: "salaamath-school-website",
    number: "07",
    badge: "🏫 School Website",
    title: "salaamathschool.com",
    description:
      "Developed a school website with responsive design, academic information sections, contact details, and clean UI.",
    techTags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    links: {
      github: "#",
      demo: "https://salaamathschool.com",
    },
    isFlagship: false,
  },
  {
    id: "srikala-catering-website",
    number: "08",
    badge: "⚛️ React Website",
    title: "srikalacattering.com",
    description:
      "Developed a React.js website for Sri Kala Catering with responsive design and service-based sections.",
    techTags: ["React.js", "JavaScript", "CSS3", "Responsive Design"],
    links: {
      github: "#",
      demo: "https://srikalacattering.com",
    },
    isFlagship: false,
  },
  {
    id: "whatsapp-automation-workflows",
    number: "09",
    badge: "⚡ Automation",
    title: "WhatsApp Automation Workflows",
    description:
      "Worked on WhatsApp automation workflows using n8n and Make for business communication, follow-ups, and workflow automation.",
    techTags: ["WhatsApp Automation", "n8n", "Make", "Automation"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: false,
  },
  {
    id: "mern-crud-app",
    number: "10",
    badge: "💻 MERN CRUD",
    title: "CRUD Application in MERN",
    description:
      "Built CRUD operations using the MERN stack with MongoDB, Express, React, and Node.js.",
    techTags: ["MongoDB", "Express", "React.js", "Node.js", "CRUD"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: false,
  },
  {
    id: "php-sql-crud-app",
    number: "11",
    badge: "🐘 PHP SQL CRUD",
    title: "CRUD System using SQL and PHP",
    description:
      "Built CRUD systems using PHP and SQL for managing data, forms, records, and database operations.",
    techTags: ["PHP", "SQL", "MySQL", "CRUD"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: false,
  },
  {
    id: "voice-based-android-app",
    number: "12",
    badge: "📱 AI Mobile App",
    title: "Voice-Based Android Application",
    description:
      "Developed an Android app enabling voice-controlled interactions for task execution with speech-to-text, command recognition, and smart assistant functions.",
    techTags: ["AI", "Mobile App", "Speech-to-Text", "Command Recognition"],
    links: {
      github: "#",
      demo: null,
    },
    isFlagship: false,
  },
];

export const certificates = {
  featured: [
    {
      name: "Value-Added Course on AI Tools, AI-Integrated SDLC & Cloud Practices",
      issuer: "VDart Academy",
      icon: "🤖",
      issuedDate: "Feb 2026",
      credentialId: "812023243031",
      skills: ["AI Tools", "SDLC", "Cloud"],
      description:
        "Completed a 40-hour value-added course focused on AI tools, industry-oriented SDLC, and cloud practices, gaining hands-on experience in modern software development.",
    },
    {
      name: "Tata - Data Visualisation: Empowering Business with Effective Insights Job Simulation",
      issuer: "Tata Group",
      icon: "📊",
      issuedDate: "Apr 2026",
      credentialId: "m4ccbbArDQKZ96oMf",
      skills: ["Data Visualisation", "Business Insights", "Choosing Right Visuals"],
      description:
        "Completed a data visualisation job simulation focused on framing business scenarios and choosing the right visuals for effective business insights.",
    },
    {
      name: "AWS ML Engineer Associate",
      issuer: "Amazon Web Services AWS",
      icon: "☁️",
      issuedDate: "Mar 2026",
      skills: ["Machine Learning", "AWS", "Cloud", "AI"],
      description: "Completed the AWS ML Engineer Associate certificate program.",
    },
    {
      name: "Data Analytics Job Simulation",
      issuer: "Deloitte",
      icon: "💼",
      issuedDate: "Mar 2026",
      credentialId: "M7sRkrcRwsnX5i9kA",
      skills: [
        "Data Analysis",
        "Data Cleaning",
        "Microsoft Excel",
        "Problem Solving",
        "Data Visualization",
      ],
      description:
        "Completed a data analytics job simulation involving real-world data tasks, data cleaning, analysis, and useful business insights.",
    },
    {
      name: "Certificate of Merit – Systems for Large Language Models LLMs",
      issuer: "PALS - IIT Alumni Initiative",
      icon: "🧠",
      issuedDate: "Feb 2026",
      credentialId: "PALS_IAL_S2_IBM_MERIT_00238",
      skills: ["Large Language Models", "AI", "LLMs"],
      description:
        "Awarded by PALS for participation and meritorious performance in the Industry-Assisted Online Lecture Series on Systems for Large Language Models.",
    },
    {
      name: "AI/ML Developer",
      issuer: "Novitech",
      icon: "🤖",
      description: "AI/ML Developer certification.",
    },
    {
      name: "Java Programming",
      issuer: "Naan Mudhalvan",
      icon: "☕",
      description: "Java Programming certification.",
    },
    {
      name: "Full Stack Development",
      issuer: "GUVI",
      icon: "💻",
      description: "Full Stack Development certification.",
    },
  ],
  viewAllUrl: "#",
};

export const education = {
  degree: "B.Tech – Artificial Intelligence and Data Science",
  institution: "M.A.M College of Engineering and Technology",
  university: "Anna University",
  cgpa: "8.11/10",
  graduation: "2023 – 2027",
  school: "Government Model School Perambalur",
  twelfth: "Class XII: 85.6% (2022 – 2023)",
  tenth: "",
};

export const footerContent = {
  taglines: [
    "AI & Data Science",
    "Full Stack Development",
    "ERP Systems & Automation",
  ],
  credential: "B.Tech AI & Data Science · CGPA 8.11/10",
  copyright: `© ${new Date().getFullYear()} Mohamed Yunus | Built with React`,
};

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};