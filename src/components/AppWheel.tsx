"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import type { CSSProperties } from "react";
import {
  Activity,
  Award,
  Brain,
  Briefcase,
  Bug,
  Code,
  FileText,
  Folder,
  MessageSquareText,
  Package,
  Settings,
  Terminal,
  User,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useOS, type AppId } from "@/store/os";
import { playSfx } from "@/lib/sound";

type WheelApp = {
  id: AppId;
  label: string;
  icon: LucideIcon;
  accent: string;
  accent2: string;
};

const APPS: WheelApp[] = [
  { id: "about", label: "About", icon: User, accent: "#ff4fd8", accent2: "#40e9ff" },
  { id: "experience", label: "Experience", icon: Briefcase, accent: "#c084fc", accent2: "#22d3ee" },
  { id: "projects", label: "Projects", icon: Package, accent: "#a855f7", accent2: "#2dd4bf" },
  { id: "skills", label: "Skills", icon: Wrench, accent: "#60a5fa", accent2: "#f472b6" },
  { id: "resume", label: "Resume", icon: FileText, accent: "#fb7185", accent2: "#f0abfc" },
  { id: "certs", label: "Certifications", icon: Award, accent: "#facc15", accent2: "#e879f9" },
  { id: "terminal", label: "Terminal", icon: Terminal, accent: "#22c55e", accent2: "#38bdf8" },
  { id: "ai", label: "SarthakAI", icon: Brain, accent: "#22d3ee", accent2: "#c084fc" },
  { id: "files", label: "Files", icon: Folder, accent: "#38bdf8", accent2: "#818cf8" },
  { id: "monitor", label: "System Monitor", icon: Activity, accent: "#f97316", accent2: "#22d3ee" },
  { id: "slang", label: "SLang Studio", icon: Code, accent: "#a3e635", accent2: "#c084fc" },
  { id: "game", label: "Bug Hunter", icon: Bug, accent: "#f472b6", accent2: "#fb7185" },
  { id: "guestbook", label: "Guestbook", icon: MessageSquareText, accent: "#2dd4bf", accent2: "#f472b6" },
  { id: "settings", label: "Settings", icon: Settings, accent: "#94a3b8", accent2: "#a78bfa" },
];

export default function AppWheel({
  onLaunch,
  morphing = false,
}: {
  onLaunch?: () => void;
  morphing?: boolean;
}) {
  const [angle, setAngle] = useState(0);
  const [hovered, setHovered] = useState<AppId | null>(null);
  const openApp = useOS((s) => s.openApp);

  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startPointerAngle, setStartPointerAngle] = useState(0);
  const [startWheelAngle, setStartWheelAngle] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const activeApp = useMemo(
    () => APPS.find((a) => a.id === hovered) ?? null,
    [hovered]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setAngle((a) => a + 360 / APPS.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setAngle((a) => a - 360 / APPS.length);
      } else if (e.key === "Enter" && hovered) {
        openApp(hovered);
        playSfx("open");
        onLaunch?.();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hovered, openApp, onLaunch]);

  const getPointerAngle = (clientX: number, clientY: number) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    setHasDragged(false);
    setStartPointerAngle(getPointerAngle(e.clientX, e.clientY));
    setStartWheelAngle(angle);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentPointerAngle = getPointerAngle(e.clientX, e.clientY);
    let diff = currentPointerAngle - startPointerAngle;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (Math.abs(diff) > 2) {
      setHasDragged(true);
    }

    setAngle(startWheelAngle + diff);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  function launch(id: AppId) {
    if (hasDragged) return;
    openApp(id);
    playSfx("open");
    onLaunch?.();
  }

  const step = 360 / APPS.length;
  const R = 178;

  return (
    <div
      ref={wheelRef}
      className={`pointer-events-auto absolute inset-0 flex items-center justify-center touch-none ${
        morphing ? "wheel-morph-in" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="relative scale-[0.6] sm:scale-75 md:scale-100"
        style={{ width: 2 * R + 210, height: 2 * R + 210 }}
      >
        <div
          className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
          style={{
            width: 2 * R + 130,
            height: 2 * R + 130,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at 45% 35%, rgba(255,255,255,0.08), transparent 24%), conic-gradient(from 35deg, rgba(236,72,153,0.16), rgba(34,211,238,0.12), rgba(168,85,247,0.15), rgba(236,72,153,0.16))",
            boxShadow:
              "0 0 90px rgba(192,132,252,0.22), inset 0 0 55px rgba(34,211,238,0.13)",
            backdropFilter: "blur(16px)",
          }}
        />

        <div
          className="absolute inset-0 m-auto rounded-full border border-white/10"
          style={{
            width: 2 * R - 70,
            height: 2 * R - 70,
            background:
              "radial-gradient(circle at 50% 45%, rgba(30,41,59,0.98), rgba(2,6,23,0.98) 70%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: isDragging ? "none" : "transform 0.45s cubic-bezier(.22,.9,.28,1)",
          }}
        >
          {APPS.map((app, idx) => {
            const Icon = app.icon;
            const rot = idx * step;
            const selected = hovered === app.id;

            return (
              <div
                key={app.id}
                className="absolute left-1/2 top-1/2 flex h-0 w-0 items-center justify-center"
                style={{ transform: `rotate(${rot}deg) translateY(-${R}px)` }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ transform: `rotate(-${angle + rot}deg)` }}
                >
                  <div className="relative flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        launch(app.id);
                      }}
                      onMouseEnter={() => setHovered(app.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="neon-app-tile option-pop group relative flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[22px] transition-transform duration-200 hover:scale-110"
                      style={{
                        "--tile-accent": app.accent,
                        "--tile-accent2": app.accent2,
                        animationDelay: `${idx * 28}ms`,
                      } as CSSProperties}
                      aria-label={`Open ${app.label}`}
                    >
                      <span className="neon-app-glow" />
                      <Icon
                        size={34}
                        strokeWidth={2.1}
                        className="relative z-10"
                        style={{
                          color: app.accent,
                          filter: `drop-shadow(0 0 8px ${app.accent}) drop-shadow(0 0 14px ${app.accent2})`,
                        }}
                      />
                    </button>

                    <div
                      className={`pointer-events-none absolute left-1/2 top-[76px] -translate-x-1/2 max-w-[116px] whitespace-nowrap rounded-md border border-white/15 bg-black/65 px-2 py-0.5 text-center text-[11px] font-medium text-white shadow-lg backdrop-blur transition-all duration-150 ${
                        selected
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-0"
                      }`}
                    >
                      {app.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #38bdf8, #c084fc 60%, #0f172a)",
              boxShadow:
                "0 0 55px rgba(192,132,252,0.55), inset 0 0 25px rgba(255,255,255,0.28)",
              color: "#0a0e1a",
            }}
          >
            ⬡
          </div>
          <div className="mt-2 min-h-4 text-[11px] font-bold text-white drop-shadow">
            {activeApp ? activeApp.label : "SarthakOS"}
          </div>
          <div className="mt-0.5 text-[9px] text-white/60">
            drag to rotate · tap to open
          </div>
        </div>

        <button
          onClick={() => setAngle((a) => a - step)}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-white shadow-lg backdrop-blur hover:bg-black/75"
          title="Previous"
        >
          ◀
        </button>
        <button
          onClick={() => setAngle((a) => a + step)}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-white shadow-lg backdrop-blur hover:bg-black/75"
          title="Next"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
