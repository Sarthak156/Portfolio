"use client";

import type { AppId } from "@/store/os";
import About from "@/components/apps/About";
import Experience from "@/components/apps/Experience";
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
  icon: string;
  onDesktop?: boolean;
};

export const APPS: AppMeta[] = [
  { id: "files", label: "Files", icon: "📁", onDesktop: true },
  { id: "terminal", label: "Terminal", icon: "💻", onDesktop: true },
  { id: "about", label: "About Me", icon: "👤", onDesktop: true },
  { id: "experience", label: "Experience", icon: "💼", onDesktop: true },
  { id: "projects", label: "Projects", icon: "📦", onDesktop: true },
  { id: "skills", label: "Skills", icon: "🧩", onDesktop: true },
  { id: "resume", label: "Resume", icon: "📕", onDesktop: true },
  { id: "certs", label: "Certs", icon: "🏅", onDesktop: true },
  { id: "ai", label: "SarthakAI", icon: "🧠", onDesktop: true },
  { id: "slang", label: "SLang", icon: "✨", onDesktop: true },
  { id: "game", label: "Bug Hunter", icon: "🐛", onDesktop: true },
  { id: "monitor", label: "Monitor", icon: "📊", onDesktop: true },
  { id: "guestbook", label: "Guestbook", icon: "✍️", onDesktop: true },
  { id: "settings", label: "Settings", icon: "⚙️", onDesktop: true },
];

export function renderApp(id: AppId, payload?: string) {
  switch (id) {
    case "files":
      return <FileExplorer payload={payload} />;
    case "terminal":
      return <Terminal />;
    case "about":
      return <About />;
    case "experience":
      return <Experience />;
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
