"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SHOPIFY, APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Inline SVG icons (brand line style, 20×20 viewport) ─────────────────────

function IconFace() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  );
}

function IconWind() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Section 1: The Hook ──────────────────────────────────────────────────────

function TheHook() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,131,97,0.14) 0%, transparent 62%), radial-gradient(ellipse 120% 45% at 50% 108%, rgba(245,230,209,0.85) 0%, transparent 68%)",
        backgroundColor: "#FCF6ED",
        isolation: "isolate",
      }}
    >
      {/* Brand pattern — side texture only, center stays clean */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.45,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
        }}
      />

      <div style={{ padding: "0 5%" }} className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono uppercase tracking-widest mb-6"
          style={{ fontSize: "0.75rem", color: "#78BFBC" }}
        >
          Sleep Apnea — A Guide
        </motion.p>

        <h1
          className="font-heading font-medium text-midnight text-balance mx-auto"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
            lineHeight: 1.08,
            maxWidth: "880px",
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            You&apos;re exhausted. You sleep.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          >
            And somehow you&apos;re{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.46, ease: EASE }}
              style={{ color: "#FF8361", display: "inline-block" }}
            >
              still tired.
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
          className="font-body mx-auto mt-7 text-pretty"
          style={{
            fontSize: "clamp(1.1rem, 1.8vw, 1.25rem)",
            maxWidth: "48ch",
            color: "rgba(3,31,61,0.68)",
            lineHeight: 1.72,
          }}
        >
          If you wake up more drained than when you went to bed, there&apos;s a
          reason, and it&apos;s not you. This guide walks you through exactly
          what&apos;s going on and what to do about it.
        </motion.p>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {["80M Americans affected", "80% undiagnosed", "Treatable in days"].map(
            (chip) => (
              <span
                key={chip}
                className="font-mono uppercase tracking-wider"
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(3,31,61,0.5)",
                  backgroundColor: "rgba(3,31,61,0.055)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  border: "1px solid rgba(3,31,61,0.08)",
                }}
              >
                {chip}
              </span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <div
            className="flex flex-col items-center gap-2"
            style={{ color: "rgba(3,31,61,0.28)" }}
          >
            <span className="font-mono text-xs uppercase tracking-widest">
              Keep reading
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <path
                  d="M8 4v16M2 14l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 2: What Is Sleep Apnea ──────────────────────────────────────────
// Equal columns. Text column is tighter so paragraphs wrap more and read better.

function WhatIsSleepApnea() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Warm ambient radials — follows FunnelSelector formula */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 5% 10%, rgba(255,214,173,0.55) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 95% 90%, rgba(120,191,188,0.20) 0%, transparent 55%)",
        }}
      />

      <div style={{ padding: "0 5%" }} className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: "0.75rem", color: "#78BFBC" }}
              >
                Act 1 — Understanding the condition
              </p>
              <h2
                className="font-heading font-medium text-midnight text-balance"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1.08 }}
              >
                What&apos;s actually happening while you sleep
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p
                className="font-body mt-6 text-pretty"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.8,
                  color: "rgba(3,31,61,0.80)",
                }}
              >
                When you have sleep apnea, your airway collapses while you
                sleep. Your brain notices you&apos;ve stopped breathing and
                wakes you up, just enough to start again. You never remember
                it. But it can happen dozens of times every hour, all night
                long.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <blockquote
                className="font-heading font-medium my-10 pl-6 text-balance"
                style={{
                  borderLeft: "4px solid #FF8361",
                  fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)",
                  color: "#031F3D",
                  lineHeight: 1.35,
                }}
              >
                Your body isn&apos;t failing to sleep. It&apos;s constantly
                being pulled out of it.
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h3
                className="font-heading font-medium text-midnight mt-8 mb-3"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.35rem)" }}
              >
                Why you still feel exhausted in the morning
              </h3>
              <p
                className="font-body text-pretty"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.8,
                  color: "rgba(3,31,61,0.80)",
                }}
              >
                Each wake-up is too brief for you to notice. Your brain handles
                the emergency, then tries to get back to sleep right away. This
                goes on all night. The result is a night that looks like sleep
                but never gives your body the deep rest it needs to recover.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h3
                className="font-heading font-medium text-midnight mt-8 mb-3"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.35rem)" }}
              >
                Who it affects
              </h3>
              <p
                className="font-body text-pretty"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.8,
                  color: "rgba(3,31,61,0.80)",
                }}
              >
                More people than you&apos;d think. Over 80 million Americans
                have sleep apnea, and most of them have no idea. It affects
                men and women, all body types, and every age group. The tired,
                snoring stereotype? That&apos;s only part of the story.
              </p>

              {/* Stat callout */}
              <div
                className="mt-8 inline-flex gap-8 rounded-2xl px-7 py-5"
                style={{
                  backgroundColor: "rgba(255,131,97,0.1)",
                  border: "1px solid rgba(255,131,97,0.2)",
                }}
              >
                <div>
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
                  >
                    80M
                  </p>
                  <p
                    className="font-mono uppercase tracking-widest mt-1"
                    style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.55)" }}
                  >
                    Americans affected
                  </p>
                </div>
                <div
                  style={{ width: "1px", backgroundColor: "rgba(255,131,97,0.25)" }}
                />
                <div>
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
                  >
                    80%
                  </p>
                  <p
                    className="font-mono uppercase tracking-widest mt-1"
                    style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.55)" }}
                  >
                    Undiagnosed
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image column — hidden on mobile, sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="hidden lg:block lg:sticky lg:top-24"
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "1/1",
                boxShadow: "0 24px 64px rgba(3,31,61,0.14)",
              }}
            >
              <Image
                src="/images/people/man-waking-up.png"
                alt="Man waking up refreshed"
                fill
                className="object-cover"
                sizes="45vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Why It Matters ────────────────────────────────────────────────

function WhyItMatters() {
  const items = [
    {
      Icon: IconFace,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      label: "Mood and patience",
      text: "The irritability, the short fuse, the low tolerance. Sleep deprivation compresses your emotional range. Small things feel big.",
    },
    {
      Icon: IconEye,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      label: "Focus and memory",
      text: "Your brain files away memories and learning while you sleep deeply. Without that, your focus and concentration drop noticeably.",
    },
    {
      Icon: IconHeart,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      label: "Heart and metabolism",
      text: "When your oxygen dips overnight again and again, it puts real strain on your heart and throws off your hormones.",
    },
    {
      Icon: IconBolt,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      label: "Energy and motivation",
      text: "The afternoon wall. The coffee you need just to function. The feeling that getting through the day is work, not just life.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Bottom fade — bleeds Daylight into Midnight without a wave shape */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(3,31,61,0.04) 100%)",
        }}
      />

      <div style={{ padding: "0 5%" }} className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

          {/* Left — narrative, sticky */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-24"
          >
            <p
              className="font-mono uppercase tracking-widest mb-4"
              style={{ fontSize: "0.75rem", color: "#78BFBC" }}
            >
              The ripple effect
            </p>
            <h2
              className="font-heading font-medium text-midnight text-balance"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1.1 }}
            >
              This is what&apos;s been running your life
            </h2>
            <p
              className="font-body mt-5 text-pretty"
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.8,
                color: "rgba(3,31,61,0.78)",
              }}
            >
              It&apos;s not laziness. It&apos;s not aging. It&apos;s a
              breathing problem, and it&apos;s been quietly affecting
              everything.
            </p>

            {/* Teal callout */}
            <div
              className="mt-8 rounded-2xl p-7"
              style={{
                backgroundColor: "rgba(120,191,188,0.1)",
                borderLeft: "4px solid #78BFBC",
              }}
            >
              <p
                className="font-heading font-medium text-balance"
                style={{
                  fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)",
                  color: "#031F3D",
                  lineHeight: 1.35,
                }}
              >
                &ldquo;I thought I was just a bad sleeper. Turns out I
                wasn&apos;t sleeping at all.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — flat item list, no card containers */}
          <div style={{ borderTop: "1px solid rgba(3,31,61,0.08)" }}>
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="flex items-start gap-5 py-7"
                style={{ borderBottom: "1px solid rgba(3,31,61,0.08)" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: item.iconBg,
                    color: item.iconColor,
                  }}
                >
                  <item.Icon />
                </div>
                <div>
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.3,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-body text-pretty"
                    style={{
                      fontSize: "1.125rem",
                      color: "rgba(3,31,61,0.75)",
                      lineHeight: 1.72,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: How It's Found ────────────────────────────────────────────────
// Midnight — the diagnosis moment is dramatic. Lifeline SVG for brand depth.

function HowItFound() {
  const steps = [
    {
      n: "01",
      Icon: IconBag,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.2)",
      title: "Order your test online",
      body: "No referral needed. No waiting room. Select a test, answer a few questions, and it ships to your door the next business day.",
    },
    {
      n: "02",
      Icon: IconMoon,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.18)",
      title: "Wear a small device one night",
      body: "A compact sensor clips to your finger and chest. Sleep in your own bed, in your normal routine. The device does the rest.",
    },
    {
      n: "03",
      Icon: IconDoc,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.2)",
      title: "Doctor-reviewed results in days",
      body: "A licensed sleep physician reviews your data and sends a detailed report. If sleep apnea is present, your prescription is included.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline — brand sleep-cycle wave, same treatment as FounderStory */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.1, zIndex: 0 }}
      />

      <div className="relative" style={{ padding: "0 5%", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p
            className="font-mono uppercase tracking-widest mb-4"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Act 2 — Finding out
          </p>
          <h2
            className="font-heading font-medium text-balance mx-auto"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
              lineHeight: 1.1,
              maxWidth: "720px",
              color: "#FCF6ED",
            }}
          >
            Getting diagnosed is easier than you think
          </h2>
          <p
            className="font-body mt-5 mx-auto text-pretty"
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(252,246,237,0.72)",
            }}
          >
            Sleep apnea is one of the most treatable conditions there is. And
            finding out takes just one night at home.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="flex flex-col gap-5 rounded-2xl p-8 h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-heading font-medium"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                      color: "rgba(255,131,97,0.42)",
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </span>
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: step.iconBg,
                      color: step.iconColor,
                    }}
                  >
                    <step.Icon />
                  </div>
                </div>
                <h3
                  className="font-heading font-medium"
                  style={{
                    fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                    color: "#FCF6ED",
                    lineHeight: 1.25,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-pretty"
                  style={{
                    fontSize: "1.125rem",
                    color: "rgba(252,246,237,0.76)",
                    lineHeight: 1.78,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p
            className="font-body text-center mt-10"
            style={{ fontSize: "0.9375rem", color: "rgba(252,246,237,0.32)" }}
          >
            No sleep clinic &middot; No waiting room &middot; No overnight away from home
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: Treatment ─────────────────────────────────────────────────────
// Two treatments only. White cards on Daylight.

function TreatmentDumboSurfaces() {
  const treatments = [
    {
      Icon: IconWind,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      badge: "Most prescribed",
      badgeColor: "#78BFBC",
      badgeBg: "rgba(120,191,188,0.15)",
      deliveryBg: "rgba(120,191,188,0.12)",
      name: "CPAP therapy",
      description:
        "CPAP (continuous positive airway pressure) is a small bedside device that delivers a gentle, steady stream of air through a mask while you sleep. It keeps your airway open all night. It&apos;s the most effective treatment for moderate-to-severe sleep apnea, and most people feel the difference quickly.",
      dumbo:
        "We ship your CPAP with same-week setup support, ongoing telehealth check-ins, and automatic resupply so you never run out of supplies.",
    },
    {
      Icon: IconShield,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      badge: "No machine needed",
      badgeColor: "#FF8361",
      badgeBg: "rgba(255,131,97,0.1)",
      deliveryBg: "rgba(255,131,97,0.08)",
      name: "Oral appliance",
      description:
        "An oral appliance is a custom-fitted device you wear in your mouth at night. It gently moves your jaw forward just enough to keep your airway open. It&apos;s a great fit for mild-to-moderate sleep apnea and for people who travel or find CPAP uncomfortable.",
      dumbo:
        "We coordinate your fitting with a network of trained dentists and manage the prescription side so you don&apos;t have to navigate it alone.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#FCF6ED" }}>
      {/* Top shadow bleed — acknowledges transition from Midnight without a wave shape */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{ height: "120px", background: "linear-gradient(to bottom, rgba(3,31,61,0.06) 0%, transparent 100%)" }}
      />
      <div style={{ padding: "0 5%" }} className="relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p
            className="font-mono uppercase tracking-widest mb-4"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Treatment
          </p>
          <h2
            className="font-heading font-medium text-midnight text-balance mx-auto"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
              lineHeight: 1.1,
              maxWidth: "680px",
            }}
          >
            Proven ways to treat sleep apnea.{" "}
            <span style={{ color: "#FF8361" }}>
              We&apos;ve made every one easier to access.
            </span>
          </h2>
          <p
            className="font-body mt-5 mx-auto text-pretty"
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.72)",
            }}
          >
            At Dumbo Health, this is exactly what we built for. Every option
            below, we handle the prescription, the delivery, and the follow-up.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="flex flex-col gap-6 rounded-2xl p-9 h-full"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(3,31,61,0.1)",
                  boxShadow: "0 4px 32px rgba(3,31,61,0.06)",
                }}
              >
                {/* Badge + icon row */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: 52,
                      height: 52,
                      backgroundColor: t.iconBg,
                      color: t.iconColor,
                    }}
                  >
                    <t.Icon />
                  </div>
                  <span
                    className="font-mono uppercase tracking-wider"
                    style={{
                      fontSize: "0.68rem",
                      color: t.badgeColor,
                      backgroundColor: t.badgeBg,
                      padding: "5px 12px",
                      borderRadius: "100px",
                    }}
                  >
                    {t.badge}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-heading font-medium text-midnight"
                  style={{
                    fontSize: "clamp(1.7rem, 2.8vw, 2.2rem)",
                    lineHeight: 1.15,
                  }}
                >
                  {t.name}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-pretty"
                  style={{
                    fontSize: "1.125rem",
                    color: "rgba(3,31,61,0.75)",
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: t.description }}
                />

                {/* Dumbo delivery block */}
                <div
                  className="mt-auto rounded-xl p-6"
                  style={{ backgroundColor: t.deliveryBg }}
                >
                  <p
                    className="font-mono uppercase tracking-widest mb-2"
                    style={{ fontSize: "0.75rem", color: t.iconColor }}
                  >
                    How Dumbo Health delivers this
                  </p>
                  <p
                    className="font-body text-pretty"
                    style={{
                      fontSize: "1rem",
                      color: "rgba(3,31,61,0.75)",
                      lineHeight: 1.75,
                    }}
                    dangerouslySetInnerHTML={{ __html: t.dumbo }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Conversion Fork ──────────────────────────────────────────────
// Midnight close — seen → belonging → solvable → one clear step.

function ConversionFork() {
  const photos = [
    { src: "/images/people/man-waking-up.png", alt: "Man waking up energized" },
    { src: "/images/people/couple-in-bed.png", alt: "Couple sleeping peacefully together" },
    { src: "/images/people/man-drinking-coffee.png", alt: "Man enjoying his morning" },
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: "#031F3D", isolation: "isolate" }}
    >
      {/* Lifeline — brand sleep-cycle wave */}
      <img
        src="/uploads/Vector-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ top: "50%", transform: "translateY(-50%)", opacity: 0.06, zIndex: 0 }}
      />
      {/* Brand pattern — side texture only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: 0.08,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 8%, transparent 25%, transparent 75%, black 92%, black 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%", zIndex: 1 }}>
        {/* Recognition opening */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Your next step
          </p>
          <h2
            className="font-heading font-medium text-balance mx-auto"
            style={{
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: 1.08,
              color: "#FCF6ED",
              maxWidth: "720px",
            }}
          >
            The hard part was not knowing.{" "}
            <span style={{ color: "#FF8361" }}>Now you do.</span>
          </h2>
          <p
            className="font-body mt-5 mx-auto text-pretty"
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.8,
              color: "rgba(252,246,237,0.64)",
              maxWidth: "48ch",
            }}
          >
            Every person below started exactly where you are. One step changed
            everything. It can for you too.
          </p>
        </motion.div>

        {/* Photo strip — the after-state */}
        <div
          className="grid grid-cols-3 gap-4 mb-16"
          style={{ maxWidth: "960px", margin: "0 auto 4rem" }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.13, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3/4" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "45%",
                  background:
                    "linear-gradient(to top, rgba(3,31,61,0.65) 0%, transparent 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Testimonial — earns the CTA before it arrives */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
          style={{ maxWidth: "560px", margin: "0 auto 3.5rem" }}
        >
          <div className="mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: "#FF8361", fontSize: "1rem", marginRight: "2px" }}>
                ★
              </span>
            ))}
          </div>
          <p
            className="font-body text-pretty"
            style={{
              fontSize: "1.25rem",
              color: "rgba(252,246,237,0.82)",
              lineHeight: 1.78,
              fontStyle: "italic",
            }}
          >
            &ldquo;I took the test on a Tuesday. Had my results by Thursday.
            Started treatment the following week. I had no idea how much
            better I could feel.&rdquo;
          </p>
          <p
            className="font-mono text-xs mt-4 uppercase tracking-widest"
            style={{ color: "rgba(252,246,237,0.38)" }}
          >
            Maria S., 41, Miami, FL
          </p>
        </motion.div>

        {/* Single primary CTA — white card on Midnight */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ maxWidth: "520px", margin: "0 auto" }}
        >
          <div
            className="rounded-2xl p-10 flex flex-col gap-6"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 16px 64px rgba(3,31,61,0.5)",
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "#78BFBC" }}
            >
              I haven&apos;t been diagnosed yet
            </p>
            <h3
              className="font-heading font-medium text-balance"
              style={{
                fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)",
                lineHeight: 1.12,
                color: "#031F3D",
              }}
            >
              Start with a home sleep test.
              <br />Results in days, not months.
            </h3>
            <p
              className="font-body text-pretty"
              style={{
                fontSize: "1.125rem",
                color: "rgba(3,31,61,0.70)",
                lineHeight: 1.78,
              }}
            >
              One night in your own bed. A small sensor. Doctor-reviewed
              results, and a prescription if sleep apnea is found. All for
              $149. No waiting rooms. No referrals.
            </p>
            <Link
              href={SHOPIFY.buyUrl}
              className="inline-flex items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              style={{
                height: "52px",
                backgroundColor: "#FF8361",
                color: "#fff",
                boxShadow: "0 6px 24px rgba(255,131,97,0.45)",
              }}
            >
              Order your test · $149
            </Link>
            <p
              className="font-body text-xs text-center"
              style={{ color: "rgba(3,31,61,0.32)" }}
            >
              FDA-cleared &middot; Ships next business day &middot; No insurance required
            </p>
          </div>

          {/* Quiet secondary path */}
          <p
            className="text-center mt-7 font-body"
            style={{ fontSize: "0.9375rem", color: "rgba(252,246,237,0.42)" }}
          >
            Already diagnosed?{" "}
            <Link
              href={APP_URL}
              className="underline underline-offset-2 transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(252,246,237,0.62)" }}
            >
              Start your treatment with Dumbo Health
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FactsContent() {
  return (
    <>
      <Navbar />
      <main>
        <TheHook />
        <WhatIsSleepApnea />
        <WhyItMatters />
        <HowItFound />
        <TreatmentDumboSurfaces />
        <ConversionFork />
      </main>
      <Footer />
    </>
  );
}
