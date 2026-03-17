"use client";

import { useEffect, useRef, useState } from "react";
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

const RECORD_DURATION_MS = 30_000;
const PEAK_COOLDOWN_MS = 2_000;
const LOW_FREQ_THRESHOLD = 120;
const LOW_FREQ_BINS = 24;

type ActivityLevel = "low" | "medium" | "high";

function getActivityLevel(count: number): ActivityLevel {
  if (count <= 2) return "low";
  if (count <= 8) return "medium";
  return "high";
}

const levelCopy: Record<
  ActivityLevel,
  { label: string; tone: string; description: string }
> = {
  low: {
    label: "Low",
    tone: "bg-green-100 text-green-800",
    description: "Few or no low-frequency events were detected in this sample.",
  },
  medium: {
    label: "Moderate",
    tone: "bg-yellow-100 text-yellow-800",
    description: "Some low-frequency events were detected, which may reflect snoring or heavy breathing.",
  },
  high: {
    label: "High",
    tone: "bg-orange-100 text-orange-800",
    description: "Multiple low-frequency events were detected in the sample.",
  },
};

export function SleepSoundCheckClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const [status, setStatus] = useState<"idle" | "recording" | "analyzing">("idle");
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const eventCountRef = useRef(0);
  const lastEventTimeRef = useRef(0);
  const startTimeRef = useRef(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRecordingRef = useRef(false);

  const stopRecording = () => {
    isRecordingRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (audioContextRef.current?.state !== "closed") {
      void audioContextRef.current?.close();
    }
    audioContextRef.current = null;
    analyserRef.current = null;
  };

  const analyzeResult = () => {
    setStatus("analyzing");
    setProgress(100);
    const count = eventCountRef.current;
    void (async () => {
      await ensureEmailCapture({
        metadata: {
          page: "sleep-sound-check",
          eventCount: count,
        },
      });
      window.setTimeout(() => {
        setEventCount(count);
        setStatus("idle");
        setProgress(0);
      }, 400);
    })();
  };

  const startRecording = async () => {
    setError(null);
    setEventCount(null);
    eventCountRef.current = 0;
    lastEventTimeRef.current = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new window.AudioContext();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.5;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const analyze = () => {
        if (!analyserRef.current || !isRecordingRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        const lowFreqAverage =
          dataArray.slice(0, LOW_FREQ_BINS).reduce((sum, value) => sum + value, 0) /
          LOW_FREQ_BINS;

        const now = Date.now();
        if (
          lowFreqAverage > LOW_FREQ_THRESHOLD &&
          now - lastEventTimeRef.current > PEAK_COOLDOWN_MS
        ) {
          eventCountRef.current += 1;
          lastEventTimeRef.current = now;
        }

        animationFrameRef.current = requestAnimationFrame(analyze);
      };

      isRecordingRef.current = true;
      setStatus("recording");
      startTimeRef.current = Date.now();

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const pct = Math.min(100, (elapsed / RECORD_DURATION_MS) * 100);
        setProgress(pct);
        if (elapsed >= RECORD_DURATION_MS) {
          stopRecording();
          analyzeResult();
        }
      }, 200);

      analyze();
    } catch {
      setError("Microphone access is unavailable. Try the demo instead.");
      setStatus("idle");
      stopRecording();
    }
  };

  const runDemo = () => {
    void (async () => {
      setError(null);
      await ensureEmailCapture({
        metadata: {
          page: "sleep-sound-check",
          mode: "demo",
        },
      });
      const count = Math.floor(Math.random() * 6) + 2;
      setEventCount(count);
    })();
  };

  useEffect(() => {
    return () => stopRecording();
  }, []);

  const level = eventCount === null ? null : getActivityLevel(eventCount);

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Sleep Sound Check
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Record a short sample and get a quick, privacy-first look at low-frequency
              sound patterns often associated with snoring or heavy breathing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6 sm:p-8">
              <h2 className="font-heading text-2xl text-midnight">Record or try demo mode</h2>
              <p className="mt-3 font-body leading-7 text-midnight/72">
                Place your device near where you sleep, or run the demo to preview the
                experience. Processing happens in the browser.
              </p>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {status === "recording" ? (
                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-midnight">Recording...</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-sunlight">
                    <div
                      className="h-full bg-peach transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {status === "idle" ? (
                  <>
                    <Button onClick={() => void startRecording()} className="rounded-lg font-mono tracking-wider">
                      Start Recording
                    </Button>
                    <Button onClick={runDemo} variant="outline" className="rounded-lg font-mono tracking-wider">
                      Try Demo
                    </Button>
                  </>
                ) : null}

                {status === "recording" ? (
                  <Button
                    onClick={() => {
                      stopRecording();
                      analyzeResult();
                    }}
                    className="rounded-lg bg-red-500 font-mono tracking-wider hover:bg-red-600"
                  >
                    Stop And Analyze
                  </Button>
                ) : null}

                {status === "analyzing" ? (
                  <p className="self-center text-sm text-midnight/60">Analyzing...</p>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-sunlight bg-white p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                Analysis
              </p>
              {eventCount === null || level === null ? (
                <p className="mt-4 font-body leading-7 text-midnight/72">
                  Run a sample to see the estimated activity level.
                </p>
              ) : (
                <>
                  <div className="mt-4 flex items-end gap-3">
                    <p className="font-heading text-5xl text-midnight">{eventCount}</p>
                    <span className="pb-2 text-sm text-midnight/55">events detected</span>
                  </div>
                  <div className="mt-4">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${levelCopy[level].tone}`}>
                      {levelCopy[level].label}
                    </span>
                  </div>
                  <p className="mt-5 font-body leading-7 text-midnight/72">
                    {levelCopy[level].description}
                  </p>
                </>
              )}

              <div className="mt-8">
                <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
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
              Understand what this audio check measures and how to use it responsibly.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="how-it-works">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                How it works
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                The browser checks low-frequency sound energy where snoring often
                appears. It is an educational wellness tool, not a medical device or a
                sleep study.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Privacy
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Audio analysis runs locally in the browser. This tool is meant for
                exploration and cannot diagnose sleep apnea or any other condition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default function SleepSoundCheckClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <SleepSoundCheckClient />
    </EmailCaptureProvider>
  );
}
