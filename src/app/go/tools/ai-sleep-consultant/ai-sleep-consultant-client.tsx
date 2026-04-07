"use client";

import { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
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

const starterPrompts = [
  "I have trouble falling asleep at night.",
  "How can I improve my sleep schedule?",
  "I wake up several times during the night.",
  "What habits matter most for better sleep?",
];

export function AiSleepConsultantClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Ask about sleep hygiene, schedules, or common sleep issues. This tool provides general educational guidance, not diagnosis or medical advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (preset?: string) => {
    const message = (preset ?? input).trim();
    if (!message || isLoading) return;

    const thinkingId = `${Date.now()}-thinking`;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: thinkingId,
        role: "assistant",
        content: "",
        isThinking: true,
      },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      await ensureEmailCapture({
        metadata: {
          page: "ai-sleep-consultant",
          messageLength: message.length,
        },
      });

      const response = await fetch("/go/api/tools/ai-sleep-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to get a response right now.");
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === thinkingId
            ? {
                id: `${Date.now()}-assistant`,
                role: "assistant",
                content: payload.reply ?? "",
              }
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
                    : "Unable to get a response right now.",
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
              AI Sleep Consultant
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Get general sleep education about routines, environment, schedules, and
              common issues in a simple question-and-answer format.
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
                          <span className="ml-2 text-xs opacity-70">thinking...</span>
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
                  Try one of these
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
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
                    placeholder="Ask about sleep schedules, routines, or common sleep concerns..."
                    className="min-h-24 bg-white"
                  />
                  <Button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="self-end rounded-lg font-mono tracking-wider"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-5 font-body text-sm leading-6 text-midnight/68">
              This tool is educational only. If symptoms are persistent, severe, or
              safety-related, speak with a licensed clinician.
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

      {/* Section 1: The Most Common Sleep Disorders */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-8">The Most Common Sleep Disorders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Obstructive Sleep Apnea (OSA)", desc: "Repeated airway collapse during sleep; affects ~1 billion people worldwide; 80% undiagnosed. Signs: loud snoring, gasping, morning headaches, excessive fatigue." },
              { label: "Chronic Insomnia", desc: "Difficulty falling or staying asleep ≥3 nights/week for ≥3 months; affects 10–15% of adults. Causes: stress, anxiety, poor sleep habits, medical conditions." },
              { label: "Restless Legs Syndrome (RLS)", desc: "Irresistible urge to move the legs, worse at rest and in the evening; affects 7–10% of adults; often disrupts sleep onset." },
              { label: "Circadian Rhythm Disorders", desc: "Misalignment between internal clock and social schedule — includes Delayed Sleep Phase, Shift Work Disorder, and Jet Lag." },
            ].map((item) => (
              <div key={item.label} className="bg-daylight rounded-2xl p-5 border border-sunlight">
                <p className="font-heading text-base text-midnight mb-2">{item.label}</p>
                <p className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Insomnia — Types and Evidence-Based Treatments */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">Insomnia — Types and Evidence-Based Treatments</h2>
          <ul className="space-y-3 mb-4">
            {[
              { label: "Acute insomnia (days to weeks)", desc: "Usually triggered by stress or a life event; resolves on its own. Management: sleep hygiene, temporary sleep restriction." },
              { label: "Chronic insomnia (≥3 months)", desc: "Maintained by learned behaviors and cognitive patterns (\"hyperarousal\"). Treatment: CBT-I (first-line), not sleeping pills." },
              { label: "Sleep onset insomnia", desc: "Difficulty falling asleep. Associated with anxiety, rumination, and evening cortisol elevation." },
              { label: "Sleep maintenance insomnia", desc: "Waking during the night. Associated with OSA, menopause, aging, depression, anxiety." },
            ].map((item) => (
              <li key={item.label} className="font-body text-lg leading-8 text-midnight flex gap-3 list-none">
                <span className="text-peach mt-1 shrink-0">→</span>
                <span><strong>{item.label}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
          <div className="bg-white rounded-xl px-5 py-4 border border-sunlight">
            <p className="font-body text-base leading-7 text-midnight">
              <strong>CBT-I success rates:</strong> 70–80% report clinically meaningful improvement; effects are durable — versus medication, where effects stop when pills stop.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Signs You May Need a Sleep Specialist */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-6">Signs You May Need a Sleep Specialist</h2>
          <ul className="space-y-3 mb-5">
            {[
              "You still feel unrested after 7–9 hours of sleep (suggests fragmented sleep or OSA).",
              "You've tried sleep hygiene for 4+ weeks without improvement.",
              "Your partner has noticed snoring, gasping, or stopped breathing.",
              "You feel an uncomfortable urge to move your legs at night.",
              "You've had excessive daytime sleepiness causing driving concerns or work problems.",
              "You have nightmares or physically act out your dreams.",
              "You fall asleep inappropriately (mid-conversation, at traffic lights).",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 text-midnight flex gap-3 list-none">
                <span className="text-peach mt-1 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-base leading-7" style={{ color: "rgba(3,31,61,0.65)" }}>
            Note: You do not need a referral at many sleep clinics; at-home sleep tests can be ordered online.
          </p>
        </div>
      </section>

      {/* Section 4: CBT-I — The Gold Standard for Insomnia */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">CBT-I — The Gold Standard for Insomnia</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            CBT-I is endorsed by the American College of Physicians, American Academy of Sleep Medicine, and UK NICE guidelines as the <strong>first-line treatment</strong> for chronic insomnia.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {[
              "Sleep restriction",
              "Stimulus control",
              "Sleep hygiene education",
              "Cognitive restructuring",
              "Relaxation training",
              "Relapse prevention",
            ].map((comp) => (
              <div key={comp} className="bg-white rounded-xl px-4 py-3 border border-sunlight">
                <p className="font-body text-sm text-midnight">{comp}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-base leading-7" style={{ color: "rgba(3,31,61,0.7)" }}>
            Duration: 6–8 sessions (in-person or digital) typically sufficient. Outcomes: 50–80% achieve remission; 70% have lasting effects at 6-month follow-up. Access: in-person CBT-I therapists, digital programs (Somryst FDA-cleared, Sleepio), and self-guided workbooks.
          </p>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section className="bg-midnight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-white mb-6">Key Takeaways</h2>
          <ul className="space-y-3">
            {[
              "CBT-I is more effective than sleep medication for long-term insomnia — ask your doctor about it.",
              "OSA is the most underdiagnosed sleep disorder — an at-home sleep test takes one night.",
              "If you wake unrested despite adequate time in bed, a sleep disorder is the likely cause.",
              "Sleep problems are not a sign of weakness — they are medical conditions with effective treatments.",
              "Most sleep disorders are highly treatable; the barrier is usually awareness and diagnosis.",
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
              `Qaseem A, et al. "Management of Chronic Insomnia Disorder in Adults: A Clinical Practice Guideline From the ACP." Annals of Internal Medicine. 2016.`,
              `Mitchell MD, et al. "Comparative effectiveness of cognitive behavioral therapy for insomnia." BMC Family Practice. 2012.`,
              `Morin CM, et al. "Cognitive-behavioral therapy, singly and combined with medication, for persistent insomnia." JAMA. 2009.`,
            ].map((ref) => (
              <li key={ref} className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.65)" }}>{ref}</li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  );
}

export default function AiSleepConsultantClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <AiSleepConsultantClient />
    </EmailCaptureProvider>
  );
}
