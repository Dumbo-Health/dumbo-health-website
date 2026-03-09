import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

const aboutImages = [
  { src: "/images/people/girl-in-bed.png",        alt: "Person resting peacefully" },
  { src: "/images/misc/team-office.jpg",           alt: "Modern medical office" },
  { src: "/images/people/couple-in-bed.png",       alt: "Couple resting" },
  { src: "/images/people/woman-blue-pajamas.png",  alt: "Woman ready for a good night" },
  { src: "/images/people/man-on-beach.png",        alt: "Man feeling great" },
  { src: "/images/hero/hero-device.jpg",           alt: "Sleep technology" },
  { src: "/images/people/man-waking-up.png",       alt: "Man waking up refreshed" },
  { src: "/images/products/hst-box.png",    alt: "Sleep test kit" },
];

export function AboutHero() {
  return (
    <section className="bg-daylight py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-2xl md:text-4xl lg:text-hero text-midnight mb-6">
            Built for Better Sleep
          </h1>
          <p className="font-body text-body-lg text-midnight/70 mb-8">
            We are on a mission to make better sleep easy, accessible, and backed by science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={APP_URL}>Take Our Sleep Apnea Quiz</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#experts">Scientific Committee</a>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {aboutImages.slice(0, 4).map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sunlight">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {aboutImages.slice(4).map((img, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sunlight">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
