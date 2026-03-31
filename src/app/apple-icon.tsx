import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          alignItems: "center",
          justifyContent: "center",
          background: "#FCF6ED",
          borderRadius: 40,
        }}
      >
        {/* Peach circle as stand-in for the isotype */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "#FF8361",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Nohemi",
              fontSize: 64,
              fontWeight: 400,
              color: "#FCF6ED",
            }}
          >
            D
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Nohemi", data: font, weight: 400 }],
    }
  );
}
