import { ArrowLeft, ArrowUpRight, Printer, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/link';
import { profile, projects, otherProjects, skills, certifications } from '@/lib/portfolio';

export function ResumePage() {
  return <div className="resume-page">
    <header className="resume-toolbar"><Button asChild variant="ink"><Link to="/"><ArrowLeft />Portfolio</Link></Button><span className="brand"><span className="brand-seal">朱</span>AKAI.</span><Button variant="seal" onClick={() => window.print()}><Printer />Print / Save PDF</Button></header>
    <main className="resume-sheet">
      <div className="resume-heading"><span className="beat-number">DATA SCIENCE / MACHINE LEARNING</span><h1>{profile.name}<span className="name-period">.</span></h1><p>{profile.location} · {profile.phone}</p><div className="resume-contact"><a href={`mailto:${profile.email}`}><Mail />{profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn<ArrowUpRight /></a><a href={profile.github} target="_blank" rel="noreferrer"><Github />GitHub<ArrowUpRight /></a></div></div>
      <section className="resume-summary"><h2>Profile</h2><p>{profile.summary}</p></section>
      <div className="resume-columns"><div>
        <section><h2>Experience</h2><div className="resume-entry"><span className="micro-label">MAY — JUL 2026 · PITHAMPUR, INDIA</span><h3>Data Science Intern</h3><p className="resume-employer">VE Commercial Vehicles Ltd. · Eicher Group</p><ul><li>Built a hybrid ML forecasting pipeline with reported ~80% accuracy across 2,000+ spare-part SKUs.</li><li>Engineered 30+ features including lags, rolling statistics, zero-demand streaks and calendar encodings.</li><li>Audited data leakage and refined preprocessing and modelling workflows for reliability and reproducibility.</li><li>Developed an Inventory Intelligence Platform with dashboards, EDA, forecasting insights and inventory analytics using React, FastAPI and Python.</li></ul></div></section>
        <section><h2>Selected projects</h2>{projects.map(project => <article className="resume-entry" key={project.name}><h3><a href={project.demo} target="_blank" rel="noreferrer">{project.name}<ArrowUpRight /></a></h3><span className="micro-label">{project.tools.join(' / ')}</span><p>{project.approach}</p><a className="resume-source" href={project.source} target="_blank" rel="noreferrer">Source code <ArrowUpRight /></a></article>)}{otherProjects.map(project => <article className="resume-entry" key={project.name}><h3><a href={project.demo} target="_blank" rel="noreferrer">{project.name}<ArrowUpRight /></a></h3><span className="micro-label">{project.tools}</span><p>{project.description}</p></article>)}</section>
      </div><aside>
        <section><h2>Education</h2><article className="resume-entry"><h3>B.Tech · CSE</h3><p>IPS Academy, Indore<br />Specialization: Data Science</p><span className="micro-label">SEP 2024 — PRESENT · CGPA 8.8</span></article><article className="resume-entry"><h3>CBSE 12th</h3><p>S.D.A.S.V., Indore</p><span className="micro-label">2023 — 2024</span></article></section>
        <section><h2>Technical skills</h2>{skills.map(group => <div className="resume-skill" key={group.label}><h4>{group.label}</h4><p>{group.values.join(' · ')}</p></div>)}</section>
        <section><h2>Certifications</h2><ul className="resume-credentials">{certifications.map(c => <li key={c}>{c}</li>)}</ul></section>
      </aside></div>
      <div className="resume-end"><span className="brand-seal">朱</span><span>Sarthak Goyal · {profile.email}</span></div>
    </main>
  </div>;
}