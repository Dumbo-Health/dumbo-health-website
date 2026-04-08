import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const N8N_WEBHOOK_URL = "https://n8n.dumbo.health/webhook/email-capture-from-website";

const Schema = z.object({
  email: z.string().email(),
  page: z.string(),
});

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { email, page } = parsed.data;

  // Notify n8n — fire-and-forget
  fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "coming_soon", page, submittedAt: new Date().toISOString() }),
  }).catch(() => {});

  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return NextResponse.json({ success: true });

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");

  await fetch(`https://track.customer.io/api/v1/customers/${encodeURIComponent(email)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      email,
      coming_soon_interest: true,
      coming_soon_page: page,
      coming_soon_at: Math.floor(Date.now() / 1000),
    }),
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
