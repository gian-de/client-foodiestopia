// https://nuxt.com/docs/api/configuration/nuxt-config
const apiUrl =
  process.env.BASE_API_URL || "https://api.foodiestopia.com";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: { BASE_API_URL: apiUrl },
  },
});
