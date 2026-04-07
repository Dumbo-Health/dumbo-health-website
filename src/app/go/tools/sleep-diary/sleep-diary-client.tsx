"use client";

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

function buildDiaryHtml() {
  const rows = Array.from({ length: 7 }, (_, index) => {
    return `
      <tr>
        <td>Day ${index + 1}</td>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>
    `;
  }).join("");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Dumbo Health Sleep Diary</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 32px; color: #031F3D; }
      h1, h2 { margin-bottom: 8px; }
      p { line-height: 1.5; }
      table { width: 100%; border-collapse: collapse; margin-top: 16px; }
      th, td { border: 1px solid #cfd8e3; padding: 10px; text-align: left; font-size: 12px; }
      th { background: #FCF6ED; }
    </style>
  </head>
  <body>
    <h1>Dumbo Health Weekly Sleep Diary</h1>
    <p>Track your sleep for seven days. Print this sheet or save it as a PDF from your browser.</p>
    <h2>Morning entries</h2>
    <p>Record bedtime, wake time, time to fall asleep, awakenings, and how rested you feel.</p>
    <h2>Weekly tracker</h2>
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Bedtime</th>
          <th>Wake time</th>
          <th>Sleep latency</th>
          <th>Awakenings</th>
          <th>Time awake</th>
          <th>Caffeine / alcohol</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>`;
}

export function SleepDiaryClient() {
  const { ensureEmailCapture } = useEmailCapture();
  const handleDownload = () => {
    void (async () => {
      await ensureEmailCapture({
        heading: "Get Your Free Weekly Sleep Diary",
        description:
          "Share your email to download the sleep diary and keep track of your sleep patterns.",
        successHeadline: "Download unlocked",
        successMessage: "Your sleep diary is ready.",
        metadata: {
          page: "sleep-diary",
          action: "download",
        },
      });

      const html = buildDiaryHtml();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "dumbo-health-sleep-diary.html";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    })();
  };

  const handlePrint = () => {
    const html = buildDiaryHtml();
    const newWindow = window.open("", "_blank", "width=1000,height=800");
    if (!newWindow) return;
    newWindow.document.write(html);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Weekly Sleep Diary
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Use this printable weekly tracker to log bedtime, wake time, awakenings,
              daily habits, and anything that may be affecting your sleep quality.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleDownload} size="lg" className="rounded-lg font-mono tracking-wider">
                Download Diary
              </Button>
              <Button onClick={handlePrint} size="lg" variant="outline" className="rounded-lg font-mono tracking-wider">
                Print Diary
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-sunlight bg-daylight p-6">
              <h2 className="font-heading text-2xl text-midnight">What to track in the morning</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Bedtime and wake time",
                  "Time to fall asleep",
                  "How many times you woke up",
                  "Total time awake during the night",
                  "How rested or alert you felt in the morning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-midnight/72">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-peach" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-sunlight bg-white p-6">
              <h2 className="font-heading text-2xl text-midnight">What to track in the evening</h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Caffeine and alcohol timing",
                  "Naps and exercise",
                  "Stressful events or schedule changes",
                  "Medication or supplements before bed",
                  "Notes about what may help or hurt sleep",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-midnight/72">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-6">
            <h2 className="font-heading text-3xl text-midnight">Frequently Asked Questions</h2>
            <p className="mt-2 font-body text-midnight/68">
              Learn how to use the diary and get more value from tracking your sleep.
            </p>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-sunlight bg-white px-6">
            <AccordionItem value="why">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                Why use a sleep diary
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                A diary helps connect daily habits to sleep quality and gives you
                something concrete to share with a clinician instead of relying on memory.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="next-steps">
              <AccordionTrigger className="font-heading text-left text-lg text-midnight hover:no-underline">
                What to do next
              </AccordionTrigger>
              <AccordionContent className="font-body leading-7 text-midnight/72">
                Track at least one to two weeks if possible. If snoring, gasping, or
                daytime exhaustion keep showing up, it may be worth getting a formal
                sleep evaluation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8">
            <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
              <Link href="/go/tools">Back To Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Educational Content ─────────────────────────────────────────── */}

      {/* Section 1: Why Sleep Tracking Works */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">Why Sleep Tracking Works</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            Sleep diaries are the gold-standard behavioral tool in Cognitive Behavioral Therapy for Insomnia (CBT-I). Most people significantly misjudge their own sleep — overestimating how long they sleep by 30–60 minutes on average.
          </p>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            A 2-week diary reveals patterns invisible to memory: which nights are worst, what precedes a bad night, whether your sleep window needs adjusting. Sleep physicians and CBT-I therapists use diary data to calculate sleep efficiency, set new sleep windows for sleep restriction therapy, and track treatment progress.
          </p>
        </div>
      </section>

      {/* Section 2: What a Sleep Diary Tracks */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-8">What a Sleep Diary Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: "Bedtime", desc: "When you got into bed with the intention to sleep." },
              { label: "Sleep Onset", desc: "Estimated time until you fell asleep (sleep latency)." },
              { label: "Wake-After-Sleep-Onset (WASO)", desc: "Minutes spent awake during the night." },
              { label: "Wake Time", desc: "When you woke up for good in the morning." },
              { label: "Total Sleep Time (TST)", desc: "Actual time asleep — subtract latency and WASO from time in bed." },
              { label: "Sleep Efficiency", desc: "TST ÷ Time in Bed × 100. Target: ≥85%." },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-sunlight">
                <p className="font-heading text-base text-midnight mb-1">{item.label}</p>
                <p className="font-body text-sm text-midnight leading-6" style={{ color: "rgba(3,31,61,0.7)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Sleep Diary vs Consumer Sleep Trackers */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-6">Sleep Diary vs. Consumer Sleep Trackers</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm text-midnight border-collapse">
              <thead>
                <tr className="border-b border-sunlight">
                  <th className="text-left py-3 pr-4 font-heading text-base">Feature</th>
                  <th className="text-left py-3 pr-4 font-heading text-base">Sleep Diary</th>
                  <th className="text-left py-3 font-heading text-base">Wearable (Fitbit / Oura / Apple Watch)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Accuracy", "Self-reported", "Actigraphy estimate (±15–20 min error)"],
                  ["Gold standard for CBT-I", "Yes", "No"],
                  ["Identifies behavioral patterns", "Excellent", "Limited"],
                  ["Used in clinical trials", "Yes (required)", "Rarely"],
                  ["Cost", "Free", "$100–$500+"],
                  ["Measures sleep stages", "No (perception only)", "Estimated (not validated)"],
                ].map(([feature, diary, wearable]) => (
                  <tr key={feature} className="border-b border-sunlight">
                    <td className="py-3 pr-4 font-body" style={{ color: "rgba(3,31,61,0.85)" }}>{feature}</td>
                    <td className="py-3 pr-4" style={{ color: "rgba(3,31,61,0.7)" }}>{diary}</td>
                    <td className="py-3" style={{ color: "rgba(3,31,61,0.7)" }}>{wearable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: CBT-I Sleep Restriction Basics */}
      <section className="bg-daylight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-midnight mb-4">CBT-I Sleep Restriction Basics</h2>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            Sleep restriction is the most effective component of CBT-I — it builds homeostatic sleep pressure to consolidate fragmented sleep.
          </p>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            <strong>The method:</strong> Calculate your average TST from the diary → Set your sleep window equal to TST (minimum 5.5 hrs) → Maintain a strict rise time → Expand window by 15 min per week when efficiency reaches ≥85%.
          </p>
          <p className="font-body text-lg text-midnight leading-8 mb-4">
            This feels counterintuitive (going to bed later when you&apos;re already tired) but works: 70–80% of patients see significant improvement within 4–6 weeks.
          </p>
          <p className="font-body text-base leading-7 bg-white rounded-xl px-5 py-4 border border-sunlight" style={{ color: "rgba(3,31,61,0.7)" }}>
            <strong>Important:</strong> Only attempt sleep restriction with guidance from a CBT-I therapist if you have OSA, bipolar disorder, or a seizure disorder.
          </p>
        </div>
      </section>

      {/* Section 5: Key Takeaways */}
      <section className="bg-midnight py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-heading text-3xl text-white mb-6">Key Takeaways</h2>
          <ul className="space-y-3">
            {[
              "2 weeks of diary data is enough to identify actionable sleep patterns.",
              "Sleep efficiency is the most useful single metric from a diary.",
              "Most people sleep less than they think — and need to know their real baseline.",
              "CBT-I, guided by diary data, outperforms sleep medication for long-term insomnia treatment.",
              "A diary is also the most useful thing to bring to a sleep specialist appointment.",
            ].map((point) => (
              <li key={point} className="font-body text-lg leading-8 flex gap-3" style={{ color: "rgba(255,255,255,0.75)" }}>
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
              `Morin CM, et al. "Nonpharmacological Interventions for Insomnia." American Journal of Psychiatry. 1994.`,
              `Harvey AG, et al. "Sleep disturbance as transdiagnostic: consideration of neurobiological mechanisms." Clinical Psychology Review. 2011.`,
              `Espie CA. "Insomnia: Conceptual issues in the development, persistence, and treatment of sleep disorder in adults." Annual Review of Psychology. 2002.`,
            ].map((ref) => (
              <li key={ref} className="font-body text-sm leading-6" style={{ color: "rgba(3,31,61,0.65)" }}>{ref}</li>
            ))}
          </ol>
        </div>
      </section>

    </main>
  );
}

export default function SleepDiaryClientWithCapture() {
  return (
    <EmailCaptureProvider>
      <SleepDiaryClient />
    </EmailCaptureProvider>
  );
}
