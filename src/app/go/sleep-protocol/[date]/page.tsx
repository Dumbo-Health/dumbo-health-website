import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SITE_URL } from "@/lib/constants";
import {
  getSleepProtocolByEntry,
  getSleepProtocolStaticParams,
} from "@/lib/go/sleep-protocol";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

export async function generateStaticParams() {
  return getSleepProtocolStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const protocol = await getSleepProtocolByEntry(resolved.date);

  if (!protocol) {
    return {
      title: "Sleep Protocol Not Found | Dumbo Health",
    };
  }

  const canonicalPath = `/go/sleep-protocol/${protocol.slug}`;
  const title = `${protocol.meta_title || protocol.title} | Dumbo Health`;
  const description = protocol.meta_description || protocol.intro;

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

export default async function SleepProtocolDetailPage({ params }: PageProps) {
  const resolved = await params;
  const protocol = await getSleepProtocolByEntry(resolved.date);

  if (!protocol) {
    notFound();
  }

  return (
    <main>
      <section className="bg-midnight py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/go/sleep-protocol"
            className="mb-6 inline-flex items-center text-white/80 transition-colors duration-200 hover:text-white"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Sleep Protocol
          </Link>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="max-w-4xl flex-1">
              <span className="mb-4 inline-block font-mono text-sm uppercase tracking-wide text-white/80">
                {protocol.date
                  ? new Date(protocol.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Sleep science"}
              </span>
              <h1 className="mb-6 font-heading text-4xl text-white md:text-5xl lg:text-6xl">
                {protocol.title}
              </h1>
              <p className="mb-6 text-xl leading-relaxed text-white/90">
                {protocol.intro}
              </p>
              {protocol.audio_file ? (
                <div className="mb-8">
                  <AudioPlayer
                    src={protocol.audio_file}
                    ariaLabel={`Listen to ${protocol.title}`}
                    title="Listen to this digest"
                    size="lg"
                    variant="light"
                  />
                </div>
              ) : null}
            </div>
            <div className="w-full flex-shrink-0 lg:max-w-sm">
              <Image
                src="/go/old_man.png"
                alt="Older adult resting comfortably in bed"
                width={900}
                height={900}
                className="h-auto w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-daylight px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-heading text-midnight md:text-4xl">
              Research Digest
            </h2>
            <p className="mt-4 text-lg text-midnight/75">
              Latest sleep research findings and what they may mean in practice.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            {protocol.digest.map((item, index) => (
              <article key={item.title} className="rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-peach/10">
                    <span className="font-heading text-2xl text-peach">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl text-midnight">{item.title}</h3>
                    {item.target_audience?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.target_audience.map((audience) => (
                          <span
                            key={audience}
                            className="inline-flex items-center rounded-full border border-peach/20 bg-peach/10 px-3 py-1 text-sm font-medium text-peach"
                          >
                            {audience.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p className="mt-3 text-sm text-[#566A80]">{item.author}</p>
                    {item.tldr ? (
                      <div
                        className="mt-4 rounded-r-lg border-l-4 border-peach bg-peach/5 p-4 font-body leading-7 text-[#031F3D]"
                        dangerouslySetInnerHTML={{ __html: item.tldr }}
                      />
                    ) : null}
                    <div
                      className="mt-4 font-body leading-7 text-[#4A5F76]"
                      dangerouslySetInnerHTML={{ __html: item.summary }}
                    />
                    {item.why_it_matters ? (
                      <div
                        className="mt-4 font-body leading-7 text-[#4A5F76]"
                        dangerouslySetInnerHTML={{ __html: item.why_it_matters }}
                      />
                    ) : null}
                    <a
                      href={item.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center font-medium text-[#A84C35] transition-colors duration-200 hover:text-[#031F3D]"
                    >
                      {item.cta.anchor}
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-heading text-midnight md:text-4xl">
              Actionable Steps for Sleep Health
            </h2>
            <p className="mt-4 text-lg text-midnight/75">
              Clear, practical next steps inspired by this week&apos;s research.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {protocol.actionables.map((item, index) => {
              const text = typeof item === "string" ? item : item.text;
              const audiences =
                typeof item === "string" ? [] : item.target_audience ?? [];

              return (
                <article key={`${index}-${text.slice(0, 20)}`} className="rounded-2xl border-2 border-peach/20 bg-daylight p-6">
                  {audiences.length ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {audiences.map((audience) => (
                        <span
                          key={audience}
                          className="inline-flex items-center rounded-full border border-peach/20 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-peach"
                        >
                          {audience.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-peach text-white">
                      {index + 1}
                    </div>
                    <p className="font-body leading-7 text-[#4A5F76]">{text}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-sunlight pt-8">
            <Link
              href="/go/sleep-protocol"
              className="inline-flex items-center text-midnight transition-colors duration-200 hover:text-peach"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Digests
            </Link>
            <div className="text-sm text-midnight/60">
              Part of the Sleep Protocol series
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
