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

      {/* What is Excessive Daytime Sleepiness */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">What is Excessive Daytime Sleepiness?</h2>
          <p className="mt-4 font-body text-lg leading-7 text-midnight/72">
            Excessive daytime sleepiness (EDS) is the chronic inability to stay awake and alert during the day,
            despite adequate opportunity for sleep. It is one of the most common — and most underreported — symptoms
            of sleep disorders, particularly obstructive sleep apnea (OSA). When OSA causes repeated breathing
            disruptions throughout the night, sleep becomes fragmented and non-restorative, leaving the brain in a
            perpetual state of fatigue.
          </p>
          <p className="mt-4 font-body text-lg leading-7 text-midnight/72">
            The consequences extend well beyond feeling tired. EDS impairs concentration, memory, and reaction time.
            Drowsy driving is a factor in an estimated 5x higher crash risk. At work, EDS reduces productivity and
            increases the likelihood of errors. Addressing the underlying cause — often OSA — typically reverses
            sleepiness within weeks.
          </p>
          <div className="mt-6 rounded-2xl border border-sunlight bg-daylight px-6 py-5">
            <p className="font-mono text-sm uppercase tracking-wider text-peach">Key Fact</p>
            <p className="mt-2 font-body text-base leading-7 text-midnight">
              The NTSB estimates drowsy driving causes 100,000 crashes and 1,500 deaths annually in the U.S.
            </p>
          </div>
        </div>
      </section>

      {/* How the Epworth Scale Works */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">How the Epworth Sleepiness Scale Works</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            The ESS was developed by Dr. Murray Johns at Epworth Hospital in Melbourne, Australia, in 1991. It has
            since been validated across 18+ languages and is used in over 100 countries as the standard subjective
            measure of daytime sleepiness.
          </p>
          <div className="mt-6 space-y-3">
            {[
              "The ESS presents 8 common daily situations and asks how likely you are to doze off in each.",
              "Each situation is rated 0 (would never doze) to 3 (high chance of dozing).",
              "Maximum possible score: 24. Scores above 10 indicate clinically meaningful sleepiness.",
              "The scale measures your general level of sleepiness in recent daily life, not just last night.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-peach" />
                <span className="font-body text-base leading-7 text-midnight/72">{point}</span>
              </div>
            ))}
          </div>
          <h3 className="mt-10 font-heading text-xl text-midnight">Score Interpretation</h3>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-sunlight">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-sunlight bg-white">
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Score Range</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Classification</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { range: "0–10", label: "Normal", action: "Monitor; maintain good sleep hygiene" },
                  { range: "11–12", label: "Mild sleepiness", action: "Track with a sleep diary; consider lifestyle factors" },
                  { range: "13–15", label: "Moderate sleepiness", action: "Consult a physician; evaluate for sleep disorders" },
                  { range: "16–24", label: "Severe sleepiness", action: "Seek prompt clinical evaluation; avoid driving when fatigued" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-sunlight last:border-0">
                    <td className="px-5 py-4 font-body font-bold text-midnight">{row.range}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.label}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Conditions Associated with High ESS Scores */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Conditions Associated with High ESS Scores</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            A high ESS score is not a diagnosis — it is a flag that warrants evaluation. These are the most common
            conditions associated with clinically elevated daytime sleepiness.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Obstructive Sleep Apnea",
                description:
                  "The most common cause of EDS in adults. Repeated apnea events fragment deep sleep, leaving the brain sleep-deprived regardless of total time in bed. CPAP therapy typically reduces ESS scores by 3–5 points.",
              },
              {
                title: "Insomnia",
                description:
                  "Chronic difficulty falling or staying asleep accumulates as sleep debt. Even when the primary complaint is difficulty sleeping, daytime sleepiness often coexists and compounds functional impairment.",
              },
              {
                title: "Narcolepsy",
                description:
                  "A neurological disorder affecting the brain's ability to regulate sleep-wake cycles. Characterized by sudden, uncontrollable sleep attacks, cataplexy, and sleep paralysis. ESS scores are typically very high (16+).",
              },
              {
                title: "Shift Work Disorder",
                description:
                  "Working non-traditional hours misaligns the body's circadian rhythm with the sleep schedule. The resulting circadian disruption produces excessive sleepiness during work hours and poor sleep during available rest periods.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-2xl border border-sunlight p-5">
                <h3 className="font-heading text-lg text-midnight">{title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/72">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESS vs STOP-BANG */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">ESS vs STOP-BANG: Two Tools, Two Questions</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            The ESS and STOP-BANG screen for different dimensions of sleep apnea risk. Used together, they give
            clinicians — and patients — a much clearer picture.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6">
              <p className="font-mono text-sm uppercase tracking-wider text-peach">ESS</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">"How sleepy ARE you?"</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Measures current daytime impairment. Captures how OSA (or another disorder) is affecting your
                waking life right now. Useful for monitoring treatment response over time.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-mono text-sm uppercase tracking-wider text-teal">STOP-BANG</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">"How likely do you have OSA?"</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Measures structural and physiological risk factors — anatomy, age, BMI, blood pressure. Identifies
                who is at risk before symptoms become severe.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-4 rounded-2xl border border-sunlight bg-white px-6 py-5">
            <p className="font-body text-base leading-7 text-midnight">
              <span className="font-bold">Best practice:</span> Use both together. A high ESS score combined with a
              high STOP-BANG score significantly strengthens the case for a sleep study.
            </p>
            <p className="font-body text-base leading-7 text-midnight">
              <span className="font-bold">Tracking treatment:</span> ESS is also used to measure treatment
              response. Effective CPAP therapy typically reduces ESS scores by 3–5 points within the first few
              months.
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-white">Key Takeaways</h2>
          <ul className="mt-6 space-y-4">
            {[
              "ESS is the most widely used validated tool for measuring daytime sleepiness.",
              "Scores above 10 indicate sleepiness worth discussing with a healthcare provider.",
              "High ESS alone doesn't diagnose a sleep disorder — it's a flag for evaluation.",
              "OSA is the most common cause of excessive daytime sleepiness in adults.",
              "Effective treatment (CPAP, lifestyle) typically reduces ESS score by 3–5 points.",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-peach" />
                <span className="font-body text-base leading-7 text-white/70">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clinical References */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-2xl text-midnight">References</h2>
          <ol className="mt-5 space-y-3 list-decimal list-inside">
            {[
              'Johns MW. "A New Method for Measuring Daytime Sleepiness: The Epworth Sleepiness Scale." Sleep. 1991.',
              'Johns MW. "Reliability and Factor Analysis of the Epworth Sleepiness Scale." Sleep. 1992.',
              'Masa JF, et al. "Validity of the International Classification of Sleep Disorders for diagnosing obstructive sleep apnea." Thorax. 2011.',
              'Arand D, et al. "The clinical use of the MSLT and MWT." Sleep. 2005.',
            ].map((ref, i) => (
              <li key={i} className="font-body text-sm leading-6 text-midnight/60">
                {ref}
              </li>
            ))}
          </ol>
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
