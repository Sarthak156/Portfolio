"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/store/os";
import Window from "@/components/Window";
import Taskbar from "@/components/Taskbar";
import AppWheel from "@/components/AppWheel";
import LiveWallpaper from "@/components/LiveWallpaper";
import { playSfx } from "@/lib/sound";

export default function Desktop() {
  const windows = useOS((s) => s.windows);
  const [showWheel, setShowWheel] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [morphing, setMorphing] = useState(false);

  useEffect(() => {
    fetch("/api/visits", { method: "POST" }).catch(() => {});
    const id = setTimeout(() => setWelcome(false), 4000);
    return () => clearTimeout(id);
  }, []);

  function openWheel(animated = true) {
    if (animated) {
      setMorphing(true);
      setTimeout(() => setMorphing(false), 850);
    }
    setShowWheel(true);
  }

  useEffect(() => {
    const handler = () => openWheel(true);
    window.addEventListener("sarthakos:open-wheel", handler);
    return () => window.removeEventListener("sarthakos:open-wheel", handler);
  }, []);

  useEffect(() => {
    if (windows.length === 0 && !showWheel) {
      openWheel(true);
    }
  }, [windows.length, showWheel]);

  return (
    <div className="os-root relative h-screen w-screen overflow-hidden bg-black">
      <LiveWallpaper />

      <div className="absolute inset-0 pb-12">
        <div className="pointer-events-none absolute bottom-16 right-8 select-none text-right">
          <div className="text-5xl font-black opacity-10">SarthakOS</div>
          <div className="text-[11px] opacity-30">boot.sarthak.dev · v1.0</div>
        </div>

        {windows.map((w) => (
          <Window key={w.id} win={w} />
        ))}
      </div>

      {welcome && showWheel && (
        <div className="pointer-events-none absolute left-1/2 top-6 z-[9999] -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur">
          ✨ Hover an icon, then click to explore SarthakOS
        </div>
      )}

      {showWheel && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-slate-950/35 to-black/55"
          style={{ zIndex: 9990 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && windows.length > 0) setShowWheel(false);
          }}
        >
          <AppWheel morphing={morphing} onLaunch={() => setShowWheel(false)} />
          {windows.length > 0 && (
            <button
              onClick={() => {
                setShowWheel(false);
                playSfx("click");
              }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur hover:bg-black/90"
            >
              Back to current app
            </button>
          )}
        </div>
      )}

      <Taskbar />
    </div>
  );
}
