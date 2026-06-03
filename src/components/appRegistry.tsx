"use client";

import type { AppId } from "@/store/os";
import About from "@/components/apps/About";
import Skills from "@/components/apps/Skills";
import Projects from "@/components/apps/Projects";
import ResumeViewer from "@/components/apps/ResumeViewer";
import Certifications from "@/components/apps/Certifications";
import SystemMonitor from "@/components/apps/SystemMonitor";
import AIAssistant from "@/components/apps/AIAssistant";
import SlangEditor from "@/components/apps/SlangEditor";
import BugHunter from "@/components/apps/BugHunter";
import Settings from "@/components/apps/Settings";
import Guestbook from "@/components/apps/Guestbook";
import FileExplorer from "@/components/apps/FileExplorer";
import Terminal from "@/components/apps/Terminal";

export type AppMeta = {
  id: AppId;
  label: string;
  accent: string;
  onDesktop?: boolean;
};

export const APPS: AppMeta[] = [
  { id: "files", label: "Files", accent: "#2ca7a0", onDesktop: true },
  { id: "terminal", label: "Terminal", accent: "#308fa8", onDesktop: true },
  { id: "about", label: "About Me", accent: "#7a93a8", onDesktop: true },
  { id: "projects", label: "Projects", accent: "#3699b8", onDesktop: true },
  { id: "skills", label: "Skills", accent: "#39b6be", onDesktop: true },
  { id: "resume", label: "Resume", accent: "#5fa5b3", onDesktop: true },
  { id: "certs", label: "Certs", accent: "#6caea1", onDesktop: true },
  { id: "ai", label: "SarthakAI", accent: "#4eafba", onDesktop: true },
  { id: "slang", label: "SLang", accent: "#3a9fb0", onDesktop: true },
  { id: "game", label: "Bug Hunter", accent: "#6b8ea1", onDesktop: true },
  { id: "monitor", label: "Monitor", accent: "#2fabb2", onDesktop: true },
  { id: "guestbook", label: "Guestbook", accent: "#8aa3ad", onDesktop: true },
  { id: "settings", label: "Settings", accent: "#7f96a0", onDesktop: true },
];

export function AppIcon({
  app,
  accent,
  compact = false,
}: {
  app: AppId;
  accent: string;
  compact?: boolean;
}) {
  const sizeClass = compact ? "h-8 w-8" : "h-14 w-14";
  const stroke = compact ? 1.7 : 1.85;

  const icon = (() => {
    switch (app) {
      case "files":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M6 10.5h5.2l2 2H18a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2Z" />
            <path d="M8 10.5v-1A1.5 1.5 0 0 1 9.5 8h3.2c.4 0 .8.16 1.08.44l1.2 1.06" />
            <path d="M7.5 15.5h9" />
          </g>
        );
      case "terminal":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <rect x="5.5" y="6.5" width="13" height="11" rx="2" />
            <path d="M8 11l2 2-2 2" />
            <path d="M12.5 15h3" />
          </g>
        );
      case "about":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <circle cx="12" cy="10.5" r="2.1" />
            <path d="M7.5 18c.8-2.7 2.6-4 4.5-4s3.7 1.3 4.5 4" />
          </g>
        );
      case "projects":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M7 9.5 12 6l5 3.5-5 3.5-5-3.5Z" />
            <path d="M7 9.5V15l5 3 5-3V9.5" />
            <path d="M12 13V18" />
          </g>
        );
      case "skills":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M6 16V12" />
            <path d="M10 16V8" />
            <path d="M14 16v-5" />
            <path d="M18 16v-9" />
            <path d="M5.5 18.5h13" />
          </g>
        );
      case "resume":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M8 5.5h5.4L17 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 18.5v-12A1 1 0 0 1 8 5.5Z" />
            <path d="M13.4 5.5V9H17" />
            <path d="M9 12h6M9 15h6" />
          </g>
        );
      case "certs":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M12 6.2 13.4 9l3.1.4-2.3 2.1.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.1 3.1-.4L12 6.2Z" />
            <path d="M9.2 16.2 8 20l2.7-1.6L12 20l1.3-1.6L16 20l-1.2-3.8" />
          </g>
        );
      case "ai":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M8 9h8v6H8z" />
            <path d="M10 7v2M14 7v2M10 15v2M14 15v2M6 11h2M6 13h2M16 11h2M16 13h2" />
            <path d="M10 11h.01M12 11h.01M14 11h.01" />
          </g>
        );
      case "slang":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M9 8 6.5 12 9 16" />
            <path d="M15 8l2.5 4L15 16" />
            <path d="M11.5 7.5 10.5 16.5" />
          </g>
        );
      case "game":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M9 7.5h6L17.5 10v6.5H6.5V10L9 7.5Z" />
            <path d="M10 12h4M12 10v4" />
            <circle cx="8.8" cy="11.2" r=".55" fill="currentColor" stroke="none" />
            <circle cx="15.2" cy="11.2" r=".55" fill="currentColor" stroke="none" />
          </g>
        );
      case "monitor":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <rect x="5.5" y="7" width="13" height="9" rx="1.6" />
            <path d="M8 13l2-2 2 1.5 3-4" />
            <path d="M10 18h4" />
          </g>
        );
      case "guestbook":
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <rect x="7" y="6" width="10" height="12" rx="1.8" />
            <path d="M10 9h4M10 12h4M10 15h3" />
            <path d="M14.6 8.5l1.4-1.4 1.4 1.4-1.4 1.4-1.4-1.4Z" />
          </g>
        );
      case "settings":
      default:
        return (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={stroke}>
            <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z" />
            <path d="M12 5.5v1.2M12 17.3v1.2M5.5 12h1.2M17.3 12h1.2M7.6 7.6l.85.85M15.55 15.55l.85.85M16.4 7.6l-.85.85M8.45 15.55l-.85.85" />
          </g>
        );
    }
  })();

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-[1rem] border border-white/45 shadow-[0_4px_10px_-8px_rgba(15,23,42,0.45)] ${sizeClass}`}
      style={{
        background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 92%, white 8%) 0%, color-mix(in srgb, ${accent} 78%, black 22%) 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 16px -12px rgba(15, 23, 42, 0.35)`,
      }}
    >
      <span className="absolute left-0.5 top-0.5 h-[calc(100%-0.25rem)] w-[calc(100%-0.25rem)] rounded-[0.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_100%)]" />
      <span className="absolute left-1.5 top-1.5 h-2.5 w-5 rounded-t-md rounded-br-md bg-[rgba(255,255,255,0.18)]" />
      <span className="absolute bottom-1 left-2 right-2 h-px rounded-full bg-white/15" />
      <svg viewBox="0 0 24 24" className="relative h-[68%] w-[68%] text-white" aria-hidden="true">
        {icon}
      </svg>
    </span>
  );
}

export function renderApp(id: AppId, payload?: string) {
  switch (id) {
    case "files":
      return <FileExplorer payload={payload} />;
    case "terminal":
      return <Terminal />;
    case "about":
      return <About />;
    case "projects":
      return <Projects payload={payload} />;
    case "skills":
      return <Skills />;
    case "resume":
      return <ResumeViewer />;
    case "certs":
      return <Certifications />;
    case "monitor":
      return <SystemMonitor />;
    case "ai":
      return <AIAssistant />;
    case "slang":
      return <SlangEditor />;
    case "game":
      return <BugHunter />;
    case "settings":
      return <Settings />;
    case "guestbook":
      return <Guestbook />;
    default:
      return null;
  }
}
