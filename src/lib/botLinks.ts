/**
 * Optional per-bot external URLs for "Go to [Bot Name]" after registration.
 * Set VITE_BOT_LINKS in env as JSON: {"digital-iris":"https://...","brain-boost-iris":"https://..."}.
 * Keys must match bot id in botData. If not set or invalid, no link is shown.
 */
let cached: Record<string, string> | null = null;

function parse(): Record<string, string> {
  if (cached !== null) return cached;
  const raw = import.meta.env.VITE_BOT_LINKS;
  if (typeof raw !== "string" || !raw.trim()) {
    cached = {};
    return cached;
  }
  try {
    const obj = JSON.parse(raw) as unknown;
    cached = obj && typeof obj === "object" && !Array.isArray(obj)
      ? (obj as Record<string, string>)
      : {};
    return cached;
  } catch {
    cached = {};
    return cached;
  }
}

export function getBotLink(botId: string): string | undefined {
  const url = parse()[botId];
  return typeof url === "string" && url.startsWith("http") ? url : undefined;
}
