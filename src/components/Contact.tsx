import { useState } from "react";
import type { FormEvent } from "react";
import { Section, Reveal } from "./UI";
import { profile } from "../data/content";
import { Squiggle, CircleScribble } from "./Doodles";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          message,
          _subject: `Portfolio message from ${name || "a visitor"}`,
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setStatus("success");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" eyebrow="06 · reach out" title="Contact" note="the last page — say hi">
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <h3 className="font-display text-3xl leading-tight font-semibold text-ink md:text-4xl">
              Let's build something{" "}
              <span className="relative inline-block">
                measurable
                <CircleScribble className="pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2rem)]" delay={0.5} />
              </span>
              .
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              I'm open to Data Science, ML Engineering, Analytics, and Software Development
              opportunities — internships, collaborations, or a good conversation about forecasting
              sparse demand.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-accent">
                  <span className="sketch-border-soft flex h-9 w-9 items-center justify-center bg-paper-2 transition-transform group-hover:-rotate-6">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
                  </span>
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-accent">
                  <span className="sketch-border-soft flex h-9 w-9 items-center justify-center bg-paper-2 transition-transform group-hover:-rotate-6">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
                  </span>
                  linkedin.com/in/sarthak156
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-accent">
                  <span className="sketch-border-soft flex h-9 w-9 items-center justify-center bg-paper-2 transition-transform group-hover:-rotate-6">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
                  </span>
                  github.com/sarthak156
                </a>
              </li>
            </ul>

            <Squiggle className="mt-10 h-3 w-28" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="paper-card relative rounded-lg p-7 md:p-8" style={{ transform: "rotate(0.4deg)" }}>
            <span className="font-hand absolute -top-4 right-8 rounded bg-paper-3 px-3 py-0.5 text-lg text-steel" style={{ transform: "rotate(2deg)" }}>
              drops straight into my inbox
            </span>
            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.25em] text-steel uppercase">Your name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-muted focus:border-accent"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-mono text-[10px] tracking-[0.25em] text-steel uppercase">Message</span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="A note about a role, a project, or an idea…"
                className="mt-2 w-full resize-none rounded-md border border-line bg-paper px-4 py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-muted focus:border-accent"
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="sketch-border lift mt-6 inline-flex items-center gap-2 bg-accent px-7 py-3 text-sm font-semibold text-paper-2"
              style={{ borderColor: "#2E5347" }}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8l12-6-4 12-2.5-4.5L2 8z"/></svg>
            </button>
            <p className="mt-4 min-h-5 font-mono text-xs text-muted" aria-live="polite">
              {status === "success" ? "Message sent. I’ll see it in my inbox shortly." : null}
              {status === "error" ? "Something went wrong sending the message. Please try again." : null}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
