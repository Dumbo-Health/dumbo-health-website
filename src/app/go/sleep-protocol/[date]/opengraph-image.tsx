import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";
import { getSleepProtocolByEntry } from "@/lib/go/sleep-protocol";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const protocol = await getSleepProtocolByEntry(date);

  const nohemi = await readFile(
    path.join(process.cwd(), "public/fonts/nohemi/Nohemi-Regular.otf")
  );

  const title = protocol?.meta_title ?? protocol?.title ?? "Sleep Protocol";
  const intro = protocol?.meta_description ?? protocol?.intro ?? "Weekly sleep science digest from Dumbo Health.";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#031F3D",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Nohemi",
        }}
      >
        {/* Teal decorative circle — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 440,
            height: 440,
            borderRadius: "50%",
            backgroundColor: "#78BFBC",
            opacity: 0.15,
            display: "flex",
          }}
        />

        {/* Peach decorative circle — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            backgroundColor: "#FF8361",
            opacity: 0.15,
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
            marginBottom: 32,
            display: "flex",
          }}
        >
          Sleep Protocol · Dumbo Health
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 60,
            lineHeight: 1.15,
            color: "#FCF6ED",
            marginBottom: 32,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {title.length > 80 ? title.slice(0, 80) + "…" : title}
        </div>

        {/* Intro */}
        <div
          style={{
            fontSize: 24,
            color: "#FCF6ED",
            opacity: 0.55,
            maxWidth: 820,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {intro.length > 130 ? intro.slice(0, 130) + "…" : intro}
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
