import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import { webPageSchema } from "@/lib/schemas";

export const metadata: Metadata = createMetadata({
  title: "Medical Review Policy | Dumbo Health",
  description:
    "Learn how Dumbo Health creates, reviews, and updates its medical content. All health information is written by qualified writers and reviewed by board-certified sleep medicine physicians.",
  path: "/medical-review-policy",
});

export default function MedicalReviewPolicyPage() {
  const schema = webPageSchema(
    "Medical Review Policy | Dumbo Health",
    "Learn how Dumbo Health creates, reviews, and updates its medical content. All health information is written by qualified writers and reviewed by board-certified sleep medicine physicians.",
    "/medical-review-policy"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <article className="bg-daylight py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <p
              className="font-mono uppercase tracking-widest mb-4"
              style={{ fontSize: "0.75rem", color: "rgba(3,31,61,0.45)" }}
            >
              Editorial Standards
            </p>
            <h1
              className="font-heading font-medium text-midnight mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Medical Review Policy
            </h1>
            <p className="font-mono text-xs text-midnight/50 mb-10 uppercase tracking-widest">
              Last Updated: March 2026
            </p>

            <div className="font-body text-base leading-relaxed space-y-10" style={{ color: "rgba(3,31,61,0.8)" }}>

              {/* Our commitment */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  Our Commitment to Accuracy
                </h2>
                <p>
                  Dumbo Health publishes health information to help people understand sleep apnea, recognize its
                  symptoms, and make informed decisions about diagnosis and treatment. We take that responsibility
                  seriously. Every piece of medical content on this site is written with care and reviewed by a
                  licensed physician before publication.
                </p>
                <p className="mt-4">
                  We follow the principles of Experience, Expertise, Authoritativeness, and Trustworthiness
                  (E-E-A-T) in everything we publish. Our goal is to give you accurate, up-to-date information
                  that you can rely on — written in plain language, not medical jargon.
                </p>
              </section>

              {/* Who creates our content */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  Who Creates Our Content
                </h2>
                <p>
                  Our health content is produced by a team that includes:
                </p>
                <ul className="mt-4 space-y-3 list-disc list-outside pl-5">
                  <li>
                    <strong>Medical writers</strong> with backgrounds in health communication, science journalism,
                    or clinical practice. Writers research claims using peer-reviewed literature, clinical guidelines
                    from organizations like the American Academy of Sleep Medicine (AASM), and data from the NIH,
                    CDC, and other authoritative sources.
                  </li>
                  <li>
                    <strong>Board-certified sleep medicine physicians</strong> who review all clinical content for
                    accuracy, completeness, and appropriate nuance before it is published. Reviewers verify that
                    medical claims are consistent with current evidence and clinical standards.
                  </li>
                  <li>
                    <strong>The Dumbo Health Scientific Committee</strong>, a group of sleep medicine specialists
                    who advise on complex clinical topics and emerging research. You can{" "}
                    <Link href="/about-us" className="text-peach hover:underline">
                      meet our team on our About page
                    </Link>
                    .
                  </li>
                </ul>
              </section>

              {/* Review process */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  Our Review Process
                </h2>
                <p>All health content goes through the following steps before publication:</p>
                <ol className="mt-4 space-y-4 list-decimal list-outside pl-5">
                  <li>
                    <strong>Research and drafting.</strong> A qualified writer researches the topic using primary
                    and secondary sources, including peer-reviewed journals, clinical practice guidelines, and
                    established medical references.
                  </li>
                  <li>
                    <strong>Medical review.</strong> A board-certified physician reviews the draft for clinical
                    accuracy. The reviewer checks that all medical claims are supported by evidence, flags anything
                    that requires clarification or correction, and confirms that the content is appropriate for a
                    general audience.
                  </li>
                  <li>
                    <strong>Editorial review.</strong> An editor reviews the content for clarity, tone, and
                    consistency with Dumbo Health&rsquo;s editorial standards. We write for a general adult
                    audience and aim for a reading level that is accessible without sacrificing accuracy.
                  </li>
                  <li>
                    <strong>Publication.</strong> Approved content is published with a byline indicating the author
                    and medical reviewer. The publication and last-reviewed dates are displayed on each article.
                  </li>
                </ol>
              </section>

              {/* How we cite sources */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  How We Cite Sources
                </h2>
                <p>
                  We link to or cite authoritative external sources for medical claims wherever appropriate. Our
                  preferred sources include:
                </p>
                <ul className="mt-4 space-y-2 list-disc list-outside pl-5">
                  <li>American Academy of Sleep Medicine (AASM)</li>
                  <li>National Institutes of Health (NIH) and National Heart, Lung, and Blood Institute (NHLBI)</li>
                  <li>Centers for Disease Control and Prevention (CDC)</li>
                  <li>Journal of Clinical Sleep Medicine (JCSM) and other peer-reviewed publications</li>
                  <li>U.S. Food and Drug Administration (FDA)</li>
                </ul>
                <p className="mt-4">
                  We do not publish content that is not supported by credible evidence, and we clearly distinguish
                  between established facts and emerging or contested research.
                </p>
              </section>

              {/* Content updates */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  How We Keep Content Current
                </h2>
                <p>
                  Medical knowledge evolves. We review published health articles on a regular basis — at minimum
                  annually — and update content when:
                </p>
                <ul className="mt-4 space-y-2 list-disc list-outside pl-5">
                  <li>Clinical guidelines change or new evidence emerges</li>
                  <li>A physician reviewer identifies information that needs correction</li>
                  <li>Readers or clinicians flag an inaccuracy</li>
                  <li>We become aware that a claim no longer reflects current medical consensus</li>
                </ul>
                <p className="mt-4">
                  When an article is updated, we revise the &ldquo;last reviewed&rdquo; date to reflect when it was
                  most recently verified by a physician.
                </p>
              </section>

              {/* What this content is not */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  What This Content Is Not
                </h2>
                <p>
                  The health information on Dumbo Health is intended for general educational purposes only. It is
                  not a substitute for professional medical advice, diagnosis, or treatment. Always consult your
                  physician or a qualified healthcare provider with questions about your specific health situation.
                </p>
                <p className="mt-4">
                  If you are experiencing a medical emergency, call 9-1-1 immediately.
                </p>
              </section>

              {/* Report an issue */}
              <section>
                <h2 className="font-heading font-medium text-midnight mb-3" style={{ fontSize: "1.375rem" }}>
                  Report a Concern
                </h2>
                <p>
                  If you believe any content on our site contains a medical inaccuracy, is out of date, or could
                  mislead readers, we want to know. Please reach out to us at{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-peach hover:underline"
                  >
                    {CONTACT.email}
                  </a>{" "}
                  with the subject line &ldquo;Content Feedback&rdquo; and a description of the concern. We review
                  all submissions and respond where appropriate.
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
