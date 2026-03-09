"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/content/testimonials";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function StarRow() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#FF8361">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-8% 0px" });

  return (
    <section
      style={{ backgroundColor: "#031F3D", minHeight: "65vh" }}
      className="py-24 md:py-32"
    >
      <div style={{ padding: "0 5%" }}>

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "#78BFBC" }}
          >
            Sleep Experts
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="font-heading font-medium leading-tight"
            style={{
              color: "#FCF6ED",
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              maxWidth: "18ch",
            }}
          >
            What sleep experts are saying about Dumbo Health.
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.1 }}
              className="flex flex-col justify-between rounded-2xl p-8 md:p-10"
              style={{
                backgroundColor: "rgba(252,246,237,0.05)",
                border: "1px solid rgba(252,246,237,0.08)",
              }}
            >
              {/* Top: stars + quote */}
              <div>
                <StarRow />

                {/* Large opening quote mark */}
                <svg
                  width="36" height="36" viewBox="0 0 24 24"
                  fill="rgba(255,131,97,0.25)"
                  className="mb-4"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote text — big */}
                <p
                  className="font-body leading-relaxed"
                  style={{
                    color: "#FCF6ED",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: author */}
              <div
                className="mt-8 pt-6 flex items-center gap-4"
                style={{ borderTop: "1px solid rgba(252,246,237,0.1)" }}
              >
                <div
                  className="relative shrink-0 overflow-hidden rounded-full"
                  style={{ width: 52, height: 52, border: "1.5px solid rgba(255,131,97,0.3)" }}
                >
                  <Image
                    src={`/images/team/doctor-${(i % 3) + 1}.jpg`}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="52px"
                  />
                </div>
                <div>
                  <p
                    className="font-heading text-lg font-medium"
                    style={{ color: "#FCF6ED" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-mono text-xs mt-0.5"
                    style={{ color: "#78BFBC" }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
