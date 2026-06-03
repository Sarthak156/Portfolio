"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/store/os";
import { playSfx, soundState } from "@/lib/sound";

const STEPS = [
  "Initializing kernel.................OK",
  "Checking neural engine.............OK",
  "Loading creativity modules.........OK",
  "Mounting portfolio filesystem......OK",
  "Starting Gemini Core...............OK",
  "Loading desktop environment........OK",
  "Calibrating coffee levels..........OK",
  "Launching SarthakOS................OK",
];

export default function Boot() {
  const setPhase = useOS((s) => s.setPhase);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);

    const totalDuration = STEPS.length * 360 + 500;
    const id = setTimeout(() => setDone(true), totalDuration);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div
      className="os-root crt flex h-screen w-screen flex-col items-center justify-center"
      onClick={() => {
        // first interaction primes audio + boot chime
        if (soundState.on) playSfx("boot");
      }}
    >
      <div className="w-full max-w-xl px-6 font-mono text-sm">
        <div className="mb-4 text-center text-2xl font-bold os-accent">
          ⬡ SarthakOS
        </div>
        {STEPS.map((s, i) => (
          <div
            key={s}
            className="anim-fade anim-flicker mb-1 text-[var(--os-text)]"
            style={{ animationDelay: `${i * 360}ms`, animationFillMode: "both" }}
          >
            <span className="text-[var(--os-muted)]">[{String(i).padStart(2, "0")}]</span>{" "}
            {s}
          </div>
        ))}
        {!done && (
          <span className="cursor-blink os-accent">▋</span>
        )}
        {done && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                playSfx("boot");
                setPhase("login");
              }}
              className="rounded-lg border border-[var(--os-border)] px-6 py-2 text-sm font-semibold os-accent hover:bg-[var(--os-border)]"
            >
              ▶ Enter SarthakOS
            </button>
            <p className="mt-2 text-xs text-[var(--os-muted)]">
              click anywhere to enable sound
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
