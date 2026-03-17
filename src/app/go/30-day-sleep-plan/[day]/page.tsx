import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getSleepPlanEntry,
  getSleepPlanOrderedKeys,
  readSleepPlanContent,
} from "@/lib/go/sleep-plan";
import { SITE_URL } from "@/lib/constants";

type PageProps = {
  params: Promise<{
    day: string;
  }>;
};

export function generateStaticParams() {
  return getSleepPlanOrderedKeys().map((day) => ({ day }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const entry = getSleepPlanEntry(resolved.day);

  if (!entry) {
    return {
      title: "30-Day Sleep Plan | Dumbo Health",
    };
  }

  const title = `${entry.title} | 30-Day Sleep Plan | Dumbo Health`;
  const description = entry.description;
  const canonicalPath = `/go/30-day-sleep-plan/${resolved.day}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SleepPlanDayPage({ params }: PageProps) {
  const resolved = await params;
  const entry = getSleepPlanEntry(resolved.day);

  if (!entry) {
    notFound();
  }

  const content = readSleepPlanContent(entry.content);
  const keys = getSleepPlanOrderedKeys();
  const currentIndex = keys.indexOf(resolved.day);
  const prevSlug = currentIndex > 0 ? keys[currentIndex - 1] : null;
  const nextSlug =
    currentIndex >= 0 && currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;

  return (
    <main>
      <section className="border-b border-sunlight bg-daylight">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-midnight/60">
              <li>
                <Link href="/go/30-day-sleep-plan" className="hover:text-midnight">
                  30-Day Sleep Plan
                </Link>
              </li>
              <li>/</li>
              <li className="text-midnight">{entry.title}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl leading-tight text-midnight sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 font-body text-lg leading-8 text-midnight/72">
            {entry.description}
          </p>
          {entry.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-lg bg-white/10">
              <Image
                src={entry.thumbnail}
                alt=""
                width={720}
                height={405}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10">
          <div
            className="font-body text-lg leading-8 text-midnight/80 [&_h1]:font-heading [&_h1]:text-4xl [&_h1]:text-midnight [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:text-midnight [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:text-midnight [&_p]:mt-4 [&_img]:mt-6 [&_img]:rounded-3xl [&_img]:border [&_img]:border-sunlight [&_img]:bg-daylight [&_img]:p-2 [&_img]:max-w-full [&_img]:h-auto [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-sunlight pt-8">
            {prevSlug ? (
              <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
                <Link href={`/go/30-day-sleep-plan/${prevSlug}`}>Previous</Link>
              </Button>
            ) : (
              <span />
            )}

            <Button asChild variant="outline" className="rounded-lg font-mono tracking-wider">
              <Link href="/go/30-day-sleep-plan">All Days</Link>
            </Button>

            {nextSlug ? (
              <Button asChild className="rounded-lg font-mono tracking-wider">
                <Link href={`/go/30-day-sleep-plan/${nextSlug}`}>Next</Link>
              </Button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
