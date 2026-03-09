"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scientificCommittee } from "@/content/team";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SHOPIFY_BUY_URL =
  "https://checkout.dumbo.health/cart/add?id=8933198397592&quantity=1";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-widest"
      style={{ color: light ? "rgba(120,191,188,1)" : "#78BFBC" }}
    >
      {children}
    </p>
  );
}

export function SleepTestLanding() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: "#FCF6ED", padding: "0 5%" }}>
        <div className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div>
            <FadeUp>
              <span
                className="inline-block rounded-full px-3 py-1 font-mono text-xs uppercase tracking-widest"
                style={{ backgroundColor: "rgba(120,191,188,0.12)", color: "#78BFBC" }}
              >
                FDA-Cleared Device
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1
                className="mt-4 font-heading font-medium leading-[1.08]"
                style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                At-home test for sleep apnea.{" "}
                <span style={{ color: "#FF8361" }}>No sleep lab required.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p
                className="mt-5 font-body text-lg leading-relaxed"
                style={{ color: "rgba(3,31,61,0.65)", maxWidth: "48ch" }}
              >
                Sleep in your own bed, test in one night, and get doctor-reviewed results with clear next steps.
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <ul className="mt-6 space-y-3">
                {[
                  "Sleep in your own bed",
                  "Test in one night",
                  "Doctor-reviewed results",
                  "Prescription included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body" style={{ color: "rgba(3,31,61,0.8)" }}>
                    <svg className="h-5 w-5 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={SHOPIFY_BUY_URL}
                  className="inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md"
                  style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.25)" }}
                >
                  Start my sleep test — $149
                </a>
                <p className="font-body text-sm" style={{ color: "rgba(3,31,61,0.45)" }}>
                  Free shipping &middot; Results in days
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Image */}
          <FadeUp delay={0.1} className="relative">
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl">
              <Image
                src="/images/products/hst-box.png"
                alt="Dumbo Health at-home sleep test kit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Floating price card */}
            <div
              className="absolute -bottom-4 left-4 rounded-2xl p-4 shadow-lg md:-left-4"
              style={{ backgroundColor: "#fff", border: "1px solid #F5E6D1" }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-medium" style={{ color: "#031F3D" }}>$149</span>
                <span className="font-body text-sm line-through" style={{ color: "rgba(3,31,61,0.35)" }}>$350</span>
                <span className="rounded-full px-2 py-0.5 font-mono text-xs" style={{ backgroundColor: "rgba(255,131,97,0.1)", color: "#FF8361" }}>
                  Save 58%
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-body text-xs text-emerald-700">In stock — ships next business day</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(245,230,209,0.6)", borderBottom: "1px solid rgba(245,230,209,0.6)" }}>
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-center"
          style={{ padding: "20px 5%" }}
        >
          {["HIPAA compliant", "Board-certified physicians", "FDA-cleared device", "50,000+ patients served"].map((item) => (
            <span key={item} className="font-mono text-xs uppercase tracking-widest" style={{ color: "rgba(3,31,61,0.38)" }}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ backgroundColor: "#fff", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Simple process</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            How it works
          </h2>
          <p className="mx-auto mt-3 font-body" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "48ch" }}>
            Trusted care that guides you from your first step to better sleep.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            {
              step: "01",
              title: "Add your health info",
              desc: "A few quick questions help our specialists tailor your care and move things forward.",
            },
            {
              step: "02",
              title: "Take the sleep study",
              desc: "The simple device tracks how you breathe while you sleep and sends results to the doctor after one night.",
            },
            {
              step: "03",
              title: "Get your results",
              desc: "The doctor checks your sleep data. You get a clear report and a therapy plan if diagnosed.",
            },
            {
              step: "04",
              title: "Start your treatment",
              desc: "If diagnosed, get the right treatment — a CPAP machine or a custom oral device — right on our website.",
            },
          ].map((s, i) => (
            <FadeUp key={s.step} delay={i * 0.1}>
              <div className="relative text-center">
                {i < 3 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 md:block" style={{ background: "linear-gradient(to right, #F5E6D1, transparent)" }} />
                )}
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,131,97,0.12), rgba(255,131,97,0.05))" }}>
                  <span className="font-heading text-xl font-medium" style={{ color: "#FF8361" }}>{s.step}</span>
                </div>
                <h3 className="font-heading text-lg font-medium" style={{ color: "#031F3D" }}>{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.55)" }}>{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-12 text-center">
          <a
            href={SHOPIFY_BUY_URL}
            className="inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.2)" }}
          >
            Order your test
          </a>
        </FadeUp>
      </section>

      {/* ─── WHAT THE DEVICE MEASURES (dark) ─── */}
      <section style={{ backgroundColor: "#031F3D", padding: "80px 5%" }}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeUp>
              <SectionLabel>WatchPAT ONE device</SectionLabel>
              <h2
                className="mt-3 font-heading font-medium text-white"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                What the device measures
              </h2>
              <p className="mt-4 font-body text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
                Clinical-grade data captured from the comfort of your bed.
              </p>
            </FadeUp>
            <div className="mt-8 space-y-3">
              {[
                { label: "Respiratory patterns", detail: "Breathing flow and airway resistance" },
                { label: "Oxygen and cardiac rhythm", detail: "Blood oxygen (SpO2) levels and heart rate variability" },
                { label: "Snoring and position", detail: "Frequency, intensity, and sleep posture" },
                { label: "Movement and rest phases", detail: "REM, light sleep, and deep sleep staging" },
                { label: "Thoracic mechanics", detail: "Chest wall breathing effort" },
              ].map((spec, i) => (
                <FadeUp key={spec.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(120,191,188,0.2)" }}>
                      <svg className="h-3.5 w-3.5" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-bold text-white">{spec.label}</p>
                      <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{spec.detail}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <FadeUp delay={0.1} className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl">
            <Image
              src="/images/products/hst.png"
              alt="WatchPAT ONE sleep monitoring device"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </FadeUp>
        </div>
      </section>

      {/* ─── RESULTS PREVIEW ─── */}
      <section style={{ backgroundColor: "#F5E6D1", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Your results</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            From raw data to a clear answer
          </h2>
          <p className="mx-auto mt-3 font-body" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "50ch" }}>
            Your report shows exactly what happened while you slept, and what to do next.
          </p>
        </FadeUp>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeUp delay={0.08}>
            <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid rgba(3,31,61,0.07)" }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/products/hst-results.png"
                  alt="Sample sleep study results report"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="p-5">
                <p className="font-heading text-lg font-medium" style={{ color: "#031F3D" }}>Your sleep study report</p>
                <p className="mt-1 font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>Detailed breakdown reviewed by a board-certified sleep physician.</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: "#fff", border: "1px solid rgba(3,31,61,0.07)" }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/products/dashboard.png"
                  alt="Dumbo Health sleep tracking dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
              <div className="p-5">
                <p className="font-heading text-lg font-medium" style={{ color: "#031F3D" }}>Track your progress</p>
                <p className="mt-1 font-body text-sm" style={{ color: "rgba(3,31,61,0.55)" }}>Your sleep score, breathing pauses per hour, and therapy trends in one place.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── COMPARISON: AT-HOME vs IN-LAB ─── */}
      <section style={{ backgroundColor: "#fff", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Why home testing</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Better sleep starts at home
          </h2>
          <p className="mx-auto mt-3 font-body" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "48ch" }}>
            Sleep in your own bed and wake up with clearer answers.
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FadeUp delay={0.08}>
            <div className="h-full rounded-2xl p-8" style={{ border: "2px solid rgba(120,191,188,0.35)", background: "linear-gradient(180deg, rgba(120,191,188,0.06) 0%, transparent 100%)" }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(120,191,188,0.12)" }}>
                  <svg className="h-5 w-5" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-medium" style={{ color: "#031F3D" }}>At-home test</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Verified sleep apnea diagnosis",
                  "Convenient doctor video consult",
                  "Heart rate and breathing monitoring",
                  "Sleep in your own bed",
                  "Results in days, not weeks",
                  "Only $149",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body" style={{ color: "rgba(3,31,61,0.8)" }}>
                    <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#78BFBC" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.16}>
            <div className="h-full rounded-2xl p-8" style={{ border: "1px solid rgba(3,31,61,0.07)", backgroundColor: "rgba(3,31,61,0.02)" }}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(3,31,61,0.05)" }}>
                  <svg className="h-5 w-5" style={{ color: "rgba(3,31,61,0.28)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-medium" style={{ color: "rgba(3,31,61,0.38)" }}>In-lab testing</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Hooked up to intrusive wires",
                  "Must sleep inside a lab",
                  "Schedule a separate follow-up",
                  "Travel to a sleep center",
                  "3 to 6 weeks to schedule",
                  "$500 to $10,000 ($3,075 average)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body" style={{ color: "rgba(3,31,61,0.38)" }}>
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── PRICING CALLOUT ─── */}
      <section style={{ background: "linear-gradient(180deg, #FCF6ED 0%, rgba(245,230,209,0.5) 100%)", padding: "80px 5%" }}>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <SectionLabel>Simple pricing</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            One simple price: <span style={{ color: "#FF8361" }}>$149</span>
          </h2>
          <p className="mt-4 font-body text-lg" style={{ color: "rgba(3,31,61,0.55)" }}>
            One night. Simple process. Physician-reviewed results. Prescription included if diagnosed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Disposable device", "1-night testing", "Doctor review", "Prescription included"].map((item) => (
              <span
                key={item}
                className="rounded-full px-4 py-1.5 font-body text-sm"
                style={{ border: "1px solid #F5E6D1", backgroundColor: "#fff", color: "rgba(3,31,61,0.65)" }}
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href={SHOPIFY_BUY_URL}
            className="mt-8 inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{ backgroundColor: "#FF8361", boxShadow: "0 4px 14px rgba(255,131,97,0.2)" }}
          >
            Buy your test
          </a>
        </FadeUp>
      </section>

      {/* ─── IS THIS RIGHT FOR ME? ─── */}
      <section style={{ backgroundColor: "#fff", padding: "80px 5%" }}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeUp>
              <SectionLabel>Am I a candidate?</SectionLabel>
              <h2
                className="mt-2 font-heading font-medium"
                style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                Is this test right for me?
              </h2>
              <p className="mt-4 font-body text-lg" style={{ color: "rgba(3,31,61,0.55)" }}>
                This at-home test is designed for adults who experience any of the following:
              </p>
            </FadeUp>
            <div className="mt-8 space-y-3">
              {[
                "Snore loudly or stop breathing during sleep",
                "Wake up tired, foggy, or unrefreshed",
                "Feel sleepy during the day",
                "Want answers without visiting a sleep lab",
              ].map((item, i) => (
                <FadeUp key={item} delay={i * 0.07}>
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,131,97,0.05)" }}>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(255,131,97,0.1)" }}>
                      <svg className="h-3.5 w-3.5" style={{ color: "#FF8361" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-body" style={{ color: "rgba(3,31,61,0.8)" }}>{item}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          <FadeUp delay={0.1} className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl">
            <Image
              src="/images/people/girl-laying-in-bed.png"
              alt="Person wondering about their sleep quality"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </FadeUp>
        </div>
      </section>

      {/* ─── STATS (dark) ─── */}
      <section style={{ backgroundColor: "#031F3D", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Backed by data</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Clinically trusted insights
          </h2>
          <p className="mx-auto mt-3 font-body text-lg" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "48ch" }}>
            The same technology used in sleep clinics, now available at home.
          </p>
        </FadeUp>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { stat: "1M+", label: "Tests performed worldwide", sub: "every year" },
            { stat: "7+", label: "Sleep signals measured", sub: "PAT, oxygen, heart rate, snoring and more" },
            { stat: "FDA", label: "Cleared device", sub: "clinical-grade results at home" },
          ].map((item, i) => (
            <FadeUp key={item.stat} delay={i * 0.1}>
              <div className="rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }}>
                <p className="font-heading text-5xl font-medium" style={{ color: "#78BFBC" }}>{item.stat}</p>
                <p className="mt-3 font-body font-bold text-white">{item.label}</p>
                <p className="mt-1 font-body text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{item.sub}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── WHY DUMBO HEALTH ─── */}
      <section style={{ backgroundColor: "#FCF6ED", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Why us</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Why choose Dumbo Health?
          </h2>
        </FadeUp>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Doctor-reviewed results", desc: "Board-certified sleep specialists review every test." },
            { title: "Simple, at-home testing", desc: "No wires, no labs. Just one finger-worn device for one night." },
            { title: "No clinic visits", desc: "Everything happens from the comfort of your home." },
            { title: "Clear guidance", desc: "Plain-language results with next steps, not medical jargon." },
            { title: "Built to support you", desc: "Our care team is available every step of the way." },
            { title: "Affordable pricing", desc: "$149 all-in. No hidden fees, no surprise bills." },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl p-6" style={{ backgroundColor: "#fff", border: "1px solid #F5E6D1" }}>
                <h3 className="font-heading text-lg font-medium" style={{ color: "#031F3D" }}>{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.55)" }}>{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── SCIENTIFIC COMMITTEE ─── */}
      <section style={{ backgroundColor: "#fff", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Expert-led care</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Our scientific committee
          </h2>
          <p className="mx-auto mt-3 font-body" style={{ color: "rgba(3,31,61,0.55)", maxWidth: "48ch" }}>
            Board-certified sleep medicine experts guiding your care.
          </p>
        </FadeUp>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scientificCommittee.slice(0, 3).map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.1}>
              <div className="h-full rounded-2xl p-6" style={{ backgroundColor: "#FCF6ED", border: "1px solid #F5E6D1" }}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={member.image || "/images/team/doctor-1.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-medium" style={{ color: "#031F3D" }}>{member.name}</h3>
                    <p className="font-mono text-xs" style={{ color: "#FF8361" }}>{member.title}</p>
                  </div>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>{member.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        {/* Show remaining 2 members */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {scientificCommittee.slice(3).map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl p-5" style={{ backgroundColor: "#FCF6ED", border: "1px solid #F5E6D1" }}>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/images/team/doctor-1.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-base font-medium" style={{ color: "#031F3D" }}>{member.name}</h3>
                  <p className="font-mono text-xs" style={{ color: "#FF8361" }}>{member.title}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section style={{ backgroundColor: "#F5E6D1", padding: "80px 5%" }}>
        <FadeUp className="text-center">
          <SectionLabel>Common questions</SectionLabel>
          <h2
            className="mt-2 font-heading font-medium"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Got questions?
          </h2>
        </FadeUp>
        <div className="mx-auto mt-10" style={{ maxWidth: "700px" }}>
          <Accordion type="single" collapsible>
            {[
              {
                q: "Can this home sleep test really find sleep apnea?",
                a: "Yes. It is FDA-cleared and built to measure the signals needed to diagnose sleep apnea. It has been used on tens of thousands of people with strong accuracy.",
              },
              {
                q: "Do I ever need a sleep lab?",
                a: "Almost never. Fewer than 1 in 100 people need a full lab test with many sensors. Most people get everything they need from the home test.",
              },
              {
                q: "How does the testing process work?",
                a: "After completing a sleep questionnaire, our team ships the home sleep test to your door in about 3 business days. Setup is simple: pair the device with your phone, put it on your finger, and keep it on all night.",
              },
              {
                q: "What is a home sleep test?",
                a: "A small finger-worn device tracks how you breathe, how your heart beats, how much oxygen you have, and how long you sleep. It uses a light sensor on your finger and connects to an app on your phone.",
              },
              {
                q: "What makes Dumbo Health different?",
                a: "Board-certified sleep specialists read your results. FDA-cleared devices are used for testing and diagnosis. You get support through each step.",
              },
              {
                q: "Why is testing important?",
                a: "When your throat narrows during sleep, your oxygen drops. This stresses your heart, brain, and the rest of your organs. Untreated sleep apnea is linked to diabetes, stroke, heart attack, daytime sleepiness, and loss of energy.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                style={{ borderColor: "rgba(3,31,61,0.1)" }}
              >
                <AccordionTrigger className="text-left font-heading text-base font-medium hover:no-underline" style={{ color: "#031F3D" }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ backgroundColor: "#FF8361", padding: "80px 5%" }}>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2
            className="font-heading font-medium text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Ready to take control of your sleep?
          </h2>
          <p className="mx-auto mt-4 font-body text-lg" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "48ch" }}>
            Get your FDA-cleared at-home sleep test delivered to your door. One night. Clear answers. Better sleep ahead.
          </p>
          <a
            href={SHOPIFY_BUY_URL}
            className="mt-8 inline-flex h-12 items-center rounded-[12px] px-8 font-body text-base font-bold uppercase tracking-wider text-peach transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{ backgroundColor: "#fff", color: "#FF8361", boxShadow: "0 4px 18px rgba(255,255,255,0.2)" }}
          >
            Start my sleep test — $149
          </a>
          <p className="mt-4 font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Free shipping &middot; Prescription included &middot; HIPAA compliant
          </p>
        </FadeUp>
      </section>
    </>
  );
}
