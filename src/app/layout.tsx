import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SarthakOS — Browser Operating System Portfolio",
  description:
    "A fully interactive operating-system-style portfolio of Sarthak Goyal. Boot, explore the filesystem, use the terminal, run SLang, play games, and talk to the AI core.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
