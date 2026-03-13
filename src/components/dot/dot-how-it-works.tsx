"use client";

import { motion } from "framer-motion";
import { SHOPIFY } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    title: "Order from anywhere",
    body: "No clinic visit, no appointment. Ships to your home, hotel, or terminal — wherever you are. Order online and your kit is on its way within one business day.",
  },
  {
    number: "02",
    title: "Complete your 2-minute intake",
    body: "After ordering, answer a short medical questionnaire. Our physicians review it before your kit ships. This is how we confirm the test is right for you and get a physician in your corner from day one.",
  },
  {
    number: "03",
    title: "Wear it one night",
    body: "The WatchPAT ONE attaches to your wrist and finger. Wear it during one night of sleep — in your own bed, a hotel, or anywhere you rest. No lab. No technician. No unfamiliar environment.",
  },
  {
    number: "04",
    title: "Receive your documentation package",
    body: "Within 48 hours: your AHI sleep study report, a physician diagnosis letter, and a prescription if sleep apnea is confirmed. Everything your DOT medical examiner needs, in one package.",
  },
];

export function DotHowItWorks() {
  return (
    <section
      id="dot-how-it-works"
      className="relative py-20 md:py-24"
      style={{
        background: "linear-gradient(to bottom, #FCF6ED 0%, #FCF6ED 70%, #F5E6D1 100%)",
      }}
    >
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div className="text-center" style={{ maxWidth: "560px", margin: "0 auto 3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            From order to documentation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Under a week.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              From your truck.
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "1080px", margin: "0 auto" }}
        >
          {STEPS.map((s, i) => (
            <motion.div
              key={s.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="relative"
            >
              {/* Dashed connector (desktop) */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute hidden lg:block"
                  style={{
                    top: "1.25rem",
                    left: "calc(100% + 10px)",
                    width: "calc(100% - 20px)",
                    height: "1px",
                    borderTop: "1.5px dashed rgba(3,31,61,0.12)",
                  }}
                />
              )}
              <div
                className="h-full rounded-2xl bg-white p-6"
                style={{
                  border: "1px solid rgba(3,31,61,0.07)",
                  boxShadow: "0 2px 16px rgba(3,31,61,0.05)",
                }}
              >
                <div
                  className="mb-4 inline-flex items-center justify-center rounded-full font-mono font-bold"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundColor: "#FF8361",
                    color: "#fff",
                    fontSize: "0.72rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.number}
                </div>
                <h3
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.3, marginBottom: "0.5rem" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body text-pretty"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(3,31,61,0.58)" }}
                >
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href={SHOPIFY.buyUrl}
            data-shopify-checkout="sleep-test"
            className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 20px rgba(255,131,97,0.3)",
              height: "52px",
              paddingLeft: "2.25rem",
              paddingRight: "2.25rem",
            }}
          >
            Order my sleep test, $149
          </a>
        </motion.div>
      </div>
    </section>
  );
}
