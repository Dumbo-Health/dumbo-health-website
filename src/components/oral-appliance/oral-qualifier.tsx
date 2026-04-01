"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const GOOD_FIT = [
  "Diagnosed with mild to low-moderate sleep apnea",
  "Have tried CPAP and could not tolerate it",
  "Travel frequently and want something portable",
  "Share a bed and need a quiet solution",
  "Prefer a machine-free night",
];

const CPAP_BETTER = [
  "Moderate to severe sleep apnea (AHI above 30)",
  "Severe oxygen desaturation during sleep",
  "Currently doing well on CPAP therapy",
  "Complex sleep-disordered breathing",
];

export function OralQualifier() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div style={{ padding: "0 5%" }}>
        {/* Header */}
        <div
          className="text-center"
          style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            Is this right for you?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Not every sleep apnea patient{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              needs a machine.
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
            Oral appliance therapy is clinically proven for the right
            candidates. Our physicians review every case to confirm you qualify
            before anything ships.
          </motion.p>
        </div>

        {/* Two columns */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-5 md:grid-cols-2"
          style={{ maxWidth: "820px", margin: "0 auto" }}
        >
          {/* Good fit */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#031F3D",
              border: "1px solid rgba(120,191,188,0.2)",
              boxShadow: "0 8px 32px rgba(3,31,61,0.14)",
            }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-widest mb-5"
              style={{ color: "#78BFBC" }}
            >
              A good fit if you...
            </p>
            <ul className="space-y-3">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "#78BFBC" }}
                  />
                  <span
                    className="font-body"
                    style={{
                      fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                      lineHeight: 1.6,
                      color: "rgba(252,246,237,0.8)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CPAP better */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
            }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#FCF6ED",
              border: "1px solid rgba(3,31,61,0.1)",
              boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
            }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-widest mb-5"
              style={{ color: "rgba(3,31,61,0.4)" }}
            >
              CPAP may be better if...
            </p>
            <ul className="space-y-3">
              {CPAP_BETTER.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "rgba(3,31,61,0.25)" }}
                  />
                  <span
                    className="font-body"
                    style={{
                      fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                      lineHeight: 1.6,
                      color: "rgba(3,31,61,0.65)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-6 font-body text-xs leading-relaxed"
              style={{
                color: "rgba(3,31,61,0.4)",
                borderTop: "1px solid rgba(3,31,61,0.08)",
                paddingTop: "1rem",
              }}
            >
              Not sure which applies to you? Our physicians review your case
              before recommending a path forward.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
