"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/store/os";
import { APPS, AppIcon } from "@/components/appRegistry";
import { playSfx } from "@/lib/sound";

export default function Taskbar() {
  const windows = useOS((s) => s.windows);
  const topZ = useOS((s) => s.topZ);
  const openApp = useOS((s) => s.openApp);
  const toggleFromTaskbar = useOS((s) => s.toggleFromTaskbar);
  const soundOn = useOS((s) => s.soundOn);
  const toggleSound = useOS((s) => s.toggleSound);
  const [time, setTime] = useState("");
  const [menu, setMenu] = useState(false);

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

  return (
    <>
      {menu && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setMenu(false)}
        />
      )}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] flex h-12 items-center gap-2 border-t border-[var(--os-border)] px-2"
        style={{ background: "var(--os-taskbar)", backdropFilter: "blur(12px)" }}
      >
        <button
          onClick={() => {
            setMenu((m) => !m);
            playSfx("click");
          }}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-[var(--os-border)] px-3 text-xs font-bold"
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
              className={`flex h-10 max-w-[180px] shrink-0 items-center gap-2 rounded-full border px-2.5 text-xs backdrop-blur-sm ${
                !w.minimized && w.z === topZ
                  ? "border-white/20 bg-white/10"
                  : "border-[var(--os-border)] bg-black/10 opacity-80"
              }`}
            >
              {(() => {
                const app = APPS.find((a) => a.id === w.app);
                return app ? (
                  <AppIcon app={app.id} accent={app.accent} compact />
                ) : (
                  <span>🗔</span>
                );
              })()}
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

      {menu && (
        <div
          className="os-window anim-fade fixed bottom-14 left-2 z-[9999] w-72 rounded-xl p-3 shadow-2xl"
          style={{ zIndex: 10000 }}
        >
          <div className="mb-2 text-xs font-semibold os-accent">Applications</div>
          <div className="grid grid-cols-3 gap-1">
            {APPS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  openApp(a.id);
                  setMenu(false);
                  playSfx("open");
                }}
                className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center transition hover:bg-white/8"
              >
                <AppIcon app={a.id} accent={a.accent} compact />
                <span className="text-[10px] font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
