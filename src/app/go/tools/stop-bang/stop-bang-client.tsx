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
  {
    key: "S",
    label: "Snoring",
    text: "Do you snore loudly — louder than talking or loud enough to be heard through closed doors?",
  },
  {
    key: "T",
    label: "Tired",
    text: "Do you often feel tired, fatigued, or sleepy during the daytime?",
  },
  {
    key: "O",
    label: "Observed",
    text: "Has anyone observed you stop breathing, choking, or gasping during your sleep?",
  },
  {
    key: "P",
    label: "Pressure",
    text: "Do you have or are you being treated for high blood pressure?",
  },
  {
    key: "B",
    label: "BMI",
    text: "Is your BMI greater than 35?",
  },
  {
    key: "A",
    label: "Age",
    text: "Are you older than 50?",
  },
  {
    key: "N",
    label: "Neck",
    text: "Is your neck circumference greater than 40 cm (15.7 inches)?",
  },
  {
    key: "G",
    label: "Gender",
    text: "Were you assigned male at birth?",
  },
] as const;

type QuestionKey = (typeof questions)[number]["key"];
type RiskLevel = "low" | "intermediate" | "high";

function classifyRisk(score: number): RiskLevel {
  if (score <= 2) return "low";
  if (score <= 4) return "intermediate";
  return "high";
}

const riskCopy: Record<RiskLevel, { label: string; tone: string; description: string }> = {
  low: {
    label: "Low Risk",
    tone: "bg-green-100 text-green-800",
    description:
      "Your responses suggest a lower likelihood of obstructive sleep apnea. If you still have concerns about your sleep, speaking with a provider is always a good step.",
  },
  intermediate: {
    label: "Intermediate Risk",
    tone: "bg-yellow-100 text-yellow-800",
    description:
      "Your responses suggest an intermediate risk for obstructive sleep apnea. A sleep evaluation or at-home sleep test could help rule it out or confirm it.",
  },
  high: {
    label: "High Risk",
    tone: "bg-red-100 text-red-800",
    description:
      "Your responses suggest a higher likelihood of obstructive sleep apnea. We'd recommend speaking with a sleep specialist or scheduling a sleep study to get a clearer picture.",
  },
};

export function StopBangClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [answers, setAnswers] = useState<Partial<Record<QuestionKey, boolean>>>({});
  const [hasCalculated, setHasCalculated] = useState(false);

  const score = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );
  const allAnswered = questions.every((q) => answers[q.key] !== undefined);
  const level = classifyRisk(score);

  function toggle(key: QuestionKey, value: boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              STOP-BANG Questionnaire
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Answer 8 yes/no questions to assess your risk for obstructive sleep
              apnea using this clinically validated screening tool.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Answer each question</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                Be as honest as possible — there are no wrong answers.
              </p>

              <div className="mt-8 space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.key}
                    className="rounded-2xl border border-sunlight bg-white p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-peach font-mono text-xs font-bold text-white">
                        {q.key}
                      </span>
                      <p className="font-body text-sm leading-6 text-midnight">
                        {q.text}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      {(["Yes", "No"] as const).map((option) => {
                        const val = option === "Yes";
                        const active = answers[q.key] === val;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggle(q.key, val)}
                            className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                              active
                                ? "border-peach bg-peach text-white"
                                : "border-sunlight bg-daylight text-midnight"
                            }`}
                          >
                            {option}
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
                <span className="pb-2 text-sm text-midnight/55">/ 8</span>
              </div>

              <div className="mt-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${riskCopy[level].tone}`}
                >
                  {riskCopy[level].label}
                </span>
              </div>

              <p className="mt-5 font-body leading-7 text-midnight/72">
                {allAnswered && hasCalculated
                  ? riskCopy[level].description
                  : "Answer all 8 questions to see your risk level."}
              </p>

              {allAnswered && hasCalculated && (
                <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-midnight/50">
                    Disclaimer
                  </p>
                  <p className="mt-1 font-body text-xs leading-5 text-midnight/60">
                    This tool is for informational purposes only and does not
                    constitute a medical diagnosis. Please consult a qualified
                    healthcare provider.
                  </p>
                </div>
              )}

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() =>
                    void (async () => {
                      if (!allAnswered) return;
                      await ensureEmailCapture({
                        metadata: {
                          page: "stop-bang",
                          score,
                          risk: level,
                        },
                      });
                      setHasCalculated(true);
                    })()
                  }
                  disabled={!allAnswered}
                  className="w-full rounded-lg font-mono tracking-wider"
                >
                  See My Risk Level
                </Button>
                <Button asChild className="w-full rounded-lg font-mono tracking-wider">
                  <Link href="/get-started">
                    Explore Sleep Care
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg font-mono tracking-wider"
                >
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
            <h2 className="font-heading text-3xl text-midnight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 font-body text-midnight/68">
              What STOP-BANG measures and how to use the results.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border border-sunlight bg-white px-6"
          >
            <AccordionItem value="what-is-stop-bang">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What is the STOP-BANG questionnaire?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                STOP-BANG is a widely used clinical screening tool for obstructive sleep
                apnea (OSA). Each letter stands for one risk factor: Snoring, Tiredness,
                Observed apneas, blood Pressure, BMI, Age, Neck circumference, and Gender.
                It was developed to identify patients at high risk before surgery and is
                now used broadly in sleep medicine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="score-meaning">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What do the scores mean?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A score of 0–2 indicates low risk, 3–4 intermediate risk, and 5–8 high
                risk for moderate-to-severe OSA. Higher scores correlate with a greater
                probability of having untreated sleep apnea.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="next-steps">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What should I do with a high score?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A high score doesn't mean you definitely have sleep apnea — it means a
                sleep study is worth considering. An at-home sleep test is a simple,
                affordable first step that can either rule it out or give you the clarity
                you need to move forward with treatment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function StopBangClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <StopBangClient />
    </EmailCaptureProvider>
  );
}
