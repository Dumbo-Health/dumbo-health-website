"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SHOPIFY, APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Gradient bleed transitions ───────────────────────────────────────────────

function Bleed({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      style={{
        height: "48px",
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
    />
  );
}

// ─── Section 1: The Hook ──────────────────────────────────────────────────────

function TheHook() {
  return (
    <section
      className="pt-32 pb-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 56% at 50% 0%, rgba(255,131,97,0.07) 0%, #FCF6ED 68%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-[5%] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono uppercase tracking-widest mb-6"
          style={{ fontSize: "0.75rem", color: "#78BFBC" }}
        >
          Sleep Apnea — A Guide
        </motion.p>

        {/* H1 split entry — punchline lands last */}
        <h1
          className="font-heading font-medium text-midnight text-balance"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)", lineHeight: 1.08 }}
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
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            maxWidth: "52ch",
            color: "rgba(3,31,61,0.65)",
          }}
        >
          If you wake up more drained than when you went to bed, there&apos;s a
          reason. And it&apos;s not you. This guide will walk you through
          exactly what&apos;s going on and what to do about it.
        </motion.p>

        {/* Scroll cue — bouncing arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <div
            className="flex flex-col items-center gap-2"
            style={{ color: "rgba(3,31,61,0.3)" }}
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
    <section className="py-24" style={{ backgroundColor: "#F5E6D1" }}>
      <div className="mx-auto max-w-6xl px-[5%]">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Text */}
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
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.12 }}
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
                  lineHeight: 1.75,
                  color: "rgba(3,31,61,0.75)",
                  maxWidth: "60ch",
                }}
              >
                Sleep apnea is a condition where your airway partially or
                completely collapses while you sleep. Every time this happens,
                your brain has to wake you up — just enough to get you
                breathing again. You never remember these moments. But they can
                happen dozens of times every hour, all night long.
              </p>
            </motion.div>

            {/* Pull quote */}
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
                  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  color: "#031F3D",
                  lineHeight: 1.3,
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
                  lineHeight: 1.75,
                  color: "rgba(3,31,61,0.75)",
                  maxWidth: "60ch",
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
                  lineHeight: 1.75,
                  color: "rgba(3,31,61,0.75)",
                  maxWidth: "60ch",
                }}
              >
                More people than you&apos;d think. It&apos;s estimated that
                over 30 million Americans have sleep apnea — and most
                don&apos;t know it. It affects men and women, people at every
                weight, and every age group. The image of the overweight,
                middle-aged man who snores? That&apos;s a fraction of the
                picture.
              </p>
            </motion.div>
          </div>

          {/* Visual — image with shadow */}
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
                alt="Person resting"
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
      icon: "/images/icon-sad-face.png",
      label: "Mood and patience",
      text: "The irritability, the short fuse, the low tolerance. Sleep deprivation compresses your emotional range.",
    },
    {
      icon: "/images/icon-growing.png",
      label: "Focus and memory",
      text: "Your brain consolidates learning during deep sleep. Without it, retention and concentration drop measurably.",
    },
    {
      icon: "/images/icon-heart.png",
      label: "Heart and metabolism",
      text: "Repeated oxygen drops overnight put sustained stress on your cardiovascular system and hormone regulation.",
    },
    {
      icon: "/images/icon-sun.png",
      label: "Energy and motivation",
      text: "The afternoon wall. The coffee dependency. The feeling that getting through the day is an effort rather than a given.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#FCF6ED" }}>
      <div className="mx-auto max-w-3xl px-[5%] text-center">
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
            The ripple effect
          </p>
          <h2
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.12 }}
          >
            This is what&apos;s been running your life
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p
            className="font-body mt-6 mx-auto text-balance"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(3,31,61,0.65)",
              maxWidth: "52ch",
            }}
          >
            It&apos;s not laziness. It&apos;s not aging. It&apos;s a breathing
            problem — and it&apos;s been quietly affecting everything.
          </p>
        </motion.div>

        {/* Teal callout — emotional peak, needs to stop the reader */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            className="my-10 rounded-2xl p-8 text-left"
            style={{
              backgroundColor: "rgba(120,191,188,0.1)",
              borderLeft: "4px solid #78BFBC",
            }}
          >
            <p
              className="font-heading font-medium text-balance"
              style={{
                fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
                color: "#031F3D",
                lineHeight: 1.35,
              }}
            >
              &ldquo;I thought I was just a bad sleeper. Turns out I wasn&apos;t
              sleeping at all.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Effect cards — white on Daylight, with hover */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 text-left">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.07, ease: EASE }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div
                className="flex gap-4 rounded-2xl p-6 h-full"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 16px rgba(3,31,61,0.06)",
                  border: "1px solid rgba(3,31,61,0.05)",
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                  className="shrink-0 mt-0.5 opacity-80"
                />
                <div>
                  <p
                    className="font-body font-bold text-midnight mb-1"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.65 }}
                  >
                    {item.text}
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

// ─── Section 4: How It's Found ────────────────────────────────────────────────

function HowItFound() {
  const steps = [
    {
      n: "01",
      icon: "/images/icons/icon-laptop.png",
      title: "Order your test online",
      body: "No referral needed. No waiting room. Select a test, complete a short intake, and it ships to your door the next business day.",
    },
    {
      n: "02",
      icon: "/images/icons/icon-scan.png",
      title: "Wear a small device one night",
      body: "A compact sensor clips to your finger and chest. Sleep in your own bed, in your normal routine. The device does the rest.",
    },
    {
      n: "03",
      icon: "/images/icons/icon-shield.png",
      title: "Doctor-reviewed results in days",
      body: "A licensed sleep physician reviews your data and sends a detailed report. If sleep apnea is present, your prescription is included.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#F5E6D1" }}>
      <div className="mx-auto max-w-6xl px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p
            className="font-mono uppercase tracking-widest mb-4"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Act 2 — Finding out
          </p>
          <h2
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.12 }}
          >
            Getting diagnosed is easier than you think
          </h2>
          <p
            className="font-body mt-5 mx-auto text-balance"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(3,31,61,0.65)",
              maxWidth: "52ch",
            }}
          >
            The good news: sleep apnea is one of the most treatable conditions
            there is. And finding out takes one night.
          </p>
        </motion.div>

        {/* Step cards — white on Sunlight, peach-tinted ghost numbers */}
        <div className="grid gap-8 lg:grid-cols-3">
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
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={36}
                    height={36}
                    className="opacity-70"
                  />
                </div>
                <h3
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.3rem)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.7 }}
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
            style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.4)" }}
          >
            No sleep clinic &middot; No waiting room &middot; No overnight away from home
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: Treatment + Dumbo Health Surfaces ────────────────────────────

function TreatmentDumboSurfaces() {
  const treatments = [
    {
      icon: "/images/icon-cpap.png",
      name: "CPAP therapy",
      description:
        "A continuous airflow device that gently keeps your airway open while you sleep. The most effective treatment for moderate-to-severe sleep apnea.",
      dumbo:
        "We ship your CPAP with same-week setup support, ongoing telehealth check-ins, and automatic resupply so you never run out of supplies.",
    },
    {
      icon: "/images/icon-moon.png",
      name: "Dental appliance",
      description:
        "A custom-fitted mouthguard that repositions your jaw during sleep to prevent airway collapse. Effective for mild-to-moderate apnea, and travel-friendly.",
      dumbo:
        "We coordinate your fitting with a network of trained dentists and manage the prescription side so you don't have to navigate it alone.",
    },
    {
      icon: "/images/icon-path.png",
      name: "Positional therapy",
      description:
        "For some people, sleep apnea only occurs when lying on the back. Positional devices or techniques can dramatically reduce events without equipment.",
      dumbo:
        "Our physicians assess whether positional therapy is appropriate for you and include it in a broader treatment plan when relevant.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#F5E6D1" }}>
      <div className="mx-auto max-w-6xl px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <p
            className="font-mono uppercase tracking-widest mb-4"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Treatment
          </p>
          <h2
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.12 }}
          >
            There are proven ways to treat sleep apnea.
            <br />
            <span style={{ color: "#FF8361" }}>
              We&apos;ve made all of them easier to access.
            </span>
          </h2>
          <p
            className="font-body mt-5 mx-auto text-balance"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              color: "rgba(3,31,61,0.65)",
              maxWidth: "56ch",
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
                <Image
                  src={t.icon}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="opacity-80"
                />
                <h3
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.3rem)" }}
                >
                  {t.name}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.7)", lineHeight: 1.7 }}
                >
                  {t.description}
                </p>
                {/* Dumbo Health layer — clearer demarcation */}
                <div
                  className="mt-auto pt-5"
                  style={{ borderTop: "1px solid rgba(3,31,61,0.15)" }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "#FF8361" }}
                  >
                    How Dumbo Health delivers this
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: "0.875rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.65 }}
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

function ConversionFork() {
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(135deg, #FF8361 0%, #e8693f 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <h2
            className="font-heading font-medium text-white text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.12 }}
          >
            Ready to find out?
          </h2>
          <p
            className="font-body mt-4 mx-auto text-balance"
            style={{
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "48ch",
              lineHeight: 1.7,
            }}
          >
            Pick the step that&apos;s right for you. Both paths lead to the same place: better sleep.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Primary — undiagnosed — dominant shadow */}
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
                boxShadow: "0 8px 48px rgba(3,31,61,0.18)",
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
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", lineHeight: 1.15 }}
              >
                Take a home sleep test.
                <br />Results in days.
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.7 }}
              >
                One night in your own bed. A small sensor. Doctor-reviewed
                results and a prescription if sleep apnea is found — all for
                $149.
              </p>
              <Link
                href={SHOPIFY.buyUrl}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                style={{
                  backgroundColor: "#031F3D",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(3,31,61,0.18)",
                }}
              >
                Order your sleep test — $149
              </Link>
              <p
                className="font-body text-xs text-center"
                style={{ color: "rgba(3,31,61,0.35)" }}
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
              style={{ backgroundColor: "#F5E6D1" }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "#78BFBC" }}
              >
                I&apos;ve already been diagnosed
              </p>
              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", lineHeight: 1.15 }}
              >
                Start your CPAP or appliance journey.
              </h3>
              <p
                className="font-body"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)", lineHeight: 1.7 }}
              >
                Bring your prescription and we handle the rest — equipment
                selection, setup support, ongoing telehealth care, and
                automatic resupply.
              </p>
              <Link
                href={APP_URL}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-[12px] px-8 font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                style={{
                  backgroundColor: "transparent",
                  color: "#031F3D",
                  border: "1.5px solid rgba(3,31,61,0.3)",
                }}
              >
                Start treatment with Dumbo Health
              </Link>
              <p
                className="font-body text-xs text-center"
                style={{ color: "rgba(3,31,61,0.35)" }}
              >
                Telehealth care &middot; All 50 states &middot; Insurance-friendly
              </p>
            </div>
          </motion.div>
        </div>

        {/* Trust signal — separated */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            className="mt-16 pt-10 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
          >
            <p
              className="font-body mx-auto text-balance"
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "52ch",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              &ldquo;I took the test on a Tuesday. Had my results by Thursday.
              Started treatment the following week. I had no idea how much
              better I could feel.&rdquo;
            </p>
            <p
              className="font-body mt-3 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
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
        <Bleed from="#FCF6ED" to="#F5E6D1" />
        <WhatIsSleepApnea />
        <Bleed from="#F5E6D1" to="#FCF6ED" />
        <WhyItMatters />
        <Bleed from="#FCF6ED" to="#F5E6D1" />
        <HowItFound />
        <TreatmentDumboSurfaces />
        <Bleed from="#F5E6D1" to="#FF8361" />
        <ConversionFork />
      </main>
      <Footer />
    </>
  );
}
