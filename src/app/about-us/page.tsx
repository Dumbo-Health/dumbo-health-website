import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/hero";
import { ValuesSection } from "@/components/about/values-section";
import { StorySection } from "@/components/about/story-section";
import { TeamCard } from "@/components/about/team-card";
import { AboutMarquee } from "@/components/about/marquee";
import { CTASection } from "@/components/shared/cta-section";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { VideoEmbed } from "@/components/shared/video-embed";
import { scientificCommittee, medicalTeam } from "@/content/team";

export const metadata: Metadata = createMetadata({
  title: "About Dumbo Health - Telehealth Sleep Apnea Experts",
  description: "Meet the team behind Dumbo Health. Our mission is to make better sleep easy, accessible, and backed by science. World-class scientific committee and medical team.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main>
      <AboutHero />
      <AboutMarquee />
      <ValuesSection />
      <StorySection />

      <section id="experts" className="bg-sunlight py-16 sm:py-24">
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

      <section className="bg-sunlight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h2 text-midnight mb-2">Press</h2>
          <h3 className="font-heading text-h3 text-midnight/70 mb-8">
            Joining the Conversation for Healthier Nights
          </h3>
          <p className="font-body text-body text-midnight/50">No items found.</p>
        </div>
      </section>

      <VideoEmbed />
      <CTASection />
      <ServiceAreaBanner />
      </main>
      <Footer />
    </>
  );
}
