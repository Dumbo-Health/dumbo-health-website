import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import type { Plan } from "@/content/plans";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const isPopular = plan.recommended;

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        isPopular
          ? "shadow-xl shadow-midnight/12 -translate-y-1"
          : "shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
      style={{
        backgroundColor: "#FFFFFF",
        border: isPopular
          ? "1.5px solid rgba(120,191,188,0.35)"
          : "1px solid rgba(245,230,209,1)",
        borderTop: isPopular ? "4px solid #78BFBC" : undefined,
      }}
    >
      {/* Card header */}
      <div className="px-7 pt-8 pb-6">
        {/* Plan name + popular badge */}
        <div className="flex items-center gap-2.5 mb-5">
          <h3
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.5rem)" }}
          >
            {plan.name}
          </h3>
          {isPopular && (
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(120,191,188,0.15)",
                color: "#78BFBC",
              }}
            >
              Most popular
            </span>
          )}
        </div>

        {/* Price — the main event */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-heading font-medium text-midnight leading-none"
            style={{ fontSize: "clamp(2.8rem, 4vw, 3.4rem)" }}
          >
            ${plan.price}
          </span>
          <span
            className="font-body text-base"
            style={{ color: "rgba(3,31,61,0.4)" }}
          >
            /mo
          </span>
        </div>

        {/* Savings — small, accessory */}
        <p
          className="mt-2 font-mono text-[11px] uppercase tracking-widest"
          style={{ color: "#78BFBC" }}
        >
          {plan.savings}
        </p>

        {/* Human summary */}
        <p
          className="mt-3 font-body leading-snug"
          style={{
            fontSize: "0.9375rem",
            color: "rgba(3,31,61,0.5)",
            fontStyle: "italic",
          }}
        >
          {plan.summary}
        </p>
      </div>

      {/* Divider */}
      <div
        className="mx-7"
        style={{
          height: "1px",
          backgroundColor: isPopular
            ? "rgba(120,191,188,0.2)"
            : "rgba(245,230,209,1)",
        }}
      />

      {/* Features */}
      <div className="flex-1 px-7 py-6">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "#78BFBC" }}
              />
              <span
                className="font-body leading-snug"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(3,31,61,0.75)",
                }}
              >
                {feature}
              </span>
            </li>
          ))}
          {plan.extras?.map((extra) => (
            <li key={extra} className="flex items-start gap-3">
              <Plus
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "rgba(3,31,61,0.2)" }}
              />
              <span
                className="font-body leading-snug"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(3,31,61,0.4)",
                }}
              >
                {extra}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-7 pb-7">
        <Button
          className={`w-full h-12 rounded-[12px] font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
            isPopular
              ? "bg-midnight text-white hover:bg-midnight/85"
              : "bg-transparent text-midnight hover:bg-midnight hover:text-white"
          }`}
          style={
            isPopular
              ? { boxShadow: "0 4px 20px rgba(3,31,61,0.18)" }
              : { border: "2px solid rgba(3,31,61,0.2)" }
          }
          asChild
        >
          <a href={plan.ctaUrl}>{plan.cta}</a>
        </Button>
      </div>
    </div>
  );
}
