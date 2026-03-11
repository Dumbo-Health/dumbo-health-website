"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanCard } from "./plan-card";
import { cpapPlans } from "@/content/plans";

export function PlanTabs() {
  return (
    <section id="plans" style={{ backgroundColor: "#FCF6ED" }} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-[5%]">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-4">
            The plans
          </p>
          <h2
            className="font-heading font-medium text-midnight"
            style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          >
            Choose what fits your life.
          </h2>
          <p
            className="mx-auto mt-4 font-body leading-relaxed"
            style={{
              fontSize: "1.125rem",
              color: "rgba(3,31,61,0.6)",
              maxWidth: "52ch",
            }}
          >
            All plans include your CPAP machine, free shipping, and Smart
            Support. No upfront costs, no hidden fees, cancel anytime.
          </p>
        </div>

        {/* CPAP / Mouthguard toggle */}
        <Tabs defaultValue="cpap" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-14 rounded-full bg-sunlight p-1 h-11">
            <TabsTrigger
              value="cpap"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              CPAP
            </TabsTrigger>
            <TabsTrigger
              value="mouthguard"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              Mouthguard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cpap">
            <div className="grid gap-5 md:gap-6 md:grid-cols-3 items-start max-w-5xl mx-auto">
              {cpapPlans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mouthguard">
            <div
              className="rounded-2xl py-16 px-8 text-center max-w-xl mx-auto"
              style={{
                backgroundColor: "#F5E6D1",
                border: "1px solid rgba(3,31,61,0.07)",
              }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-widest mb-3"
                style={{ color: "#78BFBC" }}
              >
                Coming soon
              </p>
              <h3
                className="font-heading font-medium text-midnight"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)" }}
              >
                Mouthguard plans are on their way.
              </h3>
              <p
                className="mt-3 font-body leading-relaxed"
                style={{ color: "rgba(3,31,61,0.6)", fontSize: "1rem" }}
              >
                We&apos;re working on bringing you the best oral appliance plans.
                Join the waitlist and we&apos;ll let you know first.
              </p>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
