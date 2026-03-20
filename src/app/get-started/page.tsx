"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useQuiz } from "@/hooks/useQuiz";
import type { QuizOption, ResultsTemplate } from "@/types/quiz";

// ── Motion config ──────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.6, 1];
const t = (delay = 0, duration = 0.5) => ({ ease: EASE, duration, delay });

// Screen-level: deliberate entrance, gentle fade exit (no directional snap)
const screen = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.65 } },
  exit: { opacity: 0, y: 0, transition: { ease: "easeIn" as const, duration: 0.28 } },
};

// ── Static data ────────────────────────────────────────────────────────────────
const FLOW_OPTIONS = [
  {
    slug: "undiagnosed",
    iconSrc: "/icons/brand/moon.png",
    title: "Something feels off with my sleep",
    subtitle: "Not tested yet. We'll help you understand what's going on.",
  },
  {
    slug: "diagnosed",
    iconSrc: "/icons/brand/heart.png",
    title: "I've been diagnosed and need support",
    subtitle: "We'll help you find the right setup for where you are now.",
  },
];

// ── Animated gradient background (always present, progresses with quiz) ────────
function AnimatedGradientBg({ progress }: { progress: number }) {
  const warmth = progress / 100; // 0→1 as quiz progresses

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Stage 1 — Daylight base, always present */}
      <div style={{ position: "absolute", inset: 0, background: "#FCF6ED" }} />

      {/* Stage 2 — Sunlight wash, creeps in from 0→60% progress */}
      <motion.div
        animate={{ opacity: Math.min(warmth * 1.1, 0.6) }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(145deg, transparent 0%, rgba(245,230,209,0.7) 55%, transparent 100%)",
        }}
      />

      {/* Stage 3 — Light Peach warmth, enters after 40% progress */}
      <motion.div
        animate={{ opacity: Math.max(0, (warmth - 0.4) / 0.6) * 0.45 }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(145deg, transparent 0%, rgba(255,214,173,0.5) 65%, transparent 100%)",
        }}
      />

      {/* Blob 1: top-right — very gentle breathe, always subtle */}
      <motion.div
        animate={{
          opacity: [0.18 + warmth * 0.1, 0.26 + warmth * 0.1, 0.18 + warmth * 0.1],
          scale: [1, 1.05, 1],
          x: [0, 18, 0], y: [0, -12, 0],
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute", top: "-15%", right: "-8%",
          width: "60vw", height: "60vw", maxWidth: 760, maxHeight: 760,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,131,97,0.07) 0%, rgba(255,214,173,0.28) 40%, transparent 70%)",
        }}
      />

      {/* Blob 2: bottom-left */}
      <motion.div
        animate={{
          opacity: [0.12 + warmth * 0.08, 0.18 + warmth * 0.08, 0.12 + warmth * 0.08],
          scale: [1.02, 1, 1.02],
          x: [0, -14, 0], y: [0, 14, 0],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 2 }}
        style={{
          position: "absolute", bottom: "-18%", left: "-12%",
          width: "55vw", height: "55vw", maxWidth: 680, maxHeight: 680,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,214,173,0.3) 0%, transparent 65%)",
        }}
      />

      {/* Blob 3: center, slow drift */}
      <motion.div
        animate={{
          opacity: [0.08 + warmth * 0.08, 0.14 + warmth * 0.08, 0.08 + warmth * 0.08],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        style={{
          position: "absolute", top: "25%", left: "10%",
          width: "50vw", height: "50vw", maxWidth: 620, maxHeight: 620,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,230,209,0.55) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

// ── Section photo mapping ──────────────────────────────────────────────────────
function getSectionPhoto(slug: string | undefined): string | null {
  if (!slug) return null;
  if (slug.includes("symptom") || slug.includes("sleep-q") || slug.includes("snoring")) return "/images/people/woman sleeping peacefully.jpg";
  if (slug.includes("risk") || slug.includes("health") || slug.includes("factor")) return "/images/people/woman-blue-pajamas.png";
  if (slug.includes("impact") || slug.includes("daytime") || slug.includes("day")) return "/images/people/man-drinking-coffee.png";
  if (slug.includes("treatment") || slug.includes("cpap") || slug.includes("diag") || slug.includes("dx")) return "/images/people/man-with-pillows.png";
  return null;
}


function getRiskLevel(score: number) {
  if (score >= 4) return { label: "High likelihood", color: "#FF8361", bar: 1 };
  if (score >= 2) return { label: "Moderate likelihood", color: "#78BFBC", bar: 0.6 };
  return { label: "Some indicators present", color: "#78BFBC", bar: 0.3 };
}

// ── Shared card wrapper ────────────────────────────────────────────────────────
function QuizCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 28,
        boxShadow: "0 4px 40px rgba(3,31,61,0.07), 0 1px 4px rgba(3,31,61,0.04)",
        padding: "clamp(32px, 5vw, 56px)",
        maxWidth: 640,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Word-by-word animated text ────────────────────────────────────────────────
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: EASE, duration: 0.42, delay: delay + i * 0.035 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Reflection moments (answer-triggered acknowledgment screens) ───────────────
interface ReflectionMoment {
  id: string;
  iconSrc: string;
  stat: string;
  headline: string;
  body: string;
}

const REFLECTION_MOMENTS: Record<string, ReflectionMoment> = {
  "snoring:yes-loud": {
    id: "snoring-loud",
    iconSrc: "/icons/brand/moon.png",
    stat: "90 million Americans snore regularly",
    headline: "You're not alone",
    body: "Loud snoring is one of the most common early signs of sleep apnea. Most people who snore loudly don't know why, and many of them have sleep apnea without realizing it.",
  },
  "snoring:sometimes": {
    id: "snoring-sometimes",
    iconSrc: "/icons/brand/moon.png",
    stat: "1 in 4 adults snores intermittently",
    headline: "Even occasional snoring matters",
    body: "Snoring happens when the airway narrows during sleep. It doesn't have to happen every night to be worth understanding.",
  },
  "breathing-pauses:yes": {
    id: "breathing-pauses",
    iconSrc: "/icons/brand/heart.png",
    stat: "One of the clearest signals we look for",
    headline: "That's significant",
    body: "When breathing pauses during sleep, the brain wakes just enough to restart it, but not enough for you to remember. This can happen dozens of times each night, quietly exhausting you.",
  },
  "daytime-sleepiness:daily": {
    id: "daytime-sleepiness",
    iconSrc: "/icons/brand/sun.png",
    stat: "80 million Americans have undiagnosed sleep apnea",
    headline: "This exhaustion isn't just how you're wired",
    body: "Most people with sleep apnea think they're just tired. They don't realize their sleep is being disrupted hundreds of times each night. You're asking exactly the right questions.",
  },
};

function getReflectionTrigger(slug: string | undefined, answer: string | string[]): ReflectionMoment | null {
  if (!slug || typeof answer !== "string") return null;
  return REFLECTION_MOMENTS[`${slug}:${answer}`] ?? null;
}

function ReflectionScreen({ moment, onContinue }: { moment: ReflectionMoment; onContinue: () => void }) {
  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.7 }}
          style={{ width: 72, height: 72, margin: "0 auto 36px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Image src={moment.iconSrc} alt="" width={64} height={64} style={{ objectFit: "contain" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.3)}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}
        >
          {moment.stat}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.44)}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", color: "#031F3D", lineHeight: 1.15, marginBottom: 20 }}
        >
          {moment.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.58)}
          style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(3,31,61,0.58)", lineHeight: 1.75, marginBottom: 48 }}
        >
          {moment.body}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.72)}
          whileHover={{ y: -2, boxShadow: "0 12px 36px rgba(255,131,97,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          style={{
            backgroundColor: "#FF8361",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "14px 44px",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 18px rgba(255,131,97,0.28)",
          }}
        >
          Continue →
        </motion.button>
      </div>
    </div>
  );
}

// ── Journey bridge screen ──────────────────────────────────────────────────────
const BRIDGE_ROWS = [
  { before: "Sleep lab, away from home",   after: "At-home test, your own bed"    },
  { before: "4–6 week wait for results",   after: "Results today"                 },
  { before: "Thousands in surprise costs", after: "Transparent, cash-pay pricing" },
];

function JourneyBridgeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "60px 24px" }}>

      {/* ── Base ── */}
      <div style={{ position: "absolute", inset: 0, background: "#FCF6ED", zIndex: 0 }} />

      {/* ── Brand pattern — one instance stretched to fill, center masked out ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "url('/patterns/brand-pattern.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.32,
        maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, transparent 42%, rgba(0,0,0,0.6) 68%, black 88%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, transparent 42%, rgba(0,0,0,0.6) 68%, black 88%)",
      }} />

      {/* ── Warm gradient blobs — depth and atmosphere ── */}
      <motion.div
        animate={{ opacity: [0.55, 0.8, 0.55], scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute", top: "-25%", right: "-12%", zIndex: 2,
          width: "58vw", height: "58vw", maxWidth: 720, maxHeight: 720,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,214,173,0.55) 0%, rgba(255,131,97,0.08) 45%, transparent 68%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.4, 0.62, 0.4], scale: [1.06, 1, 1.06], x: [0, -16, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, ease: "easeInOut", repeat: Infinity, delay: 2.5 }}
        style={{
          position: "absolute", bottom: "-22%", left: "-14%", zIndex: 2,
          width: "52vw", height: "52vw", maxWidth: 660, maxHeight: 660,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,214,173,0.5) 0%, transparent 65%)",
        }}
      />

      {/* ── Center content ── */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 580, width: "100%", textAlign: "center" }}>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.08)}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.68rem",
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "#78BFBC", marginBottom: 24,
          }}
        >
          Before we show you your results
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.16)}
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 500,
            fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
            color: "#031F3D", lineHeight: 1.07, marginBottom: 44,
            letterSpacing: "-0.015em",
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          Most people wait months{" "}
          <span style={{ color: "rgba(3,31,61,0.38)", fontWeight: 400 }}>to get here.</span>
          <br />
          <span style={{ color: "#FF8361" }}>You just did it in minutes.</span>
        </motion.h2>

        {/* Contrast card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.3)}
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(3,31,61,0.1), 0 1px 4px rgba(3,31,61,0.06)",
            marginBottom: 36,
          }}
        >
          {/* Column headers */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 32px 1fr",
            padding: "14px 24px 10px", gap: 12,
            borderBottom: "1px solid rgba(3,31,61,0.07)",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.3)", textAlign: "right", margin: 0 }}>The usual path</p>
            <span />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#78BFBC", textAlign: "left", margin: 0 }}>With Dumbo Health</p>
          </div>

          {BRIDGE_ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid", gridTemplateColumns: "1fr 32px 1fr",
                alignItems: "center", gap: 12,
                padding: "18px 24px",
                borderBottom: i < BRIDGE_ROWS.length - 1 ? "1px solid rgba(3,31,61,0.05)" : "none",
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.3vw, 1rem)", color: "rgba(3,31,61,0.26)", lineHeight: 1.4, textAlign: "right", textDecoration: "line-through", margin: 0 }}>
                {row.before}
              </p>
              <span style={{ color: "#FF8361", fontSize: "1.1rem", textAlign: "center", display: "block", fontWeight: 700 }}>→</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.875rem, 1.3vw, 1rem)", fontWeight: 600, color: "#031F3D", lineHeight: 1.4, textAlign: "left", margin: 0 }}>
                {row.after}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={t(0.52)}
          style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "rgba(3,31,61,0.42)", lineHeight: 1.68, marginBottom: 38,
            textWrap: "balance" as React.CSSProperties["textWrap"],
          }}
        >
          We know this journey. That&apos;s why we built a better one.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.62)}
          whileHover={{ y: -2, boxShadow: "0 16px 44px rgba(255,131,97,0.42)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          style={{
            backgroundColor: "#FF8361", color: "white", border: "none",
            borderRadius: 12, padding: "17px 56px",
            fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500,
            cursor: "pointer", boxShadow: "0 6px 24px rgba(255,131,97,0.34)",
          }}
        >
          See my results →
        </motion.button>

      </div>
    </div>
  );
}

// ── Flow splitter (entry screen) ───────────────────────────────────────────────
function FlowSplitter({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 620, width: "100%", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.05)}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF8361", marginBottom: 18 }}>
          Sleep assessment
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(0.1)}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "#031F3D", lineHeight: 1.1, marginBottom: 14 }}>
          Where are you on your sleep journey?
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.18)}
          style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(3,31,61,0.5)", marginBottom: 36 }}>
          We&apos;ll personalize everything based on your answers.
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FLOW_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.22 + i * 0.07)}
              whileHover={{ y: -2, boxShadow: "0 10px 36px rgba(3,31,61,0.12)" }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(opt.slug)}
              style={{
                backgroundColor: "white",
                border: "1.5px solid rgba(3,31,61,0.09)",
                borderRadius: 20,
                padding: "clamp(20px, 2.5vw, 28px) clamp(22px, 2.5vw, 30px)",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 2px 12px rgba(3,31,61,0.05)",
                transition: "border-color 0.2s",
              }}
            >
              <span style={{ width: 38, height: 38, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={opt.iconSrc} alt="" width={32} height={32} style={{ objectFit: "contain" }} />
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1rem", color: "#031F3D", marginBottom: 2, lineHeight: 1.3 }}>
                  {opt.title}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.45)" }}>
                  {opt.subtitle}
                </p>
              </div>
              <span style={{ color: "rgba(3,31,61,0.2)", fontSize: "1rem", flexShrink: 0 }}>→</span>
            </motion.button>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.4)}
          style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(3,31,61,0.3)", marginTop: 24 }}>
          ~3 minutes · No account required
        </motion.p>
      </div>
    </div>
  );
}

// ── Section interstitial ───────────────────────────────────────────────────────
function SectionInterstitial({ title, subtitle, onContinue, sectionSlug }: { title: string; subtitle: string; onContinue: () => void; sectionSlug?: string }) {
  const photoSrc = getSectionPhoto(sectionSlug);

  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

      <div style={{ maxWidth: 580, width: "100%" }}>
        {photoSrc ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.65 }}
            style={{
              backgroundColor: "white",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 8px 48px rgba(3,31,61,0.1), 0 2px 8px rgba(3,31,61,0.05)",
            }}
          >
            {/* Photo area */}
            <div style={{ position: "relative", height: 252, overflow: "hidden" }}>
              <Image src={photoSrc} alt="" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, white 100%)" }} />
            </div>
            {/* Text area */}
            <div style={{ padding: "8px 40px 40px", textAlign: "center" }}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={t(0.2, 0.55)}
                style={{ width: 32, height: 3, backgroundColor: "#FF8361", borderRadius: 2, margin: "0 auto 22px" }} />
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t(0.3)}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.625rem, 4vw, 2.25rem)", color: "#031F3D", lineHeight: 1.15, marginBottom: 14 }}>
                {title}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={t(0.42)}
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.72, marginBottom: 36 }}>
                {subtitle}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(0.55)}
                whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(255,131,97,0.38)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
                style={{ backgroundColor: "#FF8361", color: "white", border: "none", borderRadius: 12, padding: "14px 44px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, cursor: "pointer", boxShadow: "0 4px 18px rgba(255,131,97,0.3)" }}
              >
                Let&apos;s go →
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={t(0.1, 0.75)}
              style={{ width: 40, height: 3, backgroundColor: "#FF8361", borderRadius: 2, margin: "0 auto 30px" }} />
            <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={t(0.25)}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", color: "#031F3D", lineHeight: 1.15, marginBottom: 16 }}>
              {title}
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={t(0.4)}
              style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.7, marginBottom: 48 }}>
              {subtitle}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.55)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              style={{ backgroundColor: "#FF8361", color: "white", border: "none", borderRadius: 12, padding: "14px 36px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,131,97,0.3)" }}
            >
              Let&apos;s go →
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Option button ──────────────────────────────────────────────────────────────
function OptionBtn({ label, selected, onClick, type }: { label: string; selected: boolean; onClick: () => void; type: "radio" | "checkbox" }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: selected ? "rgba(255,131,97,0.07)" : "rgba(252,246,237,0.9)" }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      style={{
        width: "100%",
        backgroundColor: selected ? "rgba(255,131,97,0.06)" : "white",
        border: selected ? "2px solid #FF8361" : "1.5px solid rgba(3,31,61,0.1)",
        borderRadius: 14,
        padding: "clamp(13px, 1.5vw, 17px) clamp(16px, 2vw, 20px)",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transition: "background-color 0.12s, border-color 0.12s",
      }}
    >
      <span style={{
        width: 20, height: 20,
        borderRadius: type === "radio" ? "50%" : 6,
        border: selected ? "2px solid #FF8361" : "2px solid rgba(3,31,61,0.18)",
        backgroundColor: selected ? "#FF8361" : "transparent",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.12s ease",
      }}>
        {selected && (
          <span style={{ color: "white", fontSize: type === "radio" ? "0.5rem" : "0.65rem", fontWeight: 700, lineHeight: 1 }}>
            {type === "radio" ? "●" : "✓"}
          </span>
        )}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)", color: "#031F3D", fontWeight: selected ? 500 : 400, lineHeight: 1.35 }}>
        {label}
      </span>
    </motion.button>
  );
}

// ── Question card ──────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  questionNumber,
  totalQuestions,
  canGoBack,
}: {
  question: NonNullable<ReturnType<typeof useQuiz>["currentQuestion"]>;
  currentAnswer: string | string[] | undefined;
  onAnswer: (a: string | string[]) => void;
  onBack: () => void;
  questionNumber: number;
  totalQuestions: number;
  canGoBack: boolean;
}) {
  const [selected, setSelected] = useState<string | string[]>(
    currentAnswer ?? (question.answer_type === "multi_select" ? [] : "")
  );
  const [whyOpen, setWhyOpen] = useState(false);

  // Delay options until question text has mostly animated in
  const wordCount = question.question_text.split(" ").length;
  const optionsDelay = Math.min(0.12 + wordCount * 0.032, 0.54);

  useEffect(() => {
    setSelected(currentAnswer ?? (question.answer_type === "multi_select" ? [] : ""));
    setWhyOpen(false);
  }, [question.id, currentAnswer]);

  const options = question.options as QuizOption[];

  function handleSingle(value: string) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 420);
  }

  function handleMulti(value: string) {
    const prev = Array.isArray(selected) ? selected : [];
    if (value === "none") { setSelected(["none"]); return; }
    const without = prev.filter((v) => v !== "none");
    setSelected(without.includes(value) ? without.filter((v) => v !== value) : [...without, value]);
  }

  return (
    <motion.div key={question.id} {...screen} style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <QuizCard>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          {canGoBack ? (
            <button onClick={onBack}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.4)", background: "none", border: "none", cursor: "pointer", padding: "0 2px", display: "flex", alignItems: "center", gap: 4 }}>
              ← Back
            </button>
          ) : <span />}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", color: "rgba(3,31,61,0.3)", textTransform: "uppercase" }}>
            {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Question */}
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.375rem, 2.8vw, 2rem)", color: "#031F3D", lineHeight: 1.25, marginBottom: question.why_we_ask ? 12 : 28 }}>
          <AnimatedText text={question.question_text} delay={0.05} />
        </h2>

        {/* Why we ask */}
        {question.why_we_ask && (
          <div style={{ marginBottom: 22 }}>
            <button onClick={() => setWhyOpen(!whyOpen)}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#78BFBC", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
              {whyOpen ? "Got it ↑" : "Why do we ask this? ↓"}
            </button>
            <AnimatePresence>
              {whyOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={t(0, 0.25)}
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.6, marginTop: 8, overflow: "hidden" }}
                >
                  {question.why_we_ask}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.answer_type === "single_select" && options.map((opt, i) => (
            <motion.div key={opt.value} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t(optionsDelay + i * 0.075)}>
              <OptionBtn label={opt.label} selected={selected === opt.value} onClick={() => handleSingle(opt.value)} type="radio" />
            </motion.div>
          ))}

          {question.answer_type === "multi_select" && (
            <>
              {options.map((opt, i) => (
                <motion.div key={opt.value} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={t(optionsDelay + i * 0.075)}>
                  <OptionBtn
                    label={opt.label}
                    selected={Array.isArray(selected) && selected.includes(opt.value)}
                    onClick={() => handleMulti(opt.value)}
                    type="checkbox"
                  />
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: Array.isArray(selected) && selected.length > 0 ? 1 : 0.35 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                disabled={!Array.isArray(selected) || selected.length === 0}
                onClick={() => Array.isArray(selected) && selected.length > 0 && onAnswer(selected)}
                style={{
                  marginTop: 4,
                  backgroundColor: "#FF8361",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: Array.isArray(selected) && selected.length > 0 ? "pointer" : "default",
                  boxShadow: "0 4px 16px rgba(255,131,97,0.25)",
                  transition: "opacity 0.2s",
                }}
              >
                Continue →
              </motion.button>
            </>
          )}

          {question.answer_type === "dropdown" && (
            <>
              <select
                value={selected as string}
                onChange={(e) => setSelected(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: selected ? "#031F3D" : "rgba(3,31,61,0.4)",
                  backgroundColor: "white",
                  border: "1.5px solid rgba(3,31,61,0.1)",
                  borderRadius: 14,
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23031F3D' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="">Select your state</option>
                {(question.options as QuizOption[]).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                disabled={!selected}
                onClick={() => selected && onAnswer(selected)}
                style={{
                  backgroundColor: selected ? "#FF8361" : "rgba(3,31,61,0.08)",
                  color: selected ? "white" : "rgba(3,31,61,0.3)",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: selected ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                Continue →
              </button>
            </>
          )}

          {question.answer_type === "text_input" && (
            <>
              <input
                type="email"
                value={selected as string}
                onChange={(e) => setSelected(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && (selected as string).includes("@")) onAnswer(selected as string); }}
                placeholder="your@email.com"
                autoFocus
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "#031F3D",
                  backgroundColor: "white",
                  border: "1.5px solid rgba(3,31,61,0.1)",
                  borderRadius: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#78BFBC"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(3,31,61,0.1)"; }}
              />
              <button
                disabled={!(selected as string).includes("@")}
                onClick={() => onAnswer(selected as string)}
                style={{
                  backgroundColor: (selected as string).includes("@") ? "#FF8361" : "rgba(3,31,61,0.08)",
                  color: (selected as string).includes("@") ? "white" : "rgba(3,31,61,0.3)",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: (selected as string).includes("@") ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                Continue →
              </button>
              {!question.is_required && (
                <button
                  onClick={() => onAnswer("")}
                  style={{ background: "none", border: "none", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(3,31,61,0.35)", cursor: "pointer", padding: "4px 0", textDecoration: "underline" }}
                >
                  Skip for now
                </button>
              )}
            </>
          )}
        </div>
      </QuizCard>
    </motion.div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <QuizCard>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            height: i === 1 ? 28 : 52,
            backgroundColor: "rgba(3,31,61,0.05)",
            borderRadius: 10,
            marginBottom: 12,
            animation: "pulse 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </QuizCard>
    </div>
  );
}

// ── Full journey section ────────────────────────────────────────────────────────
const JOURNEY_PHASES = [
  {
    num: "01",
    label: "Get clarity",
    title: "Your answer, within 48 hours",
    body: "A board-certified doctor reviews your at-home sleep test and delivers a clear diagnosis. No waiting rooms, no referrals, no guessing.",
    active: true,
  },
  {
    num: "02",
    label: "Get treated",
    title: "The right therapy, delivered",
    body: "If you're diagnosed, we match you to CPAP therapy, oral devices, or alternatives — and handle everything from fitting to your front door.",
    active: false,
  },
  {
    num: "03",
    label: "Stay well",
    title: "Support that doesn't stop",
    body: "Regular check-ins, automatic supply management, and a dedicated care team available whenever you need them. The relationship doesn't end at diagnosis.",
    active: false,
  },
];

function ResultBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={t(delay)}>
      {children}
    </motion.div>
  );
}

function FullJourneySection() {
  return (
    <div style={{ marginTop: 72, borderTop: "1px solid rgba(3,31,61,0.06)", padding: "64px 24px 72px", background: "linear-gradient(180deg, rgba(245,230,209,0) 0%, rgba(245,230,209,0.35) 25%, rgba(245,230,209,0.35) 75%, rgba(252,246,237,0) 100%)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <ResultBlock delay={0}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF8361", marginBottom: 16 }}>
              The full picture
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#031F3D", lineHeight: 1.12, marginBottom: 16, textWrap: "balance" as React.CSSProperties["textWrap"] }}>
              Whatever your results show, we&apos;re here for all of it.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(3,31,61,0.5)", lineHeight: 1.65, maxWidth: 500, margin: "0 auto", textWrap: "balance" as React.CSSProperties["textWrap"] }}>
              Most people don&apos;t know sleep apnea is treatable. Fewer know how good life feels on the other side.
            </p>
          </div>
        </ResultBlock>

        {/* Phases */}
        <div className="journey-phases">
          {JOURNEY_PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.15 + i * 0.12)}
              style={{
                backgroundColor: phase.active ? "#031F3D" : "white",
                borderRadius: 24,
                padding: "32px 28px 28px",
                boxShadow: phase.active
                  ? "0 10px 48px rgba(3,31,61,0.16)"
                  : "0 2px 20px rgba(3,31,61,0.06)",
                border: phase.active ? "none" : "1px solid rgba(3,31,61,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: phase.active ? "rgba(255,131,97,0.7)" : "rgba(3,31,61,0.3)" }}>
                  {phase.label}
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "2rem", color: phase.active ? "rgba(255,255,255,0.1)" : "rgba(3,31,61,0.07)", lineHeight: 1 }}>
                  {phase.num}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)", color: phase.active ? "white" : "#031F3D", lineHeight: 1.2, marginBottom: 14 }}>
                {phase.title}
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)", color: phase.active ? "rgba(255,255,255,0.58)" : "rgba(3,31,61,0.5)", lineHeight: 1.7, margin: 0 }}>
                {phase.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={t(0.55)}
          style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.35)", lineHeight: 1.65, marginTop: 40, textWrap: "balance" as React.CSSProperties["textWrap"] }}
        >
          Not diagnosed with sleep apnea? You still get answers — and peace of mind is its own result.
        </motion.p>

      </div>
    </div>
  );
}

// ── Results page ───────────────────────────────────────────────────────────────
type DbStep = { step_order: number; title: string; body: string };
type DbSignal = { signal_key: string; label: string; detail: string; icon_path: string };

function ResultsPage({
  results,
  riskScore,
  tags,
  flowSlug,
  answers,
  onSubmit,
}: {
  results: Record<string, ResultsTemplate>;
  riskScore: number;
  tags: string[];
  flowSlug: string;
  answers: Record<string, string | string[]>;
  onSubmit: () => void;
}) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSent, setWaitlistSent] = useState(false);
  const [openSignal, setOpenSignal] = useState<string | null>(null);
  const [dbSteps, setDbSteps] = useState<DbStep[] | null>(null);
  const [dbSignalMap, setDbSignalMap] = useState<Record<string, DbSignal> | null>(null);

  useEffect(() => {
    onSubmit();
    fetch(`/api/quiz/content?flow=${flowSlug}`)
      .then((r) => r.json())
      .then(({ steps, signals }: { steps: DbStep[]; signals: DbSignal[] }) => {
        if (steps.length > 0) setDbSteps(steps);
        if (signals.length > 0) {
          setDbSignalMap(Object.fromEntries(signals.map((s) => [s.signal_key, s])));
        }
      })
      .catch(() => { /* silently fall back to hardcoded */ });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const hero = results.hero;
  const product = results.recommendation;
  const waitlist = results.waitlist;

  const risk = getRiskLevel(riskScore);
  const isUndiagnosed = flowSlug === "undiagnosed";
  const insuranceAnswer = ((answers["insurance-type"] ?? answers["insurance-type-dx"]) as string) ?? "";
  const showInsuranceNote = /medicare|medicaid/i.test(insuranceAnswer);

  function getNarrative(): string {
    if (!isUndiagnosed) {
      const satisfaction = answers["cpap-satisfaction"] as string;
      if (satisfaction === "stopped" || satisfaction === "struggling") {
        return "CPAP therapy works really well, but only when it feels comfortable for you. A lot of people stop using it in the first year, usually because of the mask fit, air pressure, or just not having enough support along the way. The good news is that these things are almost always fixable. You don't have to give up.";
      }
      return "Getting diagnosed was the most important step, and you've already done it. Most people live with untreated sleep apnea for years without knowing. Now it's just about finding the right setup that feels comfortable and easy to stick with.";
    }
    if (riskScore >= 6) {
      return "Your answers show several signs that are commonly linked to sleep apnea. Here's what may be happening: while you sleep, your airway briefly closes, which stops your breathing for a moment. Your brain wakes you up just enough to start breathing again, but not enough for you to notice. This can happen dozens of times each night. That's often why people wake up feeling tired, foggy, or unrefreshed, even after what seemed like a full night of sleep.";
    }
    if (riskScore >= 3) {
      return "Your answers show some patterns that are often linked to sleep apnea. It's one of the most common conditions people don't know they have, often mistaken for everyday stress or just feeling tired. A simple overnight test is usually all it takes to find out for sure.";
    }
    return "Your score is on the lower side, but some of what you shared does point to disrupted sleep. Sleep apnea can be easy to miss, especially in women and younger adults. If your sleep is affecting how you feel during the day, a home test is the easiest way to get some answers.";
  }

  type Signal = { key: string; icon: string; label: string; detail: string };
  function getSignals(): Signal[] {
    const raw: Signal[] = [];
    const snoring = answers["snoring"] as string;
    const sleepiness = answers["daytime-sleepiness"] as string;
    const pauses = answers["breathing-pauses"] as string;
    const morningSymptoms = (answers["morning-symptoms"] ?? []) as string[];
    const bmi = answers["bmi"] as string;
    const conditions = (answers["conditions"] ?? []) as string[];
    const satisfaction = answers["cpap-satisfaction"] as string;
    const needs = (answers["dx-needs"] ?? []) as string[];

    if (snoring === "yes-loud") raw.push({ key: "snoring-loud", icon: "/icons/brand/moon.png", label: "Loud snoring", detail: "Loud snoring happens when the airway is partially blocked during sleep. It's one of the most common early signs we look for." });
    if (pauses === "yes") raw.push({ key: "breathing-pauses", icon: "/icons/brand/lifeline.png", label: "Breathing pauses during sleep", detail: "When someone else notices that your breathing stops during sleep, that's one of the clearest signs we look for. It's a strong indicator that something is going on." });
    if (sleepiness === "daily") raw.push({ key: "daytime-sleepiness", icon: "/icons/brand/moon.png", label: "Feeling tired every day", detail: "Feeling tired every day, even after a full night of sleep, often means your sleep isn't as restful as it should be. It's one of the most common things people with sleep apnea share with us." });
    if (morningSymptoms.includes("headache")) raw.push({ key: "morning-headache", icon: "/icons/brand/sun.png", label: "Morning headaches", detail: "Waking up with a headache can be a sign that your oxygen levels dip during the night. This usually goes away once sleep apnea is treated." });
    if (morningSymptoms.includes("dry-mouth")) raw.push({ key: "dry-mouth", icon: "/icons/brand/sun.png", label: "Dry mouth in the morning", detail: "Waking up with a dry mouth often means you've been breathing through your mouth at night, which happens when the airway is partially blocked." });
    if (bmi === "overweight" || bmi === "obese") raw.push({ key: "bmi-weight", icon: "/icons/brand/lifeline.png", label: "Weight as a risk factor", detail: "Carrying extra weight, especially around the neck, can make the airway narrower during sleep. It's one of the most common risk factors for sleep apnea, and something treatment can help with." });
    if (conditions.includes("hypertension")) raw.push({ key: "hypertension", icon: "/icons/brand/heart.png", label: "High blood pressure", detail: "High blood pressure and sleep apnea often go hand in hand. Each time breathing is disrupted at night, it puts extra stress on the heart. Treating sleep apnea can actually help bring blood pressure down." });
    if (conditions.includes("heart-disease")) raw.push({ key: "heart-disease", icon: "/icons/brand/heart.png", label: "Heart health", detail: "Untreated sleep apnea puts extra strain on the heart over time. For people with heart conditions, getting tested and treated is especially important." });
    if (satisfaction === "stopped") raw.push({ key: "cpap-stopped", icon: "/icons/brand/lifeline.png", label: "Stopped using CPAP", detail: "Stopping CPAP is more common than most people think. It usually comes down to the mask, the pressure, or just not having the right support. Most of the time, these problems can be fixed." });
    if (satisfaction === "struggling") raw.push({ key: "cpap-struggling", icon: "/icons/brand/lifeline.png", label: "Struggling with CPAP", detail: "Struggling with CPAP is really common, and it's almost always something we can help with. Better mask fitting, adjusted pressure, and some coaching make a real difference." });
    if (needs.includes("supplies")) raw.push({ key: "supplies-due", icon: "/icons/brand/lifeline.png", label: "Supplies may be due", detail: "CPAP masks, filters, and tubing wear out over time and can affect how well therapy works. Most insurance plans cover replacements every 90 days." });
    if (tags.includes("cdl-driver")) raw.push({ key: "cdl-driver", icon: "/icons/brand/moon.png", label: "CDL driver", detail: "Commercial drivers with sleep apnea need to be tested and treated to meet FMCSA rules. We handle all the paperwork your medical examiner needs." });

    // Merge DB overrides when available
    return raw.map((s) => {
      const db = dbSignalMap?.[s.key];
      return db ? { ...s, label: db.label, detail: db.detail, icon: db.icon_path } : s;
    });
  }

  function getProductBullets(): string[] {
    if (isUndiagnosed) {
      if (tags.includes("cdl-driver")) return ["DOT-accepted testing that meets FMCSA requirements", "A sleep doctor reviews your results within 48 hours", "We prepare all the paperwork your medical examiner needs"];
      return ["An FDA-cleared device arrives at your door in 2 to 3 business days", "One night in your own bed — no clinic visit needed", "A board-certified sleep doctor reviews your results", "Book a sleep review call at no extra cost — included with your test"];
    }
    if (tags.includes("cpap-dropout") || tags.includes("cpap-struggling")) {
      return ["A consultation to find the right mask for you", "Pressure settings adjusted to match how you actually breathe", "Ongoing support through the Dumbo Health app", "Equipment and supplies delivered to your door"];
    }
    return ["CPAP supplies delivered every 90 days", "Regular check-ins with your care team", "Sleep coaching and progress tracking through the Dumbo Health app", "Dedicated care team available by message"];
  }

  const signals = getSignals();


  return (
    <div style={{ paddingBottom: 80 }}>
      <style>{`
        .results-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 860px) {
          .results-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
            align-items: start;
          }
        }
      `}</style>

      {/* ── HERO — full width ── */}
      <ResultBlock delay={0}>
        <div style={{ padding: "clamp(48px, 9vw, 88px) 24px clamp(36px, 7vw, 64px)", textAlign: "center", borderBottom: "1px solid rgba(3,31,61,0.06)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF8361", marginBottom: 20 }}>
              Your Results
            </p>
            <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 5.5vw, 3.25rem)", color: "#031F3D", lineHeight: 1.1, marginBottom: 20 }}>
              {hero?.title ?? "We\u2019ve reviewed your answers."}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.0625rem, 2.5vw, 1.25rem)", color: "rgba(3,31,61,0.6)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              {hero?.body ?? "Based on what you shared, here\u2019s what we recommend."}
            </p>
          </div>
        </div>
      </ResultBlock>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Insurance note ── */}
        {showInsuranceNote && (
          <ResultBlock delay={0.08}>
            <div style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "flex-start", backgroundColor: "rgba(120,191,188,0.08)", border: "1px solid rgba(120,191,188,0.25)", borderRadius: 16, padding: "16px 20px" }}>
              <span style={{ color: "#78BFBC", fontWeight: 700, fontSize: "1rem", flexShrink: 0, lineHeight: 1.5 }}>ⓘ</span>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.65, margin: 0 }}>
                We currently don&apos;t accept Medicare or Medicaid. All our plans are straightforward cash-pay — no surprise bills, no prior authorizations.
              </p>
            </div>
          </ResultBlock>
        )}

        {/* ── WAITLIST (out-of-state) ── */}
        {waitlist ? (
          <ResultBlock delay={0.15}>
            <div style={{ marginTop: 48, textAlign: "center", padding: "52px 36px", backgroundColor: "white", borderRadius: 28, boxShadow: "0 4px 32px rgba(3,31,61,0.07)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(120,191,188,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <img src="/icons/brand/moon.png" alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.875rem", color: "#031F3D", marginBottom: 14 }}>
                {waitlist.title}
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.65, maxWidth: 400, margin: "0 auto 32px" }}>
                {waitlist.body}
              </p>
              {waitlistSent ? (
                <p style={{ fontFamily: "var(--font-body)", color: "#78BFBC", fontWeight: 500, fontSize: "1rem" }}>
                  You&apos;re on the list \u2014 we&apos;ll reach out the moment we launch in your state.
                </p>
              ) : (
                <div style={{ display: "flex", gap: 8, maxWidth: 380, margin: "0 auto" }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    style={{ flex: 1, padding: "14px 18px", fontFamily: "var(--font-body)", fontSize: "1rem", border: "1.5px solid rgba(3,31,61,0.12)", borderRadius: 12, color: "#031F3D", backgroundColor: "white", outline: "none" }}
                  />
                  <button
                    onClick={() => waitlistEmail && setWaitlistSent(true)}
                    style={{ backgroundColor: "#FF8361", color: "white", border: "none", borderRadius: 12, padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, cursor: "pointer", flexShrink: 0 }}
                  >
                    Join
                  </button>
                </div>
              )}
            </div>
          </ResultBlock>
        ) : (
          <div style={{ marginTop: 48 }}>
            <div className="results-grid">

              {/* ═══ LEFT COLUMN — action ═══ */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* ── Recommendation card (FIRST) ── */}
                {product && (
                  <ResultBlock delay={0.2}>
                    <div style={{ backgroundColor: "#031F3D", borderRadius: 28, padding: "40px 36px 36px", color: "white" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,131,97,0.8)", marginBottom: 18 }}>
                        Recommended for you
                      </p>
                      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "white", lineHeight: 1.15, marginBottom: 14 }}>
                        {product.title}
                      </h2>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.3vw, 1.125rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 32 }}>
                        {product.body}
                      </p>
                      {product.cta_url === "shopify:sleep-test" ? (
                        <a data-shopify-checkout="sleep-test" style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "16px 36px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500, boxShadow: "0 8px 28px rgba(255,131,97,0.4)", cursor: "pointer" }}>
                          {product.cta_label ?? "Get started \u2192"}
                        </a>
                      ) : (
                        <Link href={product.cta_url ?? "/at-home-sleep-test"} style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "16px 36px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500, boxShadow: "0 8px 28px rgba(255,131,97,0.4)" }}>
                          {product.cta_label ?? "Get started \u2192"}
                        </Link>
                      )}
                    </div>
                  </ResultBlock>
                )}

                {/* ── Fallback CTA (no product) ── */}
                {!product && hero?.cta_label && (
                  <ResultBlock delay={0.2}>
                    <div>
                      {hero.cta_url === "shopify:sleep-test" ? (
                        <a data-shopify-checkout="sleep-test" style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "16px 40px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500, boxShadow: "0 4px 20px rgba(255,131,97,0.3)", cursor: "pointer" }}>
                          {hero.cta_label}
                        </a>
                      ) : (
                        <Link href={hero.cta_url ?? "/at-home-sleep-test"} style={{ display: "inline-block", backgroundColor: "#FF8361", color: "white", textDecoration: "none", borderRadius: 12, padding: "16px 40px", fontFamily: "var(--font-body)", fontSize: "1.0625rem", fontWeight: 500, boxShadow: "0 4px 20px rgba(255,131,97,0.3)" }}>
                          {hero.cta_label}
                        </Link>
                      )}
                    </div>
                  </ResultBlock>
                )}

                {/* ── What happens next (undiagnosed) ── */}
                {isUndiagnosed && (
                  <div>
                    <ResultBlock delay={0.5}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 22 }}>
                        Here&apos;s what happens next
                      </p>
                    </ResultBlock>
                    {(dbSteps ?? [
                      { step_order: 1, title: "We send your test kit", body: "An at-home sleep test kit arrives at your door in 2 to 3 business days. No clinic visit needed." },
                      { step_order: 2, title: "One night in your own bed", body: "Clip a small device to your finger before bed and sleep as usual. It records your breathing, oxygen levels, and heart rate overnight." },
                      { step_order: 3, title: "Book your sleep review call", body: "Once your results are ready, book a call with one of our sleep doctors to go through everything. Included — no extra cost." },
                    ] as DbStep[]).map((step, i) => (
                      <motion.div
                        key={step.step_order}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={t(0.55 + i * 0.15)}
                        style={{ display: "flex", gap: 20, marginBottom: 24 }}
                      >
                        <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: "rgba(255,131,97,0.1)", border: "1.5px solid rgba(255,131,97,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1rem", color: "#FF8361" }}>{step.step_order}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)", color: "#031F3D", marginBottom: 6 }}>{step.title}</p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.3vw, 1.125rem)", color: "rgba(3,31,61,0.55)", lineHeight: 1.65 }}>{step.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── Trust strip ── */}
                <ResultBlock delay={0.95}>
                  <div style={{ padding: "22px 24px", backgroundColor: "rgba(120,191,188,0.07)", border: "1px solid rgba(120,191,188,0.18)", borderRadius: 20, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {["Sleep physicians you can talk to", "FDA-cleared devices", "Insurance billing handled for you", "Your data is always private"].map((item) => (
                      <span key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.55)" }}>
                        <span style={{ color: "#78BFBC", fontWeight: 600 }}>✓</span>
                        {item}
                      </span>
                    ))}
                  </div>
                </ResultBlock>

              </div>

              {/* ═══ RIGHT COLUMN — evidence ═══ */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* ── Risk bar (undiagnosed) ── */}
                {isUndiagnosed && (
                  <ResultBlock delay={0.3}>
                    <div style={{ backgroundColor: "white", borderRadius: 24, padding: "32px 32px 28px", boxShadow: "0 2px 20px rgba(3,31,61,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)" }}>
                          Your risk level
                        </p>
                        <span style={{ backgroundColor: risk.color, color: "white", fontSize: "0.7rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20 }}>
                          {risk.label}
                        </span>
                      </div>
                      <div style={{ height: 8, backgroundColor: "rgba(3,31,61,0.06)", borderRadius: 4, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${risk.bar * 100}%` }}
                          transition={t(0.5, 0.9)}
                          style={{ height: "100%", backgroundColor: risk.color, borderRadius: 4 }}
                        />
                      </div>
                    </div>
                  </ResultBlock>
                )}

                {/* ── Narrative (diagnosed) ── */}
                {!isUndiagnosed && (
                  <ResultBlock delay={0.3}>
                    <div style={{ backgroundColor: "white", borderRadius: 24, padding: "32px 32px", boxShadow: "0 2px 20px rgba(3,31,61,0.06)" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 16 }}>
                        Where you are right now
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)", color: "rgba(3,31,61,0.65)", lineHeight: 1.75 }}>
                        {getNarrative()}
                      </p>
                    </div>
                  </ResultBlock>
                )}

                {/* ── Key signals ── */}
                {signals.length > 0 && (
                  <div>
                    <ResultBlock delay={0.35}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(3,31,61,0.35)", marginBottom: 16 }}>
                        What stood out in your answers
                      </p>
                    </ResultBlock>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {signals.map((signal, i) => {
                        const isOpen = openSignal === signal.label;
                        return (
                          <motion.div
                            key={signal.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={t(0.4 + i * 0.1)}
                            style={{ backgroundColor: "white", border: `1px solid ${isOpen ? "rgba(3,31,61,0.12)" : "rgba(3,31,61,0.07)"}`, borderRadius: 16, overflow: "hidden" }}
                          >
                            <button
                              onClick={() => setOpenSignal(isOpen ? null : signal.label)}
                              style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                            >
                              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#FCF6ED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <img src={signal.icon} alt="" style={{ width: 20, height: 20, objectFit: "contain", opacity: 0.85 }} />
                              </div>
                              <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "clamp(1rem, 1.4vw, 1.125rem)", color: "#031F3D", flex: 1, margin: 0 }}>{signal.label}</p>
                              <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                style={{ color: "rgba(3,31,61,0.5)", flexShrink: 0, display: "flex", alignItems: "center" }}
                              >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.9375rem, 1.25vw, 1.0625rem)", color: "rgba(3,31,61,0.55)", lineHeight: 1.65, padding: "0 20px 18px 72px" }}>
                                    {signal.detail}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Narrative (undiagnosed — after signals) ── */}
                {isUndiagnosed && (
                  <ResultBlock delay={0.4 + signals.length * 0.1 + 0.15}>
                    <div style={{ backgroundColor: "rgba(3,31,61,0.02)", borderRadius: 20, padding: "24px 28px", border: "1px solid rgba(3,31,61,0.06)" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.75 }}>
                        {getNarrative()}
                      </p>
                    </div>
                  </ResultBlock>
                )}

              </div>
            </div>

            {/* ── Full journey (undiagnosed only) ── */}
            {isUndiagnosed && <FullJourneySection />}

            {/* ── Back link ── */}
            <ResultBlock delay={1.1}>
              <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(3,31,61,0.07)", textAlign: "center" }}>
                <Link href="/" style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.35)", textDecoration: "none" }}>
                  \u2190 Back to Dumbo Health
                </Link>
              </div>
            </ResultBlock>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Main quiz page ─────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [flowSlug, setFlowSlug] = useState<string | null>(null);
  const [shownInterstitials, setShownInterstitials] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmitted = useRef(false);
  const [activeReflection, setActiveReflection] = useState<ReflectionMoment | null>(null);
  const [pendingAnswer, setPendingAnswer] = useState<{ answer: string | string[] } | null>(null);
  const [shownJourneyBridge, setShownJourneyBridge] = useState(false);

  const quiz = useQuiz(flowSlug ?? "undiagnosed");

  const shouldShowInterstitial =
    quiz.isNewSection &&
    !!quiz.currentSection?.subtitle &&
    !shownInterstitials.has(quiz.currentSection?.id ?? "");

  function handleFlowSelect(slug: string) {
    setFlowSlug(slug);
    setShownInterstitials(new Set());
  }

  function handleInterstitialContinue() {
    if (quiz.currentSection) {
      setShownInterstitials((prev) => new Set([...prev, quiz.currentSection!.id]));
    }
  }

  function handleAnswer(answer: string | string[]) {
    const reflection = getReflectionTrigger(quiz.currentQuestion?.slug, answer);
    if (reflection && !shownInterstitials.has(reflection.id)) {
      setPendingAnswer({ answer });
      setActiveReflection(reflection);
    } else {
      quiz.answerQuestion(answer);
    }
  }

  function handleReflectionContinue() {
    if (pendingAnswer) {
      quiz.answerQuestion(pendingAnswer.answer);
      setPendingAnswer(null);
    }
    if (activeReflection) {
      setShownInterstitials((prev) => new Set([...prev, activeReflection.id]));
    }
    setActiveReflection(null);
  }

  async function handleSubmit() {
    if (isSubmitting || hasSubmitted.current) return;
    hasSubmitted.current = true;
    setIsSubmitting(true);
    await quiz.submitResults();
    setIsSubmitting(false);
  }

  // Visible question number (exclude skipped questions from count)
  const visibleQuestions = quiz.state.questions.filter((q) => {
    const section = quiz.state.sections.find((s) => s.id === q.section_id);
    return !section || !quiz.state.skippedSections.includes(section.slug);
  });
  const questionNumber = visibleQuestions.findIndex((q) => q.id === quiz.currentQuestion?.id) + 1;

  const isGradientActive = !!(activeReflection || shouldShowInterstitial);
  const shouldShowJourneyBridge =
    flowSlug === "undiagnosed" &&
    !quiz.state.isLoading &&
    !quiz.state.isComplete &&
    !activeReflection &&
    !shouldShowInterstitial &&
    quiz.currentQuestion?.answer_type === "text_input" &&
    !shownJourneyBridge;

  return (
    <>
      {/* Make body transparent so the gradient shows through */}
      <style>{`body { background: transparent !important; }`}</style>

      {/* Persistent animated gradient — always present, warms as quiz progresses */}
      <AnimatedGradientBg progress={quiz.progress} />

      {/* Progress bar + minimal header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 68, zIndex: 50,
        backgroundColor: "rgba(252,246,237,0.75)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(245,230,209,0.7)",
      }}>
        {/* Progress bar */}
        {flowSlug && !quiz.state.isComplete && (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "rgba(3,31,61,0.06)" }}>
            <motion.div
              animate={{ width: `${quiz.progress}%` }}
              transition={t(0, 0.5)}
              style={{ height: "100%", backgroundColor: "#FF8361", borderRadius: "0 2px 2px 0" }}
            />
          </div>
        )}
        {/* Logo */}
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link href="/" style={{ opacity: 0.85 }}>
            <Image src="/logos/wordmark-midnight.svg" alt="Dumbo Health" width={188} height={38} priority />
          </Link>
        </div>
      </header>

      {/* Main content — above gradient layer */}
      <div style={{ paddingTop: 68, position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {!flowSlug && (
            <motion.div key="splitter" {...screen}>
              <FlowSplitter onSelect={handleFlowSelect} />
            </motion.div>
          )}

          {flowSlug && quiz.state.isLoading && !quiz.state.isComplete && (
            <motion.div key="loading" {...screen}>
              <LoadingSkeleton />
            </motion.div>
          )}

          {flowSlug && quiz.state.isComplete && (
            <motion.div key="results" {...screen}>
              <ResultsPage
                results={quiz.getResults()}
                riskScore={quiz.state.riskScore}
                tags={quiz.state.tags}
                flowSlug={quiz.state.flowSlug}
                answers={quiz.state.answers}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && !quiz.state.isComplete && activeReflection && (
            <motion.div key={`reflection-${activeReflection.id}`} {...screen}>
              <ReflectionScreen moment={activeReflection} onContinue={handleReflectionContinue} />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && !quiz.state.isComplete && !activeReflection && shouldShowInterstitial && quiz.currentSection?.subtitle && (
            <motion.div key={`interstitial-${quiz.currentSection.id}`} {...screen}>
              <SectionInterstitial
                title={quiz.currentSection.title}
                subtitle={quiz.currentSection.subtitle}
                sectionSlug={quiz.currentSection.slug}
                onContinue={handleInterstitialContinue}
              />
            </motion.div>
          )}

          {shouldShowJourneyBridge && (
            <motion.div key="journey-bridge" {...screen}>
              <JourneyBridgeScreen onContinue={() => setShownJourneyBridge(true)} />
            </motion.div>
          )}

          {flowSlug && !quiz.state.isLoading && !quiz.state.isComplete && !activeReflection && !shouldShowInterstitial && !shouldShowJourneyBridge && quiz.currentQuestion && (
            <motion.div key={quiz.currentQuestion.id} {...screen}>
              <QuestionCard
                question={quiz.currentQuestion}
                currentAnswer={quiz.state.answers[quiz.currentQuestion.slug]}
                onAnswer={handleAnswer}
                onBack={quiz.goBack}
                questionNumber={questionNumber}
                totalQuestions={visibleQuestions.length}
                canGoBack={quiz.state.currentQuestionIndex > 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skeleton pulse animation */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .journey-phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 720px) { .journey-phases { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
