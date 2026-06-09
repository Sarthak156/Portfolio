"use client";

import { useOS, type Theme } from "@/store/os";
import { playSfx } from "@/lib/sound";

const THEMES: { id: Theme; name: string; desc: string; swatch: string[] }[] = [
  {
    id: "neon",
    name: "Neon",
    desc: "Cyberpunk blue/violet",
    swatch: ["#38bdf8", "#818cf8", "#0a0e1a"],
  },
  {
    id: "matrix",
    name: "Matrix",
    desc: "Hacker green terminal",
    swatch: ["#22c55e", "#4ade80", "#000700"],
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Clean macOS light",
    swatch: ["#2563eb", "#7c3aed", "#f1f5f9"],
  },
  {
    id: "retro",
    name: "Retro",
    desc: "Amber CRT terminal",
    swatch: ["#f59e0b", "#fbbf24", "#1a1205"],
  },
];

export default function Settings() {
  const theme = useOS((s) => s.theme);
  const setTheme = useOS((s) => s.setTheme);
  const soundOn = useOS((s) => s.soundOn);
  const toggleSound = useOS((s) => s.toggleSound);
  const user = useOS((s) => s.user);

  return (
    <div className="os-scroll h-full overflow-auto p-5 text-sm">
      <h2 className="mb-3 font-semibold os-accent">🎨 Appearance</h2>
      <div className="grid grid-cols-2 gap-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTheme(t.id);
              playSfx("click");
            }}
            className={`rounded-xl border p-3 text-left transition ${
              theme === t.id
                ? "border-[var(--os-accent)] ring-2 ring-[var(--os-accent)]"
                : "border-[var(--os-border)]"
            }`}
          >
            <div className="mb-2 flex gap-1">
              {t.swatch.map((c) => (
                <span
                  key={c}
                  className="h-5 w-5 rounded-full border border-white/20"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="text-xs font-semibold">{t.name}</div>
            <div className="text-[10px] text-[var(--os-muted)]">{t.desc}</div>
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-5 font-semibold os-accent">🔊 Sound</h2>
      <button
        onClick={() => {
          toggleSound();
          playSfx("click");
        }}
        className="flex w-full items-center justify-between rounded-xl border border-[var(--os-border)] p-3"
      >
        <span className="text-xs">System sounds</span>
        <span
          className={`relative h-6 w-11 rounded-full transition ${
            soundOn ? "bg-[var(--os-accent)]" : "bg-[var(--os-bg2)]"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
              soundOn ? "left-[22px]" : "left-0.5"
            }`}
          />
        </span>
      </button>

      <h2 className="mb-2 mt-5 font-semibold os-accent">ℹ️ System</h2>
      <div className="rounded-xl border border-[var(--os-border)] p-3 text-xs text-[var(--os-muted)]">
        <div>OS: SarthakOS v1.0</div>
        <div>User: {user}</div>
        <div>Kernel: React 19 / Next.js</div>
        <div>Build: portfolio-edition</div>
      </div>
    </div>
  );
}
