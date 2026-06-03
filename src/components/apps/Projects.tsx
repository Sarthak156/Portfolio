"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { useOS } from "@/store/os";
import { playSfx } from "@/lib/sound";

export default function Projects({ payload }: { payload?: string }) {
  const [active, setActive] = useState<string | null>(payload ?? null);
  const openApp = useOS((s) => s.openApp);

  const current = projects.find((p) => p.id === active);

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="os-scroll flex gap-2 overflow-x-auto border-b border-[var(--os-border)] p-2">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActive(p.id);
              playSfx("click");
            }}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs ${
              active === p.id
                ? "bg-[var(--os-accent)] text-[#0a0e1a]"
                : "border border-[var(--os-border)] hover:bg-[var(--os-border)]"
            }`}
          >
            {p.name.split(" ").slice(0, 3).join(" ")}
          </button>
        ))}
      </div>

      <div className="os-scroll flex-1 overflow-auto p-5">
        {!current ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className="rounded-xl border border-[var(--os-border)] p-4 text-left transition hover:scale-[1.02]"
              >
                <div className="mb-1 text-2xl">📦</div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-[var(--os-muted)]">
                  {p.stack.join(" · ")}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="anim-fade">
            <h2 className="text-lg font-bold">{current.name}</h2>
            <div className="my-2 flex flex-wrap gap-1.5">
              {current.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[var(--os-border)] bg-[var(--os-bg2)] px-2 py-0.5 text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
            <ul className="mt-3 space-y-2">
              {current.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="os-accent">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setActive(null)}
                className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
              >
                ← All Projects
              </button>
              <button
                onClick={() => openApp("ai")}
                className="rounded-lg border border-[var(--os-border)] px-3 py-1.5 text-xs hover:bg-[var(--os-border)]"
              >
                🤖 Ask AI about this
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
