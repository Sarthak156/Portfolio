import { incrementVisitsCount, readVisitsCount } from "@/db/runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await readVisitsCount();
    return Response.json({ ok: true, count });
  } catch {
    return Response.json({ ok: false, count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const count = await incrementVisitsCount();
    return Response.json({ ok: true, count });
  } catch {
    return Response.json({ ok: false, count: 0 }, { status: 500 });
  }
}
