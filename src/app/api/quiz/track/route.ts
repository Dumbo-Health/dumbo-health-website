import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";

const TrackSchema = z.object({
  session_id: z.string().uuid().optional().nullable(),
  submission_id: z.string().optional().nullable(),
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

  const { submission_id, event, ...funnelData } = parsed.data;
  const sb = createAdminClient();

  // Always record the funnel event
  await sb.from("quiz_funnel_events").insert({
    ...funnelData,
    environment: process.env.NODE_ENV ?? "development",
  });

  // On buy_click with a real submission ID: stamp checkout intent + notify CIO
  if (event === "buy_click" && submission_id && submission_id !== "submitted") {
    const { data: row } = await sb
      .from("quiz_submissions")
      .update({ checkout_cta_clicked_at: new Date().toISOString() })
      .eq("id", submission_id)
      .select("email")
      .single();

    if (row?.email) {
      notifyCioCheckoutClick(row.email).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}

async function notifyCioCheckoutClick(email: string) {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return;

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const eventName =
    process.env.NODE_ENV === "production"
      ? "wb_checkout_cta_clicked"
      : "dev_wb_checkout_cta_clicked";

  await fetch(
    `https://track.customer.io/api/v1/customers/${encodeURIComponent(email)}/events`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ name: eventName, data: { source: "quiz_results" } }),
    }
  );
}
