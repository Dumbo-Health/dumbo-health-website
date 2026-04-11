import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { getSleepPlanEntry } from "@/lib/go/sleep-plan";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const entry = getSleepPlanEntry(day);

  const nohemi = await readFile(
    path.join(process.cwd(), "public/fonts/nohemi/Nohemi-Regular.otf")
  );

  // "day-1" → "Day 1"
  const dayLabel = day.replace("day-", "Day ");
  const title = entry?.title ?? "30-Day Sleep Plan";
  const description = entry?.description ?? "Your daily guide to better sleep.";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#FCF6ED",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Nohemi",
        }}
      >
        {/* Peach decorative circle — top right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "#FF8361",
            opacity: 0.15,
            display: "flex",
          }}
        />

        {/* Teal decorative circle — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            backgroundColor: "#78BFBC",
            opacity: 0.2,
            display: "flex",
          }}
        />

        {/* Program label */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#78BFBC",
            marginBottom: 20,
            display: "flex",
          }}
        >
          30-Day Sleep Plan · Dumbo Health
        </div>

        {/* Day number */}
        <div
          style={{
            fontSize: 28,
            color: "#FF8361",
            marginBottom: 16,
            display: "flex",
          }}
        >
          {dayLabel}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.1,
            color: "#031F3D",
            marginBottom: 32,
            display: "flex",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#031F3D",
            opacity: 0.55,
            maxWidth: 800,
            display: "flex",
          }}
        >
          {description.length > 120 ? description.slice(0, 120) + "…" : description}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 100,
            fontSize: 20,
            color: "#FF8361",
            letterSpacing: 1,
            display: "flex",
          }}
        >
          dumbo.health
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nohemi", data: nohemi, weight: 400 }],
    }
  );
}
