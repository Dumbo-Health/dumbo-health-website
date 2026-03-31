import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React 19 Strict Mode repeatedly mounts/unmounts components in dev,
  // which breaks the hero intro animation sequence (timers get cleared
  // before they complete, animation never finishes).
  reactStrictMode: false,
  // Allow HMR and _next/* resources from the VPS IP address.
  // Without this, Next.js 16 blocks cross-origin /_next requests,
  // causing the HMR client to do full page reloads in a loop.
  allowedDevOrigins: ["187.77.160.138"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // 301 redirects — migrate from old Webflow site (dumbo.health) URL structure
  async redirects() {
    return [
      // /problem-solution/* → flat symptom pages
      { source: "/problem-solution/always-tired", destination: "/always-tired", permanent: true },
      { source: "/problem-solution/anxiety-stress", destination: "/anxiety-and-stress", permanent: true },
      { source: "/problem-solution/cant-focus", destination: "/cant-focus", permanent: true },
      { source: "/problem-solution/constantly-getting-sick", destination: "/constantly-getting-sick", permanent: true },
      { source: "/problem-solution/hard-to-lose-weight", destination: "/hard-to-lose-weight", permanent: true },
      { source: "/problem-solution/high-blood-pressure", destination: "/high-blood-pressure", permanent: true },
      { source: "/problem-solution/loud-snoring", destination: "/loud-snoring", permanent: true },
      { source: "/problem-solution/low-sex-drive", destination: "/low-sex-drive", permanent: true },
      // /hst/* sub-path redirects
      { source: "/hst/dot-sleep-apnea-testing", destination: "/dot-sleep-apnea-testing", permanent: true },
      { source: "/hst/get-your-at-home-sleep-apnea-test", destination: "/get-your-at-home-sleep-apnea-test", permanent: true },
      // Scientific committee profiles → about us
      { source: "/scientific-committee/:path*", destination: "/about-us", permanent: true },
      // Jacksonville geo-landing page → solutions
      { source: "/find-sleep-apnea-doctor-near-jacksonville", destination: "/solutions", permanent: true },
    ];
  },
};

export default nextConfig;
