import { Section, Reveal } from "./UI";
import { about, education } from "../data/content";
import { Squiggle } from "./Doodles";

export default function About() {
  return (
    <Section id="about" eyebrow="01 · entry" title="About" note="who's writing this journal?">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* main notes */}
        <Reveal>
          <div className="paper-card margin-rule relative rounded-lg p-8 pl-14 md:p-10 md:pl-16">
            <span className="absolute top-6 right-8 font-hand text-lg text-muted" style={{ transform: "rotate(2deg)" }}>
              — field notes
            </span>
            <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft">
              {about.paragraphs.map((p, i) => (
                <p key={i}>
                  {i === 0 ? (
                    <>
                      <span className="font-hand float-none mr-1 text-2xl text-accent">§</span>
                      {p}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>
            <Squiggle className="mt-8 h-3 w-28" />
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {about.marginNotes.map((n, i) => (
                <span
                  key={n}
                  className="font-hand text-xl text-steel"
                  style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                >
                  “{n}”
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* sidebar: education + mini timeline */}
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="paper-card rounded-lg p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-steel uppercase">Education</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{education.degree}</h3>
              <p className="mt-1 text-sm text-ink-soft">{education.school}</p>
              <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="sketch-border-soft bg-paper px-3 py-1 font-mono text-xs text-ink-soft">{education.spec}</span>
                <span className="font-hand text-xl font-semibold text-accent" style={{ transform: "rotate(-2deg)" }}>
                  {education.gpa} ✓
                </span>
              </div>
              <p className="mt-4 border-t border-line pt-3 text-xs text-muted">{education.prior}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="paper-card rounded-lg p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-steel uppercase">Timeline · so far</p>
              <ul className="mt-4 space-y-4">
                {about.timeline.map((t) => (
                  <li key={t.year} className="flex gap-4">
                    <span className="font-hand pt-0.5 text-xl font-semibold text-accent">{t.year}</span>
                    <div className="relative flex-1 border-l border-dashed border-muted pb-1 pl-4">
                      <span className="absolute top-2 -left-[4.5px] h-2 w-2 rounded-full bg-accent" />
                      <p className="text-sm leading-snug text-ink-soft">{t.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
