// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  vite: {
    optimizeDeps: {
      include: ["@directus/sdk", "fedapay"],
    },
  },
  runtimeConfig: {
    staticTokenPrivate: "",
    fedapayToken: "",
    fedapayMode: "",
    public: {
      staticToken: "",
      directusUrl: "",
    },
  },
  fonts: {
    provider: "google",
  },
});
