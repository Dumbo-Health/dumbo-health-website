"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SHOPIFY } from "@/lib/constants";

const atHome = [
  "Verified sleep apnea diagnosis",
  "Convenient doctor video consult",
  "Disordered breathing recognition",
  "Heart rate monitoring",
  "Sleep in your bed",
  "Only $149",
];

const inLab = [
  "Hooked up to intrusive wires",
  "Sleep inside a lab",
  "Must schedule follow-up with a doctor",
  "Travel to sleep lab",
  "Takes at least 3-6 weeks to schedule",
  "$500 - $10,000 ($3,075 avg in 2025)",
];

export function ComparisonChecklist() {
  return (
    <section className="bg-sunlight py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Better sleep starts at home
          </h2>
          <p className="mt-2 font-body text-midnight/70 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
            Sleep in your own bed and wake up with clearer answers.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid gap-8 md:grid-cols-2"
        >
          {/* At-Home */}
          <div className="rounded-2xl border-2 border-teal bg-white p-8">
            <h3 className="font-heading text-xl font-medium text-teal">
              At-Home Sleep test
            </h3>
            <ul className="mt-6 space-y-3">
              {atHome.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-base text-midnight/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs text-teal">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* In-Lab */}
          <div className="rounded-2xl border border-midnight/10 bg-white p-8">
            <h3 className="font-heading text-xl font-medium text-midnight/60">
              In-Lab testing
            </h3>
            <ul className="mt-6 space-y-3">
              {inLab.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-base text-midnight/50">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs text-red-400">
                    &#10007;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md">
            <a data-shopify-checkout="sleep-test" href={SHOPIFY.buyUrl}>BUY your test</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
