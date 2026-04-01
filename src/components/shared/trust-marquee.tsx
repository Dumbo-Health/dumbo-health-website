import { trustIndicators } from "@/content/trust-indicators";

export function TrustMarquee() {
  return (
    <section className="overflow-hidden border-y border-sunlight py-4" style={{ backgroundColor: "rgba(245,230,209,0.5)" }}>
      <div className="flex w-max animate-marquee items-center gap-8">
        {[...trustIndicators, ...trustIndicators].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2 text-sm font-medium text-midnight/70"
          >
            <span className="size-1.5 rounded-full bg-teal" />
            <span className="font-mono text-xs uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
