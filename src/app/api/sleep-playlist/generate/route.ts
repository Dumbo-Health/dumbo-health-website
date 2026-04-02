import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";

// Allow up to 60s on Vercel Pro (22s audio gen + OpenAI + upload)
export const maxDuration = 60;

const requestSchema = z.object({
  vibe: z.enum(["chill", "dreamy", "deep", "nature"]),
  mood: z.enum(["anxious", "tired", "neutral", "wired"]),
  bedtime: z.enum(["before-10pm", "10pm-midnight", "after-midnight", "varies"]),
  sleepStruggle: z.enum(["falling-asleep", "staying-asleep", "racing-mind", "stress"]),
});

type GenerateRequest = z.infer<typeof requestSchema>;

const vibeDescriptions: Record<GenerateRequest["vibe"], string> = {
  chill: "calm lo-fi beats with soft piano, gentle rain, slow BPM",
  dreamy: "ethereal ambient pads, reverb-heavy synths, floating textures",
  deep: "deep bass drones, theta wave frequencies, minimalist meditation",
  nature: "binaural forest sounds, distant water, soft wind, occasional birdsong",
};

const moodDirections: Record<GenerateRequest["mood"], string> = {
  anxious: "grounding, slow, steady — anchoring the nervous system downward",
  tired: "gentle and supportive, soft and warm, nurturing",
  neutral: "balanced, peaceful, drifting",
  wired: "sedating, heavy, decelerating tempo, pulling toward stillness",
};

function buildMusicPrompt(data: GenerateRequest): string {
  return [
    `Ambient sleep music: ${vibeDescriptions[data.vibe]}.`,
    `Emotional direction: ${moodDirections[data.mood]}.`,
    `No percussion, no vocals, no sudden changes.`,
    `Continuous, seamlessly looping texture optimized for sleep onset.`,
  ].join(" ");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const elevenlabsKey = process.env.ELEVENLABS_API_KEY;

  if (!openaiKey) {
    return NextResponse.json(
      { success: false, error: "OpenAI not configured" },
      { status: 500 }
    );
  }
  if (!elevenlabsKey) {
    return NextResponse.json(
      { success: false, error: "ElevenLabs not configured" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { vibe, mood, bedtime, sleepStruggle } = parsed.data;

  // Step 1: OpenAI refines the music prompt
  // ElevenLabs hard cap: 450 characters
  const ELEVENLABS_MAX_CHARS = 440;

  const systemPrompt = `You are a sleep music prompt engineer for ElevenLabs sound generation.
Write ONE sentence (under 400 characters total) describing ambient sleep audio.
Include: instrument or texture, atmosphere, tempo feel. No lyrics, no drums, no harsh sounds.`;

  const userContent = `Vibe: ${vibeDescriptions[vibe]}. Mood: ${moodDirections[mood]}. Write the prompt now:`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      max_tokens: 80,
      temperature: 0.85,
    }),
  });

  if (!openaiRes.ok) {
    return NextResponse.json(
      { success: false, error: "Prompt generation failed" },
      { status: 502 }
    );
  }

  const openaiData = await openaiRes.json() as {
    choices: Array<{ message: { content: string | null } }>;
  };
  const rawPrompt = openaiData.choices[0]?.message?.content?.trim() ?? buildMusicPrompt(parsed.data);
  // Hard cap to stay within ElevenLabs 450-char limit
  const musicPrompt = rawPrompt.length > ELEVENLABS_MAX_CHARS
    ? rawPrompt.slice(0, ELEVENLABS_MAX_CHARS)
    : rawPrompt;

  // Step 2: ElevenLabs generates audio
  const elevenlabsRes = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": elevenlabsKey,
    },
    body: JSON.stringify({
      text: musicPrompt,
      duration_seconds: 22,
      prompt_influence: 0.3,
    }),
  });

  if (!elevenlabsRes.ok) {
    const errBody = await elevenlabsRes.text();
    return NextResponse.json(
      {
        success: false,
        error: "Music generation failed. Please try again.",
        detail: errBody,
        status: elevenlabsRes.status,
      },
      { status: 502 }
    );
  }

  const audioBuffer = await elevenlabsRes.arrayBuffer();
  const audioBytes = Buffer.from(audioBuffer);

  // Step 3: Upload to Supabase storage
  const supabase = createAdminClient();

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === "sleep-tracks");
  if (!bucketExists) {
    await supabase.storage.createBucket("sleep-tracks", {
      public: true,
      fileSizeLimit: 10485760, // 10 MB
    });
  }

  const fileName = `${Date.now()}-${vibe}-${mood}.mp3`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("sleep-tracks")
    .upload(fileName, audioBytes, {
      contentType: "audio/mpeg",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { success: false, error: "Audio storage failed" },
      { status: 500 }
    );
  }

  const { data: urlData } = supabase.storage
    .from("sleep-tracks")
    .getPublicUrl(uploadData.path);

  const vibeLabels: Record<GenerateRequest["vibe"], string> = {
    chill: "Chill Lo-Fi",
    dreamy: "Dreamy Ambient",
    deep: "Deep Meditation",
    nature: "Nature Sounds",
  };

  const moodSuffix: Record<GenerateRequest["mood"], string> = {
    anxious: "anxious nights",
    tired: "tired minds",
    neutral: "peaceful rest",
    wired: "wired nights",
  };

  const title = `${vibeLabels[vibe]} for ${moodSuffix[mood]}`;

  return NextResponse.json({
    success: true,
    data: {
      audioUrl: urlData.publicUrl,
      title,
      prompt: musicPrompt,
      vibe,
      mood,
      bedtime,
      sleepStruggle,
    },
  });
}
