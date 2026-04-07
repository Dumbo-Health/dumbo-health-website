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

      {/* What is Obstructive Sleep Apnea */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">What is Obstructive Sleep Apnea?</h2>
          <p className="mt-4 font-body text-lg leading-7 text-midnight/72">
            Obstructive sleep apnea (OSA) is a chronic condition in which the muscles at the back of the throat
            relax during sleep, causing the airway to collapse partially or completely. Breathing stops — sometimes
            dozens or hundreds of times per night — and the brain briefly wakes you to reopen the airway. Most
            people have no memory of these awakenings, but the cumulative effect is severely fragmented sleep.
          </p>
          <p className="mt-4 font-body text-lg leading-7 text-midnight/72">
            OSA affects an estimated 1 billion people worldwide, including approximately 30 million Americans.
            Despite its prevalence, roughly 80% of people with moderate-to-severe OSA remain undiagnosed. Left
            untreated, OSA is associated with hypertension, heart disease, type 2 diabetes, stroke, cognitive
            impairment, and depression.
          </p>
          <div className="mt-6 rounded-2xl border border-sunlight bg-daylight px-6 py-5">
            <p className="font-mono text-sm uppercase tracking-wider text-peach">Key Fact</p>
            <p className="mt-2 font-body text-base leading-7 text-midnight">
              Studies show untreated OSA raises cardiovascular disease risk by 2–3x.
            </p>
          </div>
        </div>
      </section>

      {/* The 8 STOP-BANG Risk Factors Explained */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">The 8 STOP-BANG Risk Factors Explained</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            Each letter in STOP-BANG represents a clinically validated risk factor for obstructive sleep apnea.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                letter: "S",
                name: "Snoring",
                description:
                  "Snoring is caused by vibration of relaxed throat tissue as air passes through a narrowed airway. Loudness and frequency generally correlate with OSA severity, though not everyone who snores has OSA.",
              },
              {
                letter: "T",
                name: "Tiredness",
                description:
                  "Excessive daytime sleepiness (EDS) results from the fragmented, non-restorative sleep that OSA causes. EDS affects an estimated 60–70% of OSA patients and impairs work performance, driving safety, and quality of life.",
              },
              {
                letter: "O",
                name: "Observed Apneas",
                description:
                  "A bed partner witnessing you stop breathing, choke, or gasp is the most specific indicator of OSA. It represents direct evidence of airway collapse and is a strong predictor of moderate-to-severe disease.",
              },
              {
                letter: "P",
                name: "Blood Pressure",
                description:
                  "OSA and hypertension are bidirectional — each worsens the other. Repeated oxygen desaturations during apnea events activate the sympathetic nervous system, raising blood pressure. Treating OSA can meaningfully lower BP.",
              },
              {
                letter: "B",
                name: "BMI >35",
                description:
                  "Excess fatty tissue around the neck, tongue, and pharyngeal walls narrows the upper airway. Research shows that even a 10% reduction in body weight can reduce the Apnea-Hypopnea Index (AHI) by approximately 26%.",
              },
              {
                letter: "A",
                name: "Age >50",
                description:
                  "Upper airway muscle tone decreases with age, making airway collapse during sleep more likely. OSA prevalence rises sharply after age 50, particularly in men.",
              },
              {
                letter: "N",
                name: "Neck >40 cm",
                description:
                  "Neck circumference is one of the strongest anatomical predictors of OSA. A collar size above 40 cm (roughly 16 inches) reflects the soft tissue mass surrounding the airway and is independently associated with OSA risk.",
              },
              {
                letter: "G",
                name: "Gender",
                description:
                  "Males have a 2–3x higher OSA risk than females, partly due to differences in airway anatomy, fat distribution, and hormones. Women's risk increases significantly after menopause as protective hormonal effects decline.",
              },
            ].map(({ letter, name, description }) => (
              <div key={letter} className="rounded-2xl bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach">
                    <span className="font-heading text-lg font-medium text-white">{letter}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-midnight">{name}</h3>
                    <p className="mt-1 font-body text-sm leading-6 text-midnight/72">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STOP-BANG vs Other Screening Tools */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">STOP-BANG vs Other Screening Tools</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            Several tools exist for OSA screening and diagnosis. Here is how they compare and when to use each one.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-sunlight">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-sunlight bg-daylight">
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Tool</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Type</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Best For</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Sensitivity</th>
                  <th className="px-5 py-4 text-left font-heading text-base text-midnight">Where to Start</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    tool: "STOP-BANG",
                    type: "Risk questionnaire",
                    bestFor: "Pre-surgical + primary screening",
                    sensitivity: "87–93% for severe OSA",
                    start: "Start here if you haven't been screened",
                  },
                  {
                    tool: "Epworth Sleepiness Scale (ESS)",
                    type: "Symptom scale",
                    bestFor: "Measuring daytime sleepiness",
                    sensitivity: "N/A (complements STOP-BANG)",
                    start: "Use alongside STOP-BANG",
                  },
                  {
                    tool: "AHI Calculator",
                    type: "Index calculator",
                    bestFor: "After a sleep study",
                    sensitivity: "Definitive",
                    start: "After you have sleep study results",
                  },
                  {
                    tool: "Home Sleep Test (HST)",
                    type: "Diagnostic",
                    bestFor: "At-home OSA diagnosis",
                    sensitivity: "85–90%",
                    start: "After high STOP-BANG score",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-sunlight last:border-0">
                    <td className="px-5 py-4 font-body font-bold text-midnight">{row.tool}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.type}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.bestFor}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.sensitivity}</td>
                    <td className="px-5 py-4 font-body text-midnight/72">{row.start}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who Should Use STOP-BANG */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Who Should Use the STOP-BANG Questionnaire?</h2>
          <p className="mt-3 font-body text-lg leading-7 text-midnight/72">
            STOP-BANG was originally developed for anesthesiologists screening patients before surgery, and has since
            become a standard tool in primary care and self-assessment.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Pre-Surgical Patients",
                description:
                  "STOP-BANG was originally developed to help anesthesiologists identify patients at elevated risk for perioperative complications from undiagnosed OSA. It is now standard in many pre-operative protocols.",
              },
              {
                title: "Primary Care Screening",
                description:
                  "Family physicians use STOP-BANG to quickly stratify patients and decide who needs a referral for a formal sleep study. A score of 3 or higher typically warrants further evaluation.",
              },
              {
                title: "Self-Assessment",
                description:
                  "Anyone concerned about snoring, persistent fatigue, or cardiovascular risk can use STOP-BANG to understand their risk level and decide whether to pursue diagnostic testing.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-2xl bg-white p-5">
                <h3 className="font-heading text-lg text-midnight">{title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/72">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-peach/30 bg-white px-6 py-5">
            <p className="font-body text-base leading-7 text-midnight">
              If you scored 3 or higher, an at-home sleep test is a simple next step.{" "}
              <a
                href="https://app.dumbo.health"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-peach underline underline-offset-2"
              >
                Explore sleep care at Dumbo Health →
              </a>
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
              "STOP-BANG has 87–93% sensitivity for detecting moderate-to-severe OSA.",
              "A score of 5–8 puts you in the high-risk category for OSA.",
              "80% of people with moderate-to-severe OSA are undiagnosed.",
              "OSA is linked to hypertension, heart disease, type 2 diabetes, and stroke.",
              "An at-home sleep test is the standard first step after a high STOP-BANG score.",
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
          <h2 className="font-heading text-2xl text-midnight">Clinical References</h2>
          <ol className="mt-5 space-y-3 list-decimal list-inside">
            {[
              'Chung F, et al. "STOP Questionnaire: A Tool to Screen Patients for Obstructive Sleep Apnea." Anesthesiology. 2008.',
              'Chung F, et al. "High STOP-BANG score indicates a high probability of obstructive sleep apnoea." British Journal of Anaesthesia. 2012.',
              'Benjafield AV, et al. "Estimation of the global prevalence and burden of obstructive sleep apnoea." The Lancet Respiratory Medicine. 2019.',
              'Peppard PE, et al. "Increased Prevalence of Sleep-Disordered Breathing in Adults." American Journal of Epidemiology. 2013.',
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

export default function StopBangClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <StopBangClient />
    </EmailCaptureProvider>
  );
}
