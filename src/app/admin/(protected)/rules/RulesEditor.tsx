"use client";

import { useState } from "react";
import { updateRule } from "@/app/admin/actions";

type Rule = {
  id: string;
  flow_id: string;
  source_question_id: string;
  condition: Record<string, unknown>;
  action_type: string;
  action_value: Record<string, unknown>;
  priority: number;
};

type QuestionRef = { id: string; slug: string; question_text: string };

function RuleRow({ rule, question }: { rule: Rule; question: QuestionRef | undefined }) {
  const [condition, setCondition] = useState(JSON.stringify(rule.condition, null, 2));
  const [actionType, setActionType] = useState(rule.action_type);
  const [actionValue, setActionValue] = useState(JSON.stringify(rule.action_value, null, 2));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty =
    condition !== JSON.stringify(rule.condition, null, 2) ||
    actionType !== rule.action_type ||
    actionValue !== JSON.stringify(rule.action_value, null, 2);

  async function save() {
    setError(null);
    let parsedCondition: Record<string, unknown>;
    let parsedActionValue: Record<string, unknown>;
    try {
      parsedCondition = JSON.parse(condition);
      parsedActionValue = JSON.parse(actionValue);
    } catch {
      setError("Invalid JSON in condition or action value.");
      return;
    }
    setSaving(true);
    try {
      await updateRule(rule.id, {
        condition: parsedCondition,
        action_type: actionType,
        action_value: parsedActionValue,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 align-top">
      <td className="px-4 py-3 w-48">
        <p className="text-xs font-mono text-gray-600">{question?.slug ?? rule.source_question_id.slice(0, 8)}</p>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{question?.question_text}</p>
      </td>
      <td className="px-4 py-3 w-48">
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#031F3D] resize-none"
        />
      </td>
      <td className="px-4 py-3 w-36">
        <input
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#031F3D]"
        />
      </td>
      <td className="px-4 py-3 w-48">
        <textarea
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#031F3D] resize-none"
        />
      </td>
      <td className="px-4 py-3 text-center text-xs text-gray-500">{rule.priority}</td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="bg-[#FF8361] text-white text-xs px-3 py-1 rounded font-medium hover:bg-[#e8714f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {saving ? "..." : "Save"}
          </button>
          {saved && <span className="text-xs text-green-600">Saved</span>}
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </td>
    </tr>
  );
}

export default function RulesEditor({
  rules,
  questionMap,
}: {
  rules: Rule[];
  questionMap: Record<string, QuestionRef>;
}) {
  const [search, setSearch] = useState("");

  const filtered = rules.filter((r) => {
    const q = questionMap[r.source_question_id];
    const term = search.toLowerCase();
    return (
      !term ||
      q?.slug.includes(term) ||
      r.action_type.includes(term) ||
      JSON.stringify(r.condition).includes(term) ||
      JSON.stringify(r.action_value).includes(term)
    );
  });

  return (
    <div>
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by question slug, action type, condition..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Question</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Condition (JSON)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Action type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Action value (JSON)</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rule) => (
              <RuleRow key={rule.id} rule={rule} question={questionMap[rule.source_question_id]} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                  No rules match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{filtered.length} of {rules.length} rules shown</p>
    </div>
  );
}
