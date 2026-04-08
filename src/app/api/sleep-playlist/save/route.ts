import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";

const N8N_WEBHOOK_URL = "https://n8n.dumbo.health/webhook/email-capture-from-website";

const saveSchema = z.object({
  email: z.string().email(),
  audioUrl: z.string().url(),
  title: z.string().min(1).max(200),
  prompt: z.string().min(1),
  vibe: z.enum(["chill", "dreamy", "deep", "nature"]),
  mood: z.enum(["anxious", "tired", "neutral", "wired"]),
  bedtime: z.enum(["before-10pm", "10pm-midnight", "after-midnight", "varies"]),
  sleepStruggle: z.enum(["falling-asleep", "staying-asleep", "racing-mind", "stress"]),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: track, error } = await supabase
    .from("sleep_tracks")
    .insert({
      email: parsed.data.email,
      title: parsed.data.title,
      audio_url: parsed.data.audioUrl,
      vibe: parsed.data.vibe,
      mood: parsed.data.mood,
      bedtime: parsed.data.bedtime,
      sleep_struggle: parsed.data.sleepStruggle,
      prompt: parsed.data.prompt,
      duration_seconds: 22,
      is_public: true,
    })
    .select("id, title, audio_url, vibe, mood, created_at, play_count")
    .single();

  if (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save track" },
      { status: 500 }
    );
  }

  // Notify n8n — fire-and-forget
  fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: parsed.data.email,
      source: "sleep_playlist",
      vibe: parsed.data.vibe,
      mood: parsed.data.mood,
      sourceUrl: request.headers.get("referer") ?? "",
      submittedAt: new Date().toISOString(),
    }),
  }).catch(() => {});

  return NextResponse.json({ success: true, data: track });
}
