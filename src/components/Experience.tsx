import { Section, Reveal, Tag } from "./UI";
import { experience } from "../data/content";
import { CurvedArrow } from "./Doodles";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02 · log" title="Experience" note="learned by shipping">
      <div className="relative">
        {/* timeline spine */}
        <div className="absolute top-2 bottom-2 left-[7px] hidden w-px border-l-2 border-dashed border-muted md:block" aria-hidden />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="relative md:pl-12">
                <span className="absolute top-7 left-0 hidden h-4 w-4 rounded-full border-2 border-accent bg-paper md:block" aria-hidden />
                <div className="paper-card lift relative rounded-lg p-7 md:p-9">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{exp.role}</h3>
                      <p className="mt-1 text-[15px] font-medium text-accent">{exp.company}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">
                        {exp.period} · {exp.location}
                      </p>
                    </div>
                    <span className="font-hand hidden text-xl text-steel md:block" style={{ transform: "rotate(1.5deg)" }}>
                      internship #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-4 border-l-2 border-accent/40 pl-3 text-sm text-ink-soft italic">{exp.summary}</p>

                  <ul className="mt-5 space-y-2.5">
                    {exp.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
                        <svg viewBox="0 0 16 16" className="mt-1.5 h-3 w-3 shrink-0" fill="none" stroke="#3D6B5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M2.5 8.5l3.5 4L13.5 3" />
                        </svg>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <CurvedArrow className="absolute -right-3 -bottom-5 hidden h-12 w-12 opacity-60 lg:block" delay={0.6} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <p className="font-hand mt-10 text-2xl text-muted md:pl-12" style={{ transform: "rotate(-1deg)" }}>
            more entries coming soon…
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
