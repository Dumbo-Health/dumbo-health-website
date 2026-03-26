import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ComingSoonContent from "./ComingSoonContent";

export const metadata: Metadata = {
  title: "Coming Soon — Dumbo Health",
  description: "We're building something great for you. Be the first to know when it launches.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <ComingSoonContent page="coming-soon" />
      <Footer />
    </>
  );
}
