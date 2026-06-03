"use client";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}

type ToneOpts = {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
};

function tone({ freq, duration = 0.12, type = "sine", gain = 0.05 }: ToneOpts) {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.02);
}

export const sfx = {
  click() {
    tone({ freq: 660, duration: 0.06, type: "triangle", gain: 0.04 });
  },
  open() {
    tone({ freq: 440, duration: 0.08, type: "sine", gain: 0.05 });
    setTimeout(() => tone({ freq: 880, duration: 0.1, type: "sine" }), 60);
  },
  close() {
    tone({ freq: 520, duration: 0.08, type: "sine" });
    setTimeout(() => tone({ freq: 300, duration: 0.1, type: "sine" }), 50);
  },
  error() {
    tone({ freq: 160, duration: 0.18, type: "sawtooth", gain: 0.06 });
  },
  key() {
    tone({ freq: 1200, duration: 0.025, type: "square", gain: 0.015 });
  },
  boot() {
    const notes = [196, 261, 329, 392, 523];
    notes.forEach((n, i) =>
      setTimeout(
        () => tone({ freq: n, duration: 0.25, type: "sine", gain: 0.05 }),
        i * 140
      )
    );
  },
  success() {
    [523, 659, 784].forEach((n, i) =>
      setTimeout(() => tone({ freq: n, duration: 0.15, type: "sine" }), i * 90)
    );
  },
};

// A global mutable flag set from the store via the SoundController
export const soundState = { on: true };

export function playSfx(name: keyof typeof sfx) {
  if (!soundState.on) return;
  try {
    sfx[name]();
  } catch {
    /* ignore */
  }
}
