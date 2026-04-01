import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "Read Dumbo Health's privacy policy. Learn how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <>
    <Navbar />
    <main>
    <article className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1
          className="font-heading font-medium text-midnight mb-4"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          Dumbo Health Privacy Notice
        </h1>
        <p className="font-mono text-xs text-midnight/50 mb-12">Last Modified: 01/08/2026</p>

        <div className="prose prose-lg max-w-none font-body text-midnight/80 space-y-8">
          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">1. Introduction</h2>
            <p>
              Dumbo Health, Inc. (&ldquo;Dumbo Health,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting it. Dumbo Health is NOT a medical group or health care provider — it provides a platform connecting users to independent medical practices, specifically &ldquo;Selene Medical Group, P.A.&rdquo;
            </p>
            <p>
              &ldquo;Personal Information&rdquo; means any information that identifies, relates to, describes, references, or could reasonably be linked with an individual or device.
            </p>
            <p>
              This notice applies to your use of our platform, phone and telehealth visits, wearable device connections, and electronic communications. It does NOT apply to offline collection, employment data, third-party websites, or HIPAA-governed platform areas.
            </p>
            <p>This Privacy Notice is incorporated into our Terms of Use.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">2. No Children Under 18</h2>
            <p>
              Our platform is not intended for individuals under 18. We do not knowingly collect data from children. Contact us at{" "}
              <a href={`mailto:${CONTACT.privacyEmail}`} className="text-peach hover:underline">{CONTACT.privacyEmail}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">3. Information Collection</h2>
            <p>
              We collect information from multiple sources including direct collection (forms, calls, emails), automatic collection (cookies, tracking technologies), payment processing (Stripe), service providers (Itamar, Resmed, Healthie, Somnoware, Impilo, MaskFit AR, Shopify, Supabase, AWS), and third parties/healthcare providers.
            </p>
            <p>
              <strong>Categories collected include:</strong> identifiers (name, address, phone, email), financial data (bank accounts, credit/debit cards), medical/health information (insurance, biometric, sleep data), and usage data (transactions, surveys, search queries, communications).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">4. How Information Is Used</h2>
            <p>
              We use your information for providing and personalizing services, processing payments, communications (support, newsletters, promotions, reminders), security and fraud prevention, legal compliance, research and product development, advertising/marketing, and surveys.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">5. SMS Communications</h2>
            <p>
              With your consent, we send texts for account, orders, shipping, and care updates. Opt-out by replying STOP. For help, reply HELP or contact{" "}
              <a href={`mailto:${CONTACT.privacyEmail}`} className="text-peach hover:underline">{CONTACT.privacyEmail}</a>. Consent is not a condition of purchase.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">6. Disclosure</h2>
            <p>
              We do not sell your Personal Information. We may disclose to subsidiaries, service providers, buyers/successors in mergers and acquisitions, legal/law enforcement, or with your consent.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">7. User Choices</h2>
            <p>
              You can manage cookies via browser settings or our consent manager. Opt out of interest-based ads via NAI and DAA. Opt out of direct marketing via unsubscribe links or by replying STOP.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">8. Service Availability</h2>
            <p>Our services are limited to the United States.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">9. Do Not Track</h2>
            <p>Our website is not designed to honor Do Not Track signals.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">10. Data Security</h2>
            <p>
              We implement technical, organizational, and physical safeguards. However, no system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">11. Third-Party Sites</h2>
            <p>We are not responsible for third-party privacy practices.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">12. Changes</h2>
            <p>
              We may update this notice at any time. Material changes may trigger email notification.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium text-midnight">13. Contact</h2>
            <p>
              <strong>Dumbo Health, Inc.</strong><br />
              {CONTACT.address.street}<br />
              {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}<br />
              Phone: {CONTACT.phone}<br />
              Email: <a href={`mailto:${CONTACT.privacyEmail}`} className="text-peach hover:underline">{CONTACT.privacyEmail}</a>
            </p>
          </section>
        </div>
      </div>
    </article>
    </main>
    <Footer />
    </>
  );
}
