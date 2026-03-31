import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const alt = "Dumbo Health — Better sleep is closer than you think";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = readFileSync(
    path.join(process.cwd(), "public/fonts/nohemi/Nohemi-Regular.otf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #FCF6ED 0%, #F5E6D1 50%, #FFD6AD 100%)",
          padding: "80px",
        }}
      >
        {/* Brand mark row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 44,
          }}
        >
          <svg
            viewBox="92 68 146 169"
            width={44}
            height={44}
            style={{ display: "block" }}
          >
            <path
              d="M149.66 76C172.65 76 193.38 83.6203 208.02 97.4502V97.46C222.669 111.29 230.73 130.86 230.73 152.55C230.73 174.24 222.66 193.8 208.02 207.64C193.38 221.47 172.65 229.09 149.66 229.09H100V76H149.66ZM123.67 97.29V207.79H152.03C167.52 207.79 181.55 202.27 191.54 192.25C201.55 182.21 207.06 168.1 207.06 152.54C207.06 136.98 201.55 122.88 191.54 112.84C181.54 102.81 167.51 97.2901 152.03 97.29H123.67ZM152.02 119.34C161.6 119.34 170.09 122.56 175.92 128.41C181.78 134.28 185.01 142.85 185.01 152.54C185.01 162.23 181.78 170.81 175.92 176.68C170.09 182.53 161.61 185.74 152.02 185.74H151.8C149.72 185.74 147.68 185.55 145.71 185.18C144.35 184.93 143.01 184.59 141.72 184.18C153.45 178.49 161.53 166.46 161.53 152.54C161.53 138.62 153.449 126.6 141.729 120.9C143.029 120.49 144.35 120.15 145.71 119.9C147.68 119.53 149.72 119.34 151.8 119.34H152.02Z"
              fill="#FF8361"
            />
          </svg>
          <span
            style={{
              fontFamily: "Nohemi",
              fontSize: 32,
              fontWeight: 400,
              color: "#031F3D",
              letterSpacing: "-0.4px",
            }}
          >
            Dumbo Health
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: "Nohemi",
            fontSize: 68,
            fontWeight: 400,
            color: "#031F3D",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 880,
            marginBottom: 28,
          }}
        >
          Better sleep is closer than you think.
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            fontFamily: "Nohemi",
            fontSize: 26,
            fontWeight: 400,
            color: "rgba(3,31,61,0.5)",
            textAlign: "center",
          }}
        >
          Breathe easy. Live fully.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nohemi", data: font, weight: 400 }],
    }
  );
}
