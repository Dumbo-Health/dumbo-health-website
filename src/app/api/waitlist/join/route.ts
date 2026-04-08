import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase-admin";

const N8N_WEBHOOK_URL = "https://n8n.dumbo.health/webhook/email-capture-from-website";

const WaitlistSchema = z.object({
  email:    z.email(),
  state:    z.string().min(1),
  interest: z.enum(["cash", "insurance"]),
  source:   z.string().default("service_area_banner"),
});

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const parsed = WaitlistSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
  }

  const { email, state, interest, source } = parsed.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check for existing email — use admin client to bypass RLS (anon can only INSERT)
  const { data: existing } = await createAdminClient()
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ success: true, already_exists: true });
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    state,
    interest,
    source,
    environment: process.env.NODE_ENV,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Notify n8n — fire-and-forget
  fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "waitlist", waitlist_state: state, interest, submittedAt: new Date().toISOString() }),
  }).catch(() => {});

  await notifyCustomerIO({ email, state, interest, source }).catch(() => {
    // CIO errors should not block the waitlist response
  });

  return NextResponse.json({ success: true });
}

// ── CIO helpers ────────────────────────────────────────────────────────────────

async function notifyCustomerIO({
  email,
  state,
  interest,
  source,
}: {
  email: string;
  state: string;
  interest: string;
  source: string;
}) {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return;

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const baseUrl = "https://track.customer.io/api/v1";
  const attrs = {
    email,
    waitlist_state: state,
    waitlist_interest: interest,
    waitlist_source: source,
    waitlist_joined_at: Math.floor(Date.now() / 1000),
  };

  // Identify — set waitlist attributes on the customer profile
  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify(attrs),
  });

  // Track event
  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      name: "waitlist_joined",
      data: {
        waitlist_state: state,
        waitlist_interest: interest,
        waitlist_source: source,
      },
    }),
  });
}
