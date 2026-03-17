import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { goTools } from "@/content/go/tools";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sleep Tools",
  description:
    "Explore Dumbo Health sleep tools for schedules, sleepiness, CPAP support, sleep tracking, and practical sleep guidance.",
  path: "/go/tools",
});

export default function GoToolsPage() {
  const availableTools = goTools.filter((tool) => tool.available);

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-peach">
              Sleep Tools
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-midnight sm:text-5xl">
              Practical sleep tools for everyday sleep health.
            </h1>
            <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
              Explore simple, helpful tools for understanding your sleep, building
              healthier routines, and taking the next step with more confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl text-midnight">Explore the toolbox</h2>
              <p className="mt-2 font-body text-midnight/68">
                Choose a tool based on what you want to improve, measure, or better understand.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {availableTools.map((tool) => (
              <article
                key={tool.id}
                className="rounded-3xl border border-sunlight bg-daylight p-7 shadow-sm"
              >
                <div className="text-4xl">{tool.icon}</div>
                <div className="inline-flex rounded-full bg-peach/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-peach">
                  {tool.category}
                </div>
                <h3 className="mt-4 font-heading text-2xl text-midnight">{tool.title}</h3>
                <p className="mt-3 font-body leading-7 text-midnight/72">
                  {tool.description}
                </p>
                {tool.href ? (
                  <Button asChild className="mt-6 rounded-lg font-mono tracking-wider">
                    <Link href={tool.href}>
                      Open Tool
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
