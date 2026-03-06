import Image from "next/image";
import { testimonials } from "@/content/testimonials";

function StarRating() {
  return (
    <div className="mb-3 flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-5 w-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-light-peach/30 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-medium text-midnight md:text-[40px]">
            What Sleep Experts Are Saying About Dumbo Health
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl border border-sunlight bg-white p-6"
            >
              <StarRating />
              <svg
                className="mb-3 h-8 w-8 text-peach/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-body text-sm leading-relaxed text-midnight/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-sunlight pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sunlight">
                  <Image
                    src={`/images/team/doctor-${(i % 3) + 1}.jpg`}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-heading text-sm font-medium text-midnight">
                    {t.name}
                  </p>
                  <p className="font-mono text-xs text-midnight/40">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
