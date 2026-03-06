interface ComparisonRow {
  feature: string;
  traditional: boolean;
  dumbo: boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "Test from home", traditional: false, dumbo: true },
  { feature: "Results in 48 hours", traditional: false, dumbo: true },
  { feature: "Affordable pricing", traditional: false, dumbo: true },
  { feature: "No insurance required", traditional: false, dumbo: true },
  { feature: "Telehealth support", traditional: false, dumbo: true },
  { feature: "Automatic resupply", traditional: false, dumbo: true },
  { feature: "Personalized dashboard", traditional: false, dumbo: true },
  { feature: "Long wait times", traditional: true, dumbo: false },
  { feature: "Hidden fees", traditional: true, dumbo: false },
  { feature: "In-person visits required", traditional: true, dumbo: false },
];

function CheckIcon() {
  return (
    <svg className="mx-auto h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="mx-auto h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ComparisonTable() {
  return (
    <section className="bg-sunlight py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-teal">
            The difference
          </p>
          <h2 className="mt-2 font-heading text-3xl font-medium text-midnight md:text-[40px]">
            Traditional vs Dumbo Health
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-sunlight bg-white">
          <div className="grid grid-cols-[1fr_100px_100px] items-center border-b border-sunlight px-6 py-4 sm:grid-cols-[1fr_120px_120px]">
            <span className="font-body text-sm font-bold text-midnight">Feature</span>
            <span className="text-center font-mono text-xs uppercase tracking-wider text-midnight/40">Traditional</span>
            <span className="text-center font-mono text-xs uppercase tracking-wider text-peach">Dumbo</span>
          </div>
          {comparisonData.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_100px_100px] items-center border-b border-sunlight/50 px-6 py-3.5 last:border-0 sm:grid-cols-[1fr_120px_120px]"
            >
              <span className="font-body text-sm text-midnight">{row.feature}</span>
              <div className="text-center">
                {row.traditional ? <CheckIcon /> : <XIcon />}
              </div>
              <div className="text-center">
                {row.dumbo ? <CheckIcon /> : <XIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
