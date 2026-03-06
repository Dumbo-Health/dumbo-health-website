"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanCard } from "./plan-card";
import { cpapPlans } from "@/content/plans";

export function PlanTabs() {
  return (
    <section className="bg-sunlight py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-h2 text-midnight mb-4">
            Choose a plan that supports your sleep
          </h2>
          <p className="font-body text-body-lg text-midnight/70 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;ve just taken your sleep test or already have a
            prescription, our plans are built to meet you where you are. All
            plans come with expert support, device tips, and regular upkeep so
            your therapy works better, longer.
          </p>
        </div>

        {/* Toggle */}
        <Tabs defaultValue="cpap" className="w-full">
          <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 mb-14 rounded-full bg-daylight p-1 h-12">
            <TabsTrigger
              value="cpap"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              CPAP Treatment
            </TabsTrigger>
            <TabsTrigger
              value="mouthguard"
              className="font-body text-sm font-bold rounded-full data-[state=active]:bg-midnight data-[state=active]:text-white transition-all"
            >
              Mouthguard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cpap">
            <div className="text-center mb-10">
              <h3 className="font-heading text-xl md:text-h3 text-midnight mb-2">
                Find the CPAP plan that fits your therapy
              </h3>
              <p className="font-body text-body text-midnight/60">
                Starting CPAP? Our plans provide the right equipment, support,
                and follow-up care.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3 items-start max-w-5xl mx-auto">
              {cpapPlans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mouthguard">
            <div className="text-center py-16">
              <h3 className="font-heading text-xl md:text-h3 text-midnight mb-4">
                Mouthguard Plans Coming Soon
              </h3>
              <p className="font-body text-body text-midnight/70 max-w-lg mx-auto">
                We&apos;re working on bringing you the best oral appliance
                plans. Stay tuned!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
