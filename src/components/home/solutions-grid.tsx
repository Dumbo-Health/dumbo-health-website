"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    n: 1,
    label: "Diagnose",
    headline: "Diagnose at home.",
    copy: "Wear it one night. A licensed physician reviews your results in days, no lab or clinic required.",
    chips: ["Doctor-reviewed", "Fast shipping", "Clear next steps"],
    cta: "Take the sleep test",
    href: "/at-home-sleep-test",
    image: "/images/products/hst-box.png",
  },
  {
    n: 2,
    label: "Consult",
    headline: "Talk to a real doctor.",
    copy: "Board-certified sleep specialists review your results and prescribe the right treatment, no referrals or waiting rooms.",
    chips: ["Board-certified", "Same-week consult", "Prescription included"],
    cta: "Meet our doctors",
    href: "/about-us#medical-team",
    image: "/images/people/man-drinking-coffee.png",
  },
  {
    n: 3,
    label: "Treat",
    headline: "Get your therapy, delivered.",
    copy: "Your CPAP, mask, and accessories ship directly to your door. Already have a prescription? We handle the transfer.",
    chips: ["Setup guide included", "Easy transfer", "Expert support"],
    cta: "See CPAP options",
    href: "/cpap",
    image: "/images/products/cpap-mask-card.png",
    contain: true,
  },
  {
    n: 4,
    label: "Track",
    headline: "See your progress every morning.",
    copy: "Sleep score, breathing pauses per hour, and therapy trends. All in one place, shared automatically with your care team.",
    chips: ["Nightly sleep score", "AHI tracking", "Shared with doctor"],
    cta: "Start your journey",
    href: "/get-started",
    image: "/images/products/dashboard.png",
    contain: true,
  },
  {
    n: 5,
    label: "Resupply",
    headline: "Supplies that never run out. Built in.",
    copy: "Every Dumbo Health CPAP plan tracks the age of your components. When it's time, fresh filters, tubing, and mask parts ship automatically. Included free on select plans, or at member pricing.",
    chips: ["Included in your plan", "Component age tracking", "Auto-shipped"],
    cta: "See what's included",
    href: "/cpap#whats-included",
    image: "/images/people/man-with-pillows.png",
  },
];

// ── Horizontal step rail (replaces broken sticky pill) ─────────────────────
function StepRail({ active, top }: { active: number; top: number }) {
  return (
    <div
      className="sticky z-10 border-b"
      style={{
        top,
        backgroundColor: "rgba(252,246,237,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "rgba(3,31,61,0.08)",
      }}
    >
      {/* Desktop: all 5 steps in a row */}
      <div className="hidden md:flex items-center px-[5vw] py-3 gap-0">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex items-center">
            {/* Connector line between steps */}
            {i > 0 && (
              <div
                style={{
                  width: 28,
                  height: 1,
                  backgroundColor: i <= active ? "rgba(255,131,97,0.4)" : "rgba(3,31,61,0.1)",
                  flexShrink: 0,
                  transition: "background-color 0.3s",
                }}
              />
            )}
            <motion.div
              animate={{ opacity: i === active ? 1 : i < active ? 0.45 : 0.25 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: i === active ? "rgba(255,131,97,0.08)" : "transparent",
                transition: "background-color 0.25s",
              }}
            >
              <span
                className="font-mono text-[11px] font-medium"
                style={{ color: i === active ? "#FF8361" : "#031F3D" }}
              >
                {String(step.n).padStart(2, "0")}
              </span>
              <span
                className="font-body text-xs font-semibold tracking-wide"
                style={{ color: i === active ? "#031F3D" : "#031F3D" }}
              >
                {step.label}
              </span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Mobile: current step + progress bar */}
      <div className="flex md:hidden items-center justify-between px-[5vw] py-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-medium" style={{ color: "#FF8361" }}>
            {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <span style={{ color: "rgba(3,31,61,0.2)" }}>·</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="font-body text-xs font-semibold"
              style={{ color: "#031F3D" }}
            >
              {STEPS[active].label}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Progress bar */}
        <div
          style={{
            width: 72,
            height: 2,
            backgroundColor: "rgba(3,31,61,0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ height: "100%", backgroundColor: "#FF8361", borderRadius: 2 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Individual step card ───────────────────────────────────────────────────
function StepCard({
  step,
  index,
  active,
  cardRef,
}: {
  step: typeof STEPS[number];
  index: number;
  active: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { once: true, margin: "-8% 0px -8% 0px" });
  const isPast = index < active;
  const isActive = index === active;

  return (
    <div
      ref={cardRef}
      className="border-b px-[5vw] py-14 md:py-20"
      style={{ borderColor: "rgba(3,31,61,0.07)" }}
    >
      <div
        ref={innerRef}
        className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_44%] md:gap-12"
        style={{ minHeight: "clamp(320px, 44vh, 600px)" }}
      >
        {/* ── Text ── */}
        <div className="order-last flex flex-col justify-center md:order-first">

          {/* Step tag with timeline node */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-3"
          >
            {/* Timeline node */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isPast || isActive ? "#FF8361" : "transparent",
                border: `1.5px solid ${isPast || isActive ? "#FF8361" : "rgba(3,31,61,0.2)"}`,
                flexShrink: 0,
                transition: "all 0.4s",
              }}
            />
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "#FF8361" }}
            >
              {String(step.n).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            {step.headline}
          </motion.h3>

          {/* Copy */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.17 }}
            className="mt-4 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.65)", maxWidth: "55ch" }}
          >
            {step.copy}
          </motion.p>

          {/* Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {step.chips.map((chip, ci) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: EASE, delay: 0.25 + ci * 0.06 }}
                className="rounded-full px-3.5 py-1.5 font-body text-sm"
                style={{ backgroundColor: "rgba(3,31,61,0.06)", color: "#031F3D" }}
              >
                {chip}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.38 }}
            className="mt-8"
          >
            {(step as typeof step & { comingSoon?: boolean }).comingSoon ? (
              <div className="inline-flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-body text-sm font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(3,31,61,0.07)", color: "rgba(3,31,61,0.35)", cursor: "default" }}
                >
                  {step.cta}
                </span>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 font-mono text-xs uppercase tracking-widest"
                  style={{ backgroundColor: "rgba(120,191,188,0.15)", color: "#5a9e9b" }}
                >
                  Coming Soon
                </span>
              </div>
            ) : (
              <Link
                href={step.href}
                className="group inline-flex items-center gap-2 font-body text-sm font-bold transition-opacity duration-200 hover:opacity-50"
                style={{ color: "#031F3D" }}
              >
                {step.cta}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </motion.div>
        </div>

        {/* ── Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="relative order-first overflow-hidden rounded-2xl md:order-last h-[260px] md:h-full md:min-h-[360px]"
          style={{ backgroundColor: (step as typeof step & { contain?: boolean }).contain ? "#F5E6D1" : undefined }}
        >
          <Image
            src={step.image}
            alt={step.headline}
            fill
            className={(step as typeof step & { contain?: boolean }).contain ? "object-contain" : "object-cover"}
            sizes="(max-width: 768px) 100vw, 44vw"
          />
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export function SolutionsGrid() {
  const [active, setActive] = useState(0);
  const [navHeight, setNavHeight] = useState(72);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setNavHeight(header.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const getCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; },
    []
  );

  useEffect(() => {
    function onScroll() {
      const triggerY = window.innerHeight / 3;
      let activeIdx = 0;
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const top = ref.getBoundingClientRect().top;
        if (top <= triggerY) activeIdx = i;
      });
      setActive(activeIdx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ background: "linear-gradient(180deg, #FCF6ED 0%, rgba(245,230,209,0.45) 100%)" }}>

      {/* Section header */}
      <div className="px-[5vw] pb-4 pt-20 md:pt-28">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="font-mono text-sm uppercase tracking-widest" style={{ color: "#78BFBC" }}>
            Dumbo Health Solutions
          </p>
          <h2
            className="mt-3 font-heading font-medium leading-tight"
            style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Everything you need,{" "}
            <br className="hidden sm:block" />
            all in one place.
          </h2>
          <p
            className="mt-4 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.65)", maxWidth: "55ch" }}
          >
            Five steps. One provider. From your first sleep test to your last resupply.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t" style={{ borderColor: "rgba(3,31,61,0.08)" }} />

      {/* Step rail */}
      <StepRail active={active} top={navHeight} />

      {/* Step cards */}
      {STEPS.map((step, i) => (
        <StepCard key={step.n} step={step} index={i} active={active} cardRef={getCardRef(i)} />
      ))}

    </section>
  );
}
