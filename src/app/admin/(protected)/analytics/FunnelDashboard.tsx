"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const PEACH = "#FF8361";
const TEAL = "#78BFBC";
const MIDNIGHT = "#031F3D";
const SUNLIGHT = "#F5E6D1";

export type FunnelStep = {
  question_slug: string;
  section_slug: string | null;
  question_index: number;
  reached: number;
  dropped_after: number;
  drop_pct: number;
};

export type FunnelFlowStats = {
  flow_slug: string;
  starts: number;
  completions: number;
  completion_pct: number;
  buy_clicks: number;
  steps: FunnelStep[];
  top_drop_question: string | null;
  top_drop_section: string | null;
  common_paths: { path: string; count: number }[];
};

export type FunnelData = {
  diagnosed: FunnelFlowStats;
  undiagnosed: FunnelFlowStats;
};

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-semibold" style={{ color: accent ?? MIDNIGHT }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function FlowFunnel({ flow, color }: { flow: FunnelFlowStats; color: string }) {
  if (flow.starts === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-sm text-gray-400">
        No funnel data yet. Events will appear here once users start the quiz.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Started" value={flow.starts} />
        <StatCard label="Completed" value={flow.completions} />
        <StatCard
          label="Completion rate"
          value={`${flow.completion_pct}%`}
          sub="quiz start → submit"
          accent={flow.completion_pct >= 50 ? "#22c55e" : flow.completion_pct >= 25 ? "#f59e0b" : "#ef4444"}
        />
        <StatCard
          label="Buy clicks"
          value={flow.buy_clicks > 0 ? flow.buy_clicks : "—"}
          sub={flow.flow_slug === "undiagnosed" ? "clicked Buy your test" : "page not yet live"}
        />
      </div>

      {/* Step-by-step funnel chart */}
      {flow.steps.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-medium mb-1" style={{ color: MIDNIGHT }}>Drop-off by question</p>
          <p className="text-xs text-gray-400 mb-4">How many sessions answered each question (red = high drop-off)</p>
          <ResponsiveContainer width="100%" height={Math.max(200, flow.steps.length * 36)}>
            <BarChart
              data={flow.steps.map((s) => ({
                name: s.question_slug,
                reached: s.reached,
              }))}
              layout="vertical"
              margin={{ top: 0, right: 60, bottom: 0, left: 0 }}
            >
              <XAxis type="number" domain={[0, flow.starts]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={200}
                tick={{ fontSize: 11, fill: "#374151" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                formatter={(val) => [val ?? 0, "sessions reached"] as [number, string]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
              />
              <Bar dataKey="reached" radius={[0, 4, 4, 0]} maxBarSize={24}>
                {flow.steps.map((s, i) => (
                  <Cell
                    key={i}
                    fill={s.drop_pct > 30 ? "#f87171" : s.drop_pct > 15 ? "#fcd34d" : color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Step-by-step table */}
      {flow.steps.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: SUNLIGHT }}>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-gray-500">Question</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-gray-500">Section</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-gray-500">Reached</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-gray-500">Dropped after</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-gray-500">Drop %</th>
              </tr>
            </thead>
            <tbody>
              {flow.steps.map((step, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{step.question_slug}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{step.section_slug ?? "—"}</td>
                  <td className="px-4 py-3 text-right text-sm font-medium" style={{ color: MIDNIGHT }}>{step.reached}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500">{step.dropped_after}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-mono font-semibold"
                      style={{
                        background: step.drop_pct > 30 ? "#fee2e2" : step.drop_pct > 15 ? "#fef3c7" : "#dcfce7",
                        color: step.drop_pct > 30 ? "#dc2626" : step.drop_pct > 15 ? "#d97706" : "#16a34a",
                      }}
                    >
                      {step.drop_pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Common abandonment routes */}
      {flow.common_paths.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-medium mb-1" style={{ color: MIDNIGHT }}>Common abandonment routes</p>
          <p className="text-xs text-gray-400 mb-4">Paths taken by users who left before completing</p>
          <div className="space-y-2">
            {flow.common_paths.map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                <code className="text-xs text-gray-600 flex-1 truncate">{p.path}</code>
                <span className="text-xs font-semibold shrink-0" style={{ color: MIDNIGHT }}>{p.count} sessions</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FunnelDashboard({ data }: { data: FunnelData }) {
  const [tab, setTab] = useState<"diagnosed" | "undiagnosed">("undiagnosed");

  const tabs = [
    { id: "undiagnosed" as const, label: "Undiagnosed", color: TEAL },
    { id: "diagnosed" as const, label: "Diagnosed", color: PEACH },
  ];

  const activeFlow = data[tab];
  const activeColor = tab === "undiagnosed" ? TEAL : PEACH;

  return (
    <div>
      <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ background: SUNLIGHT }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? MIDNIGHT : "rgba(3,31,61,0.5)",
              boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {t.label}
            <span
              className="ml-2 text-xs font-mono px-1.5 py-0.5 rounded-full"
              style={{
                background: tab === t.id ? `${t.color}20` : "rgba(3,31,61,0.07)",
                color: tab === t.id ? t.color : "rgba(3,31,61,0.4)",
              }}
            >
              {data[t.id].starts}
            </span>
          </button>
        ))}
      </div>
      <FlowFunnel flow={activeFlow} color={activeColor} />
    </div>
  );
}
