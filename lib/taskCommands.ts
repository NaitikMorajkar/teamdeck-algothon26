export type ParsedTaskCommand = { title: string; assigneeName?: string };
export function parseTaskCommand(body: string): ParsedTaskCommand | null {
  const match = body.trim().match(/^\/task\s+(.+?)(?:\s+@([\w-]+))?$/i);
  if (!match) return null;
  return { title: match[1].trim(), assigneeName: match[2] };
}
export function parseMentions(body: string): string[] { return Array.from(new Set(Array.from(body.matchAll(/@([\w-]+)/g), (m) => m[1]))); }
