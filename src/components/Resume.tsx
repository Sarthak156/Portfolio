import { Section, Reveal } from "./UI";
import { profile, education, experience } from "../data/content";
import { CurvedArrow } from "./Doodles";

export default function Resume() {
  return (
    <Section id="resume" eyebrow="05 · document" title="Resume" note="one page, no fluff">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
        {/* mini paper preview */}
        <Reveal>
          <div className="relative">
            <div
              className="paper-card mx-auto max-w-xl rounded-sm p-8 md:p-10"
              style={{ transform: "rotate(-0.75deg)" }}
            >
              {/* fake paperclip */}
              <svg viewBox="0 0 24 48" className="absolute -top-4 right-10 h-12 w-6 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M17 10v24a5 5 0 0 1-10 0V12a3 3 0 0 1 6 0v20" />
              </svg>

              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">SARTHAK GOYAL</h3>
              <p className="mt-1 font-mono text-[11px] text-muted">
                {profile.email} · {profile.location}
              </p>
              <div className="mt-5 space-y-4 text-[12.5px] leading-relaxed text-ink-soft">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-steel uppercase">Summary</p>
                  <p className="mt-1">
                    Data Science & ML-focused CS undergraduate. Built production-ready ML pipelines and
                    forecasting systems during internship at VE Commercial Vehicles.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-steel uppercase">Experience</p>
                  <p className="mt-1 font-medium text-ink">{experience[0].role} — VECV (Eicher Group)</p>
                  <p className="text-muted">{experience[0].period}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-steel uppercase">Education</p>
                  <p className="mt-1">
                    {education.degree} · {education.gpa}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-steel uppercase">Projects</p>
                  <p className="mt-1">DamageVision · Demand Forecasting CLI · CSVPI · StudentSphere</p>
                </div>
              </div>
              <div className="mt-6 border-t border-dashed border-line pt-3 text-center font-mono text-[10px] text-muted">
                — preview · full version available below —
              </div>
            </div>
            <CurvedArrow className="absolute -right-2 -bottom-8 h-14 w-14 lg:-right-10" delay={0.4} />
          </div>
        </Reveal>

        {/* CTA side */}
        <Reveal delay={0.15}>
          <div className="lg:pt-8">
            <p className="font-hand text-3xl text-accent" style={{ transform: "rotate(-1deg)" }}>
              the formal version ↴
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Everything on this site, condensed to a single recruiter-friendly page — experience,
              projects, skills, and certifications. Open it in a new tab and save it as a PDF.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="./resume.html"
                target="_blank"
                rel="noreferrer"
                className="sketch-border lift inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-semibold text-paper-2"
                style={{ borderColor: "#2E5347" }}
              >
                Open Resume
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13L13 3m0 0H6m7 0v7"/></svg>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="sketch-border lift inline-flex items-center gap-2 bg-paper-2 px-7 py-3.5 text-sm font-semibold text-ink"
              >
                LinkedIn Profile
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-muted">
              tip: use the print button on the resume page → “Save as PDF”
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
