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
              Sleep Tools · Updated for 2026
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              The Free Apnea-Hypopnea Index Calculator: Your First Step Toward Understanding Sleep Apnea
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              An Apnea-Hypopnea Index calculator estimates how often breathing drops or stops during sleep, which helps people screen for possible sleep apnea before booking a formal sleep study. Sleep apnea is a form of sleep-disordered breathing in which repeated respiratory events lower airflow, disrupt sleep stages, and can reduce oxygen saturation. A 2025 prevalence analysis estimated that 80.6 million U.S. adults were living with obstructive sleep apnea, with 61% of cases in the mild range. That matters because an early estimate can help a patient decide when to speak with a sleep specialist or visit accredited sleep centers.
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
                  <Link href="/get-started">
                    Explore Dumbo Health Care
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

      {/* Content section */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">

          {/* What is the AHI calculator */}
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">Understanding AHI</p>
            <h2 className="mt-3 font-heading text-3xl text-midnight sm:text-4xl">
              What is the Apnea-Hypopnea Index calculator?
            </h2>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              The Apnea-Hypopnea Index calculator is a screening tool that estimates the number of apneas and hypopneas per hour of sleep. The calculator helps people translate observed breathing pauses, shallow breathing, and total sleep time into a single score that can indicate possible mild sleep apnea, moderate disease, or severe disease before a formal sleep test.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              The Apnea-Hypopnea Index calculator is a type of sleep assessment tool used by patients, caregivers, and clinicians to estimate the burden of nighttime breathing disruption. It is used by people who suspect sleep apnea symptoms, by bed partners who notice loud snoring, and by clinics that want a simple pre-test triage step. For example, a patient who records 30 apneas, 20 hypopneas, and 5 hours of sleep would estimate an AHI of 10.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              The Apnea-Hypopnea Index is related to sleep study reporting, oxygen desaturation, and sleep apnea diagnosis. It also connects to positive airway pressure, CPAP therapy, home sleep apnea tests, and the broader category of sleep-disordered breathing. A 2025 U.S. prevalence analysis found that 61% of estimated OSA cases were mild, which shows why an hourly event count helps separate lower-risk from higher-risk patterns.
            </p>
          </div>

          {/* What is sleep apnea */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What is sleep apnea?</h2>
            <p className="mt-4 font-body leading-7 text-midnight/72">
              Sleep apnea is a type of sleep-disordered breathing in which airflow repeatedly stops or drops during sleep. It affects the airway during sleep, reduces sleep quality, and can lower blood oxygen levels across the night.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Obstructive", body: "The airway is physically blocked by tissue. The most common type, accounting for the majority of diagnosed cases." },
                { title: "Central", body: "The brain's respiratory drive does not maintain stable breathing. Requires different treatment than obstructive sleep apnea." },
                { title: "Mixed", body: "A combination of both obstructive and central patterns, often identified during a formal in-lab sleep study." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-2xl border border-sunlight bg-daylight p-5">
                  <h4 className="font-heading text-base text-midnight">{title}</h4>
                  <p className="mt-2 font-body text-sm leading-6 text-midnight/68">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-body text-sm leading-7 text-midnight/72">
                <strong className="text-midnight">Key Fact:</strong> Sleep apnea is common and often missed. A 2025 prevalence analysis estimated 80.6 million U.S. adults had obstructive sleep apnea, and 32.2% overall prevalence means screening tools matter before symptoms become chronic. Untreated breathing disruption is not rare background noise.
              </p>
            </div>
          </div>

          {/* Why the AHI calculator matters */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">
              Why does the Apnea-Hypopnea Index calculator matter for sleep apnea screening?
            </h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              The Apnea-Hypopnea Index calculator matters for sleep apnea screening because it turns symptoms into a measurable estimate. A measurable estimate helps a patient move from vague concern to a concrete plan for a sleep study, home sleep apnea test, or a clinic visit with a sleep specialist.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              The AHI Screening Stack is the framework that connects three layers: symptom capture, event estimate, and clinical escalation. A person starts with sleep apnea symptoms such as loud snoring and non-restorative sleep, converts observations into an AHI estimate, and then uses that estimate to decide whether to seek a formal sleep apnea diagnosis.
            </p>
            <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-body text-sm leading-7 text-midnight/72">
                <strong className="text-midnight">Use Case:</strong> National Sleep Foundation data published in 2025 showed that 37% of adults were dissatisfied with their sleep and 38% did not feel refreshed on waking. The practical next step is to pair symptoms with an AHI estimate instead of waiting for fatigue to become the new normal.
              </p>
            </div>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              The American Academy of Sleep Medicine described 2025 guidance for obstructive sleep apnea and separate 2025 guidance for central sleep apnea, which shows that the same symptom cluster can lead to different treatment paths. A simple estimate is useful for screening, but a formal classification still requires clinical review.
            </p>
          </div>

          {/* Severity bands */}
          <div className="mb-12">
            <h3 className="mb-6 font-heading text-2xl text-midnight">AHI severity ranges</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-sunlight bg-daylight p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <span className="font-heading text-xs font-medium text-green-800">0–4</span>
                </div>
                <h4 className="font-heading text-base text-midnight">Normal</h4>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/68">
                  Fewer than 5 events per hour. No treatment is typically needed, but symptoms should still be discussed with a doctor if present.
                </p>
              </div>
              <div className="rounded-2xl border border-sunlight bg-daylight p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
                  <span className="font-heading text-xs font-medium text-yellow-800">5–14</span>
                </div>
                <h4 className="font-heading text-base text-midnight">Mild</h4>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/68">
                  5 to 14 events per hour. Lifestyle changes like weight loss, positional therapy, or an oral appliance are often explored at this stage. &ldquo;Mild&rdquo; does not mean &ldquo;ignore.&rdquo;
                </p>
              </div>
              <div className="rounded-2xl border border-sunlight bg-daylight p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <span className="font-heading text-xs font-medium text-orange-800">15–29</span>
                </div>
                <h4 className="font-heading text-base text-midnight">Moderate</h4>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/68">
                  15 to 29 events per hour. CPAP therapy is the most common treatment. Untreated moderate sleep apnea raises cardiovascular risk.
                </p>
              </div>
              <div className="rounded-2xl border border-sunlight bg-daylight p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                  <span className="font-heading text-xs font-medium text-red-800">30+</span>
                </div>
                <h4 className="font-heading text-base text-midnight">Severe</h4>
                <p className="mt-2 font-body text-sm leading-6 text-midnight/68">
                  30 or more events per hour. Treatment is strongly recommended. CPAP is typically the first line and consistent use can dramatically improve outcomes.
                </p>
              </div>
            </div>
            <p className="mt-4 font-body text-sm leading-6 text-midnight/55">
              Severity thresholds are set by the American Academy of Sleep Medicine.
            </p>
          </div>

          {/* How it works */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">How does the Apnea-Hypopnea Index calculator work?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              The Apnea-Hypopnea Index calculator works by adding the number of apneas and hypopneas and dividing that total by total sleep time in hours. The resulting value estimates how many respiratory events happen per hour.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">Use these inputs when estimating your score:</p>
            <ul className="mt-3 space-y-1 font-body text-sm leading-7 text-midnight/72 list-disc list-inside">
              {[
                "Count observed apneas",
                "Count observed hypopneas",
                "Estimate total sleep time",
                "Note sleep position",
                "Note choking, gasping, and snoring patterns",
                "Record any visible drops in oxygen saturation if a wearable shows them",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Step-by-step calculation */}
          <div className="mb-12 rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
            <h3 className="font-heading text-2xl text-midnight">How to calculate your AHI step by step</h3>
            <p className="mt-3 font-body leading-7 text-midnight/72">
              <strong>Example:</strong> A sleeper with 24 apneas, 12 hypopneas, and 6 hours of sleep has an estimated AHI of 6 — sitting in the mild range. That supports booking a sleep test if symptoms are present. A 2025 prevalence analysis found that 61% of estimated U.S. OSA cases were mild, so lower-range scores still matter. &ldquo;Mild&rdquo; does not mean &ldquo;ignore.&rdquo;
            </p>
            <ol className="mt-5 space-y-2 font-body text-sm leading-7 text-midnight/72">
              {[
                "Record the number of complete breathing pauses (apneas).",
                "Record the number of partial breathing reductions (hypopneas).",
                "Estimate total sleep time in hours.",
                "Add apneas and hypopneas together.",
                "Divide the total by hours slept.",
                "Compare the result with the AHI severity bands above.",
                "Pair the score with symptoms such as loud snoring or daytime fatigue.",
                "Book a sleep study if the estimate and symptoms align.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-peach font-mono text-[10px] text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-5 font-body text-sm leading-7 text-midnight/68">
              The score is only as good as the inputs. A brief sleep diary — including bedtime, wake time, awakenings, naps, alcohol intake, and sleep position notes — can improve the estimate.
            </p>
          </div>

          {/* Why does sleep apnea reduce sleep quality */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">Why does sleep apnea reduce sleep quality?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              Sleep apnea reduces sleep quality because repeated respiratory events fragment normal sleep stages and interrupt sleep cycles. Repeated arousals prevent stable, restorative sleep and increase the likelihood of waking unrefreshed.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: "Problem", text: "A patient wakes unrefreshed and reports daytime fatigue." },
                { label: "Root cause", text: "Repeated respiratory effort against a blocked airway or unstable respiratory control disrupts normal sleep continuity." },
                { label: "Mechanism", text: "Breathing instability triggers arousal, worsens sleep architecture, and can lower oxygen saturation across the night." },
                { label: "Solution", text: "Estimate burden with an AHI calculator, confirm with a sleep study, and match treatment to the type of event pattern." },
              ].map(({ label, text }) => (
                <div key={label} className="flex gap-4 rounded-xl border border-sunlight bg-daylight p-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-peach whitespace-nowrap pt-0.5">{label}</span>
                  <p className="font-body text-sm leading-6 text-midnight/72">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-body text-sm leading-7 text-midnight/72">
                <strong className="text-midnight">Summary:</strong> National Sleep Foundation data from 2025 showed 38% of adults did not feel refreshed on waking, which is why a breathing-focused screen is useful when fatigue persists. Combine symptom tracking with formal testing — not either one alone.
              </p>
            </div>
          </div>

          {/* What does a Sleep Study include */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What does a Sleep Study include?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              A sleep study includes airflow, breathing effort, oxygen, movement, and sleep-stage monitoring. A full sleep study may also record heart rate, brain waves, leg movements, snoring, and body position in a sleep laboratory.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              A lab-based sleep study provides the most complete data because a sleep laboratory can measure sleep stages, sleep staging, sleep architecture, respiratory effort, and the relationship between breathing events and arousals. Some cases also need a review of the oxygen desaturation index, respiratory disturbance, or the Respiratory Disturbance Index.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              A sleep study is the formal test used for sleep apnea diagnosis and classification. The American Academy of Sleep Medicine uses structured scoring rules and 2025 clinical guidance for both obstructive sleep apnea and central sleep apnea, which means treatment depends on the event pattern — not only on snoring.
            </p>
          </div>

          {/* AHI calc vs sleep study */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">AHI calculator vs. sleep study: what&apos;s the difference?</h2>
            <p className="mt-4 font-body leading-7 text-midnight/72">
              The calculator estimates burden; a sleep study confirms diagnosis and event type. The calculator is a screening method — the sleep study is the diagnostic method.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-sunlight">
              {[
                { label: "AHI Calculator", best: "Early screening", ideal: "Deciding whether to seek medical evaluation", icon: "~" },
                { label: "Home Sleep Apnea Test", best: "Suspected obstructive sleep apnea", ideal: "Lower-complexity testing outside a lab", icon: "⌂" },
                { label: "In-Lab Sleep Study", best: "Formal diagnosis and complex cases", ideal: "Suspected central sleep apnea, mixed patterns, or unclear symptoms", icon: "✦" },
              ].map(({ label, best, ideal, icon }, i) => (
                <div key={label} className={`flex gap-4 p-5 font-body text-sm ${i !== 2 ? "border-b border-sunlight" : ""}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunlight font-mono text-base text-midnight/55">
                    {icon}
                  </div>
                  <div>
                    <p className="font-heading text-base text-midnight">{label}</p>
                    <p className="mt-0.5 text-midnight/68"><strong className="font-medium text-midnight">Best for:</strong> {best}</p>
                    <p className="mt-0.5 text-midnight/68"><strong className="font-medium text-midnight">Ideal use:</strong> {ideal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* When should you use an AHI Calculator */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">When should you use an AHI Calculator?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              You should use an AHI Calculator when sleep apnea symptoms suggest possible nighttime breathing disruption. Symptoms that justify use include loud snoring, gasping, witnessed pauses, daytime fatigue, morning headaches, and non-restorative sleep.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              You should also use an AHI Calculator when a bed partner reports irregular breathing or when wearables show unstable oxygen saturation or unusual overnight heart rate patterns. A calculator is especially useful before scheduling a clinic appointment because it helps organize observations into a structured summary for a sleep specialist. See also our guides to sleep apnea symptoms and how home sleep apnea tests work.
            </p>
          </div>

          {/* Benefits of early screening */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What are the benefits of early sleep apnea screening?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              The benefits of early sleep apnea screening include faster testing, clearer symptom tracking, and earlier treatment decisions. Earlier screening also improves the chance that a patient will distinguish occasional poor sleep from consistent sleep-disordered breathing.
            </p>
            <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-body text-sm leading-7 text-midnight/72">
                Based on analysis of three 2025 sources, the strongest combined signal is not only prevalence but delayed recognition: one source quantified burden, one described current clinical pathways, and one showed poor sleep satisfaction at population level. A simple screening layer can close the gap between symptoms and testing.
              </p>
            </div>
          </div>

          {/* What does sleep apnea treatment include */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What does sleep apnea treatment include?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              Sleep apnea treatment includes diagnosis, severity review, event-type classification, and therapy matched to the breathing pattern. Treatment for obstructive sleep apnea often includes positive airway pressure, CPAP therapy, a CPAP machine, oral appliances, and lifestyle changes such as weight loss or sleep position therapy.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              Treatment for central sleep apnea can differ because central sleep apnea involves unstable respiratory drive rather than simple airway blockage. The 2025 AASM guideline for central sleep apnea reviewed several therapies including CPAP and other device strategies, which shows why central sleep apnea needs its own treatment logic. Some patients may require bilevel positive airway pressure, and selected patients may need advanced evaluation if heart failure or other medical issues are present.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              A patient should not assume that all event patterns are treated the same. A clinician may also review medication use, pain medication, medication side effects, or other conditions that affect breathing stability. In severe edge cases, related respiratory illness may increase concern for respiratory failure, which requires urgent medical care.
            </p>
          </div>

          {/* Benefits of seeing a sleep specialist */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What are the benefits of seeing a sleep specialist?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              A sleep specialist helps interpret symptoms, testing options, and treatment tradeoffs. A sleep specialist also helps distinguish obstructive sleep apnea, central sleep apnea, and obstructive sleep apnea syndrome when the symptom pattern is not obvious.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              A sleep specialist can also review sleep study results, explain the Respiratory Disturbance Index, discuss oxygen desaturation levels, and decide whether a patient needs a lab test, home sleep apnea test, or follow-up in specialized sleep centers. Obstructive sleep apnea diagnoses and central sleep apnea pathways are not interchangeable, which makes specialist review important.
            </p>
          </div>

          {/* Veterans */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl text-midnight sm:text-4xl">What should veterans know about sleep apnea claims?</h2>
            <p className="mt-5 font-body leading-7 text-midnight/72">
              Veterans should know that sleep apnea claims usually depend on documented symptoms, formal testing, and a clear medical opinion. A disability claim for sleep apnea often relies on sleep study results, treatment records, and evidence showing functional impact.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/68">
              A veteran researching disability for sleep apnea, rating for sleep apnea, or a service-connected sleep apnea rating should gather a confirmed diagnosis, treatment history, and any medical opinion supporting a connection to service or another condition. Terms such as &ldquo;Nexus Linking Sleep Apnea&rdquo; are commonly used when discussing the evidence needed for a disability claim. Patients seeking compensation for sleep impairment should use medical and legal guidance together.
            </p>
            <div className="mt-6 rounded-2xl border border-sunlight bg-daylight p-5">
              <p className="font-body text-sm leading-7 text-midnight/72">
                <strong className="text-midnight">Key Fact:</strong> A disability claim for sleep apnea is strongest when objective testing and medical reasoning align. A symptom list alone is weak evidence; a diagnosis plus treatment history is much stronger. That matters for both benefits and continuity of care.
              </p>
            </div>
          </div>

          {/* Where numbers come from */}
          <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
            <h3 className="font-heading text-xl text-midnight">Where do these numbers come from?</h3>
            <p className="mt-3 font-body leading-7 text-midnight/72">
              Apneas and hypopneas are recorded during a sleep study — either an in-lab polysomnography (PSG) or a home sleep apnea test (HSAT). Look for &ldquo;total apneas,&rdquo; &ldquo;total hypopneas,&rdquo; and &ldquo;total sleep time&rdquo; on your report. Your CPAP device also reports a nightly residual AHI through its companion app.
            </p>
            <p className="mt-4 font-body leading-7 text-midnight/72">
              If you haven&apos;t had a sleep study yet, Dumbo Health offers an at-home sleep test that&apos;s comfortable, easy to use, and interpreted by licensed clinicians.
            </p>
            <div className="mt-6">
              <Link
                href="/at-home-sleep-test"
                className="inline-flex items-center font-mono text-sm uppercase tracking-wider text-peach hover:underline"
              >
                Learn about at-home sleep testing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">FAQ</p>
            <h2 className="mt-3 font-heading text-3xl text-midnight">What questions do people ask about an Apnea-Hypopnea Index calculator?</h2>
            <p className="mt-2 font-body text-midnight/68">
              Answers to the questions we hear most about the Apnea-Hypopnea Index.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="what-is-normal">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What is a normal Apnea-Hypopnea Index?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A normal AHI is generally below 5 events per hour. A lower score means fewer respiratory events, but a doctor still reviews symptoms, oxygen trends, and sleep disruption before ruling out a problem.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mild-score">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What score suggests mild sleep apnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Mild sleep apnea usually starts at 5 events per hour. A patient with mild sleep apnea can still have daytime fatigue, poor sleep quality, and clinically relevant symptoms that justify a sleep study. &ldquo;Mild&rdquo; does not mean &ldquo;ignore.&rdquo;
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="diagnosis">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Can an AHI calculator diagnose sleep apnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                No. A calculator estimates event frequency, but a formal sleep apnea diagnosis requires a sleep study or other clinician-directed testing. Always speak with a healthcare provider before starting or changing any treatment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="osa-vs-csa">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What is the difference between obstructive and central sleep apnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Obstructive sleep apnea is caused by airway blockage, while central sleep apnea is caused by unstable breathing control. The difference matters because treatment for central sleep apnea may not match treatment for obstructive sleep apnea.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="oxygen-desaturation">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What is oxygen desaturation?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Oxygen desaturation is a drop in blood oxygen during sleep. Repeated oxygen desaturation can increase the clinical significance of respiratory events, especially when oxygen desaturation levels fall alongside frequent arousals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="when-sleep-study">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                When should someone book a Sleep Study?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A person should book a sleep study when symptoms such as loud snoring, gasping, daytime fatigue, or a high AHI estimate appear together. A formal test is especially important when central sleep apnea, heart failure, or mixed patterns are possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="positive-airway-pressure">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What does positive airway pressure mean?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Positive airway pressure means a machine delivers pressurized air to keep breathing stable during sleep. It includes standard CPAP and other device modes used for different breathing patterns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="oral-appliances">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Do oral appliances work for sleep apnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Oral appliances can work for selected patients with obstructive sleep apnea or primary snoring. They are not the right fit for every patient, so a clinician should match the device to anatomy, severity, and test findings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sleep-position">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Can sleep position change sleep apnea severity?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Yes, for some patients. Sleep position therapy may reduce events when breathing becomes worse on the back than on the side. A sleep study can identify whether position plays a significant role for you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="home-vs-lab">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Can home testing replace a sleep laboratory study?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Home sleep apnea tests can replace lab testing in some straightforward suspected obstructive sleep apnea cases. A sleep laboratory study is still more useful when sleep staging, respiratory disturbance patterns, or central sleep apnea are part of the clinical question.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="formula">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                How is AHI calculated?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                AHI is calculated by dividing the total number of apneas and hypopneas by the number of hours of monitored sleep. For example, 30 apneas + 20 hypopneas over 5 hours gives an AHI of 10 events per hour.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="apnea-vs-hypopnea">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What&apos;s the difference between an apnea and a hypopnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                An apnea is a complete stop in airflow lasting at least 10 seconds. A hypopnea is a partial reduction in airflow — typically 30% or more — that also causes a drop in blood oxygen or an arousal from sleep. Both are counted together in the AHI formula.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cpap-ahi">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Can I use this to check if my CPAP is working?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Yes. Most modern CPAP machines report your residual AHI nightly through their companion app (like myAir for ResMed or DreamMapper for Philips). If your residual AHI is consistently below 5, your therapy is generally considered effective. Enter those numbers here to double-check your reading.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ahi-change">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Can AHI change over time?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Yes. AHI can increase with weight gain, aging, or alcohol use, and it can improve with weight loss, positional therapy, or consistent CPAP use. Periodic follow-up sleep studies are often recommended even after starting treatment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Key takeaways */}
          <div className="mt-10 rounded-2xl border border-sunlight bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">Key Takeaways</p>
            <ul className="mt-4 space-y-3 font-body text-sm leading-7 text-midnight/72">
              {[
                "Use an AHI Calculator to turn observed breathing pauses into a clear first screening number.",
                "Book a formal sleep study when symptoms and the AHI estimate point in the same direction.",
                "Ask a sleep specialist to distinguish obstructive sleep apnea from central sleep apnea before choosing therapy.",
                "Treat sleep apnea early because repeated breathing events reduce sleep quality and may affect long-term health.",
                "Bring a sleep diary to appointments so the clinical review starts with better data.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-peach" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <div className="mt-6 rounded-2xl border border-sunlight bg-white p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/40">References</p>
            <ol className="mt-4 space-y-2 font-body text-sm leading-6 text-midnight/55">
              <li>1. Mehra R, Auckley DH, Johnson KG, et al. Evaluation and management of obstructive sleep apnea in adults hospitalized for medical care: an American Academy of Sleep Medicine clinical practice guideline. <em>Journal of Clinical Sleep Medicine.</em> 2025.</li>
              <li>2. Badr MS, Khayat RN, Allam JS, et al. Treatment of central sleep apnea in adults: an American Academy of Sleep Medicine clinical practice guideline. <em>Journal of Clinical Sleep Medicine.</em> 2025.</li>
              <li>3. National Sleep Foundation. <em>2025 Sleep in America® Poll.</em> 2025.</li>
              <li>4. Simmons J, et al. Estimated Prevalence and Impact in the United States. <em>SLEEP.</em> 2025 supplement abstract.</li>
              <li>5. American Academy of Sleep Medicine. A year of momentum for sleep medicine: 2025 recap. Published January 6, 2026.</li>
            </ol>
          </div>
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
