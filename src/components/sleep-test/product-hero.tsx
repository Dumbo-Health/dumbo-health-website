"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SHOPIFY_BUY_URL =
  "https://checkout.dumbo.health/cart/add?id=8933198397592&quantity=1";

export function ProductHero() {
  return (
    <section className="bg-daylight py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <h1 className="font-heading text-3xl font-medium text-midnight md:text-4xl lg:text-5xl">
              At-Home Sleep Study
            </h1>
            <p className="mt-2 font-body text-midnight/70" style={{ fontSize: "1.125rem" }}>
              Designed for a 5 star experience
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="font-heading text-4xl font-medium text-midnight">
                $149
              </span>
              <span className="font-body text-lg text-midnight/40 line-through">
                $350
              </span>
              <Badge className="bg-peach text-white border-0 font-body font-bold">
                -58%
              </Badge>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-green-700">
                IN STOCK
              </span>
              <span className="font-body text-sm text-midnight/60">
                Ships within 1 business day
              </span>
            </div>

            {/* Product Details */}
            <ul className="mt-6 space-y-2 font-body text-base text-midnight/80">
              <li className="flex items-center gap-2">
                <span className="text-teal">&#10003;</span> Disposable device
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">&#10003;</span> 1 night of testing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-teal">&#10003;</span> Prescription included with diagnosis
              </li>
            </ul>

            {/* CTA */}
            <Button asChild size="lg" className="mt-8 w-full h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md sm:w-auto">
              <Link href={SHOPIFY_BUY_URL}>Buy your test</Link>
            </Button>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap gap-4 font-body text-sm text-midnight/60">
              <span>&#128274; Secure Payments</span>
              <span>&#128666; Free Shipping</span>
              <span>&#9989; HIPAA Secure</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
