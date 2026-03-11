import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SolutionsHero } from "@/components/solutions/hero";
import { FunnelSelector } from "@/components/solutions/funnel-selector";
import { JourneySteps } from "@/components/solutions/journey-steps";
import { DiagnosedCards } from "@/components/solutions/diagnosed-cards";
import { AppShowcase } from "@/components/solutions/app-showcase";
import { ResupplySection } from "@/components/solutions/resupply-section";
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
        {/* 1. Hero — sets the frame, earns the click */}
        <SolutionsHero />

        {/* 2. Funnel selector — routes each visitor to their section */}
        <FunnelSelector />

        {/* 3. Full journey — for those starting from zero */}
        <JourneySteps />

        {/* 4. Already diagnosed — two direct entry points */}
        <DiagnosedCards />

        {/* 5. App showcase — CPAP dashboard & AI companion */}
        <AppShowcase />

        {/* 6. Resupply — for those who just want smarter supply delivery */}
        <ResupplySection />

        {/* Social proof */}
        <Testimonials />

        {/* 7. Closing CTA — round-trip promise restated */}
        <BottomCTA />

        <ServiceAreaBanner />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
