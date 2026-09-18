export function useApiBase() {
  const config = useRuntimeConfig();
  const externalBase = String(config.public.BASE_API_URL || "").replace(
    /\/$/,
    ""
  );

  // In dev, call same-origin `/api/*` so Nitro's devProxy avoids CORS issues
  // when the app runs on a port other than 3000 (e.g. 3001).
  const apiBase = import.meta.dev ? "" : externalBase;

  function apiUrl(path: string) {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return apiBase ? `${apiBase}${normalized}` : normalized;
  }

  return {
    apiBase,
    assetBase: externalBase,
    apiUrl,
  };
}
