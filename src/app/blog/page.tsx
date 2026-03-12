export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PostGrid } from "@/components/blog/post-grid";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BottomCTA } from "@/components/shared/bottom-cta";
import { ServiceAreaBanner } from "@/components/shared/service-area-banner";
import { getBlogPosts } from "@/lib/supabase";

export const metadata: Metadata = createMetadata({
  title: "The Sleep Journal: Sleep Apnea Tips & Guides | Dumbo Health",
  description: "Your guide to better sleep, health and everyday energy. Expert tips, real stories, and the latest in sleep wellness and apnea care.",
  path: "/blog",
});

function NewsletterSignup() {
  return (
    <section className="bg-sunlight py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-heading font-medium text-midnight"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
        >
          Sign up for our newsletter
        </h2>
        <p className="mt-4 font-body text-midnight/70 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
          Tips, stories, and updates to help you sleep better and live brighter, straight to your inbox.
        </p>
        <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1 rounded-full border border-sunlight bg-white px-6 py-3 font-body text-base text-midnight placeholder:text-midnight/40 focus:outline-none focus:ring-2 focus:ring-peach"
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              className="font-heading font-medium text-midnight mb-4"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
            >
              The Sleep Journal
            </h1>
            <p
              className="font-heading font-medium text-midnight/70 mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Your guide to better sleep, health and everyday energy.
            </p>
            <p className="font-body text-midnight/70 mx-auto" style={{ fontSize: "1.125rem", maxWidth: "52ch" }}>
              From expert tips and real stories to the latest in sleep wellness and apnea care, everything you need to breathe easier and wake up brighter, right here.
            </p>
          </div>
          <CategoryFilter />
          <PostGrid posts={posts} />
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
