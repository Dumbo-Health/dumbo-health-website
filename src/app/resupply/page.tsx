import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResupplyHero } from "@/components/resupply/resupply-hero";
import { ResupplyBlockers } from "@/components/resupply/resupply-blockers";
import { HowRefreshWorks } from "@/components/resupply/how-refresh-works";
import { SupplyVisuals } from "@/components/resupply/supply-visuals";
import { BuiltForYourSetup } from "@/components/resupply/built-for-setup";
import { BrandCompatibility } from "@/components/resupply/brand-compatibility";
import { ResupplyPricing } from "@/components/resupply/resupply-pricing";
import { SocialProof } from "@/components/resupply/social-proof";
import { AmazonComparison } from "@/components/resupply/amazon-comparison";
import { TrustReassurance } from "@/components/resupply/trust-reassurance";
import { FAQSection } from "@/components/shared/faq-section";
import { ResupplyFinalCTA } from "@/components/resupply/final-cta";
import { SleepTestCallout } from "@/components/pricing/sleep-test-callout";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "CPAP Resupply Program — Supplies Delivered Every 90 Days",
  description:
    "Automatic CPAP resupply matched to your machine and mask. Filters, tubing, and parts shipped every quarter. No insurance needed. Cancel anytime.",
  path: "/resupply",
  ogImage: "/og/default.jpg",
});

function ResupplySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dumbo Health CPAP Resupply Program",
    description:
      "Quarterly CPAP supply delivery matched to your machine and mask. Filters, tubing, and parts shipped automatically.",
    brand: { "@type": "Brand", name: "Dumbo Health" },
    url: `${SITE_URL}/resupply`,
    offers: [
      {
        "@type": "Offer",
        name: "Essentials",
        price: "87",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P3M",
        },
        url: `${SITE_URL}/resupply`,
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "117",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P3M",
        },
        url: `${SITE_URL}/resupply`,
      },
      {
        "@type": "Offer",
        name: "Elite",
        price: "177",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P3M",
        },
        url: `${SITE_URL}/resupply`,
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

export default function ResupplyPage() {
  if (process.env.NEXT_PUBLIC_HIDE_RESUPPLY_PAGE === "true") redirect("/coming-soon");
  return (
    <>
      <ResupplySchema />
      <Navbar />
      <main>
        {/* 1. Hero — CPAP machine visual, relief framing for existing users */}
        <ResupplyHero />

        {/* 2. Pain points — patient voice, validates the frustration */}
        <ResupplyBlockers />

        {/* 3. How it works — three steps, then nothing to manage */}
        <HowRefreshWorks />

        {/* 4. Supply visuals — component cards with cadence chips */}
        <SupplyVisuals />

        {/* 5. Built for your setup — machine + mask matching */}
        <BuiltForYourSetup />

        {/* 6. Brand compatibility — ResMed, Philips, Fisher and Paykel */}
        <BrandCompatibility />

        {/* 7. Pricing — 3 plans, quarterly/annual toggle, per-day anchoring */}
        <ResupplyPricing />

        {/* 8. Social proof — real users, real results */}
        <SocialProof />

        {/* 9. Amazon comparison — why people switch */}
        <AmazonComparison />

        {/* 10. Trust & reassurance — no pressure, no lock-in */}
        <TrustReassurance />

        {/* 11. FAQ — objection handling */}
        <FAQSection limit={5} />

        {/* 12. Final CTA — close the page */}
        <ResupplyFinalCTA />

        {/* 13. Safety net for undiagnosed visitors */}
        <SleepTestCallout />
      </main>
      <Footer />
    </>
  );
}
