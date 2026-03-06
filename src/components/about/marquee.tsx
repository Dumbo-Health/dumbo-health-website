export function AboutMarquee() {
  const text = "Supporting healthier lives one night of sleep at a time";
  const separator = " \u2022 ";
  const items = Array.from({ length: 8 });

  return (
    <section className="bg-midnight py-6 overflow-hidden">
      <div className="flex animate-marquee items-center gap-0 whitespace-nowrap">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="font-heading text-3xl md:text-4xl text-daylight px-4"
          >
            {text}{separator}
          </span>
        ))}
      </div>
    </section>
  );
}
