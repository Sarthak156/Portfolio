"use client";

import { useState } from "react";
import { useOS } from "@/store/os";
import { playSfx } from "@/lib/sound";

export default function Login() {
  const login = useOS((s) => s.login);
  const [user, setUser] = useState("guest");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (pw && pw !== "guest") {
      setError("Access denied. Nice try, hacker. 🕶️");
      playSfx("error");
      setPw("");
      return;
    }
    playSfx("success");
    login(user || "guest");
  }

  return (
    <div className="os-root crt flex h-screen w-screen flex-col items-center justify-center">
      <div className="anim-fade os-window flex w-80 flex-col items-center rounded-2xl p-6">
        <div
          className="mb-3 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold"
          style={{
            background: "linear-gradient(135deg, var(--os-accent), var(--os-accent2))",
            color: "#0a0e1a",
          }}
        >
          SG
        </div>
        <h1 className="text-lg font-bold">Sarthak Goyal</h1>
        <p className="mb-4 text-xs text-[var(--os-muted)]">SarthakOS · Login</p>

        <form onSubmit={attempt} className="w-full space-y-2">
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="username"
            className="w-full rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-2 text-sm outline-none focus:border-[var(--os-accent)]"
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError("");
            }}
            placeholder="password (leave empty for guest)"
            className="w-full rounded-lg border border-[var(--os-border)] bg-[var(--os-bg2)] px-3 py-2 text-sm outline-none focus:border-[var(--os-accent)]"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--os-accent)] py-2 text-sm font-semibold text-[#0a0e1a]"
          >
            Log In
          </button>
        </form>
        <button
          onClick={() => {
            playSfx("success");
            login("guest");
          }}
          className="mt-2 text-xs text-[var(--os-muted)] underline"
        >
          → Continue as guest
        </button>
      </div>
    </div>
  );
}
