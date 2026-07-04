import { motion } from "framer-motion";
import { profile } from "../data/content";
import { CircleScribble, CurvedArrow, CrossMark, HeroDiagram, StarMark } from "./Doodles";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="dotgrid relative overflow-hidden">
      {/* sparse blueprint crosses */}
      <CrossMark className="absolute top-28 left-[8%] h-4 w-4 opacity-70" delay={1.6} />
      <CrossMark className="absolute right-[12%] bottom-24 h-4 w-4 opacity-70" delay={2} />
      <CrossMark className="absolute top-[55%] left-[4%] hidden h-3 w-3 opacity-60 lg:block" delay={2.3} />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pt-28 pb-16 md:px-10 lg:flex-row lg:items-center lg:gap-8 lg:pt-16">
        <motion.div initial="hidden" animate="visible" className="max-w-2xl flex-1">
          <motion.p variants={fadeUp} custom={0.1} className="font-hand text-2xl text-accent" style={{ transform: "rotate(-1deg)" }}>
            hello, I'm — an engineer who keeps a journal ↓
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={0.25}
            className="mt-4 font-display text-5xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            Sarthak
            <br />
            <span className="relative inline-block">
              Goyal
              <CircleScribble className="pointer-events-none absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)]" delay={1.2} />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={0.4} className="mt-6 font-display text-xl font-medium text-accent md:text-2xl">
            {profile.role}
          </motion.p>

          <motion.p variants={fadeUp} custom={0.5} className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft md:text-base">
            {profile.tagline} Most recently: a hybrid forecasting pipeline for{" "}
            <strong className="font-semibold text-ink">2,000+ SKUs</strong> at VE Commercial Vehicles
            (Eicher Group).
          </motion.p>

          <motion.div variants={fadeUp} custom={0.65} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#resume"
              className="sketch-border lift inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-paper-2"
              style={{ borderColor: "#2E5347" }}
            >
              View Resume
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M3 14h10" />
              </svg>
            </a>
            <a href="#contact" className="sketch-border lift inline-flex items-center gap-2 bg-paper-2 px-6 py-3 text-sm font-semibold text-ink">
              Contact Me
            </a>
            <div className="ml-1 flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-ink-soft transition-colors hover:text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-ink-soft transition-colors hover:text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-ink-soft transition-colors hover:text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.85} className="mt-10 flex items-center gap-2 font-mono text-xs text-muted">
            <StarMark className="h-4 w-4" delay={2.6} stroke="#B7B1A5" />
            <span>{profile.location} · open to Data Science, ML & SDE roles</span>
          </motion.div>
        </motion.div>

        {/* right: sketch diagram */}
        <div className="relative mt-12 hidden flex-1 lg:block">
          <div className="relative mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, rotate: -2, y: 20 }}
              animate={{ opacity: 1, rotate: -1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="paper-card rounded-lg p-7"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">fig. 01 — the daily loop</span>
                <span className="font-hand text-lg text-steel">v2.4</span>
              </div>
              <HeroDiagram className="w-full" />
            </motion.div>
            <CurvedArrow className="absolute -bottom-10 -left-14 h-14 w-16" delay={3.2} flip />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 }}
              className="absolute -bottom-16 -left-24 font-hand text-xl text-steel"
              style={{ transform: "rotate(-4deg)" }}
            >
              this loop, every day
            </motion.span>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.2 } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted transition-colors hover:text-accent md:flex"
        aria-label="Scroll to about"
      >
        <span className="font-hand text-lg">scroll</span>
        <motion.svg
          viewBox="0 0 16 24"
          className="h-5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <path d="M8 2v18m0 0l-5-5m5 5l5-5" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
