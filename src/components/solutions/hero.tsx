"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

export function SolutionsHero() {
  return (
    <section className="relative overflow-hidden bg-midnight py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl font-medium leading-tight text-white md:text-5xl lg:text-hero">
              Sleep Apnea Care, Start to Finish
            </h1>
            <p className="mt-4 max-w-lg font-body text-body-lg text-white/70">
              Dumbo Health guides you from diagnosis to treatment with support at every step.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl active:translate-y-0 active:shadow-md">
                <Link href={APP_URL}>Start Your Sleep Apnea Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-lg border-white/20 bg-transparent px-7 font-body text-base font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:shadow-md active:translate-y-0 active:shadow-sm">
                <a href="#step-1">Learn More</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/people/girl-laying-in-bed.png"
              alt="Person resting peacefully"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
