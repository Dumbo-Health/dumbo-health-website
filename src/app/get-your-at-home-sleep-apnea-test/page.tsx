import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/sleep-test/landing-hero";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { SymptomsGrid } from "@/components/sleep-test/symptoms-grid";
import { HowItWorksLanding } from "@/components/sleep-test/how-it-works-landing";
import { ExpertTrust } from "@/components/sleep-test/expert-trust";
import { WhatsIncluded } from "@/components/sleep-test/whats-included";
import { TheOffer } from "@/components/sleep-test/the-offer";
import { TestVsLab } from "@/components/sleep-test/test-vs-lab";
import { FAQSection } from "@/components/shared/faq-section";
import { FinalCtaLanding } from "@/components/sleep-test/final-cta-landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "At-Home Sleep Apnea Test | Dumbo Health",
  description:
    "Find out if sleep apnea is stealing your sleep. The WatchPAT ONE delivers physician-reviewed results in 48 hours — $149 flat, free shipping. Test positive and start CPAP? Your first month is on us.",
  alternates: {
    canonical: "https://www.dumbo.health/get-your-at-home-sleep-apnea-test",
  },
};

export default function SleepTestLandingPage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <LandingHero />
        <TrustMarquee />
        <SymptomsGrid />
        <HowItWorksLanding />
        <ExpertTrust />
        <WhatsIncluded />
        <TheOffer />
        <TestVsLab />
        <FAQSection limit={5} showCta={false} />
        <FinalCtaLanding />
      </main>
      <LandingFooter />
    </>
  );
}
