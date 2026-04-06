import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type WaitlistEntry = {
  id: string;
  created_at: string;
  email: string;
  state: string;
  interest: string;
  source: string;
  environment: string;
};

const INTEREST_COLORS: Record<string, string> = {
  cash:      "bg-teal-100 text-teal-700",
  insurance: "bg-blue-100 text-blue-700",
};

export default async function WaitlistPage() {
  const sb = createAdminClient();
  const { data: entries, error } = await sb
    .from("waitlist")
    .select("id, created_at, email, state, interest, source, environment")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Waitlist</h1>
        <p className="text-sm text-red-500">Error loading waitlist: {error.message}</p>
      </div>
    );
  }

  const rows = (entries ?? []) as WaitlistEntry[];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Waitlist</h1>
        <p className="text-sm text-gray-500 mt-1">
          State expansion interest. Last 500 entries.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">State</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Interest</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Environment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const date = new Date(row.created_at);
              return (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                    <span className="text-gray-400">{date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">{row.email}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.state}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${INTEREST_COLORS[row.interest] ?? "bg-gray-100 text-gray-700"}`}>
                      {row.interest}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.source}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.environment}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                  No waitlist entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{rows.length} entries shown</p>
    </div>
  );
}
