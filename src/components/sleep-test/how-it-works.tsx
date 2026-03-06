"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Add your health info",
    description:
      "A few quick questions help our specialists tailor your care and move things forward",
  },
  {
    step: 2,
    title: "Take the sleep study",
    description:
      "The simple device tracks how you breathe while you sleep and sends the results straight to the doctor after one night.",
  },
  {
    step: 3,
    title: "Get your results",
    description:
      "The doctor checks your sleep data, then you get a clear report about your sleep and a therapy plan if you're diagnosed.",
  },
  {
    step: 4,
    title: "Your sleep treatment",
    description:
      "If you're diagnosed with sleep apnea, you can get the right treatment, like a CPAP machine or a custom crafted oral device right on our website.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-medium text-midnight md:text-h2">
            Dumbo health at home test
          </h2>
          <p className="mt-2 font-heading text-xl text-midnight/80">
            How it works
          </p>
          <p className="mt-2 font-body text-body text-midnight/60">
            Trusted care that guides you from your first step to better sleep
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="relative rounded-2xl border border-sunlight bg-white p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-peach font-heading text-lg font-medium text-white">
                {s.step}
              </div>
              <h3 className="font-heading text-lg font-medium text-midnight">
                {s.title}
              </h3>
              <p className="mt-2 font-body text-sm text-midnight/70">
                {s.description}
              </p>
              {s.step < 4 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 bg-sunlight lg:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
