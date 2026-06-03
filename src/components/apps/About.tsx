"use client";

import { profile, education, languages } from "@/lib/data";
import { useOS } from "@/store/os";

export default function About() {
  const openApp = useOS((s) => s.openApp);
  return (
    <div className="os-scroll h-full overflow-auto p-5 text-sm leading-relaxed">
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, var(--os-accent), var(--os-accent2))",
            color: "#0a0e1a",
          }}
        >
          SG
        </div>
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-[var(--os-muted)]">{profile.title}</p>
          <p className="text-xs text-[var(--os-muted)]">📍 {profile.location}</p>
        </div>
      </div>

      <p className="mb-4 text-[var(--os-text)]">{profile.summary}</p>

      <h2 className="mb-2 font-semibold os-accent">$ education</h2>
      <ul className="mb-4 space-y-2">
        {education.map((e) => (
          <li key={e.school} className="rounded-lg border border-[var(--os-border)] p-2">
            <div className="font-medium">{e.degree}</div>
            <div className="text-xs text-[var(--os-muted)]">
              {e.school} · {e.period}
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mb-2 font-semibold os-accent">$ languages</h2>
      <ul className="mb-4 flex flex-wrap gap-2">
        {languages.map((l) => (
          <li
            key={l.name}
            className="rounded-full border border-[var(--os-border)] px-3 py-1 text-xs"
          >
            {l.name} — {l.level}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => openApp("projects")}
          className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
        >
          📂 View Projects
        </button>
        <button
          onClick={() => openApp("ai")}
          className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
        >
          🤖 Ask SarthakAI
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
        >
          ✉️ Email
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
        >
          🔗 LinkedIn
        </a>
      </div>
    </div>
  );
}
