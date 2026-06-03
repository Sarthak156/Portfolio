"use client";

import { useEffect, useRef, useState } from "react";
import { systemMetrics } from "@/lib/data";

export default function SystemMonitor() {
  const [visits, setVisits] = useState<number | null>(null);
  const [cpu, setCpu] = useState<number[]>(Array(40).fill(20));
  const [ram, setRam] = useState(42);
  const [uptime, setUptime] = useState(0);
  const start = useRef(Date.now());

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => setVisits(d.count ?? 0))
      .catch(() => setVisits(0));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCpu((prev) => {
        const next = [...prev.slice(1), 20 + Math.random() * 70];
        return next;
      });
      setRam(() => 30 + Math.random() * 50);
      setUptime(Math.floor((Date.now() - start.current) / 1000));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="os-scroll h-full overflow-auto p-4 text-sm">
      <div className="mb-4 grid grid-cols-3 gap-2 text-center">
        <Stat label="Uptime" value={`${uptime}s`} />
        <Stat label="Visitors" value={visits === null ? "…" : String(visits)} />
        <Stat label="Processes" value="13" />
      </div>

      <div className="mb-4 rounded-xl border border-[var(--os-border)] p-3">
        <div className="mb-2 flex justify-between text-xs text-[var(--os-muted)]">
          <span>CPU — Neural Engine</span>
          <span className="os-accent">{Math.round(cpu[cpu.length - 1])}%</span>
        </div>
        <div className="flex h-16 items-end gap-[2px]">
          {cpu.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${v}%`,
                background: "linear-gradient(to top, var(--os-accent2), var(--os-accent))",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-[var(--os-border)] p-3">
        <div className="mb-1 flex justify-between text-xs text-[var(--os-muted)]">
          <span>RAM</span>
          <span className="os-accent">{Math.round(ram)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[var(--os-bg2)]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${ram}%`,
              background: "linear-gradient(to right, var(--os-accent), var(--os-accent2))",
            }}
          />
        </div>
      </div>

      <h3 className="mb-2 font-semibold os-accent">Developer Diagnostics</h3>
      <div className="space-y-3">
        {systemMetrics.map((m) => (
          <div key={m.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span>{m.label}</span>
              <span className="text-[var(--os-muted)]">{m.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--os-bg2)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${m.value}%`,
                  background:
                    m.value < 35
                      ? "#ef4444"
                      : "linear-gradient(to right, var(--os-accent), var(--os-accent2))",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--os-border)] p-2">
      <div className="text-lg font-bold os-accent">{value}</div>
      <div className="text-[10px] text-[var(--os-muted)]">{label}</div>
    </div>
  );
}
