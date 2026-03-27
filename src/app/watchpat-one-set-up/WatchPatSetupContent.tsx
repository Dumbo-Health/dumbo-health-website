"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import AppDownloadButtons from "./AppDownloadButtons";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── Data ───────────────────────────────────────────────────────────────── */

const KEY_FACTS = [
  { icon: "/icons/brand/sun.png",      label: "Done at home"  },
  { icon: "/icons/brand/moon.png",     label: "One night only" },
  { icon: "/icons/brand/lifeline.png", label: "Single-use"    },
  { icon: "/icons/brand/heart.png",    label: "FDA-cleared"   },
];

const STEPS = [
  {
    number: "01",
    icon: "/icons/brand/heart.png",
    title: "Create or log in to your account",
    body: "Open the app and sign in with the email you used when ordering. Your study will already be waiting for you.",
  },
  {
    number: "02",
    icon: "/icons/brand/lifeline.png",
    title: "Pair your WatchPAT ONE",
    body: "Enable Bluetooth on your phone. The app will guide you to scan the QR code on your device box, linking it to your study automatically.",
  },
  {
    number: "03",
    icon: "/icons/brand/sun.png",
    title: "Apply the device",
    body: "Wristband on your non-dominant wrist, finger probe on your index finger, chest sticker as shown in the app. Everything is single-use and disposable.",
  },
  {
    number: "04",
    icon: "/icons/brand/moon.png",
    title: "Start the recording",
    body: "Tap Start Study when you are ready for bed. The device records automatically. No buttons to press during the night.",
  },
  {
    number: "05",
    icon: "/icons/brand/heart.png",
    title: "Wake up and sync",
    body: "Open the app, tap End Study. Your results upload securely to our clinical team. Dispose of the device after your test.",
  },
];

const FAQS = [
  {
    q: "What if the device falls off during the night?",
    a: "Very common. If the finger probe comes off, reattach it as best you can. The wristband is designed to stay on through normal sleep movement. Even partial data gives our clinicians useful information.",
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
    a: "Avoid alcohol and sleep aids the night of your test as they affect sleep architecture. Otherwise, eat and drink normally and take your regular medications.",
  },
  {
    q: "What if the device does not connect in the app?",
    a: "Make sure Bluetooth is enabled and you are within a few feet of the device. Try closing and reopening the app. If it still will not connect, email contact@dumbo.health and we will get you sorted.",
  },
  {
    q: "When will I get my results?",
    a: "Our clinical team reviews your study and you will receive results within 3 to 5 business days by email and through the Dumbo Health platform.",
  },
  {
    q: "Is my sleep data secure?",
    a: "Yes. All data is encrypted in transit and at rest, stored on HIPAA-compliant infrastructure. Your results are only accessible to you and your Dumbo Health care team.",
  },
  {
    q: "What does WatchPAT ONE actually measure?",
    a: "Peripheral arterial tone, heart rate, oxygen saturation, actigraphy, and body position. Our clinicians use this to accurately diagnose sleep apnea and determine its severity.",
  },
];

/* ─── FAQ accordion ──────────────────────────────────────────────────────── */

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
          padding: "22px 26px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#031F3D", fontSize: "1rem", lineHeight: 1.4 }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
            background: open ? "#FF8361" : "rgba(3,31,61,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
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
        transition={{ duration: 0.28, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.6)", lineHeight: 1.75, fontSize: "1rem", padding: "0 26px 22px" }}>
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
            background: "linear-gradient(160deg, #F5E6D1 0%, #FCF6ED 55%, #FCF6ED 100%)",
            position: "relative",
            overflow: "hidden",
            paddingTop: "clamp(100px, 14vw, 160px)",
            paddingBottom: "clamp(72px, 10vw, 112px)",
          }}
        >
          {/* Warm radial — top right */}
          <div style={{
            position: "absolute", top: "-15%", right: "-6%",
            width: "50vw", maxWidth: 640, height: "50vw", maxHeight: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,214,173,0.7) 0%, transparent 65%)",
            filter: "blur(72px)", pointerEvents: "none",
          }} />
          {/* Peach radial — bottom left */}
          <div style={{
            position: "absolute", bottom: "-10%", left: "-8%",
            width: "38vw", maxWidth: 480, height: "38vw", maxHeight: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,131,97,0.14) 0%, transparent 65%)",
            filter: "blur(64px)", pointerEvents: "none",
          }} />
          {/* Wave */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/Vector-2.svg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", opacity: 0.35, pointerEvents: "none" }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 1440, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999, background: "rgba(120,191,188,0.18)", marginBottom: 28 }}
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
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                lineHeight: 1.06, color: "#031F3D",
                marginBottom: 24, maxWidth: "16ch", margin: "0 auto 24px",
              }}
            >
              Your WatchPAT ONE Setup Guide
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                color: "rgba(3,31,61,0.58)", lineHeight: 1.75,
                maxWidth: "44ch", margin: "0 auto 52px",
              }}
            >
              Everything you need to complete your home sleep test tonight. Five simple steps.
            </motion.p>

            {/* Key fact badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10 }}
            >
              {KEY_FACTS.map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "9px 18px", borderRadius: 999,
                    background: "white",
                    border: "1px solid rgba(3,31,61,0.08)",
                    boxShadow: "0 2px 8px rgba(3,31,61,0.05)",
                  }}
                >
                  <Image src={f.icon} alt="" width={16} height={16} style={{ objectFit: "contain", opacity: 0.8 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "#031F3D" }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── How it works: Video + Download ────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "clamp(64px, 9vw, 104px) 5%" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 52 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
                How it works
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#031F3D" }}>
                Watch, then download
              </h2>
            </motion.div>

            {/* 2-col: video + download */}
            <div className="grid gap-6 lg:grid-cols-2" style={{ alignItems: "stretch" }}>
              {/* Left: Video */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  position: "relative", width: "100%", paddingBottom: "56.25%",
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(3,31,61,0.11)",
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

              {/* Right: Download panel */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                style={{
                  background: "#031F3D",
                  borderRadius: 20,
                  padding: "clamp(36px, 5vw, 56px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow inside panel */}
                <div style={{
                  position: "absolute", top: "-30%", right: "-20%",
                  width: "70%", height: "70%", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,131,97,0.22) 0%, transparent 70%)",
                  filter: "blur(48px)", pointerEvents: "none",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}>
                    Get the app first
                  </p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "white", marginBottom: 16, lineHeight: 1.1 }}>
                    Download the WatchPAT app
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "rgba(252,246,237,0.58)", fontSize: "1.0625rem", lineHeight: 1.75, marginBottom: 36 }}>
                    The app is free. Install it before your test night so you have time to pair your device without rushing.
                  </p>
                  <AppDownloadButtons />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Five steps ────────────────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(180deg, #FCF6ED 0%, #F5E6D1 100%)", padding: "clamp(64px, 9vw, 104px) 5%" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 52 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
                Setup steps
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#031F3D" }}>
                Five steps to a completed study
              </h2>
            </motion.div>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {STEPS.map((step) => (
                <motion.div
                  key={step.number}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                  style={{
                    display: "flex", gap: 20, alignItems: "flex-start",
                    background: "white", borderRadius: 18,
                    padding: "24px 24px",
                    border: "1px solid rgba(3,31,61,0.07)",
                  }}
                >
                  {/* Icon + number */}
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: "rgba(255,131,97,0.1)",
                      border: "1.5px solid rgba(255,131,97,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Image src={step.icon} alt="" width={22} height={22} style={{ objectFit: "contain", opacity: 0.85 }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(3,31,61,0.28)", textTransform: "uppercase" }}>
                      {step.number}
                    </span>
                  </div>
                  {/* Text */}
                  <div style={{ paddingTop: 2 }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontWeight: 500, color: "#031F3D", marginBottom: 8, fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.3 }}>
                      {step.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.58)", lineHeight: 1.65, fontSize: "0.9375rem" }}>
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "clamp(64px, 9vw, 104px) 5%" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
                Common questions
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#031F3D" }}>
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

        {/* ── Closing ───────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(160deg, #F5E6D1 0%, #FCF6ED 50%, #FFD6AD 100%)",
            padding: "clamp(88px, 12vw, 140px) 5%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uploads/Vector-4.svg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", left: 0, width: "100%", bottom: 48, opacity: 0.4, pointerEvents: "none" }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: "rgba(255,131,97,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 28px",
              }}>
                <Image src="/icons/brand/heart.png" alt="" width={32} height={32} style={{ objectFit: "contain" }} />
              </div>

              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 18 }}>
                After your test
              </p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#031F3D", marginBottom: 20 }}>
                We take it from here
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.8, marginBottom: 44 }}>
                Once your data uploads, our licensed sleep clinicians review your study. You will receive your results and a clear explanation of what they mean. If treatment is recommended, we will walk you through every next step.
              </p>

              <a
                href="mailto:contact@dumbo.health"
                style={{
                  display: "inline-block",
                  background: "#031F3D", color: "white",
                  fontFamily: "var(--font-body)", fontWeight: 700,
                  fontSize: "0.9375rem", letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "16px 40px", borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                Email us at contact@dumbo.health
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
