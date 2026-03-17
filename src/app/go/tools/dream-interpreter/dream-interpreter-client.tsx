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
