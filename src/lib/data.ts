export const profile = {
  name: "Sarthak Goyal",
  title:
    "Data Science & ML-focused Computer Science Undergraduate",
  phone: "+91-88710-59264",
  email: "goyalsarthak156@gmail.com",
  linkedin: "https://linkedin.com/in/sarthak156",
  github: "https://github.com/goyalsarthak156",
  location: "Indore, Madhya Pradesh, India",
  summary:
    "Data Science and ML-focused Computer Science undergraduate skilled in Python, SQL, and Scikit-learn. Built production-ready ML pipelines and forecasting systems during an internship at VE Commercial Vehicles. Interested in Data Science, Data Analytics, ML Engineering, and Software Development roles.",
};

export const education = [
  {
    school: "IPS Academy, Indore",
    degree: "B.Tech, Computer Science & Engineering — Data Science specialization",
    cgpa: "CGPA: 8.8",
    period: "Sep 2024 – Present",
  },
  {
    school: "S.D.A.S.V, Indore",
    degree: "CBSE 12th Board",
    period: "2023 – 2024",
  },
];

export const experience = [
  {
    role: "Data Science Intern",
    company: "VE Commercial Vehicles Ltd. (VECV) — Eicher Group",
    location: "Pithampur, MP",
    period: "May 2025 – July 2025",
    highlights: [
      "Built a hybrid ML forecasting pipeline with ~80% accuracy across 2,000+ spare-part SKUs.",
      "Engineered 30+ features (lag variables, rolling statistics, zero-demand streaks, calendar encodings) for sparse demand forecasting.",
      "Performed data-leakage audits and fixed preprocessing issues for reliable, reproducible pipelines.",
      "Developed dashboards and EDA reports for business stakeholders.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C", "C++", "SQL"] },
  {
    group: "ML & AI",
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
    group: "Data & Analytics",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "EDA",
      "Time-Series Forecasting",
      "Demand Forecasting",
      "WMAPE",
      "MAPE",
    ],
  },
  { group: "Databases", items: ["MySQL", "MariaDB"] },
  {
    group: "Backend & Frameworks",
    items: ["Spring Boot", "JPA", "REST APIs", "FastAPI"],
  },
  {
    group: "Cloud & Platforms",
    items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM", "Google Colab"],
  },
  {
    group: "Reporting & Viz",
    items: ["Excel", "Power BI", "HTML dashboards", "DOCX/PDF reports"],
  },
];

export type Project = {
  id: string;
  name: string;
  stack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "damage-vision",
    name: "DamageVision",
    stack: ["Python", "YOLOv8", "Computer Vision", "Flask"],
    highlights: [
      "AI-powered vehicle damage detection platform using YOLOv8 for automated damage identification.",
      "Generates inspection summaries, estimates repair costs, and exports professional PDF reports.",
    ],
  },
  {
    id: "demand-forecasting",
    name: "Vehicle Parts Demand Forecasting CLI",
    stack: ["Python", "Pandas", "ARIMA", "Scikit-learn", "openpyxl"],
    highlights: [
      "Forecasting system for 2,000+ demand segments using ARIMA, Holt-Winters, and regression models on ~1M records.",
      "Automated Excel-based accuracy reporting to compare model performance and improve forecasting strategy.",
    ],
  },
  {
    id: "csvpi",
    name: "CSVPI",
    stack: ["Python", "Pandas", "Matplotlib", "Streamlit"],
    highlights: [
      "Python CLI and Streamlit application for cleaning, analysing, and visualizing CSV datasets.",
      "Reduced manual analysis time by ~60% through a modular pipeline and automated reporting.",
    ],
  },
  {
    id: "student-sphere",
    name: "StudentSphere",
    stack: ["Flask", "Supabase"],
    highlights: [
      "Student management platform with grading, community chat, admin dashboard, and dark/light themes.",
      "Responsive full-stack system built with Flask and Supabase backend services.",
    ],
  },
];

export const certifications = [
  { name: "AWS Core Services & Architecture", issuer: "Amazon Web Services" },
  { name: "Data Fundamentals", issuer: "IBM Skill Build" },
  { name: "Introduction to Data Science", issuer: "Cisco Networking Academy" },
  { name: "Python (Basic)", issuer: "HackerRank" },
  {
    name: "Commonwealth Bank — Data Science Job Simulation",
    issuer: "Forage",
  },
  { name: "Problem Solving (Basic)", issuer: "HackerRank" },
];

export const activities = [
  {
    title: "ML / Time-Series Research",
    detail:
      "Designing forecasting pipelines, leakage audits, and feature-engineering experiments for spare-parts and retail demand datasets.",
  },
  {
    title: "Cloud & Self-Study Initiative",
    detail:
      "Earned 6+ industry certifications within the first year of college (AWS, IBM, Cisco) — initiative well beyond the academic curriculum.",
  },
];

export const languages = [
  { name: "English", level: "Working Proficiency" },
  { name: "Hindi", level: "Native / Full" },
];

export const systemMetrics = [
  { label: "Data Science Mana", value: 89 },
  { label: "Coffee Dependency", value: 82 },
  { label: "Forecasting Accuracy", value: 80 },
  { label: "Feature Engineering", value: 91 },
  { label: "Sleep Levels", value: 22 },
  { label: "Curiosity Index", value: 98 },
];
