"use client";

import { useState } from "react";
import { updateSignalCopy } from "@/app/admin/actions";

type Signal = {
  id: string;
  signal_key: string;
  label: string;
  detail: string;
  icon_path: string;
};

function SignalCard({ signal }: { signal: Signal }) {
  const [label, setLabel] = useState(signal.label);
  const [detail, setDetail] = useState(signal.detail);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = label !== signal.label || detail !== signal.detail;

  async function save() {
    setSaving(true);
    try {
      await updateSignalCopy(signal.id, { label, detail });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FCF6ED] flex items-center justify-center shrink-0">
          <img src={signal.icon_path} alt="" className="w-4 h-4 object-contain opacity-80" />
        </div>
        <span className="text-xs font-mono text-gray-400">{signal.signal_key}</span>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Detail text</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
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

export default function SignalCopyEditor({ signals }: { signals: Signal[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
      {signals.length === 0 && (
        <p className="text-sm text-gray-400 italic">No signals found.</p>
      )}
    </div>
  );
}
