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
import type { AnalyticsData, FlowStats, QuestionStat } from "./AnalyticsDashboard";
import type { FunnelData, FunnelFlowStats, FunnelStep } from "./FunnelDashboard";

// ── Brand constants ───────────────────────────────────────────────────────────

const PEACH = "#FF8361";
const TEAL = "#78BFBC";
const MIDNIGHT = "#031F3D";
const SUNLIGHT = "#F5E6D1";

const RISK_COLORS: Record<string, string> = {
  Low: "#86efac",
  Moderate: "#fcd34d",
  High: "#f87171",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "undiagnosed" | "diagnosed" | "compare";

interface AnalyticsShellProps {
  data: AnalyticsData;
  funnelData: FunnelData;
  totalCount?: number;
  subsCount: number;
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-semibold" style={{ color: accent ?? MIDNIGHT }}>
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold" style={{ color: MIDNIGHT }}>
        {title}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── StepList — pure HTML/CSS funnel step rows ─────────────────────────────────

function StepList({ steps, starts }: { steps: FunnelStep[]; starts: number }) {
  if (steps.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white px-5 py-8 text-center">
        <p className="text-sm text-gray-400">No step data yet.</p>
        <p className="text-xs text-gray-300 mt-1">
          Events will appear here once users start the quiz.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header row */}
      <div
        className="grid px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-gray-400 border-b border-gray-100"
        style={{ gridTemplateColumns: "2rem 1fr 200px 4.5rem 4.5rem" }}
      >
        <span>#</span>
        <span>Question</span>
        <span>Reached</span>
        <span className="text-right">Count</span>
        <span className="text-right">Drop</span>
      </div>

      {steps.map((step, i) => {
        const barPct = starts > 0 ? (step.reached / starts) * 100 : 0;
        const isHigh = step.drop_pct > 30;
        const isMod = step.drop_pct > 15;
        const barColor = isHigh ? "#f87171" : isMod ? "#fcd34d" : TEAL;
        const badgeBg = isHigh ? "#fee2e2" : isMod ? "#fef3c7" : "#dcfce7";
        const badgeColor = isHigh ? "#dc2626" : isMod ? "#d97706" : "#16a34a";

        return (
          <div
            key={step.question_slug}
            className="grid px-4 py-3 border-t border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
            style={{ gridTemplateColumns: "2rem 1fr 200px 4.5rem 4.5rem" }}
          >
            {/* Step number */}
            <span className="text-xs font-mono text-gray-300">{i + 1}</span>

            {/* Question */}
            <div className="pr-4 min-w-0">
              <p className="text-sm text-gray-800 leading-snug truncate">
                {step.question_text}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{step.question_slug}</p>
            </div>

            {/* Bar */}
            <div className="h-5 rounded-full overflow-hidden" style={{ background: "#f3f4f6" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${barPct}%`,
                  background: barColor,
                  minWidth: barPct > 0 ? 4 : 0,
                }}
              />
            </div>

            {/* Count */}
            <p className="text-right text-sm font-medium" style={{ color: MIDNIGHT }}>
              {step.reached.toLocaleString()}
            </p>

            {/* Drop % badge */}
            <div className="flex justify-end">
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-mono font-semibold"
                style={{ background: badgeBg, color: badgeColor }}
              >
                ↓{step.drop_pct}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── AnswersSection — collapsible, worst 3 auto-expanded ───────────────────────

function AnswersSection({
  flow,
  funnelFlow,
  color,
}: {
  flow: FlowStats;
  funnelFlow: FunnelFlowStats;
  color: string;
}) {
  const worstSlugs = new Set(
    funnelFlow.steps
      .filter((s) => s.reached >= 5)
      .sort((a, b) => b.drop_pct - a.drop_pct)
      .slice(0, 3)
      .map((s) => s.question_slug)
  );

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(worstSlugs));

  if (flow.questions.length === 0) return null;

  function toggle(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {flow.questions.map((q: QuestionStat) => {
        const isOpen = expanded.has(q.slug);
        const isWorst = worstSlugs.has(q.slug);
        const totalResponses = q.answers.reduce((s, a) => s + a.count, 0);

        return (
          <div
            key={q.slug}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggle(q.slug)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isWorst && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-red-400" />
                )}
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: MIDNIGHT }}
                >
                  {q.question_text}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-xs text-gray-400 font-mono">
                  {totalResponses.toLocaleString()} responses
                </span>
                <span className="text-gray-300 text-xs">{isOpen ? "▲" : "▼"}</span>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="pt-4">
                  <ResponsiveContainer
                    width="100%"
                    height={Math.max(120, q.answers.length * 40)}
                  >
                    <BarChart
                      data={q.answers}
                      layout="vertical"
                      margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
                    >
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                      />
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
                        contentStyle={{
                          fontSize: 12,
                          borderRadius: 8,
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
                        {q.answers.map((_, idx) => (
                          <Cell key={idx} fill={idx === 0 ? color : `${color}60`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── DemographicsGrid — inline bar rows, no Recharts ───────────────────────────

function DemographicsGrid({ flow, color }: { flow: FlowStats; color: string }) {
  const deviceTotal = flow.devices.reduce((s, d) => s + d.count, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Risk distribution */}
      {flow.risk.some((r) => r.count > 0) && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold mb-0.5" style={{ color: MIDNIGHT }}>
            Risk distribution
          </p>
          <p className="text-xs text-gray-400 mb-4">
            High ≥ 6 &middot; Moderate 3–5 &middot; Low &lt; 3
          </p>
          <div className="space-y-2.5">
            {flow.risk.map((r) => {
              const pct = flow.total > 0 ? Math.round((r.count / flow.total) * 100) : 0;
              return (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="text-xs w-16 text-gray-600">{r.label}</span>
                  <div
                    className="flex-1 h-4 rounded-full overflow-hidden"
                    style={{ background: "#f3f4f6" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: RISK_COLORS[r.label] ?? "#e5e7eb" }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-20 text-right">
                    {r.count.toLocaleString()} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top tags */}
      {flow.tags.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold mb-0.5" style={{ color: MIDNIGHT }}>
            Top tags
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Auto-assigned based on quiz answers and risk score
          </p>
          <div className="space-y-2">
            {flow.tags.slice(0, 8).map((t) => {
              const pct = flow.total > 0 ? Math.round((t.count / flow.total) * 100) : 0;
              return (
                <div key={t.tag} className="flex items-center gap-3">
                  <span className="text-xs w-28 truncate text-gray-600" title={t.tag}>
                    {t.tag}
                  </span>
                  <div
                    className="flex-1 h-3 rounded-full overflow-hidden"
                    style={{ background: "#f3f4f6" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-10 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Geographic reach */}
      {flow.states.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold mb-0.5" style={{ color: MIDNIGHT }}>
            Geographic reach
          </p>
          <p className="text-xs text-gray-400 mb-4">
            States where quiz takers are located
          </p>
          <div className="space-y-2">
            {flow.states.slice(0, 10).map((s) => {
              const pct = flow.total > 0 ? Math.round((s.count / flow.total) * 100) : 0;
              return (
                <div key={s.state} className="flex items-center gap-3">
                  <span className="text-xs w-8 font-mono text-gray-600">{s.state}</span>
                  <div
                    className="flex-1 h-3 rounded-full overflow-hidden"
                    style={{ background: "#f3f4f6" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-20 text-right">
                    {s.count.toLocaleString()} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Device split */}
      {deviceTotal > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold mb-0.5" style={{ color: MIDNIGHT }}>
            Device split
          </p>
          <p className="text-xs text-gray-400 mb-4">How people take the quiz</p>
          <div className="space-y-2.5">
            {flow.devices.map((d) => {
              const pct = deviceTotal > 0 ? Math.round((d.count / deviceTotal) * 100) : 0;
              return (
                <div key={d.device} className="flex items-center gap-3">
                  <span className="text-xs w-16 capitalize text-gray-600">{d.device}</span>
                  <div
                    className="flex-1 h-4 rounded-full overflow-hidden"
                    style={{ background: "#f3f4f6" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-20 text-right">
                    {d.count.toLocaleString()} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── FlowView — per-flow panel ─────────────────────────────────────────────────

function FlowView({
  flow,
  funnelFlow,
  color,
  isCapped,
}: {
  flow: FlowStats;
  funnelFlow: FunnelFlowStats;
  color: string;
  isCapped: boolean;
}) {
  const isHighDrop = (funnelFlow.top_drop_pct ?? 0) > 30;
  const isModDrop = (funnelFlow.top_drop_pct ?? 0) > 15;

  return (
    <div className="space-y-8">
      {/* Friction callout */}
      {funnelFlow.top_drop_question_text && isModDrop && (
        <div
          className="rounded-xl px-5 py-4 border-l-4"
          style={{
            background: isHighDrop ? "#fef2f2" : "#fffbeb",
            borderLeftColor: isHighDrop ? "#ef4444" : "#f59e0b",
          }}
        >
          <p
            className="text-xs font-mono uppercase tracking-widest mb-1"
            style={{ color: isHighDrop ? "#dc2626" : "#d97706" }}
          >
            Biggest friction point
          </p>
          <p className="text-sm font-semibold leading-snug mb-0.5" style={{ color: MIDNIGHT }}>
            &ldquo;{funnelFlow.top_drop_question_text}&rdquo;
          </p>
          <p className="text-sm text-gray-500">
            {funnelFlow.top_drop_pct}% of users who reach this question don&apos;t continue.
          </p>
        </div>
      )}

      {/* § Performance */}
      <section>
        <SectionHeader
          title="Performance"
          sub="Funnel last 30 days · submissions all time"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Submissions"
            value={flow.total.toLocaleString()}
            sub={isCapped ? "most recent 2,000" : "all time"}
          />
          <StatCard
            label="Quiz starts"
            value={funnelFlow.starts.toLocaleString()}
            sub="last 30 days"
          />
          <StatCard
            label="Completion rate"
            value={`${funnelFlow.completion_pct}%`}
            sub="start → submit"
            accent={
              funnelFlow.completion_pct >= 50
                ? "#16a34a"
                : funnelFlow.completion_pct >= 25
                ? "#d97706"
                : "#dc2626"
            }
          />
          <StatCard
            label="Buy clicks"
            value={funnelFlow.buy_clicks > 0 ? funnelFlow.buy_clicks.toLocaleString() : "—"}
            sub={funnelFlow.buy_clicks > 0 ? "last 30 days" : undefined}
          />
        </div>
      </section>

      {/* § Where people drop off */}
      {funnelFlow.starts > 0 && (
        <section>
          <SectionHeader
            title="Where people drop off"
            sub="Each row is one quiz question · bar = % of starters who reached it · ↓ = % who dropped after answering"
          />
          <StepList steps={funnelFlow.steps} starts={funnelFlow.starts} />

          {funnelFlow.common_paths.length > 0 && (
            <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-sm font-medium mb-1" style={{ color: MIDNIGHT }}>
                Common abandonment routes
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Step sequences taken by users who left before completing
              </p>
              <div className="space-y-2">
                {funnelFlow.common_paths.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0"
                  >
                    <code className="text-xs text-gray-600 flex-1 truncate">{p.path}</code>
                    <span
                      className="text-xs font-semibold shrink-0"
                      style={{ color: MIDNIGHT }}
                    >
                      {p.count} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* § What people are answering */}
      {flow.questions.length > 0 && (
        <section>
          <SectionHeader
            title="What people are answering"
            sub="Click any question to expand · red dot = high drop-off at that question in funnel · worst 3 auto-expanded"
          />
          <AnswersSection flow={flow} funnelFlow={funnelFlow} color={color} />
        </section>
      )}

      {/* § Submission trend */}
      {flow.trend.length > 1 && (
        <section>
          <SectionHeader title="Submission trend" sub="Daily volume — last 30 days" />
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <ResponsiveContainer width="100%" height={140}>
              <LineChart
                data={flow.trend}
                margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(d: string) => d.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* § Who's taking it */}
      <section>
        <SectionHeader
          title="Who's taking it"
          sub="Demographic breakdown from all-time submissions"
        />
        <DemographicsGrid flow={flow} color={color} />
      </section>
    </div>
  );
}

// ── CompareView ───────────────────────────────────────────────────────────────

function CompareView({
  data,
  funnelData,
}: {
  data: AnalyticsData;
  funnelData: FunnelData;
}) {
  const total = data.diagnosed.total + data.undiagnosed.total;

  const allDates = Array.from(
    new Set([
      ...data.diagnosed.trend.map((t) => t.date),
      ...data.undiagnosed.trend.map((t) => t.date),
    ])
  ).sort();
  const dxMap = new Map(data.diagnosed.trend.map((t) => [t.date, t.count]));
  const udxMap = new Map(data.undiagnosed.trend.map((t) => [t.date, t.count]));
  const combinedTrend = allDates.map((date) => ({
    date,
    Diagnosed: dxMap.get(date) ?? 0,
    Undiagnosed: udxMap.get(date) ?? 0,
  }));

  return (
    <div className="space-y-8">
      {/* § Volume */}
      <section>
        <SectionHeader title="Volume" sub="Submissions all time · quiz starts last 30 days" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total submissions" value={total.toLocaleString()} sub="all time" />
          <StatCard
            label="Diagnosed"
            value={data.diagnosed.total.toLocaleString()}
            sub={total ? `${Math.round((data.diagnosed.total / total) * 100)}% of total` : undefined}
          />
          <StatCard
            label="Undiagnosed"
            value={data.undiagnosed.total.toLocaleString()}
            sub={
              total
                ? `${Math.round((data.undiagnosed.total / total) * 100)}% of total`
                : undefined
            }
          />
          <StatCard
            label="Total quiz starts"
            value={(
              funnelData.diagnosed.starts + funnelData.undiagnosed.starts
            ).toLocaleString()}
            sub="last 30 days"
          />
        </div>
      </section>

      {/* § Funnel completion */}
      {(funnelData.diagnosed.starts > 0 || funnelData.undiagnosed.starts > 0) && (
        <section>
          <SectionHeader title="Funnel completion" sub="Quiz start → submit — last 30 days" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(["diagnosed", "undiagnosed"] as const).map((flowKey) => {
              const fd = funnelData[flowKey];
              const flowColor = flowKey === "diagnosed" ? PEACH : TEAL;
              return (
                <div key={flowKey} className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs font-mono uppercase tracking-widest mb-1 text-gray-400">
                    {flowKey === "diagnosed" ? "Diagnosed" : "Undiagnosed"}
                  </p>
                  <p
                    className="text-3xl font-semibold mb-0.5"
                    style={{
                      color:
                        fd.completion_pct >= 50
                          ? "#16a34a"
                          : fd.completion_pct >= 25
                          ? "#d97706"
                          : "#dc2626",
                    }}
                  >
                    {fd.completion_pct}%
                  </p>
                  <p className="text-xs text-gray-400">
                    {fd.completions} of {fd.starts} starts
                  </p>
                  {fd.top_drop_question_text && (
                    <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-50">
                      Top drop:{" "}
                      <span className="font-medium">
                        &ldquo;{fd.top_drop_question_text}&rdquo;
                      </span>{" "}
                      ({fd.top_drop_pct}%)
                    </p>
                  )}
                  <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "#f3f4f6" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${fd.completion_pct}%`, background: flowColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* § Risk comparison */}
      <section>
        <SectionHeader
          title="Risk comparison"
          sub="High ≥ 6 · Moderate 3–5 · Low < 3"
        />
        <div className="bg-white rounded-xl border border-gray-100 p-5">
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
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend iconType="circle" iconSize={10} />
              <Bar dataKey="Diagnosed" fill={PEACH} radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Undiagnosed" fill={TEAL} radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* § Volume donut */}
      {total > 0 && (
        <section>
          <SectionHeader title="Submission split" sub="All-time volume by flow" />
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Diagnosed", value: data.diagnosed.total, fill: PEACH },
                    { name: "Undiagnosed", value: data.undiagnosed.total, fill: TEAL },
                  ]}
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
                  {[PEACH, TEAL].map((fill, i) => (
                    <Cell key={i} fill={fill} />
                  ))}
                </Pie>
                <Legend iconType="circle" iconSize={10} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* § Submission trend */}
      {combinedTrend.length > 1 && (
        <section>
          <SectionHeader title="Submission trend" sub="Daily volume by flow — last 30 days" />
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart
                data={combinedTrend}
                margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(d: string) => d.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend iconType="circle" iconSize={10} />
                <Line
                  type="monotone"
                  dataKey="Diagnosed"
                  stroke={PEACH}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Undiagnosed"
                  stroke={TEAL}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </div>
  );
}

// ── AnalyticsShell — top-level exported component ─────────────────────────────

export default function AnalyticsShell({
  data,
  funnelData,
  totalCount,
  subsCount,
}: AnalyticsShellProps) {
  const [tab, setTab] = useState<Tab>("undiagnosed");

  const isCapped = subsCount >= 2000 && (totalCount ?? 0) > 2000;

  const tabs: { id: Tab; label: string; color: string; count: number | null }[] = [
    {
      id: "undiagnosed",
      label: "Undiagnosed",
      color: TEAL,
      count: funnelData.undiagnosed.starts,
    },
    {
      id: "diagnosed",
      label: "Diagnosed",
      color: PEACH,
      count: funnelData.diagnosed.starts,
    },
    { id: "compare", label: "Compare", color: MIDNIGHT, count: null },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* ── Header + segment selector ─────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: MIDNIGHT }}>
            Analytics
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {isCapped ? (
              <>
                Showing most recent {subsCount.toLocaleString()} of{" "}
                {(totalCount ?? 0).toLocaleString()} submissions
                <span className="mx-1.5 text-gray-300">·</span>
                <span className="text-amber-500 font-medium">capped</span>
              </>
            ) : (
              `${subsCount.toLocaleString()} submissions all time`
            )}
            <span className="mx-1.5 text-gray-300">·</span>
            funnel last 30 days
          </p>
        </div>

        <div
          className="flex gap-1 p-1 rounded-xl shrink-0"
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
              {t.count !== null && (
                <span
                  className="ml-2 text-xs font-mono px-1.5 py-0.5 rounded-full"
                  style={{
                    background: tab === t.id ? `${t.color}20` : "rgba(3,31,61,0.07)",
                    color: tab === t.id ? t.color : "rgba(3,31,61,0.4)",
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      {tab === "undiagnosed" && (
        <FlowView
          flow={data.undiagnosed}
          funnelFlow={funnelData.undiagnosed}
          color={TEAL}
          isCapped={isCapped}
        />
      )}
      {tab === "diagnosed" && (
        <FlowView
          flow={data.diagnosed}
          funnelFlow={funnelData.diagnosed}
          color={PEACH}
          isCapped={isCapped}
        />
      )}
      {tab === "compare" && <CompareView data={data} funnelData={funnelData} />}
    </div>
  );
}
