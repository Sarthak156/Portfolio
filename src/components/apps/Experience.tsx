"use client";

import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <div className="os-scroll h-full overflow-auto p-5 text-sm">
      <p className="mb-3 text-[var(--os-muted)]">$ cat Experience/VECV-internship.ipynb</p>
      {experience.map((job) => (
        <div
          key={job.company}
          className="mb-4 rounded-xl border border-[var(--os-border)] p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-base font-bold os-accent">{job.role}</h2>
            <span className="text-xs text-[var(--os-muted)]">{job.period}</span>
          </div>
          <div className="text-xs text-[var(--os-text)]">
            {job.company} — {job.location}
          </div>
          <ul className="mt-3 space-y-2">
            {job.highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 text-[var(--os-accent)]">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
