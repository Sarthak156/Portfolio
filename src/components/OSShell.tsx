"use client";

import { useEffect } from "react";
import { useOS } from "@/store/os";
import { soundState } from "@/lib/sound";
import Boot from "@/components/Boot";
import Desktop from "@/components/Desktop";

export default function OSShell() {
  const phase = useOS((s) => s.phase);
  const setPhase = useOS((s) => s.setPhase);
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


  // make sure the wheel re-opens whenever we enter the desktop (no desktop icon grid)
  useEffect(() => {
    if (phase !== "desktop") return;
    // nothing extra — Desktop controls the wheel, but we always show it by default
  }, [phase]);

  if (phase === "boot") return <Boot />;
  return <Desktop />;
}
