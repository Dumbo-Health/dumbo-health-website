import Image from "next/image";

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  stars?: number;
}

export interface EbookTestimonialsProps {
  title: string;
  testimonials: Testimonial[];
  iconsSrc?: string;
  iconsAlt?: string;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="#FF8361"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function EbookTestimonials({
  title,
  testimonials,
  iconsSrc,
  iconsAlt = "",
}: EbookTestimonialsProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#F5E6D1" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        <h2
          className="font-nohemi font-weight-500 text-3xl sm:text-4xl lg:text-5xl text-center leading-tight max-w-2xl"
          style={{ color: "#031F3D" }}
        >
          {title}
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Stars count={t.stars ?? 5} />

              <p
                className="flex-1 text-sm leading-relaxed"
                style={{
                  color: "#031F3D",
                  fontFamily: "var(--font-aeonik)",
                }}
              >
                {t.quote}
              </p>

              <div>
                <p
                  className="text-sm font-bold"
                  style={{
                    color: "#031F3D",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: "rgba(3,31,61,0.6)",
                    fontFamily: "var(--font-aeonik)",
                  }}
                >
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {iconsSrc && (
          <Image
            src={`/go${iconsSrc}`}
            alt={iconsAlt}
            width={180}
            height={60}
            className="h-10 w-auto object-contain mt-2"
          />
        )}
      </div>
    </section>
  );
}
