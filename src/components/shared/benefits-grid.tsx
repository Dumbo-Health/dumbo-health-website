import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const benefits = [
  {
    icon: "/icons/icon-shield.png",
    heading: "Affordable, transparent pricing",
    description: "Everything you need, one simple price. All Inclusive.",
  },
  {
    icon: "/icons/icon-monitor.png",
    heading: "Best sleep specialists, anytime",
    description:
      "Skip the wait. Meet our sleep specialists on your schedule.",
  },
  {
    icon: "/icons/icon-clock.png",
    heading: "Fast diagnosis and treatment delivery",
    description: "From home test to treatment in days.",
  },
  {
    icon: "/icons/icon-overlap.png",
    heading: "All inclusive ongoing care",
    description:
      "We manage renewals and restocks based on your usage.",
  },
];

export function BenefitsGrid() {
  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            Why Dumbo Health
          </p>
          <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-[40px]">
            Built around you
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-midnight/60">
            We designed every part of your care to feel easy, personal, and
            affordable.
          </p>
        </div>

        {/* 3-column layout: 2 cards | image | 2 cards */}
        <div className="mt-14 grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          {/* Left column — cards 1 & 2 */}
          <div className="flex flex-col gap-6">
            {benefits.slice(0, 2).map((b) => (
              <div
                key={b.heading}
                className="rounded-2xl border border-sunlight bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-peach/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-peach/10">
                  <Image src={b.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="font-heading text-lg font-medium text-midnight">
                  {b.heading}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-midnight/60">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center — lifestyle image with prominent ring */}
          <div className="flex items-center justify-center py-4">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-peach/20 via-teal/10 to-light-peach/20 blur-md" />
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-peach/20" />
              {/* Image */}
              <div className="relative aspect-square w-[280px] overflow-hidden rounded-full ring-4 ring-peach/25 ring-offset-4 ring-offset-daylight md:w-[340px]">
                <Image
                  src="/images/misc/benefits-wellness.jpg"
                  alt="Person sleeping peacefully"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 340px"
                />
              </div>
              {/* "You" badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 font-heading text-base font-medium text-midnight shadow-lg shadow-peach/10 ring-1 ring-sunlight">
                  <Image
                    src="/logos/isotype-peach.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                  You
                </span>
              </div>
            </div>
          </div>

          {/* Right column — cards 3 & 4 */}
          <div className="flex flex-col gap-6">
            {benefits.slice(2, 4).map((b) => (
              <div
                key={b.heading}
                className="rounded-2xl border border-sunlight bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-peach/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                  <Image src={b.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="font-heading text-lg font-medium text-midnight">
                  {b.heading}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-midnight/60">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="h-14 rounded-lg bg-peach px-10 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-xl active:translate-y-0"
          >
            <Link href={APP_URL}>Get started with better sleep</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
