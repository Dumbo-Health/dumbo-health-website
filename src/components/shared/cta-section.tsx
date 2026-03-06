import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="bg-peach/10 py-16 sm:py-24 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-h2 text-midnight mb-2">Wake up</h2>
        <h3 className="font-heading text-h3 text-midnight mb-4">to a better life</h3>
        <p className="font-body text-body-lg text-midnight/70 mb-8">
          We make treating sleep apnea as simple as booking a hotel room, no waiting lists, no confusion, just restful nights ahead.
        </p>
        <Button size="lg" asChild>
          <a href={APP_URL}>Start now</a>
        </Button>
      </div>
    </section>
  );
}
