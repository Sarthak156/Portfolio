"use client";

import dynamic from "next/dynamic";

const OSShell = dynamic(() => import("@/components/OSShell"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0a0e1a] font-mono text-sm text-sky-400">
      booting SarthakOS<span className="cursor-blink">▋</span>
    </div>
  ),
});

export default function Home() {
  return <OSShell />;
}
