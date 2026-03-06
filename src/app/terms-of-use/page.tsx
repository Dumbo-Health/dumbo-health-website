import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use | Dumbo Health",
  description: "Read Dumbo Health's terms of use. Understand the terms governing your use of our platform and services.",
  path: "/terms-of-use",
  noIndex: false,
});

export default function TermsOfUsePage() {
  return (
    <>
    <Navbar />
    <main>
    <article className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl md:text-4xl text-midnight mb-4">
          Dumbo Health Terms of Use
        </h1>
        <p className="font-mono text-tag text-midnight/50 mb-4">Last Updated: 12/17/2025</p>
        <div className="bg-peach/10 border border-peach/30 rounded-lg p-4 mb-12">
          <p className="font-body text-body font-bold text-midnight">
            IF THIS IS A MEDICAL EMERGENCY OR CRISIS SITUATION, DIAL 9-1-1 IMMEDIATELY
          </p>
        </div>

        <div className="prose prose-lg max-w-none font-body text-midnight/80 space-y-8">
          <section>
            <h2 className="font-heading text-h3 text-midnight">1. Services — No Medical Care</h2>
            <p>
              Dumbo Health is a technology company, not a medical practice. Clinical services are provided by licensed providers through Selene Medical Group, P.A.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">2. Not for Emergencies</h2>
            <p>
              This platform is not for medical emergencies. Call 911 for emergencies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">3. Risk of Services</h2>
            <p>
              Telehealth risks include insufficient information, equipment delays, incomplete records, and security breaches.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">4. Privacy</h2>
            <p>
              Your privacy is governed by our Privacy Notice and Practice Notice of Privacy Practices.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">5. Prescription Practices</h2>
            <p>
              Valid prescriptions require provider consultation. Prescriptions are for personal use only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">6. Not Insurance</h2>
            <p>
              We are not an insurer, and we do not offer an insurance plan or product.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">7. IP Ownership</h2>
            <p>
              Dumbo Health retains all intellectual property rights. Use is limited to personal, non-commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">8. Service Availability</h2>
            <p>
              Services depend on state and federal regulations. Available in the United States only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">9. Access & Security</h2>
            <p>
              No unauthorized access, scraping, or crawling. Users are responsible for their passwords. The company may de-identify health information for analytics.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">10. Age Requirement</h2>
            <p>You must be at least 18 years old to use our services.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">11. Your Account</h2>
            <p>
              Accurate registration is required. We may suspend or terminate accounts for false information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">12. Information Accuracy</h2>
            <p>
              We make no guarantees of accuracy and may correct errors without notice.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">13. Pricing Errors</h2>
            <p>We may refuse purchases at incorrect prices.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">14. DMCA</h2>
            <p>
              We have a designated agent for copyright notices in accordance with the DMCA.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">15. Online Payments</h2>
            <p>
              US bank-issued cards accepted. Subscriptions renew monthly. Cancel at least 5 days before billing cycle end via{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">{CONTACT.email}</a>{" "}
              or {CONTACT.phone}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">16. Purchase Acceptance</h2>
            <p>We may refuse or cancel purchases at our discretion.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">17. Third-Party Links</h2>
            <p>We are not responsible for third-party websites.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">18. Communications Consent</h2>
            <p>
              Providing your mobile number authorizes calls and texts. Opt-out by texting STOP. Audio and video may be recorded for quality assurance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">19. CAN-SPAM & TCPA Compliance</h2>
            <p>We strive to comply with CAN-SPAM and TCPA regulations.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">20. Electronic Signatures</h2>
            <p>
              By using our platform, you agree to electronic signatures and electronic communications.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">21. External Services</h2>
            <p>Third-party services are used at your own risk.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">22. Provider Terms</h2>
            <p>
              Healthcare providers must be licensed and are independent of Dumbo Health.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">23. No Third-Party Rights</h2>
            <p>Third parties cannot rely on platform benefits.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">24. Arbitration</h2>
            <p>
              All disputes are subject to binding arbitration under AAA Commercial Arbitration Rules. Class action waiver applies. A 30-day resolution period is required before arbitration. The company reimburses filing fees under $10,000.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">25. Indemnification</h2>
            <p>Users agree to defend and indemnify Dumbo Health.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">26. Disclaimer of Warranties</h2>
            <p>
              Services are provided &ldquo;AS IS, WITH ALL FAULTS&rdquo; — no warranties are made.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">27. Limitation of Liability</h2>
            <p>Maximum aggregate liability is $500.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">28. Force Majeure</h2>
            <p>
              We are not liable for events beyond our control, including acts of God, pandemics, and similar events. We commit to 30-day communication during such events.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">29. Copyright & Trademark</h2>
            <p>&copy; 2025 Dumbo Health, Inc. All rights reserved.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">30. Revisions</h2>
            <p>We may terminate access and revise these terms at any time.</p>
          </section>

          <section>
            <h2 className="font-heading text-h3 text-midnight">31. Contact</h2>
            <p>
              <strong>Dumbo Health, Inc.</strong><br />
              {CONTACT.address.street}<br />
              {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}<br />
              Phone: {CONTACT.phone}<br />
              Email: <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">{CONTACT.email}</a>
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
