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

      {/* Section 1: The Science Behind Bedtime Routines */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">The Science Behind Bedtime Routines</h2>
          <p className="mt-4 font-body text-lg leading-8" style={{ color: "rgba(3,31,61,0.72)" }}>
            Sleep onset is not instantaneous. It requires a gradual physiological transition driven by two interlocking systems: your circadian clock and sleep pressure (adenosine buildup in the brain).
          </p>
          <ul className="mt-6 space-y-4">
            <li className="font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
              <span className="font-medium text-midnight">Core temperature drop.</span> Your core body temperature must fall by 1–2°F to initiate sleep. This cooling process begins roughly 2 hours before your natural sleep time — which is why a warm bath paradoxically helps (your body cools rapidly after you step out).
            </li>
            <li className="font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
              <span className="font-medium text-midnight">Melatonin onset (DLMO).</span> Dim-light melatonin onset starts approximately 2 hours before your habitual sleep time. Bright light and screen exposure during this window suppresses melatonin secretion, delaying the physiological signal to sleep.
            </li>
            <li className="font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
              <span className="font-medium text-midnight">Cortisol clearance.</span> Cortisol — the primary alerting hormone — peaks in the morning and must drop before sleep is possible. Stress, stimulating content, and bright environments all delay this drop.
            </li>
            <li className="font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
              <span className="font-medium text-midnight">Conditioned stimulus effect.</span> A consistent pre-sleep routine functions as a conditioned stimulus: repeated cues train the brain to associate those behaviors with sleep onset, reducing the effort required to fall asleep over time.
            </li>
          </ul>
          <div className="mt-8 rounded-2xl border border-sunlight bg-daylight p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-peach">Key Fact</p>
            <p className="mt-3 font-body leading-7 text-midnight">
              "A consistent bedtime routine reduces sleep onset latency by an average of 10–15 minutes in adults, according to sleep medicine research."
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: 10 Evidence-Based Sleep Hygiene Practices */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">10 Evidence-Based Sleep Hygiene Practices</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            These practices are grounded in sleep medicine research and form the behavioral foundation of any effective sleep routine.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                n: "1",
                title: "Set a consistent wake time",
                body: "Seven days a week — even weekends. This is the single most powerful anchor for your circadian rhythm. Consistent wake time stabilizes the system; bedtime follows naturally.",
              },
              {
                n: "2",
                title: "Avoid screens 60–90 minutes before bed",
                body: "Blue light in the 450–480nm wavelength range suppresses melatonin secretion by up to 50%. Beyond the light, mentally stimulating content also keeps your nervous system activated.",
              },
              {
                n: "3",
                title: "Keep your bedroom cool",
                body: "Optimal sleep temperature is 65–68°F (18–20°C). Your body needs to shed heat to initiate and maintain deep sleep. A room that's too warm fragments sleep architecture.",
              },
              {
                n: "4",
                title: "Limit caffeine after 2pm",
                body: "Caffeine's half-life is 5–7 hours. A coffee at 3pm still has significant adenosine-blocking activity at 10pm — delaying sleep onset even if you don't feel alert.",
              },
              {
                n: "5",
                title: "Avoid alcohol within 3 hours of bedtime",
                body: "Alcohol may feel sedating but it fragments sleep architecture and suppresses REM sleep — the stage most critical for memory, emotional regulation, and cognitive recovery.",
              },
              {
                n: "6",
                title: "Wind down with low-stimulation activity",
                body: "Reading (physical book), light stretching, journaling, or meditation. The goal is to reduce cognitive and emotional arousal, not simply be physically still.",
              },
              {
                n: "7",
                title: "Use your bed only for sleep (and sex)",
                body: "This is stimulus control therapy: by restricting bed use, you strengthen the mental association between bed and sleep. Working or watching TV in bed weakens this link.",
              },
              {
                n: "8",
                title: "Dim lights 1–2 hours before bed",
                body: "Bright overhead lighting suppresses melatonin just like screens. Switch to lamps, warm-toned light, or dedicated dim-light settings in the evening.",
              },
              {
                n: "9",
                title: "Avoid large meals within 2–3 hours of bed",
                body: "Active digestion raises core body temperature and can cause acid reflux when lying down — both of which fragment sleep, particularly in the first half of the night.",
              },
              {
                n: "10",
                title: "Get morning light exposure",
                body: "10–15 minutes of natural light within an hour of waking strengthens your circadian anchor, suppresses residual melatonin, and sets your body clock for the day.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="rounded-2xl border border-sunlight bg-white p-5">
                <p className="font-mono text-xs text-peach">{n.padStart(2, "0")}</p>
                <p className="mt-2 font-heading text-base text-midnight">{title}</p>
                <p className="mt-2 font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Your Wind-Down Window */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Your Wind-Down Window: A Sample 90-Minute Routine</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            The 90 minutes before bed is the most influential window for sleep quality. This timeline shows how to use it intentionally.
          </p>
          <div className="mt-8 space-y-0">
            {[
              {
                t: "T−90 min",
                title: "Dim household lights; finish last meal; put away work",
                body: "Begin the physiological transition. Stopping work at this point allows cortisol to start clearing. Dimming lights begins the melatonin ramp.",
              },
              {
                t: "T−60 min",
                title: "No more screens; start relaxing activity",
                body: "Book, podcast, gentle stretching, or conversation. Your goal is mental deceleration — reducing the cognitive arousal that keeps the brain in problem-solving mode.",
              },
              {
                t: "T−45 min",
                title: "Prepare tomorrow's essentials",
                body: "Write tomorrow's task list, lay out clothes, check your calendar. Getting these items out of your head reduces bedtime anxiety and prevents the cortisol spike that anticipatory stress causes.",
              },
              {
                t: "T−30 min",
                title: "Warm shower or bath",
                body: "Counterintuitively, this cools your core temperature as you get out — accelerating one of the body's primary sleep-onset signals. Optimal timing is 1–2 hours before bed.",
              },
              {
                t: "T−15 min",
                title: "Move to bed; breathing exercise or meditation",
                body: "Try 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) or box breathing (4-4-4-4). Three rounds measurably reduces heart rate and activates the parasympathetic nervous system.",
              },
              {
                t: "T−0",
                title: "Lights out — same time every night",
                body: "Consistency at this step compounds over time. Your circadian system begins anticipating sleep 30–60 minutes before a habitual bedtime, releasing melatonin proactively.",
              },
            ].map(({ t, title, body }, i, arr) => (
              <div key={t} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sunlight bg-daylight">
                    <span className="font-mono text-[9px] text-peach">{String(i + 1)}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-sunlight" style={{ minHeight: "1.5rem" }} />}
                </div>
                <div className="pb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-peach">{t}</p>
                  <p className="mt-1 font-heading text-base text-midnight">{title}</p>
                  <p className="mt-1 font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Sleep Hygiene vs CBT-I */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Sleep Hygiene vs CBT-I: When to Upgrade</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            Sleep hygiene and bedtime routines are the behavioral foundation — but they have a ceiling. Here is when to consider the clinical gold standard.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">Sleep Hygiene</p>
              <p className="mt-3 font-heading text-lg text-midnight">The foundation</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Environmental and behavioral changes most people benefit from",
                  "Consistent schedule, cool room, limited screens, no late caffeine",
                  "Effective for mild sleep difficulties and maintaining good sleep",
                  "Should always be the first step before clinical intervention",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                    <span className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">CBT-I</p>
              <p className="mt-3 font-heading text-lg text-midnight">The gold standard</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Cognitive Behavioral Therapy for Insomnia — first-line treatment for chronic insomnia",
                  "Includes: sleep restriction therapy, stimulus control, cognitive restructuring, relaxation training",
                  "70–80% success rate for chronic insomnia — outperforms sleep medications long-term",
                  "Digital CBT-I programs (Somryst, Sleepio) are now FDA-cleared and widely accessible",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                    <span className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section style={{ backgroundColor: "#031F3D" }}>
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-white">Key Takeaways</h2>
          <ul className="mt-6 space-y-4">
            {[
              "The 90 minutes before bed is the most powerful window to influence sleep quality — what you do in that window has an outsized effect on how quickly you fall asleep and how deeply you sleep.",
              "Consistent wake time is more important than consistent bedtime for circadian health. The wake anchor stabilizes the entire sleep system.",
              "Screens, bright lights, and caffeine are the three most common sleep routine disruptors — all three delay the physiological signals your body needs to initiate sleep.",
              "A bedtime routine helps, but cannot fix untreated sleep apnea or chronic insomnia. If you wake exhausted despite good habits, those require clinical evaluation.",
              "CBT-I is the most effective treatment for chronic insomnia, with durable results that outlast medication — and digital programs make it more accessible than ever.",
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                <span className="font-body leading-7" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 6: References */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-2xl text-midnight">References</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Buysse DJ. \"Sleep Health: Can We Define It? Does It Matter?\" Sleep. 2014;37(1):9–17.",
              "Chang AM, et al. \"Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness.\" Proceedings of the National Academy of Sciences. 2015;112(4):1232–1237.",
              "Harvey AG. \"A Cognitive Model of Insomnia.\" Behaviour Research and Therapy. 2002;40(8):869–893.",
              "Morin CM, et al. \"Cognitive-behavioral therapy for late-life insomnia.\" Sleep Medicine Reviews. 2006;10(5):331–338.",
            ].map((ref) => (
              <li key={ref} className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.68)" }}>
                {ref}
              </li>
            ))}
          </ul>
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
