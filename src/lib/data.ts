export const profile = {
  name: "Sarthak Goyal",
  title: "Computer Science Undergraduate · Python / Data Science / Backend",
  phone: "+91-8871059264",
  email: "goyalsarthak156@gmail.com",
  linkedin: "https://linkedin.com/in/sarthak156",
  location: "Indore, Madhya Pradesh, India",
  summary:
    "Computer Science undergraduate at IPS Academy with hands-on experience in Python, SQL, and data science fundamentals. Familiar with backend development and basic machine learning concepts. Interested in building practical projects and improving problem-solving skills through real-world experience.",
};

export const education = [
  {
    school: "IPS Academy, Indore",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2024 - Present",
  },
  {
    school: "S.D.A.S.V, Indore",
    degree: "CBSE 12th Board",
    period: "2024",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C", "C++", "SQL"] },
  {
    group: "Backend & Frameworks",
    items: ["Spring Boot", "JPA", "REST APIs"],
  },
  {
    group: "Machine Learning & AI",
    items: [
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Statistical Modeling",
      "Prompt Engineering",
      "LLMs",
    ],
  },
  {
    group: "Cloud & Platforms",
    items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM", "Google Colab"],
  },
  { group: "Databases", items: ["MySQL", "MariaDB"] },
  {
    group: "Developer Tools",
    items: ["Git", "GitHub", "Jupyter", "IntelliJ IDEA", "VS Code"],
  },
  {
    group: "Core CS",
    items: ["Data Structures", "Algorithms", "OOP", "Debugging"],
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
    id: "data-cli",
    name: "Python Data Analysis CLI Tool",
    stack: ["Python", "Pandas", "Matplotlib"],
    highlights: [
      "Command-line application to parse, clean, and visualize CSV datasets of 1,000+ records.",
      "Automated descriptive statistics, trend detection, and chart generation across 4+ reusable modules.",
      "Reduced manual analysis time by ~60%.",
    ],
  },
  {
    id: "prompt-eng",
    name: "Generative AI Prompt Engineering Experiments",
    stack: ["Python", "LLM APIs"],
    highlights: [
      "Designed and documented prompt engineering techniques across 10+ use-case scenarios.",
      "Improved LLM output relevance by over 40% compared to baseline prompts.",
      "Applied knowledge from Google's Generative AI certification.",
    ],
  },
  {
    id: "student-predictor",
    name: "Student Performance Predictor",
    stack: ["Python", "Scikit-learn", "NumPy"],
    highlights: [
      "End-to-end ML pipeline using linear regression and decision tree classifiers.",
      "Predicts student academic outcomes with 82% classification accuracy.",
      "Feature engineering on a dataset of 200+ records.",
    ],
  },
];

export const certifications = [
  { name: "AWS Core Services & Architecture", issuer: "Amazon Web Services" },
  { name: "Introduction to Generative AI", issuer: "Google Cloud" },
  { name: "The Basics of Google Cloud Compute", issuer: "Google Cloud" },
  { name: "Programming with Python 3.X", issuer: "SimplyLearn" },
  { name: "Python (Basic)", issuer: "HackerRank" },
];

export const activities = [
  {
    title: "Competitive Programming",
    detail:
      "Solved 50+ algorithmic problems across arrays, linked lists, recursion, and dynamic programming on LeetCode & HackerRank — consistently targeting medium+ difficulty.",
  },
  {
    title: "Cloud & AI Self-Study Initiative",
    detail:
      "Earned 6 industry certifications within the first year of college, including AWS and 2 Google Cloud credentials — initiative well beyond the academic curriculum.",
  },
];

export const languages = [
  { name: "English", level: "Working Proficiency" },
  { name: "Hindi", level: "Native / Full" },
];

// Fun "system metrics" for the System Monitor app
export const systemMetrics = [
  { label: "Creativity Usage", value: 92 },
  { label: "Coffee Dependency", value: 78 },
  { label: "Debugging Resistance", value: 61 },
  { label: "Caffeine-to-Code Ratio", value: 84 },
  { label: "Sleep Levels", value: 24 },
  { label: "Curiosity Index", value: 97 },
];
