import { notFound } from "next/navigation";
import Image from "next/image";
import { SITE_URL } from "@/lib/constants";
import { CopyButton } from "./CopyButton";

export const dynamic = "force-dynamic";

const pages = [
  {
    title: "DOT Sleep Apnea Test",
    path: "/dot-sleep-apnea-testing",
    description: "Landing page for CDL/DOT drivers requiring sleep apnea clearance.",
  },
  {
    title: "At-Home Sleep Apnea Test",
    path: "/get-your-at-home-sleep-apnea-test",
    description: "General consumer landing page for the HST product.",
  },
  {
    title: "Oral Appliance Therapy",
    path: "/oral-appliance-therapy",
    description: "Treatment page for mild to low-moderate sleep apnea patients.",
  },
];

export default function InternalPage() {
  if (process.env.NEXT_PUBLIC_SHOW_INTERNAL_NAV !== "true") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-daylight">
      {/* Top bar */}
      <div className="px-8 py-4" style={{ background: "#031F3D" }}>
        <Image
          src="/logos/dumbo-health-white.svg"
          alt="Dumbo Health"
          width={160}
          height={32}
          priority
        />
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="font-heading text-3xl font-medium" style={{ color: "#031F3D" }}>
              Internal Pages
            </h1>
            <span
              className="font-mono text-xs px-2 py-1 rounded-full font-semibold tracking-widest uppercase"
              style={{ background: "rgba(255,131,97,0.12)", color: "#FF8361" }}
            >
              Dev Only
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: "rgba(3,31,61,0.5)" }}>
            These pages are not linked publicly. This dashboard returns 404 in production.
            Add new unlisted routes to the <code className="font-mono text-xs bg-sunlight px-1 rounded">pages</code> array in{" "}
            <code className="font-mono text-xs bg-sunlight px-1 rounded">src/app/internal/page.tsx</code>.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pages.map((page) => {
            const fullUrl = SITE_URL + page.path;
            return (
              <div
                key={page.path}
                className="bg-white rounded-xl border p-6 flex flex-col gap-4"
                style={{ borderColor: "rgba(3,31,61,0.08)" }}
              >
                <div className="flex-1">
                  <h2 className="font-heading text-lg font-medium mb-1" style={{ color: "#031F3D" }}>
                    {page.title}
                  </h2>
                  <p className="font-body text-sm mb-3" style={{ color: "rgba(3,31,61,0.55)" }}>
                    {page.description}
                  </p>
                  <p
                    className="font-mono text-xs break-all px-2 py-1.5 rounded-lg"
                    style={{ background: "#F5E6D1", color: "rgba(3,31,61,0.6)" }}
                  >
                    {fullUrl}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                    style={{ background: "#FF8361", color: "#fff" }}
                  >
                    Open →
                  </a>
                  <CopyButton url={fullUrl} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
