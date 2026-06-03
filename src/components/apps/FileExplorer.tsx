"use client";

import { useState } from "react";
import { filesystem, resolvePath, type FSNode } from "@/lib/filesystem";
import { useOS } from "@/store/os";
import { playSfx } from "@/lib/sound";

const ICONS: Record<string, string> = {
  folder: "📁",
  txt: "📄",
  pdf: "📕",
  png: "🖼️",
  json: "🧾",
  exe: "⚙️",
  ipynb: "📓",
  slang: "✨",
};

export default function FileExplorer({ payload }: { payload?: string }) {
  const initial = payload ? payload.split("/").filter(Boolean) : ["Users", "Sarthak"];
  const [path, setPath] = useState<string[]>(initial);
  const [viewing, setViewing] = useState<FSNode | null>(null);
  const openApp = useOS((s) => s.openApp);

  const node = resolvePath(path) ?? filesystem;
  const children = node.children ?? [];

  function open(child: FSNode) {
    playSfx("click");
    if (child.type === "folder") {
      setPath([...path, child.name]);
    } else if (child.content) {
      setViewing(child);
    } else if (child.opens) {
      playSfx("open");
      openApp(child.opens, { payload: child.payload, title: child.name });
    }
  }

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="flex items-center gap-2 border-b border-[var(--os-border)] px-3 py-1.5 text-xs">
        <button
          onClick={() => {
            setPath((p) => (p.length > 0 ? p.slice(0, -1) : p));
            playSfx("click");
          }}
          disabled={path.length === 0}
          className="rounded border border-[var(--os-border)] px-2 py-0.5 disabled:opacity-30"
        >
          ←
        </button>
        <div className="os-scroll flex items-center gap-1 overflow-x-auto whitespace-nowrap text-[var(--os-muted)]">
          <button onClick={() => setPath([])} className="hover:os-accent">
            C:
          </button>
          {path.map((p, i) => (
            <span key={i}>
              {" / "}
              <button
                onClick={() => setPath(path.slice(0, i + 1))}
                className="hover:os-accent"
              >
                {p}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="os-scroll grid flex-1 auto-rows-max grid-cols-3 gap-2 overflow-auto p-3 sm:grid-cols-4">
        {children.length === 0 && (
          <div className="col-span-full text-xs text-[var(--os-muted)]">
            This folder is empty.
          </div>
        )}
        {children.map((child) => (
          <button
            key={child.name}
            onDoubleClick={() => open(child)}
            onClick={(e) => {
              if (e.detail === 1) {
                // allow single-click open too for touch friendliness
              }
            }}
            onTouchEnd={() => open(child)}
            className="flex flex-col items-center gap-1 rounded-lg p-2 text-center hover:bg-[var(--os-border)]"
            title="Double-click to open"
          >
            <span className="text-3xl">
              {child.type === "folder"
                ? ICONS.folder
                : ICONS[child.ext ?? ""] ?? "📄"}
            </span>
            <span className="w-full truncate text-[11px]">{child.name}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-[var(--os-border)] px-3 py-1 text-[10px] text-[var(--os-muted)]">
        {children.length} items · double-click (or tap) to open
      </div>

      {viewing && (
        <div className="absolute inset-0 z-20 flex flex-col bg-[var(--os-window)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-[var(--os-border)] px-3 py-1.5">
            <span className="text-xs os-accent">📄 {viewing.name}</span>
            <button
              onClick={() => setViewing(null)}
              className="rounded border border-[var(--os-border)] px-2 py-0.5 text-xs"
            >
              ✕ Close
            </button>
          </div>
          <pre className="os-scroll flex-1 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs">
            {viewing.content}
          </pre>
        </div>
      )}
    </div>
  );
}
