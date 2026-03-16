"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function JourneySteps() {
  return (
    <section
      id="diagnose"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F5E6D1 0%, #FCF6ED 18%, #FCF6ED 100%)",
        isolation: "isolate",
      }}
    >
      {/* Lifeline — light peach active wave, mid-section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", opacity: 0.55, zIndex: -1 }}
      />

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-[5%] pt-20 pb-2 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-teal">
          Starting from zero
        </p>
        <h2 className="mt-2 font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
          The full journey, from suspicion to treatment
        </h2>
        <p className="mx-auto mt-4 font-body text-midnight/60 text-balance" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
          Never had a sleep study? Here's how Dumbo takes you from "I think something's wrong" to sleeping better, without ever leaving your home.
        </p>
      </div>

      {/* ── Step 1 ── */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal font-body text-sm font-bold text-white">
                  1
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  No sleep lab. No stress.
                </p>
              </div>
              <h3 className="font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Diagnose at home
              </h3>
              <p className="mt-4 max-w-lg font-body text-midnight/70" style={{ fontSize: "1.125rem" }}>
                The WatchPAT ONE is FDA-cleared, disposable, and worn for a single night. You sleep in your own bed. A board-certified sleep physician reviews your results and, if needed, includes a prescription.{" "}
                <strong className="text-midnight">All for $149.</strong>
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
              >
                <Link href="/get-your-at-home-sleep-apnea-test">Order your test</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sunlight"
            >
              <Image
                src="/uploads/HST-box-mockup.png"
                alt="Dumbo Health at-home sleep test unboxing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="border-t border-midnight/8" />
      </div>

      {/* ── Step 2 ── */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:grid-flow-dense">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-start-2"
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal font-body text-sm font-bold text-white">
                  2
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  Not just a report
                </p>
              </div>
              <h3 className="font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Review with a medical team
              </h3>
              <p className="mt-4 max-w-lg font-body text-midnight/70" style={{ fontSize: "1.125rem" }}>
                You're not handed a PDF and left to figure it out. Board-certified sleep physicians review your results with you and walk you through what they mean, and what to do next.
              </p>
              <blockquote className="mt-6 rounded-2xl border-l-4 border-teal bg-daylight p-6">
                <p className="font-body text-base italic text-midnight/80">
                  "Our goal isn't just to diagnose. It's to make sure every patient understands their results and feels confident in their next step."
                </p>
                <footer className="mt-3 font-body text-sm font-bold text-midnight">
                  Dumbo Health Medical Team
                </footer>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sunlight lg:col-start-1"
            >
              <Image
                src="/images/team/doctor-1.jpg"
                alt="Dumbo Health sleep physician"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="border-t border-midnight/8" />
      </div>

      {/* ── Step 3 ── */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal font-body text-sm font-bold text-white">
                  3
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  Your path, your choice
                </p>
              </div>
              <h3 className="font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
                Get your treatment
              </h3>
              <p className="mt-4 max-w-lg font-body text-midnight/70" style={{ fontSize: "1.125rem" }}>
                Two proven paths to better sleep, depending on your diagnosis and preference.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-sunlight bg-daylight p-5">
                  <p className="font-body text-base font-bold uppercase tracking-wider text-teal">
                    CPAP Therapy
                  </p>
                  <p className="mt-2 font-body text-sm text-midnight/65">
                    Buy outright or start with a monthly plan. No large upfront cost required.
                  </p>
                </div>
                <div className="rounded-xl border border-sunlight bg-daylight p-5">
                  <p className="font-body text-base font-bold uppercase tracking-wider text-teal">
                    Oral Appliance
                  </p>
                  <p className="mt-2 font-body text-sm text-midnight/65">
                    A comfortable alternative for those who qualify. No mask, no machine.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-6 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
              >
                <Link href="/cpap">Explore CPAP plans</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5E6D1]"
            >
              <Image
                src="/images/products/cpap-oa.png"
                alt="CPAP machine and oral appliance — two treatment paths"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
