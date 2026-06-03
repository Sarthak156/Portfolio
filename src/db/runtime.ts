import { db, hasDatabase } from "@/db";
import { guestbook, visits } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: Date;
};

type VisitRow = {
  id: number;
  count: number;
};

type RuntimeStore = {
  visits: VisitRow[];
  guestbook: GuestbookEntry[];
};

const globalForRuntime = globalThis as typeof globalThis & {
  __sarthakOsRuntimeStore?: RuntimeStore;
};

const runtimeStore =
  globalForRuntime.__sarthakOsRuntimeStore ??
  (globalForRuntime.__sarthakOsRuntimeStore = {
    visits: [],
    guestbook: [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForRuntime.__sarthakOsRuntimeStore = runtimeStore;
}

async function ensureVisitRow() {
  if (!hasDatabase || !db) {
    if (runtimeStore.visits.length === 0) {
      runtimeStore.visits.push({ id: 1, count: 0 });
    }
    return runtimeStore.visits[0];
  }

  const rows = await db.select().from(visits).limit(1);
  if (rows.length === 0) {
    const [created] = await db.insert(visits).values({ count: 0 }).returning();
    return created;
  }
  return rows[0];
}

export async function readVisitsCount() {
  const row = await ensureVisitRow();
  return row.count;
}

export async function incrementVisitsCount() {
  const row = await ensureVisitRow();

  if (!hasDatabase || !db) {
    row.count += 1;
    return row.count;
  }

  const [updated] = await db
    .update(visits)
    .set({ count: sql`${visits.count} + 1` })
    .where(eq(visits.id, row.id))
    .returning();
  return updated.count;
}

export async function listGuestbookEntries() {
  if (!hasDatabase || !db) {
    return [...runtimeStore.guestbook].sort(
      (left, right) => right.createdAt.getTime() - left.createdAt.getTime()
    );
  }

  return db
    .select()
    .from(guestbook)
    .orderBy(desc(guestbook.createdAt))
    .limit(50);
}

export async function addGuestbookEntry(name: string, message: string) {
  if (!hasDatabase || !db) {
    const entry = {
      id: runtimeStore.guestbook.length + 1,
      name,
      message,
      createdAt: new Date(),
    };
    runtimeStore.guestbook.unshift(entry);
    return entry;
  }

  const [row] = await db.insert(guestbook).values({ name, message }).returning();
  return row;
}

export async function checkRuntimeHealth() {
  if (!hasDatabase || !db) {
    return true;
  }

  await db.execute(sql`select 1`);
  return true;
}