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
