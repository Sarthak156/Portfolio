"use client";

import { useEffect, useRef, useState } from "react";
import { resolvePath } from "@/lib/filesystem";
import { useOS, type AppId, type Theme } from "@/store/os";
import { profile, projects, skills, certifications, experience } from "@/lib/data";
import { playSfx } from "@/lib/sound";

type Line = { text: string; cls?: string };

const BANNER = [
  "  ____             _   _           _    ___  ____  ",
  " / ___|  __ _ _ __| |_| |__   __ _| | _/ _ \\/ ___| ",
  " \\___ \\ / _` | '__| __| '_ \\ / _` | |/ / | | \\___ \\ ",
  "  ___) | (_| | |  | |_| | | | (_| |   <| |_| |___) |",
  " |____/ \\__,_|_|   \\__|_| |_|\\__,_|_|\\_\\\\___/|____/ ",
  "",
  "SarthakOS Terminal — type 'help' to list commands.",
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER.map((t) => ({ text: t, cls: "os-accent" })));
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string[]>(["Users", "Sarthak"]);
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openApp = useOS((s) => s.openApp);
  const setTheme = useOS((s) => s.setTheme);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [lines]);

  function push(text: string | string[], cls?: string) {
    const arr = Array.isArray(text) ? text : [text];
    setLines((prev) => [...prev, ...arr.map((t) => ({ text: t, cls }))]);
  }

  function prompt() {
    return `sarthak@os:/${cwd.join("/")}$`;
  }

  async function run(raw: string) {
    const cmd = raw.trim();
    push(`${prompt()} ${cmd}`);
    if (!cmd) return;
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    const apps: Record<string, AppId> = {
      about: "about",
      ai: "ai",
      experience: "experience",
      projects: "projects",
      resume: "resume",
      skills: "skills",
      certs: "certs",
      monitor: "monitor",
      games: "game",
      game: "game",
      slang: "slang",
      files: "files",
      settings: "settings",
      guestbook: "guestbook",
    };

    switch (name.toLowerCase()) {
      case "help":
        push([
          "Available commands:",
          "  help              show this help",
          "  ls                list files in current folder",
          "  cd <dir>          change directory (.. to go up)",
          "  cat <file>        print file content",
          "  pwd               print working directory",
          "  clear             clear the screen",
          "  about             about Sarthak",
          "  skills            list technical skills",
          "  experience        internship / work history",
          "  projects          list / open projects",
          "  resume            open resume",
          "  contact           contact details",
          "  certs             list certifications",
          "  ai <question>     ask the neural core (Gemini)",
          "  open <app>        launch an app window",
          "  theme <name>      neon | matrix | minimal | retro",
          "  neofetch          system info",
          "  sudo hire sarthak try it ;)",
        ]);
        break;
      case "ls": {
        const node = resolvePath(cwd);
        if (node?.children) {
          push(
            node.children
              .map((c) => (c.type === "folder" ? `${c.name}/` : c.name))
              .join("   ")
          );
        } else push("Not a directory.", "text-red-400");
        break;
      }
      case "cd": {
        if (!arg || arg === "~") {
          setCwd(["Users", "Sarthak"]);
          break;
        }
        if (arg === "..") {
          setCwd((p) => (p.length ? p.slice(0, -1) : p));
          break;
        }
        if (arg === "/") {
          setCwd([]);
          break;
        }
        const target = [...cwd, arg];
        const node = resolvePath(target);
        if (node && node.type === "folder") setCwd(target);
        else push(`cd: no such directory: ${arg}`, "text-red-400");
        break;
      }
      case "pwd":
        push(`/${cwd.join("/")}`);
        break;
      case "cat": {
        const node = resolvePath(cwd);
        const file = node?.children?.find((c) => c.name === arg);
        if (!file) push(`cat: ${arg}: no such file`, "text-red-400");
        else if (file.content) push(file.content.split("\n"));
        else if (file.opens) {
          push(`Opening ${file.name}...`, "os-accent");
          openApp(file.opens, { payload: file.payload, title: file.name });
        } else push(`cat: ${arg}: binary file`, "text-red-400");
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "about":
        push([
          `${profile.name} — ${profile.title}`,
          `📍 ${profile.location}`,
          "",
          profile.summary,
        ]);
        break;
      case "experience":
        push("Experience (use 'open experience' for a richer view):");
        experience.forEach((ex) => {
          push(`  💼 ${ex.role} @ ${ex.company} (${ex.period})`);
          ex.highlights.forEach((h) => push(`    · ${h}`));
        });
        break;
      case "skills":
        skills.forEach((s) => push(`${s.group}: ${s.items.join(", ")}`));
        break;
      case "projects":
        push("Projects (use 'open projects' for the GUI):");
        projects.forEach((p, i) => push(`  ${i + 1}. ${p.name} [${p.stack.join(", ")}]`));
        break;
      case "resume":
        push("Opening Resume.pdf...", "os-accent");
        openApp("resume");
        break;
      case "certs":
        certifications.forEach((c) => push(`  🏅 ${c.name} — ${c.issuer}`));
        break;
      case "contact":
        push([
          `Email:    ${profile.email}`,
          `Phone:    ${profile.phone}`,
          `LinkedIn: ${profile.linkedin}`,
          `GitHub:   ${profile.github}`,
          `Location: ${profile.location}`,
        ]);
        break;
      case "open": {
        const app = apps[arg.toLowerCase()];
        if (app) {
          push(`Launching ${arg}...`, "os-accent");
          openApp(app);
        } else push(`open: unknown app '${arg}'`, "text-red-400");
        break;
      }
      case "theme": {
        const valid: Theme[] = ["neon", "matrix", "minimal", "retro"];
        if (valid.includes(arg as Theme)) {
          setTheme(arg as Theme);
          push(`Theme switched to ${arg}.`, "os-accent");
        } else push(`theme: choose one of ${valid.join(", ")}`, "text-red-400");
        break;
      }
      case "matrix":
        setTheme("matrix");
        push("Wake up, Neo... entering the Matrix.", "os-accent");
        break;
      case "neofetch":
        push([
          "        ▟███▙        sarthak@sarthak-os",
          "       ▟█████▙       -----------------",
          "      ▟███████▙      OS: SarthakOS v1.0",
          "      ▜███████▛      Host: boot.sarthak.dev",
          "       ▜█████▛       Kernel: React 19 / Next.js",
          "        ▜███▛        Shell: sarthak-sh",
          "                     Uptime: caffeinated",
          "                     CPU: Neural Engine",
        ], "os-accent");
        break;
      case "echo":
        push(arg);
        break;
      case "whoami":
        push("guest — but you could be the next employer 👀");
        break;
      case "date":
        push(new Date().toString());
        break;
      case "ai": {
        if (!arg) {
          push("Usage: ai <your question>", "text-red-400");
          break;
        }
        push("🧠 querying neural core...", "text-[var(--os-muted)]");
        try {
          const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: arg }),
          });
          const data = await res.json();
          push((data.reply ?? "no signal").split("\n"), "os-accent");
        } catch {
          push("neural link failed.", "text-red-400");
        }
        break;
      }
      case "sudo": {
        if (arg.toLowerCase().includes("hire sarthak")) {
          playSfx("success");
          push([
            "[sudo] authenticating recruiter...",
            "Access granted. ✔",
            "",
            "Welcome to the team, Sarthak! 🎉",
            `Reach the human: ${profile.email}`,
          ], "os-accent");
        } else {
          push("Access denied. Nice try, hacker. 🕶️", "text-red-400");
          playSfx("error");
        }
        break;
      }
      default:
        push(`command not found: ${name}. Type 'help'.`, "text-red-400");
        playSfx("error");
    }
  }

  return (
    <div
      className="os-scroll h-full overflow-auto bg-black/55 p-3 font-mono text-xs"
      style={{ fontFamily: "ui-monospace, monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre-wrap ${l.cls ?? ""}`}>
          {l.text || "\u00A0"}
        </div>
      ))}
      <div className="flex">
        <span className="shrink-0 os-accent">{prompt()}&nbsp;</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = input;
              setHistory((h) => [...h, v]);
              setHIdx(-1);
              setInput("");
              void run(v);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHistory((h) => {
                if (h.length === 0) return h;
                const ni = hIdx === -1 ? h.length - 1 : Math.max(0, hIdx - 1);
                setHIdx(ni);
                setInput(h[ni]);
                return h;
              });
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setHistory((h) => {
                if (hIdx === -1) return h;
                const ni = hIdx + 1;
                if (ni >= h.length) {
                  setHIdx(-1);
                  setInput("");
                } else {
                  setHIdx(ni);
                  setInput(h[ni]);
                }
                return h;
              });
            } else {
              playSfx("key");
            }
          }}
          className="flex-1 border-none bg-transparent text-[var(--os-text)] outline-none"
          spellCheck={false}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
