"use client";

import Image from "next/image";
import { useState } from "react";

export interface EbookHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  bulletPoints: string[];
  coverSrc: string;
  coverAlt: string;
}

const STARS = [
  { top: "4%", left: "8%", size: 5 },
  { top: "8%", left: "42%", size: 3 },
  { top: "3%", left: "68%", size: 4 },
  { top: "6%", left: "88%", size: 5 },
  { top: "14%", left: "22%", size: 3 },
  { top: "18%", left: "55%", size: 6 },
  { top: "12%", left: "78%", size: 4 },
  { top: "22%", left: "5%", size: 3 },
  { top: "28%", left: "35%", size: 5 },
  { top: "25%", left: "92%", size: 4 },
  { top: "35%", left: "15%", size: 6 },
  { top: "38%", left: "72%", size: 3 },
  { top: "42%", left: "48%", size: 4 },
  { top: "48%", left: "88%", size: 5 },
  { top: "52%", left: "28%", size: 3 },
  { top: "55%", left: "62%", size: 6 },
  { top: "60%", left: "8%", size: 4 },
  { top: "65%", left: "45%", size: 3 },
  { top: "68%", left: "82%", size: 5 },
  { top: "72%", left: "18%", size: 4 },
  { top: "78%", left: "58%", size: 3 },
  { top: "82%", left: "92%", size: 6 },
  { top: "85%", left: "32%", size: 4 },
  { top: "90%", left: "72%", size: 5 },
  { top: "94%", left: "12%", size: 3 },
  { top: "96%", left: "50%", size: 4 },
  { top: "10%", left: "95%", size: 5 },
  { top: "44%", left: "2%", size: 4 },
  { top: "70%", left: "36%", size: 3 },
  { top: "88%", left: "54%", size: 5 },
];

export default function EbookHero({
  eyebrow,
  title,
  description,
  ctaText,
  bulletPoints,
  coverSrc,
  coverAlt,
}: EbookHeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/go/api/funnel/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
          metadata: { ebook: "CPAP Guide", page: "ebook/free-cpap-guide" },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setSubmitted(true);
    const link = document.createElement("a");
    link.href = "/go/ebook/CPAP%20GUIDE%20FINAL.pdf";
    link.download = "Dumbo-Health-CPAP-Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#031F3D" }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-10 px-8 sm:px-14 lg:px-20">
        <Image
          src="/go/Dumbo-Logo-Health-White.svg"
          alt="Dumbo Health"
          width={220}
          height={28}
          priority
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-8 sm:px-14 lg:px-20 py-14 lg:py-20">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <span
                className="font-nohemi block text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "#FCF6ED" }}
              >
                {eyebrow}
              </span>
              <span
                className="font-nohemi block text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mt-1"
                style={{ color: "#FCF6ED" }}
              >
                {title}
              </span>
            </div>

            <p
              className="text-sm sm:text-base leading-relaxed max-w-md"
              style={{ color: "rgba(252,246,237,0.75)", fontFamily: "var(--font-aeonik)" }}
            >
              {description}
            </p>

            <div>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setSubmitted(false);
                  setEmail("");
                  setError("");
                }}
                className="inline-block border text-sm font-medium tracking-widest uppercase px-7 py-3 rounded transition-colors duration-200 cursor-pointer"
                style={{
                  borderColor: "rgba(252,246,237,0.6)",
                  color: "#FCF6ED",
                  fontFamily: "var(--font-aeonik-mono)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "rgba(252,246,237,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }}
              >
                {ctaText}
              </button>
            </div>

            <ul className="flex flex-col gap-3 mt-2">
              {bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Image
                    src="/go/orange-x.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span
                    className="text-sm sm:text-base"
                    style={{ color: "rgba(252,246,237,0.85)", fontFamily: "var(--font-aeonik)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="relative animate-float"
              style={{
                filter:
                  "drop-shadow(0 0 60px rgba(255,255,255,0.18)) drop-shadow(0 0 120px rgba(255,255,255,0.08))",
              }}
            >
              <Image
                src={`/go${coverSrc}`}
                alt={coverAlt}
                width={340}
                height={480}
                className="w-64 sm:w-80 lg:w-[340px] h-auto rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(3,31,61,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-8 flex flex-col gap-6 shadow-2xl"
            style={{
              backgroundColor: "#031F3D",
              border: "1px solid rgba(252,246,237,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-xl leading-none opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "#FCF6ED", fontFamily: "var(--font-aeonik)" }}
              aria-label="Close"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <div>
                  <h3
                    className="font-nohemi font-weight-500 text-2xl leading-tight mb-2"
                    style={{ color: "#FCF6ED" }}
                  >
                    Get your free CPAP guide
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(252,246,237,0.65)", fontFamily: "var(--font-aeonik)" }}
                  >
                    Enter your email and we&apos;ll send you the guide instantly.
                  </p>
                </div>

                <form onSubmit={handleDownload} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(252,246,237,0.08)",
                      border: "1px solid rgba(252,246,237,0.25)",
                      color: "#FCF6ED",
                      fontFamily: "var(--font-aeonik)",
                    }}
                  />
                  {error && (
                    <p
                      className="text-xs"
                      style={{ color: "#FF8361", fontFamily: "var(--font-aeonik)" }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{
                      backgroundColor: "#FF8361",
                      color: "#FCF6ED",
                      fontFamily: "var(--font-aeonik-mono)",
                    }}
                  >
                    {loading ? "Sending…" : "Download Free Guide"}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(120,191,188,0.2)" }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#78BFBC"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="font-nohemi font-weight-500 text-xl text-center"
                  style={{ color: "#FCF6ED" }}
                >
                  Your download has started!
                </h3>
                <p
                  className="text-sm text-center"
                  style={{ color: "rgba(252,246,237,0.65)", fontFamily: "var(--font-aeonik)" }}
                >
                  Check your downloads folder for the CPAP guide.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-2 text-sm underline opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: "#FCF6ED", fontFamily: "var(--font-aeonik)" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
