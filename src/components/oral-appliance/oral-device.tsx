"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FEATURES = [
  {
    label: "Custom fit",
    detail:
      "Made from a dental impression of your mouth. It fits you and only you.",
  },
  {
    label: "Silent",
    detail:
      "No motor, no airflow noise. Your partner will never know it is there.",
  },
  {
    label: "Compact",
    detail:
      "Fits in a case smaller than a deck of cards. Pack it with your toothbrush.",
  },
  {
    label: "Clinically validated",
    detail:
      "Mandibular advancement devices are recommended in clinical guidelines for mild to moderate sleep apnea.",
  },
  {
    label: "3-year guarantee",
    detail: "If the device breaks or no longer fits, we replace it.",
  },
  {
    label: "Physician-supervised",
    detail:
      "A board-certified sleep medicine physician reviews and signs off on your device.",
  },
];

export function OralDevice() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background: "linear-gradient(to bottom, #FCF6ED 0%, #FFD6AD 100%)",
      }}
    >
      <div style={{ padding: "0 5%" }}>
        {/* Header */}
        <div
          className="text-center"
          style={{ maxWidth: "560px", margin: "0 auto 3.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            The device
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Custom fit.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Clinically validated. Pocket-sized.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
            className="mt-5 font-body text-pretty"
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              lineHeight: 1.75,
              color: "rgba(3,31,61,0.62)",
            }}
          >
            A mandibular advancement device gently positions your lower jaw
            forward while you sleep, keeping your airway open. The result is
            fewer breathing pauses, better oxygen levels, and a quieter night.
          </motion.p>
        </div>

        {/* Feature grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: EASE },
                },
              }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(252,246,237,0.75)",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <span
                className="inline-block mb-2 h-1.5 w-6 rounded-full"
                style={{ backgroundColor: "#78BFBC" }}
              />
              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
              >
                {f.label}
              </h3>
              <p
                className="mt-2 font-body text-pretty"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  color: "rgba(3,31,61,0.58)",
                }}
              >
                {f.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
