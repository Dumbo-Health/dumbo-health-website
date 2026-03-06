"use client";

import dynamic from "next/dynamic";

export const DynamicHeroStars = dynamic(
  () => import("./hero-stars").then((m) => ({ default: m.HeroStars })),
  { ssr: false }
);

export const DynamicWaveDistortion = dynamic(
  () => import("./wave-distortion").then((m) => ({ default: m.WaveDistortion })),
  { ssr: false }
);

export const DynamicNetworkNodes = dynamic(
  () => import("./network-nodes").then((m) => ({ default: m.NetworkNodes })),
  { ssr: false }
);

export const DynamicBreathingOrb = dynamic(
  () => import("./breathing-orb").then((m) => ({ default: m.BreathingOrb })),
  { ssr: false }
);

export const DynamicGradientMesh = dynamic(
  () => import("./gradient-mesh").then((m) => ({ default: m.GradientMesh })),
  { ssr: false }
);

export const DynamicAuroraEffect = dynamic(
  () => import("./aurora-effect").then((m) => ({ default: m.AuroraEffect })),
  { ssr: false }
);

export const DynamicRippleMap = dynamic(
  () => import("./ripple-map").then((m) => ({ default: m.RippleMap })),
  { ssr: false }
);
