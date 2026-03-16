"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FAQS = [
  {
    q: "Does my DOT medical examiner accept a home sleep test?",
    a: "Most do. The FMCSA has no regulation requiring an in-lab study — examiners use clinical judgment under 49 CFR 391.41. The WatchPAT ONE is FDA-cleared and produces the AHI report and physician letter examiners standard expect. We recommend confirming with your specific examiner before ordering, particularly if you drive for a large carrier with an in-house clinic.",
  },
  {
    q: "What documentation will I receive from Dumbo Health?",
    a: "Your package includes: a physician-reviewed sleep study report showing your AHI (breathing pauses per hour), oxygen saturation, and RDI; a signed physician letter confirming your diagnosis and fitness to drive; and a prescription if sleep apnea is confirmed. Everything arrives by email within 48 hours of completing your test.",
  },
  {
    q: "How long until I can get back behind the wheel?",
    a: "With a negative result (no sleep apnea), you return to your medical examiner with your clearance report right away. With a positive result, most examiners require 30 days of CPAP compliance data before re-certification. We generate that compliance report for you through your Dumbo Health CPAP plan.",
  },
  {
    q: "What if I test positive for sleep apnea?",
    a: "A positive result means CPAP therapy is required for DOT re-certification. Dumbo Health sets up your CPAP, monitors your nightly usage, and generates the 30-day compliance report your examiner needs. Your first month of CPAP is free when you start a plan after a positive test with Dumbo Health.",
  },
  {
    q: "Can I order if I am currently on the road?",
    a: "Yes. The kit ships to any address — your home, a hotel, or a terminal. You need one night of sleep and the ability to receive and return a small package. Return shipping is prepaid and included.",
  },
  {
    q: "What if my examiner requires an in-lab study instead?",
    a: "If your medical examiner requires in-lab polysomnography and will not accept a home sleep test report, contact us and we will refund your test. We would rather be honest about the process than have you spend money on something your examiner will not accept.",
  },
];

export function DotFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28" style={{ backgroundColor: "#FCF6ED" }}>
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div className="text-center" style={{ maxWidth: "580px", margin: "0 auto 3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.72rem", color: "#78BFBC" }}
          >
            CDL driver FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Questions drivers{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              actually ask.
            </span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
              style={{ borderBottom: "1px solid rgba(3,31,61,0.08)" }}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-heading font-medium text-midnight"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.125rem)", lineHeight: 1.4 }}
                >
                  {faq.q}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#78BFBC"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="pb-6 font-body text-pretty"
                      style={{
                        fontSize: "clamp(0.9375rem, 1vw, 1rem)",
                        lineHeight: 1.75,
                        color: "rgba(3,31,61,0.62)",
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
