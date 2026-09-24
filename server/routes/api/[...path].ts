import { defineEventHandler, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const base = String(
    import.meta.dev
      ? config.public.developmentApiUrl || "http://localhost:5001"
      : config.public.productionApiUrl || "https://api.foodiestopia.com"
  ).replace(/\/$/, "");

  return proxyRequest(event, `${base}${event.path}`);
});
