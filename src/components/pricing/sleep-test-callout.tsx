import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SleepTestCallout() {
  return (
    <section style={{ backgroundColor: "#FCF6ED" }} className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl px-8 py-7"
          style={{
            backgroundColor: "#F5E6D1",
            border: "1px solid rgba(3,31,61,0.08)",
          }}
        >
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-widest mb-2"
              style={{ color: "#78BFBC" }}
            >
              Not diagnosed yet?
            </p>
            <h3
              className="font-heading font-medium text-midnight"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
            >
              Start here. One night, one test, $149.
            </h3>
            <p
              className="mt-2 font-body leading-relaxed"
              style={{ color: "rgba(3,31,61,0.6)", fontSize: "0.9375rem", maxWidth: "54ch" }}
            >
              The WatchPAT ONE is FDA-cleared, worn at home, and reviewed by a
              board-certified sleep physician. You&apos;ll have results in days,
              not months.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 h-12 rounded-[12px] bg-peach px-7 font-body text-sm font-bold uppercase tracking-wider text-white whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ boxShadow: "0 4px 20px rgba(255,131,97,0.22)" }}
          >
            <Link href="/get-your-at-home-sleep-apnea-test">Get the sleep test</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
