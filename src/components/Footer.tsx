import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row md:px-10">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Sarthak Goyal — journal entry, closed.
        </p>
        <p className="font-hand text-xl text-steel" style={{ transform: "rotate(-1deg)" }}>
          designed like a notebook, built like a system ✎
        </p>
        <div className="flex gap-5 font-mono text-xs">
          <a href={profile.github} target="_blank" rel="noreferrer" className="ink-link text-ink-soft hover:text-accent">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="ink-link text-ink-soft hover:text-accent">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="ink-link text-ink-soft hover:text-accent">Email</a>
        </div>
      </div>
    </footer>
  );
}
