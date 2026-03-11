"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BENTO = [
  { type: "photo", src: "/images/people/girl-laying-in-bed.png",     alt: "Waking up refreshed",        aspect: "aspect-square" },
  { type: "icon",  src: "/images/icon-asterisk.png",                  bg: "#FF8361",                     aspect: "aspect-square" },
  { type: "photo", src: "/images/people/man-smiling-in-bed-1.png",   alt: "Man resting well",           aspect: "aspect-square" },
  { type: "icon",  src: "/images/icon-clover.png",                    bg: "#031F3D",                     aspect: "aspect-square" },
  { type: "icon",  src: "/images/icon-moon.png",                      bg: "#78BFBC",                     aspect: "aspect-square" },
  { type: "photo", src: "/images/people/woman-blue-pajamas.png",      alt: "Woman ready for a good night", aspect: "aspect-square" },
  { type: "icon",  src: "/images/icon-heart.png",                     bg: "#F5E6D1",                     aspect: "aspect-square" },
  { type: "photo", src: "/images/people/man-waking-up.png",           alt: "Man starting his day well",  aspect: "aspect-square" },
];

export function AboutHero() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "#F5E6D1", isolation: "isolate" }}
    >
      {/* Brand pattern — sides only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/brand-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.5,
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 10%, transparent 27%, transparent 73%, black 90%, black 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        {/* Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="font-mono text-xs uppercase tracking-widest mb-5"
            style={{ color: "#78BFBC" }}
          >
            About us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="font-heading font-medium text-midnight text-balance leading-[1.06]"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
          >
            We built the company{" "}
            <span style={{ color: "rgba(3,31,61,0.38)" }}>
              we wish had existed.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="mt-6 font-body leading-relaxed mx-auto text-balance"
            style={{
              fontSize: "1.125rem",
              color: "rgba(3,31,61,0.65)",
              maxWidth: "52ch",
            }}
          >
            Sleep apnea affects tens of millions of people. Most of them are
            navigating it alone, confused, or priced out. Dumbo exists to
            change that.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg bg-midnight px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-midnight/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight/85 hover:shadow-xl active:translate-y-0"
            >
              <a href={APP_URL}>Take the sleep test</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 px-8 font-body text-base font-medium rounded-lg transition-all hover:bg-midnight/8"
              style={{ color: "rgba(3,31,61,0.5)" }}
            >
              <Link href="/pricing">See our plans</Link>
            </Button>
          </motion.div>
        </div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-4 gap-3 sm:gap-4"
        >
          {BENTO.map((tile, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              className={`relative ${tile.aspect} overflow-hidden rounded-2xl`}
              style={tile.type === "icon" ? { backgroundColor: tile.bg } : undefined}
            >
              {tile.type === "photo" ? (
                <Image
                  src={tile.src}
                  alt={tile.alt!}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <Image
                    src={tile.src}
                    alt=""
                    width={64}
                    height={64}
                    className="w-1/2 h-1/2 object-contain"
                    style={
                      tile.bg === "#031F3D"
                        ? { filter: "brightness(0) invert(1)", opacity: 0.7 }
                        : tile.bg === "#F5E6D1"
                        ? { mixBlendMode: "multiply", opacity: 0.55 }
                        : { filter: "brightness(0) invert(1)", opacity: 0.65 }
                    }
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
