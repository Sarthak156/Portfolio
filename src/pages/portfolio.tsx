import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Menu, X, FileText, Linkedin } from 'lucide-react';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { Mountains, ForecastArt, VisionArt } from '@/components/ink-scenes';
import { ContactForm } from '@/components/contact-form';
import { useScrollStory } from '@/hooks/use-scroll-story';
import { chapters, profile, projects, otherProjects, skills, certifications } from '@/lib/portfolio';
import landscape from '@/assets/arrival-ink.asset.json';
import triptych from '@/assets/parallax-triptych.asset.json';

function ChapterLabel({ index, subtitle }: { index: number; subtitle: string }) {
  return <div className="chapter-label"><span className="chapter-seal">{String(index + 1).padStart(2, '0')}</span><span>CHAPTER {String(index + 1).padStart(2, '0')} <span className="label-divider">/</span> {subtitle}</span></div>;
}

export function PortfolioPage() {
  const scope = useRef<HTMLDivElement>(null);
  const active = useScrollStory(scope);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - previousScrollY;

      if (currentScrollY < 20) {
        setHeaderHidden(false);
      } else if (difference > 8) {
        setHeaderHidden(true);
      } else if (difference < -8) {
        setHeaderHidden(false);
      }

      previousScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={scope} className="portfolio">
    <a className="skip-link" href="#origin">Skip to portfolio content</a>
    <header className={`site-header ${headerHidden && !menuOpen ? 'is-hidden' : ''}`}>
      <a className="brand" href="#arrival" aria-label="AKAI, back to the Arrival"><span className="brand-seal">朱</span><span>AKAI<span className="brand-dot">.</span></span></a>
      <nav className={`chapter-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Chapters">{chapters.map((chapter, i) => <a href={`#${chapter.id}`} key={chapter.id} className={active === i ? 'active' : ''} aria-current={active === i ? 'location' : undefined} onClick={() => setMenuOpen(false)}><span>{String(i + 1).padStart(2, '0')}</span>{chapter.name.replace('The ', '')}</a>)}</nav>
      <Button asChild variant="ink" className="header-resume"><Link to="/resume">Resume <ArrowUpRight /></Link></Button>
      <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menuOpen ? 'Close chapter menu' : 'Open chapter menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>
    <main>
      <section id="arrival" data-chapter className="arrival">
        <img className="arrival-landscape" src={landscape.url} alt="An original ink landscape: a red sun behind a black tree, a lone shinobi above misty mountains." fetchPriority="high" />
        <div className="arrival-birds" aria-hidden="true"><svg viewBox="0 0 180 60"><path d="M10 35q12-12 23 0 12-13 25-3M85 13q9-8 17 0 9-10 19-2M139 44q9-10 19-1 9-9 18-3" /></svg></div>
        <div className="hero-copy">
          <ChapterLabel index={0} subtitle="THE ARRIVAL" />
          <p className="hero-eyebrow">A MIND FOR DATA. A SPIRIT FOR DISCOVERY.</p>
          <h1>Sarthak<br /><span>Goyal<span className="name-period">.</span></span></h1>
          <div className="hero-role"><span className="short-line" />Data Science & ML Engineer</div>
          <p className="hero-description">Finding patterns in the unexpected.<br />Building systems that turn data into decisions.</p>
          <div className="hero-actions"><Button asChild variant="seal"><a href="#forge">Explore my work <ArrowUpRight /></a></Button><Button asChild variant="link"><a href="#horizon">Let’s connect <ArrowUpRight /></a></Button></div>
          <div className="availability"><span />Based in Indore, India · Open to opportunities</div>
        </div>
        <span className="vertical-note" aria-hidden="true">THE SCROLL OF A DATA SHINOBI</span>
        <div className="arrival-bottom"><a href="#origin" className="scroll-cue"><ArrowDown /><span>SCROLL TO BEGIN THE STORY</span></a><span className="hand-note">Every great journey begins with curiosity.</span><span className="page-index">01 — 05</span></div>
        <div className="arrival-art-story" aria-hidden="true"><div className="story-word">Observe. <em>Build.</em> Evolve.</div><div className="art-totems">{['bamboo', 'gate', 'crane'].map((motif, i) => <div className={`art-totem art-${motif}`} key={motif}><img src={triptych.url} alt="" /><span>{['01 / CURIOSITY', '02 / DISCIPLINE', '03 / POSSIBILITY'][i]}</span></div>)}</div></div>
      </section>

      <section id="origin" data-chapter className="chapter origin">
        <div className="section-heading" data-reveal><ChapterLabel index={1} subtitle="THE ORIGIN" /><h2>Before the craft,<br />there was <em>curiosity.</em></h2></div>
        <div className="origin-narrative">
          <div className="origin-scene"><span className="scene-sun" /><span className="scene-label">THE PATH IS MADE BY WALKING.</span><Mountains /><span className="hand-note">Observe. Question. Build.</span></div>
          <div className="origin-beats">
            <article data-reveal><span className="beat-number">I / THE FOUNDATION</span><h3>A student of systems.</h3><p>I’m a Computer Science undergraduate at IPS Academy, Indore, specializing in Data Science. My work lives at the intersection of machine learning, analytics and software engineering.</p><div className="education-line"><strong>B.Tech · CSE (Data Science)</strong><span>Sep 2024 — Present · CGPA 8.8</span><span>CBSE 12th · S.D.A.S.V., Indore · 2023–2024</span></div></article>
            <article data-reveal><span className="beat-number">II / THE PRACTICE</span><h3>Beyond the notebook.</h3><p>I like problems where messy, real-world data has to become a reliable, running system. From sparse-demand forecasting to computer vision and full-stack platforms, I build with reproducibility in mind.</p><blockquote>“Systems over scripts.<br />Audit before you trust.”</blockquote></article>
            <article data-reveal><span className="beat-number">III / THE DISCIPLINE</span><h3>Ship it. Then measure.</h3><p>At VE Commercial Vehicles, that mindset became a forecasting pipeline for 2,000+ spare-part SKUs and dashboards used for real inventory decisions.</p></article>
          </div>
        </div>
        <div className="toolkit" data-reveal><div className="toolkit-title"><h3>The tools of the craft.</h3><span className="hand-note">Chosen for the problem, not the trend.</span></div><div className="skill-groups">{skills.map(group => <div key={group.label}><h4>{group.label}</h4><div className="stamps">{group.values.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div><details className="certifications"><summary>Credentials & continued learning <span>+</span></summary><ul>{certifications.map(c => <li key={c}>{c}</li>)}</ul></details></div>
      </section>

      <section id="forge" data-chapter className="chapter forge">
        <div className="section-heading" data-reveal><ChapterLabel index={2} subtitle="THE FORGE" /><div className="heading-row"><h2>Forged in code.<br /><em>Proven in practice.</em></h2><p>Ideas sharpened into working systems.<br />A selection of my engineering work.</p></div></div>
        <div className="forge-track">{projects.map((project, i) => <article className="project-case" key={project.name}>
          <div className="project-topline"><span>PROJECT / {project.number}</span><span>{project.category}</span></div>
          <div className={`project-layout ${i === 1 ? 'reverse' : ''}`}><div className="project-copy" data-reveal><h3>{project.name}<span className="name-period">.</span></h3><p className="project-purpose">{project.purpose}</p><div className="project-detail"><h4>THE CHALLENGE</h4><p>{project.problem}</p><h4>THE APPROACH</h4><p>{project.approach}</p></div><div className="stamps">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><div className="project-links"><Button asChild variant="seal"><a href={project.demo} target="_blank" rel="noreferrer">Live project <ArrowUpRight /></a></Button><Button asChild variant="link"><a href={project.source} target="_blank" rel="noreferrer"><Github /> Source code</a></Button></div></div><div className="project-visual" data-reveal>{i === 0 ? <ForecastArt /> : <VisionArt />}<div className="pipeline">{project.stages.map((stage, j) => <span key={stage}>{stage}{j < project.stages.length - 1 && <ArrowUpRight />}</span>)}</div><p className="project-note">{project.note}</p></div></div>
        </article>)}
        <div className="other-work"><div className="other-work-title"><span className="beat-number">MORE FROM THE WORKBENCH</span><a href={profile.github} target="_blank" rel="noreferrer">All experiments <ArrowUpRight /></a></div>{otherProjects.map(project => <article key={project.name} data-reveal><h3>{project.name}</h3><div><p>{project.description}</p><span className="micro-label">{project.tools}</span></div><div className="other-links"><a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}><ArrowUpRight /></a><a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`}><Github /></a></div></article>)}</div></div>
      </section>

      <section id="battlefield" data-chapter className="chapter battlefield"><div className="section-heading" data-reveal><ChapterLabel index={3} subtitle="THE BATTLEFIELD" /><h2>Real data.<br /><em>Real responsibility.</em></h2></div><div className="experience-layout"><div className="experience-intro" data-reveal><span className="ink-stamp">FIELD NOTES / 2026</span><h3>VE Commercial<br />Vehicles.</h3><p className="experience-company">Eicher Group</p><p className="experience-role">Data Science Intern</p><span className="micro-label">MAY — JUL 2026 · PITHAMPUR, INDIA</span><div className="industrial-scene"><Mountains industrial /></div></div><div className="experience-details" data-reveal><p className="experience-lead">Making spare-parts demand less unpredictable.</p><p>A two-stage hybrid ML pipeline for sparse-demand vehicle spare parts, built for the aftermarket supply chain.</p><div className="experience-metrics"><div><strong>2,000+</strong><span>SPARE-PART SKUs</span></div><div><strong>~80%</strong><span>REPORTED FORECAST ACCURACY</span></div><div><strong>30+</strong><span>ENGINEERED FEATURES</span></div></div><ul><li>Engineered lag variables, rolling statistics, zero-demand streaks and cyclical calendar encodings.</li><li>Audited data leakage and refined preprocessing and modeling workflows for reliable, reproducible forecasts.</li><li>Built an Inventory Intelligence Platform with EDA, forecasting insights and inventory analytics using React, FastAPI and Python.</li></ul><span className="hand-note">Precision is a practice, not a promise.</span></div></div></section>

      <section id="horizon" data-chapter className="chapter horizon"><div className="horizon-sun" aria-hidden="true"/><div className="section-heading" data-reveal><ChapterLabel index={4} subtitle="THE NEXT HORIZON" /><h2>The next chapter<br />starts with <em>a conversation.</em></h2></div><div className="contact-layout"><div data-reveal><p className="contact-lead">Let’s build something measurable.</p><p>I’m open to Data Science, ML Engineering, Analytics and Software Development roles, internships and collaborations.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight /></a><div className="social-links"><Button variant="ink" asChild><Link to="/resume"><FileText />Resume<ArrowUpRight /></Link></Button><a href={profile.github} target="_blank" rel="noreferrer"><Github />GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a></div></div><ContactForm /></div><Mountains /></section>
    </main>
    <footer><a className="brand" href="#arrival"><span className="brand-seal">朱</span>AKAI.</a><span>© 2026 Sarthak Goyal</span><span className="hand-note">The journey continues.</span><a href="#arrival">Back to the beginning <ArrowUpRight /></a></footer>
    <nav className="chapter-rail" aria-label="Chapter progress">{chapters.map((chapter, i) => <a key={chapter.id} className={active === i ? 'active' : ''} href={`#${chapter.id}`} aria-label={`Chapter ${i + 1}: ${chapter.name}`} title={chapter.name}><span />{active === i && <small>{String(i + 1).padStart(2, '0')}</small>}</a>)}</nav>
  </div>;
}
