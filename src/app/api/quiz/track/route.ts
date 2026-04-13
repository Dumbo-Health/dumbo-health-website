import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";

const TrackSchema = z.object({
  session_id: z.string().uuid(),
  event: z.enum(["started", "step_completed", "completed", "abandoned", "buy_click"]),
  flow_slug: z.string().optional().nullable(),
  section_slug: z.string().optional().nullable(),
  question_slug: z.string().optional().nullable(),
  question_index: z.number().int().optional().nullable(),
  route_path: z.array(z.string()).optional().nullable(),
  device_type: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ ok: false }, { status: 400 });

  const parsed = TrackSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const sb = createAdminClient();
  await sb.from("quiz_funnel_events").insert({
    ...parsed.data,
    environment: process.env.NODE_ENV ?? "development",
  });

  return NextResponse.json({ ok: true });
}
