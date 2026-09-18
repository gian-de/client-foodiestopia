export function mediaUrl(baseUrl: string, path: string | null | undefined) {
  if (!baseUrl || !path) return "";
  const origin = baseUrl.replace(/\/$/, "");
  const relative = path.replace(/^\//, "");
  return `${origin}/${relative}`;
}
