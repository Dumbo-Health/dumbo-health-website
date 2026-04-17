const MIDNIGHT = "#031F3D";

export type SummaryStats = {
  totalCount: number;
  checkoutCount: number;
  eligibleCount: number;
  highRiskCount: number;
};

function pct(num: number, total: number): string {
  if (total === 0) return "—";
  return `${((num / total) * 100).toFixed(1)}%`;
}

function StatCard({
  value,
  label,
  sub,
  accent,
}: {
  value: number;
  label: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
      <p
        className="text-2xl font-semibold tabular-nums"
        style={{ color: accent ?? MIDNIGHT }}
      >
        {value.toLocaleString()}
      </p>
      <p className="text-xs font-medium text-gray-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function SubmissionsSummary({
  totalCount,
  checkoutCount,
  eligibleCount,
  highRiskCount,
}: SummaryStats) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard value={totalCount} label="Total submissions" />
      <StatCard
        value={checkoutCount}
        label="Checkout intent"
        sub={`${pct(checkoutCount, totalCount)} of total`}
        accent="#059669"
      />
      <StatCard
        value={eligibleCount}
        label="Eligible states"
        sub={`${pct(eligibleCount, totalCount)} of total`}
        accent="#0891b2"
      />
      <StatCard
        value={highRiskCount}
        label="High risk"
        sub={`${pct(highRiskCount, totalCount)} of total`}
        accent="#dc2626"
      />
    </div>
  );
}
