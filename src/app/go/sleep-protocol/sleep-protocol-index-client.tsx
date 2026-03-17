"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AudioPlayer } from "@/components/AudioPlayer";
import type {
  SleepProtocolEntry,
  SleepProtocolTips,
  SleepProtocolVersions,
} from "@/lib/go/sleep-protocol";

type Props = {
  protocols: SleepProtocolEntry[];
  versions: SleepProtocolVersions;
  tips: SleepProtocolTips;
};

const CATEGORY_ICONS: Record<string, string> = {
  sleep: "🛌",
  exercise: "🏃",
  diet: "🍎",
  equipments: "💻",
  schedule: "⏰",
  environment: "🏠",
  journal: "📓",
  allergies: "🥜",
  children: "👶",
  sleep_apnea: "😴",
  positioning: "🛏️",
  weight_management: "⚖️",
  weight_loss: "🥗",
  cpap: "💨",
  supportive: "🛠️",
  circadian: "☀️",
  temperature: "🌡️",
  neurochemical: "🧠",
  chronotype: "🕐",
  cognitive: "💭",
  digital: "📱",
  measurement: "📊",
  pharmacology: "💊",
  recovery: "💪",
  aging: "👴",
  governance: "📋",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SleepProtocolIndexClient({
  protocols,
  versions,
  tips,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    Object.keys(tips)[0] ?? ""
  );
  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    activeCategory ? Object.keys(tips[activeCategory] ?? {})[0] ?? "" : ""
  );
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const itemsPerPage = 5;

  const categories = Object.keys(tips);
  const subcategories = activeCategory ? Object.keys(tips[activeCategory] ?? {}) : [];
  const currentTips = activeCategory && activeSubcategory
    ? tips[activeCategory]?.[activeSubcategory] ?? []
    : [];

  const paginatedProtocols = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return protocols.slice(start, start + itemsPerPage);
  }, [currentPage, protocols]);

  const totalPages = Math.ceil(protocols.length / itemsPerPage);
  const recentVersions = Object.entries(versions).slice(0, 8);

  const activeTip = currentTips[activeTipIndex];

  return (
    <main className="min-h-screen bg-daylight">
      <section className="bg-midnight py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:gap-12">
          <div className="max-w-4xl flex-1">
            <h1 className="text-4xl font-heading text-white md:text-5xl lg:text-6xl">
              Sleep Protocol <small className="text-lg font-body text-white/80">by Dumbo Health</small>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-white/90">
              Your sleep research library, weekly sleep science digest, and practical guidebook for building healthier nights.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Explore expert-backed ideas, clear actionables, and sleep education designed to make better rest feel more approachable.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => document.getElementById("guidebook")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-midnight transition-colors duration-200 hover:bg-white/90"
              >
                Explore Guidebook
              </button>
              <button
                onClick={() => document.getElementById("weekly-digest")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/20"
              >
                View Weekly Digest
              </button>
            </div>
          </div>
          <div className="w-full flex-shrink-0 lg:max-w-md">
            <Image
              src="/go/old_man.png"
              alt="Older adult resting comfortably in bed"
              width={900}
              height={900}
              className="h-auto w-full rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      <section id="guidebook" className="bg-daylight px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading text-midnight md:text-4xl">Sleep Guidebook</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-midnight/75">
              Navigate evidence-backed tips and strategies for building healthier sleep habits.
            </p>
          </div>

          <div className="mb-8">
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    const firstSubcategory = Object.keys(tips[category] ?? {})[0] ?? "";
                    setActiveSubcategory(firstSubcategory);
                    setActiveTipIndex(0);
                  }}
                  className={`rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-peach text-white shadow-lg"
                      : "border-2 border-gray-200 bg-white text-midnight hover:border-peach/50"
                  }`}
                >
                  {CATEGORY_ICONS[category] || "📋"}{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, " ")}
                </button>
              ))}
            </div>

            {subcategories.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2">
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => {
                      setActiveSubcategory(subcategory);
                      setActiveTipIndex(0);
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      activeSubcategory === subcategory
                        ? "border-2 border-peach bg-peach/20 text-peach"
                        : "border border-gray-200 bg-white text-midnight hover:border-peach/30"
                    }`}
                  >
                    {CATEGORY_ICONS[subcategory] || ""}{" "}
                    {subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {activeTip ? (
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="hidden w-1/5 flex-shrink-0 md:block">
                <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-[#031F3D]">
                      Tips
                    </h3>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {currentTips.map((tip, index) => (
                      <button
                        key={`${tip.title}-${index}`}
                        onClick={() => setActiveTipIndex(index)}
                        className={`w-full border-b border-gray-100 px-4 py-3 text-left text-sm transition-all duration-200 last:border-b-0 ${
                          activeTipIndex === index
                            ? "border-l-4 border-l-peach bg-peach/10 font-medium text-[#A84C35]"
                            : "border-l-4 border-l-transparent text-[#3F556F] hover:bg-gray-50 hover:text-[#031F3D]"
                        }`}
                      >
                        {tip.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full flex-1 md:w-4/5">
                <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <div className="border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4">
                    <h3 className="text-2xl font-heading text-[#031F3D]">{activeTip.title}</h3>
                  </div>
                  <div className={`flex flex-col gap-6 p-6 ${activeTip.image_src ? "md:flex-row" : ""}`}>
                    {activeTip.image_src ? (
                      <div className="md:w-1/3 flex-shrink-0">
                        <div className="aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={`/go${activeTip.image_src}`}
                            alt={activeTip.title}
                            width={700}
                            height={700}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className={`${activeTip.image_src ? "md:w-2/3" : "w-full"} flex flex-col justify-center`}>
                      <div
                        className="text-lg leading-relaxed text-[#364A62]"
                        dangerouslySetInnerHTML={{ __html: activeTip.description }}
                      />
                      {activeTip.cta ? (
                        <a
                          href={activeTip.cta.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center font-medium text-[#A84C35] transition-colors duration-200 hover:text-[#031F3D]"
                        >
                          {activeTip.cta.anchor}
                          <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {recentVersions.length ? (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowVersionModal(true)}
                className="inline-flex items-center gap-2 font-medium text-midnight transition-colors duration-200 hover:text-peach"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Guidebook Update History
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section id="weekly-digest" className="bg-white px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading text-midnight md:text-4xl">
              Weekly Sleep Research Digest
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-midnight/75">
              Stay current with practical sleep research and clear takeaways you can use right away.
            </p>
          </div>

          <div className="space-y-6">
            {paginatedProtocols.map((protocol) => (
              <article
                key={protocol.slug}
                className="rounded-xl border-2 border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:border-peach/50 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-sm uppercase tracking-wide text-[#A84C35]">
                        {protocol.date ? formatDate(protocol.date) : "Sleep science"}
                      </span>
                      <span className="text-sm text-[#566A80]">
                        {protocol.digest.length} {protocol.digest.length === 1 ? "study" : "studies"}
                      </span>
                    </div>
                    <h3 className="mb-2 font-heading text-2xl text-[#031F3D]">
                      {protocol.title}
                    </h3>
                    <p className="mb-4 font-body text-[#4A5F76]">{protocol.intro}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-[#4A5F76]">
                      <span className="text-sm font-medium">Actionables:</span>
                      <span className="text-sm">
                        {protocol.actionables.length} clear action items
                      </span>
                    </div>
                    <Link
                      href={`/go/sleep-protocol/${protocol.slug}`}
                      className="inline-flex items-center font-medium text-[#A84C35] transition-colors duration-200 hover:text-[#031F3D]"
                    >
                      Read Full
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                {protocol.audio_file ? (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <AudioPlayer
                      src={`/go${protocol.audio_file}`}
                      ariaLabel={`Listen to ${protocol.title}`}
                      title="Listen"
                      size="sm"
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "border-2 border-gray-200 bg-white text-[#031F3D] hover:border-peach/50"
                }`}
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-peach text-white shadow-md"
                        : "border-2 border-gray-200 bg-white text-[#031F3D] hover:border-peach/50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "border-2 border-gray-200 bg-white text-[#031F3D] hover:border-peach/50"
                }`}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {showVersionModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowVersionModal(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3">
              <div>
                <h2 className="font-heading text-xl text-midnight">
                  Guidebook Update History
                </h2>
                <p className="mt-1 text-sm text-midnight/65">
                  Ongoing updates shaped by the latest sleep research.
                </p>
              </div>
              <button
                onClick={() => setShowVersionModal(false)}
                className="p-2 text-midnight/45 transition-colors duration-200 hover:text-midnight"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {Object.entries(versions).map(([date, version]) => (
                  <div
                    key={date}
                    className="rounded-lg border border-gray-200 bg-daylight p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-peach/10">
                        <svg className="h-5 w-5 text-peach" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-peach">
                          {formatDate(date)}
                        </p>
                        <h3 className="mt-2 font-heading text-lg text-midnight">
                          {version.title}
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {version.changes.map((change) => (
                            <li key={change} className="flex items-start gap-3 text-sm text-[#4A5F76]">
                              <span className="mt-2 h-2 w-2 rounded-full bg-peach" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowVersionModal(false)}
                className="rounded-lg bg-peach px-6 py-2 text-white transition-colors duration-200 hover:bg-peach/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
