/** Strip HTML tags and calculate estimated reading time in minutes */
export function calculateReadingTime(content: string | null | undefined): number {
  if (!content) return 1;
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Parse H2 and H3 headings from HTML content */
export function parseHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3;
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    if (!text) continue;
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen.set(base, count + 1);
    headings.push({ id, text, level });
  }
  return headings;
}

/** Inject id attributes into H2/H3 tags in HTML content */
export function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h([23])>/gi, (_, level, attrs, content, closeLevel) => {
    const text = content.replace(/<[^>]*>/g, "").trim();
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen.set(base, count + 1);
    if (attrs.includes("id=")) return `<h${level}${attrs}>${content}</h${closeLevel}>`;
    return `<h${level}${attrs} id="${id}">${content}</h${closeLevel}>`;
  });
}
