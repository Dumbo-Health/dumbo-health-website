"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const QUESTIONS = [
  {
    q: "Do I need to buy a new CPAP?",
    a: "No. Dumbo Health works with your existing machine. We connect to your device's data portal. Nothing ships unless you want it to. You keep your equipment.",
  },
  {
    q: "Does this work with my machine?",
    a: "Dumbo Health is compatible with most major CPAP brands, including ResMed, Philips, and Fisher and Paykel. If your machine syncs to a data app, we can most likely connect to it. You can confirm compatibility in under a minute at sign-up.",
  },
  {
    q: "What if I have already been struggling for a while?",
    a: "That is exactly who this is for. The longer a problem goes unaddressed, the more it feels permanent. It usually isn't. Our clinical team has helped people reestablish consistent therapy after months of avoidance. Start where you are.",
  },
  {
    q: "Is my therapy data private?",
    a: "Yes. Dumbo Health is fully HIPAA-compliant. Your data is encrypted, never sold, and only accessed by your care team to support your therapy. You can revoke access at any time.",
  },
];

function QuestionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(3,31,61,0.08)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="font-heading font-medium text-midnight text-pretty"
          style={{ fontSize: "1.0625rem", lineHeight: 1.4 }}
        >
          {question}
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
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="font-body pb-6 text-pretty"
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                lineHeight: 1.75,
                color: "rgba(3,31,61,0.62)",
                maxWidth: "64ch",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ObjectionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      <div className="relative mx-auto" style={{ padding: "0 5%" }}>
        <div
          className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Left: header */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: "#78BFBC" }}
            >
              Common questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight text-balance text-midnight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Questions we hear often.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed text-pretty"
              style={{ color: "rgba(3,31,61,0.62)", fontSize: "1.0625rem", maxWidth: "40ch" }}
            >
              Straight answers to the things that make people hesitate.
            </motion.p>
          </div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          >
            {QUESTIONS.map((item, i) => (
              <QuestionItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
