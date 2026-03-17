"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { features } from "@/config/features";

function getPromoCountdown() {
  const now = Date.now();
  const thisYear = new Date().getUTCFullYear();
  // April 1 (UTC) = end of March countdown target
  let promoEnd = Date.UTC(thisYear, 3, 1, 0, 0, 0);

  if (now > promoEnd) {
    promoEnd = Date.UTC(thisYear + 1, 3, 1, 0, 0, 0);
  }

  const diff = Math.max(0, promoEnd - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function SleepAwarenessPromoBanner() {
  const [countdown, setCountdown] = useState(getPromoCountdown());

  const showPromo = features.sections.sleepAwarenessPromo;

  useEffect(() => {
    if (!showPromo) return;
    const intervalId = setInterval(() => {
      setCountdown(getPromoCountdown());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [showPromo]);

  if (!showPromo) return null;

  return (
    <div className="border-b border-white/10 bg-midnight text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/go/sleep-hub"
          className="flex min-h-10 w-full items-center justify-center gap-3 py-1.5 text-[11px] font-body sm:text-sm"
        >
          <span className="flex items-center gap-2">
            <Image
              src="/go/sleep-hub.png"
              alt=""
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="leading-tight">
              <span className="font-semibold">Sleep Hub</span>
              <span className="hidden text-[10px] opacity-80 sm:inline">
                {" "}
                by Dumbo Health
              </span>
            </span>
          </span>
          <span className="opacity-95">
            Free access in March. Limited time.
          </span>
          <span className="whitespace-nowrap font-semibold">
            30-day countdown: {countdown}
          </span>
        </Link>
      </div>
    </div>
  );
}
