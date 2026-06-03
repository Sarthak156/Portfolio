"use client";

import { useEffect } from "react";
import { useOS } from "@/store/os";
import { APPS, AppIcon } from "@/components/appRegistry";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import { playSfx } from "@/lib/sound";

export default function Desktop() {
  const windows = useOS((s) => s.windows);
  const openApp = useOS((s) => s.openApp);

  useEffect(() => {
    // register a visit + welcome window
    fetch("/api/visits", { method: "POST" }).catch(() => {});
    const t = setTimeout(() => openApp("about"), 400);
    return () => clearTimeout(t);
  }, [openApp]);

  const desktopApps = APPS.filter((a) => a.onDesktop);

  return (
    <div className="os-root relative h-screen w-screen overflow-hidden pb-12">
      {/* Desktop icons */}
      <div className="absolute left-3 right-3 top-3 flex max-w-[calc(100vw-1.5rem)] flex-wrap content-start gap-1">
        {desktopApps.map((a) => (
          <button
            key={a.id}
            onDoubleClick={() => {
              openApp(a.id);
              playSfx("open");
            }}
            onTouchEnd={() => {
              openApp(a.id);
              playSfx("open");
            }}
              className="group flex w-24 flex-col items-center gap-2 rounded-2xl border border-transparent p-2 text-center transition duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/5"
          >
                <AppIcon app={a.id} accent={a.accent} />
              <span className="max-w-full truncate text-[11px] font-medium tracking-wide text-[var(--os-text)]/95 drop-shadow">
                {a.label}
              </span>
          </button>
        ))}
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-16 right-6 text-right">
        <div className="text-4xl font-black opacity-10">SarthakOS</div>
        <div className="text-xs opacity-30">boot.sarthak.dev · v1.0</div>
      </div>

      {windows.map((w) => (
        <Window key={w.id} win={w} />
      ))}

      <Taskbar />
    </div>
  );
}
