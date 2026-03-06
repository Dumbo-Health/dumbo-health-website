import Image from "next/image";

export function StorySection() {
  return (
    <section className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-heading text-h2 text-midnight mb-2">Our Story</h2>
            <h3 className="font-heading text-h3 text-midnight/70 mb-6">
              Better sleep should be easy. We&apos;re building it that way.
            </h3>
            <p className="font-body text-body-lg text-midnight/70">
              We started Dumbo Health to make sleep care simpler, more human, and within reach. Too many people struggle with sleep apnea without answers, support, or access. We&apos;re here to change that with affordable solutions, real doctors, and a care experience that actually fits your life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sunlight">
              <Image
                src="/images/misc/team-office.jpg"
                alt="Dumbo Health team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sunlight mt-8">
              <Image
                src="/images/misc/caring-hands.jpg"
                alt="Caring medical support"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
