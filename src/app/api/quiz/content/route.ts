import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const flowSlug = searchParams.get("flow") ?? "undiagnosed";

  const [{ data: steps }, { data: signals }] = await Promise.all([
    sb
      .from("quiz_result_steps")
      .select("step_order, title, body")
      .eq("flow_slug", flowSlug)
      .order("step_order"),
    sb
      .from("quiz_signal_copy")
      .select("signal_key, label, detail, icon_path"),
  ]);

  return NextResponse.json({ steps: steps ?? [], signals: signals ?? [] });
}
