"use client";

import { useEffect, useState } from "react";

const IOS_URL = "https://apps.apple.com/vn/app/watchpat/id1473252338";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.itamarmedical.watchpat&hl=en_US";

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M3.18 23.76c.3.17.64.17.94 0l10.45-6.03-2.12-2.12-9.27 8.15zm-1.64-1.02V1.26L13.3 12 1.54 22.74zm15.6-9.04l2.26-1.3c.72-.42.72-1.46 0-1.88l-2.26-1.3-2.38 2.24 2.38 2.24zm-3.32-3.32L3.18.24c-.3-.17-.64-.17-.94 0L13.3 12l1.52-1.62z" />
  </svg>
);

function detectOS(): "ios" | "android" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "unknown";
}

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "15px 28px",
  borderRadius: 12,
  textDecoration: "none",
  transition: "opacity 0.2s, transform 0.2s",
  whiteSpace: "nowrap",
};

export default function AppDownloadButtons() {
  const [os, setOS] = useState<"ios" | "android" | "unknown">("unknown");

  useEffect(() => {
    setOS(detectOS());
  }, []);

  // On mobile, highlight the matching store; on desktop both are equal
  const iosStyle: React.CSSProperties = {
    ...btnBase,
    background: os === "android" ? "rgba(255,255,255,0.12)" : "#FF8361",
    color: "white",
    border: os === "android" ? "1.5px solid rgba(255,255,255,0.18)" : "none",
  };

  const androidStyle: React.CSSProperties = {
    ...btnBase,
    background: os === "ios" ? "rgba(255,255,255,0.12)" : "#FF8361",
    color: "white",
    border: os === "ios" ? "1.5px solid rgba(255,255,255,0.18)" : "none",
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14 }}>
      <a
        href={IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={iosStyle}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <AppleIcon />
        App Store
      </a>
      <a
        href={ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={androidStyle}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <GooglePlayIcon />
        Google Play
      </a>
    </div>
  );
}
