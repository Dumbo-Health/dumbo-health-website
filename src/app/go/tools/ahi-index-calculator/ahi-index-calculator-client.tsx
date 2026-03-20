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
import { Input } from "@/components/ui/input";
import {
  EmailCaptureProvider,
  useEmailCapture,
} from "@/components/EmailCaptureProvider";

type Severity = "normal" | "mild" | "moderate" | "severe";

function classifyAhi(ahi: number): Severity {
  if (ahi < 5) return "normal";
  if (ahi < 15) return "mild";
  if (ahi < 30) return "moderate";
  return "severe";
}

const severityCopy: Record<
  Severity,
  { label: string; tone: string; summary: string }
> = {
  normal: {
    label: "Normal",
    tone: "bg-green-100 text-green-800",
    summary: "Your result falls in the normal range.",
  },
  mild: {
    label: "Mild",
    tone: "bg-yellow-100 text-yellow-800",
    summary: "This result suggests mild sleep apnea severity.",
  },
  moderate: {
    label: "Moderate",
    tone: "bg-orange-100 text-orange-800",
    summary: "This result suggests moderate sleep apnea severity.",
  },
  severe: {
    label: "Severe",
    tone: "bg-red-100 text-red-800",
    summary: "This result suggests severe sleep apnea severity.",
  },
};

export function AhiIndexCalculatorClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [apneas, setApneas] = useState("20");
  const [hypopneas, setHypopneas] = useState("10");
  const [duration, setDuration] = useState("7");
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const apneaCount = Number(apneas);
    const hypopneaCount = Number(hypopneas);
    const durationHours = Number(duration);

    if (
      Number.isNaN(apneaCount) ||
      Number.isNaN(hypopneaCount) ||
      Number.isNaN(durationHours) ||
      durationHours <= 0
    ) {
      return null;
    }

    const ahi = (apneaCount + hypopneaCount) / durationHours;
    const severity = classifyAhi(ahi);
    return { ahi: Math.round(ahi * 10) / 10, severity };
  }, [apneas, hypopneas, duration]);

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              AHI Index Calculator
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Estimate your Apnea-Hypopnea Index using total apneas, total hypopneas,
              and the number of monitored sleep hours.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Enter your numbers</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                AHI is calculated as: <strong>(apneas + hypopneas) / hours of sleep</strong>.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    Total apneas
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={apneas}
                    onChange={(event) => setApneas(event.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    Total hypopneas
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={hypopneas}
                    onChange={(event) => setHypopneas(event.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    Monitoring duration in hours
                  </label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    className="mt-2 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-sunlight bg-white p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                Estimated result
              </p>
              {result && hasCalculated ? (
                <>
                  <div className="mt-4 flex items-end gap-3">
                    <p className="font-heading text-5xl text-midnight">{result.ahi}</p>
                    <span className="pb-2 text-sm text-midnight/55">events/hour</span>
                  </div>
                  <div className="mt-4">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${severityCopy[result.severity].tone}`}>
                      {severityCopy[result.severity].label}
                    </span>
                  </div>
                  <p className="mt-5 font-body leading-7 text-midnight/72">
                    {severityCopy[result.severity].summary} Use this as an educational
                    estimate, not a diagnosis.
                  </p>
                </>
              ) : (
                <p className="mt-4 font-body leading-7 text-midnight/72">
                  Enter valid values to estimate your AHI.
                </p>
              )}

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() =>
                    void (async () => {
                      if (!result) return;
                      await ensureEmailCapture({
                        metadata: {
                          page: "ahi-calculator",
                          apneas,
                          hypopneas,
                          duration,
                        },
                      });
                      setHasCalculated(true);
                    })()
                  }
                  disabled={!result}
                  className="w-full rounded-lg font-mono tracking-wider"
                >
                  Calculate AHI
                </Button>
                <Button asChild className="w-full rounded-lg font-mono tracking-wider">
                  <a href="https://app.dumbo.health" target="_blank" rel="noopener noreferrer">
                    Explore Dumbo Health Care
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
              Understand how AHI works and what the score can tell you.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="formula">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                How AHI is calculated
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                The Apnea-Hypopnea Index measures the number of breathing interruptions
                per hour of sleep. Example: if there are 30 apneas and 20 hypopneas over
                7 hours, the AHI is about 7.1.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ranges">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Common severity ranges
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Normal is under 5. Mild is 5 to under 15. Moderate is 15 to under 30.
                Severe is 30 or higher.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function AhiIndexCalculatorClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <AhiIndexCalculatorClient />
    </EmailCaptureProvider>
  );
}
