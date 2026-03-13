import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PlanHero } from "@/components/pricing/plan-hero";
import { BlockerSection } from "@/components/pricing/blocker-section";
import { ReframeSection } from "@/components/pricing/reframe-section";
import { SubscriptionArgument } from "@/components/pricing/subscription-argument";
import { AppDifferentiators } from "@/components/pricing/app-differentiators";
import { PlanTabs } from "@/components/pricing/plan-tabs";
import { CostFraming } from "@/components/pricing/cost-framing";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { FAQSection } from "@/components/shared/faq-section";
import { SleepTestCallout } from "@/components/pricing/sleep-test-callout";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea Treatment Plans & CPAP Pricing",
  description:
    "Transparent pricing for CPAP therapy. Plans from $59/mo with equipment, telehealth, and ongoing support. No hidden fees. Compare Essentials, Premium, and Elite.",
  path: "/cpap",
  ogImage: "/og/pricing.jpg",
});

function CpapSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dumbo Health CPAP Treatment Plans",
    description:
      "Monthly CPAP therapy subscription plans with equipment, telehealth support, and accessories.",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    offers: [
      {
        "@type": "Offer",
        name: "Essentials",
        price: "59",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "89",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
      },
      {
        "@type": "Offer",
        name: "Elite",
        price: "129",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
        url: `${SITE_URL}/cpap`,
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

export default function CpapPage() {
  return (
    <>
      <CpapSchema />
      <Navbar />
      <main>
        {/* 1. Hero — reframes the category for diagnosed-but-haven't-started patients */}
        <PlanHero />

        {/* 2. Problem framing — names the blockers, validates the delay */}
        <BlockerSection />

        {/* 3. Reframe — CPAP works when you're supported */}
        <ReframeSection />

        {/* 4. What Dumbo actually is — subscription includes + DME contrast */}
        <SubscriptionArgument />

        {/* 5. App + AI differentiators — what makes Dumbo different */}
        <AppDifferentiators />

        {/* 6. The plans — pricing appears only after trust is established */}
        <PlanTabs />

        {/* 7. Cost framing — per-day anchoring */}
        <CostFraming />

        {/* 8. Feature comparison table */}
        <FeatureComparison />

        {/* 9. FAQ + objection handling */}
        <FAQSection limit={7} />

        {/* 10. Sleep test safety net — for visitors not yet diagnosed */}
        <SleepTestCallout />
      </main>
      <Footer />
    </>
  );
}
