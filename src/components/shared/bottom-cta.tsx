"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const carouselImages = [
  "/images/people/man-on-beach.png",
  "/images/people/man-waking-up.png",
  "/images/people/woman-blue-pajamas.png",
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
    <section className="relative overflow-hidden bg-teal py-16 md:py-20">
      {/* Subtle icon pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm0 20c-4 0-7 3-7 7v3h14v-3c0-4-3-7-7-7z' fill='%23031F3D' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <h2 className="font-heading text-3xl font-medium text-white md:text-[40px]">
              Sleep apnea care, made for you
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-lg text-white/80 lg:mx-0">
              Wake up to a better life with sleep apnea treatment tailored to
              you from diagnosis to delivery.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-white px-8 font-body text-base font-bold uppercase tracking-wider text-teal shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-daylight hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              <Link href={APP_URL}>Start now</Link>
            </Button>
          </div>

          {/* Image carousel */}
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
      </div>
    </section>
  );
}
