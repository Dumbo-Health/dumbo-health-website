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
