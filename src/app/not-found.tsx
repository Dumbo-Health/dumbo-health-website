import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
      <section className="bg-daylight min-h-[60vh] flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-tag text-peach mb-4">404</p>
          <h1 className="font-heading text-2xl md:text-4xl text-midnight mb-4">
            Page not found
          </h1>
          <p className="font-body text-body-lg text-midnight/70 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back on track to better sleep.
          </p>
          <Button size="lg" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
