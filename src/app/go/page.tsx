import Link from "next/link";
import { ArrowRight, BookOpen, Download, MapPin, MoonStar, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";

const featuredRoutes = [
  {
    title: "Sleep Tools",
    description:
      "Explore calculators, trackers, and guided resources designed to support better sleep.",
    href: "/go/tools",
    icon: Wrench,
  },
  {
    title: "Sleep Hub",
    description:
      "See the guided 30-day sleep improvement experience and its connected research and tracking workflows.",
    href: "/go/sleep-hub",
    icon: MoonStar,
  },
  {
    title: "Sleep Mate",
    description:
      "Track habits, set reminders, and build a more consistent nightly routine with Sleep Mate.",
    href: "/go/tools/sleep-mate",
    icon: BookOpen,
  },
  {
    title: "Free CPAP Guide",
    description:
      "Read a practical CPAP guide covering comfort, setup, and long-term treatment success.",
    href: "/go/ebook/free-cpap-guide",
    icon: Download,
  },
  {
    title: "At-Home Sleep Test",
    description:
      "Find FDA-approved at-home sleep apnea testing available in your city across Florida and Texas.",
    href: "/go/at-home-sleep-test",
    icon: MapPin,
  },
] as const;

export const metadata = createMetadata({
  title: "Sleep Hub And Tools",
  description:
    "Explore Dumbo Health sleep tools, guided resources, and practical support for better rest.",
  path: "/go",
});

export default function GoHomePage() {
  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Dumbo Health
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Sleep tools and guided resources for better nights and brighter days.
            </h1>
            <p className="mt-5 max-w-2xl font-body text-lg leading-8 text-midnight/72">
              Explore practical tools, expert-backed education, and simple next steps to
              help you understand your sleep, build healthier routines, and get support
              when you need it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-lg font-mono tracking-wider">
                <Link href="/go/tools">Browse Tools</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-midnight/15 bg-white/60 font-mono tracking-wider text-midnight"
              >
                <Link href="/go/sleep-hub">Open Sleep Hub</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredRoutes.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-3xl border border-sunlight bg-daylight p-6 transition-all duration-200 hover:-translate-y-1 hover:border-peach/40 hover:shadow-lg hover:shadow-midnight/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach/12 text-peach">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-heading text-2xl text-midnight">{title}</h2>
                <p className="mt-3 font-body leading-7 text-midnight/72">{description}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-peach">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
