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
    spinIcon: true,
  },
  {
    n: 2,
    label: "Consult",
    headline: "Talk to a real doctor.",
    copy: "Board-certified sleep specialists review your results and prescribe the right treatment, no referrals or waiting rooms.",
    chips: ["Board-certified", "Same-week consult", "Prescription included"],
    cta: "Meet our doctors",
    href: "/solutions#telehealth",
    image: "/images/people/man-drinking-coffee.png",
    spinIcon: false,
  },
  {
    n: 3,
    label: "Treat",
    headline: "Get your therapy, delivered.",
    copy: "Your CPAP, mask, and accessories ship directly to your door. Already have a prescription? We handle the transfer.",
    chips: ["Insurance billed", "Setup guide included", "Easy transfer"],
    cta: "See CPAP options",
    href: "/solutions#equipment",
    image: "/images/products/cpap-machine.png",
    spinIcon: false,
  },
  {
    n: 4,
    label: "Track",
    headline: "See your progress every morning.",
    copy: "Sleep score, breathing pauses per hour, and therapy trends. All in one place, shared automatically with your care team.",
    chips: ["Nightly sleep score", "AHI tracking", "Shared with doctor"],
    cta: "See the dashboard",
    href: "/solutions#dashboard",
    image: "/images/products/dashboard.png",
    spinIcon: false,
  },
  {
    n: 5,
    label: "Resupply",
    headline: "Never run out of supplies.",
    copy: "We track your usage and auto-ship fresh masks, filters, and tubing before you run out, covered by insurance.",
    chips: ["Auto-scheduled", "Insurance covered", "Doorstep delivery"],
    cta: "Learn about resupply",
    href: "/solutions#resupply",
    image: "/images/people/man-with-pillows.png",
    spinIcon: false,
  },
];

// ── Sticky progress pill ───────────────────────────────────────────────────
function StepPill({ active }: { active: number }) {
  return (
    <div className="sticky top-[72px] z-10 py-3 px-[5vw]">
      <div
        className="inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5"
        style={{
          backgroundColor: "rgba(252,246,237,0.92)",
          backdropFilter: "blur(8px)",
          borderColor: "rgba(3,31,61,0.1)",
        }}
      >
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
    </div>
  );
}

// ── Individual step card ───────────────────────────────────────────────────
function StepCard({
  step,
  cardRef,
}: {
  step: typeof STEPS[number];
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { once: true, margin: "-8% 0px -8% 0px" });

  return (
    <div
      ref={cardRef}
      className="border-b px-[5vw] py-14 md:py-20"
      style={{ borderColor: "rgba(3,31,61,0.07)" }}
    >
      <div
        ref={innerRef}
        className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_44%] md:gap-12"
        style={{ minHeight: "52vh" }}
      >
        {/* ── Text ── */}
        <div className="order-last flex flex-col justify-center md:order-first">

          {/* Step tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "#FF8361" }}
          >
            {String(step.n).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </motion.p>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 font-heading text-4xl font-medium leading-tight md:text-5xl"
            style={{ color: "#031F3D" }}
          >
            {step.headline}
          </motion.h3>

          {/* Copy — capped at 55ch for readability */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.17 }}
            className="mt-4 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.56)", maxWidth: "55ch" }}
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
          </motion.div>
        </div>

        {/* ── Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="relative order-first overflow-hidden rounded-2xl md:order-last h-[260px] md:h-full md:min-h-[360px]"
        >
          <Image
            src={step.image}
            alt={step.headline}
            fill
            className="object-cover"
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const getCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; },
    []
  );

  useEffect(() => {
    function onScroll() {
      // Trigger point: 1/3 down the viewport (below navbar + pill)
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
    onScroll(); // set correct state on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ backgroundColor: "#FCF6ED" }}>

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
            className="mt-3 font-heading text-4xl font-medium leading-tight md:text-5xl"
            style={{ color: "#031F3D" }}
          >
            Everything you need,{" "}
            <br className="hidden sm:block" />
            all in one place.
          </h2>
          <p
            className="mt-4 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.55)", maxWidth: "55ch" }}
          >
            Five steps. One provider. From your first sleep test to your last resupply.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t" style={{ borderColor: "rgba(3,31,61,0.08)" }} />

      {/* Sticky step pill */}
      <StepPill active={active} />

      {/* Step cards */}
      {STEPS.map((step, i) => (
        <StepCard key={step.n} step={step} cardRef={getCardRef(i)} />
      ))}

    </section>
  );
}
