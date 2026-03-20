"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQ[];
  calloutText?: string;
  calloutLink?: string;
  calloutLinkText?: string;
  backgroundColor?: string;
  /** Use dark text (midnight) for cream/light backgrounds like ebook */
  variant?: "default" | "ebook";
}

export default function FAQSection({
  title,
  subtitle,
  faqs,
  calloutText,
  calloutLink,
  calloutLinkText,
  backgroundColor = '#fcf6ed',
  variant = "default",
}: FAQSectionProps) {
  const textClass = variant === "ebook" ? "text-midnight" : "text-primary";
  const accentClass = variant === "ebook" ? "text-peach" : "text-orange";
  const headerSection = useScrollAnimation({ delay: 0 });
  const faqsSection = useScrollAnimation({ delay: 200 });
  const questionsSection = useScrollAnimation({ delay: 400 });
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div ref={headerSection.ref} className={`mb-16 max-w-4xl ${headerSection.animationClasses}`}>
          <h2 className={`text-xl lg:text-2xl xl:text-3xl font-weight-500 ${textClass} leading-tight mb-6 font-nohemi`} dangerouslySetInnerHTML={{ __html: title }} />

          <p className={`text-lg ${textClass} opacity-75 leading-relaxed font-aeonik`} dangerouslySetInnerHTML={{ __html: subtitle }} />
        </div>

        {/* FAQ Items */}
        <div ref={faqsSection.ref} className={`space-y-8 ${faqsSection.animationClasses}`}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Question */}
                <div className="lg:col-span-5">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 text-orange font-bold text-lg font-aeonik-mono">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className={`text-lg lg:text-xl font-normal ${textClass} leading-tight font-aeonik`} dangerouslySetInnerHTML={{ __html: faq.question }} />
                  </div>
                </div>

                {/* Answer */}
                <div className="lg:col-span-7">
                  <p className={`${textClass} opacity-75 leading-relaxed lg:text-lg font-aeonik`} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        {calloutText && calloutLink && calloutLinkText && (
          <div ref={questionsSection.ref} className={`mt-16 pt-12 border-t border-gray-200 ${questionsSection.animationClasses}`}>
            <h3 className={`text-2xl lg:text-3xl ${textClass} mb-8 font-nohemi`}>
              {calloutText}
            </h3>
            <a href={calloutLink} className="inline-block bg-peach text-white hover:bg-midnight transition-colors duration-200 font-medium px-6 py-3 rounded-lg text-base font-button">
              {calloutLinkText}
            </a>
          </div>
        ) || (<div ref={questionsSection.ref} className={`mt-16 pt-12 border-t border-gray-200 ${questionsSection.animationClasses}`}>
          <h3 className={`text-2xl lg:text-3xl ${textClass} mb-8 font-nohemi`}>
            Still have questions?
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.dumbo.health/faqs"
              className="inline-block bg-peach text-white hover:bg-midnight transition-colors duration-200 font-medium px-6 py-3 rounded-lg text-base font-button"
            >
              VISIT FAQs
            </a>
            <a
              href="https://www.dumbo.health/contact"
              className={`inline-block border border-peach ${textClass} hover:border-midnight transition-colors duration-200 font-medium px-6 py-3 rounded-lg text-base font-button`}
            >
              CONTACT US
            </a>
          </div>
        </div>)}
      </div>
    </section>
  );
}
