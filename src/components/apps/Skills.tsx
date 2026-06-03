"use client";

import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <div className="os-scroll h-full overflow-auto p-5 text-sm">
      <p className="mb-4 text-[var(--os-muted)]">
        $ cat stack.json — runtime capabilities loaded into SarthakOS
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.group}
            className="rounded-xl border border-[var(--os-border)] p-3"
          >
            <h3 className="mb-2 font-semibold os-accent">{group.group}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--os-border)] bg-[var(--os-bg2)] px-2 py-0.5 text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
