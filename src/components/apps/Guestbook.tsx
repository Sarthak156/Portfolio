"use client";

import { useEffect, useState } from "react";
import { playSfx } from "@/lib/sound";

type Entry = { id: number; name: string; message: string; createdAt: string };

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  async function load() {
    try {
      const res = await fetch("/api/guestbook");
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || posting) return;
    setPosting(true);
    playSfx("success");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (data.ok && data.entry) {
        setEntries((prev) => [data.entry, ...prev]);
        setMessage("");
      }
    } catch {
      /* ignore */
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="flex h-full flex-col text-sm">
      <form
        onSubmit={submit}
        className="space-y-2 border-b border-[var(--os-border)] p-3"
      >
        <p className="text-xs text-[var(--os-muted)]">
          ✍️ Sign Sarthak&apos;s guestbook — leave a message in the kernel log.
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={60}
          className="w-full rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-1.5 text-xs outline-none focus:border-[var(--os-accent)]"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write something nice..."
          maxLength={500}
          rows={2}
          className="os-scroll w-full resize-none rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-1.5 text-xs outline-none focus:border-[var(--os-accent)]"
        />
        <button
          type="submit"
          disabled={posting || !message.trim()}
          className="rounded-lg bg-[var(--os-accent)] px-3 py-1.5 text-xs font-semibold text-[#0a0e1a] disabled:opacity-50"
        >
          {posting ? "Posting..." : "Post Message"}
        </button>
      </form>

      <div className="os-scroll flex-1 space-y-2 overflow-auto p-3">
        {loading ? (
          <div className="text-xs text-[var(--os-muted)]">Loading entries...</div>
        ) : entries.length === 0 ? (
          <div className="text-xs text-[var(--os-muted)]">
            No entries yet. Be the first to sign!
          </div>
        ) : (
          entries.map((e) => (
            <div
              key={e.id}
              className="rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] p-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold os-accent">
                  {e.name || "anonymous"}
                </span>
                <span className="text-[10px] text-[var(--os-muted)]">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-xs">{e.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
