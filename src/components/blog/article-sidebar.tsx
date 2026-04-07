import Link from "next/link";

export function ArticleSidebar() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#031F3D" }}
    >
      <div className="p-6">
        <p
          className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: "0.6875rem", color: "rgba(252,246,237,0.5)" }}
        >
          Struggling with sleep?
        </p>
        <h3
          className="font-heading font-medium mb-3"
          style={{ fontSize: "1.25rem", color: "#FCF6ED", lineHeight: 1.3 }}
        >
          Find out if sleep apnea is the reason.
        </h3>
        <p
          className="font-body mb-5"
          style={{ fontSize: "0.9375rem", color: "rgba(252,246,237,0.65)", lineHeight: 1.6 }}
        >
          Takes 2 minutes. No credit card required.
        </p>
        <Link
          href="/get-started"
          className="block w-full text-center rounded-xl py-3 font-body font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "#FF8361", color: "#fff" }}
        >
          Take the sleep quiz
        </Link>
        <Link
          href="/sleep-test"
          className="block w-full text-center mt-3 rounded-xl py-3 font-body text-sm transition-all duration-200"
          style={{
            background: "rgba(252,246,237,0.08)",
            color: "rgba(252,246,237,0.75)",
            border: "1px solid rgba(252,246,237,0.12)",
          }}
        >
          Buy at-home sleep test
        </Link>
      </div>
    </div>
  );
}
