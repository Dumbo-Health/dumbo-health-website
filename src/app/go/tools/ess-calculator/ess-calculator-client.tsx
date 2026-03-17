"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  EmailCaptureProvider,
  useEmailCapture,
} from "@/components/EmailCaptureProvider";

const questions = [
  "Sitting and reading",
  "Watching TV",
  "Sitting inactive in a public place",
  "As a passenger in a car for an hour without a break",
  "Lying down to rest in the afternoon",
  "Sitting and talking to someone",
  "Sitting quietly after lunch without alcohol",
  "In a car while stopped in traffic",
] as const;

const options = [
  { value: 0, label: "Never" },
  { value: 1, label: "Slight" },
  { value: 2, label: "Moderate" },
  { value: 3, label: "High" },
] as const;

type EssLevel = "normal" | "mild" | "moderate" | "severe";

function classifyEss(score: number): EssLevel {
  if (score <= 10) return "normal";
  if (score <= 12) return "mild";
  if (score <= 15) return "moderate";
  return "severe";
}

const resultCopy: Record<EssLevel, { title: string; tone: string; description: string }> = {
  normal: {
    title: "Normal sleepiness",
    tone: "bg-green-100 text-green-800",
    description: "This score is within the typical daytime sleepiness range.",
  },
  mild: {
    title: "Mild sleepiness",
    tone: "bg-yellow-100 text-yellow-800",
    description: "This score suggests some daytime sleepiness worth monitoring.",
  },
  moderate: {
    title: "Moderate sleepiness",
    tone: "bg-orange-100 text-orange-800",
    description: "This score suggests meaningful daytime sleepiness that may deserve evaluation.",
  },
  severe: {
    title: "Severe sleepiness",
    tone: "bg-red-100 text-red-800",
    description: "This score suggests significant daytime sleepiness and a stronger reason to seek clinical guidance.",
  },
};

export function EssCalculatorClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [hasCalculated, setHasCalculated] = useState(false);

  const score = useMemo(() => Object.values(answers).reduce((sum, value) => sum + value, 0), [answers]);
  const level = classifyEss(score);
  const allAnswered = questions.every((_, index) => answers[index] !== undefined);

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Epworth Sleepiness Scale Calculator
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Rate how likely you are to doze off in eight everyday situations and get
              your total ESS score.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Answer each situation</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                Use the 0-3 scale to describe your likelihood of dozing off.
              </p>

              <div className="mt-8 space-y-5">
                {questions.map((question, index) => (
                  <div key={question} className="rounded-2xl border border-sunlight bg-white p-5">
                    <p className="font-body font-medium text-midnight">
                      {index + 1}. {question}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {options.map((option) => {
                        const active = answers[index] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setAnswers((current) => ({ ...current, [index]: option.value }))
                            }
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              active
                                ? "border-peach bg-peach text-white"
                                : "border-sunlight bg-daylight text-midnight"
                            }`}
                          >
                            {option.value} - {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-sunlight bg-white p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                Your score
              </p>
              <div className="mt-4 flex items-end gap-3">
                <p className="font-heading text-5xl text-midnight">{score}</p>
                <span className="pb-2 text-sm text-midnight/55">/ 24</span>
              </div>

              <div className="mt-4">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${resultCopy[level].tone}`}>
                  {resultCopy[level].title}
                </span>
              </div>

              <p className="mt-5 font-body leading-7 text-midnight/72">
                {allAnswered && hasCalculated
                  ? resultCopy[level].description
                  : "Answer all eight questions to interpret the score more confidently."}
              </p>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() =>
                    void (async () => {
                      if (!allAnswered) return;
                      await ensureEmailCapture({
                        metadata: {
                          page: "ess-calculator",
                          answeredQuestions: Object.keys(answers).length,
                        },
                      });
                      setHasCalculated(true);
                    })()
                  }
                  disabled={!allAnswered}
                  className="w-full rounded-lg font-mono tracking-wider"
                >
                  Calculate My ESS Score
                </Button>
                <Button asChild className="w-full rounded-lg font-mono tracking-wider">
                  <a href="https://app.dumbo.health" target="_blank" rel="noopener noreferrer">
                    Explore Sleep Care
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-lg font-mono tracking-wider">
                  <Link href="/go/tools">Back To Tools</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-6">
            <h2 className="font-heading text-3xl text-midnight">Frequently Asked Questions</h2>
            <p className="mt-2 font-body text-midnight/68">
              Learn what the Epworth scale measures and how to interpret the score.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="what-is-ess">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What the ESS measures
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                The Epworth Sleepiness Scale is a screening tool for daytime sleepiness.
                It does not diagnose a sleep disorder on its own, but it can help flag
                when symptoms are significant enough to follow up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="score-ranges">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Common score ranges
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Scores of 0-10 are generally considered normal, 11-12 mild, 13-15
                moderate, and 16-24 severe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function EssCalculatorClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <EssCalculatorClient />
    </EmailCaptureProvider>
  );
}
