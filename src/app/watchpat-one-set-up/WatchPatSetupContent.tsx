"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import AppDownloadButtons from "./AppDownloadButtons";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── Data ───────────────────────────────────────────────────────────────── */

const KEY_FACTS = [
  { icon: "/icons/brand/sun.png",      label: "Done at home",   sub: "No sleep lab visit required"    },
  { icon: "/icons/brand/moon.png",     label: "One night only", sub: "A single night of sleep"        },
  { icon: "/icons/brand/lifeline.png", label: "Single-use",     sub: "Disposable after your test"     },
  { icon: "/icons/brand/heart.png",    label: "FDA-cleared",    sub: "Clinically validated accuracy"  },
];

const STEPS = [
  {
    number: "01",
    icon: "/icons/brand/moon.png",
    title: "Download the WatchPAT app",
    body: "Install the free WatchPAT app on your smartphone before the night of your test. You will need it to pair the device, start the recording, and submit your results.",
  },
  {
    number: "02",
    icon: "/icons/brand/heart.png",
    title: "Create or log in to your account",
    body: "Open the app and sign in with the email address you used when ordering your test. Your study will already be waiting for you.",
  },
  {
    number: "03",
    icon: "/icons/brand/lifeline.png",
    title: "Pair your WatchPAT ONE",
    body: "Enable Bluetooth on your phone. The app will guide you to scan the QR code on your device box, which links the device to your study automatically.",
  },
  {
    number: "04",
    icon: "/icons/brand/sun.png",
    title: "Apply the device",
    body: "Wear the wristband on your non-dominant wrist like a watch. Attach the finger probe to your index finger and apply the small chest sticker as shown in the app instructions. Everything is single-use and disposable.",
  },
  {
    number: "05",
    icon: "/icons/brand/moon.png",
    title: "Start the recording",
    body: "Tap Start Study in the app when you are ready for bed. The device records automatically while you sleep. No buttons to press during the night.",
  },
  {
    number: "06",
    icon: "/icons/brand/heart.png",
    title: "Wake up and sync",
    body: "In the morning, open the app and tap End Study. Your results upload securely to our clinical team. The device is single-use and should be disposed of after your test.",
  },
];

const FAQS = [
  {
    q: "What if the device falls off during the night?",
    a: "This is actually very common. If the finger probe comes off, reattach it as best you can. The wristband is designed to stay on through normal sleep movement. Even partial data gives our clinicians useful information.",
  },
  {
    q: "Is it painful or uncomfortable?",
    a: "No. The finger probe is a soft sensor clip, the wristband fits like a watch, and the chest sticker is a small gentle adhesive. Most patients forget they are wearing it after a few minutes.",
  },
  {
    q: "Can I sleep in my normal position?",
    a: "Yes. Sleep exactly as you normally would. Side sleeping, back sleeping, any position is fine. The WatchPAT ONE is designed to work in all sleep positions.",
  },
  {
    q: "Do I need to fast or avoid anything before the test?",
    a: "Avoid alcohol and sleep aids the night of your test as they affect sleep architecture. Otherwise, eat and drink normally. Take your regular medications unless your provider has told you otherwise.",
  },
  {
    q: "What if the device does not connect in the app?",
    a: "Make sure Bluetooth is enabled and you are within a few feet of the device. Try closing and reopening the app. If it still will not connect, reach out at hello@dumbohealth.com and we will get you sorted before your test night.",
  },
  {
    q: "When will I get my results?",
    a: "Our clinical team reviews your study and you will receive results within 3 to 5 business days. We will reach out by email and through the Dumbo Health platform.",
  },
  {
    q: "Is my sleep data secure?",
    a: "Yes. All data is encrypted in transit and at rest, stored on HIPAA-compliant infrastructure. Your results are only accessible to you and your Dumbo Health care team.",
  },
  {
    q: "What does WatchPAT ONE actually measure?",
    a: "The device measures your peripheral arterial tone, heart rate, oxygen saturation, actigraphy, and body position. This gives our clinicians everything they need to accurately diagnose sleep apnea and determine its severity.",
  },
];

/* ─── FAQ accordion item ─────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      style={{
        background: "white",
        borderRadius: 16,
        border: "1px solid rgba(3,31,61,0.07)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "24px 28px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          color: "#031F3D",
          fontSize: "1.0625rem",
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? "#FF8361" : "rgba(3,31,61,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke={open ? "white" : "#031F3D"} strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <p style={{
          fontFamily: "var(--font-body)",
          color: "rgba(3,31,61,0.6)",
          lineHeight: 1.75,
          fontSize: "1.0625rem",
          padding: "0 28px 24px",
        }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function WatchPatSetupContent() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "#031F3D",
            position: "relative",
            overflow: "hidden",
            paddingTop: "clamp(120px, 16vw, 180px)",
            paddingBottom: "clamp(100px, 13vw, 150px)",
          }}
        >
          {/* Sleep-cycle wave */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/Vector-1.svg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", left: 0, width: "100%",
              top: "60%", transform: "translateY(-50%)",
              opacity: 0.07, pointerEvents: "none", userSelect: "none",
            }}
          />

          {/* Warm radial — top right */}
          <div style={{
            position: "absolute", top: "-20%", right: "-8%",
            width: "55vw", maxWidth: 720, height: "55vw", maxHeight: 720,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,131,97,0.24) 0%, transparent 65%)",
            filter: "blur(72px)", pointerEvents: "none",
          }} />

          {/* Teal radial — bottom left */}
          <div style={{
            position: "absolute", bottom: "-18%", left: "-10%",
            width: "45vw", maxWidth: 580, height: "45vw", maxHeight: 580,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(120,191,188,0.2) 0%, transparent 65%)",
            filter: "blur(64px)", pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "0 5%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 18px", borderRadius: 999,
                background: "rgba(120,191,188,0.15)", marginBottom: 32,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#78BFBC", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC" }}>
                Home Sleep Test
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
              style={{
                fontFamily: "var(--font-heading)", fontWeight: 500,
                fontSize: "clamp(3rem, 6.5vw, 5rem)",
                lineHeight: 1.05, color: "white",
                marginBottom: 28,
                maxWidth: "14ch",
                textWrap: "balance" as React.CSSProperties["textWrap"],
              }}
            >
              Your WatchPAT ONE Setup Guide
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.125rem, 1.6vw, 1.3125rem)",
                color: "rgba(252,246,237,0.65)",
                lineHeight: 1.75,
                maxWidth: "46ch",
                margin: "0 auto 48px",
              }}
            >
              Everything you need to complete your home sleep test tonight. From downloading the app to waking up with your data ready.
            </motion.p>

            {/* Six steps cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(252,246,237,0.28)" }}>
                Six steps
              </span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(252,246,237,0.22), transparent)" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Key facts ─────────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(180deg, #F5E6D1 0%, #FCF6ED 100%)", padding: "clamp(60px, 8vw, 96px) 5%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {KEY_FACTS.map((f) => (
                <motion.div
                  key={f.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                  }}
                  style={{
                    background: "white", borderRadius: 20,
                    padding: "32px 24px",
                    border: "1px solid rgba(3,31,61,0.07)",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    textAlign: "center", gap: 14,
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: "rgba(255,131,97,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Image src={f.icon} alt="" width={28} height={28} style={{ objectFit: "contain", opacity: 0.9 }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "1.3rem", color: "#031F3D", marginBottom: 4 }}>
                      {f.label}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.5)" }}>
                      {f.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Video ─────────────────────────────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "clamp(72px, 10vw, 112px) 5%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}>
                Watch first
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#031F3D", marginBottom: 14 }}>
                See how it works
              </h2>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.55)", fontSize: "1.125rem", lineHeight: 1.75, maxWidth: "48ch", margin: "0 auto" }}>
                Watch the full setup walkthrough before your test night. It takes under 5 minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                position: "relative", width: "100%", paddingBottom: "56.25%",
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 28px 80px rgba(3,31,61,0.13)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/_9kCq4c39IY"
                title="WatchPAT ONE Setup Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Steps ─────────────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(180deg, #FCF6ED 0%, #F5E6D1 100%)", padding: "clamp(72px, 10vw, 112px) 5%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 60 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}>
                Setup steps
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#031F3D" }}>
                Six steps to a completed study
              </h2>
            </motion.div>

            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            >
              {STEPS.map((step) => (
                <motion.div
                  key={step.number}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
                  }}
                  style={{
                    display: "flex", gap: 28, alignItems: "flex-start",
                    background: "white", borderRadius: 20,
                    padding: "clamp(24px, 3vw, 36px) clamp(24px, 3vw, 36px)",
                    border: "1px solid rgba(3,31,61,0.07)",
                  }}
                >
                  {/* Icon + step number */}
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 15,
                      background: "rgba(255,131,97,0.1)",
                      border: "1.5px solid rgba(255,131,97,0.22)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Image src={step.icon} alt="" width={26} height={26} style={{ objectFit: "contain", opacity: 0.85 }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(3,31,61,0.28)", textTransform: "uppercase" }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, color: "#031F3D", marginBottom: 10, fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)" }}>
                      {step.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.6)", lineHeight: 1.72, fontSize: "1.0625rem" }}>
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── App download ──────────────────────────────────────────────────── */}
        <section style={{ background: "#031F3D", padding: "clamp(80px, 11vw, 120px) 5%", position: "relative", overflow: "hidden" }}>
          {/* Wave */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/Vector-1.svg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", left: 0, width: "100%", top: "50%", transform: "translateY(-50%)", opacity: 0.06, pointerEvents: "none" }}
          />
          {/* Center glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw", maxWidth: 780, height: "60vw", maxHeight: 780,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,131,97,0.16) 0%, transparent 65%)",
            filter: "blur(72px)", pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 20 }}
            >
              Step 1 — Get the app first
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
              style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "white", marginBottom: 18 }}
            >
              Download WatchPAT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
              style={{ fontFamily: "var(--font-body)", color: "rgba(252,246,237,0.55)", fontSize: "1.125rem", marginBottom: 44, lineHeight: 1.75 }}
            >
              The app is free. Install it before the night of your test so you have time to pair your device without rushing.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
            >
              <AppDownloadButtons />
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "clamp(80px, 11vw, 120px) 5%" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}>
                Common questions
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#031F3D" }}>
                Things people ask us
              </h2>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── What happens next ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(160deg, #F5E6D1 0%, #FCF6ED 50%, #FFD6AD 100%)",
            padding: "clamp(88px, 12vw, 140px) 5%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Wave accent */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/Vector-4.svg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", left: 0, width: "100%", bottom: 48, opacity: 0.45, pointerEvents: "none" }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div style={{
                width: 68, height: 68, borderRadius: 20,
                background: "rgba(255,131,97,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 32px",
              }}>
                <Image src="/icons/brand/heart.png" alt="" width={34} height={34} style={{ objectFit: "contain" }} />
              </div>

              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 20 }}>
                After your test
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#031F3D", marginBottom: 22 }}>
                We take it from here
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.8, marginBottom: 48 }}>
                Once your data uploads, our licensed sleep clinicians review your study. You will receive your results and a clear explanation of what they mean. If treatment is recommended, we will walk you through every next step.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    background: "#031F3D", color: "white",
                    fontFamily: "var(--font-body)", fontWeight: 700,
                    fontSize: "0.9375rem", letterSpacing: "0.06em", textTransform: "uppercase",
                    padding: "16px 40px", borderRadius: 12,
                    textDecoration: "none",
                  }}
                >
                  Contact us
                </Link>
                <a
                  href="mailto:hello@dumbohealth.com"
                  style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.45)", textDecoration: "none" }}
                >
                  hello@dumbohealth.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
