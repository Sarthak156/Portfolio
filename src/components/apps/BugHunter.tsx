"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playSfx } from "@/lib/sound";

type Bug = { id: number; x: number; y: number; kind: "bug" | "ram" };

export default function BugHunter() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [best, setBest] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const b = Number(localStorage.getItem("bughunter-best") || "0");
    setBest(b);
  }, []);

  const spawn = useCallback(() => {
    const area = areaRef.current;
    if (!area) return;
    const w = area.clientWidth - 44;
    const h = area.clientHeight - 44;
    nextId.current += 1;
    const kind: Bug["kind"] = Math.random() < 0.2 ? "ram" : "bug";
    setBugs((prev) => [
      ...prev,
      {
        id: nextId.current,
        x: Math.max(4, Math.random() * w),
        y: Math.max(4, Math.random() * h),
        kind,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const spawnId = setInterval(spawn, 650);
    const decay = setInterval(() => {
      setBugs((prev) => (prev.length > 6 ? prev.slice(1) : prev));
    }, 900);
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(spawnId);
      clearInterval(timer);
      clearInterval(decay);
    };
  }, [playing, spawn]);

  useEffect(() => {
    if (!playing && time === 0) {
      setBest((b) => {
        const nb = Math.max(b, score);
        localStorage.setItem("bughunter-best", String(nb));
        return nb;
      });
    }
  }, [playing, time, score]);

  function start() {
    setScore(0);
    setTime(30);
    setBugs([]);
    setPlaying(true);
    playSfx("success");
  }

  function squash(bug: Bug) {
    setBugs((prev) => prev.filter((b) => b.id !== bug.id));
    if (bug.kind === "ram") {
      setScore((s) => Math.max(0, s - 3));
      playSfx("error");
    } else {
      setScore((s) => s + 1);
      playSfx("click");
    }
  }

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="flex items-center justify-between border-b border-[var(--os-border)] px-3 py-1.5 text-xs">
        <span>🐛 Score: <b className="os-accent">{score}</b></span>
        <span>⏱ {time}s</span>
        <span>🏆 Best: {best}</span>
      </div>
      <div
        ref={areaRef}
        className="relative flex-1 overflow-hidden bg-[var(--os-bg2)]"
      >
        {!playing && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/60 p-4 text-center">
            <div className="text-3xl">🐛🔨</div>
            <h2 className="text-lg font-bold">Bug Hunter</h2>
            <p className="max-w-xs text-xs text-[var(--os-muted)]">
              Squash the bugs 🐛 for +1. Avoid memory leaks 🧠 (RAM) — they cost
              you 3 points! You have 30 seconds.
            </p>
            <button
              onClick={start}
              className="rounded-lg bg-[var(--os-accent)] px-4 py-2 text-xs font-semibold text-[#0a0e1a]"
            >
              {time === 0 ? `Play Again (scored ${score})` : "Start Hunt"}
            </button>
          </div>
        )}
        {bugs.map((bug) => (
          <button
            key={bug.id}
            onClick={() => squash(bug)}
            className="absolute flex h-10 w-10 items-center justify-center text-2xl transition-transform hover:scale-110"
            style={{ left: bug.x, top: bug.y }}
          >
            {bug.kind === "ram" ? "🧠" : "🐛"}
          </button>
        ))}
      </div>
    </div>
  );
}
