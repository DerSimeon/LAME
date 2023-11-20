// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      msal: {
        auth: {
          clientId: 'd2e30981-7324-4a6a-9eeb-d3057c91a29a',
          authority: 'https://login.microsoftonline.com/0b3fc178-b730-4e8b-9843-e81259237b77',
        },
      }
    }
  }
})