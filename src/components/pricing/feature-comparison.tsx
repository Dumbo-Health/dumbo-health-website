"use client";

import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featureComparison } from "@/content/plans";

function FeatureValue({ value }: { value: string }) {
  if (value === "Included" || value === "Included (free)" || value === "No usage minimums") {
    return <Check className="h-5 w-5 mx-auto" style={{ color: "#78BFBC" }} />;
  }
  if (value === "Not included" || value === "Not required") {
    return <X className="h-5 w-5 mx-auto" style={{ color: "rgba(3,31,61,0.18)" }} />;
  }
  return (
    <span className="font-body text-sm leading-snug" style={{ color: "rgba(3,31,61,0.65)" }}>
      {value}
    </span>
  );
}

const COL = "grid-cols-[180px_1fr_1fr_1fr]";

export function FeatureComparison() {
  const [expanded, setExpanded] = useState(false);
  const visibleFeatures = expanded
    ? featureComparison
    : featureComparison.slice(0, 6);

  return (
    <section id="compare" className="py-16 sm:py-24" style={{ backgroundColor: "#FCF6ED" }}>
      <div className="mx-auto max-w-5xl px-[5%]">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-heading font-medium text-midnight mb-4"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Compare features
          </h2>
          <p
            className="font-body mx-auto leading-relaxed"
            style={{ fontSize: "1.125rem", color: "rgba(3,31,61,0.65)", maxWidth: "52ch" }}
          >
            Whether you&apos;re starting CPAP for the first time or continuing
            treatment, our plans give you the right equipment, support, and care
            at every stage.
          </p>
        </div>

        {/* Swipe hint — mobile only */}
        <p className="sm:hidden font-mono text-[11px] uppercase tracking-widest text-center mb-3" style={{ color: "rgba(3,31,61,0.35)" }}>
          ← Swipe to compare →
        </p>

        {/* Table — scrollable on mobile */}
        <div
          className="rounded-2xl overflow-x-auto"
          style={{ border: "1px solid rgba(245,230,209,1)" }}
        >
        <div style={{ minWidth: "560px" }}>
          {/* Column headers */}
          <div className={`grid ${COL} bg-white`} style={{ borderBottom: "1px solid rgba(245,230,209,1)" }}>
            <div className="py-4 px-5">
              <span className="font-body font-bold text-sm text-midnight">Feature</span>
            </div>
            <div className="py-4 px-3 text-center" style={{ borderLeft: "1px solid rgba(245,230,209,1)" }}>
              <span className="font-body font-bold text-sm text-midnight">Essentials</span>
            </div>
            <div
              className="py-4 px-3 text-center"
              style={{
                borderLeft: "1px solid rgba(245,230,209,1)",
                backgroundColor: "rgba(120,191,188,0.06)",
                borderTop: "3px solid #78BFBC",
              }}
            >
              <span className="font-body font-bold text-sm text-midnight block">Premium</span>
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#78BFBC" }}>
                Popular
              </span>
            </div>
            <div className="py-4 px-3 text-center" style={{ borderLeft: "1px solid rgba(245,230,209,1)" }}>
              <span className="font-body font-bold text-sm text-midnight">Elite</span>
            </div>
          </div>

          {/* Rows */}
          {visibleFeatures.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid ${COL}`}
              style={{
                borderBottom: i < visibleFeatures.length - 1 ? "1px solid rgba(245,230,209,0.8)" : undefined,
                backgroundColor: i % 2 === 0 ? "#FFFFFF" : "rgba(252,246,237,0.5)",
              }}
            >
              {/* Feature name */}
              <div className="py-4 px-5 flex flex-col justify-center">
                <span className="font-body text-sm font-medium text-midnight leading-snug">
                  {feature.name}
                </span>
                {feature.note && (
                  <p className="font-body text-xs mt-1 leading-relaxed" style={{ color: "rgba(3,31,61,0.38)" }}>
                    {feature.note}
                  </p>
                )}
              </div>

              {/* Essentials */}
              <div
                className="py-4 px-3 flex items-center justify-center text-center"
                style={{ borderLeft: "1px solid rgba(245,230,209,1)" }}
              >
                <FeatureValue value={feature.essentials} />
              </div>

              {/* Premium */}
              <div
                className="py-4 px-3 flex items-center justify-center text-center"
                style={{
                  borderLeft: "1px solid rgba(245,230,209,1)",
                  backgroundColor: "rgba(120,191,188,0.06)",
                }}
              >
                <FeatureValue value={feature.premium} />
              </div>

              {/* Elite */}
              <div
                className="py-4 px-3 flex items-center justify-center text-center"
                style={{ borderLeft: "1px solid rgba(245,230,209,1)" }}
              >
                <FeatureValue value={feature.elite} />
              </div>
            </div>
          ))}
        </div>{/* end min-width wrapper */}
        </div>{/* end overflow-x-auto */}

        {/* Footer note */}
        <p
          className="font-body text-sm mt-4 text-center"
          style={{ color: "rgba(3,31,61,0.45)" }}
        >
          All plans include free shipping and a setup call with a specialist.
        </p>

        {/* Toggle button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="rounded-[12px] px-8 py-5 font-body font-bold border-2 border-midnight/15 text-midnight hover:bg-midnight hover:text-white transition-all"
          >
            {expanded ? (
              <>
                Show fewer features
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Compare all features
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

      </div>
    </section>
  );
}
