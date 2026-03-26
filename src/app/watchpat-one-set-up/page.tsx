import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import AppDownloadButtons from "./AppDownloadButtons";

export const metadata: Metadata = {
  title: "WatchPAT ONE Setup Guide — Dumbo Health",
  description: "Step-by-step setup guide for your WatchPAT ONE home sleep test. Download the app, pair your device, and start your test tonight.",
  robots: { index: true, follow: true },
};

const STEPS = [
  {
    number: "01",
    title: "Download the WatchPAT app",
    body: "Install the free WatchPAT app on your smartphone before the night of your test. You'll need it to pair the device, start the recording, and submit your results.",
    color: "#FF8361",
  },
  {
    number: "02",
    title: "Create or log in to your account",
    body: "Open the app and sign in with the email address you used when ordering your test. Your study will already be waiting for you.",
    color: "#78BFBC",
  },
  {
    number: "03",
    title: "Pair your WatchPAT ONE",
    body: "Enable Bluetooth on your phone. The app will guide you to scan the QR code on your device box — this links the device to your study automatically.",
    color: "#FF8361",
  },
  {
    number: "04",
    title: "Apply the device",
    body: "Wear the wristband on your non-dominant wrist like a watch. Attach the finger probe to your index finger and apply the small chest sticker as shown in the app instructions. Everything is single-use and disposable.",
    color: "#78BFBC",
  },
  {
    number: "05",
    title: "Start the recording",
    body: "Tap \"Start Study\" in the app when you're ready for bed. The device records automatically while you sleep — no buttons to press during the night.",
    color: "#FF8361",
  },
  {
    number: "06",
    title: "Wake up and sync",
    body: "In the morning, open the app and tap \"End Study.\" Your results upload securely to our clinical team. Dispose of the device — it's single-use.",
    color: "#78BFBC",
  },
];

const FAQS = [
  {
    q: "What if the device falls off during the night?",
    a: "Don't worry — this is common. If the finger probe comes off, simply reattach it as best you can. The wristband is designed to stay on through normal sleep movement. Even partial data gives our clinicians useful information.",
  },
  {
    q: "Is it painful or uncomfortable?",
    a: "No. The finger probe is a soft sensor clip, the wristband fits like a watch, and the chest sticker is a small, gentle adhesive. Most patients forget they're wearing it after a few minutes.",
  },
  {
    q: "Can I sleep in my normal position?",
    a: "Yes — sleep exactly as you normally would. Side sleeping, back sleeping, any position is fine. The WatchPAT ONE is designed to work in all sleep positions.",
  },
  {
    q: "Do I need to fast or avoid anything before the test?",
    a: "Avoid alcohol and sleep aids the night of your test as they affect sleep architecture. Otherwise, eat and drink normally. Take your regular medications unless your provider has told you otherwise.",
  },
  {
    q: "What if the device doesn't connect in the app?",
    a: "Make sure Bluetooth is enabled and you're within a few feet of the device. Try closing and reopening the app. If it still won't connect, contact us at hello@dumbohealth.com — we'll get you sorted before your test night.",
  },
  {
    q: "When will I get my results?",
    a: "Our clinical team reviews your study and you'll receive results within 3–5 business days. We'll reach out by email and through the Dumbo Health platform.",
  },
  {
    q: "Is my sleep data secure?",
    a: "Yes. All data is encrypted in transit and at rest, stored on HIPAA-compliant infrastructure. Your results are only accessible to you and your Dumbo Health care team.",
  },
  {
    q: "What does WatchPAT ONE actually measure?",
    a: "The device measures your peripheral arterial tone (PAT), heart rate, oxygen saturation, actigraphy, and body position — giving our clinicians everything they need to accurately diagnose sleep apnea and determine its severity.",
  },
];

const KEY_FACTS = [
  { icon: "🏠", label: "Done at home", sub: "No sleep lab visit required" },
  { icon: "🌙", label: "One night", sub: "Just a single night of sleep" },
  { icon: "📦", label: "Single-use", sub: "Disposable after your test" },
  { icon: "✅", label: "FDA-cleared", sub: "Clinically validated accuracy" },
];

export default function WatchPatSetupPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "#031F3D",
            position: "relative",
            overflow: "hidden",
            padding: "96px 5% 80px",
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", top: "-20%", right: "-10%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,131,97,0.22) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", left: "-8%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(120,191,188,0.18) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 999,
              background: "rgba(120,191,188,0.15)", marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#78BFBC", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC" }}>
                Home Sleep Test
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-heading)", fontWeight: 500,
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)", lineHeight: 1.12,
              color: "white", marginBottom: 20,
            }}>
              Your WatchPAT ONE<br />Setup Guide
            </h1>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "1.125rem",
              color: "rgba(252,246,237,0.65)", lineHeight: 1.7,
              maxWidth: 520, margin: "0 auto",
            }}>
              Everything you need to complete your home sleep test tonight — from downloading the app to waking up with your data uploaded.
            </p>
          </div>
        </section>

        {/* ── Key facts ───────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "48px 5%" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {KEY_FACTS.map((f) => (
                <div key={f.label} style={{
                  background: "white", borderRadius: 16, padding: "24px 20px",
                  border: "1px solid rgba(3,31,61,0.07)", textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: 8 }}>{f.icon}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#031F3D", marginBottom: 4 }}>{f.label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "rgba(3,31,61,0.5)" }}>{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Video ───────────────────────────────────────── */}
        <section style={{ background: "#F5E6D1", padding: "72px 5%" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
              Watch first
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#031F3D", marginBottom: 12 }}>
              See how it works
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.55)", marginBottom: 36, fontSize: "1.0625rem" }}>
              Watch the full setup walkthrough before your test night. It takes under 5 minutes.
            </p>
            <div style={{
              position: "relative", width: "100%", paddingBottom: "56.25%",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 20px 60px rgba(3,31,61,0.12)",
            }}>
              <iframe
                src="https://www.youtube.com/embed/_9kCq4c39IY"
                title="WatchPAT ONE Setup Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "100%", height: "100%", border: "none",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Steps ───────────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "80px 5%" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16, textAlign: "center" }}>
              Setup steps
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#031F3D", marginBottom: 48, textAlign: "center" }}>
              Six steps to a completed study
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {STEPS.map((step) => (
                <div key={step.number} style={{
                  display: "flex", gap: 20, alignItems: "flex-start",
                  background: "white", borderRadius: 16, padding: "24px 24px",
                  border: "1px solid rgba(3,31,61,0.07)",
                }}>
                  <div style={{
                    flexShrink: 0, width: 44, height: 44, borderRadius: 12,
                    background: `${step.color}18`,
                    border: `1.5px solid ${step.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: step.color }}>
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#031F3D", marginBottom: 6, fontSize: "1.0625rem" }}>
                      {step.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.6)", lineHeight: 1.65, fontSize: "0.9375rem" }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── App download ─────────────────────────────────── */}
        <section style={{ background: "#031F3D", padding: "80px 5%", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,131,97,0.14) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
              Step 1 — Get the app
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "white", marginBottom: 12 }}>
              Download WatchPAT
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(252,246,237,0.55)", fontSize: "1.0625rem", marginBottom: 36, lineHeight: 1.65 }}>
              The app is free. Install it before the night of your test so you have time to pair your device without rushing.
            </p>
            <AppDownloadButtons />
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ background: "#FCF6ED", padding: "80px 5%" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16, textAlign: "center" }}>
              Common questions
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#031F3D", marginBottom: 48, textAlign: "center" }}>
              Things people ask us
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQS.map((faq) => (
                <div key={faq.q} style={{
                  background: "white", borderRadius: 14, padding: "22px 24px",
                  border: "1px solid rgba(3,31,61,0.07)",
                }}>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#031F3D", marginBottom: 8, fontSize: "1rem" }}>
                    {faq.q}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", color: "rgba(3,31,61,0.6)", lineHeight: 1.65, fontSize: "0.9375rem" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What happens next ────────────────────────────── */}
        <section style={{ background: "#F5E6D1", padding: "80px 5%" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#78BFBC", marginBottom: 16 }}>
              After your test
            </p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#031F3D", marginBottom: 16 }}>
              We take it from here
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(3,31,61,0.6)", lineHeight: 1.7, marginBottom: 40 }}>
              Once your data uploads, our licensed sleep clinicians review your study — typically within 3–5 business days. You&apos;ll receive your results and a clear explanation of what they mean. If treatment is recommended, we&apos;ll walk you through every next step.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <a
                href="/get-started"
                style={{
                  display: "inline-block",
                  background: "#FF8361", color: "white",
                  fontFamily: "var(--font-body)", fontWeight: 600,
                  fontSize: "1rem", padding: "15px 32px",
                  borderRadius: 12, textDecoration: "none",
                }}
              >
                Questions? Contact us
              </a>
              <a
                href="mailto:hello@dumbohealth.com"
                style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "rgba(3,31,61,0.45)", textDecoration: "none" }}
              >
                hello@dumbohealth.com
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
