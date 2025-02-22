// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    rootAttrs: { dir: "rtl" },
    head: {
      link: [
        {
          href: "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css",
          rel: "stylesheet",
          type: "text/css",
        }
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', "nuxt-time",],
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    api_v1: process.env.NUXT_BACKAEND_URL + "/api/v1",
    public: {
      backend_url: process.env.NUXT_BACKAEND_URL,
    }
  }
})