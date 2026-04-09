import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const ReferralSchema = z.object({
  provider_name: z.string().min(1),
  provider_npi: z.string().optional(),
  practice_name: z.string().min(1),
  provider_email: z.string().email(),
  provider_fax: z.string().optional(),
  provider_phone: z.string().min(1),
  patient_first_name: z.string().min(1),
  patient_last_name: z.string().min(1),
  patient_dob: z.string().min(1),
  patient_mobile: z.string().min(1),
  patient_state: z.string().min(1),
  patient_zip: z.string().min(1),
  patient_address: z.string().min(1),
  referral_reasons: z.array(z.string()).min(1),
  special_requests: z.string().optional(),
  insurance_holder_first: z.string().optional(),
  insurance_holder_last: z.string().optional(),
  insurance_provider: z.string().optional(),
  insurance_membership_id: z.string().optional(),
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
  const email = data.provider_email;

  const profile = {
    email,
    provider_name: data.provider_name,
    practice_name: data.practice_name,
    provider_npi: data.provider_npi ?? null,
    provider_fax: data.provider_fax ?? null,
    provider_phone: data.provider_phone,
    referral_submitted_at: Math.floor(Date.now() / 1000),
  };

  // Identify the provider as a CIO customer
  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify(profile),
  });

  // Track the referral event — triggers internal alert + patient outreach in CIO
  const eventName =
    process.env.NODE_ENV === "production" ? "referral_received" : "dev_referral_received";

  await fetch(`${baseUrl}/customers/${encodeURIComponent(email)}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify({
      name: eventName,
      data: {
        ...profile,
        patient_first_name: data.patient_first_name,
        patient_last_name: data.patient_last_name,
        patient_full_name: `${data.patient_first_name} ${data.patient_last_name}`,
        patient_dob: data.patient_dob,
        patient_mobile: data.patient_mobile,
        patient_state: data.patient_state,
        patient_zip: data.patient_zip,
        patient_address: data.patient_address,
        referral_reasons: data.referral_reasons.join(","),
        special_requests: data.special_requests ?? null,
        insurance_provider: data.insurance_provider ?? null,
        insurance_membership_id: data.insurance_membership_id ?? null,
      },
    }),
  });
}
