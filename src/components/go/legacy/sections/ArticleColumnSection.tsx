"use client";

import Link from 'next/link';
import { SHOPIFY } from "@/lib/constants";

interface Step {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  price?: string;
}

interface ArticleColumnProps {
  headline?: string;
  title: string;
  subtitle: string;
  steps: Step[];
  ctaText?: string;
  ctaLink?: string;
  shopifyCheckout?: boolean;
}

const STEP_COLORS = ["#FF8361", "#78BFBC", "#031F3D", "#FF8361", "#78BFBC"];

export default function ArticleColumn({
  headline,
  title,
  subtitle,
  steps,
  ctaText,
  ctaLink,
  shopifyCheckout = false,
}: ArticleColumnProps) {
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#FCF6ED" }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          {headline && (
            <div
              className="font-mono text-xs uppercase tracking-[0.28em]"
              style={{ color: "#78BFBC" }}
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          )}

          <h2
            className="font-heading font-medium text-midnight text-xl lg:text-2xl xl:text-3xl leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p
            className="font-body text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "rgba(3,31,61,0.72)" }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>

        {/* Steps Grid */}
        <div
          className="grid grid-cols-1 gap-8 mb-12"
          style={{ gridTemplateColumns: `repeat(${Math.min(steps.length, steps.length === 4 ? 4 : 3)}, minmax(0, 1fr))` }}
        >
          {steps.map((step, index) => {
            const resolvedSrc = step.imageSrc
              ? step.imageSrc.startsWith("http")
                ? step.imageSrc
                : "/go" + step.imageSrc
              : null;

            return (
              <div key={index} className="relative">
                <div className="h-full">
                  {/* Image */}
                  {resolvedSrc && (
                    <div className="mb-6 relative">
                      <div
                        className="rounded-xl p-4 aspect-[4/3] flex items-center justify-center overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #F5E6D1 0%, #FCF6ED 100%)" }}
                      >
                        <img
                          src={resolvedSrc}
                          alt={step.imageAlt}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step Number */}
                  <div
                    className="ml-4 flex items-center justify-center w-14 h-14 rounded-lg font-mono font-bold text-lg mb-6"
                    style={{
                      backgroundColor: STEP_COLORS[index % STEP_COLORS.length],
                      color: "#fff",
                    }}
                  >
                    {step.number || String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="space-y-4 p-4">
                    <h3
                      className="font-heading text-xl font-medium text-midnight leading-tight"
                      dangerouslySetInnerHTML={{ __html: step.title }}
                    />

                    <p
                      className="font-body leading-relaxed"
                      style={{ color: "rgba(3,31,61,0.72)" }}
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />

                    {step.price && (
                      <div
                        className="font-body text-sm font-medium text-midnight"
                        dangerouslySetInnerHTML={{ __html: step.price }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        {ctaText && (ctaLink || shopifyCheckout) && (
          <div className="text-center">
            {shopifyCheckout ? (
              <a
                href={SHOPIFY.buyUrl}
                data-shopify-checkout="sleep-test"
                className="inline-block font-body font-bold text-white text-sm uppercase tracking-wider px-8 py-3 rounded-[12px] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 20px rgba(255,131,97,0.3)",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: ctaText }} />
              </a>
            ) : (
              <Link
                href={ctaLink || "#"}
                className="inline-block font-body font-bold text-white text-sm uppercase tracking-wider px-8 py-3 rounded-[12px] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#FF8361",
                  boxShadow: "0 4px 20px rgba(255,131,97,0.3)",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: ctaText }} />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
