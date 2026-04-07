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

      {/* ── Educational Content ─────────────────────────────────────────── */}

      {/* Section 1: How Noise Affects Sleep */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">How Noise Affects Sleep</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            The brain continues to process sound even during sleep, as the auditory cortex remains active and can trigger arousals (partial or full awakenings). Noise above 35 dB can increase cortisol levels and prevent deep sleep stages.
          </p>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            The WHO recommends nighttime noise levels below 40 dB outdoors (equivalent to a quiet library); peak levels above 55 dB frequently disrupt sleep. Traffic noise at 50–55 dB causes measurable cardiovascular stress responses during sleep, even without waking.
          </p>
          <div className="bg-daylight rounded-2xl px-5 py-4 border border-sunlight">
            <p className="font-body text-base leading-7 text-midnight">
              <strong>Key finding:</strong> Research in the journal <em>Sleep</em> found that every 10 dB increase in environmental noise raised the risk of sleep fragmentation by 14%.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Snoring vs Sleep Apnea */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">Snoring vs. Sleep Apnea: What&apos;s the Difference?</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            Snoring is the sound of vibrating tissues in the upper airway narrowing during sleep; it affects ~45% of adults occasionally and 25% regularly. Not all snorers have OSA, but ~70% of OSA patients snore loudly, and witnessed gasping or choking is a key differentiator.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full font-body text-sm text-midnight border-collapse">
              <thead>
                <tr className="border-b border-sunlight">
                  <th className="text-left py-3 pr-4 font-heading text-base">Feature</th>
                  <th className="text-left py-3 pr-4 font-heading text-base">Snoring</th>
                  <th className="text-left py-3 font-heading text-base">Sleep Apnea</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Airway obstruction", "Partial", "Complete (10+ sec)"],
                  ["Oxygen desaturation", "No", "Yes (SpO₂ <90%)"],
                  ["Daytime fatigue", "Sometimes", "Usually (significant)"],
                  ["Health risk", "Low", "High (cardiovascular, metabolic)"],
                  ["Diagnosis", "None needed", "Sleep study required"],
                ].map(([feature, snoring, apnea]) => (
                  <tr key={feature} className="border-b border-sunlight bg-white/60">
                    <td className="py-3 pr-4 font-body" style={{ color: "rgba(3,31,61,0.85)" }}>{feature}</td>
                    <td className="py-3 pr-4" style={{ color: "rgba(3,31,61,0.7)" }}>{snoring}</td>
                    <td className="py-3" style={{ color: "rgba(3,31,61,0.7)" }}>{apnea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Sound Solutions for Better Sleep */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-8">Sound Solutions for Better Sleep</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "White Noise", desc: "All frequencies at equal intensity. Effective at masking variable environmental sounds (traffic, voices). Best for: urban environments, inconsistent noise sources." },
              { label: "Pink Noise", desc: "Higher power at lower frequencies, like rain or wind. More natural-sounding than white noise. Research: Pink noise during sleep may enhance slow-wave (deep) sleep and memory consolidation." },
              { label: "Brown Noise", desc: "Even heavier low-frequency emphasis, like a waterfall or thunder. Preferred by people who find white noise too harsh. Promotes focused relaxation." },
              { label: "Silence", desc: "Ideal for those in quiet environments. However, complete silence can make tinnitus or intrusive thoughts more noticeable." },
            ].map((item) => (
              <div key={item.label} className="bg-daylight rounded-2xl p-5 border border-sunlight">
                <p className="font-heading text-base text-midnight mb-2">{item.label}</p>
                <p className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Optimizing Your Sleep Sound Environment */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">Optimizing Your Sleep Sound Environment</h2>
          <ul className="space-y-3">
            {[
              "Target: Maintain consistent background ambient noise at 40–50 dB to mask intermittent louder sounds.",
              "Sound masking options: Dedicated white noise machine, fan, air purifier, smartphone app.",
              "Ear plugs: Can reduce noise by 25–33 dB; effective but may prevent hearing alarms, so not suitable for everyone.",
              "Acoustic adjustments: Heavy curtains, rugs, and upholstered furniture all absorb sound and reduce echo.",
              "Partners: If snoring is disrupting your partner, this may indicate a sleep disorder worth evaluating, not just a noise problem.",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 text-midnight flex gap-3 list-none">
                <span className="text-peach mt-1 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section className="bg-midnight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-white mb-6">Key Takeaways</h2>
          <ul className="space-y-3">
            {[
              "Environmental noise above 35 dB can disrupt sleep architecture even without full awakening.",
              "Snoring is not always harmless. If you gasp, choke, or wake up unrested, it warrants a sleep study.",
              "Pink noise has the best evidence for promoting deeper, more restorative sleep.",
              "White noise machines are an effective, low-cost way to mask variable nighttime sounds.",
              "A sleep environment sound check is a useful first step, not a substitute for clinical evaluation.",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 flex gap-3 list-none" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span className="text-peach mt-1 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 6: References */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl text-midnight mb-4">References</h2>
          <ol className="list-decimal list-inside space-y-2">
            {[
              `WHO. "Night Noise Guidelines for Europe." 2009.`,
              `Basner M, et al. "Auditory and non-auditory effects of noise on health." The Lancet. 2014.`,
              `Zhou J, et al. "Pink noise: Effect on complexity synchronization of brain activity and sleep consolidation." Journal of Theoretical Biology. 2012.`,
            ].map((ref) => (
              <li key={ref} className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.65)" }}>{ref}</li>
            ))}
          </ol>
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
