import Link from "next/link";
import { Chrome, Clock3, MoonStar, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/sleep-mate-by-dumbo-healt/nnaphgeljijmfffjgdjdlkdkngmnkhmk";

const features = [
  {
    title: "Digital sleep diary",
    description:
      "Track bedtime, wake time, awakenings, and sleep quality in one lightweight daily flow.",
    icon: MoonStar,
  },
  {
    title: "Bedtime reminders",
    description:
      "Set a target bedtime and use browser reminders to make consistency easier to keep.",
    icon: Clock3,
  },
  {
    title: "Pattern review",
    description:
      "Spot trends across habits, sleep timing, and daily factors that can improve or disrupt recovery.",
    icon: TrendingUp,
  },
  {
    title: "Privacy-first storage",
    description:
      "Sleep entries stay in your browser so you can track patterns without handing over personal history.",
    icon: ShieldCheck,
  },
] as const;

const audiences = [
  "People building more consistent sleep habits",
  "Anyone keeping a sleep log for personal insight",
  "Patients who want a simple diary alongside clinician guidance",
  "Browser-first users who want reminders without another app",
];

export const metadata = createMetadata({
  title: "Sleep Mate Browser Extension",
  description:
    "Learn about Sleep Mate, Dumbo Health's browser-based sleep diary and reminder tool for building better sleep habits.",
  path: "/go/tools/sleep-mate",
});

export default function SleepMatePage() {
  return (
    <main>
      <section className="border-b border-midnight/8 bg-midnight text-daylight">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-light-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">
              Sleep Mate keeps your sleep diary and reminders close at hand.
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-daylight/78">
              Sleep Mate is a free browser extension designed to make daily sleep
              tracking easy. Use it to log sleep patterns, build consistency, and keep
              better sleep habits visible throughout the week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-lg font-mono tracking-wider">
                <a href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Chrome className="h-4 w-4" />
                  Download For Chrome
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-daylight/20 bg-transparent font-mono tracking-wider text-daylight hover:bg-daylight hover:text-midnight"
              >
                <Link href="/go/tools">Back To Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-sunlight bg-daylight p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach/12 text-peach">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-heading text-2xl text-midnight">{title}</h2>
                <p className="mt-3 font-body leading-7 text-midnight/72">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-daylight">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-18">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Why people use it
            </p>
            <h2 className="mt-4 font-heading text-3xl text-midnight sm:text-4xl">
              A simple browser workflow for better nights and clearer mornings.
            </h2>
            <p className="mt-4 max-w-2xl font-body leading-8 text-midnight/72">
              Sleep Mate is designed for people who want a lower-friction way to keep a
              diary, stay aware of sleep routines, and notice what helps or hurts rest
              over time.
            </p>
          </div>
          <div className="rounded-3xl border border-sunlight bg-white p-6">
            <h3 className="font-heading text-2xl text-midnight">Great fit for</h3>
            <ul className="mt-5 space-y-3">
              {audiences.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-midnight/72">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-peach" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
