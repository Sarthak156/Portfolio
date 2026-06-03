import { checkRuntimeHealth } from "@/db/runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await checkRuntimeHealth();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
