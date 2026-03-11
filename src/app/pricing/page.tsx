import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PlanHero } from "@/components/pricing/plan-hero";
import { NewToSleepApnea } from "@/components/pricing/new-to-sleep-apnea";
import { CashPayArgument } from "@/components/pricing/cash-pay-argument";
import { SubscriptionArgument } from "@/components/pricing/subscription-argument";
import { AppDifferentiators } from "@/components/pricing/app-differentiators";
import { PlanTabs } from "@/components/pricing/plan-tabs";
import { SleepTestCallout } from "@/components/pricing/sleep-test-callout";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Sleep Apnea Treatment Plans & CPAP Pricing",
  description:
    "Transparent pricing for CPAP therapy. Plans from $59/mo with equipment, telehealth, and ongoing support. No hidden fees. Compare Essentials, Premium, and Elite.",
  path: "/pricing",
  ogImage: "/og/pricing.jpg",
});

function PricingSchema() {
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
        url: `${SITE_URL}/pricing`,
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
        url: `${SITE_URL}/pricing`,
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

export default function PricingPage() {
  return (
    <>
      <PricingSchema />
      <Navbar />
      <main>
        {/* 1. Hero — reframes the category */}
        <PlanHero />

        {/* 2. Orientation for first-timers — collapsible */}
        <NewToSleepApnea />

        {/* 3. Cash pay vs. insurance — the objection killer */}
        <CashPayArgument />

        {/* 4. Subscription vs. buying outright — honest argument */}
        <SubscriptionArgument />

        {/* 5. App + AI differentiators — what makes Dumbo different */}
        <AppDifferentiators />

        {/* 6. The plans — only now does pricing appear */}
        <PlanTabs />

        {/* 7. Sleep test signpost */}
        <SleepTestCallout />

        {/* 8. Feature comparison table */}
        <FeatureComparison />

        {/* 9. FAQ */}
        <FAQSection limit={7} />

        {/* 10. Bottom CTA */}
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
