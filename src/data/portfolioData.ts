export type ProjectCategory =
  | 'Public Sector'
  | 'Mobile & Native'
  | 'Commerce & Web'
  | 'AI & Open Source';

export type ProjectVisualType =
  | 'akshaya-portal'
  | 'exam-matrix'
  | 'legislative'
  | 'geofence-face'
  | 'civic-typography'
  | 'globe-bilingual'
  | 'audio-player'
  | 'education-portal'
  | 'ecommerce-admin'
  | 'real-estate'
  | 'rainfall-ml'
  | 'claude-ai'
  | 'carbon-system';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  role: string;
  organization: string;
  stack: string[];
  impactMetric: string;
  summary: string;
  highlights: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  repoVisibility: 'public' | 'private';
  featured: boolean;
  bentoSpan?: 'wide' | 'standard';
  visualType: ProjectVisualType;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface PublicRepoItem {
  name: string;
  account: 'FalihaAbdulSalam';
  language: string;
  url: string;
  liveUrl?: string;
  description: string;
}

export interface AdditionalProjectGroup {
  group: string;
  items: {
    name: string;
    url?: string;
    note?: string;
  }[];
}

export const PROFILE = {
  name: 'Faliha Abdul Salam',
  shortTitle: 'Front-End & React Native Developer',
  location: 'Thiruvalla, Kerala, India',
  email: 'falihaabdulsalam@gmail.com',
  phone: '+91 9544786917',
  resumeUrl: '/assets/aistudio/Faliha_Abdul_Salam__1__3496f13e.pdf',
  linkedinUrl: 'https://www.linkedin.com/in/faliha-abdul-salam/',
  linkedinHandle: 'faliha-abdul-salam',
  githubPrimaryUrl: 'https://github.com/FalihaAbdulSalam',
  githubPrimaryHandle: 'FalihaAbdulSalam',
  headline: 'Building fast, reliable web platforms and mobile experiences.',
  bio: 'I design and build responsive web platforms and cross-platform mobile apps with React 19, Next.js, TypeScript, and React Native. From statewide public-sector portals serving 10,000+ citizens daily to high-converting storefronts, I pair clean UI craft with dependable full-stack integration.',
};

export const KEY_METRICS = [
  {
    value: '10,000+',
    label: 'Daily Active Users',
    context: 'Citizens and staff relying on statewide portals daily',
  },
  {
    value: '25%',
    label: 'Faster Delivery',
    context: 'Speedup unlocked with AI tooling and tight CI/CD loops',
  },
  {
    value: '30%',
    label: 'Fraud & UI Gains',
    context: 'Lift in engagement & biometric check-in verification',
  },
  {
    value: '20+',
    label: 'Enterprise Modules',
    context: 'Interconnected workflows built for state exam operations',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'akshaya',
    title: 'Akshaya e-Governance Portal',
    subtitle: 'State-Wide Citizen Services & Center Network',
    category: 'Public Sector',
    year: '2025',
    role: 'Front-End Developer',
    organization: 'C-DIT',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    impactMetric: 'Kerala statewide digital services gateway',
    summary:
      'Statewide digital gateway helping Kerala residents find nearby Akshaya centers, browse public service guides, and track official notices on any screen size.',
    highlights: [
      'Designed accessible, mobile-first citizen journeys tailored for everyday e-Governance tasks across Kerala.',
      'Connected REST APIs for district center directories, service listings, and live public announcements.',
      'Tuned bundle loading, layout stability, and responsive grids for dependable high-traffic performance.',
    ],
    liveUrl: 'https://akshaya.kerala.gov.in',
    liveLabel: 'akshaya.kerala.gov.in',
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'wide',
    visualType: 'akshaya-portal',
  },
  {
    id: 'malayalam-mission',
    title: 'Malayalam Mission Portal',
    subtitle: 'Bilingual 3D Interactive Chapter Globe',
    category: 'Public Sector',
    year: '2025',
    role: 'Front-End Developer',
    organization: 'C-DIT',
    stack: ['React', 'Vite', 'AmCharts5', 'GeoData', 'Context API'],
    impactMetric: 'Interactive 3D global chapter map',
    summary:
      'Dual-language cultural portal pairing instant English/Malayalam switching with an interactive 3D globe plotting global chapters.',
    highlights: [
      'Built a fast dual-language frontend with React Router and a custom LanguageContext provider for seamless switching.',
      'Integrated AmCharts5 and GeoData to visualize worldwide Malayalam Mission chapters on an interactive 3D globe.',
      'Added smooth Swiper media carousels and structured React-Select filters for browsing events and chapter directories.',
    ],
    liveUrl: 'https://mm.kerala.gov.in',
    liveLabel: 'mm.kerala.gov.in',
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'globe-bilingual',
  },
  {
    id: 'niyamasabha',
    title: 'Kerala Legislative Assembly Portal (Niyamasabha)',
    subtitle: 'State Legislative Digital Architecture',
    category: 'Public Sector',
    year: '2025',
    role: 'Front-End Developer',
    organization: 'C-DIT',
    stack: ['React', 'REST APIs', 'Accessible UI'],
    impactMetric: 'Live assembly proceedings & citizen access',
    summary:
      'Accessible state legislature portal bringing live session updates, proceedings, and searchable archives to citizens and assembly officials.',
    highlights: [
      'Rebuilt key public and internal pages with responsive layouts and clear WCAG-aligned navigation.',
      'Wired REST web services directly into dynamic UI views so live assembly session data updates cleanly.',
      'Partnered with design and backend teams to organize deep document archives into intuitive, modular screens.',
    ],
    liveUrl: 'https://niyamasabha.in',
    liveLabel: 'niyamasabha.in',
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'wide',
    visualType: 'legislative',
  },
  {
    id: 'scole-kerala',
    title: 'SCOLE-Kerala Educational Portal',
    subtitle: 'Open Schooling & Academic Directory',
    category: 'Public Sector',
    year: '2025',
    role: 'Front-End Developer',
    organization: 'C-DIT',
    stack: ['React 19', 'Vite', 'React Router', 'REST APIs'],
    impactMetric: 'Multilingual courses & live statistics',
    summary:
      'Student and faculty portal organizing multilingual course catalogs, admissions, live statistics, and official academic archives.',
    highlights: [
      'Crafted multi-page academic navigation in React 19 and Vite for courses, admissions, and center directories.',
      'Connected live API endpoints to present regional statistics, photo galleries, and downloadable student records.',
    ],
    liveUrl: 'https://scolekerala.org',
    liveLabel: 'scolekerala.org',
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'education-portal',
  },
  {
    id: 'pareeksha-bhavan',
    title: 'Pareeksha Bhavan — Examination Management System',
    subtitle: '20+ Module Enterprise Examination Platform',
    category: 'Public Sector',
    year: '2025',
    role: 'Lead Front-End Developer',
    organization: 'C-DIT',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    impactMetric: '20+ responsive enterprise modules',
    summary:
      'Full-lifecycle examination suite coordinating exam calendars, center seating, valuation camps, approvals, and verifiable certificates.',
    highlights: [
      'Delivered 20+ responsive screens spanning exam schedules, timetable locking, subject mapping, and center allocation.',
      'Built valuation camp assignments and end-to-end certificate generation, printing, verification, and dispatch tracking.',
      'Standardized reusable forms and approval tables for registration fees, exemptions, condonation, and live status lookups.',
    ],
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'exam-matrix',
  },
  {
    id: 'trackease',
    title: 'CDIT Face Attendance (TrackEase)',
    subtitle: 'Biometric & Geofenced Mobile/Web Suite',
    category: 'Mobile & Native',
    year: '2025',
    role: 'Full-Stack Mobile & Web Architect',
    organization: 'C-DIT',
    stack: ['React', 'React Native', 'Expo', 'GPS Geofencing'],
    impactMetric: '30% drop in attendance spoofing',
    summary:
      'Cross-platform attendance companion pairing device-camera face checks with GPS geofences and reverse-geocoded Duty Pass check-ins.',
    highlights: [
      'Unified React web dashboards with a React Native mobile client featuring real-time GPS geofence verification.',
      'Built camera-based biometric verification flows and refined UI steps via A/B checks, cutting false check-ins by 30%.',
      'Added anti-spoofing guardrails and a mobile Duty Pass check-in mode with automatic location tagging.',
    ],
    liveUrl: 'https://trackease.cdit.org',
    liveLabel: 'trackease.cdit.org',
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'geofence-face',
  },
  {
    id: 'sarva-audios',
    title: 'Sarva Audios',
    subtitle: 'Google Play Store Mobile Audiobook App',
    category: 'Mobile & Native',
    year: '2025',
    role: 'React Native Developer',
    organization: 'C-DIT',
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Background Audio'],
    impactMetric: 'Live on Google Play Store',
    summary:
      'Mobile audiobook player built with Expo Router and TypeScript for gapless background listening and persistent playback progress.',
    highlights: [
      'Shipped a public educational audiobook app for C-DIT on Google Play to make regional literature easy to listen to anywhere.',
      'Organized typed mobile screens and deep links cleanly with Expo Router for smooth Android and iOS navigation.',
      'Engineered resilient background audio playback that remembers listener position with minimal buffering.',
    ],
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'audio-player',
  },
  {
    id: 'snippet-commerce',
    title: 'Snippet Commerce 360°',
    subtitle: 'Enterprise E-Commerce Storefront & Admin',
    category: 'Commerce & Web',
    year: '2024',
    role: 'Front-End Developer',
    organization: 'Snippet Commerce 360°',
    stack: ['Next.js', 'Redux Toolkit', 'SQL Optimization', 'REST APIs'],
    impactMetric: 'Unified storefront & admin workspace',
    summary:
      'Next.js commerce storefront paired with an operations dashboard for pricing rules, promo campaigns, and live inventory updates.',
    highlights: [
      'Owned frontend architecture across buyer checkout journeys, secure payment handoffs, and order tracking.',
      'Built responsive merchant dashboards for managing SKUs, discounts, and dynamic pricing tiers.',
      'Synced shared storefront and admin state via Redux Toolkit to eliminate duplicate API calls and speed up page transitions.',
    ],
    repoVisibility: 'private',
    featured: true,
    bentoSpan: 'standard',
    visualType: 'ecommerce-admin',
  },
  {
    id: 'cm-connect',
    title: 'CM Connect',
    subtitle: 'Citizen Grievance & Engagement Platform',
    category: 'Public Sector',
    year: '2025',
    role: 'Front-End Developer',
    organization: 'C-DIT',
    stack: ['React 19', 'Vite', 'MutationObserver API', 'Unicode Regex'],
    impactMetric: 'Automated bilingual typography engine',
    summary:
      'Citizen outreach portal powered by a custom MutationObserver and Unicode regex script that detects and styles Malayalam text on the fly.',
    highlights: [
      'Built modular grievance and outreach views in React 19 and Vite with dynamic client-side routing.',
      'Created an automatic script-detection engine with MutationObserver + Unicode regex so Malayalam and English text render cleanly without manual spans.',
      'Wired animated KPI counters (useCountUp) and responsive Swiper sliders directly to live API feeds.',
    ],
    liveUrl: 'https://cmwithme.kerala.gov.in',
    liveLabel: 'cmwithme.kerala.gov.in',
    repoVisibility: 'private',
    featured: false,
    bentoSpan: 'standard',
    visualType: 'civic-typography',
  },
  {
    id: 'dream-dwell',
    title: 'Dream Dwell',
    subtitle: 'Canadian Real Estate & Booking Platform',
    category: 'Commerce & Web',
    year: '2024',
    role: 'Full-Stack React Developer',
    organization: 'Independent / Client',
    stack: ['React', 'Node.js', 'Interactive Catalogs'],
    impactMetric: 'Property search & tour scheduling',
    summary:
      'Clean Canadian property discovery platform allowing homebuyers to filter listings and book guided property viewings online.',
    highlights: [
      'Built a fast, mobile-ready real estate showcase tailored for Canadian residential buyers and agents.',
      'Added interactive listing filters and direct viewing-booking flows for effortless scheduling.',
    ],
    liveUrl: 'https://dreamsdwell.ca',
    liveLabel: 'dreamsdwell.ca',
    repoVisibility: 'private',
    featured: false,
    bentoSpan: 'standard',
    visualType: 'real-estate',
  },
  {
    id: 'rainfall-prediction',
    title: 'Rainfall Prediction Model',
    subtitle: 'Meteorological Machine Learning Pipeline',
    category: 'AI & Open Source',
    year: '2022',
    role: 'ML & Data Developer',
    organization: 'Open Source / Academic',
    stack: ['Python', 'Machine Learning', 'Data Visualization'],
    impactMetric: 'Meteorological forecasting pipeline',
    summary:
      'Python machine learning project analyzing multi-year climate records and plotting readable rainfall trend predictions.',
    highlights: [
      'Trained classification and regression pipelines on historical weather logs to forecast seasonal rainfall.',
      'Cleaned raw meteorological tables and generated clear visual charts explaining prediction accuracy.',
    ],
    repoUrl: 'https://github.com/FalihaAbdulSalam/Rainfall-Prediction-using-Machine-Learning',
    repoVisibility: 'public',
    featured: false,
    bentoSpan: 'standard',
    visualType: 'rainfall-ml',
  },
  {
    id: 'carbon-react',
    title: 'Carbon Design System React App',
    subtitle: 'Enterprise UI Component Architecture',
    category: 'Commerce & Web',
    year: '2024',
    role: 'Front-End Developer',
    organization: 'Open Source',
    stack: ['React', 'Carbon Design System', 'JavaScript'],
    impactMetric: 'Live enterprise UI showcase',
    summary:
      'Enterprise UI exploration built on IBM Carbon Design tokens, featuring keyboard-friendly data tables and modular dashboards.',
    highlights: [
      'Constructed clean enterprise layouts, structured forms, and data grids following IBM Carbon guidelines.',
      'Published open-source on GitHub with a live production preview on Vercel.',
    ],
    liveUrl: 'https://carbon-react-project.vercel.app',
    liveLabel: 'carbon-react-project.vercel.app',
    repoUrl: 'https://github.com/FalihaAbdulSalam/Carbon-react-project',
    repoVisibility: 'public',
    featured: false,
    bentoSpan: 'standard',
    visualType: 'carbon-system',
  },
  {
    id: 'claude-ai-app',
    title: 'Claude Clone — TypeScript AI App',
    subtitle: 'AI Chat Workspace & React Architecture',
    category: 'AI & Open Source',
    year: '2025',
    role: 'TypeScript Developer',
    organization: 'Open Source',
    stack: ['TypeScript', 'AI Workflows', 'React'],
    impactMetric: 'Live AI chat workspace & open-source toolkit',
    summary:
      'Interactive Claude-inspired AI chat workspace built with TypeScript and React for structured prompt workflows and clean conversational UI.',
    highlights: [
      'Built a responsive Claude-style conversational workspace with typed response handling and clean UI architecture.',
      'Deployed live at claudeclone.ai.studio with source code available publicly under FalihaAbdulSalam on GitHub.',
    ],
    liveUrl: 'https://claudeclone.ai.studio/',
    liveLabel: 'claudeclone.ai.studio',
    repoUrl: 'https://github.com/FalihaAbdulSalam/Claude',
    repoVisibility: 'public',
    featured: false,
    bentoSpan: 'standard',
    visualType: 'claude-ai',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'cdit',
    company: 'Centre for Development of Imaging Technology (C-DIT)',
    role: 'Front-End Developer',
    period: 'Dec 2024 – Present',
    location: 'Thiruvananthapuram, India',
    summary:
      'Leading frontend architecture and UI delivery across flagship Kerala government web portals and React Native mobile apps.',
    achievements: [
      'Shipped production React, TypeScript, and React Native apps serving 10,000+ daily citizens and public officials.',
      'Connected complex frontend screens with secure government REST APIs and role-based workflows.',
      'Cut feature turnaround time by 25% by combining AI pair-programming tools with automated CI/CD checks.',
      'Strengthened release quality using end-to-end test coverage and AI-assisted code refactoring before launch.',
    ],
    stack: ['TypeScript', 'React 19', 'React Native', 'Expo', 'Tailwind CSS', 'Claude Code'],
  },
  {
    id: 'tahr-tech',
    company: 'Tahr Tech',
    role: 'Software Developer',
    period: 'Jul 2024 – Dec 2024',
    location: 'Kozhikode, India',
    summary:
      'Collaborated inside fast-moving product squads to ship reliable web features and tighten deployment quality.',
    achievements: [
      'Partnered with product owners and backend engineers to launch responsive, maintainable user interfaces on schedule.',
      'Lowered release regressions by 15% by introducing cleaner Git branching rules and pre-deploy verification checks.',
    ],
    stack: ['React', 'JavaScript', 'Git', 'CI/CD', 'Agile'],
  },
  {
    id: 'snippet',
    company: 'Snippet Commerce 360°',
    role: 'Front-End Developer',
    period: 'May 2023 – May 2024',
    location: 'Kochi, India',
    summary:
      'Crafted conversion-focused Next.js storefronts alongside streamlined admin dashboards for daily store operations.',
    achievements: [
      'Built fast e-commerce checkout and catalog journeys in Next.js backed by Redux Toolkit and secure payment flows.',
      'Tuned REST integrations and SQL-backed endpoints to noticeably reduce dashboard and storefront wait times.',
    ],
    stack: ['Next.js', 'Redux Toolkit', 'REST APIs', 'SQL', 'Tailwind CSS'],
  },
  {
    id: 'weberfox',
    company: 'WeberFox Technologies Pvt Ltd',
    role: 'Web Developer',
    period: 'Oct 2022 – March 2023',
    location: 'Kochi, India',
    summary:
      'Developed responsive web platforms and retail POS screens grounded in usability metrics and clean markup.',
    achievements: [
      'Used analytics and user feedback loops to sharpen UI responsiveness, lifting user engagement by 20%.',
      'Tracked down tricky cross-browser layout bugs and strengthened team standards through peer code reviews.',
    ],
    stack: ['React', 'JavaScript', 'HTML/CSS', 'UIkit', 'PHP'],
  },
];

export const EDUCATION = {
  institution: 'St. Thomas College of Engineering and Technology',
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  period: '2018 – 2022',
  location: 'Chengannur, India',
  cgpa: '7.63 CGPA',
};

export const SKILL_GROUPS = [
  {
    title: 'Programming & Styling',
    description: 'Clean UI engineering, modern React/Next.js stacks, mobile interfaces, and responsive design systems.',
    items: [
      'TypeScript & JavaScript',
      'React.js & React 19',
      'Next.js & Redux Toolkit',
      'React Native & Expo',
      'Node.js & Express',
      'MongoDB, SQL Server & MySQL',
      'PHP',
      'HTML5 & CSS3',
      'Tailwind CSS',
      'Bootstrap & UIkit',
    ],
  },
  {
    title: 'Tools, Motion & Hosting',
    description: 'Fluid micro-interactions, build tooling, data visualization, AI coding workflows, and deployment.',
    items: [
      'Vite',
      'Git & Bitbucket',
      'Framer Motion',
      'GSAP',
      'AmCharts5 & GeoData',
      'GitHub Copilot',
      'Claude Code',
      'Jira',
      'Hostinger',
      'MutationObserver & DOM APIs',
    ],
  },
  {
    title: 'Core Engineering Competencies',
    description: 'Practical craftsmanship from visual architecture through state sync, accessibility, and automated testing.',
    items: [
      'System Architecture',
      'Frontend Performance Optimization',
      'State Management',
      'REST API Integration',
      'Agile / Scrum Delivery',
      'Secure Authentication',
      'E2E Testing Suites',
      'Accessibility (WCAG)',
      'Bilingual Localization (EN/ML)',
      'CI/CD Best Practices',
    ],
  },
];

export const ADDITIONAL_PROJECT_GROUPS: AdditionalProjectGroup[] = [
  {
    group: 'C-DIT Web Infrastructure',
    items: [
      { name: 'Akshaya e-Governance', url: 'https://akshaya.kerala.gov.in' },
      { name: 'Fisheries Portal' },
      { name: 'Sarvavijnanakosam', url: 'https://sarvanew.cditproject.org' },
      { name: 'Kerala PSC Portal', url: 'https://pscweb.cditproject.org' },
    ],
  },
  {
    group: 'Mobile Applications (React Native)',
    items: [
      { name: 'CUSAT Candidate Verification', note: 'Biometric & credential mobile verification' },
      { name: 'Periodic Table Podcast', note: 'Educational audio streaming mobile app' },
    ],
  },
  {
    group: 'Enterprise, Fintech & Independent',
    items: [
      { name: 'CoOperative Coir', url: 'https://cooperativecoir.com' },
      { name: 'Arab Finance Service', note: 'Fintech web platform' },
      { name: 'Real Ville', note: 'Property & real-estate interface' },
      { name: 'Decision Hub', note: 'Analytics & workflow suite' },
      { name: 'Weberfox POS', note: 'Retail point-of-sale web application' },
      { name: 'Movie-Site', url: 'https://github.com/FalihaAbdulSalam/Movie-Site', note: 'Vue.js catalog' },
    ],
  },
];

export const PUBLIC_GITHUB_REPOS: PublicRepoItem[] = [
  {
    name: 'Carbon-react-project',
    account: 'FalihaAbdulSalam',
    language: 'JavaScript',
    url: 'https://github.com/FalihaAbdulSalam/Carbon-react-project',
    liveUrl: 'https://carbon-react-project.vercel.app',
    description: 'Enterprise UI application built using IBM Carbon Design System components.',
  },
  {
    name: 'Rainfall-Prediction-using-Machine-Learning',
    account: 'FalihaAbdulSalam',
    language: 'Python',
    url: 'https://github.com/FalihaAbdulSalam/Rainfall-Prediction-using-Machine-Learning',
    description: 'Predictive ML pipeline and meteorological data visualization in Python.',
  },
  {
    name: 'Movie-Site',
    account: 'FalihaAbdulSalam',
    language: 'Vue',
    url: 'https://github.com/FalihaAbdulSalam/Movie-Site',
    description: 'Interactive movie browsing and discovery interface built with Vue.',
  },
  {
    name: 'Claude',
    account: 'FalihaAbdulSalam',
    language: 'TypeScript',
    url: 'https://github.com/FalihaAbdulSalam/Claude',
    liveUrl: 'https://claudeclone.ai.studio/',
    description: 'Claude Clone conversational AI workspace built with TypeScript and React.',
  },
];
