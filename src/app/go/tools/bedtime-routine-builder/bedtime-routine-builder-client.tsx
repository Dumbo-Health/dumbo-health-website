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

type FallAsleep = "under10" | "10to20" | "20to30" | "over30";
type StressLevel = "low" | "moderate" | "high";
type ScreenUse = "yes" | "sometimes" | "no";

interface Answers {
  wakeTime: string;
  fallAsleep: FallAsleep | null;
  stress: StressLevel | null;
  screens: ScreenUse | null;
  caffeine: boolean | null;
}

const fallAsleepMinutes: Record<FallAsleep, number> = {
  under10: 10,
  "10to20": 20,
  "20to30": 30,
  over30: 45,
};

function subtractMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m - minutes;
  const clamped = ((total % 1440) + 1440) % 1440;
  const hh = Math.floor(clamped / 60);
  const mm = clamped % 60;
  const period = hh < 12 ? "AM" : "PM";
  const displayH = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
  return `${displayH}:${mm.toString().padStart(2, "0")} ${period}`;
}

interface RoutineStep {
  time: string;
  icon: string;
  title: string;
  description: string;
}

function buildRoutine(answers: Answers): RoutineStep[] {
  const { wakeTime, fallAsleep, stress, screens, caffeine } = answers;
  if (!wakeTime || !fallAsleep || stress === null || screens === null || caffeine === null) {
    return [];
  }

  // Work backwards from wake time to build an 8-hour sleep window
  const sleepMinutes = fallAsleepMinutes[fallAsleep];
  // Ideal bedtime = wake - 8h - time to fall asleep
  const bedtimeOffset = 8 * 60 + sleepMinutes;

  const steps: RoutineStep[] = [];

  // Caffeine cutoff (if they drink caffeine after noon, remind them)
  if (caffeine) {
    steps.push({
      time: subtractMinutes(wakeTime, bedtimeOffset + 360), // 6 hours before bed
      icon: "☕",
      title: "Last caffeine of the day",
      description:
        "Caffeine stays in your system for 5–7 hours. Have your last cup no later than this to avoid it interfering with sleep.",
    });
  }

  // Screen wind-down
  const screenOffset =
    screens === "yes" ? 90 : screens === "sometimes" ? 60 : 30;
  steps.push({
    time: subtractMinutes(wakeTime, bedtimeOffset + screenOffset),
    icon: "📵",
    title: "Put screens away",
    description:
      screens === "no"
        ? "You're already screen-light before bed — keep it up. Use this window for light reading or conversation instead."
        : "Blue light from screens delays melatonin release. Switching off now gives your brain time to shift into sleep mode.",
  });

  // Stress wind-down activity
  if (stress === "high") {
    steps.push({
      time: subtractMinutes(wakeTime, bedtimeOffset + 60),
      icon: "📝",
      title: "Write a worry list",
      description:
        "Spend 5 minutes writing down tomorrow's tasks and any unresolved worries. Getting them out of your head and onto paper reduces mental chatter at bedtime.",
    });
  } else if (stress === "moderate") {
    steps.push({
      time: subtractMinutes(wakeTime, bedtimeOffset + 45),
      icon: "🧘",
      title: "Short breathing exercise",
      description:
        "Try 4-7-8 breathing: inhale for 4 seconds, hold for 7, exhale for 8. Three rounds is enough to noticeably lower your heart rate.",
    });
  }

  // Temperature drop — shower
  steps.push({
    time: subtractMinutes(wakeTime, bedtimeOffset + 90),
    icon: "🚿",
    title: "Warm shower or bath",
    description:
      "A warm shower 1–2 hours before bed causes your core temperature to drop as you cool down, which is one of the body's main cues to feel sleepy.",
  });

  // Dim lights
  steps.push({
    time: subtractMinutes(wakeTime, bedtimeOffset + 60),
    icon: "💡",
    title: "Dim the lights",
    description:
      "Bright overhead lighting suppresses melatonin. Switch to lamps or warm-toned light to help your brain recognize it's evening.",
  });

  // Bedtime
  steps.push({
    time: subtractMinutes(wakeTime, bedtimeOffset),
    icon: "🛏️",
    title: "Lights out",
    description:
      fallAsleep === "under10"
        ? "You fall asleep quickly — keep up whatever you're doing. Stick to this time and your body clock will stay calibrated."
        : "Getting into bed at a consistent time trains your circadian rhythm. Even on weekends, try not to shift this by more than an hour.",
  });

  // Sort by time descending (earliest first)
  return steps.sort((a, b) => {
    const parse = (t: string) => {
      const [time, period] = t.split(" ");
      const [h, m] = time.split(":").map(Number);
      return (period === "PM" && h !== 12 ? h + 12 : period === "AM" && h === 12 ? 0 : h) * 60 + m;
    };
    return parse(a.time) - parse(b.time);
  });
}

const fallAsleepOptions: { value: FallAsleep; label: string }[] = [
  { value: "under10", label: "Under 10 min" },
  { value: "10to20", label: "10–20 min" },
  { value: "20to30", label: "20–30 min" },
  { value: "over30", label: "Over 30 min" },
];

const stressOptions: { value: StressLevel; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
];

const screenOptions: { value: ScreenUse; label: string }[] = [
  { value: "yes", label: "Yes, often" },
  { value: "sometimes", label: "Sometimes" },
  { value: "no", label: "Rarely/Never" },
];

export function BedtimeRoutineBuilderClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [answers, setAnswers] = useState<Answers>({
    wakeTime: "07:00",
    fallAsleep: null,
    stress: null,
    screens: null,
    caffeine: null,
  });
  const [hasBuilt, setHasBuilt] = useState(false);

  const allAnswered =
    answers.fallAsleep !== null &&
    answers.stress !== null &&
    answers.screens !== null &&
    answers.caffeine !== null;

  const routine = useMemo(() => buildRoutine(answers), [answers]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
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
              Bedtime Routine Builder
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Answer 5 questions about your sleep habits and get a personalized
              wind-down routine with exact times for tonight.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Questions */}
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Tell us about your nights</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                Your routine will be built around your answers.
              </p>

              <div className="mt-8 space-y-6">
                {/* Wake time */}
                <div className="rounded-2xl border border-sunlight bg-white p-5">
                  <p className="font-body font-medium text-midnight">
                    What time do you need to wake up?
                  </p>
                  <input
                    type="time"
                    value={answers.wakeTime}
                    onChange={(e) => set("wakeTime", e.target.value)}
                    className="mt-3 rounded-xl border border-sunlight bg-daylight px-4 py-2 font-mono text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-peach"
                  />
                </div>

                {/* Fall asleep */}
                <div className="rounded-2xl border border-sunlight bg-white p-5">
                  <p className="font-body font-medium text-midnight">
                    How long does it usually take you to fall asleep?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {fallAsleepOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("fallAsleep", opt.value)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          answers.fallAsleep === opt.value
                            ? "border-peach bg-peach text-white"
                            : "border-sunlight bg-daylight text-midnight"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stress */}
                <div className="rounded-2xl border border-sunlight bg-white p-5">
                  <p className="font-body font-medium text-midnight">
                    How stressed are you before bed, typically?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stressOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("stress", opt.value)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          answers.stress === opt.value
                            ? "border-peach bg-peach text-white"
                            : "border-sunlight bg-daylight text-midnight"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screens */}
                <div className="rounded-2xl border border-sunlight bg-white p-5">
                  <p className="font-body font-medium text-midnight">
                    Do you use screens (phone, TV, laptop) in the hour before bed?
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {screenOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("screens", opt.value)}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          answers.screens === opt.value
                            ? "border-peach bg-peach text-white"
                            : "border-sunlight bg-daylight text-midnight"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Caffeine */}
                <div className="rounded-2xl border border-sunlight bg-white p-5">
                  <p className="font-body font-medium text-midnight">
                    Do you drink caffeine after noon (coffee, tea, energy drinks)?
                  </p>
                  <div className="mt-4 flex gap-3">
                    {(["Yes", "No"] as const).map((opt) => {
                      const val = opt === "Yes";
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set("caffeine", val)}
                          className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                            answers.caffeine === val
                              ? "border-peach bg-peach text-white"
                              : "border-sunlight bg-daylight text-midnight"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-3xl border border-sunlight bg-white p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                Your routine
              </p>

              {hasBuilt && routine.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {routine.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-daylight text-lg">
                          {step.icon}
                        </div>
                        {i < routine.length - 1 && (
                          <div className="mt-1 h-full w-px bg-sunlight" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-peach">
                          {step.time}
                        </p>
                        <p className="mt-1 font-body font-medium text-midnight">
                          {step.title}
                        </p>
                        <p className="mt-1 font-body text-sm leading-6 text-midnight/68">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 font-body leading-7 text-midnight/72">
                  Answer all 5 questions to get your personalized routine.
                </p>
              )}

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() =>
                    void (async () => {
                      if (!allAnswered) return;
                      await ensureEmailCapture({
                        metadata: {
                          page: "bedtime-routine-builder",
                          wakeTime: answers.wakeTime,
                          fallAsleep: answers.fallAsleep,
                          stress: answers.stress,
                          screens: answers.screens,
                          caffeine: answers.caffeine,
                        },
                      });
                      setHasBuilt(true);
                    })()
                  }
                  disabled={!allAnswered}
                  className="w-full rounded-lg font-mono tracking-wider"
                >
                  Build My Routine
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
              Why evening habits matter as much as sleep itself.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border border-sunlight bg-white px-6"
          >
            <AccordionItem value="why-routine">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Why does a bedtime routine actually help?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Sleep doesn't have an on/off switch. Your body prepares for sleep over
                60–90 minutes through gradual drops in core temperature, heart rate, and
                cortisol. A consistent routine accelerates those changes and trains your
                brain to recognize the cues, making it easier to fall asleep and stay asleep.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="screens">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                How much do screens actually affect sleep?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Short-wavelength blue light from screens suppresses melatonin by up to
                50% for several hours. Beyond the light itself, mentally stimulating
                content — news, social media, video — also keeps your nervous system
                activated when it should be winding down.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sleep-apnea-routine">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Does a bedtime routine help if I have sleep apnea?
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Yes — and no routine replaces treatment for sleep apnea itself. A
                consistent wind-down helps you fall asleep faster and reduces the time
                you spend in light sleep, but if you're waking up still exhausted,
                untreated apnea is likely the underlying issue worth addressing directly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function BedtimeRoutineBuilderClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <BedtimeRoutineBuilderClient />
    </EmailCaptureProvider>
  );
}
