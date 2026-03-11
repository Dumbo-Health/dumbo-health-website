"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Brand icons ───────────────────────────────────────────────────────────────

function IconDollar() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconAsterisk() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    </svg>
  );
}

function IconChevrons() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  );
}

// ── Benefit data ──────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    id: "tl",
    Icon: IconDollar,
    title: "Affordable, transparent pricing",
    copy: "Everything you need, one simple price. All inclusive.",
  },
  {
    id: "tr",
    Icon: IconClock,
    title: "Fast diagnosis and treatment delivery",
    copy: "From home test to treatment in days.",
  },
  {
    id: "bl",
    Icon: IconAsterisk,
    title: "Best sleep specialists, anytime",
    copy: "Skip the wait. Meet our specialists on your schedule.",
  },
  {
    id: "br",
    Icon: IconChevrons,
    title: "All inclusive ongoing care",
    copy: "We manage renewals and restocks so you don't have to.",
  },
];

// ── Floating benefit item ─────────────────────────────────────────────────────

function BenefitItem({
  benefit,
  delay,
  inView,
  align,
}: {
  benefit: (typeof BENEFITS)[number];
  delay: number;
  inView: boolean;
  align: "left" | "right";
}) {
  const { Icon, title, copy } = benefit;
  const isRight = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{ textAlign: isRight ? "right" : "left" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: isRight ? "flex-end" : "flex-start",
          color: "#FF8361",
          marginBottom: "10px",
        }}
      >
        <Icon />
      </div>
      <h3
        className="font-heading font-medium leading-snug"
        style={{ color: "#031F3D", fontSize: "clamp(1.5rem, 2.2vw, 2rem)", textWrap: "balance" }}
      >
        {title}
      </h3>
      <p
        className="mt-2 font-body leading-relaxed"
        style={{ color: "rgba(3,31,61,0.56)", fontSize: "1.125rem", textWrap: "pretty" }}
      >
        {copy}
      </p>
    </motion.div>
  );
}

// ── Center clover hero ────────────────────────────────────────────────────────
// Orbit ring is large enough to visually reach into the benefit text columns.
// z-index kept low so benefit text (in sibling grid cells) paints above the ring.

const CLOVER = 560;          // clover image square (px)
const ORBIT_R = 420;         // orbit ring radius from clover center
const SVG_SIZE = 1000;       // SVG canvas — must contain orbit diameter with buffer
const CX = SVG_SIZE / 2;     // 500
const CY = SVG_SIZE / 2;     // 500
const DOT_D = 22;            // orbiting dot diameter

function CloverHero({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();

  // Offset the SVG so it's centered on the clover
  const svgOffset = -(SVG_SIZE - CLOVER) / 2; // -(960-460)/2 = -250

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Clip-path definition */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <clipPath id="clover-4petal" clipPathUnits="objectBoundingBox">
            <circle cx="0.33" cy="0.33" r="0.34" />
            <circle cx="0.67" cy="0.33" r="0.34" />
            <circle cx="0.33" cy="0.67" r="0.34" />
            <circle cx="0.67" cy="0.67" r="0.34" />
          </clipPath>
        </defs>
      </svg>

      {/* Orbit ring — sits BELOW text (no z-index; benefit columns use z-index:1) */}
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: svgOffset,
          left: svgOffset,
          pointerEvents: "none",
          // No z-index set — benefit column divs use z-index:1 to sit above this
        }}
        aria-hidden
      >
        {/* Dashed orbit ring only — no time labels */}
        <circle
          cx={CX} cy={CY} r={ORBIT_R}
          fill="none"
          stroke="rgba(3,31,61,0.1)"
          strokeWidth="1.5"
          strokeDasharray="4 12"
        />
      </svg>

      {/* Orbiting dot — rotates around the clover center */}
      {!reduceMotion && (
        <motion.div
          className="hidden lg:block"
          style={{
            position: "absolute",
            width: SVG_SIZE,
            height: SVG_SIZE,
            top: svgOffset,
            left: svgOffset,
            pointerEvents: "none",
            transformOrigin: `${CX}px ${CY}px`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        >
          {/* Dot sits at 12 o'clock on the orbit ring */}
          <div
            style={{
              position: "absolute",
              width: DOT_D,
              height: DOT_D,
              borderRadius: "50%",
              backgroundColor: "#FF8361",
              border: "2.5px solid rgba(252,246,237,0.9)",
              boxShadow: "0 0 14px rgba(255,131,97,0.75), 0 0 32px rgba(255,131,97,0.35)",
              top: CY - ORBIT_R - DOT_D / 2,   // 480 - 400 - 11 = 69
              left: CX - DOT_D / 2,             // 480 - 11 = 469
            }}
          />
        </motion.div>
      )}

      {/* Clover-masked image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        style={{
          width: CLOVER,
          height: CLOVER,
          clipPath: "url(#clover-4petal)",
          position: "relative",
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <Image
          src="/images/around-you.png"
          alt="Person sleeping peacefully"
          fill
          className="object-cover"
          sizes="560px"
        />
      </motion.div>

      {/* Moon icon — center brand accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
        style={{
          position: "absolute",
          zIndex: 2,
          pointerEvents: "none",
          width: 58,
          height: 58,
          borderRadius: "50%",
          backgroundColor: "rgba(252,246,237,0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,131,97,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF8361" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </motion.div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
export function BenefitsGrid() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <section style={{ backgroundColor: "#F5E6D1" }} className="overflow-hidden py-20 md:py-28">

      {/* Section header */}
      <div ref={headerRef} className="px-[5vw] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "#78BFBC" }}
        >
          Why Dumbo Health
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mt-3 font-heading font-medium leading-tight"
          style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
        >
          Built around you.
        </motion.h2>
      </div>

      {/* ── Desktop orbit layout ─────────────────────────────────────────────── */}
      {/*  5% padding each side · benefit columns sit above orbit ring (z-index:1) */}
      <div
        className="mt-16 hidden lg:grid"
        style={{
          gridTemplateColumns: "1fr 560px 1fr",
          alignItems: "stretch",
          minHeight: "620px",
          padding: "0 5%",
        }}
      >
        {/* Left benefits — constrained width so items are tall & narrow */}
        <div
          className="flex flex-col justify-between py-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "280px", marginLeft: "auto", paddingRight: "12px" }}>
            <BenefitItem benefit={BENEFITS[0]} delay={0.15} inView={inView} align="left" />
          </div>
          <div style={{ maxWidth: "280px", marginLeft: "auto", paddingRight: "12px" }}>
            <BenefitItem benefit={BENEFITS[2]} delay={0.28} inView={inView} align="left" />
          </div>
        </div>

        {/* Center clover — orbit SVG overflows into side columns */}
        <div className="flex items-center justify-center">
          <CloverHero inView={inView} />
        </div>

        {/* Right benefits — constrained width so items are tall & narrow */}
        <div
          className="flex flex-col justify-between py-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{ maxWidth: "280px", marginRight: "auto", paddingLeft: "12px" }}>
            <BenefitItem benefit={BENEFITS[1]} delay={0.22} inView={inView} align="right" />
          </div>
          <div style={{ maxWidth: "280px", marginRight: "auto", paddingLeft: "12px" }}>
            <BenefitItem benefit={BENEFITS[3]} delay={0.35} inView={inView} align="right" />
          </div>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="mt-10 px-[5vw] lg:hidden">
        <div className="flex justify-center">
          <CloverHero inView={inView} />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
          <BenefitItem benefit={BENEFITS[0]} delay={0.1} inView={inView} align="left" />
          <BenefitItem benefit={BENEFITS[1]} delay={0.16} inView={inView} align="right" />
          <BenefitItem benefit={BENEFITS[2]} delay={0.22} inView={inView} align="left" />
          <BenefitItem benefit={BENEFITS[3]} delay={0.28} inView={inView} align="right" />
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.48 }}
        className="mt-20 px-[5vw] text-center"
      >
        <p className="mb-5 font-body text-base" style={{ color: "rgba(3,31,61,0.56)" }}>
          Ready to start your sleep journey?
        </p>
        <Button
          asChild
          className="h-14 rounded-[12px] bg-peach px-10 font-body text-base font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          style={{ boxShadow: "0 6px 24px rgba(255,131,97,0.22)" }}
        >
          <Link href={APP_URL}>Get started with better sleep</Link>
        </Button>
      </motion.div>

    </section>
  );
}
