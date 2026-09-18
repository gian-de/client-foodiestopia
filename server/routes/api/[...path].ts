import { defineEventHandler, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const base = String(config.public.BASE_API_URL).replace(/\/$/, "");

  return proxyRequest(event, `${base}${event.path}`);
});
