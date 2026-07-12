// ============================================================
// portfolioData.js — Centralized configuration for Mohamed Rafi Niyaz Deen's Portfolio
// Splitted into Logistics & Automation and HR & Workforce Solutions
// ============================================================

export const personalInfo = {
  name: "MOHAMED RAFI NIYAZ DEEN",
  firstName: "Mohamed Rafi",
  brandName: "Mohamed Rafi",
  title: "Head of Business Development | Logistics, Automation & Workforce",
  location: "Al-Jubail, Kingdom of Saudi Arabia",
  phone: "+966 (0) 553 951 303",
  emails: {
    primary: "mohamedrafi2512@gmail.com",
    secondary: "mohamedrafi2512@gmail.com",
  },
  summary:
    "Strategic business development and operations professional with 15+ years’ experience driving growth, transformation and large-scale projects across the GCC and Asia. Skilled in building ventures, forming partnerships and delivering scalable solutions in investment, retail, workforce, automation and industrial operations. Recognized for aligning commercial strategy with operational insight to enable market entry, optimize business models and achieve sustainable growth.",
  resumeUrl: "/Mohamed Rafi Niyaz Deen-CV-new.pdf",
};

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
  github: "#",
  instagram: "#",
};

export const education = {
  degree: "Bachelors of Science (B.Sc)",
  institution: "Bharathidasan University",
  university: "Tiruchirappalli, Tamil Nadu, India",
  graduation: "Graduated: 2009",
  school: "",
  twelfth: "",
  tenth: "",
};

export const personalDetails = {
  nationality: "Indian",
  dob: "28/06/1988",
  maritalStatus: "Married",
  dependents: "04",
  passportNo: "T9285897 (Valid until 22/08/2030)",
  permanentAddress: "Tiruchirappalli, Tamil Nadu, India",
};

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};

// ============================================================
// LOGISTICS & AUTOMATION DATA SIDE
// ============================================================
export const logisticsData = {
  hero: {
    greeting: "Mohamed Rafi Niyaz Deen",
    titleHighlight: "Head of Logistics & Intralogistics Automation",
    subtitle:
      "Strategic commercial leader with a 15+ year record driving market entry, chemical 3PL warehousing contracts, and robotic automation integration projects for Tier-1 petrochemical players across KSA.",
    ctaPrimary: { text: "Explore Logistics Record", href: "#experience" },
    ctaSecondary: {
      text: "Contact Me",
      href: "mailto:mohamedrafi2512@gmail.com?subject=Logistics Synergy Inquiry",
    },
    ctaResume: { text: "Download CV", href: "/Mohamed Rafi Niyaz Deen-CV-new.pdf" },
  },
  about: {
    heading: "Logistics & Automation Profile",
    bio: `I am a senior <span class="text-[#E2B857] text-xl font-black mx-1 tracking-wide uppercase">Logistics & Intralogistics Leader</span> with 15+ years of GCC experience. My core expertise is bridging advanced technological solutions (such as packaging robotics and automated warehousing systems) with corporate clients (including SABIC, Tasnee, and S.A. TALKE). I specialize in setting up dangerous goods 3PL storage operations, designing chemical container bulk export flows, and steering CAPEX-heavy EPC project bids.`,
    techStack: [
      "Industrial Business Development",
      "3PL & Dangerous Goods Storage",
      "Bulk Polymer Export Supply Chains",
      "CAPEX Planning & ROI Sizing",
      "Intralogistics System Engineering",
      "Robotic Packaging Automation",
      "Supplier & Vendor Management",
      "Tendering & Commercial Bidding",
      "Gulf Port Handover Workflows",
      "Joint Ventures & Strategic Alliances",
      "Local Content Directives (Aramco/SABIC)",
    ],
  },
  skills: {
    badge: "Operations Methodology",
    heading: "How I Turn Market Entry Plans Into Scalable Supply Chain Networks",
    description:
      "Combining technical feasibility studies, commercial risk models, and logistics execution to introduce robotics and secure dangerous goods storage sites.",
    cards: [
      {
        number: "01",
        title: "Feasibility Sizing",
        text: "Analyzing polymer packaging lines, warehouse space limitations, and regional throughput demands to justify robotics CAPEX/OPEX returns.",
      },
      {
        number: "02",
        title: "Techno-Commercial Sizing",
        text: "Coordinating with technology providers (like E80 Group) to build automated container packing, palletizing, and stretch-hooding systems.",
      },
      {
        number: "03",
        title: "Tendering & Close",
        text: "Facilitating multi-million-dollar proposal bids, SLA structures, and contract scopes to secure long-term client engagements.",
      },
      {
        number: "04",
        title: "Supply Chain Setup",
        text: "Structuring Jubail-to-global export container flows, coordinating port custom clearances, and establishing dangerous goods warehouses.",
      },
    ],
    endText: "Ready to automate logistics!",
  },
  technicalSkills: {
    categories: [
      {
        title: "Commercial & Project Sizing",
        skills: [
          { name: "Contract Negotiation & RFP Bids", level: 94 },
          { name: "CAPEX & OPEX Sizing", level: 88 },
          { name: "ROI & Feasibility Studies", level: 86 },
          { name: "Joint Venture Formations", level: 90 },
        ],
      },
      {
        title: "Logistics & Supply Chain",
        skills: [
          { name: "3PL & Dangerous Goods Storage", level: 93 },
          { name: "Bulk Polymer Export Flows", level: 91 },
          { name: "Port Handover & Customs Clearance", level: 89 },
          { name: "Supply Chain Risk Management", level: 88 },
        ],
      },
      {
        title: "Automation & Robotics Integration",
        skills: [
          { name: "Stretch Hooding Automation", level: 85 },
          { name: "Robotic Packaging Systems", level: 82 },
          { name: "Smart Inventory & WMS Systems", level: 86 },
          { name: "Material Handling Integrations", level: 84 },
        ],
      },
    ],
  },
  softSkills: [
    {
      name: "Strategic Direction",
      icon: "🏗️",
      desc: "Planning high-value EPC logistics bids and steering material handling projects.",
    },
    {
      name: "Commercial Negotiation",
      icon: "🤝",
      desc: "Aligning pricing and scopes to secure multi-year agreements with global chemical leaders.",
    },
    {
      name: "Stakeholder Synergy",
      icon: "💬",
      desc: "Liaising between international system developers, local authorities, and industrial end users.",
    },
    {
      name: "Operational Leadership",
      icon: "👑",
      desc: "Setting up terminal operations, bulk packaging lines, and ocean carrier container quotas.",
    },
  ],
  experience: [
    {
      organization: "TechPulse Global Saudi Arabia",
      role: "Head of Business Development",
      duration: "Jul 2025 – Present",
      description:
        "Pioneering smart warehousing, robotic automation, and chemical 3PL logistics solutions. Bridging multinational technology providers with local end users to deploy advanced robotic packaging systems and secure Aramco-approved industrial contracts.",
      skills: [
        "Workforce & Automation",
        "Smart Warehousing",
        "Chemical 3PL Storage",
        "Client Management",
      ],
      tech: ["Saudi Arabia", "Jubail", "Automation Tech"],
    },
    {
      organization: "WR Logistics LLC",
      role: "Head of Business Development – Market Entry",
      duration: "Mar 2025 – May 2025",
      description:
        "Facilitated market entry assessment and feasibility study for the Saudi industrial logistics sector. Engaged with tier-1 petrochemical clients (SABIC, Tasnee, ASMO) to capture logistics demand and conceptualize material handling solutions.",
      skills: [
        "Market Feasibility Studies",
        "Client Discovery",
        "Automation Assessment",
        "GCC Forums Representation",
      ],
      tech: ["Riyadh", "Project Engagement", "GPCA / IPTC"],
    },
    {
      organization: "Schmidt ME Logistics Saudi Arabia",
      role: "Commercial Manager",
      duration: "2022 – Feb 2025",
      description:
        "Managed commercial operations and BD for Karl Schmidt Middle East. Secured long-term polymer logistics contracts, optimized ocean/land supply chains (including 100-200 container/month polymer export to Genoa, Italy), and led commercial alignment for the USD 12M TASNEE Silos project.",
      skills: [
        "Tendering & Proposal Bid",
        "Costing & Commercial Bids",
        "Supplier Management",
        "EPC Project Facilitation",
      ],
      tech: ["Jubail", "Karl Schmidt Subsidiary", "Genoa Export Flow"],
    },
    {
      organization: "Plus Max Groups of Companies Sdn Bhd",
      role: "Executive – Business Development & Operations",
      duration: "2012 – 2014",
      description:
        "Led retail logistics business growth initiatives in Malaysia, increasing market penetration by 25% and launching loyalty models that boosted repeat customer visits by 40%.",
      skills: [
        "Retail Logistics Growth",
        "Loyalty Program Development",
        "Vendor Management",
        "Product Launches",
      ],
      tech: ["Kuala Lumpur", "Malaysia", "Retail Sector"],
    },
  ],
  projects: [
    {
      id: "techpulse-dg-storage",
      number: "01",
      badge: "📦 3PL dangerous goods",
      title: "10,000 MT/Year DG Storage Contract",
      description:
        "Negotiated and operationalized a long-term Dangerous Goods (DG) 3PL contract for chemical logistics leaders Aquaness LLC and Nex Chemia, establishing permanent regional storage capacity.",
      techTags: ["Dangerous Goods", "3PL Storage", "Chemical Logistics", "Jubail"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
    {
      id: "tasnee-silos-epc",
      number: "02",
      badge: "🏗️ Industrial EPC",
      title: "TASNEE Silos Carbon Black Project",
      description:
        "Led the techno-commercial bid valuation, client alignment, and supplier bidding process for the TASNEE Silos project, securing a USD 12 Million commercial victory for Schmidt ME.",
      techTags: ["EPC Bids", "Silos Construction", "Carbon Black", "USD 12M"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
    {
      id: "polymer-export-genoa",
      number: "03",
      badge: "🚢 Global Export Flow",
      title: "Jubail to Genoa Polymer Supply Chain",
      description:
        "Designed and operationalized a large-scale polymer export supply chain contract, organizing logistics, port handover, and local storage to ship 100-200 containerized loads monthly to Genoa, Italy.",
      techTags: ["Export Logistics", "Container Flow", "Port Handover", "Genoa"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
  ],
  milestones: [
    {
      title: "Silos Construction EPC Project",
      description:
        "Led the business development and project facilitation for TASNEE silos (Carbon Black products) valued at USD 12 Million, securing full commercial alignment.",
      role: "Commercial Manager | Schmidt ME",
      badge: "USD 12M Win",
    },
    {
      title: "3PL Dangerous Goods Storage Contracts",
      description:
        "Secured and managed long-term 3PL storage contracts for Aquaness LLC & Nex Chemia, handling 10,000 Metric Tons (MT) per year under unlimited contract terms.",
      role: "Head of BD | TechPulse Global",
      badge: "10,000 MT/Yr DG Storage",
    },
    {
      title: "Bulk Polymer Export Logistics Contract",
      description:
        "Secured and operationalized a high-volume polymer export logistics contract for containerized shipments from Jubail to Genoa, Italy, establishing an export flow of 100-200 containers monthly.",
      role: "Commercial Manager | Schmidt ME",
      badge: "100-200 Containers/Mo",
    },
  ],
  contentCreator: {
    badge: "Global Network",
    heading: "Logistics Congresses & Regional Forums",
    description:
      "Active participant and delegate representing logistics and automated technology interests at pan-GCC industrial forums.",
    categories: [
      {
        title: "Saudi Maritime & Logistics Congress",
        description:
          "Engaged with port authorities, container carriers, and EPC contractors to outline port handover workflows and scalable bulk export logistics policies.",
        stats: "National",
        icon: "⚓",
      },
      {
        title: "GPCA Annual Forums",
        description:
          "Participated in multiple Gulf Petrochemicals and Chemicals Association events to monitor supply chain trends, build international networking pipelines, and shape joint venture deals.",
        stats: "International",
        icon: "🌐",
      },
    ],
  },
  certificates: {
    featured: [
      {
        name: "Appreciation Award — Best Supplier",
        issuer: "S.A. TALKE",
        icon: "🏆",
        issuedDate: "2019",
        description: "Awarded by S.A. TALKE for outstanding logistics support and consistent SLA delivery across industrial projects.",
      },
      {
        name: "Saudi Maritime & Logistics Summit Certificate",
        issuer: "Dammam Forum",
        icon: "⚓",
        description: "Certified participant in discussions detailing port digitalization, cargo compliance, and next-generation GCC export lanes.",
      },
      {
        name: "GPCA Annual Supply Chain Forums",
        issuer: "Gulf Petrochemical Association",
        icon: "🌐",
        description: "Regular delegate mapping supply chain integrations, chemical 3PL expansions, and workforce Saudization dynamics.",
      },
    ],
    viewAllUrl: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
  },
  footer: {
    taglines: [
      "Industrial Business Development",
      "Dangerous Goods 3PL Storage",
      "Intralogistics & Packing Automation",
    ],
    credential: "B.Sc · 15+ Years Logistics & Business Development Executive",
    copyright: `© ${new Date().getFullYear()} Mohamed Rafi | Logistics & Automation Portfolio`,
  },
};

// ============================================================
// HR & WORKFORCE SOLUTIONS DATA SIDE
// ============================================================
export const hrData = {
  hero: {
    greeting: "Mohamed Rafi Niyaz Deen",
    titleHighlight: "Head of HR Services & Corporate Staffing Solutions",
    subtitle:
      "Corporate business leader specializing in mega-workforce outsourcing, Saudi labor GRC compliance (Qiwa, GOSI, WPS), and bulk recruitment mobilization (10,000+ personnel) for industrial enterprise accounts.",
    ctaPrimary: { text: "Explore HR Record", href: "#experience" },
    ctaSecondary: {
      text: "Contact Me",
      href: "mailto:mohamedrafi2512@gmail.com?subject=HR Outsourcing Inquiry",
    },
    ctaResume: { text: "Download CV", href: "/Mohamed Rafi Niyaz Deen-CV-new.pdf" },
  },
  about: {
    heading: "HR & Workforce Profile",
    bio: `I am a senior <span class="text-[#E2B857] text-xl font-black mx-1 tracking-wide uppercase">HR Outsourcing & Labor GRC Expert</span> with over 15 years of experience directing workforce solutions in KSA and the wider GCC. I specialize in managing multi-million-riyal staffing accounts, leading regional recruiters, and structuring custom cost-per-head billing frameworks. My deep knowledge of Saudi Labor laws, Qiwa, Nitaqat, GOSI, and WPS allows me to guide enterprise clients through compliant workforce mobilizations.`,
    techStack: [
      "Workforce Outsourcing (10,000+ Staff)",
      "Saudi Labor Law GRC Advisory",
      "Saudization (Nitaqat) Strategy",
      "Wages Protection System (WPS)",
      "Qiwa, GOSI, & Muqeem Portals",
      "Global Bulk Recruitment Campaigns",
      "Recruiter Management & KPI Sizing",
      "Corporate Client Key Account Management",
      "Aging AR Debt Recovery (SAR 272M)",
      "Expatriate Onboarding & Visa Operations",
      "Staffing Contract Negotiations",
    ],
  },
  skills: {
    badge: "Staffing Methodology",
    heading: "How I Deploy Compliant Workforces At Scale For Enterprise Accounts",
    description:
      "Structuring high-volume staffing campaigns and compliance audits to guarantee smooth, legal labor deployment with high retention rates.",
    cards: [
      {
        number: "01",
        title: "Compliance Audit",
        text: "Assessing clients' current Saudization (Nitaqat) indexes, GOSI rosters, and Qiwa contract files to map compliance risks.",
      },
      {
        number: "02",
        title: "Sourcing & Mobilization",
        text: "Directing bulk recruitment drives in international pipelines (India, Nepal, etc.) to source qualified technical trades.",
      },
      {
        number: "03",
        title: "Contracts & Onboarding",
        text: "Formulating legal cost-plus and fixed-rate corporate labor contracts, processing expat visas, and coordinating local payroll.",
      },
      {
        number: "04",
        title: "SLA Management",
        text: "Monitoring operational key performance indicators, dispute resolution, payroll disbursements, and Wages Protection System compliance.",
      },
    ],
    endText: "Ready to deploy workforce!",
  },
  technicalSkills: {
    categories: [
      {
        title: "Executive HR & Sales Leadership",
        skills: [
          { name: "Manpower Outsourcing Sales", level: 95 },
          { name: "Key Account Management", level: 93 },
          { name: "Recruiting Staff Management", level: 90 },
          { name: "Proposal Bid Success Ratio", level: 92 },
        ],
      },
      {
        title: "Saudi Labor GRC Compliance",
        skills: [
          { name: "Saudization (Nitaqat) Audits", level: 95 },
          { name: "Qiwa, GOSI & Muqeem Administration", level: 96 },
          { name: "Wages Protection System (WPS)", level: 94 },
          { name: "Saudi Labor Law & GRC", level: 92 },
        ],
      },
      {
        title: "Talent Mobilization & Operations",
        skills: [
          { name: "Cross-Border Bulk Recruitment", level: 93 },
          { name: "AR Collections Management", level: 88 },
          { name: "Expatriate Visa Logistics", level: 91 },
          { name: "Local Onboarding & Payroll", level: 90 },
        ],
      },
    ],
  },
  softSkills: [
    {
      name: "Strategic HR Leadership",
      icon: "👑",
      desc: "Directing multi-site recruitment teams and organizing mega-workforce deployments.",
    },
    {
      name: "Labor Negotiation",
      icon: "🤝",
      desc: "Structuring commercial pricing models and negotiating staffing agreements.",
    },
    {
      name: "Regulatory GRC Expert",
      icon: "🛡️",
      desc: "Deep knowledge of Saudi Labor laws, WPS regulations, and Saudization quotas.",
    },
    {
      name: "Conflict Resolution",
      icon: "💬",
      desc: "Mediating employer-employee disputes and coordinating with local labor ministries.",
    },
  ],
  experience: [
    {
      organization: "Workforce Saudia",
      role: "Regional Sales Manager",
      duration: "Oct 2025 – Present",
      description:
        "Directing regional sales operations and corporate client partnerships for KSA's leading HR manpower outsourcing provider. Driving high-value corporate staffing contracts and ensuring full Saudization (Nitaqat), Qiwa, and GOSI legal compliance for industrial enterprise accounts.",
      skills: [
        "Regional Sales Strategy",
        "Manpower Outsourcing",
        "Key Account Management",
        "Saudi Labor Compliance",
      ],
      tech: ["Saudi Arabia", "Riyadh", "HR Services"],
    },
    {
      organization: "Jaddarah Workforce Services Company",
      role: "Business Development and Operations Manager",
      duration: "2014 – 2022",
      description:
        "Led a team of 25 branch coordinators managing accounts for 10,000+ outsourced personnel. Drove SAR 25 Million monthly revenue, achieved a 90% proposal success rate, and successfully recovered SR 272 Million in overdue payments.",
      skills: [
        "Manpower Outsourcing",
        "GRC & GOSI Compliance",
        "SWOT & KPI Tracking",
        "Bulk Sourcing Operations",
      ],
      tech: ["Jubail", "Saudi-wide Operations", "Qiwa & Absher"],
    },
    {
      organization: "Coastline Groups of Companies",
      role: "HR Executive",
      duration: "2011 – 2012",
      description:
        "Managed end-to-end recruitment operations from sourcing to onboarding. Designed hiring campaigns to attract international expatriate talent and aligned HR initiatives with department heads.",
      skills: [
        "Talent Acquisition",
        "Expatriate Sourcing",
        "Hiring Campaigns",
        "Onboarding Workflows",
      ],
      tech: ["Male'", "Republic of Maldives", "Expat Talent"],
    },
  ],
  projects: [
    {
      id: "jaddarah-debt-recovery",
      number: "01",
      badge: "💰 AR Debt Recovery",
      title: "SAR 272 Million Aging AR Recovery Unit",
      description:
        "Established and managed a dedicated collections and payment recovery unit at Jaddarah Workforce Services, successfully recovering SR 272 Million in overdue balances from municipal and corporate clients.",
      techTags: ["AR Reconciliation", "Dispute Mediation", "Risk Analysis", "Collections"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
    {
      id: "covid-mass-recruitment",
      number: "02",
      badge: "✈️ Cross-Border Staffing",
      title: "COVID-19 Pandemic Bulk Recruitment Campaigns",
      description:
        "Orchestrated urgent international talent acquisition campaigns in India (Mumbai, Chennai) and Nepal, recruiting and mobilizing 450+ skilled workers under severe quarantine and visa regulations.",
      techTags: ["Expat Mobilization", "Consulate Liaison", "Rapid Hiring", "COVID Logistics"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
    {
      id: "saudi-market-entry",
      number: "03",
      badge: "🛡️ GRC Market Entry",
      title: "Enterprise Saudi Labor Market Entry Advisory",
      description:
        "Consulted international clients (E80 Group, USA Handled) on KSA labor compliance, guiding their registration on GOSI, Qiwa, Wages Protection System (WPS), and local payroll structures.",
      techTags: ["Qiwa Setup", "Saudization Index", "GRC Compliance", "Saudi Advisory"],
      links: {
        linkedin: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
        demo: null,
      },
      isFlagship: true,
    },
  ],
  milestones: [
    {
      title: "Overdue Collections Recovery Unit",
      description:
        "Launched a dedicated payment recovery unit at Jaddarah Workforce Services, successfully recovering SR 272 Million in overdue payments from clients.",
      role: "BD & Operations Manager",
      badge: "SR 272M Recovered",
    },
    {
      title: "Urgent Mass Recruitment Campaigns",
      description:
        "Planned and executed urgent bulk recruitment campaigns across India (Chennai, Trichy, Mumbai) & Nepal, mobilizing over 450 candidates during the COVID-19 pandemic.",
      role: "BD & Operations Manager | Jaddarah",
      badge: "COVID-19 Mobilization",
    },
    {
      title: "Saudi Market Entry Advisory",
      description:
        "Guided foreign entities like E80 Group (Italy), Handled (USA), and ADK Blasts Corp (South Korea) through Saudi market entry, compliance, GOSI, Qiwa, and local payroll onboarding.",
      role: "Head of BD | TechPulse Global",
      badge: "Market Entry Advisory",
    },
  ],
  contentCreator: {
    badge: "Global Network",
    heading: "Aramco & SABIC Corporate Forums",
    description:
      "Representing manpower services and labor compliance frameworks at corporate forums and national level conferences.",
    categories: [
      {
        title: "Aramco & SABIC LTC Forums",
        description:
          "Aligned with local content directives, sharing insights on automation, Saudization structuring, and supplier onboarding regulations.",
        stats: "Corporate",
        icon: "🏗️",
      },
      {
        title: "Saudi HR & Local Content Forums",
        description:
          "Regular delegate sharing models for Wages Protection compliance, Saudization optimization, and outsourcing logistics.",
        stats: "National",
        icon: "📈",
      },
    ],
  },
  certificates: {
    featured: [
      {
        name: "Appreciation Award — Best Employee",
        issuer: "Jaddarah Workforce Services Company",
        icon: "🎖️",
        issuedDate: "2019",
        description: "Awarded for exceptional leadership, recovering overdue accounts, and expanding client onboarding by 20%.",
      },
      {
        name: "Saudi Labor Law and Qiwa Regulation Certification",
        issuer: "Dammam Chamber of Commerce",
        icon: "📜",
        description: "Certified expertise in Saudi labor regulations, contract compliance, GOSI, and Wages Protection guidelines.",
      },
      {
        name: "GPCA Supply Chain Saudization Forum Certificate",
        issuer: "Gulf Petrochemical Association",
        icon: "🌐",
        description: "Delegate tracking Nitaqat quotas, expat staffing logistics, and local talent development integrations.",
      },
    ],
    viewAllUrl: "https://www.linkedin.com/in/mohamed-rafi-niyazdeen-72446889",
  },
  footer: {
    taglines: [
      "Megamanpower Outsourcing",
      "Saudi Labor GRC Compliance",
      "Qiwa, GOSI & WPS Management",
    ],
    credential: "B.Sc · 15+ Years HR Services & Workforce Solutions Executive",
    copyright: `© ${new Date().getFullYear()} Mohamed Rafi | HR & Workforce Solutions Portfolio`,
  },
};