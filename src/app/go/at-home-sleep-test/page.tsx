import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { getAtHomeSleepTestStates } from "@/lib/go/at-home-sleep-test";

export const metadata: Metadata = createMetadata({
  title: "At-Home Sleep Test by State | Dumbo Health",
  description:
    "Order an FDA-approved at-home sleep apnea test delivered to your door. Available across Florida and Texas — get diagnosed from the comfort of your own bed.",
  path: "/go/at-home-sleep-test",
});

const cityCounts: Record<string, number> = {
  florida: 58,
  texas: 65,
};

export default async function AtHomeSleepTestHubPage() {
  const states = await getAtHomeSleepTestStates();

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-midnight/60">
              <li>
                <Link href="/go" className="hover:text-midnight">
                  Resources
                </Link>
              </li>
              <li>/</li>
              <li className="text-midnight">At-Home Sleep Test</li>
            </ol>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
            Dumbo Health
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
            At-Home Sleep Test Near You
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-8 text-midnight/72">
            Get an FDA-approved sleep apnea test shipped directly to your door. No clinic
            visit, no waiting room — just a simple test you take from the comfort of your
            own bed, with results in days.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl text-midnight">Browse by State</h2>
          <p className="mt-3 font-body text-base leading-7 text-midnight/65">
            Select your state to find at-home sleep testing options in your city.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {states.map((s) => {
              const cityCount = cityCounts[s.slug] ?? 0;
              const label = s.formatted_location || s.state;
              return (
                <Link
                  key={s.slug}
                  href={`/go/at-home-sleep-test/${s.slug}`}
                  className="group rounded-2xl border border-sunlight bg-daylight p-7 transition-all duration-200 hover:-translate-y-1 hover:border-peach/40 hover:shadow-lg hover:shadow-midnight/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-peach/12 text-peach">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl text-midnight">{label}</h3>
                  {cityCount > 0 && (
                    <p className="mt-2 font-body text-sm text-midnight/55">
                      {cityCount} cities served
                    </p>
                  )}
                  <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-peach">
                    View cities
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-sunlight bg-daylight p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">
              Don&apos;t see your state?
            </p>
            <h3 className="mt-3 font-heading text-xl text-midnight">
              We&apos;re expanding across the US.
            </h3>
            <p className="mt-3 font-body text-base leading-7 text-midnight/65">
              We currently serve Florida and Texas, with more states coming soon.
              Check back or{" "}
              <Link href="/sleep-test" className="text-peach underline underline-offset-2 hover:text-midnight">
                order your sleep test now
              </Link>{" "}
              — delivery is available nationwide.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
