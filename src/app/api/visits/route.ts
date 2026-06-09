import { db } from "@/db";
import { visits } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function ensureRow() {
  const rows = await db.select().from(visits).limit(1);
  if (rows.length === 0) {
    const [created] = await db.insert(visits).values({ count: 0 }).returning();
    return created;
  }
  return rows[0];
}

export async function GET() {
  try {
    const row = await ensureRow();
    return Response.json({ ok: true, count: row.count });
  } catch {
    return Response.json({ ok: false, count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const row = await ensureRow();
    const [updated] = await db
      .update(visits)
      .set({ count: sql`${visits.count} + 1` })
      .where(eq(visits.id, row.id))
      .returning();
    return Response.json({ ok: true, count: updated.count });
  } catch {
    return Response.json({ ok: false, count: 0 }, { status: 500 });
  }
}
