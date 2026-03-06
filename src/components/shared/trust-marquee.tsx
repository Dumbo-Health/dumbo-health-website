import { trustIndicators } from "@/content/trust-indicators";

export function TrustMarquee() {
  return (
    <section className="overflow-hidden border-y border-sunlight bg-sunlight/50 py-4">
      <div className="flex w-max animate-marquee items-center gap-8">
        {[...trustIndicators, ...trustIndicators].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2 text-sm font-medium text-midnight/70"
          >
            <span className="size-1.5 rounded-full bg-teal" />
            <span className="font-mono text-tag uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
