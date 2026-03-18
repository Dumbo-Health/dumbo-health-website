"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const QUESTIONS = [
  "Waking up exhausted no matter how much you sleep?",
  "Snoring, brain fog, tired all day?",
];
const HEADLINE = "Better sleep is closer than you think.";
const SUBHEAD  = "We help people understand what's disrupting their sleep and what to do about it.";

const marqueeImages = [
  { src: "/images/people/couple-in-bed.png",       alt: "Couple resting peacefully" },
  { src: "/images/people/man-waking-up.png",        alt: "Man waking up refreshed" },
  { src: "/images/people/woman-blue-pajamas.png",   alt: "Woman ready for a good night" },
  { src: "/images/people/man-drinking-coffee.png",  alt: "Man enjoying his morning" },
  { src: "/images/people/man-on-beach.png",         alt: "Man feeling great outdoors" },
  { src: "/images/hero/hero-device.jpg",            alt: "Sleep test device" },
];

// ── Word-by-word reveal — slow, deliberate ────────────────────────────────────
function AnimatedWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: EASE, duration: 0.7, delay: delay + i * 0.07 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── Gradient (scoped to section) ───────────────────────────────────────────────
function HeroGradient() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(148deg, #FCF6ED 0%, #F5E6D1 52%, #FFD6AD 100%)",
      }} />
      <motion.div
        animate={{ opacity: [0.42, 0.68, 0.42], scale: [1, 1.16, 1], x: [0, 28, 0], y: [0, -14, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "65vw", height: "65vw", maxWidth: 820, maxHeight: 820,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,131,97,0.12) 0%, rgba(255,214,173,0.66) 40%, transparent 68%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.26, 0.48, 0.26], scale: [1.08, 1, 1.08], x: [0, -18, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 3 }}
        style={{
          position: "absolute", bottom: "-20%", left: "-15%",
          width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,214,173,0.58) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function HomeHero() {
  const [beat, setBeat] = useState<number>(-1);
  const fromAnim = useRef(false);

  useEffect(() => {
    const played = sessionStorage.getItem("hero-played");
    if (played) {
      setBeat(4);
      return;
    }

    fromAnim.current = true;
    setBeat(0);

    const timers = [
      setTimeout(() => setBeat(1), 1200),
      setTimeout(() => setBeat(2), 3200),
      setTimeout(() => setBeat(3), 5200),
      setTimeout(() => {
        setBeat(4);
        sessionStorage.setItem("hero-played", "true");
      }, 6800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isAnimating = beat >= 0 && beat < 4;

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <HeroGradient />

      {/* ── Animation overlay ── */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7, ease: EASE } }}
            exit={{
              opacity: 0,
              y: -60,
              transition: { ease: EASE, duration: 0.85 },
            }}
            style={{
              position: "absolute", inset: 0, zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 28px",
              minHeight: "100vh",
            }}
          >
            <div style={{ maxWidth: 620, width: "100%", textAlign: "center" }}>
              <AnimatePresence mode="wait">
                {beat === 1 && (
                  <motion.h2
                    key="q1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
                    style={{
                      fontFamily: "var(--font-heading)", fontWeight: 500,
                      fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
                      color: "#031F3D", lineHeight: 1.15,
                    }}
                  >
                    <AnimatedWords text={QUESTIONS[0]} delay={0.05} />
                  </motion.h2>
                )}

                {beat === 2 && (
                  <motion.h2
                    key="q2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
                    style={{
                      fontFamily: "var(--font-heading)", fontWeight: 500,
                      fontSize: "clamp(1.875rem, 4.5vw, 3rem)",
                      color: "#031F3D", lineHeight: 1.15,
                    }}
                  >
                    <AnimatedWords text={QUESTIONS[1]} delay={0.05} />
                  </motion.h2>
                )}

                {beat === 3 && (
                  <motion.div key="resolution">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ ease: EASE, duration: 0.55, delay: 0.05 }}
                      style={{
                        width: 32, height: 3, backgroundColor: "#FF8361",
                        borderRadius: 2, margin: "0 auto 26px",
                      }}
                    />
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { ease: EASE, duration: 0.8, delay: 0.1 } }}
                      style={{
                        fontFamily: "var(--font-heading)", fontWeight: 500,
                        fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                        color: "#031F3D", lineHeight: 1.08,
                      }}
                    >
                      {HEADLINE}
                    </motion.h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Resting hero — initial:opacity:0 prevents SSR flash ── */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={
          beat === 4
            ? {
                opacity: 1,
                y: 0,
                transition: fromAnim.current
                  ? { ease: EASE, duration: 0.75, delay: 0.2 }
                  : { duration: 0.15 },
              }
            : { opacity: 0, y: 0, transition: { duration: 0 } }
        }
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Headline */}
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 pt-16 md:pt-24">
          <motion.h1
            initial={{ y: 8 }}
            animate={beat === 4 ? { y: 0, transition: fromAnim.current ? { ease: EASE, duration: 0.75, delay: 0.2 } : { duration: 0 } } : { y: 8 }}
            className="font-heading text-[44px] font-medium leading-[1.08] text-midnight sm:text-[56px] lg:text-[68px] lg:leading-[1.05]"
          >
            {HEADLINE}
          </motion.h1>
          <p className="mx-auto mt-5 max-w-lg font-body text-lg leading-relaxed text-midnight/55 md:text-xl">
            {SUBHEAD}
          </p>
        </div>

        {/* Photo marquee */}
        <div className="relative mt-12 md:mt-16">
          <div className="overflow-hidden">
            <div className="flex w-max gap-4" style={{ animation: "marquee-hero 55s linear infinite" }}>
              {[...marqueeImages, ...marqueeImages].map((img, i) => (
                <div
                  key={i}
                  className="relative h-[260px] w-[380px] shrink-0 overflow-hidden rounded-2xl md:h-[320px] md:w-[460px]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 380px, 460px"
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 px-4 pb-16 pt-10 md:pb-20 md:pt-12">
          <Link
            href="/get-started"
            className="inline-flex h-12 items-center rounded-[12px] bg-peach px-8 font-body text-sm font-medium uppercase tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl hover:shadow-peach/25 active:translate-y-0 active:shadow-md"
          >
            Get started
          </Link>
          <Link
            href="/at-home-sleep-test"
            className="font-body text-sm text-midnight/35 transition-colors hover:text-midnight/60"
          >
            Or buy your diagnostic kit directly →
          </Link>
        </div>
      </motion.div>

      <style>{`@keyframes marquee-hero { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
