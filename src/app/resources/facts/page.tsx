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

function IconPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3" />
      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
    </svg>
  );
}

// ─── Section 1: The Hook ──────────────────────────────────────────────────────

function TheHook() {
  return (
    <section
      className="pt-28 pb-24 md:pt-36 md:pb-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,131,97,0.07) 0%, transparent 65%)",
        backgroundColor: "#FCF6ED",
      }}
    >
      <div style={{ padding: "0 5%" }} className="text-center">
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
          className="font-body mx-auto mt-7 text-balance"
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
            maxWidth: "52ch",
            color: "rgba(3,31,61,0.58)",
            lineHeight: 1.72,
          }}
        >
          If you wake up more drained than when you went to bed, there&apos;s a
          reason. And it&apos;s not you. This guide will walk you through
          exactly what&apos;s going on and what to do about it.
        </motion.p>

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

function WhatIsSleepApnea() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F5E6D1" }}>
      <div style={{ padding: "0 5%" }}>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
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
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                What&apos;s actually happening when you sleep
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <p
                className="font-body mt-6"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.78,
                  color: "rgba(3,31,61,0.62)",
                }}
              >
                Sleep apnea is a condition where your airway partially or
                completely collapses while you sleep. Every time this happens,
                your brain has to wake you up — just enough to get you
                breathing again. You never remember these moments. But they can
                happen dozens of times every hour, all night long.
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
                  fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
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
                style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.3rem)" }}
              >
                Why your body doesn&apos;t just wake you up
              </h3>
              <p
                className="font-body"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.78,
                  color: "rgba(3,31,61,0.62)",
                }}
              >
                These micro-arousals are too brief to register as being awake.
                Your brain deals with the emergency and immediately tries to
                return to sleep. The result: you spend the whole night in
                shallow, broken rest — never reaching the deep stages where
                your body actually recovers.
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
                style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.3rem)" }}
              >
                Who it affects
              </h3>
              <p
                className="font-body"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.78,
                  color: "rgba(3,31,61,0.62)",
                }}
              >
                More people than you&apos;d think. Over 30 million Americans
                have sleep apnea — and most don&apos;t know it. It affects men
                and women, people at every weight, and every age group. The
                image of the overweight, middle-aged man who snores? That&apos;s
                a fraction of the picture.
              </p>
            </motion.div>
          </div>

          {/* Image column — sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 24px 64px rgba(3,31,61,0.12)",
              }}
            >
              <Image
                src="/images/people/man-smiling-in-bed-1.png"
                alt="Person resting well"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
      text: "The irritability, the short fuse, the low tolerance. Sleep deprivation compresses your emotional range.",
    },
    {
      Icon: IconEye,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      label: "Focus and memory",
      text: "Your brain consolidates learning during deep sleep. Without it, retention and concentration drop measurably.",
    },
    {
      Icon: IconHeart,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      label: "Heart and metabolism",
      text: "Repeated oxygen drops overnight put sustained stress on your cardiovascular system and hormone regulation.",
    },
    {
      Icon: IconBolt,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      label: "Energy and motivation",
      text: "The afternoon wall. The coffee dependency. The feeling that getting through the day is an effort rather than a given.",
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#FCF6ED" }}>
      <div style={{ padding: "0 5%" }}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

          {/* Left — narrative */}
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
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
            >
              This is what&apos;s been running your life
            </h2>
            <p
              className="font-body mt-5"
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.78,
                color: "rgba(3,31,61,0.62)",
                maxWidth: "48ch",
              }}
            >
              It&apos;s not laziness. It&apos;s not aging. It&apos;s a breathing
              problem — and it&apos;s been quietly affecting everything.
            </p>

            {/* Teal callout — emotional peak */}
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
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "#031F3D",
                  lineHeight: 1.35,
                }}
              >
                &ldquo;I thought I was just a bad sleeper. Turns out I
                wasn&apos;t sleeping at all.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — effect cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div
                  className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 16px rgba(3,31,61,0.06)",
                    border: "1px solid rgba(3,31,61,0.05)",
                  }}
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
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{ fontSize: "1rem", lineHeight: 1.3 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.9375rem",
                      color: "rgba(3,31,61,0.55)",
                      lineHeight: 1.68,
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

function HowItFound() {
  const steps = [
    {
      n: "01",
      Icon: IconBag,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      title: "Order your test online",
      body: "No referral needed. No waiting room. Select a test, complete a short intake, and it ships to your door the next business day.",
    },
    {
      n: "02",
      Icon: IconMoon,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      title: "Wear a small device one night",
      body: "A compact sensor clips to your finger and chest. Sleep in your own bed, in your normal routine. The device does the rest.",
    },
    {
      n: "03",
      Icon: IconDoc,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      title: "Doctor-reviewed results in days",
      body: "A licensed sleep physician reviews your data and sends a detailed report. If sleep apnea is present, your prescription is included.",
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F5E6D1" }}>
      <div style={{ padding: "0 5%" }}>
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
            className="font-heading font-medium text-midnight text-balance mx-auto"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "600px" }}
          >
            Getting diagnosed is easier than you think
          </h2>
          <p
            className="font-body mt-5 mx-auto"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.78,
              color: "rgba(3,31,61,0.58)",
              maxWidth: "50ch",
            }}
          >
            Sleep apnea is one of the most treatable conditions there is. And
            finding out takes one night.
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
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 16px rgba(3,31,61,0.06)",
                  border: "1px solid rgba(3,31,61,0.05)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-heading font-medium"
                    style={{ fontSize: "2.5rem", color: "rgba(255,131,97,0.22)", lineHeight: 1 }}
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
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(3,31,61,0.55)",
                    lineHeight: 1.72,
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
            style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.38)" }}
          >
            No sleep clinic &middot; No waiting room &middot; No overnight away from home
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: Treatment + Dumbo Health ─────────────────────────────────────

function TreatmentDumboSurfaces() {
  const treatments = [
    {
      Icon: IconWind,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      name: "CPAP therapy",
      description:
        "A continuous airflow device that gently keeps your airway open while you sleep. The most effective treatment for moderate-to-severe sleep apnea.",
      dumbo:
        "We ship your CPAP with same-week setup support, ongoing telehealth check-ins, and automatic resupply so you never run out of supplies.",
    },
    {
      Icon: IconShield,
      iconColor: "#FF8361",
      iconBg: "rgba(255,131,97,0.12)",
      name: "Dental appliance",
      description:
        "A custom-fitted mouthguard that repositions your jaw during sleep to prevent airway collapse. Effective for mild-to-moderate apnea, and travel-friendly.",
      dumbo:
        "We coordinate your fitting with a network of trained dentists and manage the prescription side so you don't have to navigate it alone.",
    },
    {
      Icon: IconPerson,
      iconColor: "#78BFBC",
      iconBg: "rgba(120,191,188,0.15)",
      name: "Positional therapy",
      description:
        "For some people, sleep apnea only occurs when lying on the back. Positional devices or techniques can dramatically reduce events without equipment.",
      dumbo:
        "Our physicians assess whether positional therapy is appropriate for you and include it in a broader treatment plan when relevant.",
    },
  ];

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#F5E6D1" }}>
      <div style={{ padding: "0 5%" }}>
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
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "680px" }}
          >
            There are proven ways to treat sleep apnea.{" "}
            <span style={{ color: "#FF8361" }}>
              We&apos;ve made all of them easier to access.
            </span>
          </h2>
          <p
            className="font-body mt-5 mx-auto"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.78,
              color: "rgba(3,31,61,0.58)",
              maxWidth: "52ch",
            }}
          >
            At Dumbo Health, this is exactly what we built for. Every treatment
            option below — we handle the prescription, the delivery, and the
            follow-up.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="flex flex-col gap-4 rounded-2xl p-8 h-full"
                style={{ backgroundColor: "#FFD6AD" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: t.iconBg,
                    color: t.iconColor,
                  }}
                >
                  <t.Icon />
                </div>
                <h3
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                >
                  {t.name}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(3,31,61,0.62)",
                    lineHeight: 1.72,
                  }}
                >
                  {t.description}
                </p>
                <div
                  className="mt-auto pt-5"
                  style={{ borderTop: "1px solid rgba(3,31,61,0.14)" }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "#FF8361" }}
                  >
                    How Dumbo Health delivers this
                  </p>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(3,31,61,0.58)",
                      lineHeight: 1.68,
                    }}
                  >
                    {t.dumbo}
                  </p>
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
// Midnight background — mirrors HowItWorks dark section, creates strong visual close

function ConversionFork() {
  return (
    <section className="py-20 md:py-32 overflow-hidden" style={{ backgroundColor: "#031F3D" }}>
      <div style={{ padding: "0 5%" }}>
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
            Act 3 — Your next step
          </p>
          <h2
            className="font-heading font-medium text-white text-balance mx-auto"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "640px" }}
          >
            Ready to find out?
          </h2>
          <p
            className="font-body mt-4 mx-auto"
            style={{
              fontSize: "1.0625rem",
              color: "rgba(252,246,237,0.55)",
              maxWidth: "46ch",
              lineHeight: 1.72,
            }}
          >
            Pick the step that&apos;s right for you. Both paths lead to the same place: better sleep.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" style={{ maxWidth: "880px", margin: "0 auto" }}>
          {/* Primary — undiagnosed */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              className="flex flex-col gap-5 rounded-2xl p-10 h-full"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 8px 48px rgba(0,0,0,0.28)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#FF8361" }}
              >
                I haven&apos;t been diagnosed yet
              </p>
              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)", lineHeight: 1.15 }}
              >
                Take a home sleep test.
                <br />Results in days.
              </h3>
              <p
                className="font-body"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(3,31,61,0.58)",
                  lineHeight: 1.72,
                }}
              >
                One night in your own bed. A small sensor. Doctor-reviewed
                results and a prescription if sleep apnea is found — all for
                $149.
              </p>
              <Link
                href={SHOPIFY.buyUrl}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                style={{
                  backgroundColor: "#FF8361",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(255,131,97,0.35)",
                }}
              >
                Order your sleep test — $149
              </Link>
              <p
                className="font-body text-xs text-center"
                style={{ color: "rgba(3,31,61,0.32)" }}
              >
                FDA-cleared &middot; Ships next business day &middot; No insurance required
              </p>
            </div>
          </motion.div>

          {/* Secondary — diagnosed */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div
              className="flex flex-col gap-5 rounded-2xl p-10 h-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#78BFBC" }}
              >
                I&apos;ve already been diagnosed
              </p>
              <h3
                className="font-heading font-medium"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                  lineHeight: 1.15,
                  color: "#FCF6ED",
                }}
              >
                Start your CPAP or appliance journey.
              </h3>
              <p
                className="font-body"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(252,246,237,0.55)",
                  lineHeight: 1.72,
                }}
              >
                Bring your prescription and we handle the rest — equipment
                selection, setup support, ongoing telehealth care, and
                automatic resupply.
              </p>
              <Link
                href={APP_URL}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  backgroundColor: "transparent",
                  color: "#FCF6ED",
                  border: "1.5px solid rgba(252,246,237,0.25)",
                }}
              >
                Start treatment with Dumbo Health
              </Link>
              <p
                className="font-body text-xs text-center"
                style={{ color: "rgba(252,246,237,0.3)" }}
              >
                Telehealth care &middot; All 50 states &middot; Insurance-friendly
              </p>
            </div>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            className="mt-16 pt-10 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p
              className="font-body mx-auto text-balance"
              style={{
                fontSize: "1rem",
                color: "rgba(252,246,237,0.65)",
                maxWidth: "50ch",
                lineHeight: 1.75,
                fontStyle: "italic",
              }}
            >
              &ldquo;I took the test on a Tuesday. Had my results by Thursday.
              Started treatment the following week. I had no idea how much
              better I could feel.&rdquo;
            </p>
            <p
              className="font-mono text-xs mt-4 uppercase tracking-widest"
              style={{ color: "rgba(252,246,237,0.3)" }}
            >
              Maria S., 41, Miami, FL
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FactsPage() {
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
