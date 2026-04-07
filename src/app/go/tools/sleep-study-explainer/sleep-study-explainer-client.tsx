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
      "Your AHI is in the normal range, fewer than 5 breathing interruptions per hour. This means sleep apnea is unlikely based on this number alone.",
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
      "15–29 interruptions per hour is considered moderate sleep apnea. At this level, treatment is typically recommended, usually CPAP therapy or an oral appliance.",
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
      explanation: "85% or above is considered healthy sleep efficiency, meaning you spent most of your time in bed actually sleeping.",
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
                    AHI: Apnea-Hypopnea Index <span className="text-peach">*</span>
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
                    SpO₂ Nadir: Lowest oxygen % (optional)
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

      {/* Types of Sleep Studies */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Sleep Medicine Basics</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">Types of Sleep Studies</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            Not all sleep studies are the same. Understanding the differences helps you know what to expect and why one type may have been ordered for you.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">In-Lab</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Polysomnography (PSG)</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                The gold standard sleep study. Conducted at a sleep center with a technologist applying 20+ sensors to monitor brain waves (EEG), eye movements (EOG), muscle activity (EMG), heart rhythm (ECG), breathing effort, airflow, blood oxygen, leg movements, and snoring. The most comprehensive diagnostic tool for all sleep disorders.
              </p>
              <p className="mt-3 font-mono text-xs text-midnight/50">Cost: $1,000–$3,500</p>
            </div>

            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">At-Home</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">Home Sleep Apnea Test (HSAT)</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                A portable device worn in your own bed. Monitors airflow, breathing effort, blood oxygen (SpO₂), and heart rate using 4–7 channels. Appropriate when moderate-to-severe OSA is strongly suspected in otherwise healthy adults. More convenient and significantly lower cost than in-lab studies.
              </p>
              <p className="mt-3 font-mono text-xs text-midnight/50">Cost: $150–$400</p>
            </div>

            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Follow-Up</p>
              <h3 className="mt-2 font-heading text-xl text-midnight">CPAP Titration Study</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                An in-lab study to calibrate your CPAP pressure after an OSA diagnosis. A technologist adjusts the pressure in real time as you sleep until the optimal therapeutic level is found. Often combined with a diagnostic PSG in a single "split-night study" to reduce total nights in the lab.
              </p>
              <p className="mt-3 font-mono text-xs text-midnight/50">Often bundled with PSG</p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-sunlight">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-b border-sunlight bg-daylight">
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Feature</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">PSG (In-Lab)</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">HSAT (At-Home)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sunlight bg-white font-body text-sm text-midnight/72">
                <tr>
                  <td className="px-5 py-3 font-medium text-midnight">Monitored channels</td>
                  <td className="px-5 py-3">20+</td>
                  <td className="px-5 py-3">4–7</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-midnight">Sleep staging</td>
                  <td className="px-5 py-3">Yes (EEG)</td>
                  <td className="px-5 py-3">No</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-midnight">Best for</td>
                  <td className="px-5 py-3">Complex cases, children, suspected non-OSA disorders</td>
                  <td className="px-5 py-3">Suspected moderate-severe OSA in adults</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-midnight">Cost</td>
                  <td className="px-5 py-3">$1,000–$3,500</td>
                  <td className="px-5 py-3">$150–$400</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-midnight">Setup</td>
                  <td className="px-5 py-3">Sleep center technician</td>
                  <td className="px-5 py-3">Self-applied at home</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Sleep Study Metrics Explained */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Reading Your Report</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">Key Sleep Study Metrics Explained</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            Sleep study reports contain several metrics beyond just AHI. Here is what each one measures and why it matters clinically.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Primary Metric</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">AHI: Apnea-Hypopnea Index</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Total breathing events (apneas + hypopneas) per hour of sleep. The primary diagnostic metric for OSA severity.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>&lt;5: Normal</p>
                <p>5–14: Mild OSA</p>
                <p>15–29: Moderate OSA</p>
                <p>30+: Severe OSA</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Oxygen</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">SpO₂ Nadir</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                The lowest blood oxygen saturation recorded during the night. Reflects how severely breathing events deprive the body of oxygen.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>≥95%: Normal</p>
                <p>90–94%: Mild desaturation</p>
                <p>85–89%: Moderate desaturation</p>
                <p>&lt;85%: Severe (treatment urgent)</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Sleep Quality</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">Sleep Efficiency</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Time asleep divided by time in bed, expressed as a percentage. Reflects how consolidated and restorative your sleep is.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>≥85%: Healthy</p>
                <p>75–84%: Below ideal</p>
                <p>&lt;75%: Fragmented sleep</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Arousal</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">Arousal Index</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Number of partial awakenings per hour of sleep. Even brief arousals (3–15 seconds) disrupt sleep architecture without you fully waking up.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>&lt;15/hr: Within normal range</p>
                <p>≥15/hr: Clinically elevated</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">REM Sleep</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">REM Latency</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                Time from sleep onset to the first REM sleep episode. Shortened REM latency (under 70 minutes) can indicate depression, narcolepsy, or REM sleep behavior disorder.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>70–120 min: Typical</p>
                <p>&lt;70 min: Evaluate further</p>
              </div>
            </div>

            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Architecture</p>
              <h3 className="mt-2 font-heading text-lg text-midnight">Sleep Architecture</h3>
              <p className="mt-3 font-body text-sm leading-6 text-midnight/72">
                The breakdown of sleep stages: N1 (light), N2 (baseline), N3 (deep/restorative), and REM. OSA commonly reduces both REM and N3 (deep) sleep, leading to non-refreshing rest.
              </p>
              <div className="mt-4 space-y-1 font-mono text-xs text-midnight/60">
                <p>N3 (deep): typically 15–25%</p>
                <p>REM: typically 20–25%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare for a Sleep Study */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Preparation Guide</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">How to Prepare for a Sleep Study</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            Good preparation improves data quality and reduces the chance of a repeat study. Follow these steps for the most accurate results.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <h3 className="font-heading text-xl text-midnight">The Day Before</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Avoid caffeine after noon, as it delays sleep onset and reduces deep sleep",
                  "No alcohol, as it distorts sleep architecture even if it helps you fall asleep",
                  "Take your normal medications unless your physician says otherwise",
                  "Wash your hair and leave it free of products, as gels and sprays interfere with EEG electrode adhesion",
                  "Arrive in comfortable sleepwear you would actually sleep in",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm leading-6 text-midnight/72">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <h3 className="font-heading text-xl text-midnight">What to Bring</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Insurance card and photo ID",
                  "Any current medications in their original labeled bottles",
                  "A pillow from home if you prefer your own",
                  "A book, phone, or light entertainment for the pre-sleep period",
                  "A CPAP machine and mask if you already use one",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm leading-6 text-midnight/72">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <h3 className="font-heading text-xl text-midnight">During an In-Lab Study</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "A technologist will apply sensors using water-soluble paste or gel, which is painless and removable",
                  "You'll sleep in a private room that resembles a hotel more than a hospital",
                  "Bathroom use is possible during the night. The technologist disconnects you temporarily",
                  "The technologist monitors you remotely through the night and will not disturb you unless necessary",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm leading-6 text-midnight/72">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sunlight bg-daylight p-6">
              <h3 className="font-heading text-xl text-midnight">For Home Sleep Tests</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Follow the device instructions exactly. Incorrect placement is the most common source of error",
                  "Sleep in your normal position and environment for representative data",
                  "Place the device on your nightstand before starting so it is easy to reach",
                  "Avoid napping the day of the test. Natural sleep pressure improves data quality",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm leading-6 text-midnight/72">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Your Results: Next Steps by Severity */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Clinical Guidance</p>
          <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">Understanding Your Results: Next Steps by Severity</h2>
          <p className="mt-4 font-body text-lg leading-8 text-midnight/72">
            AHI severity guides treatment decisions. Here is what each category typically means for next steps. Always discuss specifics with your sleep physician.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-sunlight">
            <table className="w-full min-w-[540px] text-left">
              <thead>
                <tr className="border-b border-sunlight bg-white">
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">AHI Range</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Diagnosis</th>
                  <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/60">Typical Next Steps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sunlight bg-white font-body text-sm text-midnight/72">
                <tr>
                  <td className="px-5 py-4 font-mono text-xs font-medium text-midnight">&lt;5</td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">No OSA</span>
                  </td>
                  <td className="px-5 py-4">Explore other causes of symptoms: insomnia, narcolepsy, thyroid dysfunction, or circadian rhythm disorder</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-mono text-xs font-medium text-midnight">5–14</td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-800">Mild OSA</span>
                  </td>
                  <td className="px-5 py-4">Lifestyle changes (weight management, positional therapy, reduce alcohol); consider CPAP if symptomatic</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-mono text-xs font-medium text-midnight">15–29</td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-800">Moderate OSA</span>
                  </td>
                  <td className="px-5 py-4">CPAP therapy recommended; oral appliance (mandibular advancement device) as an alternative for some patients</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-mono text-xs font-medium text-midnight">30+</td>
                  <td className="px-5 py-4">
                    <span className="inline-block rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">Severe OSA</span>
                  </td>
                  <td className="px-5 py-4">CPAP strongly recommended; prompt follow-up with sleep physician; evaluate cardiovascular and metabolic risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="bg-midnight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Summary</p>
          <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">Key Takeaways</h2>
          <ul className="mt-8 space-y-5">
            {[
              "Home sleep tests are appropriate for most adults suspected of moderate-to-severe OSA, with no overnight lab stay required.",
              "AHI is the primary diagnostic metric; SpO₂ nadir and sleep efficiency add important clinical context about severity and impact.",
              "Sleep efficiency below 75% often signals sleep fragmentation beyond just apnea, and warrants its own clinical discussion.",
              "An AHI of 15 or higher typically warrants treatment; even mild OSA (AHI 5–14) deserves evaluation if you are symptomatic.",
              "CPAP is the most effective treatment for moderate-to-severe OSA, reducing AHI by 80–90% when used consistently.",
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
            <li>1. American Academy of Sleep Medicine. "Clinical Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea." 2017.</li>
            <li>2. Berry RB, et al. "Rules for Scoring Respiratory Events in Sleep." <em>Journal of Clinical Sleep Medicine.</em> 2012.</li>
            <li>3. Kapur VK, et al. "Clinical Practice Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea." <em>Journal of Clinical Sleep Medicine.</em> 2017.</li>
            <li>4. Patil SP, et al. "Treatment of Adult Obstructive Sleep Apnea with PAP Therapy." <em>Journal of Clinical Sleep Medicine.</em> 2019.</li>
          </ol>
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
