"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

/* ─── Card definitions ──────────────────────────────────────────────────── */

const cards = [
  {
    href: "#diagnose",
    icon: "/images/icon-face.png",
    eyebrow: "Still putting it off?",
    headline: "I wake up exhausted and I think something's wrong.",
    body: "Something's off. You know it. One quiet night at home is all it takes to get real answers and a clear path forward.",
    cta: "Start gently",
    ctaNote: "One night. One test. $149.",
    bg: "#FCF6ED",
    border: "rgba(255,183,122,0.5)",
    hoverBorder: "rgba(255,131,97,0.55)",
    iconBg: "rgba(255,131,97,0.15)",
    headingColor: "#031F3D",
    bodyColor: "rgba(3,31,61,0.58)",
    eyebrowColor: "#5a9e9b",
    ctaColor: "#FF8361",
  },
  {
    href: "#already-diagnosed",
    icon: "/images/icon-arrows.png",
    eyebrow: "You already did the hard part.",
    headline: "I got diagnosed. I just need someone to help me get there.",
    body: "You did the sleep study, got the results, then nothing. You need a CPAP and someone in your corner. We've got both.",
    cta: "Get your CPAP",
    ctaNote: "No test required.",
    bg: "#FCF6ED",
    border: "rgba(120,191,188,0.4)",
    hoverBorder: "rgba(120,191,188,0.8)",
    iconBg: "rgba(120,191,188,0.15)",
    headingColor: "#031F3D",
    bodyColor: "rgba(3,31,61,0.58)",
    eyebrowColor: "#5a9e9b",
    ctaColor: "#FF8361",
  },
  {
    href: "#already-diagnosed",
    icon: "/images/icon-heart.png",
    eyebrow: "You're trying. That counts.",
    headline: "I have a CPAP but I still feel alone in this.",
    body: "The device is there and you're using it. But supplies run out, data makes no sense, and no one checks in. You deserve real support.",
    cta: "Transfer my care",
    ctaNote: "Bring your prescription.",
    bg: "#FCF6ED",
    border: "rgba(3,31,61,0.12)",
    hoverBorder: "rgba(3,31,61,0.22)",
    iconBg: "rgba(3,31,61,0.07)",
    headingColor: "#031F3D",
    bodyColor: "rgba(3,31,61,0.58)",
    eyebrowColor: "#5a9e9b",
    ctaColor: "#FF8361",
  },
];

/* ─── Floating gradient blob ─────────────────────────────────────────────── */

// Card centers as % of container width (approx col 1/3/5 of 3-col grid)
const CARD_X = [18, 50, 82];
const CARD_Y = 50;

function FloatingBlob({ hoveredIndex }: { hoveredIndex: number | null }) {
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const x = useSpring(rawX, { stiffness: 22, damping: 16 });
  const y = useSpring(rawY, { stiffness: 22, damping: 16 });
  const left = useTransform(x, (v) => `${v}%`);
  const top = useTransform(y, (v) => `${v}%`);

  // Idle slow drift
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const keyframes = [
      [50, 48], [54, 52], [48, 54], [52, 46], [50, 50],
    ];
    let i = 0;
    const tick = () => {
      const [kx, ky] = keyframes[i % keyframes.length];
      rawX.set(kx);
      rawY.set(ky);
      i++;
    };
    tick();
    const id = setInterval(tick, 2800);
    return () => clearInterval(id);
  }, [hoveredIndex, rawX, rawY]);

  // React to hover — spring toward the hovered card
  useEffect(() => {
    if (hoveredIndex === null) return;
    rawX.set(CARD_X[hoveredIndex]);
    rawY.set(CARD_Y);
  }, [hoveredIndex, rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        width: "80%",
        height: "220%",
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(ellipse at center, rgba(255,131,97,0.52) 0%, rgba(255,214,173,0.38) 35%, rgba(120,191,188,0.16) 60%, transparent 75%)",
        filter: "blur(52px)",
      }}
    />
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */

export function FunnelSelector() {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(160deg, #F5E6D1 0%, #FCF6ED 45%, #F5E6D1 100%)" }}
    >
      {/* Static warm ambient layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 8% 15%, rgba(255,214,173,0.70) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 92% 85%, rgba(120,191,188,0.30) 0%, transparent 55%)",
        }}
      />

      {/* Lifeline — peach wave, sits inside the bottom fade */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/Vector-4.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-0 w-full"
        style={{ bottom: "60px", opacity: 0.55 }}
      />

      {/* Bottom fade — blends seamlessly into the warm Journey section below */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "140px",
          background: "linear-gradient(to bottom, transparent 0%, #F5E6D1 100%)",
        }}
      />

      {/* Floating gradient blob */}
      <FloatingBlob hoveredIndex={hovered} />

      <div className="relative mx-auto max-w-[1440px] px-[4%]">

        {/* ── Header ── */}
        <div className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Find your path
          </p>
          <h2
            className="mt-3 font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Which one sounds like you?
          </h2>
          <p
            className="mx-auto mt-4 max-w-sm font-body text-midnight/50"
            style={{ fontSize: "0.9375rem", fontStyle: "italic" }}
          >
            Most people are somewhere in one of these three places.
            There&apos;s no wrong place to start.
          </p>
        </div>

        {/* ── Cards ── */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
        >
          {cards.map((card, i) => {
            const isActive = hovered === i;
            const isDimmed = hovered !== null && !isActive;

            return (
              <motion.a
                key={card.cta}
                href={card.href}
                onClick={(e) => handleClick(e, card.href)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="relative flex flex-col overflow-hidden rounded-2xl"
                style={{
                  padding: "2.75rem 2.25rem",
                  backgroundColor: card.bg,
                  border: `1.5px solid ${isActive ? card.hoverBorder : card.border}`,
                  boxShadow: isActive
                    ? "0 20px 52px rgba(3,31,61,0.12), 0 4px 16px rgba(3,31,61,0.07)"
                    : "0 2px 10px rgba(3,31,61,0.04)",
                  opacity: isDimmed ? 0.8 : 1,
                  transform: isActive ? "translateY(-4px)" : "translateY(0px)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease, border-color 0.25s ease",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: card.iconBg }}
                >
                  <Image
                    src={card.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="object-contain"
                    style={{ opacity: 0.85 }}
                  />
                </div>

                {/* Eyebrow */}
                <p
                  className="font-mono uppercase"
                  style={{ fontSize: "11.5px", letterSpacing: "0.12em", color: card.eyebrowColor, lineHeight: 1.4 }}
                >
                  {card.eyebrow}
                </p>

                {/* Headline */}
                <h3
                  className="mt-3 font-heading text-balance"
                  style={{
                    fontSize: "clamp(1.3rem, 1.8vw, 1.55rem)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: card.headingColor,
                  }}
                >
                  {card.headline}
                </h3>

                {/* Body */}
                <p
                  className="mt-4 flex-1 font-body leading-relaxed"
                  style={{ fontSize: "1.0625rem", color: card.bodyColor }}
                >
                  {card.body}
                </p>

                {/* CTA — always visible */}
                <div className="mt-8 border-t pt-6" style={{ borderColor: card.border }}>
                  <span
                    className="font-body font-bold uppercase tracking-wider"
                    style={{ fontSize: "0.875rem", color: card.ctaColor }}
                  >
                    {card.cta} →
                  </span>
                  <p
                    className="mt-1.5 font-mono"
                    style={{ fontSize: "11px", letterSpacing: "0.08em", color: card.bodyColor }}
                  >
                    {card.ctaNote}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
