"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function IconMaskCushion() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20 C8 14, 16 10, 24 10 C32 10, 40 14, 40 20" />
      <path d="M8 20 C8 28, 12 34, 24 36 C36 34, 40 28, 40 20" />
      <path d="M16 20 C16 23, 19 26, 24 26 C29 26, 32 23, 32 20" />
      <path d="M24 10 L24 6" />
      <path d="M20 6 L28 6" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="10" width="28" height="28" rx="3" />
      <line x1="10" y1="18" x2="38" y2="18" />
      <line x1="10" y1="24" x2="38" y2="24" />
      <line x1="10" y1="30" x2="38" y2="30" />
      <line x1="18" y1="10" x2="18" y2="38" />
      <line x1="30" y1="10" x2="30" y2="38" />
    </svg>
  );
}

function IconTubing() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 38 C10 30, 10 26, 18 22 C26 18, 38 18, 38 10" />
      <path d="M14 38 C14 30, 14 26, 22 22 C30 18, 38 18, 38 14" />
      <line x1="10" y1="38" x2="14" y2="38" />
      <line x1="38" y1="10" x2="38" y2="14" />
    </svg>
  );
}

function IconChamber() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="14" width="28" height="22" rx="4" />
      <path d="M18 14 L18 10" />
      <path d="M30 14 L30 10" />
      <path d="M16 10 L32 10" />
      <path d="M16 26 C16 29, 20 31, 24 31 C28 31, 32 29, 32 26" strokeDasharray="2 2" />
    </svg>
  );
}

const COMPONENTS = [
  {
    Icon: IconMaskCushion,
    name: "Full mask",
    cadence: "Yearly",
    note: "Your full mask degrades from moisture and nightly wear. Annual replacement keeps the seal tight, the silicone fresh, and your pressure delivery accurate.",
  },
  {
    Icon: IconFilter,
    name: "Disposable filter",
    cadence: "Every 2 weeks",
    note: "Filters catch dust and allergens before air enters your machine. A clogged filter makes your motor work harder.",
  },
  {
    Icon: IconTubing,
    name: "Tubing",
    cadence: "Every 3 months",
    note: "Micro-tears in the hose let humidified air condense and create moisture you can't see. Replace it before it becomes a problem.",
  },
  {
    Icon: IconChamber,
    name: "Humidifier chamber",
    cadence: "Every 6 months",
    note: "Mineral deposits build up over time regardless of how often you clean. A fresh chamber keeps humidity consistent.",
  },
];

export function SupplyVisuals() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      {/* Gradient: Light Peach top → Daylight mid → Sunlight bottom (hands off to Built for Setup) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,214,173,0.45) 0%, transparent 35%, transparent 65%, rgba(245,230,209,0.85) 100%)",
        }}
      />

      <div className="relative" style={{ padding: "0 5%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "640px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            Your quarterly box
          </p>
          <h2
            className="font-heading font-medium text-balance text-midnight"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
          >
            Every component.{" "}
            <span style={{ color: "#FF8361" }}>On the right schedule.</span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            Each part of your CPAP setup has a different lifespan. Most people
            replace everything at once, or never. Dumbo tracks each component
            separately so you get exactly what needs replacing, when it needs
            replacing.
          </p>
        </motion.div>

        {/* Component cards */}
        <div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {COMPONENTS.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl p-6 flex flex-col gap-5"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: "rgba(120,191,188,0.12)",
                  color: "#78BFBC",
                }}
              >
                <comp.Icon />
              </div>

              {/* Name + cadence */}
              <div>
                <p
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {comp.name}
                </p>
                {/* Cadence chip — the signature detail */}
                <span
                  className="inline-block mt-2 font-mono uppercase tracking-widest rounded-full px-2.5 py-1"
                  style={{
                    fontSize: "0.6rem",
                    backgroundColor: "rgba(120,191,188,0.18)",
                    color: "#78BFBC",
                  }}
                >
                  {comp.cadence}
                </span>
              </div>

              {/* Note */}
              <p
                className="font-body leading-relaxed mt-auto"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(3,31,61,0.60)",
                  lineHeight: 1.65,
                }}
              >
                {comp.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center font-body mt-10"
          style={{
            fontSize: "0.9375rem",
            color: "rgba(3,31,61,0.40)",
            maxWidth: "52ch",
            margin: "2.5rem auto 0",
          }}
        >
          Humidifier chamber replacement is included in the Elite plan. All
          other components ship across every plan.
        </motion.p>
      </div>
    </section>
  );
}
