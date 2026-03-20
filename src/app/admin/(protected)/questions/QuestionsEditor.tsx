"use client";

import { useState, useRef } from "react";
import { updateQuestion, updateAnswerOption } from "@/app/admin/actions";

type Flow = { id: string; slug: string; title: string };
type Section = { id: string; flow_id: string; slug: string; title: string; subtitle: string | null; position: number };
type Question = {
  id: string;
  section_id: string;
  slug: string;
  question_text: string;
  answer_type: string;
  position: number;
  is_required: boolean;
  options: { value: string; label: string }[] | null;
};

function QuestionRow({ question }: { question: Question }) {
  const [text, setText] = useState(question.question_text);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(question.options ?? []);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  // Track last-saved values so dirty check stays stable after revalidatePath refreshes props
  const lastSavedText = useRef(question.question_text);
  const lastSavedOptions = useRef(JSON.stringify(question.options ?? []));

  async function save() {
    setSaving(true);
    setSaveStatus("idle");
    try {
      await updateQuestion(question.id, { text });
      if (options.length > 0) {
        await updateAnswerOption(question.id, options);
      }
      lastSavedText.current = text;
      lastSavedOptions.current = JSON.stringify(options);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Save failed");
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const dirty =
    text !== lastSavedText.current ||
    JSON.stringify(options) !== lastSavedOptions.current;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 text-left transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-mono text-gray-400 shrink-0">#{question.position}</span>
          <span className="text-sm font-medium text-gray-900 truncate">{question.question_text}</span>
          <span className="text-xs text-gray-400 shrink-0 font-mono">{question.slug}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">{question.answer_type}</span>
          <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Question text</label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
            />
          </div>

          {options.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Answer options</label>
              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div key={opt.value} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400 w-28 shrink-0 truncate">{opt.value}</span>
                    <input
                      value={opt.label}
                      onChange={(e) => {
                        const next = options.map((o, idx) =>
                          idx === i ? { ...o, label: e.target.value } : o
                        );
                        setOptions(next);
                      }}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#031F3D]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="bg-[#FF8361] text-white text-sm px-4 py-1.5 rounded-lg font-medium hover:bg-[#e8714f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {saveStatus === "saved" && <span className="text-xs font-medium text-green-600">Saved</span>}
            {saveStatus === "error" && <span className="text-xs font-medium text-red-500">{errorMsg}</span>}
            {dirty && saveStatus === "idle" && <span className="text-xs text-amber-500">Unsaved changes</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuestionsEditor({ flows, sections, questions }: {
  flows: Flow[];
  sections: Section[];
  questions: Question[];
}) {
  const [activeFlow, setActiveFlow] = useState(flows[0]?.id ?? "");

  const flowSections = sections.filter((s) => s.flow_id === activeFlow);

  return (
    <div>
      {flows.length > 1 && (
        <div className="flex gap-2 mb-6">
          {flows.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFlow(f.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFlow === f.id
                  ? "bg-[#031F3D] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-8">
        {flowSections.map((section) => {
          const sectionQuestions = questions
            .filter((q) => q.section_id === section.id)
            .sort((a, b) => a.position - b.position);

          return (
            <div key={section.id}>
              <div className="mb-3">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{section.title}</h2>
                {section.subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5">{section.subtitle}</p>
                )}
              </div>
              <div className="space-y-2">
                {sectionQuestions.map((q) => (
                  <QuestionRow key={q.id} question={q} />
                ))}
                {sectionQuestions.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No questions in this section.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
