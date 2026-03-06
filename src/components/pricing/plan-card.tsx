import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import type { Plan } from "@/content/plans";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card
      className={`relative flex flex-col rounded-2xl transition-shadow ${
        plan.recommended
          ? "border-peach border-2 shadow-xl ring-1 ring-peach/20 md:scale-[1.03]"
          : "border-sunlight shadow-sm hover:shadow-md"
      }`}
    >
      {plan.recommended && (
        <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-peach text-white font-mono text-xs px-4 py-1 rounded-full shadow-md">
          Most Popular
        </Badge>
      )}

      <CardHeader className="text-center pt-8 pb-2">
        <p className="font-mono text-tag text-midnight/50 uppercase tracking-widest mb-3">
          {plan.name}
        </p>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-heading text-5xl md:text-6xl text-midnight font-medium">
            ${plan.price}
          </span>
          <span className="font-body text-body text-midnight/50">/mo</span>
        </div>

        {/* Original value */}
        <p className="font-body text-sm text-midnight/40 line-through mt-1">
          Valued at ${plan.valuedAt}/mo
        </p>

        {/* Annual savings */}
        <p className="font-body text-sm text-teal font-bold mt-2">
          {plan.savings}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pt-4 pb-6 px-6">
        <div className="h-px bg-sunlight mb-6" />

        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" />
              <span className="font-body text-sm text-midnight/80 leading-snug">
                {feature}
              </span>
            </li>
          ))}
          {plan.extras?.map((extra) => (
            <li key={extra} className="flex items-start gap-2.5">
              <Info className="h-4 w-4 text-midnight/30 shrink-0 mt-0.5" />
              <span className="font-body text-sm text-midnight/50 leading-snug">
                {extra}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-6 pb-8">
        <Button
          className={`w-full rounded-[12px] py-6 text-base font-body font-bold ${
            plan.recommended
              ? "bg-peach hover:bg-peach/90 text-white shadow-md"
              : "border-2 border-midnight/20 text-midnight hover:bg-midnight hover:text-white"
          }`}
          variant={plan.recommended ? "default" : "outline"}
          asChild
        >
          <a href={plan.ctaUrl}>{plan.cta}</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
