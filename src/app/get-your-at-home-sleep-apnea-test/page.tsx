import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scientificCommittee } from "@/content/team";

const SHOPIFY_BUY_URL =
  "https://checkout.dumbo.health/cart/add?id=8933198397592&quantity=1";

export const metadata: Metadata = {
  title: "At Home Sleep Apnea Test | One Night Results",
  description:
    "Get your at-home sleep apnea test. No sleep lab required. Sleep in your own bed, test in one night, get doctor-reviewed results with clear next steps. Only $149.",
  alternates: {
    canonical: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
  },
  openGraph: {
    title: "At Home Sleep Apnea Test | One Night Results | Dumbo Health",
    description:
      "No sleep lab required. Sleep in your own bed, test in one night. Doctor-reviewed results for $149.",
    url: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
    siteName: "Dumbo Health",
    images: [
      {
        url: "https://www.dumbo.health/og/sleep-test.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

function LandingProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "At-Home Sleep Apnea Test",
    description:
      "FDA-approved at-home sleep apnea test. One night of testing, doctor-reviewed results, prescription included.",
    image: "https://www.dumbo.health/images/products/hst-box.png",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: {
      "@type": "Offer",
      url: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
      priceCurrency: "USD",
      price: "149.00",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Dumbo Health" },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function LandingPage() {
  return (
    <>
      <LandingProductJsonLd />

      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-sunlight/50 bg-daylight/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/wordmark-midnight.svg"
              alt="Dumbo Health"
              width={150}
              height={30}
              priority
            />
          </Link>
          <Button
            asChild
            className="rounded-[12px] bg-peach text-white hover:bg-peach/90 font-body font-bold"
          >
            <Link href={SHOPIFY_BUY_URL}>Get Your Test</Link>
          </Button>
        </div>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="bg-daylight">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
              <div>
                <Badge className="mb-4 border-0 bg-teal/10 font-mono text-teal">
                  FDA-Cleared Device
                </Badge>
                <h1 className="font-heading text-4xl font-medium leading-[1.1] text-midnight md:text-5xl lg:text-[56px]">
                  At-home test for sleep apnea.{" "}
                  <span className="text-peach">No sleep lab required.</span>
                </h1>
                <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-midnight/70">
                  Sleep in your own bed, test in one night, and get
                  doctor-reviewed results with clear next steps.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Sleep in your own bed",
                    "Test in one night",
                    "Doctor-reviewed results",
                    "Prescription included",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-body text-midnight/80"
                    >
                      <svg
                        className="h-5 w-5 shrink-0 text-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
                  >
                    <Link href={SHOPIFY_BUY_URL}>
                      Start my sleep test — $149
                    </Link>
                  </Button>
                  <p className="font-body text-sm text-midnight/50">
                    Free shipping &middot; Results in days
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl">
                  <Image
                    src="/images/products/sleep-test-kit.png"
                    alt="Dumbo Health At-Home Sleep Test Kit"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Floating price card */}
                <div className="absolute -bottom-4 left-4 rounded-2xl border border-sunlight bg-white p-4 shadow-lg md:-left-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl font-medium text-midnight">
                      $149
                    </span>
                    <span className="font-body text-sm text-midnight/40 line-through">
                      $350
                    </span>
                    <Badge className="border-0 bg-peach/10 font-mono text-xs text-peach">
                      Save 58%
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-body text-xs text-emerald-700">
                      In Stock — Ships next business day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST BAR ─── */}
        <section className="border-y border-sunlight/60 bg-white py-5">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-center">
            {[
              "HIPAA Compliant",
              "Board-Certified Physicians",
              "FDA-Cleared Device",
              "50,000+ Patients Served",
            ].map((item) => (
              <span
                key={item}
                className="font-mono text-xs uppercase tracking-widest text-midnight/40"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-teal">
              Simple process
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-medium text-midnight md:text-[40px]">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center font-body text-midnight/60">
              Trusted care that guides you from your first step to better sleep
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Add your health info",
                  desc: "A few quick questions help our specialists tailor your care and move things forward.",
                },
                {
                  step: "02",
                  title: "Take the sleep study",
                  desc: "The simple device tracks how you breathe while you sleep and sends results to the doctor after one night.",
                },
                {
                  step: "03",
                  title: "Get your results",
                  desc: "The doctor checks your sleep data. You get a clear report and a therapy plan if diagnosed.",
                },
                {
                  step: "04",
                  title: "Your sleep treatment",
                  desc: "If diagnosed, get the right treatment — CPAP or a custom oral device — right on our website.",
                },
              ].map((s, i) => (
                <div key={s.step} className="relative text-center">
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-sunlight to-transparent md:block" />
                  )}
                  <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-peach/10 to-peach/5">
                    <span className="font-heading text-xl font-medium text-peach">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-medium text-midnight">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-midnight/60">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
              >
                <Link href={SHOPIFY_BUY_URL}>Order your test</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── WHAT THE DEVICE MEASURES ─── */}
        <section className="bg-midnight py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  WatchPAT ONE
                </p>
                <h2 className="mt-3 font-heading text-3xl font-medium text-white md:text-[40px]">
                  What the device measures
                </h2>
                <p className="mt-4 font-body text-lg text-white/60">
                  Clinical-grade data captured from the comfort of your bed.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    {
                      label: "Respiratory patterns",
                      detail: "Breathing flow and airway resistance",
                    },
                    {
                      label: "Oxygen & cardiac rhythm",
                      detail: "SpO2 levels and heart rate variability",
                    },
                    {
                      label: "Snoring & position",
                      detail: "Frequency, intensity, and sleep posture",
                    },
                    {
                      label: "Movement & rest phases",
                      detail: "REM, light sleep, and deep sleep staging",
                    },
                    {
                      label: "Thoracic mechanics",
                      detail: "Chest wall breathing effort",
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start gap-3 rounded-xl bg-white/5 p-4"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20">
                        <svg
                          className="h-3.5 w-3.5 text-teal"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-body font-bold text-white">
                          {spec.label}
                        </p>
                        <p className="font-body text-sm text-white/50">
                          {spec.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl">
                <Image
                  src="/images/products/sleep-test-kit.png"
                  alt="WatchPAT ONE sleep monitoring device"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMPARISON: AT-HOME vs IN-LAB ─── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-teal">
              Why home testing
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-medium text-midnight md:text-[40px]">
              Better sleep starts at home
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center font-body text-midnight/60">
              Sleep in your own bed and wake up with clearer answers.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* At-Home Card */}
              <div className="rounded-2xl border-2 border-teal/30 bg-gradient-to-b from-teal/5 to-transparent p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <svg
                      className="h-5 w-5 text-teal"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-medium text-midnight">
                    At-Home Test
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Verified sleep apnea diagnosis",
                    "Convenient doctor video consult",
                    "Heart rate & breathing monitoring",
                    "Sleep in your own bed",
                    "Results in days, not weeks",
                    "Only $149",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 font-body text-midnight/80"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* In-Lab Card */}
              <div className="rounded-2xl border border-midnight/8 bg-midnight/[0.02] p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight/5">
                    <svg
                      className="h-5 w-5 text-midnight/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-medium text-midnight/40">
                    In-Lab Testing
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Hooked up to intrusive wires",
                    "Must sleep inside a lab",
                    "Schedule follow-up with doctor",
                    "Travel to sleep center",
                    "3-6 weeks to schedule",
                    "$500 – $10,000 ($3,075 avg)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 font-body text-midnight/40"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRICING CALLOUT ─── */}
        <section className="bg-gradient-to-b from-daylight to-sunlight/50 py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-peach">
              Simple pricing
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-[40px]">
              One simple price:{" "}
              <span className="text-peach">$149</span>
            </h2>
            <p className="mt-4 font-body text-lg text-midnight/60">
              One night. Simple process. Physician-reviewed results.
              Prescription included if diagnosed.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                "Disposable device",
                "1 night testing",
                "Doctor review",
                "Prescription included",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-sunlight bg-white px-4 py-1.5 font-body text-sm text-midnight/70"
                >
                  {item}
                </span>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
            >
              <Link href={SHOPIFY_BUY_URL}>Buy your test</Link>
            </Button>
          </div>
        </section>

        {/* ─── IS THIS RIGHT FOR ME? ─── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  Am I a candidate?
                </p>
                <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-[40px]">
                  Is this test right for me?
                </h2>
                <p className="mt-4 font-body text-lg text-midnight/60">
                  This at-home test is designed for adults who experience any of
                  the following:
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    "Snore loudly or stop breathing during sleep",
                    "Wake up tired, foggy, or unrefreshed",
                    "Feel sleepy during the day",
                    "Want answers without visiting a sleep lab",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-peach/5 px-4 py-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peach/10">
                        <svg
                          className="h-3.5 w-3.5 text-peach"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="font-body text-midnight/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl">
                <Image
                  src="/images/misc/tired-person.jpg"
                  alt="Person struggling with sleep"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── DATA/TRUST STATS ─── */}
        <section className="bg-midnight py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-teal">
              Backed by data
            </p>
            <h2 className="mt-2 font-heading text-3xl font-medium text-white md:text-[40px]">
              Clinically trusted insights
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-lg text-white/50">
              The same technology used in sleep clinics, now available at home.
            </p>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  stat: "1M+",
                  label: "Tests performed worldwide",
                  sub: "every year",
                },
                {
                  stat: "7+",
                  label: "Sleep signals measured",
                  sub: "PAT, oxygen, heart rate, snoring & more",
                },
                {
                  stat: "FDA",
                  label: "Cleared device",
                  sub: "clinical-grade results at home",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8"
                >
                  <p className="font-heading text-5xl font-medium text-teal">
                    {item.stat}
                  </p>
                  <p className="mt-3 font-body font-bold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 font-body text-sm text-white/40">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY DUMBO HEALTH ─── */}
        <section className="bg-daylight py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-teal">
                Why us
              </p>
              <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-[40px]">
                Why choose Dumbo Health?
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Doctor-reviewed results",
                  desc: "Board-certified sleep specialists review every test.",
                },
                {
                  title: "Simple, at-home testing",
                  desc: "No wires, no labs. Just one finger-worn device for one night.",
                },
                {
                  title: "No clinic visits",
                  desc: "Everything happens from the comfort of your home.",
                },
                {
                  title: "Clear guidance",
                  desc: "Plain-language results with next steps, not medical jargon.",
                },
                {
                  title: "Built to support you",
                  desc: "Our care team is available every step of the way.",
                },
                {
                  title: "Affordable pricing",
                  desc: "$149 all-in — no hidden fees, no surprise bills.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sunlight bg-white p-6"
                >
                  <h3 className="font-heading text-lg font-medium text-midnight">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-midnight/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SCIENTIFIC COMMITTEE ─── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-teal">
              Expert-led care
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-medium text-midnight md:text-[40px]">
              Our Scientific Committee
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center font-body text-midnight/60">
              Board-certified sleep medicine experts guiding your care.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scientificCommittee.slice(0, 3).map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-sunlight bg-daylight p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={member.image || "/images/team/doctor-1.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-medium text-midnight">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-peach">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-midnight/60">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="bg-gradient-to-b from-daylight to-sunlight/30 py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-teal">
              What doctors say
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-medium text-midnight md:text-[40px]">
              Trusted by physicians
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "As a sleep specialist, I'm impressed by how Dumbo Health makes testing accessible without sacrificing clinical accuracy.",
                  name: "Dr. Sarah Chen",
                  title: "Sleep Medicine Specialist",
                },
                {
                  quote:
                    "Home sleep testing is the future. Dumbo Health gets patients diagnosed faster so we can start treatment sooner.",
                  name: "Dr. Michael Torres",
                  title: "Pulmonologist",
                },
                {
                  quote:
                    "My patients prefer the convenience of at-home testing. The results are reliable and the process is simple.",
                  name: "Dr. Emily Park",
                  title: "Internal Medicine",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-sunlight bg-white p-6"
                >
                  <svg
                    className="mb-3 h-8 w-8 text-peach/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-body text-sm leading-relaxed text-midnight/70">
                    {t.quote}
                  </p>
                  <div className="mt-4 border-t border-sunlight pt-4">
                    <p className="font-heading text-sm font-medium text-midnight">
                      {t.name}
                    </p>
                    <p className="font-mono text-xs text-midnight/40">
                      {t.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-teal">
              Common questions
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-medium text-midnight md:text-[40px]">
              FAQs
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {[
                {
                  q: "Can this home sleep test really find sleep apnea?",
                  a: "Yes. It's FDA-cleared and built to measure the signals needed to diagnose sleep apnea. It's been used on tens of thousands of people with strong accuracy.",
                },
                {
                  q: "Do I ever need a sleep lab?",
                  a: "Almost never. Fewer than one percent of people need a full lab test with many sensors. Most people get everything they need from the home test.",
                },
                {
                  q: "How does the testing process work?",
                  a: "After completing a sleep questionnaire, our team ships the Home Sleep test to your home in about three business days. Setup is simple: pair the device with your phone, put it on your finger or hand, and keep it on all night.",
                },
                {
                  q: "What is a home sleep test?",
                  a: "A small finger-worn device tracks how you breathe, how your heart beats, how much oxygen you have, and how long you sleep. It uses a light sensor on your finger and connects to an app on your phone.",
                },
                {
                  q: "What makes Dumbo Health's service different?",
                  a: "Board-certified sleep specialists read your results. FDA-cleared devices are used for testing and diagnosis. You get support through each step.",
                },
                {
                  q: "Why is testing important?",
                  a: "When your throat narrows during sleep, your oxygen drops. This stresses your heart, brain, and the rest of your organs. Untreated sleep apnea is linked to diabetes, stroke, heart attack, daytime sleepiness, and loss of sexual energy.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  className="border-sunlight"
                >
                  <AccordionTrigger className="text-left font-heading text-base font-medium text-midnight hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-midnight/60 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ─── BOTTOM CTA ─── */}
        <section className="bg-gradient-to-br from-peach to-peach/90 py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-medium text-white md:text-[40px]">
              Ready to take control of your sleep?
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-lg text-white/80">
              Get your FDA-approved at-home sleep test delivered to your door.
              One night. Clear answers. Better sleep ahead.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-lg bg-white px-8 font-body text-base font-bold uppercase tracking-wider text-peach shadow-md shadow-white/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-daylight hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              <Link href={SHOPIFY_BUY_URL}>Start my sleep test — $149</Link>
            </Button>
            <p className="mt-4 font-body text-sm text-white/50">
              Free shipping &middot; Prescription included &middot;
              HIPAA-compliant
            </p>
          </div>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="bg-midnight py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <Image
              src="/logos/wordmark-white.svg"
              alt="Dumbo Health"
              width={120}
              height={24}
            />
            <p className="font-body text-xs text-white/30">
              &copy; {new Date().getFullYear()} Dumbo Health. All rights
              reserved.{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-white/50"
              >
                Privacy Policy
              </Link>
              {" &middot; "}
              <Link
                href="/terms-of-use"
                className="underline hover:text-white/50"
              >
                Terms of Use
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
