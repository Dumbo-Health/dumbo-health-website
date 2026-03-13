"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "We identify your machine.",
    body: "Tell us your model, or let us look it up. ResMed, Philips, Fisher and Paykel. We know the supply specs for all of them.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "We match your mask and size.",
    body: "A short quiz tells us your cushion type, frame size, and headgear. No more guessing compatibility. No more returns.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Your profile adapts as you change.",
    body: "Switch machines? Try a different mask style? Update your profile and your next shipment automatically reflects it.",
  },
];

export function BuiltForYourSetup() {
  return (
    <section style={{ backgroundColor: "#F5E6D1" }} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left: heading block */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "#78BFBC" }}
            >
              Built for your setup
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="font-heading font-medium leading-tight text-balance"
              style={{ color: "#031F3D", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              Not generic. Matched to your exact machine and mask.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="mt-5 font-body leading-relaxed"
              style={{ color: "rgba(3,31,61,0.65)", fontSize: "1.125rem", maxWidth: "46ch" }}
            >
              Generic resupply services ship you whatever fits most people.
              Dumbo ships what fits you, specifically. That difference matters
              every night.
            </motion.p>

            {/* Trust closer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
              className="mt-8 rounded-2xl p-6"
              style={{
                backgroundColor: "#FCF6ED",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "1.125rem" }}
              >
                Wrong fit? We replace it for free.
              </p>
              <p
                className="mt-2 font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.6)", fontSize: "1rem" }}
              >
                No questions asked. If a supply doesn&apos;t work with your
                setup, we sort it. That&apos;s part of the service.
              </p>
            </motion.div>
          </div>

          {/* Right: features */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.09 }}
                className="rounded-2xl p-6 flex gap-5"
                style={{
                  backgroundColor: "#FCF6ED",
                  border: "1px solid rgba(3,31,61,0.07)",
                }}
              >
                {/* Icon */}
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl mt-0.5"
                  style={{
                    width: 44,
                    height: 44,
                    backgroundColor: "rgba(120,191,188,0.14)",
                    color: "#78BFBC",
                  }}
                >
                  {feature.icon}
                </div>
                {/* Text */}
                <div>
                  <p
                    className="font-heading font-medium text-midnight"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {feature.title}
                  </p>
                  <p
                    className="mt-2 font-body leading-relaxed"
                    style={{ color: "rgba(3,31,61,0.6)", fontSize: "1rem" }}
                  >
                    {feature.body}
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
