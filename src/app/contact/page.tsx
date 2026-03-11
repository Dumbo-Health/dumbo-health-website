import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactCards } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQSection } from "@/components/shared/faq-section";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Contact Dumbo Health - Sleep Apnea Support & Help",
  description: "Get in touch with Dumbo Health. Reach our support team, investors, or media contacts. Call +1 (786) 348-2820 or email contact@dumbo.health.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1
            className="font-heading font-medium text-midnight text-center mb-12"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
          >
            Contact Dumbo Health
          </h1>
          <ContactCards />
        </div>
      </section>

      <section className="bg-sunlight py-12 sm:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-heading font-medium text-midnight mb-2"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Are you already a Dumbo Health Patient?
          </h2>
          <p className="font-body text-base text-midnight/70 mb-6" style={{ maxWidth: "44ch", margin: "0 auto 1.5rem" }}>
            Log in for help tailored to your treatment, account, and more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <a href={`${APP_URL}/login`}>Login</a>
            </Button>
            <Button asChild>
              <a href={APP_URL}>Start Now</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              className="font-heading font-medium text-midnight mb-2"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              Let&apos;s talk!
            </h2>
            <h3
              className="font-heading font-medium text-midnight/70 mb-2"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Tell us what you need
            </h3>
            <p className="font-body text-base text-midnight/70">Write to us, we&apos;re here to help</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <ServiceAreaBanner />
      <FAQSection />
      <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
