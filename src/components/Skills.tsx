import { Section, Reveal } from "./UI";
import { skills, certifications } from "../data/content";
import { StarMark } from "./Doodles";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="04 · toolkit" title="Skills" note="the pens & rulers">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={(i % 3) * 0.08} className="break-inside-avoid">
            <div className="paper-card rounded-lg p-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-ink">{group.category}</h3>
                {group.note && (
                  <span className="font-hand text-lg whitespace-nowrap text-steel" style={{ transform: "rotate(-1.5deg)" }}>
                    {group.note}
                  </span>
                )}
              </div>
              <div className="mt-1 h-px w-full bg-line" />
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="sketch-border-soft bg-paper px-3 py-1 text-[12.5px] text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Certifications */}
      <div id="certifications" className="mt-16 scroll-mt-24">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <StarMark className="h-5 w-5" />
            <h3 className="font-display text-2xl font-semibold text-ink">Certifications</h3>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.07}>
              <div className="group flex items-start gap-3 rounded-md border border-line bg-paper-2 p-4 transition-colors hover:border-accent/50">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="10" cy="7.5" r="4.5" />
                  <path d="M7 11l-1.8 6L10 14.6 14.8 17 13 11" />
                </svg>
                <div>
                  <p className="text-[13.5px] leading-snug font-medium text-ink">{c.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">{c.issuer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
