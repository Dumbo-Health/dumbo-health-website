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
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export type AnswerCount = { value: string; label: string; count: number };
export type QuestionStat = { slug: string; question_text: string; answers: AnswerCount[] };
type TagStat = { tag: string; count: number };
type RiskStat = { label: string; count: number };
type DeviceStat = { device: string; count: number };
type TrendPoint = { date: string; count: number };

export type FlowStats = {
  total: number;
  questions: QuestionStat[];
  tags: TagStat[];
  risk: RiskStat[];
  devices: DeviceStat[];
  trend: TrendPoint[];
};

export type AnalyticsData = {
  diagnosed: FlowStats;
  undiagnosed: FlowStats;
};

const PEACH = "#FF8361";
const TEAL = "#78BFBC";
const MIDNIGHT = "#031F3D";
const SUNLIGHT = "#F5E6D1";

const RISK_COLORS: Record<string, string> = {
  Low: "#86efac",
  Moderate: "#fcd34d",
  High: "#f87171",
};

type Tab = "diagnosed" | "undiagnosed" | "comparison";

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-semibold" style={{ color: MIDNIGHT }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function QuestionChart({ q, color }: { q: QuestionStat; color: string }) {
  const max = Math.max(...q.answers.map((a) => a.count), 1);
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>{q.question_text}</p>
      <ResponsiveContainer width="100%" height={Math.max(120, q.answers.length * 40)}>
        <BarChart
          data={q.answers}
          layout="vertical"
          margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
        >
          <XAxis type="number" domain={[0, max]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="label"
            width={180}
            tick={{ fontSize: 12, fill: "#374151" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            formatter={(val) => [val, "responses"]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {q.answers.map((_, i) => (
              <Cell key={i} fill={i === 0 ? color : `${color}60`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function FlowView({ flow, color }: { flow: FlowStats; color: string }) {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Submissions" value={flow.total} />
        <StatCard label="High risk" value={flow.risk.find((r) => r.label === "High")?.count ?? 0} sub="risk score ≥ 6" />
        <StatCard label="Top tag" value={flow.tags[0]?.tag ?? "—"} sub={flow.tags[0] ? `${flow.tags[0].count} times` : undefined} />
        <StatCard label="Mobile %" value={flow.devices.length ? `${Math.round(((flow.devices.find((d) => d.device === "mobile")?.count ?? 0) / flow.total) * 100)}%` : "—"} />
      </div>

      {/* Trend */}
      {flow.trend.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Submissions — last 30 days</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={flow.trend} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(d: string) => d.slice(5)} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="count" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Per-question charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flow.questions.map((q) => (
          <QuestionChart key={q.slug} q={q} color={color} />
        ))}
      </div>

      {/* Tags + Risk side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flow.tags.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Top tags</p>
            <ResponsiveContainer width="100%" height={Math.max(120, flow.tags.length * 30)}>
              <BarChart
                data={flow.tags.map((t) => ({ name: t.tag, count: t.count }))}
                layout="vertical"
                margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill={color} radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {flow.risk.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Risk distribution</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={flow.risk.filter((r) => r.count > 0)}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ label, percent }: { label?: string; percent?: number }) =>
                    `${label ?? ""} ${Math.round((percent ?? 0) * 100)}%`
                  }
                  labelLine={false}
                >
                  {flow.risk.map((r, i) => (
                    <Cell key={i} fill={RISK_COLORS[r.label] ?? "#e5e7eb"} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonView({ data }: { data: AnalyticsData }) {
  const total = data.diagnosed.total + data.undiagnosed.total;
  const volumeData = [
    { name: "Diagnosed", value: data.diagnosed.total, fill: PEACH },
    { name: "Undiagnosed", value: data.undiagnosed.total, fill: TEAL },
  ];

  return (
    <div className="space-y-6">
      {/* Volume stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Total submissions" value={total} />
        <StatCard label="Diagnosed" value={data.diagnosed.total} sub={total ? `${Math.round((data.diagnosed.total / total) * 100)}% of total` : undefined} />
        <StatCard label="Undiagnosed" value={data.undiagnosed.total} sub={total ? `${Math.round((data.undiagnosed.total / total) * 100)}% of total` : undefined} />
      </div>

      {/* Volume donut */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Flow volume</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={volumeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              label={({ name, percent }: { name?: string; percent?: number }) =>
                `${name ?? ""} ${Math.round((percent ?? 0) * 100)}%`
              }
            >
              {volumeData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Legend iconType="circle" iconSize={10} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Trend comparison */}
      {(data.diagnosed.trend.length > 1 || data.undiagnosed.trend.length > 1) && (() => {
        const allDates = Array.from(
          new Set([
            ...data.diagnosed.trend.map((t) => t.date),
            ...data.undiagnosed.trend.map((t) => t.date),
          ])
        ).sort();
        const dxMap = new Map(data.diagnosed.trend.map((t) => [t.date, t.count]));
        const udxMap = new Map(data.undiagnosed.trend.map((t) => [t.date, t.count]));
        const combined = allDates.map((date) => ({
          date,
          Diagnosed: dxMap.get(date) ?? 0,
          Undiagnosed: udxMap.get(date) ?? 0,
        }));
        return (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Submission trend — last 30 days</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={combined} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false}
                  tickFormatter={(d: string) => d.slice(5)} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconType="circle" iconSize={10} />
                <Line type="monotone" dataKey="Diagnosed" stroke={PEACH} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Undiagnosed" stroke={TEAL} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })()}

      {/* High risk comparison */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-sm font-medium mb-4" style={{ color: MIDNIGHT }}>Risk level comparison</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={["Low", "Moderate", "High"].map((label) => ({
              label,
              Diagnosed: data.diagnosed.risk.find((r) => r.label === label)?.count ?? 0,
              Undiagnosed: data.undiagnosed.risk.find((r) => r.label === label)?.count ?? 0,
            }))}
            margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="label" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Legend iconType="circle" iconSize={10} />
            <Bar dataKey="Diagnosed" fill={PEACH} radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Undiagnosed" fill={TEAL} radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const [tab, setTab] = useState<Tab>("diagnosed");

  const tabs: { id: Tab; label: string }[] = [
    { id: "diagnosed", label: "Diagnosed" },
    { id: "undiagnosed", label: "Undiagnosed" },
    { id: "comparison", label: "Comparison" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6 w-fit"
        style={{ background: SUNLIGHT }}
      >
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
                background: tab === t.id
                  ? (t.id === "diagnosed" ? `${PEACH}20` : t.id === "undiagnosed" ? `${TEAL}20` : "#f3f4f6")
                  : "rgba(3,31,61,0.07)",
                color: tab === t.id
                  ? (t.id === "diagnosed" ? PEACH : t.id === "undiagnosed" ? TEAL : MIDNIGHT)
                  : "rgba(3,31,61,0.4)",
              }}
            >
              {t.id === "diagnosed" ? data.diagnosed.total
                : t.id === "undiagnosed" ? data.undiagnosed.total
                : data.diagnosed.total + data.undiagnosed.total}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "diagnosed" && <FlowView flow={data.diagnosed} color={PEACH} />}
      {tab === "undiagnosed" && <FlowView flow={data.undiagnosed} color={TEAL} />}
      {tab === "comparison" && <ComparisonView data={data} />}
    </div>
  );
}
