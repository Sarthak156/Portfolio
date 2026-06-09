"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/store/os";
import { APPS } from "@/components/appRegistry";
import { playSfx } from "@/lib/sound";

export default function Taskbar() {
  const windows = useOS((s) => s.windows);
  const topZ = useOS((s) => s.topZ);
  const toggleFromTaskbar = useOS((s) => s.toggleFromTaskbar);
  const soundOn = useOS((s) => s.soundOn);
  const toggleSound = useOS((s) => s.toggleSound);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  function openWheel() {
    window.dispatchEvent(new Event("sarthakos:open-wheel"));
    playSfx("click");
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] flex h-12 items-center gap-2 border-t border-[var(--os-border)] px-2"
      style={{ background: "var(--os-taskbar)", backdropFilter: "blur(12px)" }}
    >
      <button
        id="wheel-trigger"
        onClick={openWheel}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-[var(--os-border)] px-3 text-xs font-bold"
        title="Open App Wheel"
      >
        <span
          className="h-4 w-4 rounded-sm"
          style={{
            background: "linear-gradient(135deg, var(--os-accent), var(--os-accent2))",
          }}
        />
        Start
      </button>

      <div className="os-scroll flex flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((w) => (
          <button
            key={w.id}
            onClick={() => toggleFromTaskbar(w.id)}
            className={`flex h-9 max-w-[160px] shrink-0 items-center gap-1.5 rounded-lg border px-2 text-xs ${
              !w.minimized && w.z === topZ
                ? "border-[var(--os-accent)] bg-[var(--os-border)]"
                : "border-[var(--os-border)] opacity-70"
            }`}
          >
            <span>{APPS.find((a) => a.id === w.app)?.icon ?? "🗔"}</span>
            <span className="truncate">{w.title}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          toggleSound();
          playSfx("click");
        }}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--os-border)] text-sm"
        title="Toggle sound"
      >
        {soundOn ? "🔊" : "🔇"}
      </button>
      <div className="flex h-9 items-center rounded-lg border border-[var(--os-border)] px-3 text-xs tabular-nums">
        {time}
      </div>
    </div>
  );
}
