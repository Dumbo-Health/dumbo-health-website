import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type Submission = {
  id: string;
  created_at: string;
  email: string | null;
  flow_slug: string;
  risk_score: number;
  state: string | null;
  insurance: string | null;
  device_type: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

const RISK_COLORS: Record<string, string> = {
  high:     "bg-red-100 text-red-700",
  moderate: "bg-amber-100 text-amber-700",
  low:      "bg-green-100 text-green-700",
};

function getRiskLevel(score: number) {
  if (score >= 6) return "high";
  if (score >= 3) return "moderate";
  return "low";
}

export default async function SubmissionsPage() {
  const sb = createAdminClient();
  const { data: submissions, error } = await sb
    .from("quiz_submissions")
    .select("id, created_at, email, flow_slug, risk_score, state, insurance, device_type, utm_source, utm_medium, utm_campaign")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Submissions</h1>
        <p className="text-sm text-red-500">Error loading submissions: {error.message}</p>
      </div>
    );
  }

  const rows = (submissions ?? []) as Submission[];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Submissions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Last 200 quiz completions with email. Read-only.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Flow</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Risk</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">State</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Device</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">UTM Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">UTM Campaign</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const riskLevel = getRiskLevel(row.risk_score);
              const date = new Date(row.created_at);
              return (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                    <span className="text-gray-400">{date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">{row.email ?? <span className="text-gray-400 italic">anonymous</span>}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">{row.flow_slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${RISK_COLORS[riskLevel]}`}>
                      {riskLevel} ({row.risk_score})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.state ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.device_type}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.utm_source ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.utm_campaign ?? "—"}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-400">
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{rows.length} submissions shown</p>
    </div>
  );
}
