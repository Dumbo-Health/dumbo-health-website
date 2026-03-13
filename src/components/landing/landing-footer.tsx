import Image from "next/image";
import { CONTACT, SHOPIFY } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer
      className="border-t border-sunlight/60 bg-daylight py-12"
    >
      <div
        className="flex flex-col items-center gap-8 text-center"
        style={{ padding: "0 5%" }}
      >
        {/* Logo */}
        <Image
          src="/logos/wordmark-midnight.svg"
          alt="Dumbo Health"
          width={130}
          height={26}
        />

        {/* Two CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={SHOPIFY.buyUrl}
            className="inline-flex h-12 items-center justify-center rounded-[12px] bg-peach px-8 font-body text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-peach/90 hover:shadow-lg active:translate-y-0"
          >
            Order your sleep test — $149
          </a>
          <a
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-[12px] border border-midnight/20 bg-white px-8 font-body text-sm font-bold uppercase tracking-wider text-midnight shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/40 hover:shadow-md active:translate-y-0"
          >
            Explore CPAP plans
          </a>
        </div>

        {/* Fine print */}
        <p
          className="font-body text-xs"
          style={{ color: "rgba(3,31,61,0.4)", maxWidth: "52ch" }}
        >
          Questions? Call us at{" "}
          <a
            href={CONTACT.phoneTel}
            className="underline underline-offset-2 transition-colors hover:text-midnight"
          >
            {CONTACT.phone}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline underline-offset-2 transition-colors hover:text-midnight"
          >
            {CONTACT.email}
          </a>
          . &copy; {new Date().getFullYear()} Dumbo Health. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
