const ITEMS = [
  { label: "HIPAA-Compliant" },
  { label: "Works with Most CPAP Devices" },
  { label: "Month-to-Month, Cancel Anytime" },
  { label: "Real Clinical Support" },
  { label: "Nightly Data Monitoring" },
  { label: "No New Hardware Needed" },
  { label: "Proactive Clinician Check-Ins" },
  { label: "FSA / HSA Eligible" },
  { label: "Free Shipping on Every Plan" },
  { label: "Prescription Renewals Handled" },
];

export function SupportMarquee() {
  return (
    <section
      className="overflow-hidden py-4"
      style={{
        backgroundColor: "#031F3D",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-8">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="flex items-center gap-2"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: "#78BFBC" }}
            />
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "rgba(252,246,237,0.55)", whiteSpace: "nowrap" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
