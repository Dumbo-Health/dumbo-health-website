"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STEPS = [
  {
    number: "01",
    title: "Order and complete your intake",
    body: "Order online and fill out a short health questionnaire. No office visit needed. The whole thing takes about ten minutes.",
  },
  {
    number: "02",
    title: "A physician reviews your case",
    body: "A Dumbo Health board-certified physician reviews your intake and sleep study results to confirm you are a good candidate for oral appliance therapy.",
  },
  {
    number: "03",
    title: "Take your dental impression at home",
    body: "We ship a custom impression kit to your door. Follow the simple instructions, take your bite mold, and send it back in the prepaid return envelope.",
  },
  {
    number: "04",
    title: "Your device arrives, ready to wear",
    body: "Your custom-fitted device is fabricated and delivered within two to three weeks. We walk you through how to use it and follow up to make sure it is working.",
  },
];

export function OralHowItWorks() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(to bottom, #F5E6D1 0%, #FCF6ED 100%)" }}
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
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Four steps.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              We handle everything.
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          style={{ maxWidth: "1080px", margin: "0 auto" }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(252,246,237,0.7)",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-heading font-medium mb-4"
                style={{ fontSize: "2.5rem", lineHeight: 1, color: "rgba(255,131,97,0.25)" }}
              >
                {step.number}
              </p>
              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.0625rem, 1.3vw, 1.125rem)", lineHeight: 1.3 }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 font-body text-pretty"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "rgba(3,31,61,0.58)",
                }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
