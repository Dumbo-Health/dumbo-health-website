import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingFooter } from "@/components/landing/landing-footer";
import { TrustMarquee } from "@/components/shared/trust-marquee";
import { ExpertTrust } from "@/components/sleep-test/expert-trust";
import { DotHero } from "@/components/dot/dot-hero";
import { DotClearanceNeed } from "@/components/dot/dot-clearance-need";
import { DotHowItWorks } from "@/components/dot/dot-how-it-works";
import { DotWhatsIncluded } from "@/components/dot/dot-whats-included";
import { DotAfterPositive } from "@/components/dot/dot-after-positive";
import { DotVsLab } from "@/components/dot/dot-vs-lab";
import { DotFaq } from "@/components/dot/dot-faq";
import { DotFinalCta } from "@/components/dot/dot-final-cta";

export const metadata: Metadata = {
  title: "DOT Sleep Apnea Test for CDL Drivers | Dumbo Health",
  description:
    "Flagged for sleep apnea at your DOT physical? Get the physician-reviewed documentation your medical examiner needs in 48 hours. At-home WatchPAT ONE sleep test, $149. Ships anywhere.",
  alternates: {
    canonical: "https://www.dumbo.health/dot-sleep-apnea-testing",
  },
};

export default function DotLandingPage() {
  return (
    <>
      <LandingNavbar />
      <main>
        <DotHero />
        <TrustMarquee />
        <DotClearanceNeed />
        <DotHowItWorks />
        <ExpertTrust />
        <DotWhatsIncluded />
        <DotAfterPositive />
        <DotVsLab />
        <DotFaq />
        <DotFinalCta />
      </main>
      <LandingFooter />
    </>
  );
}
