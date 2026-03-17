import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const SubmissionSchema = z.object({
  flow_slug: z.string(),
  answers: z.record(z.string(), z.unknown()),
  tags: z.array(z.string()),
  risk_score: z.number(),
  state: z.string().nullable(),
  insurance: z.string().nullable(),
  email: z.string().nullable().optional(),
  device_type: z.string(),
  utm_source: z.string().nullable(),
  utm_medium: z.string().nullable(),
  utm_campaign: z.string().nullable(),
});

type Submission = z.infer<typeof SubmissionSchema>;

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const parsed = SubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
  }

  const submission = parsed.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.from("quiz_submissions").insert(submission);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (submission.email) {
    await notifyCustomerIO(submission).catch(() => {
      // CIO errors should not block the submission response
    });
  }

  return NextResponse.json({ success: true });
}

// ── CIO helpers ────────────────────────────────────────────────────────────────

function getRiskLevel(score: number): "high" | "moderate" | "low" {
  if (score >= 6) return "high";
  if (score >= 3) return "moderate";
  return "low";
}

function getTopSymptom(answers: Record<string, unknown>): string {
  if (answers["breathing-pauses"] === "yes") return "breathing pauses during sleep";
  if (answers["snoring"] === "yes-loud") return "loud snoring";
  if (answers["daytime-sleepiness"] === "daily") return "daily fatigue";
  const morning = answers["morning-symptoms"];
  if (Array.isArray(morning) && morning.includes("headache")) return "morning headaches";
  if (answers["cpap-satisfaction"] === "stopped") return "stopped using CPAP";
  if (answers["cpap-satisfaction"] === "struggling") return "struggling with CPAP";
  return "disrupted sleep";
}

function str(val: unknown): string | null {
  if (typeof val === "string" && val.length > 0) return val;
  return null;
}

function arr(val: unknown): string | null {
  if (Array.isArray(val) && val.length > 0) return val.join(",");
  return null;
}

function buildProfile(submission: Submission) {
  const a = submission.answers;
  return {
    // ── Core ──────────────────────────────────────────────────────
    email: submission.email!,
    quiz_flow: submission.flow_slug,
    quiz_risk_score: submission.risk_score,
    quiz_risk_level: getRiskLevel(submission.risk_score),
    quiz_top_symptom: getTopSymptom(a),
    quiz_tags: submission.tags.join(","),
    quiz_state: submission.state,
    quiz_insurance: submission.insurance,
    quiz_completed_at: Math.floor(Date.now() / 1000),
    // ── Undiagnosed symptoms ──────────────────────────────────────
    quiz_snoring: str(a["snoring"]),
    quiz_sleepiness: str(a["daytime-sleepiness"]),
    quiz_breathing_pauses: str(a["breathing-pauses"]),
    quiz_morning_symptoms: arr(a["morning-symptoms"]),
    quiz_bmi: str(a["bmi"]),
    quiz_conditions: arr(a["conditions"]),
    // ── Diagnosed ────────────────────────────────────────────────
    quiz_cpap_satisfaction: str(a["cpap-satisfaction"]),
    quiz_dx_needs: arr(a["dx-needs"]),
    // ── Attribution ──────────────────────────────────────────────
    quiz_utm_source: submission.utm_source,
    quiz_utm_medium: submission.utm_medium,
    quiz_utm_campaign: submission.utm_campaign,
    quiz_device: submission.device_type,
  };
}

async function notifyCustomerIO(submission: Submission) {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return;

  const email = submission.email!;
  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const baseUrl = "https://track.customer.io/api/v1";
  const profile = buildProfile(submission);

  // Identify — sets all flat attributes on the customer profile
  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify(profile),
  });

  // Track event — all flat attrs + full answers map for reference
  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      name: process.env.NODE_ENV === "production" ? "wb_quiz_completed" : "dev_wb_quiz_completed",
      data: { ...profile, answers: submission.answers },
    }),
  });
}
