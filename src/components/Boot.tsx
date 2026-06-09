"use client";

import { useEffect, useRef, useState } from "react";
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
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const autoLaunched = useRef(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown(STEPS.slice(0, i + 1));
      i++;
      if (i >= STEPS.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 600);
      }
    }, 320);
    return () => clearInterval(id);
  }, []);

  // Auto-launch to desktop once boot simulation is done — no user click required.
  useEffect(() => {
    if (!done || autoLaunched.current) return;
    autoLaunched.current = true;
    // small delay so the final screen is visible
    setTimeout(() => {
      if (soundState.on) playSfx("boot");
      setPhase("desktop");
    }, 900);
  }, [done, setPhase]);

  return (
    <div
      className="os-root crt flex h-screen w-screen flex-col items-center justify-center"
      onClick={() => {
        // prime audio on first interaction
        if (soundState.on) playSfx("boot");
      }}
    >
      <div className="w-full max-w-xl px-6 font-mono text-sm">
        <div className="mb-4 text-center text-2xl font-bold os-accent">
          ⬡ SarthakOS
        </div>
        <div className="min-h-[14rem]">
          {shown.map((s, i) => (
            <div key={i} className="anim-flicker mb-1 text-[var(--os-text)]">
              <span className="text-[var(--os-muted)]">[{String(i).padStart(2, "0")}]</span>{" "}
              {s}
            </div>
          ))}
          {!done && shown.length < STEPS.length && (
            <span className="cursor-blink os-accent">▋</span>
          )}
        </div>
        {done && (
          <div className="mt-6 text-center text-xs text-[var(--os-muted)]">
            handoff to desktop environment<span className="cursor-blink">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}
