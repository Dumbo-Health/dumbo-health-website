"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SHOPIFY } from "@/lib/constants";

export function ProductHero() {
  return (
    <section className="bg-daylight py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-white"
          >
            <Image
              src="/images/products/hst-box.png"
              alt="At-home sleep test diagnostic kit"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1
              className="font-heading font-medium text-midnight"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)", lineHeight: 1.08 }}
            >
              At-Home Sleep Study
            </h1>
            <p
              className="mt-2 font-body"
              style={{ fontSize: "1.125rem", color: "rgba(3,31,61,0.7)" }}
            >
              Designed for a 5 star experience
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="font-heading text-4xl font-medium text-midnight">
                $149
              </span>
              <span
                className="font-body text-lg line-through"
                style={{ color: "rgba(3,31,61,0.4)" }}
              >
                $350
              </span>
              <Badge className="bg-peach text-white border-0 font-body font-bold">
                -58%
              </Badge>
            </div>

            {/* Ships info */}
            <p
              className="font-body text-sm mt-3"
              style={{ color: "rgba(3,31,61,0.55)" }}
            >
              Ships within 1 business day
            </p>

            {/* Product Details */}
            <ul
              className="mt-6 space-y-2 font-body text-base"
              style={{ color: "rgba(3,31,61,0.8)" }}
            >
              <li className="flex items-center gap-2">
                <span style={{ color: "#78BFBC" }}>&#10003;</span> Disposable device
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#78BFBC" }}>&#10003;</span> 1 night of testing
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#78BFBC" }}>&#10003;</span> Prescription included with diagnosis
              </li>
            </ul>

            {/* CTA */}
            <Button asChild size="lg" className="mt-8 w-full h-12 rounded-[12px] bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl active:translate-y-0 active:shadow-md sm:w-auto">
              <Link href={SHOPIFY.buyUrl}>Buy your test</Link>
            </Button>

            {/* Trust signals */}
            <div
              className="mt-6 flex flex-wrap gap-4 font-body text-sm"
              style={{ color: "rgba(3,31,61,0.55)" }}
            >
              <span>Secure payments</span>
              <span>Free shipping</span>
              <span>HIPAA compliant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
