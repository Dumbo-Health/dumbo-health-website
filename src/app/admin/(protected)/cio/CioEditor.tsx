"use client";

import { useState } from "react";
import { updateCioAttribute } from "@/app/admin/actions";

type Attr = {
  key: string;
  label: string;
  description: string;
  source: string;
  example_values: string | null;
  enabled: boolean;
};

function AttrRow({ attr }: { attr: Attr }) {
  const [label, setLabel] = useState(attr.label);
  const [description, setDescription] = useState(attr.description);
  const [enabled, setEnabled] = useState(attr.enabled);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = label !== attr.label || description !== attr.description || enabled !== attr.enabled;

  async function save() {
    setSaving(true);
    try {
      await updateCioAttribute(attr.key, { label, description, enabled });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className={`border-b border-gray-100 align-top ${!enabled ? "opacity-50" : ""}`}>
      <td className="px-4 py-3 text-center">
        <button
          onClick={async () => {
            const next = !enabled;
            setEnabled(next);
            setSaving(true);
            try {
              await updateCioAttribute(attr.key, { label, description, enabled: next });
              setSaved(true);
              setTimeout(() => setSaved(false), 1500);
            } finally {
              setSaving(false);
            }
          }}
          className={`w-8 h-5 rounded-full transition-colors relative ${
            enabled ? "bg-[#FF8361]" : "bg-gray-300"
          }`}
          title={enabled ? "Click to disable" : "Click to enable"}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              enabled ? "translate-x-3" : "translate-x-0.5"
            }`}
          />
        </button>
      </td>
      <td className="px-4 py-3">
        <code className="text-xs font-mono text-gray-700">{attr.key}</code>
      </td>
      <td className="px-4 py-3">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#031F3D]"
        />
      </td>
      <td className="px-4 py-3">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#031F3D] resize-none leading-relaxed"
        />
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-gray-500">{attr.source}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs font-mono text-gray-400">{attr.example_values ?? "—"}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={save}
            disabled={saving || !dirty}
            className="bg-[#FF8361] text-white text-xs px-3 py-1 rounded font-medium hover:bg-[#e8714f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {saving ? "..." : "Save"}
          </button>
          {saved && <span className="text-xs text-green-600">Saved</span>}
        </div>
      </td>
    </tr>
  );
}

type EventTab = "all" | "quiz" | "waitlist";

function getEvents(source: string): ("quiz" | "waitlist")[] {
  const s = source.toLowerCase();
  const events: ("quiz" | "waitlist")[] = [];
  if (s.includes("waitlist")) events.push("waitlist");
  if (!s.startsWith("waitlist") || s.includes("quiz")) events.push("quiz");
  return events.length > 0 ? events : ["quiz"];
}

const TAB_LABELS: Record<EventTab, string> = {
  all: "All",
  quiz: "Quiz",
  waitlist: "Waitlist",
};

export default function CioEditor({ attrs }: { attrs: Attr[] }) {
  const [activeTab, setActiveTab] = useState<EventTab>("all");

  const filtered = activeTab === "all" ? attrs : attrs.filter((a) => getEvents(a.source).includes(activeTab));
  const enabled = filtered.filter((a) => a.enabled).length;

  const counts: Record<EventTab, number> = {
    all: attrs.length,
    quiz: attrs.filter((a) => getEvents(a.source).includes("quiz")).length,
    waitlist: attrs.filter((a) => getEvents(a.source).includes("waitlist")).length,
  };

  return (
    <div>
      {/* Event tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
        {(["all", "quiz", "waitlist"] as EventTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors ${
              activeTab === tab
                ? "text-[#031F3D] border-b-2 border-[#FF8361] -mb-px bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {TAB_LABELS[tab]}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-[#FF8361]/10 text-[#FF8361]" : "bg-gray-100 text-gray-400"}`}>
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{enabled}</span> of {filtered.length} attributes enabled
        </span>
        <span className="text-xs text-gray-400">Toggling a field immediately stops or starts sending it to Customer.io.</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wide w-16">On</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Key</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Label</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide w-80">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Examples</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((attr) => (
              <AttrRow key={attr.key} attr={attr} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
