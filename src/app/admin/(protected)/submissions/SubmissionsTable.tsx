"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MIDNIGHT = "#031F3D";
const SUNLIGHT = "#F5E6D1";

const RISK_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  moderate: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const RISK_LEGEND = "Score: 0–2 low · 3–5 moderate · 6+ high";

function getRiskLevel(score: number) {
  if (score >= 6) return "high";
  if (score >= 3) return "moderate";
  return "low";
}

export type SubmissionRow = {
  id: string;
  created_at: string;
  email: string | null;
  flow_slug: string;
  risk_score: number;
  state: string | null;
  device_type: string;
  utm_source: string | null;
  utm_campaign: string | null;
  answers: Record<string, unknown>;
  tags: string[] | null;
  checkout_cta_clicked_at: string | null;
};

export type QuestionMeta = {
  slug: string;
  question_text: string;
  options: { label: string; value: string }[];
};

function formatAnswer(
  value: unknown,
  options: { label: string; value: string }[]
): string {
  const map = new Map(options.map((o) => [o.value, o.label]));
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? (map.get(v) ?? v) : String(v)))
      .join(", ");
  }
  if (typeof value === "string") return map.get(value) ?? value;
  return String(value ?? "—");
}

export default function SubmissionsTable({
  rows,
  questions,
  page,
  totalPages,
  totalCount,
}: {
  rows: SubmissionRow[];
  questions: QuestionMeta[];
  page: number;
  totalPages: number;
  totalCount: number;
}) {
  const [selected, setSelected] = useState<SubmissionRow | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const questionMap = new Map(questions.map((q) => [q.slug, q]));

  function goToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Checkout</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Risk</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">State</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Flow</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Device</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">UTM Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">UTM Campaign</th>
              <th className="px-4 py-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const riskLevel = getRiskLevel(row.risk_score);
              const date = new Date(row.created_at);
              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-amber-50 cursor-pointer transition-colors"
                  onClick={() => setSelected(row)}
                >
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                    <span className="text-gray-400">
                      {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    <span className="underline decoration-dotted underline-offset-2 text-gray-700">
                      {row.email ?? <span className="text-gray-400 italic no-underline">anonymous</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {row.checkout_cta_clicked_at ? (
                      <span
                        title="Clicked the checkout CTA — does not confirm purchase"
                        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 cursor-help"
                      >
                        ✓ CTA clicked
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${RISK_COLORS[riskLevel]}`}>
                      {riskLevel} ({row.risk_score})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.state ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
                      {row.flow_slug}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.device_type}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.utm_source ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{row.utm_campaign ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">›</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-sm text-gray-400">
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">
            Page {page} of {totalPages} · {totalCount} total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSelected(null)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col transition-transform duration-300"
        style={{
          background: "#fff",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
          transform: selected ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {selected && (
          <>
            {/* Header */}
            <div
              className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0"
              style={{ background: SUNLIGHT }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: MIDNIGHT }}>
                  {selected.email ?? "Anonymous"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(selected.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" · "}
                  {new Date(selected.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs font-mono bg-white/70 px-2 py-0.5 rounded border border-gray-200">
                    {selected.flow_slug}
                  </span>
                  <span
                    title={RISK_LEGEND}
                    className={`text-xs font-medium px-2 py-0.5 rounded-full cursor-help ${RISK_COLORS[getRiskLevel(selected.risk_score)]}`}
                  >
                    {getRiskLevel(selected.risk_score)} risk ({selected.risk_score})
                  </span>
                  {selected.state && (
                    <span className="text-xs text-gray-500">{selected.state}</span>
                  )}
                  {selected.checkout_cta_clicked_at && (
                    <span
                      title="Clicked the checkout CTA — does not confirm purchase"
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 cursor-help"
                    >
                      ✓ CTA clicked
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2" title={RISK_LEGEND}>
                  {RISK_LEGEND}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded shrink-0"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15 5L5 15M5 5l10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Tags */}
            {(selected.tags ?? []).length > 0 && (
              <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap gap-1.5 shrink-0">
                {(selected.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Answers */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
                Responses
              </p>
              <div className="space-y-4">
                {Object.entries(selected.answers ?? {}).map(([slug, value]) => {
                  const q = questionMap.get(slug);
                  const label = q?.question_text ?? slug;
                  const formatted = q
                    ? formatAnswer(value, q.options)
                    : Array.isArray(value)
                    ? value.join(", ")
                    : String(value ?? "—");
                  return (
                    <div key={slug} className="border-b border-gray-50 pb-3 last:border-0">
                      <p className="text-xs text-gray-400 mb-0.5 leading-snug">{label}</p>
                      <p className="text-sm font-medium" style={{ color: MIDNIGHT }}>
                        {formatted || "—"}
                      </p>
                    </div>
                  );
                })}
                {Object.keys(selected.answers ?? {}).length === 0 && (
                  <p className="text-sm text-gray-400">No answers recorded.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
