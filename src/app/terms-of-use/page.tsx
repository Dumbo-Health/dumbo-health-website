import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
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

            {/* Header */}
            <h1
              className="font-heading font-medium text-midnight mb-3"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
            >
              Terms of Use
            </h1>
            <p className="font-mono text-xs text-midnight/50 mb-8 uppercase tracking-widest">
              Last Updated: 12/17/2025
            </p>

            {/* Emergency banner */}
            <div className="bg-peach/10 border border-peach/30 rounded-xl p-4 mb-10">
              <p className="font-body text-sm font-bold text-midnight">
                IF THIS IS A MEDICAL EMERGENCY OR CRISIS SITUATION, DIAL 9-1-1 IMMEDIATELY
              </p>
            </div>

            {/* Preamble */}
            <div className="font-body text-base text-midnight/80 space-y-4 mb-10 leading-relaxed">
              <p>
                Carefully read these Terms of Use (&ldquo;Terms of Use&rdquo;) as they govern your access to and use of
                the Dumbo Health, Inc. (&ldquo;Dumbo Health,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
                &ldquo;our&rdquo;) Platform. Your acceptance of, and compliance with, these Terms of Use is a condition
                to your use of:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-1">
                <li>The Dumbo Health website located at https://dumbo.health (our &ldquo;Website&rdquo;)</li>
                <li>Our wearable device products (our &ldquo;Devices&rdquo;)</li>
                <li>
                  The services (&ldquo;Services&rdquo;) made available through our Application and/or Website
                </li>
              </ul>
              <p>
                The non-medical business support services, our Application, Devices, and Website are collectively
                referred to as our &ldquo;Platform.&rdquo;
              </p>
              <p>
                It is important to know that Dumbo Health is not a medical group or health care provider; we are a
                technology company that provides the Platform, which allows you to connect with a healthcare provider and
                receive clinical and medical services (the &ldquo;Services&rdquo;). Dumbo Health provides users with the
                ability to obtain a telemedicine consultation through the Platform by connecting you with independent
                medical practices such as Selene Medical Group, P.A. and its affiliated medical practices (collectively
                the &ldquo;Practice&rdquo;). The Practice contracts with or employs appropriately licensed health care
                providers (each, a &ldquo;Provider&rdquo;) that are able to provide you the Services through our
                Platform.
              </p>
              <p>
                By clicking &ldquo;Accept,&rdquo; you acknowledge that you have read in its entirety, understand, and
                fully accept all terms and conditions contained in these Terms of Use, our Privacy Notice, and the HIPAA
                Notice of Privacy Practices provided to you by Practice. If you do not agree to be bound by these Terms
                of Use and our Privacy Notice, you are not authorized to access or use our Platform and/or the Services;{" "}
                <strong>PROMPTLY EXIT THE PLATFORM.</strong>
              </p>
            </div>

            {/* Arbitration callout */}
            <div className="bg-midnight/5 border border-midnight/15 rounded-xl p-5 mb-12">
              <p className="font-body text-sm font-bold text-midnight mb-1">Binding Arbitration</p>
              <p className="font-body text-sm text-midnight/80 leading-relaxed">
                These Terms of Use provide that all disputes between you and Dumbo Health that in any way relate to
                these Terms of Use, the Platform, and/or the Services will be resolved by{" "}
                <strong>BINDING ARBITRATION. YOU AGREE TO GIVE UP YOUR RIGHT TO GO TO COURT (INCLUDING IN A CLASS
                ACTION PROCEEDING).</strong> Your rights will be determined by a <strong>NEUTRAL ARBITRATOR</strong> and
                NOT a judge or jury, and your claims cannot be brought as a class action. Please review Section 24
                (Dispute Resolution; Arbitration Agreement) for details.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10 font-body text-base text-midnight/80 leading-relaxed">

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  1. Services Provided – No Medical Care or Advice
                </h2>
                <div className="space-y-3">
                  <p>
                    Dumbo Health is not a medical practice and does not provide medical advice, care, and/or treatment.
                    Dumbo Health provides administrative and management services to independent, physician-owned and
                    operated medical practices. Any telemedicine consults obtained through our Platform are provided by
                    Providers, including but not limited to the Practice, which is owned and operated by a licensed
                    physician.
                  </p>
                  <p>
                    There is no single provider of medical care called &ldquo;Dumbo Health.&rdquo; The Practice engages
                    a network of U.S.-based clinicians who provide clinical telehealth services. The Providers deliver
                    clinical services via the Platform to their patients. Dumbo Health does not provide medical advice or
                    care, own or operate the medical practices, employ or supervise the clinicians providing medical
                    care, and control over the care provided is the sole responsibility of the independent medical
                    practices and the Providers they employ. Services and practices may vary across Providers; contact
                    the Providers at the Practice directly for all questions concerning your medical care.
                  </p>
                  <p>
                    The Services and medical care provided by the Practice are not a substitute for care from your local
                    primary care provider. We strongly recommend maintaining a relationship with a local primary care
                    provider for ongoing medical care and treatment.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  2. Not for Emergencies
                </h2>
                <div className="space-y-3">
                  <p>
                    The Platform and the Services are not for medical emergencies or urgent situations. Do not disregard
                    or delay seeking medical advice based on anything that appears (or does not appear) on our Platform.
                    If you believe you are experiencing an emergency, call 9-1-1 immediately.
                  </p>
                  <p>
                    Seek emergency help or follow-up care when recommended by a Provider or when otherwise needed.
                    Continue to consult with your primary provider and other healthcare professionals as recommended.
                    Always seek the advice of a physician or other qualified healthcare provider regarding questions
                    about a medical condition and before stopping, starting, or modifying any treatment.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  3. Risk of Services; Accuracy and Integrity of Information
                </h2>
                <p>
                  By using the Services, you acknowledge risks associated with telehealth services, including but not
                  limited to: insufficient information (e.g., poor image resolution) for appropriate decision-making;
                  delays due to equipment failure; lack of access to medical records potentially resulting in adverse
                  drug interactions, allergic reactions, or other judgment errors; and potential failure of security
                  protocols that could cause a breach of privacy of your health information.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  4. Privacy Practices
                </h2>
                <p>
                  Information you provide in connection with the Platform and the Services is governed by our Privacy
                  Notice, which is incorporated into these Terms of Use. Information you provide in connection with the
                  Services is also governed by the applicable Practice Notice of Privacy Practices, which is
                  incorporated herein.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  5. Prescription Practices
                </h2>
                <div className="space-y-3">
                  <p>
                    Certain products available through the Platform require a valid prescription by a licensed
                    healthcare provider. You cannot obtain a prescription product unless you have completed a
                    consultation with a Provider through the Platform, the Provider determines the product is
                    appropriate for you, and the Provider writes a prescription.
                  </p>
                  <p>
                    If a prescription is written, you may fill it at any pharmacy of your choice as prompted during
                    your use of the Services.
                  </p>
                  <p>
                    You agree that any prescriptions acquired from a Provider will be solely for your personal use.
                    Read all provided product information and labels carefully and contact a physician or pharmacist
                    with questions. We honor patient freedom of choice; you may instruct your Provider to transmit your
                    prescription to the pharmacy of your choice.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  6. Not an Insurance Product
                </h2>
                <p>
                  We are not an insurer, and we do not offer an insurance plan or product. Amounts you pay for any
                  Services obtained through the Platform are not insurance premiums. If you desire insurance, you must
                  purchase such insurance separately.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  7. Ownership of the Platform
                </h2>
                <div className="space-y-3">
                  <p>
                    The Platform contains confidential and proprietary Content owned by Dumbo Health, its licensors, or
                    other providers and protected by applicable intellectual property laws.
                  </p>
                  <p>
                    These Terms of Use permit you to use the Platform for personal, non-commercial use only. You must
                    not reproduce, distribute, modify, create derivative works of, publicly display or perform,
                    republish, download, store, or transmit any material on our Platform, including Content, except:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1">
                    <li>Temporary copies stored in RAM incidental to access/viewing</li>
                    <li>Browser-cached files for display enhancement</li>
                    <li>One copy of a reasonable number of pages for your personal, non-commercial use</li>
                  </ul>
                  <p>You must not:</p>
                  <ul className="list-disc list-outside pl-5 space-y-1">
                    <li>Modify copies of materials from the Platform or Services</li>
                    <li>Use illustrations, photographs, video/audio, or graphics separately from accompanying text</li>
                    <li>Delete or alter any copyright, trademark, or other proprietary notices</li>
                  </ul>
                  <p>
                    You may not frame, deep link to, or enclose any name, marks, logo, content, or other proprietary
                    information of Dumbo Health without express written consent.
                  </p>
                  <p>
                    You must not use any part of the Platform, services, or materials for outsourcing or as part of a
                    service bureau for unaffiliated third parties or other commercial purposes without our written
                    consent.
                  </p>
                  <p>
                    If you breach these Terms of Use, your right to use the Platform ceases immediately and you must
                    return or destroy any copies you have made. No right, title, or interest is transferred to you; all
                    rights are reserved by Dumbo Health.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  8. Availability of Services
                </h2>
                <p>
                  Dumbo Health operates subject to state and federal regulations, and the Platform may not be available
                  in your state. You represent that you are not barred from accessing the Platform or receiving the
                  Services under applicable laws. Access is limited to users located in U.S. states where the Platform
                  is available; Services are not available to users outside the United States. Accessing the Platform
                  from jurisdictions where content is illegal, or where we do not offer the Platform, is prohibited.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  9. Access to Platform, Security, and Restrictions; Passwords
                </h2>
                <div className="space-y-3">
                  <p>
                    You are prohibited from violating or attempting to violate Platform security (e.g., unauthorized
                    access, probing/scanning, or breaching authentication). Except for ADA accessibility purposes, you
                    may not use automated means (scraper, crawler, spider, robot) to access or copy data, deep-link,
                    or bypass measures preventing or restricting access. If ADA options are not sufficient for your
                    circumstances, contact{" "}
                    <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">
                      {CONTACT.email}
                    </a>{" "}
                    or {CONTACT.phone} for an accommodation.
                  </p>
                  <p>
                    Violations may result in civil or criminal liability. We may investigate and cooperate with law
                    enforcement. Do not interfere with the proper working of the Platform.
                  </p>
                  <p>
                    If access requires a user ID and password (&ldquo;Protected Areas&rdquo;), you agree to use only
                    your own credentials, protect their confidentiality, and are responsible for all activity under
                    your ID. Access may be revoked at any time. You agree to defend, indemnify, and hold Dumbo Health
                    harmless from claims arising out of your breach, your use, or access by anyone using your
                    credentials.
                  </p>
                  <p>
                    If you submit any User Information (health information, personal data, forms, content, etc.), you
                    agree not to provide content that is false, unlawful, obscene, threatening, harassing, infringing,
                    or contains viruses/harmful components; and you agree not to contact other users through
                    unsolicited communications. You represent and warrant you have the legal right to provide all User
                    Information.
                  </p>
                  <p>
                    Dumbo Health or Practice may de-identify your information and use, aggregate, sell, or disclose
                    such de-identified information for analytics, research, or other lawful purposes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  10. No Users Under 18 Years Old
                </h2>
                <p>
                  To access the Platform and Services, you represent and warrant you are at least 18 years old. Do not
                  use or provide information if under 18. If we learn we collected personal information from a child
                  under 18, we will delete it. If you believe this has occurred, please Contact Us.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  11. Your Account
                </h2>
                <p>
                  You agree to provide true, accurate, current, and complete Registration Information and to maintain
                  and promptly update it. We may suspend or terminate your account for untrue/inaccurate information.
                  You are responsible for maintaining password confidentiality and all activity under your account. Do
                  not allow others to access your account.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  12. Accuracy and Integrity of Information
                </h2>
                <p>
                  We attempt to ensure Platform integrity and accuracy but make no guarantees. The Platform may include
                  errors or unauthorized changes. Inform us of inaccuracies so we can correct them. We may correct
                  inaccuracies unilaterally and without notice. Information may change without notice. Dumbo Health is
                  not responsible for third-party content posted to the Platform.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  13. Typographical Errors and Incorrect Pricing
                </h2>
                <p>
                  If a Service is listed at an incorrect price due to typographical error or supplier/partner error, we
                  may refuse or cancel any purchase at the incorrect price, whether or not confirmed/charged. If
                  already charged, we will promptly issue a credit for the incorrect amount.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  14. Notice and Procedure for Making Claims of Copyright Infringement
                </h2>
                <div className="space-y-3">
                  <p>
                    To file a notice of infringement, provide the following to our designated copyright agent:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>Description of the copyrighted work or other intellectual property claimed infringed</li>
                    <li>Description of the material claimed to be infringing</li>
                    <li>Your address, telephone number, and email address</li>
                    <li>
                      Statement: &ldquo;I have a good faith belief that use of the copyrighted materials described
                      above as allegedly infringing is not authorized by the copyright owner, its agent, or the
                      law.&rdquo;
                    </li>
                    <li>
                      Statement: &ldquo;I swear, under penalty of perjury, that the information in the notification
                      is accurate and that I am the copyright owner or am authorized to act on behalf of the owner
                      of an exclusive right that is allegedly infringed.&rdquo;
                    </li>
                    <li>Your electronic or physical signature</li>
                  </ul>
                  <div className="bg-midnight/5 rounded-lg p-4 text-sm">
                    <p className="font-medium text-midnight mb-1">
                      Designated Agent (per 17 U.S.C. 512(c))
                    </p>
                    <p>ATTN: Copyright Agent</p>
                    <p>Dumbo Health, Inc.</p>
                    <p>12864 Biscayne Blvd., Unit #2040</p>
                    <p>North Miami, FL 33181</p>
                    <p>
                      <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">
                        {CONTACT.email}
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  15. Online Payments
                </h2>
                <div className="space-y-3">
                  <p>
                    You can pay for Services on the Platform. If you purchase a Service from Practice, the total price
                    includes the amount charged by Practice. Before purchase, you&rsquo;ll see an itemized invoice
                    listing Practice charges.
                  </p>
                  <p>
                    We accept payment cards issued by U.S. banks. We may obtain preapproval up to the payment amount.
                    For recurring payments, all charges/fees will be billed to the payment card you designate. To
                    change cards, update your information online (there may be a temporary delay while verifying new
                    details).
                  </p>
                  <p>
                    You represent and warrant that any Payment Method you supply is legitimate, active, you are an
                    authorized user, and you authorize payment in the purchase amount (including applicable taxes).
                    Electronic transactions must comply with U.S. law and network rules. Each payment will be processed
                    in U.S. dollars and may vary upon currency conversion.
                  </p>
                  <p>
                    If we cannot secure funds (e.g., insufficient funds or inaccurate info), we may take collection
                    action, including fees as permitted by law. You agree not to dispute charges from Dumbo Health,
                    Practice, or any third-party processor if you authorized the charge and transactions align with
                    these Terms of Use.
                  </p>

                  <h3 className="font-heading text-lg font-medium text-midnight pt-2">Subscription Terms</h3>
                  <p>
                    If you purchase a subscription to our Platform and/or Services, your subscription is continuous
                    and will continue month-to-month unless you cancel at least five (5) days before the last day of
                    the month by Contacting Us.
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1">
                    <li>
                      You may cancel your subscription at any time by contacting us at{" "}
                      <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">
                        {CONTACT.email}
                      </a>{" "}
                      or {CONTACT.phone}.
                    </li>
                    <li>
                      If you cancel, your account will close at the end of the current billing period. Dumbo Health
                      may change subscription prices and will communicate changes in advance and, if applicable, how
                      to accept them. Price changes take effect at the start of the next subscription period.
                      Continuing to use the Platform after the change constitutes acceptance; otherwise, unsubscribe
                      before the effective date.
                    </li>
                  </ul>
                  <p>
                    We accept U.S.-issued credit/debit cards. For recurring payments, charges/fees will be billed to
                    your designated Payment Method. Update your Payment Method online if it changes.
                  </p>
                  <p>
                    If we cannot secure funds, we may suspend subscription services until a new Payment Method is
                    provided and, if applicable, take collection action (including processing fees, reasonable
                    attorneys&rsquo; fees, and court costs) as permitted by law. You agree not to dispute charges that
                    correspond to these Terms and are not the result of fraud or identity theft.
                  </p>
                  <p>
                    If your subscription plan provides for your use of equipment owned by Dumbo Health, you agree:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>Use is subject to continued subscription participation</li>
                    <li>You have no ownership rights in the equipment</li>
                    <li>Use of the equipment is not a consumer lease</li>
                    <li>
                      You authorize Dumbo Health to electronically monitor/track performance; Dumbo Health may share
                      such data with your Provider and may anonymize and use/share such data for business purposes
                    </li>
                    <li>Dumbo Health may request equipment return at any time</li>
                    <li>Dumbo Health may update/upgrade/replace equipment during your term</li>
                    <li>
                      If equipment breaks or becomes inoperable, notify Dumbo Health immediately; Dumbo Health may
                      substitute/replace/repair at its discretion
                    </li>
                    <li>
                      Except if due to Dumbo Health&rsquo;s termination of your subscription, you will receive a
                      pro-rata credit for periods where operable equipment is not available and your account is in
                      good standing, provided inoperability was not due to your gross negligence or intentional damage
                    </li>
                    <li>
                      You are not responsible for normal wear and tear, but may be responsible for the then-current
                      cost if you grossly, negligently, or willfully damage/destroy equipment; Dumbo Health may charge
                      your Payment Method for such value as permitted by law
                    </li>
                    <li>You must return equipment upon subscription termination</li>
                    <li>
                      If you fail to return equipment within 15 days after Dumbo Health&rsquo;s request or the end of
                      your plan, your Payment Method may be charged the equipment&rsquo;s value as permitted by law
                    </li>
                    <li>
                      Returning equipment does not automatically cancel your subscription. To cancel, provide notice
                      as set forth in these Terms; your account will close at the end of the current billing period.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  16. Purchase Acceptance
                </h2>
                <p>
                  We may refuse or cancel any purchase at our sole discretion. You will not be charged until your
                  payment method is authorized and purchase information is verified. We may require additional
                  verification before accepting payment. If a purchase is canceled after your payment account has been
                  charged, we will issue a credit for the amount charged.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  17. Links to Other Websites
                </h2>
                <p>
                  We make no representations about any other website you may access through the Platform.
                  Non-Dumbo Health websites are independent and outside our control. A link does not imply
                  endorsement. Use third-party sites at your own risk and ensure downloads are free of destructive
                  items.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  18. Consent to Receive Calls, Text Messages, and Audio and/or Video Recording
                </h2>
                <div className="space-y-3">
                  <p>
                    By providing your mobile number, you agree to be contacted by or on behalf of Dumbo Health
                    (calls/texts) to receive informational and Services-related messages. Message and data rates may
                    apply. To stop texts, reply STOP (we may confirm your opt-out or ask you to specify which services
                    to stop). Withdrawing consent may limit Platform functionality.
                  </p>
                  <p>
                    Dumbo Health or your Provider may record (audio/video) all or part of your interaction
                    (&ldquo;Recordings&rdquo;) for quality assurance, training, service delivery, and Platform
                    improvement. By using the Platform, you consent to such Recordings as described in these Terms and
                    our Privacy Notice.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  19. CAN-SPAM Act and TCPA Compliance
                </h2>
                <p>
                  Dumbo Health, Practice, and your Provider strive to comply with the CAN-SPAM Act and the Telephone
                  Consumer Protection Act (TCPA). You consent to receive text messages as described in Section 18. If
                  you receive any email or text you believe is non-compliant, please Contact Us.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  20. Electronic Communications
                </h2>
                <div className="space-y-3">
                  <p className="font-bold text-midnight">
                    YOU AGREE TO EXECUTE DOCUMENTS USING ELECTRONIC SIGNATURES and to receive communications and
                    documentation electronically instead of on paper.
                  </p>
                  <p>
                    When you use the Platform or send communications to us, you communicate electronically. You consent
                    to receive communications from us electronically. You agree that (a) all agreements and consents
                    can be signed electronically and (b) all notices/disclosures we provide electronically satisfy any
                    legal writing requirement.
                  </p>
                  <p>
                    We will not furnish paper copies unless you request them (or law requires). Paper copies, if
                    required, will be mailed to your primary address in our records or delivered as required by law.
                  </p>
                  <p>
                    We may contact you by telephone, mail, text (SMS), or email to verify your information. We may
                    request further information; failure to provide it within 3 days may result in suspension,
                    discontinuation, or denial of access.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  21. External Services
                </h2>
                <div className="space-y-3">
                  <p>
                    The Platform may enable access to Dumbo Health and/or third-party services/websites
                    (&ldquo;External Services&rdquo;). Use them at your sole risk. We are not responsible for
                    third-party content or accuracy. Data displayed by the Platform or External Services is for
                    general informational purposes only.
                  </p>
                  <p>
                    Do not use External Services in any manner inconsistent with these Terms or that infringes
                    intellectual property rights. Do not use them to harass, abuse, stalk, threaten, or defame.
                    External Services may not be available in all languages or locations. You are responsible for
                    compliance with applicable laws. We may change, suspend, remove, disable, or limit External
                    Services at any time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  22. Supplemental Terms Applicable to Providers
                </h2>
                <div className="space-y-3">
                  <p>
                    These supplemental terms apply to Providers in addition to other provisions. In a conflict, these
                    supplemental terms control.
                  </p>
                  <p>
                    To use the Platform as a Provider, you must be a licensed physician, nurse practitioner, or
                    healthcare professional contracted/employed by the Practice and comply with all applicable laws and
                    rules. Your relationship with users (including your Practice patients) is directly between you and
                    the patient. Patients do not have a physician-patient relationship with Dumbo Health. Dumbo Health
                    does not practice medicine and offers no medical services. Provider is solely responsible for
                    agreements, consents, notices, and interactions with patients, as well as billings and collections.
                    Dumbo Health has no liability regarding amounts owed to Provider.
                  </p>
                  <p>
                    We do not provide medical or legal advice regarding Provider compliance. Providers should seek
                    legal counsel. The Platform does not substitute or modify professional judgment.
                  </p>
                  <p>
                    Provider will use the Platform in accordance with applicable standards of good medical practice
                    and will advise patients, when necessary, that Services via the Platform may not be a complete or
                    adequate substitute for in-person assessments. Provider releases Dumbo Health and waives claims
                    arising from Provider&rsquo;s use of the Platform and provision of Services.
                  </p>
                  <p>
                    Provider agrees to defend, indemnify, and hold Dumbo Health harmless from claims by or on behalf
                    of any patient or third party arising out of Provider&rsquo;s use of the Platform. Provider will
                    obtain Dumbo Health&rsquo;s prior written consent to any settlement involving findings of fault by
                    Dumbo Health. Dumbo Health will promptly notify Provider of claims and grant Provider control over
                    defense/settlement.
                  </p>
                  <p>
                    If Provider submits Provider Content (consents, notices, advice, files, etc.), Provider agrees not
                    to submit unlawful/infringing/harmful content and is solely responsible for obtaining necessary
                    consents and providing required notices. Dumbo Health has a royalty-free, irrevocable, transferable
                    right to use such Provider Content worldwide. Dumbo Health is under no obligation to maintain,
                    compensate, or respond to Provider Content. Dumbo Health may monitor, edit, or remove Provider
                    Content at its discretion. Provider agrees not to mislead as to origin of content and remains
                    solely responsible for Provider Content.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  23. No Third-Party Rights
                </h2>
                <p>
                  Unless expressly stated, nothing herein confers rights or remedies on any person other than you,
                  Dumbo Health, Practice, and their affiliates. The Platform is provided for your benefit and may not
                  be relied upon by third parties.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  24. Dispute Resolution; Arbitration Agreement
                </h2>
                <div className="space-y-3">
                  <p>
                    We strive to resolve issues in good faith through customer service. If unresolved, you and Dumbo
                    Health agree to binding arbitration for any dispute, claim, or controversy arising out of or
                    relating to these Terms or your use of the Platform/Services.
                  </p>
                  <p>
                    Arbitration is more informal than court, uses a neutral arbitrator, allows limited discovery, and
                    is subject to limited court review. Arbitrators can award the same damages and relief as courts,
                    applying substantive law (including punitive damages standards). The U.S. Federal Arbitration Act
                    governs this provision. You and Dumbo Health waive the right to jury trial or class action. This
                    provision survives termination.
                  </p>
                  <p>
                    <strong>Notice of Claim.</strong> To arbitrate, send a written Notice by certified mail to: Dumbo
                    Health, Inc., 12864 Biscayne Blvd., Unit #2040 North Miami, FL 33181 (the &ldquo;Notice
                    Address&rdquo;). Dumbo Health will send Notice to your most recent address on file. The Notice
                    must describe the nature/basis of the claim and the specific relief sought
                    (&ldquo;Demand&rdquo;). If unresolved within 30 days after receipt, either party may commence
                    arbitration or file in small claims court. Forms are available at www.adr.org.
                  </p>
                  <p>
                    If you must pay a filing fee, Dumbo Health will promptly reimburse it after receiving notice you
                    commenced arbitration, unless your claim exceeds US $10,000. Arbitration will be governed by the
                    AAA Commercial Arbitration Rules and Supplementary Procedures for Consumer-Related Disputes, as
                    modified by these Terms, and administered by the AAA.
                  </p>
                  <p>
                    The arbitrator is bound by these Terms. Unless agreed otherwise, hearings will occur in the county
                    of your billing address (or, if outside the U.S., in your country at a reasonably convenient
                    location, subject to AAA Rules). For claims US $10,000 or less, you may choose document-only,
                    telephonic, or in-person hearing per AAA Rules. The arbitrator will issue a reasoned written
                    decision.
                  </p>
                  <p>
                    If the arbitrator awards you more than Dumbo Health&rsquo;s last written settlement offer before
                    arbitrator selection (or if none), Dumbo Health will pay you the award or US $1,000, whichever is
                    greater.
                  </p>
                  <p>
                    Except as stated, fees will be governed by AAA Rules. Each party pays its own costs and
                    attorneys&rsquo; fees unless a statute or agreement provides otherwise.
                  </p>
                  <p>
                    <strong>Class Action Waiver.</strong> You and Dumbo Health agree to bring claims only in
                    individual capacities, not as plaintiff or class member in any class or representative proceeding.
                    The arbitrator may not consolidate claims or preside over representative/class proceedings and may
                    award relief only to the extent necessary to provide relief warranted by the individual claim.
                  </p>
                  <p>
                    If this arbitration agreement is found unenforceable, (a) it is null and void, but the remainder
                    of the Terms remains in force; and (b) exclusive jurisdiction/venue will be in state or federal
                    courts located in and for Miami-Dade County, Florida. Both parties waive jury trial if arbitration
                    is unenforceable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  25. Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold Dumbo Health and affiliates harmless from any and all
                  claims, losses, liabilities, damages, costs, and attorneys&rsquo; fees arising directly or
                  indirectly out of: (a) your use/misuse of the Platform, Services, or information on the Platform;
                  (b) your breach of these Terms or the Privacy Notice; (c) the content or subject matter of any
                  information you provide to Dumbo Health, Practice, or your Provider; or (d) any negligent or
                  wrongful act/omission by you, including infringement or violation of third-party rights.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  26. Disclaimer of Warranties
                </h2>
                <div className="space-y-3">
                  <p>
                    Dumbo Health does not warrant that access to or use of the Platform will be uninterrupted or
                    error-free or that defects will be corrected. The Platform (including any content/information or
                    service related to it) is provided &ldquo;AS IS,&rdquo; WITH ALL FAULTS, without warranties of
                    any kind, express or implied, including merchantability, fitness for a particular purpose, quality
                    of information, quiet enjoyment, and title/non-infringement.
                  </p>
                  <p>
                    You assume total responsibility and risk for your use of the Platform, Platform-related services,
                    Services, and linked websites. Dumbo Health does not warrant that files available for download
                    will be free of destructive programming. You are responsible for procedures sufficient for data
                    backup and security.
                  </p>
                  <p>
                    Warranties relating to Services offered, sold, and distributed by Dumbo Health are subject to
                    separate terms, if any.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  27. Limitation of Liability Regarding Use of Platform and Services
                </h2>
                <p>
                  Dumbo Health and third parties mentioned on the Platform are not responsible or liable for any
                  direct, indirect, incidental, consequential, special, exemplary, punitive, or other damages
                  (including lost profits, data loss, or business interruption) arising out of or relating to the
                  Platform, Platform-related services, Services, content, information, and/or any linked website,
                  whether based on warranty, contract, tort, or any other legal theory, and whether or not advised of
                  the possibility. Your sole remedy is to stop using the Platform and/or those Services. Where
                  limitations are not enforceable, the maximum aggregate liability of Dumbo Health to you is $500
                  (five hundred dollars).
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  28. Force Majeure
                </h2>
                <div className="space-y-3">
                  <p>
                    We will not be deemed in breach or liable for failure/delay in performance caused by events beyond
                    our reasonable control (Force Majeure Events), including: acts of God; flood, fire, earthquake,
                    explosion, pandemic/epidemic; war, invasion, hostilities, terrorism, riot/civil unrest; government
                    order/law/actions; embargoes/blockades; national/regional emergency; and other events beyond our
                    reasonable control.
                  </p>
                  <p>
                    We will use diligent efforts to communicate within 30 days of the event, minimize effects, and
                    resume performance as soon as reasonably practicable.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  29. Copyright &amp; Trademark Information
                </h2>
                <p>
                  Copyright &copy; 2026 Dumbo Health, Inc. All rights reserved. All trademarks, logos, and service
                  marks (&ldquo;Marks&rdquo;) displayed on the Platform are our property or that of third parties.
                  You may not use these Marks without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  30. Revisions; General
                </h2>
                <p>
                  Dumbo Health may terminate your access to all or part of the Platform, with or without cause or
                  notice. If any provision is held unenforceable, it shall be limited or eliminated to the minimum
                  extent necessary, and the remainder will remain in full force. These Terms constitute the entire
                  agreement between you and Dumbo Health. We may revise these Terms by updating this posting; you
                  should periodically review this page. Your continued use after revisions constitutes agreement to
                  the revised Terms. Certain provisions may be superseded by expressly designated legal notices or
                  terms on particular Platform pages.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-xl font-medium text-midnight mb-3">
                  31. Contact Us
                </h2>
                <address className="not-italic space-y-1">
                  <p className="font-medium text-midnight">Dumbo Health, Inc.</p>
                  <p>{CONTACT.address.street}</p>
                  <p>{CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}</p>
                  <p className="pt-1">{CONTACT.phone}</p>
                  <p>
                    <a href={`mailto:${CONTACT.email}`} className="text-peach hover:underline">
                      {CONTACT.email}
                    </a>
                  </p>
                </address>
              </section>

            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
