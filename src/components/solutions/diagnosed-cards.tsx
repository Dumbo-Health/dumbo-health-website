"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function DiagnosedCards() {
  return (
    <section id="already-diagnosed" className="bg-sunlight py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Already diagnosed?
          </p>
          <h2 className="mt-2 font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
            Skip the test. Pick your path.
          </h2>
          <p className="mx-auto mt-3 font-body text-midnight/60" style={{ fontSize: "1.125rem", maxWidth: "50ch" }}>
            You have a diagnosis — here are your two direct routes into treatment.
          </p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Card A — need a CPAP */}
          <motion.div
            id="cpap-plans"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-col justify-between rounded-3xl bg-midnight p-10"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-teal">
                I need a CPAP
              </p>
              <h3 className="mt-3 font-heading font-medium text-white text-balance" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)" }}>
                You&apos;re diagnosed. Let&apos;s get you treated.
              </h3>
              <p className="mt-4 font-body text-white/65" style={{ fontSize: "1.0625rem", maxWidth: "48ch" }}>
                Skip the sleep test. You already have a diagnosis. Choose a CPAP device outright or start with a monthly plan. No large upfront cost required.
              </p>
              <ul className="mt-6 space-y-2">
                {["Buy outright or monthly plan", "Shipped directly to your door", "Full setup support included"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-[0.9375rem] text-white/70">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 w-full rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl active:translate-y-0 active:shadow-md sm:w-auto"
            >
              <Link href="/cpap">Get your CPAP</Link>
            </Button>
          </motion.div>

          {/* Card B — transfer */}
          <motion.div
            id="transfer"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="flex flex-col justify-between rounded-3xl border-2 border-midnight/10 bg-white p-10"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-teal">
                I have a CPAP
              </p>
              <h3 className="mt-3 font-heading font-medium text-midnight text-balance" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)" }}>
                Bring your device. We&apos;ll handle the rest.
              </h3>
              <p className="mt-4 font-body text-midnight/65" style={{ fontSize: "1.0625rem", maxWidth: "48ch" }}>
                Already own a CPAP? Transfer your prescription to Dumbo. We&apos;ll take over your supplies, resupply, and ongoing support. You&apos;ll never feel alone in this again.
              </p>
              <ul className="mt-6 space-y-2">
                {["Bring your existing prescription", "Smart supply delivery based on usage", "In-app doctor access included"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 font-body text-[0.9375rem] text-midnight/60">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 w-full rounded-lg bg-midnight px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-midnight/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight/85 hover:shadow-xl active:translate-y-0 active:shadow-md sm:w-auto"
            >
              <Link href="/cpap">Transfer my CPAP</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
