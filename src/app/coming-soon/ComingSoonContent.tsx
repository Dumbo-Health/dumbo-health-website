"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { ease: EASE, duration: 0.7, delay },
  };
}

function GradientBlobs() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(148deg, #FCF6ED 0%, #F5E6D1 52%, #FFD6AD 100%)",
      }} />
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.18, 1], x: [0, 32, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 520, height: 520,
          borderRadius: "50%", top: "-15%", right: "-10%",
          background: "radial-gradient(circle, rgba(255,131,97,0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.28, 0.48, 0.28], scale: [1, 1.12, 1], x: [0, -24, 0], y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", width: 440, height: 440,
          borderRadius: "50%", bottom: "5%", left: "-8%",
          background: "radial-gradient(circle, rgba(120,191,188,0.20) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
    </>
  );
}

export default function ComingSoonContent({ page: _page }: { page: string }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 24px", overflow: "hidden" }}>
      <GradientBlobs />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 520, width: "100%", textAlign: "center" }}>

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(120,191,188,0.15)", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#78BFBC", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC" }}>
            Coming soon
          </span>
        </motion.div>

        {/* Moon icon */}
        <motion.div {...fadeUp(0.18)} style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,131,97,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src="/icons/brand/moon.png" alt="" width={34} height={34} style={{ objectFit: "contain" }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.26)} style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.25rem)", lineHeight: 1.15, color: "#031F3D", marginBottom: 20 }}>
          We&apos;re building this<br />for you.
        </motion.h1>

        {/* Body */}
        <motion.p {...fadeUp(0.34)} style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", color: "rgba(3,31,61,0.55)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 40px" }}>
          This part of Dumbo Health isn&apos;t ready yet, but we&apos;re on it. We&apos;ll reach out to you directly the moment it&apos;s live.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.42)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#FF8361",
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "15px 32px",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            Back to Dumbo Health
          </Link>
          <Link
            href="/resources/facts"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.45)", textDecoration: "none" }}
          >
            Learn about sleep apnea →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
