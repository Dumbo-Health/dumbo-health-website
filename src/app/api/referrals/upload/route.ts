import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";

const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Magic byte signatures — authoritative MIME validation
const MAGIC_BYTES: Record<string, number[][]> = {
  "application/pdf": [[0x25, 0x50, 0x44, 0x46]], // %PDF
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/tiff": [[0x49, 0x49, 0x2a, 0x00], [0x4d, 0x4d, 0x00, 0x2a]],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    [0x50, 0x4b, 0x03, 0x04], // PK zip signature
  ],
};

function checkMagicBytes(buffer: Uint8Array, mimeType: string): boolean {
  const signatures = MAGIC_BYTES[mimeType];
  if (!signatures) return false;
  return signatures.some((sig) => sig.every((byte, i) => buffer[i] === byte));
}

const FieldsSchema = z.object({
  provider_name: z.string().min(1, "Provider name required"),
  provider_email: z.string().email("Valid email required"),
  npi: z
    .string()
    .regex(/^\d{10}$/)
    .optional()
    .or(z.literal("")),
  practice_name: z.string().optional(),
  patient_name: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File must be under 20 MB" },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed. Upload PDF, JPEG, or PNG." },
      { status: 400 }
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!checkMagicBytes(bytes, file.type)) {
    return NextResponse.json(
      { error: "File content does not match declared type" },
      { status: 400 }
    );
  }

  const rawFields = Object.fromEntries(
    ["provider_name", "provider_email", "npi", "practice_name", "patient_name", "source"].map(
      (k) => [k, formData.get(k) ?? ""]
    )
  );
  const parsed = FieldsSchema.safeParse(rawFields);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid fields", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const submissionId = crypto.randomUUID();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `${submissionId}/${sanitizedName}`;

  const supabase = createAdminClient();

  const { error: uploadError } = await supabase.storage
    .from("referral-documents")
    .upload(storagePath, bytes, {
      contentType: file.type,
      metadata: {
        providerName: data.provider_name,
        providerEmail: data.provider_email,
        npi: data.npi ?? "",
        submissionId,
      },
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  const { error: dbError } = await supabase
    .from("referral_document_submissions")
    .insert({
      id: submissionId,
      provider_name: data.provider_name,
      provider_email: data.provider_email,
      npi: data.npi || null,
      practice_name: data.practice_name || null,
      patient_name: data.patient_name || null,
      file_name: file.name,
      file_size_bytes: file.size,
      file_mime_type: file.type,
      storage_path: storagePath,
      status: "pending",
      ip_address: ip,
    });

  if (dbError) {
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }

  // Fire-and-forget — do not block the response on notification delivery
  notifyCustomerIO(data, submissionId, file.name).catch(() => {});

  return NextResponse.json({ success: true, submissionId });
}

async function notifyCustomerIO(
  data: z.infer<typeof FieldsSchema>,
  submissionId: string,
  fileName: string
) {
  const siteId = process.env.CUSTOMERIO_SITE_ID;
  const apiKey = process.env.CUSTOMERIO_API_KEY;
  if (!siteId || !apiKey) return;

  const auth = Buffer.from(`${siteId}:${apiKey}`).toString("base64");
  const baseUrl = "https://track.customer.io/api/v1";
  const isProd = process.env.NODE_ENV === "production";

  await fetch(
    `${baseUrl}/customers/${encodeURIComponent(data.provider_email)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email: data.provider_email,
        provider_name: data.provider_name,
        npi: data.npi ?? null,
        practice_name: data.practice_name ?? null,
        is_referrer: true,
        person_type: "provider",
      }),
    }
  );

  const eventName = isProd
    ? "document_referral_received"
    : "dev_document_referral_received";

  await fetch(
    `${baseUrl}/customers/${encodeURIComponent(data.provider_email)}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        name: eventName,
        data: {
          submission_id: submissionId,
          provider_name: data.provider_name,
          provider_email: data.provider_email,
          npi: data.npi ?? null,
          practice_name: data.practice_name ?? null,
          patient_name: data.patient_name ?? null,
          file_name: fileName,
          source: data.source ?? "unknown",
          submitted_at: Math.floor(Date.now() / 1000),
        },
      }),
    }
  );
}
