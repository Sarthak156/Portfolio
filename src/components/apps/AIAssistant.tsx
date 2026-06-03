"use client";

import { useEffect, useRef, useState } from "react";
import { playSfx } from "@/lib/sound";

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "What are Sarthak's best projects?",
  "Summarize his skills",
  "What certifications does he have?",
  "How do I contact him?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "SarthakAI neural core online. I've analyzed Sarthak's filesystem.\nConclusion: creativity unusually high, sleep critically low.\n\nAsk me anything about his projects, skills, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    playSfx("click");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "ai", text: data.reply ?? "…signal lost." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Neural link interrupted. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col text-sm">
      <div className="os-scroll flex-1 space-y-3 overflow-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-[var(--os-accent)] text-[#0a0e1a]"
                  : "rounded-bl-sm border border-[var(--os-border)] bg-[var(--os-bg2)]"
              }`}
            >
              {m.role === "ai" && <span className="mr-1">🧠</span>}
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-2 text-xs">
              <span className="cursor-blink">▮</span> thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length <= 2 && (
        <div className="flex flex-wrap gap-1.5 px-3 pb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-[var(--os-border)] px-2.5 py-1 text-[10px] hover:bg-[var(--os-border)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2 border-t border-[var(--os-border)] p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the neural core..."
          className="flex-1 rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-1.5 text-xs outline-none focus:border-[var(--os-accent)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--os-accent)] px-3 py-1.5 text-xs font-semibold text-[#0a0e1a] disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
