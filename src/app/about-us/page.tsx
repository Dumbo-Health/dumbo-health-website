import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { aboutPageSchema, personSchema } from "@/lib/schemas";
import { medicalTeam, scientificCommittee } from "@/content/team";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { FounderStory } from "@/components/about/founder-story";
import { MissionVision } from "@/components/about/mission-vision";
import { WhatWereBuilding } from "@/components/about/what-were-building";
import { ValuesSection } from "@/components/about/values-section";
import { TeamSection } from "@/components/about/team-section";
import { Availability } from "@/components/about/availability";
import { BottomCTA } from "@/components/shared/bottom-cta";

export const metadata: Metadata = createMetadata({
  title: "About Dumbo Health — We Built the Company We Wish Had Existed",
  description:
    "Meet the founders and medical team behind Dumbo Health. A mission-driven company making sleep apnea treatment simple, affordable, and stigma-free — starting with the founders who lived it.",
  path: "/about-us",
});

export default function AboutUsPage() {
  const teamSchemas = [
    ...medicalTeam.map((m) =>
      personSchema({ name: m.name, jobTitle: m.title, description: m.bio, sameAs: [m.linkedin] })
    ),
    ...scientificCommittee.map((m) =>
      personSchema({ name: m.name, jobTitle: m.title, description: m.bio, sameAs: [m.linkedin] })
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema()) }}
      />
      {teamSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar />
      <main>
        {/* 1. Hero — the declaration */}
        <AboutHero />

        {/* 2. Founder story — Mo and Nico, the emotional core */}
        <FounderStory />

        {/* 3. Mission and vision — stated plainly */}
        <MissionVision />

        {/* 4. What we're building — today, who we serve, where we're going */}
        <WhatWereBuilding />

        {/* 5. Values — shown through behavior */}
        <ValuesSection />

        {/* 6 & 7. Scientific committee + medical team */}
        <TeamSection />

        {/* 8. Where we're available */}
        <Availability />

        {/* 9. Closing CTA */}
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
