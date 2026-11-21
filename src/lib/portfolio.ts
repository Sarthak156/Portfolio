export const profile = {
  name: 'Sarthak Goyal',
  email: 'goyalsarthak156@gmail.com',
  github: 'https://github.com/sarthak156',
  linkedin: 'https://www.linkedin.com/in/sarthak156/',
  resume: '/resume',
  phone: '+91-88710 59264',
  location: 'Indore, Madhya Pradesh, India',
  summary: 'Data Science and ML-focused Computer Science undergraduate skilled in Python, SQL, and Scikit-learn. Built production-ready ML pipelines and forecasting systems during internship at VE Commercial Vehicles. Interested in Data Science, Data Analytics, ML Engineering, and Software Development roles.',
};

export const chapters = [
  { id: 'arrival', name: 'The Arrival' },
  { id: 'origin', name: 'The Origin' },
  { id: 'forge', name: 'The Forge' },
  { id: 'battlefield', name: 'The Battlefield' },
  { id: 'horizon', name: 'The Next Horizon' },
];

export const projects = [
  { name: 'DemandGrid', category: 'Forecasting · ML Engineering', purpose: 'Turning intermittent demand into inventory intelligence.', problem: 'Vehicle spare-parts demand is sparse and irregular. Reliable inventory decisions need more than a single forecast.', approach: 'A sparse-demand forecasting pipeline connects inventory datasets to automated risk analysis, operational recommendations and exportable reports.', tools: ['Python', 'Pandas', 'Scikit-learn', 'FastAPI', 'React'], stages: ['Inventory data', 'Forecast engine', 'Risk analytics', 'Recommendations'], demo: 'https://demandgrid.vercel.app/', source: 'https://github.com/Sarthak156/Inventory-Intelligence-Platform', note: 'Full-stack React + FastAPI dashboard', number: '01' },
  { name: 'DamageVision', category: 'Computer Vision · AI System', purpose: 'From a photograph to an actionable vehicle inspection.', problem: 'Identifying vehicle damage manually makes inspection inconsistent and time-consuming.', approach: 'A YOLOv8 detection pipeline identifies damage in uploaded images, estimates repair costs and produces shareable PDF inspection reports.', tools: ['Python', 'YOLOv8', 'Computer Vision', 'Flask'], stages: ['Vehicle image', 'YOLOv8 detection', 'Cost estimation', 'PDF report'], demo: 'https://damagevision.vercel.app/', source: 'https://github.com/Sarthak156/Car_Damage_Detection', note: 'Image-based detection · PDF inspection reports', number: '02' },
];

export const otherProjects = [
  { name: 'CSVPI', description: 'A modular CSV cleaning, profiling, plotting and reporting pipeline. CLI and Streamlit interfaces; reported ~60% less manual analysis time.', tools: 'Python / Pandas / Matplotlib / Streamlit', demo: 'https://csv-pi.streamlit.app/', source: 'https://github.com/Sarthak156/CSVPI' },
  { name: 'StudentSphere', description: 'A full-stack student platform with grading, role-aware administration, community chat and theme support.', tools: 'Flask / Supabase / Full-stack', demo: 'https://student-sphere-beta.vercel.app/', source: 'https://github.com/Sarthak156/StudentSphere' },
];

export const skills = [
  { label: 'Languages', values: ['Python', 'SQL', 'Java', 'C', 'C++'] },
  { label: 'Machine learning', values: ['Scikit-learn', 'Regression', 'Classification', 'Ensembles', 'Feature Engineering', 'Cross-Validation'] },
  { label: 'Data & analytics', values: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Time Series', 'WMAPE / MAPE'] },
  { label: 'Engineering', values: ['FastAPI', 'Flask', 'Spring Boot', 'JPA', 'REST APIs', 'MySQL', 'MariaDB', 'Supabase'] },
  { label: 'Cloud & reporting', values: ['AWS EC2', 'S3', 'Lambda', 'IAM', 'Google Colab', 'Power BI', 'Excel', 'HTML Dashboards', 'DOCX Reports'] },
];

export const certifications = ['AWS Core Services & Architecture — Amazon Web Services', 'Data Fundamentals — IBM SkillsBuild', 'Introduction to Data Science — Cisco', 'Python (Basic) — HackerRank', 'Data Science Job Simulation — Commonwealth Bank / Forage', 'Problem Solving (Basic) — HackerRank'];