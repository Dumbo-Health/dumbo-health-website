import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const sleepHubUrl = "https://sleep-hub.dumbo.health/";

const benefits = [
  {
    title: "Wake up with more energy",
    description:
      "Use your Sleep Diary and 30-Day Improvement Program to build routines that support deeper, more consistent rest.",
    badgeClassName: "bg-light-peach text-midnight",
  },
  {
    title: "Reduce sleep guesswork",
    description:
      "Connect every habit change to real evidence with Sleep Research, so you know what works and why.",
    badgeClassName: "bg-peach text-white",
  },
  {
    title: "Build lasting habits",
    description:
      "Track daily consistency in one place and turn short-term actions into long-term sleep improvements.",
    badgeClassName: "bg-teal text-midnight",
  },
] as const;

const processSteps = [
  {
    title: "Create account or log in",
    description: "Open Sleep Hub and start your first guided day in minutes.",
    badgeClassName: "bg-light-peach text-midnight",
  },
  {
    title: "Follow your 30-day plan",
    description: "Complete short, science-backed actions that fit into your day.",
    badgeClassName: "bg-peach text-white",
  },
  {
    title: "Track and improve",
    description: "Use your diary and calendar to monitor patterns and keep momentum.",
    badgeClassName: "bg-teal text-midnight",
  },
] as const;

const coreFeatures = [
  {
    title: "30-Day Improvement Program",
    description:
      "Follow a structured day-by-day path with science-backed actions, weekly milestones, and progress tracking to build sustainable sleep habits.",
    points: ["30 guided daily actions", "Weekly milestones", "Streak and consistency tracking"],
    badgeClassName: "bg-light-peach text-midnight",
  },
  {
    title: "Sleep Research",
    description:
      "Explore 31,775+ peer-reviewed articles in one searchable library so each decision is grounded in evidence, not guesswork.",
    points: ["31,775+ research papers", "Filter by relevant topics", "Save useful studies for later"],
    badgeClassName: "bg-peach text-white",
  },
  {
    title: "Sleep Diary",
    description:
      "Log sleep patterns, CPAP usage, and lifestyle factors in one daily view to identify trends and improve outcomes over time.",
    points: ["Daily sleep logging", "CPAP and habit tracking", "Calendar-based progress view"],
    badgeClassName: "bg-teal text-midnight",
  },
] as const;

export const metadata: Metadata = {
  title: "Sleep Hub | Dumbo Health",
  description:
    "Sleep Hub by Dumbo Health helps you improve sleep with a 30-day guided plan, research library, and daily tracking tools.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Sleep Hub | Dumbo Health",
    description:
      "Start your science-backed 30-day sleep journey with structured lessons, research, and progress tracking.",
    type: "website",
  },
};

export default function SleepHubPage() {
  return (
    <main className="bg-daylight text-midnight">
      <section className="border-b border-gray-100 py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-lg bg-light-peach px-3 py-1.5 text-midnight">
              <Image src="/go/sleep-hub.png" alt="Sleep Hub icon" width={22} height={22} className="rounded-md" />
              <span className="leading-tight">
                <span className="block text-sm font-semibold font-body">Sleep Hub</span>
                <span className="block font-mono text-[10px] uppercase opacity-80">
                  by Dumbo Health
                </span>
              </span>
            </div>
            <h1 className="mb-5 font-heading text-3xl leading-tight sm:text-5xl">
              Better sleep, one guided day at a time.
            </h1>
            <div className="mb-5 inline-flex items-center rounded-lg bg-peach px-3 py-1.5 font-mono text-xs uppercase text-white">
              Free access to Sleep Hub
            </div>
            <p className="mb-7 max-w-2xl font-body text-base leading-8 text-midnight/80 lg:text-lg">
              Sleep Hub is Dumbo Health&apos;s structured sleep improvement program. Get a
              clear 30-day path, daily accountability, and three core tools: Sleep
              Research, Sleep Diary, and the 30-Day Improvement Program.
            </p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={sleepHubUrl}
                className="inline-flex items-center justify-center rounded bg-peach px-6 py-2.5 font-mono text-base tracking-wider text-white transition-colors duration-200 hover:bg-peach/90"
              >
                Create an Account
              </Link>
              <Link
                href={sleepHubUrl}
                className="inline-flex items-center justify-center rounded border border-peach px-6 py-2.5 font-mono text-base tracking-wider text-midnight transition-colors duration-200 hover:border-midnight"
              >
                Log In
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-white px-4 py-3">
                <p className="text-sm font-semibold font-body">31,775+ Research Papers</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white px-4 py-3">
                <p className="text-sm font-semibold font-body">Evidence-Based Sleep Science</p>
              </div>
            </div>
          </div>
          <div className="self-start rounded-3xl border border-gray-100 bg-white p-3 shadow-lg">
            <Image
              src="/go/couple-sleeping.png"
              alt="People waking up feeling rested"
              width={1200}
              height={900}
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-midnight py-14 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-heading text-3xl font-semibold">31,775+</p>
              <p className="mt-1 text-sm text-white/80 font-body">Research Articles</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-heading text-3xl font-semibold">30</p>
              <p className="mt-1 text-sm text-white/80 font-body">Guided Daily Lessons</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="font-heading text-3xl font-semibold">100%</p>
              <p className="mt-1 text-sm text-white/80 font-body">Science-Backed Approach</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-daylight px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg lg:p-10">
            <h2 className="mb-3 font-heading text-2xl leading-tight text-midnight lg:text-4xl">
              Inside Sleep Hub: 3 core tools
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-midnight/75 lg:text-lg">
              Everything is built around the tools users rely on most to improve sleep consistently.
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {coreFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-daylight p-5"
                >
                  <span
                    className={`mb-3 inline-block rounded-lg px-3 py-1.5 font-mono text-xs uppercase ${feature.badgeClassName}`}
                  >
                    Core Feature
                  </span>
                  <h3 className="mb-3 font-heading text-xl leading-tight text-midnight">{feature.title}</h3>
                  <p className="mb-4 font-body leading-relaxed text-midnight/80">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.points.map((point) => (
                      <div key={point} className="flex items-start gap-2">
                        <span className="mt-1 block h-2 w-2 rounded-full bg-peach" />
                        <p className="text-sm font-body text-midnight/80">{point}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-daylight px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-2xl leading-tight text-midnight lg:text-4xl">
              Built around outcomes users actually want
            </h2>
            <p className="mx-auto max-w-3xl font-body text-base leading-relaxed text-midnight/75 lg:text-lg">
              Sleep Hub focuses on practical, repeatable wins so better sleep translates into better mornings,
              focus, and long-term health.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="rounded-3xl bg-white p-6 shadow-lg lg:p-7"
              >
                <span
                  className={`mb-4 inline-block rounded-lg px-3 py-1.5 font-mono text-xs uppercase ${benefit.badgeClassName}`}
                >
                  Benefit {index + 1}
                </span>
                <h3 className="mb-3 font-heading text-xl leading-tight text-midnight">{benefit.title}</h3>
                <p className="font-body leading-relaxed text-midnight/75">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-2xl leading-tight text-midnight lg:text-4xl">
              How Sleep Hub works
            </h2>
            <p className="mx-auto max-w-3xl font-body text-base leading-relaxed text-midnight/75 lg:text-lg">
              Simple flow, strong structure, and clear progress.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-gray-100 bg-daylight p-6">
                <span
                  className={`mb-4 inline-block rounded-lg px-3 py-1.5 font-mono text-xs uppercase ${step.badgeClassName}`}
                >
                  Step {index + 1}
                </span>
                <h3 className="mb-3 font-heading text-xl leading-tight text-midnight">{step.title}</h3>
                <p className="font-body leading-relaxed text-midnight/75">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-peach/20 bg-white p-8 text-center shadow-lg md:p-10">
            <h2 className="mb-4 font-heading text-2xl leading-tight text-midnight lg:text-4xl">
              Start your better-sleep journey tonight
            </h2>
            <p className="mb-7 font-body text-midnight/75">
              Access your plan, progress, and sleep tools from one dashboard, all designed
              to help you build healthier habits that last.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={sleepHubUrl}
                className="inline-flex items-center justify-center rounded bg-peach px-6 py-2.5 font-mono text-base tracking-wider text-white transition-colors duration-200 hover:bg-peach/90"
              >
                Create an Account
              </Link>
              <Link
                href={sleepHubUrl}
                className="inline-flex items-center justify-center rounded border border-peach px-6 py-2.5 font-mono text-base tracking-wider text-midnight transition-colors duration-200 hover:border-midnight"
              >
                Log In
              </Link>
            </div>
            <p className="mt-4 text-sm text-midnight/55">
              Simple tools, thoughtful guidance, and a clearer path to better rest.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-midnight text-daylight">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:px-8 lg:px-10 lg:py-18">
          <h2 className="font-heading text-3xl sm:text-4xl">
            Explore the full Sleep Hub experience.
          </h2>
          <p className="mt-4 font-body text-lg leading-8 text-daylight/76">
            Open Sleep Hub to continue with your guided plan, daily tracking, and
            evidence-based support in one place.
          </p>
          <Link
            href={sleepHubUrl}
            className="mt-8 inline-flex items-center justify-center rounded bg-peach px-6 py-3 font-mono text-base tracking-wider text-white transition-colors duration-200 hover:bg-peach/90"
          >
            Open Sleep Hub
          </Link>
        </div>
      </section>
    </main>
  );
}
