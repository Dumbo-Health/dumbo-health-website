"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MoonStar, Sunrise } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EmailCaptureProvider,
  useEmailCapture,
} from "@/components/EmailCaptureProvider";

const FALL_ASLEEP_MINS = 15;
const CYCLE_MINS = 90;
const AGE_RANGES = [
  "0-3 Months",
  "4-11 Months",
  "1-2 Years",
  "3-5 Years",
  "6-13 Years",
  "14-17 Years",
  "18-25 Years",
  "26-35 Years",
  "36-45 Years",
  "46-55 Years",
  "56-64 Years",
  "65+ Years",
] as const;

type ScheduleType = "wake" | "bed";
type Period = "AM" | "PM";

function timeToMinutes(hour: number, minute: number, period: Period): number {
  const hour24 =
    period === "AM" ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;
  return hour24 * 60 + minute;
}

function minutesToTime(totalMins: number): { hour: number; minute: number; period: Period } {
  const wrapped = ((totalMins % 1440) + 1440) % 1440;
  const hour24 = Math.floor(wrapped / 60);
  const minute = wrapped % 60;
  return {
    hour: hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24,
    minute,
    period: hour24 < 12 ? "AM" : "PM",
  };
}

function formatTime(time: { hour: number; minute: number; period: Period }) {
  return `${time.hour}:${time.minute.toString().padStart(2, "0")} ${time.period}`;
}

export function SleepScheduleCalculatorClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [selectedAge, setSelectedAge] = useState<(typeof AGE_RANGES)[number]>("26-35 Years");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("bed");
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState<Period>("PM");
  const [hasUnlockedResults, setHasUnlockedResults] = useState(false);

  const results = useMemo(() => {
    const baseTime = timeToMinutes(Number(hour), Number(minute), period);

    if (scheduleType === "bed") {
      return [6, 5].map((cycles) => {
        const wakeTime = minutesToTime(baseTime + FALL_ASLEEP_MINS + cycles * CYCLE_MINS);
        return {
          cycles,
          label: `${FALL_ASLEEP_MINS + cycles * CYCLE_MINS} minutes in bed`,
          bedTime: { hour: Number(hour), minute: Number(minute), period },
          wakeTime,
        };
      });
    }

    return [6, 5].map((cycles) => {
      const bedTime = minutesToTime(baseTime - FALL_ASLEEP_MINS - cycles * CYCLE_MINS);
      return {
        cycles,
        label: `${FALL_ASLEEP_MINS + cycles * CYCLE_MINS} minutes in bed`,
        bedTime,
        wakeTime: { hour: Number(hour), minute: Number(minute), period },
      };
    });
  }, [hour, minute, period, scheduleType]);

  const hourOptions = Array.from({ length: 12 }, (_, index) => `${index + 1}`);
  const minuteOptions = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0")
  );

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Sleep Schedule Calculator
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Estimate bedtimes or wake times using 90-minute sleep cycles and a
              15-minute buffer for falling asleep.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
              <div>
                <h2 className="font-heading text-2xl text-midnight">Set your schedule goal</h2>
                <p className="mt-3 font-body leading-7 text-midnight/72">
                  Pick whether you want a recommended bedtime or wake time, choose an age
                  range for context, and compare two common sleep-cycle options.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setScheduleType("bed")}
                    className={`flex-1 rounded-2xl border px-4 py-4 text-left transition-colors ${
                      scheduleType === "bed"
                        ? "border-peach bg-white"
                        : "border-sunlight bg-white/70"
                    }`}
                  >
                    <MoonStar className="h-5 w-5 text-peach" />
                    <p className="mt-3 font-heading text-lg text-midnight">Go to bed at...</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType("wake")}
                    className={`flex-1 rounded-2xl border px-4 py-4 text-left transition-colors ${
                      scheduleType === "wake"
                        ? "border-peach bg-white"
                        : "border-sunlight bg-white/70"
                    }`}
                  >
                    <Sunrise className="h-5 w-5 text-peach" />
                    <p className="mt-3 font-heading text-lg text-midnight">Wake up at...</p>
                  </button>
                </div>

                <div className="mt-6">
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                    Age range
                  </label>
                  <Select value={selectedAge} onValueChange={(value) => setSelectedAge(value as (typeof AGE_RANGES)[number])}>
                    <SelectTrigger className="mt-2 w-full bg-white">
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_RANGES.map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                      Hour
                    </label>
                    <Select value={hour} onValueChange={setHour}>
                      <SelectTrigger className="mt-2 w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {hourOptions.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                      Minute
                    </label>
                    <Select value={minute} onValueChange={setMinute}>
                      <SelectTrigger className="mt-2 w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {minuteOptions.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                      Period
                    </label>
                    <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
                      <SelectTrigger className="mt-2 w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sunlight bg-white p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                  Recommendations
                </p>
                <p className="mt-3 font-body leading-7 text-midnight/72">
                  For the selected age range of {selectedAge}, these options assume it
                  takes about {FALL_ASLEEP_MINS} minutes to fall asleep.
                </p>
                <div className="mt-6 space-y-4">
                  {hasUnlockedResults ? results.map((result) => (
                    <div key={result.cycles} className="rounded-2xl border border-sunlight bg-daylight p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-midnight/55">
                        {result.cycles} sleep cycles
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-midnight/55">
                            {scheduleType === "bed" ? "Bedtime" : "Recommended bedtime"}
                          </p>
                          <p className="mt-1 font-heading text-2xl text-midnight">
                            {formatTime(result.bedTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-midnight/55">
                            {scheduleType === "bed" ? "Recommended wake time" : "Wake time"}
                          </p>
                          <p className="mt-1 font-heading text-2xl text-peach">
                            {formatTime(result.wakeTime)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 font-body text-sm text-midnight/68">{result.label}</p>
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-sunlight bg-daylight p-5 font-body text-midnight/72">
                      Unlock your recommendations to see personalized bedtime and wake
                      time options.
                    </div>
                  )}
                </div>
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() =>
                      void (async () => {
                        await ensureEmailCapture({
                          heading: "Get Your Sleep Schedule",
                          description:
                            "Enter your email to see your personalized sleep schedule recommendations.",
                          successHeadline: "Your schedule is ready",
                          successMessage: "Your recommended sleep times are ready below.",
                          metadata: {
                            page: "sleep-schedule-calculator",
                            ageRange: selectedAge,
                            scheduleType,
                          },
                        });
                        setHasUnlockedResults(true);
                      })()
                    }
                    className="w-full rounded-lg font-mono tracking-wider"
                  >
                    Get My Schedule
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
                    <Link href="/go/tools">Back To Tools</Link>
                  </Button>
                </div>
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
              Learn how the calculator works and how sleep cycles can guide timing.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="how-it-works">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                How the calculator works
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                This calculator uses 90-minute sleep cycles and adds a 15-minute buffer
                for falling asleep. It then shows two common options: about 7 hours 45
                minutes in bed or about 9 hours 15 minutes in bed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why-it-matters">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Why sleep scheduling matters
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A regular sleep schedule helps support circadian rhythm, more consistent
                energy, and better recovery. If you snore, gasp during sleep, or still
                feel exhausted after enough time in bed, a sleep disorder may be part of
                the picture.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Section 1: Sleep Architecture */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Sleep Architecture: What Happens in a 90-Minute Cycle</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            Human sleep is not a uniform state. It is organized into repeating 90-minute cycles, each containing four distinct stages with different functions and brain wave patterns.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                stage: "N1 — Light Sleep",
                pct: "~5% of total sleep",
                body: "The transition between wakefulness and sleep. Muscle activity slows, hypnic jerks may occur. Easily disrupted — this is where fragmented sleep wastes the most time.",
              },
              {
                stage: "N2 — Core Sleep",
                pct: "~45–55% of total sleep",
                body: "The largest share of the night. Heart rate and body temperature drop. Sleep spindles appear — bursts of neural activity associated with memory consolidation.",
              },
              {
                stage: "N3 — Deep Sleep (Slow-Wave)",
                pct: "~15–20% of total sleep",
                body: "Physically restorative. Growth hormone is released, tissues repair, immune function strengthens. Dominates early cycles (1–2). Hardest to wake from.",
              },
              {
                stage: "REM — Dream Sleep",
                pct: "~20–25% of total sleep",
                body: "Critical for memory consolidation, emotional processing, and creativity. Dominates later cycles (4–5). Cutting sleep short by even 1 hour disproportionately reduces REM.",
              },
            ].map(({ stage, pct, body }) => (
              <div key={stage} className="rounded-2xl border border-sunlight bg-daylight p-5">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">{pct}</p>
                <p className="mt-2 font-heading text-base text-midnight">{stage}</p>
                <p className="mt-2 font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-sunlight bg-daylight p-6">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-peach">Key Fact</p>
            <p className="mt-3 font-body leading-7 text-midnight">
              "Adults who consistently get fewer than 7 hours of sleep show the same cognitive impairment as those who have been awake for 24 hours straight — yet most report feeling only slightly tired."
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Sleep Duration by Age */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Sleep Duration Recommendations by Age</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            The National Sleep Foundation and American Academy of Sleep Medicine recommend the following ranges. Individual variation exists within each band.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-sunlight bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-sunlight">
                  <th className="px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-midnight">Age Group</th>
                  <th className="px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-midnight">Recommended</th>
                  <th className="px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-midnight">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Newborns (0–3 mo)", "14–17 hrs", "Includes naps; irregular schedule normal"],
                  ["Infants (4–11 mo)", "12–15 hrs", "Sleep cycles consolidating"],
                  ["Toddlers (1–2 yr)", "11–14 hrs", "Afternoon nap still beneficial"],
                  ["Preschool (3–5 yr)", "10–13 hrs", "Naps tapering off"],
                  ["School-age (6–12 yr)", "9–12 hrs", "Circadian anchor becoming established"],
                  ["Teens (13–18 yr)", "8–10 hrs", "Circadian phase delay; naturally stay up later"],
                  ["Adults (18–64 yr)", "7–9 hrs", "Individual variation exists"],
                  ["Older adults (65+)", "7–8 hrs", "Sleep efficiency decreases; earlier waking common"],
                ].map(([group, hours, notes], i) => (
                  <tr key={group} className={i < 7 ? "border-b border-sunlight" : ""}>
                    <td className="px-5 py-4 font-body text-sm font-medium text-midnight">{group}</td>
                    <td className="px-5 py-4 font-mono text-sm text-peach">{hours}</td>
                    <td className="px-5 py-4 font-body text-sm" style={{ color: "rgba(3,31,61,0.68)" }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Chronotypes */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">Chronotypes: Why Some People Are Night Owls</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            Chronotype is your innate biological preference for sleep timing, governed by the suprachiasmatic nucleus (SCN) in the hypothalamus. It is not a lifestyle choice or a character trait.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                type: "Early (Morning Lark)",
                pct: "~25% of adults",
                desc: "Natural sleep timing 1–2 hours earlier than average. DLMO occurs earlier in the evening. Tend to be alert in the morning, fade early at night.",
              },
              {
                type: "Intermediate",
                pct: "~50% of adults",
                desc: "Sleep timing aligns closely with social schedules. Least affected by social jetlag. Most sleep recommendations are calibrated for this group.",
              },
              {
                type: "Late (Night Owl)",
                pct: "~25% of adults",
                desc: "Genetically delayed DLMO — melatonin onset occurs 1–3 hours later than average. Not laziness. Forcing early wake times causes chronic social jetlag.",
              },
            ].map(({ type, pct, desc }) => (
              <div key={type} className="rounded-2xl border border-sunlight bg-daylight p-5">
                <p className="font-mono text-xs text-peach">{pct}</p>
                <p className="mt-2 font-heading text-base text-midnight">{type}</p>
                <p className="mt-2 font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-sunlight bg-daylight p-6">
            <p className="font-heading text-base text-midnight">What is social jetlag?</p>
            <p className="mt-3 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
              Social jetlag is the weekly discrepancy between your biological clock and your social schedule. The average person has 2 hours of social jetlag — equivalent to traveling two time zones every weekend. Chronic social jetlag is associated with higher rates of obesity, metabolic disorder, and depression.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: How to Shift Your Sleep Schedule */}
      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-midnight">How to Shift Your Sleep Schedule Safely</h2>
          <p className="mt-4 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            Whether you need to move your schedule earlier or later, the circadian system responds to gradual shifts — not abrupt changes.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">Moving Earlier</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Advance bedtime and wake time by 15–30 minutes every 2–3 days",
                  "Get bright light immediately upon waking — outdoors or with a 10,000 lux lamp",
                  "Take 0.5–1mg melatonin 5 hours before your target bedtime (low dose, not sedating dose)",
                  "Avoid evening light exposure — blue-blocking glasses after sunset help",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                    <span className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sunlight bg-white p-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">Moving Later</p>
              <ul className="mt-4 space-y-3">
                {[
                  "Delay bedtime and wake time gradually — same 15–30 min cadence",
                  "Use blackout curtains in the morning to block early-morning light",
                  "Avoid bright light in the morning until closer to your target wake time",
                  "Allow 1–2 weeks per hour of shift — rushing creates social jetlag",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                    <span className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 font-body leading-7" style={{ color: "rgba(3,31,61,0.72)" }}>
            <span className="font-medium text-midnight">Avoid weekend catch-up sleep.</span> Sleeping in on weekends perpetuates the social jetlag cycle and makes Monday mornings progressively harder. A consistent wake time — even after a poor night — is the fastest way to stabilize your schedule.
          </p>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section style={{ backgroundColor: "#031F3D" }}>
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <h2 className="font-heading text-3xl text-white">Key Takeaways</h2>
          <ul className="mt-6 space-y-4">
            {[
              "Sleep cycles last approximately 90 minutes. Waking at the natural end of a cycle — rather than in the middle — dramatically reduces grogginess (sleep inertia).",
              "Adults need 7–9 hours. Consistently sleeping fewer than 7 hours produces cognitive impairment equivalent to total sleep deprivation, even when you feel only mildly tired.",
              "Early cycles are rich in deep sleep (N3); later cycles are rich in REM. Both are essential — cutting the night short at either end has measurable consequences.",
              "Chronotype is biological, not a character flaw. Night owls are not undisciplined — they have a genetically delayed circadian clock.",
              "A consistent wake time (not bedtime) is the most powerful single lever for circadian health. Anchor the morning; the evening follows.",
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
              "Hirshkowitz M, et al. \"National Sleep Foundation's sleep time duration recommendations: methodology and results summary.\" Sleep Health. 2015;1(1):40–43.",
              "Walker MP. Why We Sleep: Unlocking the Power of Sleep and Dreams. Scribner, 2017.",
              "Wittmann M, et al. \"Social Jetlag: Misalignment of Biological and Social Time.\" Chronobiology International. 2006;23(1–2):497–509.",
              "Roenneberg T, et al. \"A marker for the end of adolescence.\" Current Biology. 2004;14(24):R1038–R1039.",
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

export default function SleepScheduleCalculatorClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <SleepScheduleCalculatorClient />
    </EmailCaptureProvider>
  );
}
