import { NextResponse } from "next/server";

const EMAIL_CAPTURE_WEBHOOK_URL =
  "https://n8n.dumbo.health/webhook/email-capture-from-website";

interface IncomingEmailCapturePayload {
  email: string;
  sessionId?: string | null;
  sourceUrl?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  let payload: IncomingEmailCapturePayload;

  try {
    payload = (await request.json()) as IncomingEmailCapturePayload;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON body.",
      },
      { status: 400 }
    );
  }

  const { email } = payload;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      {
        success: false,
        error: "Email is required.",
      },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email.trim())) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid email address.",
      },
      { status: 400 }
    );
  }

  const forwardedPayload = {
    ...payload,
    email: email.trim(),
    submittedAt: new Date().toISOString(),
  };

  try {
    const upstreamResponse = await fetch(EMAIL_CAPTURE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forwardedPayload),
    });

    const upstreamContentType = upstreamResponse.headers.get("content-type") ?? "";
    const isJson = upstreamContentType.includes("application/json");
    const upstreamBody = isJson
      ? await upstreamResponse.json()
      : await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to forward email capture.",
          details: upstreamBody,
        },
        { status: upstreamResponse.status || 502 }
      );
    }

    return NextResponse.json({ success: true, data: upstreamBody ?? null });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error forwarding email capture.",
      },
      { status: 500 }
    );
  }
}
