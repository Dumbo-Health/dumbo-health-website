"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SIGNALS = [
  {
    label: "Mask leaks",
    description: "Your cushion or size may need adjusting. One change can fix months of disrupted nights.",
  },
  {
    label: "Pressure discomfort",
    description: "Your prescribed pressure may no longer match your needs. A therapy review changes everything.",
  },
  {
    label: "Skipped nights",
    description: "Usually a comfort issue, not a motivation issue. The right support gets you back within days.",
  },
  {
    label: "Fragmented sleep",
    description: "Events happening mid-therapy show up in your data. They should trigger an intervention, not a guess.",
  },
];

export function ReframeSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#FCF6ED", isolation: "isolate" }}
    >
      <div className="relative mx-auto" style={{ padding: "0 5%" }}>
        <div
          className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-start"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Left: the reframe */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#78BFBC" }}
            >
              A different way to see it
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight text-balance"
              style={{ color: "#031F3D", fontSize: "clamp(2.2rem, 4vw, 3.25rem)" }}
            >
              Adherence isn&apos;t discipline.{" "}
              <span style={{ color: "#FF8361", fontStyle: "italic" }}>
                It&apos;s feedback and support.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed text-pretty"
              style={{ color: "rgba(3,31,61,0.68)", fontSize: "clamp(1.0625rem, 1.2vw, 1.25rem)", maxWidth: "46ch" }}
            >
              Every time someone stops using their CPAP (Continuous Positive
              Airway Pressure) machine, there is a signal in the data that
              explains why. It just went unread. Dumbo Health reads it and acts
              on it before you give up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              className="mt-8 rounded-2xl p-6"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1.125rem" }}
              >
                Your therapy is already working. It just needs someone watching it.
              </p>
              <p
                className="mt-2 font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.65)", fontSize: "clamp(1rem, 1.1vw, 1.125rem)" }}
              >
                Dumbo Health monitors your nightly data, identifies patterns,
                and connects you with clinical support when something needs
                attention. Automatically, between appointments.
              </p>
            </motion.div>

          </div>

          {/* Right: signals */}
          <div className="flex flex-col gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-1"
              style={{ color: "rgba(3,31,61,0.38)" }}
            >
              What the data is telling you
            </motion.p>
            {SIGNALS.map((signal, i) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.08 }}
                className="flex gap-5 rounded-2xl p-6"
                style={{
                  backgroundColor: "#F5E6D1",
                  border: "1px solid rgba(3,31,61,0.07)",
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl mt-0.5"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(120,191,188,0.14)",
                    color: "#78BFBC",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{ fontSize: "1.0625rem" }}
                  >
                    {signal.label}
                  </p>
                  <p
                    className="mt-2 font-body leading-relaxed"
                    style={{ color: "rgba(3,31,61,0.65)", fontSize: "clamp(1rem, 1.1vw, 1.125rem)" }}
                  >
                    {signal.description}
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
