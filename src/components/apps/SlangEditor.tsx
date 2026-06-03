"use client";

import { useState } from "react";
import { runSlang, SLANG_SAMPLE } from "@/lib/slang";
import { playSfx } from "@/lib/sound";

export default function SlangEditor() {
  const [code, setCode] = useState(SLANG_SAMPLE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();

  function run() {
    playSfx("success");
    const result = runSlang(code);
    setOutput(result.output);
    setError(result.error);
  }

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="flex items-center justify-between border-b border-[var(--os-border)] px-3 py-1.5">
        <span className="text-xs text-[var(--os-muted)]">
          hello.slang — SLang v1.0 (Sarthak&apos;s language)
        </span>
        <button
          onClick={run}
          className="rounded-md bg-[var(--os-accent)] px-3 py-1 text-xs font-semibold text-[#0a0e1a]"
        >
          ▶ Run (Ctrl+Enter)
        </button>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <textarea
          value={code}
          spellCheck={false}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
              e.preventDefault();
              run();
            }
          }}
          className="os-scroll h-1/2 flex-1 resize-none bg-[var(--os-bg2)] p-3 font-mono text-xs leading-relaxed outline-none md:h-full"
          style={{ fontFamily: "ui-monospace, monospace" }}
        />
        <div className="os-scroll h-1/2 flex-1 overflow-auto border-t border-[var(--os-border)] bg-black/40 p-3 font-mono text-xs md:h-full md:border-l md:border-t-0">
          <div className="mb-1 text-[10px] uppercase tracking-wide text-[var(--os-muted)]">
            output
          </div>
          {output.map((line, i) => (
            <div key={i} className="text-emerald-300">
              {line}
            </div>
          ))}
          {error && <div className="text-red-400">✖ {error}</div>}
          {output.length === 0 && !error && (
            <div className="text-[var(--os-muted)]">Press Run to execute.</div>
          )}
        </div>
      </div>
    </div>
  );
}
