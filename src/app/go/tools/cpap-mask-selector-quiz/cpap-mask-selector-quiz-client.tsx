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

type MaskType = "nasal-pillows" | "full-face" | "nasal" | "hybrid";
type OptionValue = "A" | "B" | "C" | "D";

interface QuestionOption {
  value: OptionValue;
  label: string;
}

interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: "breathing",
    prompt: "How do you breathe while sleeping?",
    options: [
      { value: "A", label: "Primarily through my nose" },
      { value: "B", label: "Through my mouth" },
      { value: "C", label: "Both nose and mouth" },
      { value: "D", label: "I'm not sure" },
    ],
  },
  {
    id: "position",
    prompt: "What's your main sleeping position?",
    options: [
      { value: "A", label: "Side sleeper" },
      { value: "B", label: "Back sleeper" },
      { value: "C", label: "Stomach sleeper" },
      { value: "D", label: "Combination sleeper" },
    ],
  },
  {
    id: "coverage",
    prompt: "How much face coverage are you comfortable with?",
    options: [
      { value: "A", label: "As little as possible" },
      { value: "B", label: "I do not mind a fuller fit" },
      { value: "C", label: "Some coverage is fine" },
      { value: "D", label: "Not sure yet" },
    ],
  },
  {
    id: "congestion",
    prompt: "Do you often deal with congestion or allergies?",
    options: [
      { value: "A", label: "Yes, frequently" },
      { value: "B", label: "Sometimes" },
      { value: "C", label: "Rarely" },
      { value: "D", label: "Not sure" },
    ],
  },
];

const maskDetails: Record<
  MaskType,
  { title: string; note: string; points: string[] }
> = {
  "nasal-pillows": {
    title: "Nasal Pillow Mask",
    note: "Often a strong fit for nose breathers who want minimal facial contact.",
    points: [
      "Lower-profile fit with less facial coverage",
      "Good option for side sleepers and people with facial hair",
      "Often preferred by people who feel claustrophobic",
    ],
  },
  "full-face": {
    title: "Full-Face Mask",
    note: "Often best for mouth breathing, frequent congestion, or higher pressure needs.",
    points: [
      "Covers both nose and mouth",
      "Useful when breathing shifts during sleep",
      "Can be more stable for some users at higher pressures",
    ],
  },
  nasal: {
    title: "Nasal Mask",
    note: "A balanced option when you want more support than pillows without a full-face design.",
    points: [
      "Good middle ground between minimal and full coverage",
      "Often works well for nose breathers with active sleep",
      "Can feel more secure than pillows for some users",
    ],
  },
  hybrid: {
    title: "Hybrid Mask",
    note: "A compromise option for mixed breathing patterns and lower-profile preferences.",
    points: [
      "Designed for both nose and mouth airflow",
      "Usually less bulky than a classic full-face mask",
      "Can suit people who want flexibility with lower facial coverage",
    ],
  },
};

function getRecommendedMask(answers: Record<string, OptionValue>): MaskType {
  if (answers.breathing === "B" || answers.congestion === "A") {
    return "full-face";
  }
  if (answers.breathing === "C") {
    return "hybrid";
  }
  if (answers.coverage === "A" || answers.position === "A") {
    return "nasal-pillows";
  }
  return "nasal";
}

export function CpapMaskSelectorQuizClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [answers, setAnswers] = useState<Record<string, OptionValue>>({});
  const [resultMask, setResultMask] = useState<MaskType | null>(null);

  const allAnswered = useMemo(
    () => questions.every((question) => answers[question.id]),
    [answers]
  );

  const result = resultMask ? maskDetails[resultMask] : null;

  const handleRevealResult = () => {
    void (async () => {
      await ensureEmailCapture({
        heading: "See Your Best CPAP Mask Match",
        description:
          "Enter your email to unlock your personalized CPAP mask recommendation.",
        successHeadline: "Result ready",
        successMessage: "Your personalized mask recommendation is now available below.",
        metadata: {
          page: "cpap-mask-selector-quiz",
          action: "submit-quiz",
          answers,
        },
      });
      setResultMask(getRecommendedMask(answers));
    })();
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
              CPAP Mask Selector Quiz
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Answer a few practical questions to narrow down which CPAP mask style may
              fit your breathing pattern, comfort preference, and sleep position.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Quiz</h2>
              <div className="mt-6 space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="rounded-2xl border border-sunlight bg-white p-5">
                    <p className="font-heading text-xl text-midnight">
                      {index + 1}. {question.prompt}
                    </p>
                    <div className="mt-4 space-y-2">
                      {question.options.map((option) => {
                        const active = answers[question.id] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setAnswers((current) => ({
                                ...current,
                                [question.id]: option.value,
                              }))
                            }
                            className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                              active
                                ? "border-peach bg-peach/10"
                                : "border-sunlight bg-daylight"
                            }`}
                          >
                            <span className="font-body text-midnight">
                              <strong>{option.value}</strong> {option.label}
                            </span>
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
                Suggested result
              </p>
              {result ? (
                <>
                  <h2 className="mt-4 font-heading text-3xl text-midnight">{result.title}</h2>
                  <p className="mt-4 font-body leading-7 text-midnight/72">{result.note}</p>
                  <ul className="mt-6 space-y-3">
                    {result.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 font-body text-midnight/72">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-peach" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-4 font-body leading-7 text-midnight/72">
                  Complete the quiz to reveal a suggested mask category.
                </p>
              )}

              <div className="mt-8 space-y-3">
                {!result && allAnswered ? (
                  <Button
                    onClick={handleRevealResult}
                    className="w-full rounded-lg font-mono tracking-wider"
                  >
                    See My Best Mask Match
                  </Button>
                ) : null}
                <Button asChild className="w-full rounded-lg font-mono tracking-wider">
                  <Link href="/get-started">
                    Explore Sleep Care
                  </Link>
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
              Helpful context before you choose or compare mask styles.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="note">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Important note
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                This quiz is educational only. Final mask selection should be confirmed
                with a sleep clinician or CPAP provider, especially when pressure
                settings, congestion, or treatment goals are involved.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function CpapMaskSelectorQuizClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <CpapMaskSelectorQuizClient />
    </EmailCaptureProvider>
  );
}
