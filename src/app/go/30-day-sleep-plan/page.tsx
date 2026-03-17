import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import {
  getSleepPlanConfig,
  getSleepPlanOrderedKeys,
} from "@/lib/go/sleep-plan";

export const metadata = createMetadata({
  title: "30-Day Sleep Improvement Plan",
  description:
    "Build better sleep in 30 days with Dumbo Health's guided sleep improvement plan.",
  path: "/go/30-day-sleep-plan",
});

function getDayLabel(slug: string) {
  if (slug === "intro") return "Intro";
  if (slug === "conclusion") return "Conclusion";
  return slug.replace("day-", "Day ");
}

export default function SleepPlanIndexPage() {
  const config = getSleepPlanConfig();
  const keys = getSleepPlanOrderedKeys();

  if (!keys.length) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              30-Day Sleep Plan
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              A guided month of better sleep habits.
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Move through one practical sleep action at a time. The plan covers
              foundations, sleep-bed connection, calming the mind, and keeping progress
              going after the first month.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Week 1: Foundation",
              "Week 2: Bed-sleep connection",
              "Week 3: Calm your mind",
              "Week 4: Long-term success",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-sunlight bg-daylight p-5">
                <p className="font-heading text-2xl text-midnight">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {keys.map((slug) => {
              const entry = config[slug];
              const label = getDayLabel(slug);
              return (
                <Link
                  key={slug}
                  href={`/go/30-day-sleep-plan/${slug}`}
                  className="group block overflow-hidden rounded-3xl border border-sunlight bg-daylight transition-colors hover:bg-white"
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-sunlight/30">
                    {entry.thumbnail ? (
                      <Image
                        src={entry.thumbnail}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-xs uppercase tracking-wider text-midnight/40">
                          {label}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 rounded bg-midnight/90 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white">
                      {label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading text-2xl text-midnight group-hover:text-peach transition-colors">
                      {entry.title}
                    </h2>
                    <p className="mt-3 font-body text-sm leading-6 text-midnight/68">
                      {entry.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <Button asChild className="rounded-lg font-mono tracking-wider">
              <Link href="/go/30-day-sleep-plan/intro">Start With Intro</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
