"use client";

import {
  profile,
  education,
  experience,
  skills,
  projects,
  certifications,
  activities,
} from "@/lib/data";

export default function ResumeViewer() {
  return (
    <div className="flex h-full flex-col text-sm">
      <div className="flex items-center justify-between border-b border-[var(--os-border)] px-3 py-1.5 text-xs text-[var(--os-muted)]">
        <span>Resume.pdf — 1 / 1</span>
        <button
          onClick={() => window.print()}
          className="rounded border border-[var(--os-border)] px-2 py-0.5 hover:bg-[var(--os-border)]"
        >
          🖨 Print
        </button>
      </div>
      <div className="os-scroll flex-1 overflow-auto bg-[var(--os-bg2)] p-4">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 text-slate-800 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
          <p className="text-xs text-slate-600">
            {profile.phone} · {profile.email} · {profile.location}
          </p>
          <p className="text-xs text-blue-700">
            {profile.linkedin} · {profile.github}
          </p>

          <Section title="Professional Summary">
            <p className="text-xs">{profile.summary}</p>
          </Section>

          <Section title="Education">
            {education.map((e) => (
              <div key={e.school} className="mb-1 text-xs">
                <strong>{e.degree}</strong> — {e.school} ({e.period}){" "}
                {e.cgpa ? `· ${e.cgpa}` : ""}
              </div>
            ))}
          </Section>

          <Section title="Experience">
            {experience.map((ex) => (
              <div key={ex.company} className="mb-2 text-xs">
                <strong>{ex.role}</strong> · {ex.company} ({ex.period})
                <ul className="ml-4 mt-1 list-disc">
                  {ex.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section title="Projects">
            {projects.map((p) => (
              <div key={p.id} className="mb-2 text-xs">
                <strong>{p.name}</strong>{" "}
                <span className="text-slate-500">| {p.stack.join(", ")}</span>
                <ul className="ml-4 list-disc">
                  {p.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          <Section title="Technical Skills">
            {skills.map((s) => (
              <p key={s.group} className="text-xs">
                <strong>{s.group}:</strong> {s.items.join(", ")}
              </p>
            ))}
          </Section>

          <Section title="Certifications">
            <ul className="ml-4 list-disc text-xs">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.name} | {c.issuer}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Activities & Leadership">
            {activities.map((a) => (
              <div key={a.title} className="mb-1 text-xs">
                <strong>{a.title}</strong> — {a.detail}
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 border-t border-slate-200 pt-2">
      <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-slate-900">
        {title}
      </h2>
      {children}
    </div>
  );
}
