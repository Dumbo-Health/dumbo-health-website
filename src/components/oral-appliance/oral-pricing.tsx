"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const INCLUDED = [
  "Physician review and eligibility confirmation",
  "Custom dental impression kit, shipped to you",
  "Custom-fabricated mandibular advancement device",
  "Physician-signed prescription and documentation",
  "Fitting guidance and follow-up support",
  "3-year device guarantee",
  "Free return shipping",
];

const COST_COMPARE = [
  { label: "Oral appliance therapy (one-time)", value: "$3,490", highlight: false },
  { label: "CPAP machine + supplies, year one", value: "~$1,500", highlight: false },
  { label: "CPAP machine + supplies, three years", value: "~$3,200", highlight: false },
  { label: "CPAP therapy with Dumbo Health", value: "from $2/day", sub: "less than $60/mo", highlight: true },
];

export function OralPricing() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        background: "linear-gradient(to bottom, #FFD6AD 0%, #FCF6ED 100%)",
      }}
    >
      <div style={{ padding: "0 5%" }}>
        {/* Header */}
        <div
          className="text-center"
          style={{ maxWidth: "540px", margin: "0 auto 3.5rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            $3,490.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              Everything included.
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
            One payment. No subscriptions. No ongoing supply costs. Your device
            lasts for years, not months.
          </motion.p>
        </div>

        <div
          className="grid gap-6 md:grid-cols-2"
          style={{ maxWidth: "880px", margin: "0 auto" }}
        >
          {/* What is included */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#031F3D",
              border: "1px solid rgba(120,191,188,0.2)",
              boxShadow: "0 8px 32px rgba(3,31,61,0.14)",
            }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-widest mb-6"
              style={{ color: "#78BFBC" }}
            >
              What&apos;s included
            </p>
            <ul className="space-y-3">
              {INCLUDED.map((item) => (
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

          {/* Cost context */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "rgba(252,246,237,0.8)",
                border: "1px solid rgba(3,31,61,0.08)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-5"
                style={{ color: "rgba(3,31,61,0.4)" }}
              >
                Cost in context
              </p>
              <ul className="space-y-3">
                {COST_COMPARE.map((row, i) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
                    style={
                      row.highlight
                        ? {
                            backgroundColor: "rgba(255,131,97,0.08)",
                            border: "1px solid rgba(255,131,97,0.22)",
                          }
                        : {
                            borderBottom:
                              i < COST_COMPARE.length - 2
                                ? "1px solid rgba(3,31,61,0.07)"
                                : "none",
                          }
                    }
                  >
                    <span
                      className="font-body"
                      style={{
                        fontSize: "0.9375rem",
                        color: row.highlight ? "#FF8361" : "rgba(3,31,61,0.65)",
                        lineHeight: 1.4,
                        fontWeight: row.highlight ? 600 : 400,
                      }}
                    >
                      {row.label}
                    </span>
                    <div className="text-right shrink-0">
                      <span
                        className="font-heading font-medium block"
                        style={{
                          fontSize: "1.125rem",
                          color: row.highlight ? "#FF8361" : "#031F3D",
                        }}
                      >
                        {row.value}
                      </span>
                      {"sub" in row && row.sub && (
                        <span
                          className="font-body"
                          style={{ fontSize: "0.75rem", color: "rgba(255,131,97,0.7)" }}
                        >
                          {row.sub}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl px-7 py-5"
              style={{
                backgroundColor: "rgba(120,191,188,0.1)",
                border: "1px solid rgba(120,191,188,0.25)",
              }}
            >
              <p
                className="font-body leading-relaxed"
                style={{ fontSize: "0.9375rem", color: "rgba(3,31,61,0.65)" }}
              >
                Oral appliance therapy is a one-time investment. No refills. No
                mask replacements. No monthly plan. If your AHI is in the right
                range, this may be the most practical long-term option.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
