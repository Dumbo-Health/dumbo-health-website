import { NextRequest, NextResponse } from "next/server";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "anonymous";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT) return true;
  existing.count += 1;
  return false;
}

const SYSTEM_PROMPT = `You are a thoughtful dream interpreter.
- Offer 2 to 4 symbolic interpretations rooted in common themes and emotional reflection.
- Be warm, concise, and non-judgmental.
- Acknowledge uncertainty because dream meaning is subjective.
- Do not diagnose mental health conditions or provide medical advice.
- Keep replies under 220 words.`;

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as { dream?: string } | null;
  const dream = body?.dream?.trim();

  if (!dream) {
    return NextResponse.json({ error: "Dream description is required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI service is not configured right now." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Interpret this dream:\n\n${dream}` },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to interpret this dream right now." },
        { status: 503 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "The AI service returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Unable to interpret this dream right now." },
      { status: 500 }
    );
  }
}
