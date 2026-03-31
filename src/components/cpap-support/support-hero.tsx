"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CHIPS = [
  {
    label: "Leak rate",
    value: "Within range",
    border: "rgba(120,191,188,0.4)",
    duration: 3.5,
    delay: 0,
    direction: -1,
  },
  {
    label: "AHI last night",
    value: "2.4 — Excellent",
    border: "rgba(255,131,97,0.4)",
    duration: 4.2,
    delay: 0.7,
    direction: 1,
  },
  {
    label: "Sleep time",
    value: "7h 12m used",
    border: "rgba(120,191,188,0.25)",
    duration: 3.8,
    delay: 1.4,
    direction: -1,
  },
];

export function SupportHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Brand sleep-cycle wave */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "60%", transform: "translateY(-50%)", opacity: 0.06, zIndex: 0 }}
      />

      {/* Warm radial at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,131,97,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ padding: "0 5%", gap: "3rem", zIndex: 1 }}
      >
        {/* Left: copy */}
        <div style={{ maxWidth: 500, flexShrink: 0 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-6"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Switch your CPAP care to Dumbo Health
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium text-balance"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.06,
              color: "#FCF6ED",
            }}
          >
            CPAP didn&apos;t fail.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              The support did.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            className="mt-6 font-body text-pretty"
            style={{
              fontSize: "clamp(1.125rem, 1.3vw, 1.3125rem)",
              lineHeight: 1.75,
              color: "rgba(252,246,237,0.75)",
              maxWidth: "44ch",
            }}
          >
            Most people managing CPAP alone are missing the monitoring,
            feedback, and clinical check-ins that make therapy actually work.
            Dumbo Health provides all three.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.28 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-13 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: "#FF8361",
                boxShadow: "0 4px 24px rgba(255,131,97,0.38)",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              <Link href="/get-started">Switch to Dumbo Health</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-13 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                color: "rgba(252,246,237,0.65)",
                border: "1px solid rgba(252,246,237,0.15)",
              }}
            >
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: image + chips to the right of it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center gap-4 shrink-0"
        >
          {/* Image card */}
          <div
            className="rounded-3xl overflow-hidden shrink-0"
            style={{
              position: "relative",
              zIndex: 1,
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              flex: "1 1 auto",
              maxWidth: 380,
            }}
          >
            {/* Ambient glow behind */}
            <div
              style={{
                position: "absolute",
                inset: -60,
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(120,191,188,0.1) 0%, rgba(255,131,97,0.07) 50%, transparent 75%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Image
              src="/images/products/dashboard.png"
              alt="Dumbo Health CPAP adherence dashboard showing nightly therapy monitoring"
              width={380}
              height={266}
              className="w-full h-auto"
              style={{ display: "block", position: "relative", zIndex: 1 }}
            />
          </div>

          {/* Chip column — to the right of the image, vertically distributed */}
          <div
            className="flex flex-col shrink-0"
            style={{ gap: "1.25rem", width: 190 }}
          >
            {CHIPS.map((chip) => (
              <motion.div
                key={chip.label}
                animate={{ y: [0, chip.direction * 5, 0] }}
                transition={{
                  duration: chip.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: chip.delay,
                }}
                style={{
                  backgroundColor: "rgba(3,31,61,0.88)",
                  border: `1px solid ${chip.border}`,
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                  borderRadius: "0.875rem",
                  padding: "0.875rem 1.125rem",
                }}
              >
                <p
                  className="font-mono uppercase tracking-widest"
                  style={{ fontSize: "0.75rem", color: "rgba(252,246,237,0.45)", lineHeight: 1 }}
                >
                  {chip.label}
                </p>
                <p
                  className="font-heading font-medium"
                  style={{ fontSize: "1.0625rem", color: "#FCF6ED", lineHeight: 1.3, marginTop: 4 }}
                >
                  {chip.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
