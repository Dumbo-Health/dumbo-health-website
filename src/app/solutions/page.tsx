import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SolutionsHero } from "@/components/solutions/hero";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { TreatmentStep } from "@/components/solutions/treatment-step";
import { TreatmentOptions } from "@/components/solutions/treatment-options";
import { Testimonials } from "@/components/shared/testimonials";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";

export const metadata: Metadata = {
  title: "Sleep Apnea Solutions: Diagnosis to Treatment",
  description:
    "From at-home sleep testing to CPAP and oral appliance treatment, Dumbo Health guides you through every step of your sleep apnea care journey.",
  alternates: { canonical: "https://www.dumbo.health/solutions" },
  openGraph: {
    title: "Sleep Apnea Solutions: Diagnosis to Treatment | Dumbo Health",
    description:
      "From at-home sleep testing to CPAP and oral appliance treatment, Dumbo Health guides you through every step.",
    url: "https://www.dumbo.health/solutions",
    siteName: "Dumbo Health",
    images: [
      { url: "https://www.dumbo.health/og/default.jpg", width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SolutionsHero />
        <TrustMarquee />

        {/* Step 1 */}
        <TreatmentStep
          id="step-1"
          label="No sleep lab. No stress."
          title="At-Home Diagnostic Kit"
          body="Our FDA-approved at-home sleep test is simple, accurate, and non-invasive. Just one night of wear, and your data is reviewed by a licensed sleep specialist via telehealth, all for $149."
          cta={{ label: "Take the First Step", href: "/get-your-at-home-sleep-apnea-test" }}
          image="/images/products/sleep-test-kit.png"
          imageAlt="Watch Pat One device"
        />

        {/* Step 2 */}
        <TreatmentOptions />

        {/* Step 3 */}
        <TreatmentStep
          id="step-3"
          label="Talk to a sleep specialist"
          title="Telehealth Sleep Experts"
          body="Our licensed sleep specialists are ready to guide your diagnosis and care. No waiting rooms. Just expert help, when you need it."
          cta={{ label: "Meet the experts", href: "/about-us#experts" }}
          image="/images/team/doctor-1.jpg"
          imageAlt="Telehealth consultation"
          reverse
        />

        {/* Step 4 */}
        <TreatmentStep
          id="step-4"
          label="Track your sleep progress"
          title="Personalized Sleep Dashboard"
          body="Your Dumbo Health dashboard syncs your treatment, reminders, and sleep insights. Stay motivated, supported, and in control."
          cta={{ label: "Get Started", href: "https://app.dumbo.health/" }}
          image="/images/misc/happy-morning.jpg"
          imageAlt="Phone showing the Dumbo app"
        />

        {/* Step 5 */}
        <TreatmentStep
          id="step-5"
          label="Everything you need. Nothing extra"
          title="Resupply and Maintenance"
          body="From masks and filters to tubing and chargers, you can get everything you need to keep your therapy running smoothly."
          image="/images/products/cpap-device.jpg"
          imageAlt="Resupply Kit"
          reverse
        />

        {/* Step 6 */}
        <TreatmentStep
          id="step-6"
          label="Real people. Real support"
          title="Supportive Community"
          body="Join an exclusive community of people improving their sleep, just like you. Share wins, ask questions, and get encouragement from real humans."
          cta={{ label: "Get started", href: "https://app.dumbo.health/" }}
          image="/images/misc/team-office.jpg"
          imageAlt="Your Community"
        />

        {/* Treatment Summary */}
        <section className="bg-peach py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-medium text-white md:text-h2">
              Treating sleep apnea has never been easier
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-body-lg text-white/90">
              Dumbo Health brings expert care, personalized tools and real support into your daily life.
            </p>
          </div>
        </section>

        {/* Insurance Coverage Coming Soon */}
        <section className="bg-teal py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-medium text-white md:text-h2">
              Insurance Coverage Coming Soon
            </h2>
            <p className="mt-4 font-body text-body-lg text-white/90">
              We&apos;re working hard to make Dumbo Health available through insurance. Stay tuned for updates on insurance partnerships and coverage options.
            </p>
          </div>
        </section>

        <Testimonials />

        {/* CTA Banner */}
        <section className="bg-peach py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mx-auto max-w-2xl font-body text-body-lg text-white/90">
              Wake up to a better life with sleep apnea treatment tailored to you from diagnosis to delivery.
            </p>
            <a
              href="https://app.dumbo.health/"
              className="mt-8 inline-flex items-center h-12 rounded-lg bg-white px-8 font-body text-base font-bold uppercase tracking-wider text-peach shadow-md shadow-white/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-daylight hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Start now
            </a>
          </div>
        </section>

        <ServiceAreaBanner />
        <FAQSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
