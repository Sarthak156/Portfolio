import { Section, Reveal, Tag } from "./UI";
import { projects } from "../data/content";
import { FlowDiagram } from "./Doodles";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 · builds" title="Projects" note="the fun pages of the notebook">
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.12}>
            <article
              className="paper-card lift group relative flex h-full flex-col rounded-lg p-7 md:p-8"
              style={{ transform: `rotate(${i % 2 ? 0.35 : -0.35}deg)` }}
            >
              {/* index tab */}
              <span className="absolute -top-3.5 left-7 rounded-sm border border-line bg-paper-3 px-2 py-0.5 font-mono text-[10px] tracking-widest text-ink-soft">
                PROJ · {p.index}
              </span>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-accent md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="font-hand mt-0.5 text-xl text-steel">{p.subtitle}</p>
                </div>
                <div className="flex shrink-0 gap-2 pt-1">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="sketch-border-soft flex h-9 w-9 items-center justify-center bg-paper text-ink-soft transition-all hover:-rotate-6 hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
                  </a>
                </div>
              </div>

              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{p.overview}</p>

              <ul className="mt-4 space-y-2">
                {p.achievements.map((a) => (
                  <li key={a} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" aria-hidden />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              {/* architecture flow */}
              <div className="mt-5 rounded-md border border-dashed border-muted/70 bg-paper p-3.5">
                <p className="mb-2.5 font-hand text-lg leading-none text-steel">architecture sketch →</p>
                <FlowDiagram steps={p.flow} />
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                {p.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
                <span className="ml-auto hidden gap-1 font-mono text-[10px] tracking-widest text-muted uppercase sm:flex">
                  {p.tags.join(" · ")}
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 text-center">
          <a
            href="https://github.com/sarthak156"
            target="_blank"
            rel="noreferrer"
            className="ink-link font-display inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            More experiments on GitHub
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13L13 3m0 0H6m7 0v7"/></svg>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
