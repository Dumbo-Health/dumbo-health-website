"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BottomCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#FF8361",
        paddingTop: "130px",
        paddingBottom: "130px",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      {/* Brand pattern — full-bleed, no tile */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />

      {/* Radial gradient: solid peach at center for legibility, fades to edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 65% at 50% 50%, rgba(255,131,97,0.88) 0%, rgba(255,131,97,0.55) 45%, rgba(255,131,97,0.12) 75%, transparent 100%)",
        }}
      />

      {/* ── Floating photo cards ── */}

      {/* Top-left (lg+) */}
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: "20px",
          left: "48px",
          transform: "rotate(-5deg)",
          transformOrigin: "bottom right",
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "186px",
            height: "234px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <Image
            src="/images/people/man-smiling-in-bed-2.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="186px"
          />
        </div>
      </div>

      {/* Bottom-right (lg+) */}
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          bottom: "20px",
          right: "48px",
          transform: "rotate(4deg)",
          transformOrigin: "top left",
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "200px",
            height: "250px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <Image
            src="/images/people/girl-in-bed.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="200px"
          />
        </div>
      </div>

      {/* Top-right (xl+) */}
      <div
        className="pointer-events-none absolute hidden xl:block"
        style={{
          top: "40px",
          right: "56px",
          transform: "rotate(3deg)",
          transformOrigin: "bottom left",
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "160px",
            height: "200px",
            boxShadow: "0 10px 32px rgba(0,0,0,0.18)",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        >
          <Image
            src="/images/people/woman-blue-pajamas.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="160px"
          />
        </div>
      </div>

      {/* Bottom-left (xl+) */}
      <div
        className="pointer-events-none absolute hidden xl:block"
        style={{
          bottom: "40px",
          left: "56px",
          transform: "rotate(-3deg)",
          transformOrigin: "top right",
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width: "160px",
            height: "200px",
            boxShadow: "0 10px 32px rgba(0,0,0,0.18)",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        >
          <Image
            src="/images/people/man-with-pillows.png"
            alt=""
            fill
            className="object-cover object-top"
            sizes="160px"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <FadeUp className="relative z-10 mx-auto max-w-2xl text-center">
        <h2
          className="font-heading font-medium text-white text-balance"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Sleep apnea care, made for you
        </h2>
        <p
          className="mx-auto mt-5 font-body text-pretty"
          style={{
            color: "rgba(255,255,255,0.85)",
            maxWidth: "44ch",
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          }}
        >
          Wake up to a better life. Sleep apnea treatment tailored to you, from
          diagnosis to delivery.
        </p>
        <Link
          href={APP_URL}
          className="mt-8 inline-flex h-14 items-center rounded-[12px] px-10 font-body text-base font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          style={{
            backgroundColor: "#fff",
            color: "#FF8361",
            boxShadow: "0 6px 28px rgba(0,0,0,0.15)",
          }}
        >
          Start now
        </Link>
        <p
          className="mt-4 font-body text-sm"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          No insurance required &middot; Ships next business day
        </p>
      </FadeUp>
    </section>
  );
}
