"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

const carouselImages = [
  "/images/people/man-on-beach.png",
  "/images/people/couple-in-bed.png",
  "/images/people/woman-blue-pajamas.png",
  "/images/people/man-waking-up.png",
  "/images/people/man-drinking-coffee.png",
];

export function BottomCTA() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#78BFBC",
        paddingTop: "80px",
        paddingBottom: "80px",
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
          opacity: 0.12,
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* ── Text ── */}
        <div className="text-center lg:text-left">
          <h2
            className="font-heading font-medium text-white text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Sleep apnea care, made for you
          </h2>
          <p
            className="mt-5 font-body text-pretty lg:mx-0"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              maxWidth: "42ch",
            }}
          >
            Wake up to a better life. Sleep apnea treatment tailored to you,
            from diagnosis to delivery.
          </p>
          <Link
            href={APP_URL}
            className="mt-8 inline-flex h-14 items-center rounded-[12px] px-10 font-body text-base font-bold uppercase tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{
              backgroundColor: "#fff",
              color: "#78BFBC",
              boxShadow: "0 6px 28px rgba(0,0,0,0.12)",
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
        </div>

        {/* ── Photo carousel ── */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl">
          {carouselImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Sleep apnea care lifestyle"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                i === currentImage ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 400px"
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
