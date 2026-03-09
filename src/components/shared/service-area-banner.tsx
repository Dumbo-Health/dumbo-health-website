"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
  "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

// ── US availability map image ─────────────────────────────────────────────────
function StateMap() {
  return (
    <div className="relative w-full">
      <Image
        src="/images/misc/us-availability-map.png"
        alt="US map showing Dumbo Health availability in Texas and Florida"
        width={800}
        height={580}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}

// ── Why out-of-pocket is better ───────────────────────────────────────────────
const OOP_REASONS = [
  {
    n: "01",
    title: "No prior authorization.",
    copy: "Insurance companies often deny CPAP coverage or require months of sleep studies before approving treatment. With out-of-pocket, you start therapy in days.",
  },
  {
    n: "02",
    title: "Transparent, fixed pricing.",
    copy: "You know exactly what you'll pay, no surprise bills, no deductibles, no copays. One straightforward price covers everything.",
  },
  {
    n: "03",
    title: "Same clinical quality.",
    copy: "You get the same board-certified sleep specialists, the same FDA-cleared devices, and the same ongoing care, without the red tape.",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
export function ServiceAreaBanner() {
  const [selectedState, setSelectedState] = useState("");
  const [interest, setInterest] = useState<"insurance" | "cash">("cash");
  const [submitted, setSubmitted] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-8% 0px" });

  const oopRef = useRef<HTMLDivElement>(null);
  const oopInView = useInView(oopRef, { once: true, margin: "-8% 0px" });

  return (
    <>
      {/* ── Availability section ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FCF6ED" }} className="py-24 md:py-32">
        <div style={{ padding: "0 5%" }}>

          {/* Header */}
          <div ref={headerRef} className="mb-14 md:mb-18">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "#78BFBC" }}
            >
              Availability
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight"
              style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 4vw, 4rem)", maxWidth: "22ch" }}
            >
              Where Dumbo Health is available.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
              className="mt-4 font-body text-lg leading-relaxed"
              style={{ color: "rgba(3,31,61,0.56)", maxWidth: "50ch" }}
            >
              Live now in Florida and Texas. Expanding coast to coast. Join the waitlist for your state.
            </motion.p>
          </div>

          {/* Map + form */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20 items-start">

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            >
              <StateMap />

              {/* Legend */}
              <div className="mt-4 flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF8361" }} />
                  <span className="font-body text-sm font-medium" style={{ color: "#031F3D" }}>
                    Out-of-pocket — live now
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "rgba(3,31,61,0.12)" }} />
                  <span className="font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
                    Coming soon
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: state cards + waitlist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Live state cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,131,97,0.08)", border: "1px solid rgba(255,131,97,0.2)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>Florida</span>
                    <span className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide" style={{ backgroundColor: "#FF8361", color: "#FCF6ED" }}>Live</span>
                  </div>
                  <p className="font-heading text-4xl font-medium" style={{ color: "#031F3D" }}>FL</p>
                  <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>
                    Telehealth, CPAP, and resupply. All out-of-pocket.
                  </p>
                </div>

                <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,131,97,0.08)", border: "1px solid rgba(255,131,97,0.2)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "#FF8361" }}>Texas</span>
                    <span className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide" style={{ backgroundColor: "#FF8361", color: "#FCF6ED" }}>Live</span>
                  </div>
                  <p className="font-heading text-4xl font-medium" style={{ color: "#031F3D" }}>TX</p>
                  <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>
                    Telehealth, CPAP, and resupply. All out-of-pocket.
                  </p>
                </div>
              </div>

              {/* Insurance coming soon note */}
              <div className="rounded-2xl p-5 flex items-start gap-3" style={{ backgroundColor: "rgba(120,191,188,0.08)", border: "1px solid rgba(120,191,188,0.2)" }}>
                <div className="mt-0.5 h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: "#78BFBC" }} />
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(3,31,61,0.6)" }}>
                  <span className="font-bold" style={{ color: "#78BFBC" }}>Insurance coverage coming soon.</span>{" "}
                  We&apos;re actively working with insurers in FL and TX. Join the waitlist to be first to know.
                </p>
              </div>

              {/* Waitlist form */}
              <div className="rounded-2xl p-7" style={{ backgroundColor: "#F5E6D1", border: "1px solid rgba(3,31,61,0.07)" }}>
                <h3 className="font-heading text-2xl font-medium mb-1" style={{ color: "#031F3D" }}>
                  Not in FL or TX?
                </h3>
                <p className="font-body text-base mb-6" style={{ color: "rgba(3,31,61,0.56)" }}>
                  We&apos;ll notify you when we launch in your state.
                </p>

                {!submitted ? (
                  <div className="flex flex-col gap-4">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full rounded-xl px-4 py-3.5 font-body text-base outline-none"
                      style={{
                        backgroundColor: "#FCF6ED",
                        border: "1px solid rgba(3,31,61,0.15)",
                        color: selectedState ? "#031F3D" : "rgba(3,31,61,0.4)",
                      }}
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    <div className="flex gap-6">
                      {(["cash", "insurance"] as const).map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-2">
                          <input type="radio" name="interest" value={opt} checked={interest === opt} onChange={() => setInterest(opt)} className="accent-peach" />
                          <span className="font-body text-sm" style={{ color: "#031F3D" }}>
                            {opt === "cash" ? "Cash-pay" : "Insurance"}
                          </span>
                        </label>
                      ))}
                    </div>

                    <Button
                      onClick={() => selectedState && setSubmitted(true)}
                      className="h-12 rounded-[12px] bg-peach font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                      style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.22)" }}
                    >
                      Join the waitlist
                    </Button>

                    <p className="font-body text-xs" style={{ color: "rgba(3,31,61,0.35)" }}>
                      By joining you agree to our{" "}
                      <a href="/terms-of-use" className="underline hover:opacity-70">Terms of Use</a>. No spam, ever.
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    <p className="font-heading text-xl font-medium" style={{ color: "#031F3D" }}>You&apos;re on the list.</p>
                    <p className="mt-2 font-body text-base" style={{ color: "rgba(3,31,61,0.56)" }}>
                      We&apos;ll reach out as soon as Dumbo Health launches in {selectedState}.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Why out-of-pocket ────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#031F3D" }} className="py-24 md:py-32">
        <div ref={oopRef} style={{ padding: "0 5%" }}>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 items-start">

            {/* Left: header */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={oopInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: EASE }}
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "#78BFBC" }}
              >
                Out-of-pocket
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={oopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                className="font-heading font-medium leading-tight"
                style={{ color: "#FCF6ED", fontSize: "clamp(2rem, 3vw, 3rem)" }}
              >
                Why out-of-pocket is better than waiting on insurance.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={oopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="mt-8"
              >
                <Button
                  asChild
                  className="h-12 rounded-[12px] bg-peach px-7 font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.25)" }}
                >
                  <Link href={APP_URL}>Get started today</Link>
                </Button>
              </motion.div>
            </div>

            {/* Right: reasons */}
            <div className="flex flex-col gap-8">
              {OOP_REASONS.map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={oopInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.18 + i * 0.1 }}
                  className="flex gap-6 items-start"
                  style={{ borderTop: "1px solid rgba(252,246,237,0.08)", paddingTop: "32px" }}
                >
                  <span className="font-mono text-xs shrink-0 mt-1" style={{ color: "#FF8361" }}>{r.n}</span>
                  <div>
                    <h3 className="font-heading text-xl font-medium" style={{ color: "#FCF6ED" }}>
                      {r.title}
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed" style={{ color: "rgba(252,246,237,0.55)" }}>
                      {r.copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
