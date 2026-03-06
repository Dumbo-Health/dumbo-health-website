import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/sleep-test/product-hero";
import { ProductTabs } from "@/components/sleep-test/product-tabs";
import { HowItWorks } from "@/components/sleep-test/how-it-works";
import { ComparisonChecklist } from "@/components/sleep-test/comparison-checklist";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { BenefitsGrid } from "@/components/shared/benefits-grid";
import { Testimonials } from "@/components/shared/testimonials";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { TeamCard } from "@/components/about/team-card";
import { scientificCommittee, medicalTeam } from "@/content/team";

export const metadata: Metadata = {
  title: "At-Home Sleep Apnea Test - FDA Approved, $149",
  description:
    "Order your FDA-approved at-home sleep apnea test for just $149. Simple one-night test, doctor-reviewed results, and prescription included. Ships within 1 business day.",
  alternates: { canonical: "https://www.dumbo.health/at-home-sleep-test" },
  openGraph: {
    title: "At-Home Sleep Apnea Test - FDA Approved, $149 | Dumbo Health",
    description:
      "Order your FDA-approved at-home sleep apnea test for just $149. Simple one-night test with doctor-reviewed results.",
    url: "https://www.dumbo.health/at-home-sleep-test",
    siteName: "Dumbo Health",
    images: [
      { url: "https://www.dumbo.health/og/sleep-test.jpg", width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

function ProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "At-Home Sleep Apnea Test",
    description:
      "FDA-approved at-home sleep test. Simple one-night test to diagnose sleep apnea from the comfort of your own bed.",
    image: "https://www.dumbo.health/images/products/hst-box.png",
    brand: {
      "@type": "Brand",
      name: "Dumbo Health",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.dumbo.health/at-home-sleep-test",
      priceCurrency: "USD",
      price: "149.00",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Dumbo Health",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function SleepTestFAQs() {
  const faqs = [
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
      a: "A small finger-worn device tracks how you breathe, how your heart beats, how much oxygen you have, and how long you sleep. It uses a light sensor on your finger and connects to an app on your phone. All the data is combined into one score that shows how many times your breathing slows or stops each hour.",
    },
    {
      q: "What makes Dumbo Health's service different?",
      a: "Board-certified sleep specialists read your results. FDA-cleared devices are used for testing and diagnosis. You get support through each step.",
    },
    {
      q: "Why is testing important?",
      a: "When your throat narrows during sleep, your oxygen drops. This stresses your heart, brain, and the rest of your organs. Untreated sleep apnea is linked to diabetes, stroke, heart attack, daytime sleepiness, and loss of sexual energy.",
    },
  ];

  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-medium text-midnight md:text-h2 text-center">
          FAQs
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-sunlight bg-white p-4">
              <summary className="cursor-pointer font-heading text-lg font-medium text-midnight list-none flex items-center justify-between">
                {faq.q}
                <span className="ml-2 text-peach transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 font-body text-body text-midnight/70 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:+17863482820"
            className="font-body text-body font-bold text-peach hover:underline"
          >
            Call us +1 (786) 348-2820
          </a>
          <span className="hidden text-midnight/30 sm:inline">|</span>
          <a
            href="/contact"
            className="font-body text-body font-bold text-peach hover:underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

function SupportCallout() {
  return (
    <section className="bg-teal py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-medium text-white md:text-h3">
          Have questions?
        </h2>
        <p className="mt-2 font-body text-body-lg text-white/90">
          Our Sleep Specialists are here for you.
        </p>
        <a
          href="tel:+17863482820"
          className="mt-4 inline-flex items-center h-12 rounded-lg bg-white px-8 font-body text-base font-bold uppercase tracking-wider text-peach shadow-md shadow-white/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-daylight hover:shadow-xl active:translate-y-0 active:shadow-md"
        >
          call now
        </a>
      </div>
    </section>
  );
}

export default function AtHomeSleepTestPage() {
  return (
    <>
      <ProductJsonLd />
      <Navbar />
      <main>
        <ProductHero />
        <ProductTabs />
        <SupportCallout />
        <HowItWorks />
        <ComparisonChecklist />
        <ComparisonTable />
        <BenefitsGrid />

        {/* Scientific Committee */}
        <section className="bg-sunlight py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-h2 text-midnight text-center mb-12">
              Dumbo Health&apos;s Scientific Committee
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {scientificCommittee.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Medical Team */}
        <section className="bg-daylight py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-h2 text-midnight text-center mb-12">
              Dumbo Health&apos;s Medical Team
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {medicalTeam.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <SleepTestFAQs />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
