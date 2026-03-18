"use client";

import { useState } from "react";
import { updateResultStep } from "@/app/admin/actions";

type Step = {
  id: string;
  flow_slug: string;
  step_order: number;
  title: string;
  body: string;
};

function StepCard({ step }: { step: Step }) {
  const [title, setTitle] = useState(step.title);
  const [body, setBody] = useState(step.body);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = title !== step.title || body !== step.body;

  async function save() {
    setSaving(true);
    try {
      await updateResultStep(step.id, { title, body });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-[#FF8361]/10 border border-[#FF8361]/25 flex items-center justify-center text-[#FF8361] font-semibold text-sm">
          {step.step_order}
        </span>
        <span className="text-xs font-mono text-gray-400">{step.flow_slug}</span>
      </div>

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
  );
}

export default function StepsEditor({ steps }: { steps: Step[] }) {
  const flowSlugs = [...new Set(steps.map((s) => s.flow_slug))];

  return (
    <div className="space-y-8">
      {flowSlugs.map((slug) => (
        <div key={slug}>
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">{slug}</p>
          <div className="space-y-3">
            {steps
              .filter((s) => s.flow_slug === slug)
              .sort((a, b) => a.step_order - b.step_order)
              .map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
          </div>
        </div>
      ))}
      {steps.length === 0 && (
        <p className="text-sm text-gray-400 italic">No steps found.</p>
      )}
    </div>
  );
}
