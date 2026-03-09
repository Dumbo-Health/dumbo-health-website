"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_URL, SHOPIFY } from "@/lib/constants";

const marqueeImages = [
  { src: "/images/people/couple-in-bed.png",        alt: "Couple resting peacefully" },
  { src: "/images/people/man-waking-up.png",        alt: "Man waking up refreshed" },
  { src: "/images/people/woman-blue-pajamas.png",   alt: "Woman ready for a good night" },
  { src: "/images/people/man-drinking-coffee.png",  alt: "Man enjoying his morning" },
  { src: "/images/people/man-on-beach.png",         alt: "Man feeling great outdoors" },
  { src: "/images/hero/hero-device.jpg",            alt: "Sleep test device" },
];

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-daylight pb-0 pt-16 md:pt-24">

      {/* ── Headline ── */}
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1
          className="font-heading text-[44px] font-medium leading-[1.08] text-midnight sm:text-[56px] lg:text-[68px] lg:leading-[1.05]"
          style={{ animation: "fade-in 0.7s ease-out both" }}
        >
          Affordable sleep apnea care made easy
        </h1>

        <p
          className="mx-auto mt-5 max-w-lg font-body text-lg leading-relaxed text-midnight/55 md:text-xl"
          style={{ animation: "fade-in 0.7s 0.15s ease-out both" }}
        >
          At Dumbo Health, we help people with sleep apnea get the restful
          sleep they deserve.
        </p>
      </div>

      {/* ── Photo marquee ── */}
      <div
        className="relative mt-12 md:mt-16"
        style={{ animation: "fade-in 0.7s 0.25s ease-out both" }}
      >
        {/* Scrolling strip */}
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-4"
            style={{ animation: "marquee-hero 55s linear infinite" }}
          >
            {[...marqueeImages, ...marqueeImages].map((img, i) => (
              <div
                key={i}
                className="relative h-[260px] w-[380px] shrink-0 overflow-hidden rounded-2xl md:h-[320px] md:w-[460px]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 380px, 460px"
                  priority={i < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTAs ── */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 px-4 pb-16 pt-10 md:pb-20 md:pt-12"
        style={{ animation: "fade-in 0.7s 0.35s ease-out both" }}
      >
        {/* Primary */}
        <Button
          asChild
          size="lg"
          className="h-12 rounded-[12px] bg-peach px-8 font-body text-sm font-medium uppercase tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl hover:shadow-peach/25 active:translate-y-0 active:shadow-md"
        >
          <a href={APP_URL}>Take our sleep apnea quiz</a>
        </Button>

        {/* Secondary */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 rounded-[12px] border-midnight/25 bg-transparent px-8 font-body text-sm font-medium uppercase tracking-wider text-midnight transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-midnight hover:bg-midnight hover:text-white hover:shadow-md hover:shadow-midnight/15 active:translate-y-0"
        >
          <a href={SHOPIFY.buyUrl}>Buy your diagnostic kit</a>
        </Button>
      </div>

    </section>
  );
}
