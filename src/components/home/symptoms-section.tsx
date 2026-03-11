"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SHOPIFY, CONTACT } from "@/lib/constants";

const symptoms = [
  {
    word: "energy",
    name: "Always tired",
    statement: "Wake up actually wanting to get out of bed.",
    icon: "⚡",
    gradient: "from-peach/15 to-light-peach/10",
    mobileVisible: true,
  },
  {
    word: "silence",
    name: "Loud snoring",
    statement: "Better nights for you and everyone around you.",
    icon: "🌙",
    gradient: "from-midnight/[0.06] to-midnight/[0.02]",
    mobileVisible: true,
  },
  {
    word: "focus",
    name: "Can't focus",
    statement: "Clear thinking starts with deep sleep.",
    icon: "🎯",
    gradient: "from-teal/10 to-teal/[0.03]",
    mobileVisible: true,
  },
  {
    word: "calm",
    name: "Anxiety & stress",
    statement: "Your body's natural reset, every single night.",
    icon: "🧘",
    gradient: "from-sunlight to-daylight",
    mobileVisible: true,
  },
  {
    word: "health",
    name: "High blood pressure",
    statement: "Support your heart while you sleep.",
    icon: "❤️",
    gradient: "from-peach/10 to-peach/[0.03]",
    mobileVisible: false,
  },
  {
    word: "body",
    name: "Hard to lose weight",
    statement: "Your metabolism works better when you sleep better.",
    icon: "🏃",
    gradient: "from-teal/8 to-daylight",
    mobileVisible: false,
  },
  {
    word: "drive",
    name: "Low sex drive",
    statement: "Restful sleep restores what you've been missing.",
    icon: "🔥",
    gradient: "from-light-peach/20 to-sunlight/50",
    mobileVisible: false,
  },
  {
    word: "strength",
    name: "Constantly sick",
    statement: "Deep sleep powers your immune system nightly.",
    icon: "🛡️",
    gradient: "from-midnight/[0.05] to-teal/5",
    mobileVisible: false,
  },
];

export function SymptomsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % symptoms.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 2200);
    return () => clearInterval(timer);
  }, [advance]);

  const activeWord = symptoms[activeIndex].word;

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ─── Dynamic title ─── */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Sound familiar?
          </p>
          <h2
            className="mt-2 font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
          >
            Get your{" "}
            <span className="relative inline-block">
              <span
                key={activeWord}
                className="inline-block animate-fade-in text-peach"
              >
                {activeWord}
              </span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 6"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M1 4C30 1.5 60 1.5 80 2.5C95 3.5 110 4 119 2.5"
                  stroke="#FF8361"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </span>{" "}
            back.
          </h2>
          <p className="mx-auto mt-3 font-body text-midnight/50" style={{ fontSize: "1.0625rem", maxWidth: "44ch" }}>
            Sleep apnea shows up in ways you wouldn&apos;t expect. Tap a
            symptom and see what better sleep can do.
          </p>
        </div>

        {/* ─── Two CTA cards on top ─── */}
        <div className="mt-5 grid gap-3 md:mt-7 md:grid-cols-2 md:gap-4">
          {/* Get diagnosed CTA — with background image */}
          <Link
            href={SHOPIFY.buyUrl}
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-midnight/10"
          >
            <div className="relative aspect-[2/1] md:aspect-[2/1]">
              <Image
                src="/images/products/hst-box.png"
                alt="At-home sleep test, simple, comfortable, one night"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/40 to-midnight/10" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-teal">
                  At-home sleep test
                </p>
                <h3 className="mt-1 font-heading text-xl font-medium text-white md:text-2xl">
                  Find out why you feel this way
                </h3>
                <p className="mt-2 max-w-xs font-body text-sm text-white/60">
                  One night. Clear answers. A path to feeling like yourself again.
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 font-body text-sm font-bold text-peach transition-colors group-hover:text-light-peach">
                  Get your test for $149
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Talk to us CTA — text-forward with warm bg */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-sunlight via-daylight to-light-peach/20 p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-peach/10 md:p-6"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-teal">
                We&apos;re here for you
              </p>
              <h3 className="mt-2 font-heading text-xl font-medium text-midnight md:text-2xl">
                Not sure where to start?
                <br />
                <span className="text-peach">Let&apos;s figure it out together.</span>
              </h3>
              <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-midnight/50">
                Our care team listens first. No pressure, no jargon, just
                real people who want to help you sleep better.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 font-body text-sm font-bold text-teal transition-colors group-hover:text-midnight">
              Talk to our team
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* ─── Symptom cards: 2x4 grid (4 on mobile, 8 on desktop) ─── */}
        <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-4 md:grid-cols-4 md:gap-3">
          {symptoms.map((s, i) => {
            const isActive = activeIndex === i;
            const isHovered = hoveredIndex === i;
            const highlighted = isActive || isHovered;

            return (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-3.5 text-left transition-all duration-300 ease-out md:p-4
                  ${!s.mobileVisible ? "hidden md:block" : ""}
                  ${
                    highlighted
                      ? "border-peach/25 shadow-md shadow-peach/8 -translate-y-0.5"
                      : "border-transparent hover:-translate-y-0.5 hover:border-sunlight hover:shadow-sm"
                  }
                `}
              >
                {/* Gradient bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-opacity duration-300 ${
                    highlighted ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                  }`}
                />

                <div className="relative z-10">
                  <span
                    className={`inline-block text-lg transition-transform duration-300 ${
                      highlighted ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    {s.icon}
                  </span>
                  <p
                    className={`mt-1.5 font-heading text-sm font-medium transition-colors duration-300 ${
                      highlighted ? "text-peach" : "text-midnight"
                    }`}
                  >
                    {s.name}
                  </p>
                  <p className="mt-1 font-body text-xs leading-relaxed text-midnight/45">
                    {s.statement}
                  </p>
                </div>

                {isActive && (
                  <div className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-peach" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
