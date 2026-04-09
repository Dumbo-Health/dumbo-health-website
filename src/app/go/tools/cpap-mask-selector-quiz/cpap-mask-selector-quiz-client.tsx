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

      {/* How CPAP Therapy Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">CPAP Basics</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">How CPAP Therapy Works</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            CPAP (Continuous Positive Airway Pressure) delivers a steady stream of pressurized air through a mask to keep the upper airway open during sleep. The pressure acts as a pneumatic splint, preventing the throat tissues from collapsing and blocking airflow.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Pressure</p>
              <p className="mt-2 font-body text-sm leading-6 text-midnight/72">
                Prescribed pressure ranges from 4–20 cmH₂O. APAP (auto-adjusting) devices adapt each night to deliver the minimum effective pressure automatically.
              </p>
            </div>
            <div className="rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Effectiveness</p>
              <p className="mt-2 font-body text-sm leading-6 text-midnight/72">
                When used consistently, CPAP reduces AHI by 80–90%, eliminates or reduces snoring, and restores normal blood oxygen saturation throughout the night.
              </p>
            </div>
            <div className="rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Compliance</p>
              <p className="mt-2 font-body text-sm leading-6 text-midnight/72">
                The average CPAP user wears it 5.5 hours per night. Research consistently shows 6+ hours per night is associated with the greatest reduction in daytime sleepiness and cardiovascular risk.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-peach/30 bg-peach/8 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Key Fact</p>
            <p className="mt-2 font-body text-base leading-7 text-midnight">
              CPAP is effective only when worn. The average CPAP user wears it 5.5 hours per night, and 6 or more hours per night is associated with the greatest symptom relief and health benefit.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 CPAP Mask Types */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Mask Guide</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">The 4 CPAP Mask Types: A Complete Guide</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            Mask type is the most common reason people discontinue CPAP therapy. Understanding your options makes it easier to find a fit that works for how you actually sleep.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Most Minimal</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Nasal Pillow Mask</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                The smallest and lightest mask design. Two soft silicone cushions insert just at the nostrils, with no frame covering the nose or face. Ideal for nose breathers, side sleepers, people with facial hair, and those who feel claustrophobic with larger masks.
              </p>
              <div className="mt-4 rounded-xl bg-daylight p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">Limitation</p>
                <p className="mt-1 font-body text-xs leading-5 text-midnight/68">Not suitable for mouth breathers. May become ineffective above approximately 15 cmH₂O pressure due to air leaking around the nostrils.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Most Common</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Nasal Mask</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Covers the nose from bridge to upper lip. The most commonly prescribed starter mask, offering a balance of stability and comfort. Well-suited for active sleepers, moderate-to-high pressure needs, and nose breathers who want more stability than nasal pillows provide.
              </p>
              <div className="mt-4 rounded-xl bg-daylight p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">Limitation</p>
                <p className="mt-1 font-body text-xs leading-5 text-midnight/68">Requires nasal patency. Opening the mouth during sleep causes air to escape, reducing therapy pressure. A chin strap can help.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Mouth Breathers</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Full-Face Mask</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Covers both nose and mouth with a single sealed cushion. The right choice for mouth breathers, people with frequent nasal congestion or allergies, high CPAP pressure needs (above 15 cmH₂O), and back sleepers who tend to breathe through the mouth.
              </p>
              <div className="mt-4 rounded-xl bg-daylight p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">Limitation</p>
                <p className="mt-1 font-body text-xs leading-5 text-midnight/68">More bulk and surface area can feel claustrophobic. Harder to achieve a consistent seal, especially for side sleepers. More components to clean and replace.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Mixed Breathers</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Hybrid Mask</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Combines nasal pillow inserts with an oral cushion to cover the mouth, without the full face seal of a traditional full-face mask. Designed for people who switch between nose and mouth breathing, or who want less facial bulk than a full-face mask.
              </p>
              <div className="mt-4 rounded-xl bg-daylight p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">Limitation</p>
                <p className="mt-1 font-body text-xs leading-5 text-midnight/68">More complex to fit correctly. Less widely available than other types. May require more trial and adjustment to find a comfortable, leak-free position.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CPAP Mask Comparison Table */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Side-by-Side</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">CPAP Mask Comparison Table</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            A quick reference to compare the four mask types across the factors that matter most for comfort and effectiveness.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-sunlight">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-sunlight bg-daylight">
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Type</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Coverage</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Mouth Breathing OK</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Pressure Range</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Claustrophobia Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sunlight bg-white font-body text-sm text-midnight/72">
                <tr>
                  <td className="px-5 py-4 font-medium text-midnight">Nasal Pillows</td>
                  <td className="px-5 py-4">Nostrils only</td>
                  <td className="px-5 py-4">No</td>
                  <td className="px-5 py-4">4–15 cmH₂O</td>
                  <td className="px-5 py-4">Very Low</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-midnight">Nasal Mask</td>
                  <td className="px-5 py-4">Nose</td>
                  <td className="px-5 py-4">No</td>
                  <td className="px-5 py-4">4–20 cmH₂O</td>
                  <td className="px-5 py-4">Low</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-midnight">Full-Face</td>
                  <td className="px-5 py-4">Nose + Mouth</td>
                  <td className="px-5 py-4">Yes</td>
                  <td className="px-5 py-4">4–20+ cmH₂O</td>
                  <td className="px-5 py-4">Moderate–High</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium text-midnight">Hybrid</td>
                  <td className="px-5 py-4">Nostrils + Mouth</td>
                  <td className="px-5 py-4">Yes</td>
                  <td className="px-5 py-4">4–20 cmH₂O</td>
                  <td className="px-5 py-4">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tips for CPAP Compliance and Comfort */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Adherence Tips</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">Tips for CPAP Compliance and Comfort</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            The first few weeks are the hardest. These evidence-backed strategies make the adjustment period shorter and improve long-term use.
          </p>

          <ol className="mt-10 space-y-6">
            {[
              {
                n: "1",
                title: "Acclimatize before bed",
                body: "Wear the mask for short periods during the day while awake, watching TV or reading. This helps your brain stop treating the mask as a foreign sensation before you need to fall asleep in it.",
              },
              {
                n: "2",
                title: "Ensure a proper fit first",
                body: "Even a small leak causes pressure to drop, reducing therapy effectiveness. Adjust the headgear while lying in your normal sleep position, not while standing in front of a mirror.",
              },
              {
                n: "3",
                title: "Use the heated humidifier",
                body: "Pressurized air is dry. Heated humidification reduces nasal dryness, congestion, and mask leaks caused by instinctively mouth breathing due to discomfort. Most modern CPAP machines include one.",
              },
              {
                n: "4",
                title: "Follow the replacement schedule",
                body: "Replace cushions or pillow inserts monthly, headgear every 6 months, and the mask frame every 6–12 months. Worn components cause leaks and reduce seal quality, and most insurance covers replacements.",
              },
              {
                n: "5",
                title: "Track how you feel",
                body: "Keep a brief daily log of alertness, energy, and sleep quality. Improvement in daytime functioning, even subtle at first, is the most powerful motivator for continued CPAP use.",
              },
              {
                n: "6",
                title: "Ask about APAP if pressure is uncomfortable",
                body: "Auto-adjusting PAP (APAP) delivers only the pressure you need at each moment rather than a fixed setting. Many people find APAP more comfortable, especially during lighter sleep stages. Ask your sleep physician if it is appropriate for you.",
              },
            ].map((item) => (
              <li key={item.n} className="flex items-start gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-peach font-heading text-base text-white">
                  {item.n}
                </span>
                <div>
                  <p className="font-heading text-lg text-midnight">{item.title}</p>
                  <p className="mt-1 font-body text-sm leading-6 text-midnight/72">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Summary</p>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">Key Takeaways</h2>
          <ul className="mt-8 space-y-5">
            {[
              "CPAP therapy reduces AHI by 80–90% when worn correctly and consistently, making it the most effective treatment for moderate-to-severe OSA.",
              "Mask type is the most common reason people discontinue CPAP. Getting the right fit for your breathing pattern matters as much as the machine itself.",
              "Nasal pillow masks are the most comfortable option for most people, but they require nose breathing and are not suitable above about 15 cmH₂O.",
              "Full-face masks are the right choice for mouth breathers or people with frequent nasal congestion, despite their added bulk.",
              "Heated humidification significantly improves comfort and compliance rates. Use it from night one if your machine includes it.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-4 font-body text-base leading-7 text-white/80">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-peach" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* References */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Sources</p>
          <h2 className="mt-3 font-heading text-2xl text-midnight">References</h2>
          <ol className="mt-6 space-y-3 font-body text-sm leading-7 text-midnight/68">
            <li>1. Patil SP, et al. "Treatment of Adult Obstructive Sleep Apnea with PAP Therapy." <em>Journal of Clinical Sleep Medicine.</em> 2019.</li>
            <li>2. Rotenberg BW, et al. "Trends in CPAP adherence over twenty years of data collection." <em>Journal of Otolaryngology.</em> 2016.</li>
            <li>3. Weaver TE, Grunstein RR. "Adherence to Continuous Positive Airway Pressure Therapy." <em>Proceedings of the American Thoracic Society.</em> 2008.</li>
            <li>4. Ng SS, et al. "A Comparison of CPAP Mask Types in the Management of OSA." <em>Sleep Medicine Reviews.</em> 2022.</li>
          </ol>
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
