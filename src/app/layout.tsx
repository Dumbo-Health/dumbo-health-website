import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health",
    template: "%s | Dumbo Health",
  },
  description:
    "Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149. Expert telehealth care in FL & TX. Start sleeping better today.",
  metadataBase: new URL("https://www.dumbo.health"),
  openGraph: {
    siteName: "Dumbo Health",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
