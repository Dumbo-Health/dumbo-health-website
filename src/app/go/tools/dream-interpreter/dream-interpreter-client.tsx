"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MarkdownMessage from "@/components/MarkdownMessage";
import {
  EmailCaptureProvider,
  useEmailCapture,
} from "@/components/EmailCaptureProvider";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
};

const quickDreams = [
  "I was flying above the ocean and then suddenly falling.",
  "I found a hidden room in my house.",
  "I was being chased but could not run.",
  "I lost my teeth in front of a crowd.",
];

export function DreamInterpreterClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Describe a dream and I will offer a few symbolic interpretations for reflection. This is not psychological or medical advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (preset?: string) => {
    const dream = (preset ?? input).trim();
    if (!dream || isLoading) return;

    const thinkingId = `${Date.now()}-thinking`;

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", content: dream },
      { id: thinkingId, role: "assistant", content: "", isThinking: true },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      await ensureEmailCapture({
        metadata: {
          page: "dream-interpreter",
          dreamLength: dream.length,
        },
      });

      const response = await fetch("/go/api/tools/dream-interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to interpret this dream right now.");
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === thinkingId
            ? { id: `${Date.now()}-assistant`, role: "assistant", content: payload.reply ?? "" }
            : item
        )
      );
    } catch (error) {
      setMessages((current) =>
        current.map((item) =>
          item.id === thinkingId
            ? {
                id: `${Date.now()}-error`,
                role: "assistant",
                content:
                  error instanceof Error
                    ? error.message
                    : "Unable to interpret this dream right now.",
              }
            : item
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Dream Interpreter
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Share a dream and get a few symbolic interpretations rooted in common
              themes, reflection prompts, and gentle context.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
            <div className="rounded-3xl border border-sunlight bg-white p-5 sm:p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-2xl rounded-2xl px-4 py-3 font-body leading-7 ${
                        message.role === "user"
                          ? "bg-peach text-white"
                          : "bg-daylight text-midnight"
                      }`}
                    >
                      {message.isThinking ? (
                        <div className="flex items-center">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                            <div
                              className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                          <span className="ml-2 text-xs opacity-70">interpreting...</span>
                        </div>
                      ) : (
                        <MarkdownMessage
                          content={message.content}
                          isUser={message.role === "user"}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-sunlight pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                  Quick prompts
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickDreams.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="rounded-full border border-sunlight bg-white px-3 py-2 text-sm text-midnight transition-colors hover:bg-daylight"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Describe your dream, the feeling, and any details that stood out..."
                    className="min-h-24 bg-white"
                  />
                  <Button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="self-end rounded-lg font-mono tracking-wider"
                  >
                    <Sparkles className="h-4 w-4" />
                    Interpret
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-5 font-body text-sm leading-6 text-midnight/68">
              Dream interpretations are subjective and meant for curiosity and
              self-reflection only. They are not therapy, diagnosis, or medical advice.
            </p>

            <div className="mt-6">
              <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
                <Link href="/go/tools">Back To Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Educational Content ─────────────────────────────────────────── */}

      {/* Section 1: The Neuroscience of Dreaming */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">The Neuroscience of Dreaming</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            Dreaming occurs primarily in REM sleep (Rapid Eye Movement), which comprises 20–25% of a healthy night&apos;s sleep. During REM, the prefrontal cortex (rational thinking) is relatively suppressed while the amygdala (emotion) and visual cortex are highly active — explaining why dreams feel vivid and emotionally intense but logically strange.
          </p>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            The average person dreams for 2 hours per night across 4–6 REM periods; most dreams are immediately forgotten. REM cycles lengthen through the night — the richest dreaming happens in the final 2 hours of sleep (cycles 4–5).
          </p>
          <p className="font-body text-lg text-midnight leading-8">
            Sleep deprivation causes <strong>REM rebound</strong>: when sleep is finally possible, the brain prioritizes and prolongs REM, resulting in more vivid or unusual dreams.
          </p>
        </div>
      </section>

      {/* Section 2: Why We Dream */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-8">Why We Dream — Current Scientific Theories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Memory Consolidation", desc: "REM sleep replays waking experiences and transfers information from hippocampus (short-term) to cortex (long-term). Studying before sleep improves recall by 20–40%." },
              { label: "Emotional Regulation", desc: "The \"Overnight Therapy\" hypothesis (Matthew Walker): REM sleep separates the emotional charge from memories, reducing the psychological impact of distressing experiences." },
              { label: "Threat Simulation", desc: "Evolutionary theory suggests dreaming runs simulations of threats so we can rehearse responses without real-world risk." },
              { label: "Default Mode Network Activity", desc: "Dreaming may reflect the brain's resting state — the DMN generates narrative experiences using recent memories as raw material." },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-sunlight">
                <p className="font-heading text-base text-midnight mb-2">{item.label}</p>
                <p className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Common Dream Themes */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-6">Common Dream Themes and What Research Shows</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm text-midnight border-collapse">
              <thead>
                <tr className="border-b border-sunlight">
                  <th className="text-left py-3 pr-4 font-heading text-base">Dream Theme</th>
                  <th className="text-left py-3 pr-4 font-heading text-base">Prevalence</th>
                  <th className="text-left py-3 font-heading text-base">Common Psychological Association</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Being chased", "80% of adults", "Anxiety, avoidance, unresolved stress"],
                  ["Flying", "60% of adults", "Desire for freedom, sense of control"],
                  ["Falling", "73% of adults", "Loss of control, transition, uncertainty"],
                  ["Teeth falling out", "39% of adults", "Communication anxiety, self-image concerns"],
                  ["Unprepared for a test", "50%+ of adults", "Performance anxiety, competence concerns"],
                  ["Unable to move", "40% of adults", "Sleep paralysis overlap; transition states"],
                ].map(([theme, prev, assoc]) => (
                  <tr key={theme} className="border-b border-sunlight">
                    <td className="py-3 pr-4" style={{ color: "rgba(3,31,61,0.85)" }}>{theme}</td>
                    <td className="py-3 pr-4" style={{ color: "rgba(3,31,61,0.7)" }}>{prev}</td>
                    <td className="py-3" style={{ color: "rgba(3,31,61,0.7)" }}>{assoc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Dreams and Sleep Disorders */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">Dreams and Sleep Disorders</h2>
          <ul className="space-y-3">
            {[
              "Nightmares (distressing dreams causing awakening) affect 5–8% of adults regularly and are associated with PTSD, anxiety disorders, and depression.",
              "REM Sleep Behavior Disorder (RBD): Acting out dreams physically — potentially a precursor to Parkinson's disease or Lewy body dementia.",
              "Sleep paralysis with hallucinations: Occurs during transitions in/out of REM; experienced by 20–40% of people at least once.",
              "OSA can trigger vivid, distressing dreams by causing oxygen drops and arousals during REM sleep; treating OSA often improves dream quality.",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 text-midnight flex gap-3 list-none">
                <span className="text-peach mt-1 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section className="bg-midnight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-white mb-6">Key Takeaways</h2>
          <ul className="space-y-3">
            {[
              "Dreaming primarily occurs in REM sleep — the most cognitively active stage.",
              "Dreams serve memory consolidation and emotional processing functions.",
              "Common dream themes are universal and reflect universal human anxieties.",
              "Recurring nightmares or violent dream behaviors are worth discussing with a clinician.",
              "Treating sleep disorders (especially OSA) often significantly improves dream quality and reduces nightmares.",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 flex gap-3 list-none" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span className="text-peach mt-1 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 6: References */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl text-midnight mb-4">References</h2>
          <ol className="list-decimal list-inside space-y-2">
            {[
              `Walker MP, Stickgold R. "Sleep, Memory, and Plasticity." Annual Review of Psychology. 2006.`,
              `Hobson JA. "REM sleep and dreaming: towards a theory of protoconsciousness." Nature Reviews Neuroscience. 2009.`,
              `Stickgold R, Walker MP. "Sleep-dependent memory consolidation and reconsolidation." Sleep Medicine. 2007.`,
            ].map((ref) => (
              <li key={ref} className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.65)" }}>{ref}</li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  );
}

export default function DreamInterpreterClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <DreamInterpreterClient />
    </EmailCaptureProvider>
  );
}
