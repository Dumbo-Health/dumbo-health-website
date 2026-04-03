import Image from "next/image";
import { CONTACT, SHOPIFY } from "@/lib/constants";

export function LandingFooter() {
  return (
    <footer
      className="py-10"
      style={{
        backgroundColor: "#FCF6ED",
        borderTop: "1px solid rgba(3,31,61,0.08)",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between"
        style={{ padding: "0 5%", maxWidth: "1280px" }}
      >
        {/* Logo + copyright */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Image
            src="/logos/wordmark-midnight.svg"
            alt="Dumbo Health"
            width={190}
            height={38}
          />
          <p
            className="font-body text-xs"
            style={{ color: "rgba(3,31,61,0.35)" }}
          >
            &copy; {new Date().getFullYear()} Dumbo Health &middot; Questions?{" "}
            <a
              href={CONTACT.phoneTel}
              className="underline underline-offset-2 transition-colors"
              style={{ color: "rgba(3,31,61,0.45)" }}
            >
              {CONTACT.phone}
            </a>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={SHOPIFY.buyUrl}
                data-shopify-checkout="sleep-test"
            className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#FF8361",
              boxShadow: "0 4px 16px rgba(255,131,97,0.28)",
              height: "48px",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
            }}
          >
            Order your test · $149
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-[12px] font-body text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              border: "1px solid rgba(3,31,61,0.18)",
              color: "rgba(3,31,61,0.65)",
              height: "48px",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            Explore CPAP plans
          </a>
        </div>
      </div>
    </footer>
  );
}
