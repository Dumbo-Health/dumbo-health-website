export const EMAIL_CAPTURE_ENDPOINT = "/go/api/funnel/email-capture";
export const EMAIL_CAPTURE_STORAGE_KEY = "dumbo:email-capture-submitted";

export interface EmailCapturePayload {
  email: string;
  sessionId?: string | null;
  sourceUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface EmailCaptureResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  details?: unknown;
}

export async function submitEmailCapture(
  payload: EmailCapturePayload
): Promise<EmailCaptureResponse> {
  const response = await fetch(EMAIL_CAPTURE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") ?? "";
  let parsedBody: EmailCaptureResponse | string | null = null;

  try {
    if (contentType.includes("application/json")) {
      parsedBody = (await response.json()) as EmailCaptureResponse;
    } else {
      parsedBody = await response.text();
    }
  } catch {
    parsedBody = null;
  }

  if (!response.ok) {
    const errorMessage =
      typeof parsedBody === "string"
        ? parsedBody
        : parsedBody?.error || "Failed to submit email capture.";

    throw new Error(errorMessage);
  }

  if (parsedBody && typeof parsedBody !== "string") {
    return parsedBody;
  }

  return { success: true, data: parsedBody };
}
