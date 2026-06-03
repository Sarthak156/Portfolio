import { addGuestbookEntry, listGuestbookEntries } from "@/db/runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await listGuestbookEntries();
    return Response.json({ ok: true, entries: rows });
  } catch {
    return Response.json({ ok: false, entries: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; message?: string };
    const name = (body.name ?? "").trim().slice(0, 60) || "anonymous";
    const message = (body.message ?? "").trim().slice(0, 500);
    if (!message) {
      return Response.json(
        { ok: false, error: "Message is required" },
        { status: 400 }
      );
    }
    const row = await addGuestbookEntry(name, message);
    return Response.json({ ok: true, entry: row });
  } catch {
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
