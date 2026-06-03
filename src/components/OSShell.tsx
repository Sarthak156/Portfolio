"use client";

import { useEffect } from "react";
import { useOS } from "@/store/os";
import { soundState } from "@/lib/sound";
import Boot from "@/components/Boot";
import Login from "@/components/Login";
import Desktop from "@/components/Desktop";

export default function OSShell() {
  const phase = useOS((s) => s.phase);
  const theme = useOS((s) => s.theme);
  const soundOn = useOS((s) => s.soundOn);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "neon" ? "" : theme
    );
  }, [theme]);

  useEffect(() => {
    soundState.on = soundOn;
  }, [soundOn]);

  if (phase === "boot") return <Boot />;
  if (phase === "login") return <Login />;
  return <Desktop />;
}
