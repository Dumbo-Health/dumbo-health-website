"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export default function UploadPage() {
  const [files, setFiles] = useState<{ name: string; path: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(async (fileList: FileList) => {
    setUploading(true);
    const form = new FormData();
    Array.from(fileList).forEach((f) => form.append("files", f));

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();

    if (data.saved) {
      setFiles((prev) => [
        ...prev,
        ...data.saved.map((p: string) => ({ name: p.split("/").pop()!, path: p })),
      ]);
    }
    setUploading(false);
  }, []);

  return (
    <div className="min-h-screen bg-daylight px-6 py-16 font-body">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 font-heading text-3xl font-medium text-midnight">
          Image Upload
        </h1>
        <p className="mb-8 text-midnight/50">
          Drop images here — they save to the server so Claude can access them.
        </p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
          }}
          className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 ${
            dragging
              ? "border-peach bg-peach/5 scale-[1.01]"
              : "border-midnight/20 bg-white hover:border-peach/50 hover:bg-peach/5"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <svg className="mb-3 h-8 w-8 text-midnight/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p className="text-sm font-medium text-midnight/50">
            {uploading ? "Uploading…" : "Drop images here or click to browse"}
          </p>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => { if (e.target.files) upload(e.target.files); }}
          />
        </div>

        {/* Uploaded files */}
        {files.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-midnight/40">
              Uploaded — {files.length} file{files.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {files.map((f) => (
                <div key={f.path} className="overflow-hidden rounded-xl border border-sunlight bg-white">
                  <div className="relative aspect-square w-full">
                    <Image src={f.path} alt={f.name} fill className="object-cover" />
                  </div>
                  <div className="p-2">
                    <p className="truncate text-xs text-midnight/50">{f.name}</p>
                    <p className="mt-0.5 truncate font-mono text-xs text-teal">{f.path}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
