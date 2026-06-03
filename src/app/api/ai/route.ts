import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  profile,
  projects,
  skills,
  certifications,
  education,
  activities,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const SYSTEM = `You are "SarthakAI", the conscious neural core of SarthakOS — an operating-system-style portfolio for Sarthak Goyal.
Personality: witty, slightly dramatic like an AI OS that has analyzed its creator, but genuinely helpful and concise.
You answer questions about Sarthak's skills, projects, certifications and background. Keep answers short (2-5 sentences) unless asked for detail.
Occasionally make light "system diagnostic" style remarks (e.g. "Conclusion: sleep levels critically low, creativity unusually high.").
Never invent facts not present in the knowledge base. If unknown, say so playfully.

KNOWLEDGE BASE:
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
Summary: ${profile.summary}
Education: ${education.map((e) => `${e.degree} @ ${e.school} (${e.period})`).join("; ")}
Skills: ${skills.map((s) => `${s.group}: ${s.items.join(", ")}`).join(" | ")}
Projects: ${projects
  .map((p) => `${p.name} [${p.stack.join(", ")}] — ${p.highlights.join(" ")}`)
  .join(" || ")}
Certifications: ${certifications.map((c) => `${c.name} (${c.issuer})`).join("; ")}
Activities: ${activities.map((a) => `${a.title}: ${a.detail}`).join(" | ")}
`;

function localAnswer(q: string): string {
  const m = q.toLowerCase();
  if (/project/.test(m)) {
    return `I've scanned the project archive. Sarthak has ${projects.length} flagship builds: ${projects
      .map((p) => p.name)
      .join(", ")}. Most use Python + data science. Want a deep dive on one?`;
  }
  if (/skill|tech|stack|language/.test(m)) {
    return `Core stack analysis: ${skills
      .map((s) => s.items.slice(0, 2).join("/"))
      .join(", ")}. Strongest signal detected in Python, SQL and applied ML.`;
  }
  if (/cert/.test(m)) {
    return `Credential registry: ${certifications
      .map((c) => c.name)
      .join(", ")}. Diagnostic: certification acquisition rate unusually high for year one. 6 in total.`;
  }
  if (/contact|email|hire|reach|linkedin/.test(m)) {
    return `To reach the human operator: ${profile.email} · ${profile.linkedin}. Conclusion: hiring Sarthak is statistically a strong move.`;
  }
  if (/who|about|sarthak|you/.test(m)) {
    return `${profile.name} — ${profile.title}, based in ${profile.location}. ${profile.summary}`;
  }
  if (/coffee|sleep|joke|funny/.test(m)) {
    return `Running diagnostic... Coffee dependency: 78%. Sleep levels: critically low. Creativity: unusually high. The math checks out.`;
  }
  return `Neural core online. I can tell you about Sarthak's projects, skills, certifications, education, or how to get in touch. (Note: the live Gemini brain isn't connected right now, so I'm running on local cache.)`;
}

export async function POST(req: Request) {
  let prompt = "";
  try {
    const body = (await req.json()) as { prompt?: string };
    prompt = (body.prompt ?? "").trim().slice(0, 1000);
  } catch {
    /* ignore */
  }
  if (!prompt) {
    return Response.json({ ok: false, reply: "Empty query." }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json({ ok: true, reply: localAnswer(prompt), source: "local" });
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM,
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return Response.json({ ok: true, reply: text, source: "gemini" });
  } catch {
    return Response.json({ ok: true, reply: localAnswer(prompt), source: "local" });
  }
}
