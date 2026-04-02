"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EmailCaptureProvider,
  useEmailCapture,
} from "@/components/EmailCaptureProvider";

type AhiSeverity = "normal" | "mild" | "moderate" | "severe";
type SpO2Level = "normal" | "mild" | "moderate" | "severe";

function classifyAhi(ahi: number): AhiSeverity {
  if (ahi < 5) return "normal";
  if (ahi < 15) return "mild";
  if (ahi < 30) return "moderate";
  return "severe";
}

function classifySpO2(spo2: number): SpO2Level {
  if (spo2 >= 95) return "normal";
  if (spo2 >= 90) return "mild";
  if (spo2 >= 85) return "moderate";
  return "severe";
}

const ahiCopy: Record<AhiSeverity, { label: string; tone: string; explanation: string }> = {
  normal: {
    label: "No Sleep Apnea",
    tone: "bg-green-100 text-green-800",
    explanation:
      "Your AHI is in the normal range — fewer than 5 breathing interruptions per hour. This means sleep apnea is unlikely based on this number alone.",
  },
  mild: {
    label: "Mild Sleep Apnea",
    tone: "bg-yellow-100 text-yellow-800",
    explanation:
      "Between 5 and 14 interruptions per hour indicates mild sleep apnea. Many people with mild OSA still experience daytime fatigue and benefit from treatment.",
  },
  moderate: {
    label: "Moderate Sleep Apnea",
    tone: "bg-orange-100 text-orange-800",
    explanation:
      "15–29 interruptions per hour is considered moderate sleep apnea. At this level, treatment is typically recommended — usually CPAP therapy or an oral appliance.",
  },
  severe: {
    label: "Severe Sleep Apnea",
    tone: "bg-red-100 text-red-800",
    explanation:
      "30 or more interruptions per hour is severe sleep apnea. This significantly affects sleep quality and carries greater cardiovascular and metabolic health risks. Treatment is strongly advised.",
  },
};

const spo2Copy: Record<SpO2Level, { label: string; tone: string; explanation: string }> = {
  normal: {
    label: "Normal Oxygen",
    tone: "bg-green-100 text-green-800",
    explanation: "Your lowest recorded oxygen level stayed above 95%, which is within the normal range during sleep.",
  },
  mild: {
    label: "Mild Desaturation",
    tone: "bg-yellow-100 text-yellow-800",
    explanation: "Your oxygen dipped to 90–94% at its lowest point. Mild desaturation can still disrupt sleep quality and warrants discussion with a provider.",
  },
  moderate: {
    label: "Moderate Desaturation",
    tone: "bg-orange-100 text-orange-800",
    explanation: "Oxygen levels between 85–89% indicate moderate desaturation during sleep. This is a clinically meaningful finding and typically factors into treatment decisions.",
  },
  severe: {
    label: "Severe Desaturation",
    tone: "bg-red-100 text-red-800",
    explanation: "Oxygen dropping below 85% is considered severe desaturation. This can stress the heart and other organs and usually calls for prompt evaluation and treatment.",
  },
};

function efficiencyLabel(pct: number): { label: string; tone: string; explanation: string } {
  if (pct >= 85) {
    return {
      label: "Good Sleep Efficiency",
      tone: "bg-green-100 text-green-800",
      explanation: "85% or above is considered healthy sleep efficiency — you spent most of your time in bed actually sleeping.",
    };
  }
  if (pct >= 75) {
    return {
      label: "Fair Sleep Efficiency",
      tone: "bg-yellow-100 text-yellow-800",
      explanation: "75–84% efficiency is below ideal. You may be spending more time in bed awake than expected, which can compound daytime fatigue.",
    };
  }
  return {
    label: "Poor Sleep Efficiency",
    tone: "bg-red-100 text-red-800",
    explanation: "Below 75% sleep efficiency means more than a quarter of your time in bed was spent awake. This often points to fragmented sleep from apnea events or other disruptions.",
  };
}

export function SleepStudyExplainerClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [ahi, setAhi] = useState("");
  const [spo2, setSpo2] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  const ahiNum = parseFloat(ahi);
  const spo2Num = parseFloat(spo2);
  const effNum = parseFloat(efficiency);

  const ahiValid = !Number.isNaN(ahiNum) && ahiNum >= 0;
  const canCalculate = ahiValid;

  const ahiResult = ahiValid ? ahiCopy[classifyAhi(ahiNum)] : null;
  const spo2Result =
    !Number.isNaN(spo2Num) && spo2Num > 0 && spo2Num <= 100
      ? spo2Copy[classifySpO2(spo2Num)]
      : null;
  const effResult =
    !Number.isNaN(effNum) && effNum > 0 && effNum <= 100
      ? efficiencyLabel(effNum)
      : null;

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Sleep Study Results Explainer
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Enter the numbers from your sleep study report and get a plain-English
              breakdown of what they actually mean.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Enter your numbers</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                AHI is required. Oxygen nadir and sleep efficiency are optional but add
                more detail to your results.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    AHI — Apnea-Hypopnea Index <span className="text-peach">*</span>
                  </label>
                  <p className="mt-1 font-body text-xs text-midnight/50">
                    Total breathing events per hour of sleep
                  </p>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 18.5"
                    value={ahi}
                    onChange={(e) => setAhi(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    SpO₂ Nadir — Lowest oxygen % (optional)
                  </label>
                  <p className="mt-1 font-body text-xs text-midnight/50">
                    The lowest blood oxygen saturation recorded during your study
                  </p>
                  <Input
                    type="number"
                    min="50"
                    max="100"
                    step="1"
                    placeholder="e.g. 88"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    Sleep Efficiency % (optional)
                  </label>
                  <p className="mt-1 font-body text-xs text-midnight/50">
                    Percentage of time in bed you were actually asleep
                  </p>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="e.g. 79"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-sunlight bg-white p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                Your results explained
              </p>

              {hasCalculated && ahiResult ? (
                <div className="mt-4 space-y-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                      AHI · {ahiNum} events/hr
                    </p>
                    <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${ahiResult.tone}`}>
                      {ahiResult.label}
                    </span>
                    <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                      {ahiResult.explanation}
                    </p>
                  </div>

                  {spo2Result && (
                    <div className="border-t border-sunlight pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        SpO₂ Nadir · {spo2Num}%
                      </p>
                      <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${spo2Result.tone}`}>
                        {spo2Result.label}
                      </span>
                      <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                        {spo2Result.explanation}
                      </p>
                    </div>
                  )}

                  {effResult && (
                    <div className="border-t border-sunlight pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        Sleep Efficiency · {effNum}%
                      </p>
                      <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${effResult.tone}`}>
                        {effResult.label}
                      </span>
                      <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                        {effResult.explanation}
                      </p>
                    </div>
                  )}

                  <div className="rounded-2xl border border-sunlight bg-daylight p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-midnight/50">
                      Disclaimer
                    </p>
                    <p className="mt-1 font-body text-xs leading-5 text-midnight/60">
                      This tool explains numbers in plain language but does not replace a
                      clinical interpretation from your sleep physician.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 font-body leading-7 text-midnight/72">
                  Enter your AHI to see a plain-English explanation of your results.
                </p>
              )}

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() =>
                    void (async () => {
                      if (!canCalculate) return;
                      await ensureEmailCapture({
                        metadata: {
                          page: "sleep-study-explainer",
                          ahi: ahiNum,
                          spo2: spo2Num || null,
                          efficiency: effNum || null,
                        },
                      });
                      setHasCalculated(true);
                    })()
                  }
                  disabled={!canCalculate}
                  className="w-full rounded-lg font-mono tracking-wider"
                >
                  Explain My Results
                </Button>
                <Button asChild className="w-full rounded-lg font-mono tracking-wider">
                  <a href="https://app.dumbo.health" target="_blank" rel="noopener noreferrer">
                    Explore Sleep Care
                  </a>
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
              Common questions about reading a sleep study report.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border border-sunlight bg-white px-6"
          >
            <AccordionItem value="where-find-ahi">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Where do I find these numbers on my report?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Your AHI is usually near the top of the summary section, labeled as
                "Overall AHI," "Total AHI," or "RDI." SpO₂ nadir appears as "Minimum
                SpO₂" or "O₂ Nadir." Sleep efficiency is typically in the sleep
                architecture table and shows as a percentage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ahi-vs-rdi">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What's the difference between AHI and RDI?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                AHI counts only full apneas and hypopneas. RDI (Respiratory Disturbance
                Index) also includes subtler events called RERAs (respiratory effort
                related arousals). RDI is usually higher than AHI for the same night.
                Either number can be entered here for a rough interpretation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="next-steps">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What should I do after reviewing my results?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                If your AHI is 5 or above, talking to a sleep specialist about treatment
                options is worth the conversation. CPAP therapy is the most common
                treatment, but oral appliances and other approaches exist depending on
                severity. Dumbo Health can help you navigate next steps from home.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function SleepStudyExplainerClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <SleepStudyExplainerClient />
    </EmailCaptureProvider>
  );
}
