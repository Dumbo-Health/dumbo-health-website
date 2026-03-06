import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostGrid } from "@/components/blog/post-grid";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import type { BlogPost } from "@/components/blog/post-card";

export const metadata: Metadata = createMetadata({
  title: "The Sleep Journal: Sleep Apnea Tips & Guides | Dumbo Health",
  description: "Your guide to better sleep, health and everyday energy. Expert tips, real stories, and the latest in sleep wellness and apnea care.",
  path: "/blog",
});

const samplePosts: BlogPost[] = [
  {
    title: "Is CPAP covered by insurance?",
    slug: "is-cpap-covered-by-insurance",
    category: "CPAP",
    author: "Kaila Caldwell",
    date: "Feb 3, 2026",
    excerpt: "In most cases, yes, but that doesn't mean it's affordable. Many patients start CPAP therapy thinking their insurer will handle most of the costs, only to discover complicated rules, compliance requirements, and unexpected bills along the way.",
  },
  {
    title: "Sleep apnea OTC treatments: Real help or just hype?",
    slug: "sleep-apnea-otc-treatments-real-help-or-just-hype",
    category: "Sleep Apnea",
    author: "Kaila Caldwell",
    date: "Feb 21, 2026",
    excerpt: "From melatonin to micro-CPAP, learn which OTC products ease snoring, and why none can actually treat sleep apnea without medical guidance",
  },
  {
    title: "Can sleep apnea be treated without CPAP? Yes, here's how",
    slug: "can-sleep-apnea-be-treated-without-cpap-yes-heres-how",
    category: "CPAP",
    author: "Kaila Caldwell",
    date: "Feb 21, 2026",
    excerpt: "Learn about proven sleep apnea treatments without CPAP including oral appliances, surgery, and simple changes that help you sleep better.",
  },
  {
    title: "What equipment do you need for a home sleep study?",
    slug: "what-equipment-do-you-need-for-a-home-sleep-study",
    category: "Sleep Tracking",
    author: "Nicky Charles Peters",
    date: "Feb 21, 2026",
    excerpt: "Learn which devices make home sleep studies possible, from airflow sensors to oximeters.",
  },
  {
    title: "Oral appliance for sleep apnea",
    slug: "oral-appliance-for-sleep-apnea-how-it-works-who-it-helps-what-to-expect",
    category: "Sleep Apnea",
    author: "Kaila Caldwell",
    date: "Feb 3, 2026",
    excerpt: "Understand how custom oral appliances open the airway, who qualifies, side effects, costs, and how Dumbo Health supports you at home.",
  },
  {
    title: "Only getting 4 hours of sleep a night",
    slug: "only-getting-4-hours-of-sleep-a-night-side-effects-consequences",
    category: "Sleep Disorders",
    author: "Nicky Charles Peters",
    date: "Feb 3, 2026",
    excerpt: "These one-off sleepless nights may just throw off your routine or make you tired the next day, but if you find yourself frequently only sleeping 4 hours a night, there may be a more serious underlying issue.",
  },
  {
    title: "CPAP vs APAP vs BiPAP: What's the difference?",
    slug: "cpap-vs-apap-vs-bipap-whats-the-difference-and-which-is-better",
    category: "CPAP",
    author: "Kaila Caldwell",
    date: "Feb 3, 2026",
    excerpt: "CPAP, APAP, BiPAP — it can sound like alphabet soup.",
  },
  {
    title: "9 Most common sleep apnea symptoms",
    slug: "9-most-common-sleep-apnea-symptoms-to-look-out-for",
    category: "Sleep Apnea",
    author: "Nicky Charles Peters",
    date: "Feb 3, 2026",
    excerpt: "Patients who suffer from sleep apnea can experience a wide range of symptoms.",
  },
  {
    title: "What is a CPAP machine?",
    slug: "what-is-a-cpap-machine",
    category: "CPAP",
    author: "Kaila Caldwell",
    date: "Nov 4, 2025",
    excerpt: "Everything you need to know about CPAP machines, how they work, and why they're the gold standard for sleep apnea treatment.",
  },
];

function NewsletterSignup() {
  return (
    <section className="bg-sunlight py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl font-medium text-midnight md:text-h2">
          Sign up for our newsletter
        </h2>
        <p className="mt-4 font-body text-body-lg text-midnight/70">
          Tips, stories, and updates to help you sleep better and live brighter, straight to your inbox.
        </p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1 rounded-full border border-sunlight bg-white px-6 py-3 font-body text-body text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-peach"
          />
          <button
            type="submit"
            className="h-12 rounded-lg bg-peach px-8 font-body text-base font-bold uppercase tracking-wider text-white shadow-md shadow-peach/15 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-midnight hover:shadow-xl hover:shadow-midnight/20 active:translate-y-0 active:shadow-md"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading text-2xl md:text-4xl lg:text-hero text-midnight mb-4">
              The Sleep Journal
            </h1>
            <p className="font-heading text-h3 text-midnight/70 mb-4">
              Your guide to better sleep, health and everyday energy.
            </p>
            <p className="font-body text-body-lg text-midnight/70 max-w-2xl mx-auto">
              From expert tips and real stories to the latest in sleep wellness and apnea care, everything you need to breathe easier and wake up brighter, right here.
            </p>
          </div>
          <CategoryFilter />
          <PostGrid posts={samplePosts} />
        </div>
      </section>
      <NewsletterSignup />
      <BottomCTA />
      <ServiceAreaBanner />
      </main>
      <Footer />
    </>
  );
}
