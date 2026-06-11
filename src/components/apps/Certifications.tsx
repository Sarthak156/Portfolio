"use client";

import { certifications } from "@/lib/data";

export default function Certs() {
  return (
    <div className="os-scroll h-full overflow-auto p-4">
      <p className="mb-4 text-xs text-[var(--os-muted)]">
        Industry certifications & independent learning.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {certifications.map((c, i) => {
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] p-3"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[var(--os-border)] text-xl">
                🏅
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[var(--os-text)]">
                  {c.name}
                </span>
                <span className="text-[10px] text-[var(--os-muted)]">
                  {c.issuer}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
