import Image from "next/image";
import Link from "next/link";

const solutions = [
  {
    step: 1,
    title: "At-Home Diagnostic Kit",
    body: "Skip the clinic. Our affordable and reliable sleep testing gets you closer to treatment, faster.",
    href: "/solutions#step-1",
    image: "/images/products/sleep-test-kit.png",
    bg: "bg-peach",
    textColor: "text-white",
    stepColor: "text-white/70",
    linkColor: "text-white hover:text-daylight",
  },
  {
    step: 2,
    title: "Sleep Apnea Care",
    body: "We match you with the right treatment based on your needs, whether that's a CPAP or a dental appliance for sleep apnea.",
    href: "/solutions#step-2",
    image: "/images/products/cpap-device.jpg",
    bg: "bg-teal",
    textColor: "text-midnight",
    stepColor: "text-midnight/60",
    linkColor: "text-midnight hover:text-midnight/70",
  },
  {
    step: 3,
    title: "Telehealth Sleep Experts",
    body: "Licensed sleep specialists guide your care with real answers when you need them.",
    href: "/solutions#step-3",
    image: "/images/team/doctor-1.jpg",
    bg: "bg-midnight",
    textColor: "text-daylight",
    stepColor: "text-daylight/60",
    linkColor: "text-peach hover:text-light-peach",
  },
  {
    step: 4,
    title: "Personalized Dashboard",
    body: "Stay motivated, supported, and in control thanks to the data collected during your sleep.",
    href: "/solutions#step-4",
    image: "/images/misc/benefits-wellness.jpg",
    bg: "bg-sunlight",
    textColor: "text-midnight",
    stepColor: "text-midnight/60",
    linkColor: "text-peach hover:text-peach/80",
  },
  {
    step: 5,
    title: "Resupply & Maintenance",
    body: "Based on your sleep insights, we take care of resupplies and support so your sleep stays on track.",
    href: "/solutions#step-5",
    image: "/images/misc/caring-hands.jpg",
    bg: "bg-light-peach",
    textColor: "text-midnight",
    stepColor: "text-midnight/60",
    linkColor: "text-midnight hover:text-midnight/70",
  },
  {
    step: 6,
    title: "Supportive Sleep Community",
    body: "Join a community of people improving their sleep, just like you. Share wins, ask questions, and get encouragement.",
    href: "/solutions#step-6",
    image: "/images/misc/happy-morning.jpg",
    bg: "bg-teal",
    textColor: "text-midnight",
    stepColor: "text-midnight/60",
    linkColor: "text-midnight hover:text-midnight/70",
  },
];

export function SolutionsGrid() {
  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-teal">
            Dumbo Health Solutions
          </p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-midnight md:text-[40px] md:leading-tight">
            Everything you need to treat sleep apnea from home.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-midnight/60">
            No more clinics, confusion or waiting weeks. We bring expert sleep
            care directly to you.
          </p>
        </div>

        {/* 2-column grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group overflow-hidden rounded-2xl ${s.bg} shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Card image */}
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card content */}
              <div className="p-6 md:p-8">
                <p className={`font-mono text-xs uppercase tracking-widest ${s.stepColor}`}>
                  Step {s.step}
                </p>
                <h3 className={`mt-2 font-heading text-xl font-medium ${s.textColor}`}>
                  {s.title}
                </h3>
                <p className={`mt-2 font-body text-sm leading-relaxed ${s.textColor} opacity-80`}>
                  {s.body}
                </p>
                <span className={`mt-4 inline-flex items-center gap-1 font-body text-sm font-bold ${s.linkColor} transition-colors`}>
                  Learn More
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
