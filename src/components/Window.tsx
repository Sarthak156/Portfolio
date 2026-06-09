"use client";

import { useRef } from "react";
import { useOS, type WinState } from "@/store/os";
import { renderApp } from "@/components/appRegistry";
import { playSfx } from "@/lib/sound";

export default function Window({ win }: { win: WinState }) {
  const focusWindow = useOS((s) => s.focusWindow);
  const closeWindow = useOS((s) => s.closeWindow);
  const minimizeWindow = useOS((s) => s.minimizeWindow);
  const toggleMaximize = useOS((s) => s.toggleMaximize);
  const moveWindow = useOS((s) => s.moveWindow);
  const resizeWindow = useOS((s) => s.resizeWindow);

  const drag = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null);
  const rez = useRef<{ sw: number; sh: number; sx: number; sy: number } | null>(null);

  function onDragStart(e: React.PointerEvent) {
    if (win.maximized) return;
    focusWindow(win.id);
    drag.current = { ox: win.x, oy: win.y, sx: e.clientX, sy: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onDragMove(e: React.PointerEvent) {
    if (!drag.current) return;
    const nx = drag.current.ox + (e.clientX - drag.current.sx);
    const ny = Math.max(0, drag.current.oy + (e.clientY - drag.current.sy));
    moveWindow(win.id, nx, ny);
  }
  function onDragEnd() {
    drag.current = null;
  }

  function onResizeStart(e: React.PointerEvent) {
    e.stopPropagation();
    focusWindow(win.id);
    rez.current = { sw: win.width, sh: win.height, sx: e.clientX, sy: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onResizeMove(e: React.PointerEvent) {
    if (!rez.current) return;
    const nw = Math.max(320, rez.current.sw + (e.clientX - rez.current.sx));
    const nh = Math.max(220, rez.current.sh + (e.clientY - rez.current.sy));
    resizeWindow(win.id, nw, nh);
  }
  function onResizeEnd() {
    rez.current = null;
  }

  if (win.minimized) return null;

  return (
    <div
      className="os-window anim-fade absolute flex flex-col overflow-hidden rounded-xl shadow-2xl"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.z,
      }}
      onPointerDown={() => focusWindow(win.id)}
    >
      <div
        className="no-select flex h-9 shrink-0 cursor-grab items-center justify-between border-b border-[var(--os-border)] px-2 active:cursor-grabbing"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onDoubleClick={() =>
          toggleMaximize(win.id, window.innerWidth, window.innerHeight)
        }
      >
        <div className="flex items-center gap-2 truncate">
          <span className="truncate text-xs font-semibold">{win.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
              playSfx("click");
            }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[8px] text-black/60 hover:brightness-110"
            title="Minimize"
          >
            –
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id, window.innerWidth, window.innerHeight);
            }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-[8px] text-black/60 hover:brightness-110"
            title="Maximize"
          >
            ▢
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
              playSfx("close");
            }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-black/60 hover:brightness-110"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">{renderApp(win.app, win.payload)}</div>

      {!win.maximized && (
        <div
          onPointerDown={onResizeStart}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, var(--os-border) 50%)",
          }}
        />
      )}
    </div>
  );
}
