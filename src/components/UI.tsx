import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SketchUnderline } from "./Doodles";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  note,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 md:px-10 md:py-28 ${className}`}>
      <Reveal>
        <div className="mb-12 md:mb-16">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-[0.25em] text-steel uppercase">{eyebrow}</span>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>
          <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-1">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {title}
            </h2>
            {note && (
              <span className="font-hand text-xl text-accent md:text-2xl" style={{ transform: "rotate(-1.5deg)" }}>
                {note}
              </span>
            )}
          </div>
          <SketchUnderline className="mt-1 h-3 w-40" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-[11px] text-ink-soft">
      {children}
    </span>
  );
}
