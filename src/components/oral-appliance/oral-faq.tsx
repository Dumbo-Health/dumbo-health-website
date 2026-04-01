"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FAQS = [
  {
    q: "Who qualifies for oral appliance therapy?",
    a: "Oral appliance therapy is appropriate for adults with mild to low-moderate obstructive sleep apnea, typically an AHI between 5 and 30. It is also an option for people with moderate sleep apnea who have tried CPAP and could not tolerate it. A Dumbo Health physician reviews every case before anything ships.",
  },
  {
    q: "Do I need a sleep study before ordering?",
    a: "Yes. You need a diagnosis from a sleep study before a physician can prescribe oral appliance therapy. If you have not been tested yet, our at-home sleep test can get you a physician-reviewed result within 48 hours.",
  },
  {
    q: "How long does it take to receive my device?",
    a: "After your physician approves your case, we ship the impression kit within two business days. Once we receive your completed mold, your device is fabricated and delivered within two to three weeks.",
  },
  {
    q: "Will insurance cover any of the cost?",
    a: "Most insurance plans do not cover oral appliance therapy through a telehealth provider. Dumbo Health is an out-of-pocket service. Some patients use HSA or FSA funds to pay.",
  },
  {
    q: "What if the device does not work for me?",
    a: "A small percentage of patients find oral appliance therapy is not effective after a full trial. If that happens, our physicians will review your case and guide you toward the right next step, including CPAP therapy if needed.",
  },
  {
    q: "How is this different from a store-bought mouthguard?",
    a: "Over-the-counter mouthguards are not medical devices and are not calibrated to treat sleep apnea. They are designed for teeth grinding, not airway management. The device you receive through Dumbo Health is custom-fabricated from your dental impression, prescribed by a licensed physician, and designed specifically to advance your jaw to the optimal position for your anatomy.",
  },
];

export function OralFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#FCF6ED" }}
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
            Common questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.07 }}
            className="font-heading font-medium text-midnight text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.08 }}
          >
            Questions worth{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              asking first.
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
                  style={{
                    fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                    lineHeight: 1.4,
                  }}
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
                  style={{
                    transform:
                      open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
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
