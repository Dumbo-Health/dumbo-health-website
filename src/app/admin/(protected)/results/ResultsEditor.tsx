"use client";

import { useState } from "react";
import { updateResultsTemplate, updateResultsTemplateBullets } from "@/app/admin/actions";

type Template = {
  id: string;
  flow_id: string;
  block_type: string;
  title: string;
  body: string;
  cta_label: string | null;
  cta_url: string | null;
  conditions: Record<string, unknown>;
  priority: number;
  is_active: boolean;
  bullets: string[];
};

type FlowRef = { id: string; slug: string; title: string };

function TemplateCard({ template, flowName }: { template: Template; flowName: string }) {
  const [title, setTitle] = useState(template.title);
  const [body, setBody] = useState(template.body);
  const [ctaLabel, setCtaLabel] = useState(template.cta_label ?? "");
  const [ctaUrl, setCtaUrl] = useState(template.cta_url ?? "");
  const [bullets, setBullets] = useState<string[]>(template.bullets ?? []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);

  const bulletsStr = bullets.join("\n");
  const origBulletsStr = (template.bullets ?? []).join("\n");

  const dirty =
    title !== template.title ||
    body !== template.body ||
    (ctaLabel || null) !== template.cta_label ||
    (ctaUrl || null) !== template.cta_url ||
    bulletsStr !== origBulletsStr;

  async function save() {
    setSaving(true);
    try {
      await updateResultsTemplate(template.id, {
        title,
        body,
        cta_label: ctaLabel || null,
        cta_url: ctaUrl || null,
      });
      await updateResultsTemplateBullets(template.id, bullets);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  const conditionSummary = Object.keys(template.conditions).length === 0
    ? "Default (no conditions)"
    : JSON.stringify(template.conditions);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 text-left transition-colors"
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-mono text-gray-400">{flowName}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{template.block_type}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400 truncate max-w-[200px]">{conditionSummary}</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{body}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          {!template.is_active && (
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded">inactive</span>
          )}
          <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 bg-gray-50 border-t border-gray-200 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">CTA label</label>
              <input
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="(none)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">CTA URL</label>
              <input
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                placeholder="(none)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
              />
            </div>
          </div>

          {template.block_type === "recommendation" && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Bullets <span className="text-gray-400 font-normal">(one per line)</span>
              </label>
              <textarea
                value={bullets.join("\n")}
                onChange={(e) => setBullets(e.target.value.split("\n"))}
                rows={bullets.length + 1}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D] resize-none"
                placeholder="One bullet per line"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Conditions (read-only)</label>
            <pre className="text-xs font-mono bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-500 overflow-auto">
              {conditionSummary}
            </pre>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="bg-[#FF8361] text-white text-sm px-4 py-1.5 rounded-lg font-medium hover:bg-[#e8714f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            {saved && <span className="text-xs text-green-600">Saved</span>}
            {dirty && !saved && <span className="text-xs text-amber-500">Unsaved changes</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsEditor({
  templates,
  flowMap,
}: {
  templates: Template[];
  flowMap: Record<string, FlowRef>;
}) {
  const [activeFlow, setActiveFlow] = useState<string>("all");

  const flows = Object.values(flowMap);
  const filtered = activeFlow === "all"
    ? templates
    : templates.filter((t) => t.flow_id === activeFlow);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveFlow("all")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeFlow === "all"
              ? "bg-[#031F3D] text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          All ({templates.length})
        </button>
        {flows.map((f) => {
          const count = templates.filter((t) => t.flow_id === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFlow(f.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFlow === f.id
                  ? "bg-[#031F3D] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {f.title} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            flowName={flowMap[t.flow_id]?.title ?? t.flow_id.slice(0, 8)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 italic">No results templates for this flow.</p>
        )}
      </div>
    </div>
  );
}
