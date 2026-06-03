"use client";

import { certifications, activities } from "@/lib/data";

const COLORS = [
  "from-orange-500 to-amber-400",
  "from-blue-500 to-sky-400",
  "from-sky-500 to-cyan-400",
  "from-emerald-500 to-green-400",
  "from-violet-500 to-purple-400",
];

export default function Certifications() {
  return (
    <div className="os-scroll h-full overflow-auto p-5 text-sm">
      <p className="mb-3 text-[var(--os-muted)]">
        $ ls Certifications/ — {certifications.length} credentials verified ✔
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <div
            key={c.name}
            className="overflow-hidden rounded-xl border border-[var(--os-border)]"
          >
            <div
              className={`flex h-20 items-center justify-center bg-gradient-to-br ${
                COLORS[i % COLORS.length]
              } text-3xl`}
            >
              🏅
            </div>
            <div className="p-3">
              <h3 className="text-xs font-semibold leading-snug">{c.name}</h3>
              <p className="mt-1 text-[10px] text-[var(--os-muted)]">{c.issuer}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-5 font-semibold os-accent">Achievements</h2>
      <div className="space-y-2">
        {activities.map((a) => (
          <div
            key={a.title}
            className="rounded-lg border border-[var(--os-border)] p-3"
          >
            <div className="text-xs font-semibold">🚀 {a.title}</div>
            <p className="mt-1 text-xs text-[var(--os-muted)]">{a.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
