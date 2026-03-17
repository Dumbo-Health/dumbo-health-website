"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

const noNavFooterPaths = ["/go/ebook/free-cpap-guide"];

export default function GoLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavFooter = noNavFooterPaths.includes(pathname ?? "");

  return (
    <div className="min-h-screen bg-daylight text-midnight">
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </div>
  );
}
