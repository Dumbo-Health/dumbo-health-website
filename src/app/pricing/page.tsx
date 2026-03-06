import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PlanHero } from "@/components/pricing/plan-hero";
import { PlanTabs } from "@/components/pricing/plan-tabs";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea Treatment Plans & CPAP Pricing",
  description: "Transparent pricing for CPAP therapy. Plans from $59/mo with equipment, telehealth, and ongoing support. No hidden fees. Compare Essentials, Premium, and Elite.",
  path: "/pricing",
  ogImage: "/og/pricing.jpg",
});

function PricingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dumbo Health CPAP Treatment Plans",
    description: "Monthly CPAP therapy subscription plans with equipment, telehealth support, and accessories.",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: [
      {
        "@type": "Offer",
        name: "Essentials",
        price: "59",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "89",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Elite",
        price: "129",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", billingDuration: "P1M" },
        url: `${SITE_URL}/pricing`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function SuccessOverCompliance() {
  return (
    <section className="bg-midnight py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono text-tag uppercase tracking-widest text-peach mb-4">
          Our Philosophy
        </p>
        <h2 className="font-heading text-3xl font-medium text-white md:text-h2">
          Success Over Compliance
        </h2>
        <div className="mt-8 space-y-5 font-body text-body-lg text-white/70">
          <p>No hidden fees, no complicated billing.</p>
          <p>No upfront payment for a machine.</p>
          <p>
            When you&apos;re paying out-of-pocket, there are no usage minimums.
          </p>
          <p>We focus on better sleep and real-life results.</p>
          <p className="text-white/50 text-base mt-4">
            Need a usage report for work or insurance? We&apos;ll provide it.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingSchema />
      <Navbar />
      <main>
        <PlanHero />
        <PlanTabs />
        <FeatureComparison />
        <SuccessOverCompliance />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
