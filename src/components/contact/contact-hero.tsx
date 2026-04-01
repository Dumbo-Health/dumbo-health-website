"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const t = (delay = 0) => ({ ease: EASE, duration: 0.65, delay });

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "80px 5% 72px" }}
    >
      {/* Gradient blobs */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.18, 0.28, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,131,97,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "0%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,191,188,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="relative mx-auto grid items-center gap-12 lg:grid-cols-2"
        style={{ maxWidth: "1200px" }}
      >
        {/* Left column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0)}
            className="mb-5 font-mono text-xs uppercase tracking-widest text-peach"
          >
            Contact
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.08)}
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1.08 }}
          >
            We&apos;re here
            <br />
            for you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.16)}
            className="mt-5 font-body text-lg leading-relaxed"
            style={{ color: "rgba(3,31,61,0.6)", maxWidth: "48ch" }}
          >
            Questions about your treatment, your device, or just not sure where
            to start? Reach out. A real person will get back to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.26)}
            className="mt-8 flex flex-col items-start gap-3"
          >
            <a
              href={CONTACT.phoneTel}
              className="inline-flex items-center gap-3 rounded-[12px] bg-peach px-7 py-3.5 font-body text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 5.95 5.95l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
              </svg>
              {CONTACT.phone}
            </a>

            <Link
              href={`mailto:${CONTACT.email}`}
              className="font-body text-sm font-medium text-midnight/50 transition-colors duration-200 hover:text-peach"
            >
              {CONTACT.email}
            </Link>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={t(0.4)}
          className="relative hidden lg:block"
        >
          <div
            className="overflow-hidden rounded-[24px]"
            style={{ boxShadow: "0 20px 60px rgba(3,31,61,0.12)" }}
          >
            <Image
              src="/images/people/couple-in-bed.png"
              alt="Couple resting peacefully"
              width={600}
              height={480}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          {/* Floating trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.6)}
            className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-[16px] bg-white px-5 py-3.5"
            style={{ boxShadow: "0 8px 32px rgba(3,31,61,0.10)" }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78BFBC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <div>
              <p className="font-body text-sm font-bold text-midnight">Real humans, real answers</p>
              <p className="font-body text-xs" style={{ color: "rgba(3,31,61,0.5)" }}>No bots. No automated queues.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
