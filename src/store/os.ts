"use client";

import { create } from "zustand";

export type AppId =
  | "files"
  | "terminal"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "resume"
  | "certs"
  | "monitor"
  | "ai"
  | "slang"
  | "game"
  | "settings"
  | "guestbook";

export type WinState = {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  // optional payload, e.g. a file path to open
  payload?: string;
  prev?: { x: number; y: number; width: number; height: number };
};

export type Theme = "neon" | "matrix" | "minimal" | "retro";

type Phase = "boot" | "login" | "desktop";

type OSState = {
  phase: Phase;
  user: string;
  theme: Theme;
  soundOn: boolean;
  windows: WinState[];
  topZ: number;
  setPhase: (p: Phase) => void;
  login: (user: string) => void;
  setTheme: (t: Theme) => void;
  toggleSound: () => void;
  openApp: (app: AppId, opts?: { title?: string; payload?: string }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string, vw: number, vh: number) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  toggleFromTaskbar: (id: string) => void;
};

const APP_TITLES: Record<AppId, string> = {
  files: "File Explorer",
  terminal: "Terminal",
  about: "About — readme.txt",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  resume: "Resume.pdf",
  certs: "Certifications",
  monitor: "System Monitor",
  ai: "SarthakAI — Neural Core",
  slang: "SLang Studio",
  game: "Bug Hunter",
  settings: "Settings",
  guestbook: "Guestbook",
};

const DEFAULT_SIZE: Record<AppId, { w: number; h: number }> = {
  files: { w: 720, h: 460 },
  terminal: { w: 680, h: 420 },
  about: { w: 560, h: 460 },
  experience: { w: 680, h: 520 },
  projects: { w: 720, h: 520 },
  skills: { w: 600, h: 500 },
  resume: { w: 640, h: 600 },
  certs: { w: 620, h: 480 },
  monitor: { w: 640, h: 480 },
  ai: { w: 560, h: 540 },
  slang: { w: 760, h: 560 },
  game: { w: 620, h: 520 },
  settings: { w: 520, h: 440 },
  guestbook: { w: 560, h: 520 },
};

let idCounter = 0;

export const useOS = create<OSState>((set, get) => ({
  phase: "boot",
  user: "guest",
  theme: "neon",
  soundOn: true,
  windows: [],
  topZ: 10,

  setPhase: (p) => set({ phase: p }),
  login: (user) => set({ user: user || "guest", phase: "desktop" }),
  setTheme: (t) => set({ theme: t }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

  openApp: (app, opts) => {
    const state = get();
    // If a singleton window for this app already exists (no payload), focus it
    const existing = state.windows.find(
      (w) => w.app === app && !opts?.payload && !w.payload
    );
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) {
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === existing.id ? { ...w, minimized: false } : w
          ),
        }));
      }
      return;
    }
    const size = DEFAULT_SIZE[app];
    const z = state.topZ + 1;
    const offset = (state.windows.length % 6) * 28;

    let w = size.w;
    let h = size.h;
    let x = 80 + offset;
    let y = 60 + offset;

    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        w = window.innerWidth - 16;
        h = window.innerHeight - 80; // account for taskbar
        x = 8 + (state.windows.length % 4) * 12;
        y = 8 + (state.windows.length % 4) * 12;
        if (x + w > window.innerWidth) w = window.innerWidth - x - 8;
        if (y + h > window.innerHeight - 48) h = window.innerHeight - y - 56;
      } else {
        const maxW = window.innerWidth - 32;
        const maxH = window.innerHeight - 80;
        if (w > maxW) w = maxW;
        if (h > maxH) h = maxH;
        if (x + w > window.innerWidth) x = Math.max(16, window.innerWidth - w - 16);
        if (y + h > window.innerHeight - 48) y = Math.max(16, window.innerHeight - h - 64);
      }
    }

    idCounter += 1;
    const win: WinState = {
      id: `${app}-${idCounter}`,
      app,
      title: opts?.title ?? APP_TITLES[app],
      x,
      y,
      width: w,
      height: h,
      z,
      minimized: false,
      maximized: false,
      payload: opts?.payload,
    };
    set({ windows: [...state.windows, win], topZ: z });
  },

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) =>
    set((s) => {
      const z = s.topZ + 1;
      return {
        topZ: z,
        windows: s.windows.map((w) => (w.id === id ? { ...w, z } : w)),
      };
    }),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    })),

  toggleMaximize: (id, vw, vh) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prev) {
          return { ...w, ...w.prev, maximized: false, prev: undefined };
        }
        return {
          ...w,
          maximized: true,
          prev: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 0,
          y: 0,
          width: vw,
          height: vh - 48,
        };
      }),
    })),

  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  resizeWindow: (id, w2, h2) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, width: w2, height: h2 } : w
      ),
    })),

  toggleFromTaskbar: (id) => {
    const w = get().windows.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) {
      set((s) => ({
        windows: s.windows.map((x) =>
          x.id === id ? { ...x, minimized: false } : x
        ),
      }));
      get().focusWindow(id);
    } else {
      // if focused, minimize; else focus
      const isTop = w.z === get().topZ;
      if (isTop) get().minimizeWindow(id);
      else get().focusWindow(id);
    }
  },
}));
