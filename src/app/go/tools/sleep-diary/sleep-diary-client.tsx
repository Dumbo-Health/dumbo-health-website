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
