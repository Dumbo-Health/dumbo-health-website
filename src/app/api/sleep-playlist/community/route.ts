import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(): Promise<NextResponse> {
  const supabase = createAdminClient();

  const { data: tracks, error } = await supabase
    .from("sleep_tracks")
    .select("id, created_at, title, audio_url, vibe, mood, duration_seconds, play_count")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load community tracks" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: tracks ?? [] });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const id =
    body !== null &&
    typeof body === "object" &&
    "id" in body &&
    typeof (body as Record<string, unknown>).id === "string"
      ? (body as { id: string }).id
      : null;

  if (!id) {
    return NextResponse.json({ success: false, error: "Missing track id" }, { status: 400 });
  }

  const supabase = createAdminClient();
  await supabase.rpc("increment_play_count", { track_id: id });

  return NextResponse.json({ success: true });
}
