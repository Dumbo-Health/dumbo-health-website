import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const ReferralSchema = z.object({
  provider_name: z.string().min(1),
  provider_npi: z.string().refine(val => !val || /^\d{10}$/.test(val), "NPI must be 10 digits").optional(),
  practice_name: z.string().min(1),
  provider_email: z.string().email(),
  provider_fax: z.string().refine(val => !val || val.replace(/\D/g, "").length === 10, "Invalid fax").optional(),
  provider_phone: z.string().refine(val => val.replace(/\D/g, "").length === 10, "Invalid phone"),
  patient_first_name: z.string().min(1),
  patient_last_name: z.string().min(1),
  patient_dob: z.string().min(1).refine(val => !val || new Date(val) <= new Date(), "Invalid date of birth"),
  patient_mobile: z.string().refine(val => val.replace(/\D/g, "").length === 10, "Invalid mobile"),
  patient_email: z.string().email(),
  patient_state: z.string().min(2).max(2),
  patient_zip: z.string().regex(/^\d{5}$/),
  patient_address: z.string().min(1),
  referral_reasons: z.array(z.string()).min(1),
  special_requests: z.string().max(300).optional(),
});

type ReferralData = z.infer<typeof ReferralSchema>;

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  if (!raw) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const parsed = ReferralSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error: dbError } = await supabase.from("referrals").insert({
    ...data,
    environment: process.env.NODE_ENV,
    status: "received",
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  await notifyCustomerIO(data).catch(() => {
    // CIO errors must not block the submission response
  });

  return NextResponse.json({ success: true });
}

async function notifyCustomerIO(data: ReferralData) {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return;

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const baseUrl = "https://track.customer.io/api/v1";
  const isProd = process.env.NODE_ENV === "production";
  const now = Math.floor(Date.now() / 1000);
  const providerEmail = data.provider_email;
  const patientPhone = data.patient_mobile.replace(/\D/g, "");

  // ── Identify provider ─────────────────────────────────────────────────────
  await fetch(`${baseUrl}/customers/${encodeURIComponent(providerEmail)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      email: providerEmail,
      provider_name: data.provider_name,
      practice_name: data.practice_name,
      provider_npi: data.provider_npi ?? null,
      provider_phone: data.provider_phone,
      is_referrer: true,
      person_type: "provider",
      referral_submitted_at: now,
    }),
  });

  // ── Identify patient (email as CIO id) ────────────────────────────────────
  const patientEmail = data.patient_email;
  await fetch(`${baseUrl}/customers/${encodeURIComponent(patientEmail)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      email: patientEmail,
      phone: patientPhone,
      first_name: data.patient_first_name,
      last_name: data.patient_last_name,
      patient_dob: data.patient_dob,
      patient_state: data.patient_state,
      patient_zip: data.patient_zip,
      patient_address: data.patient_address,
      referred_by_email: providerEmail,
      referred_by_name: data.provider_name,
      referred_by_practice: data.practice_name,
      person_type: "patient",
      referral_received_at: now,
    }),
  });

  // ── Shared event payload ──────────────────────────────────────────────────
  const eventData = {
    provider_name: data.provider_name,
    practice_name: data.practice_name,
    provider_email: providerEmail,
    provider_phone: data.provider_phone,
    patient_first_name: data.patient_first_name,
    patient_last_name: data.patient_last_name,
    patient_full_name: `${data.patient_first_name} ${data.patient_last_name}`,
    patient_email: data.patient_email,
    patient_dob: data.patient_dob,
    patient_mobile: data.patient_mobile,
    patient_state: data.patient_state,
    patient_zip: data.patient_zip,
    patient_address: data.patient_address,
    referral_reasons: data.referral_reasons.join(","),
    special_requests: data.special_requests ?? null,
    referral_submitted_at: now,
  };

  // Fire provider + patient events in parallel
  // Provider event → triggers confirmation email to referrer + internal alert
  // Patient event  → triggers patient outreach (SMS for now; email once collected)
  const providerEvent = isProd ? "referral_received" : "dev_referral_received";
  const patientEvent = isProd ? "referral_received_patient" : "dev_referral_received_patient";

  await Promise.all([
    fetch(`${baseUrl}/customers/${encodeURIComponent(providerEmail)}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ name: providerEvent, data: eventData }),
    }),
    fetch(`${baseUrl}/customers/${encodeURIComponent(patientEmail)}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ name: patientEvent, data: eventData }),
    }),
  ]);
}
