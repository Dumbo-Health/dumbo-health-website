"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProductTabs() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-sunlight p-1 rounded-xl">
            <TabsTrigger value="overview" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              At home sleep test
            </TabsTrigger>
            <TabsTrigger value="how-it-works" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              How it works
            </TabsTrigger>
            <TabsTrigger value="measures" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              What the test measures
            </TabsTrigger>
            <TabsTrigger value="who" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              Who this test is for
            </TabsTrigger>
            <TabsTrigger value="shipping" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              Shipping
            </TabsTrigger>
            <TabsTrigger value="medical" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              Medical review
            </TabsTrigger>
            <TabsTrigger value="after" className="font-body text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-midnight">
              After ordering
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 max-w-3xl">
            <TabsContent value="overview" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>
                Our at home sleep test lets you check for sleep apnea from the comfort of your own bed. It is a simple, one night test designed to measure key signals related to obstructive sleep apnea, or OSA. You wear small sensors on your finger, wrist, and chest that work together with a smartphone app to track how your body breathes and rests during sleep.
              </p>
              <p>
                After just one night, our medical team can review your results and determine whether sleep apnea may be affecting your rest. This approach is a convenient alternative to an overnight sleep lab study and works well for many people who want clear answers without the hassle of a clinic visit.
              </p>
            </TabsContent>

            <TabsContent value="how-it-works" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>
                To get started, you will complete a short health questionnaire. This information helps confirm the test is appropriate for you. If your results show signs of sleep apnea, our team will guide you through next steps and talk through treatment options that fit your life.
              </p>
              <p>The test is single use and intended for adults 18 and older.</p>
            </TabsContent>

            <TabsContent value="measures" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <ul className="space-y-2 list-none">
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Breathing patterns during sleep</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Oxygen levels and heart rate</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Snoring and body position</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Movement and sleep activity</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Chest motion related to breathing</li>
              </ul>
              <p>
                You will receive a clear summary of your results, including your AHI score, which means breathing pauses per hour. If you meet the criteria for obstructive sleep apnea, a prescription for PAP therapy may be recommended.
              </p>
            </TabsContent>

            <TabsContent value="who" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>An at home sleep test may be a good fit if you:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Snore regularly or wake up short of breath</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Feel tired despite a full night of sleep</li>
                <li className="flex items-center gap-2"><span className="text-teal">&#10003;</span> Suspect sleep apnea and want to avoid an overnight lab study</li>
              </ul>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>
                All home sleep tests ship from our warehouse in Philadelphia. We currently ship to Texas, Florida, Maryland, and Virginia.
              </p>
              <p>Once your order is approved, delivery typically takes 1 to 4 business days.</p>
              <p>All orders include expedited shipping for FREE.</p>
              <p>Additional express shipping options are available for 1 day delivery.</p>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>
                Before we ship your test, you&apos;ll complete a short medical questionnaire. Our medical team reviews this information to make sure the test is appropriate for you.
              </p>
              <p>
                If anything needs clarification or causes a delay, we reach out directly to keep you informed and supported.
              </p>
            </TabsContent>

            <TabsContent value="after" className="space-y-4 font-body text-[1.0625rem] text-midnight/80 leading-relaxed">
              <p>
                Your order will arrive in a single package that includes the WatchPAT ONE device, batteries, and a clear instructional brochure.
              </p>
              <p>
                Once your test ships, we&apos;ll notify you by email and SMS. You&apos;ll also be able to view tracking details directly in the Dumbo Health app.
              </p>
              <p>
                If you have any questions or need help, our customer support team is here for you at{" "}
                <a href="tel:+17863482820" className="text-peach hover:underline">+1 (786) 348-2820</a>.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
