import type { Metadata } from "next";
import WatchPatSetupContent from "./WatchPatSetupContent";

export const metadata: Metadata = {
  title: "WatchPAT ONE Setup Guide — Dumbo Health",
  description: "Step-by-step setup guide for your WatchPAT ONE home sleep test. Download the app, pair your device, and start your test tonight.",
  robots: { index: true, follow: true },
};

export default function WatchPatSetupPage() {
  return <WatchPatSetupContent />;
}
