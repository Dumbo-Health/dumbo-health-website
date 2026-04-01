"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const features = [
  {
    title: "Smart resupply",
    description:
      "We track actual usage data to ship supplies when components are worn, not on a fixed calendar. Because therapy only works when your equipment does.",
    highlight: true,
  },
  {
    title: "AI companion",
    description:
      "24/7 support that answers questions, reminds you to clean and replace parts, and never lets you feel alone in treatment.",
    highlight: false,
  },
  {
    title: "Sleep insights dashboard",
    description:
      "Track your nights, see your progress, and understand how therapy is performing over time.",
    highlight: false,
  },
  {
    title: "Talk to a doctor",
    description:
      "In-app consultations for active patients. No waiting room, no referral needed.",
    highlight: false,
  },
  {
    title: "Downloadable reports",
    description:
      "Your data, your records, shareable with any provider, anytime.",
    highlight: false,
  },
];

export function AppShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-midnight py-20 md:py-28"
      style={{ isolation: "isolate" }}
    >
      {/* Lifeline — teal CPAP readout wave, centered vertically */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.28, zIndex: -1 }}
      />

      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ── Left: headline + frosted cards + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-teal">
              The Dumbo app
            </p>
            <h2
              className="mt-3 font-heading font-medium text-white text-balance"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              Your CPAP, finally intelligent.
            </h2>
            <p
              className="mt-4 font-body text-white/65"
              style={{ fontSize: "1.125rem", maxWidth: "48ch" }}
            >
              The Dumbo app turns your CPAP therapy into an active, guided
              experience, not a device you set up and forget.
            </p>

            {/* Frosted glass feature cards — 2-col grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm ${
                    i === features.length - 1 && features.length % 2 !== 0
                      ? "col-span-2"
                      : ""
                  }`}
                >
                  <p className="font-body font-bold leading-snug text-white" style={{ fontSize: "1.0625rem" }}>
                    {f.title}
                    {f.highlight && (
                      <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-peach">
                        new
                      </span>
                    )}
                  </p>
                  <p
                    className="mt-2 font-body leading-relaxed text-white/60"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {f.description}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              <Link href={APP_URL}>Open the app</Link>
            </Button>
          </motion.div>

          {/* ── Right: photo with stats overlay ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/people/man-drinking-coffee.png"
              alt="Patient enjoying their morning after better sleep"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {[
                { value: "94%", label: "still using at 90 days" },
                { value: "24/7", label: "AI support" },
                { value: "$149", label: "sleep test" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-sm"
                >
                  <p className="font-heading text-xl font-medium text-white">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
