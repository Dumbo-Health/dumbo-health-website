import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files received" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const saved: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = file.name.replace(/\s+/g, "-");
    await writeFile(path.join(uploadDir, filename), buffer);
    saved.push(`/uploads/${filename}`);
  }

  return NextResponse.json({ saved });
}
