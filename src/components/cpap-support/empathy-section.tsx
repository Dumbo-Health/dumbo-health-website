"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PAIN_POINTS = [
  {
    title: "Mask leaks waking you up.",
    body: "You tighten the straps. It helps for a night, then it's back. You start wondering if the mask just wasn't made for your face.",
  },
  {
    title: "Pressure that feels like a fight.",
    body: "Instead of falling asleep, you're working against the machine. The air feels too strong, or not enough. Nobody told you it could be adjusted.",
  },
  {
    title: "Dry mouth and bloating in the morning.",
    body: "You wake up feeling worse than before. Something isn't set right, but you don't know what, and you don't know who to ask.",
  },
  {
    title: "Nights where you just don't wear it.",
    body: "Skipping one night turns into two. It's easier not to bother. You tell yourself you'll get back to it, but you keep putting it off.",
  },
  {
    title: "Nobody is watching your data.",
    body: "Your machine records everything, every night. But the data just sits there. Your next appointment is months away, and nothing changes in between.",
  },
];

export function EmpathySection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Top gradient bridge from Midnight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "30%",
          background:
            "linear-gradient(to bottom, rgba(3,31,61,0.05) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto" style={{ padding: "0 5%" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
          style={{ maxWidth: "640px", margin: "0 auto 3.5rem" }}
        >
          <p
            className="font-mono uppercase tracking-widest mb-5"
            style={{ fontSize: "0.75rem", color: "#78BFBC" }}
          >
            If any of this sounds familiar
          </p>
          <h2
            className="font-heading font-medium text-balance"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "#031F3D",
            }}
          >
            Most people don&apos;t quit CPAP.{" "}
            <span style={{ color: "#FF8361", fontStyle: "italic" }}>
              They just stop getting support.
            </span>
          </h2>
          <p
            className="font-body mt-5 text-pretty"
            style={{
              fontSize: "clamp(1.0625rem, 1.2vw, 1.25rem)",
              lineHeight: 1.8,
              color: "rgba(3,31,61,0.65)",
            }}
          >
            These are not personal failures. They are therapy problems with
            real fixes. Dumbo Health exists to find them before you give up.
          </p>
        </motion.div>

        {/* Pain point cards */}
        <div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          style={{ maxWidth: "960px", margin: "0 auto" }}
        >
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
              className={`rounded-2xl p-7 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{
                backgroundColor: "#FCF6ED",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{ backgroundColor: "rgba(255,131,97,0.5)" }}
              />
              <p
                className="font-heading font-medium text-midnight mb-3"
                style={{ fontSize: "clamp(1.0625rem, 1.1vw, 1.1875rem)", lineHeight: 1.3 }}
              >
                {point.title}
              </p>
              <p
                className="font-body text-pretty"
                style={{
                  fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                  lineHeight: 1.75,
                  color: "rgba(3,31,61,0.62)",
                }}
              >
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
