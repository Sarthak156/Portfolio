export const profile = {
  name: "Sarthak Goyal",
  role: "Data Science & ML Engineer",
  tagline:
    "Computer Science undergraduate building production-grade ML pipelines, forecasting systems, and data products.",
  location: "Indore, Madhya Pradesh, India",
  email: "goyalsarthak156@gmail.com",
  phone: "+91-88710 59264",
  linkedin: "https://www.linkedin.com/in/sarthak156/",
  github: "https://github.com/sarthak156",
};

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate at IPS Academy, Indore, specialising in Data Science with an 8.8 CGPA. My work sits at the intersection of machine learning, analytics, and software engineering — I like problems where messy real-world data has to become a reliable, running system.",
    "During my internship at VE Commercial Vehicles (Eicher Group), I built a hybrid ML forecasting pipeline covering 2,000+ spare-part SKUs — engineering features for sparse demand, auditing for data leakage, and shipping dashboards that people actually used to make decisions.",
    "Outside of forecasting, I've built computer-vision systems for vehicle damage detection, CLI and Streamlit tools for data analysis, and full-stack platforms. I care about reproducibility, clean pipelines, and systems that hold up beyond the notebook.",
  ],
  marginNotes: [
    "systems > scripts",
    "audit before you trust",
    "ship it, then measure",
  ],
  timeline: [
    { year: "2024", note: "Started B.Tech CSE (Data Science) @ IPS Academy" },
    { year: "2025", note: "Grinding Phase" },
    { year: "2026", note: "Data Science Intern @ VECV — Eicher Group" },
  ],
};

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  spec: "Specialization: Data Science",
  school: "IPS Academy, Indore, MP",
  period: "Sep 2024 – Present",
  gpa: "CGPA 8.8",
  prior: "CBSE 12th Board · S.D.A.S.V., Indore · 2023–2024",
};

export const experience = [
  {
    company: "VE Commercial Vehicles Ltd. (VECV) — Eicher Group",
    role: "Data Science Intern",
    location: "Pithampur, MP",
    period: "May 2026 – Jul 2026",
    summary:
      "Spare-parts demand forecasting for the aftermarket supply chain.",
    points: [
      "Built a two-stage hybrid ML forecasting pipeline for sparse-demand vehicle spare parts, achieving ~80% forecasting accuracy across 2,000+ SKUs.",
      "Engineered 30+ demand forecasting features including lag variables, rolling statistics, zero-demand streaks, and cyclical calendar encodings.",
      "Conducted data leakage audits and optimized preprocessing and modeling workflows to improve forecast reliability and reproducibility.",
      "Developed a full-stack Inventory Intelligence Platform with dashboards, EDA modules, forecasting insights, and inventory analytics using React, FastAPI, and Python.",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "Time-Series", "WMAPE", "Dashboards", "Data Science", "Data Analytics"],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  overview: string;
  achievements: string[];
  architecture: string;
  tech: string[];
  tags: string[];
  flow: string[];
  github: string;
  demo?: string;
  index: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "DamageVision",
    subtitle: "AI Car damage detection platform",
    overview:
      "An AI-powered platform that detects car damage from images using YOLOv8, then turns detections into actionable inspection artefacts.",
    achievements: [
      "Automated damage identification with a YOLOv8 detection pipeline.",
      "Generated inspection summaries and estimated repair costs per detection.",
      "Exported professional, shareable PDF inspection reports.",
    ],
    architecture:
      "Image upload → YOLOv8 inference → damage classification & cost heuristics → report generator (PDF) served via Flask.",
    flow: ["Image", "YOLOv8", "Cost Est.", "PDF Report"],
    tech: ["Python", "YOLOv8", "Computer Vision", "Flask"],
    tags: ["Computer Vision", "AI System"],
    github: "https://github.com/Sarthak156/Car_Damage_Detection",
  },
  {
    index: "02",
    title: "DemandGrid",
    subtitle: "Full-Stack Inventory Intelligence Platform",
    overview:
      "A full-stack inventory intelligence platform built for forecasting sparse vehicle spare-parts demand and generating operational insights across large-scale inventory datasets.",
    achievements: [
      "Built a sparse-demand forecasting pipeline for intermittent inventory data.",
      "Developed automated risk analysis and recommendation workflows.",
      "Designed and deployed a React + FastAPI dashboard system.",
    ],
    architecture:
      "Dataset Upload → Preprocessing Pipeline → Forecast Engine → Risk & Recommendation Layer → Analytics Dashboard → Export System",
    flow: ["~34K SKUs", "Forecast Engine", "Risk Analytics", "Recommendations", "Export Reports",],
    tech: ["Python", "Pandas", "FastAPI", "React", "Scikit-learn", "Vercel",],
    tags: ["Forecasting", "ML Engineering"],
    github: "https://github.com/Sarthak156/Inventory-Intelligence-Platform",
  },
  {
    index: "03",
    title: "CSVPI",
    subtitle: "CSV analysis pipeline & Streamlit app",
    overview:
      "A Python CLI and Streamlit application for cleaning, analysing, and visualising CSV datasets with a modular pipeline design.",
    achievements: [
      "Cut manual data-analysis time by ~60% through automation.",
      "Modular pipeline: cleaning, profiling, plotting, and reporting stages.",
      "Dual interface — scriptable CLI plus interactive Streamlit UI.",
    ],
    architecture:
      "CSV in → cleaning & validation stage → EDA/profiling stage → Matplotlib visualisations → automated report out.",
    flow: ["CSV", "Clean", "Analyse", "Report"],
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    tags: ["Analytics", "Tooling"],
    github: "https://github.com/Sarthak156/CSVPI",
  },
  {
    index: "04",
    title: "StudentSphere",
    subtitle: "Full-stack student management platform",
    overview:
      "A student management platform with grading, community chat, an admin dashboard, and dark/light theme support.",
    achievements: [
      "Responsive full-stack system built on Flask with Supabase backend services.",
      "Role-aware admin dashboard for grading and management workflows.",
      "Community chat and theming for a complete product feel.",
    ],
    architecture:
      "Flask app server → Supabase (auth, database, realtime) → responsive UI with admin, grading, and chat modules.",
    flow: ["Flask", "Supabase", "Dashboard", "Chat"],
    tech: ["Flask", "Supabase", "Full-Stack"],
    tags: ["Full-Stack", "Dashboards"],
    github: "https://github.com/Sarthak156/StudentSphere",
  },
];

export const skills = [
  {
    category: "Languages",
    note: "daily drivers",
    items: ["Python", "SQL", "Java", "C", "C++"],
  },
  {
    category: "ML & AI",
    note: "the core toolkit",
    items: [
      "Scikit-learn",
      "Classification",
      "Regression",
      "Ensemble Methods",
      "Feature Engineering",
      "Cross-Validation",
    ],
  },
  {
    category: "Data & Analytics",
    note: "where insight lives",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "EDA",
      "Time-Series Forecasting",
      "Demand Forecasting",
      "WMAPE / MAPE",
    ],
  },
  {
    category: "Backend & Frameworks",
    note: "serving the models",
    items: ["Spring Boot", "JPA", "REST APIs", "FastAPI", "Flask"],
  },
  {
    category: "Databases",
    note: "",
    items: ["MySQL", "MariaDB", "Supabase"],
  },
  {
    category: "Cloud & Platforms",
    note: "deploy & scale",
    items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM", "Google Colab"],
  },
  {
    category: "Reporting & Visualization",
    note: "tell the story",
    items: ["Power BI", "Excel", "HTML Dashboards", "DOCX Report Generation"],
  },
];

export const certifications = [
  { title: "AWS Core Services & Architecture", issuer: "Amazon Web Services" },
  { title: "Data Fundamentals", issuer: "IBM SkillsBuild" },
  { title: "Introduction to Data Science", issuer: "Cisco Networking Academy" },
  { title: "Python (Basic)", issuer: "HackerRank" },
  {
    title: "Intro to Data Science Job Simulation — Commonwealth Bank",
    issuer: "Forage",
  },
  { title: "Problem Solving (Basic)", issuer: "HackerRank" },
];
