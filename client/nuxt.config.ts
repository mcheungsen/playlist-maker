// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  // Ajoutez ici les configurations pour les variables d'environnement
  runtimeConfig: {
      public: {
        clientId: process.env.NUXT_CLIENT_ID || 'wrong_client_id',
        clientSecret: process.env.NUXT_CLIENT_SECRET,
        redirectUri: process.env.NUXT_REDIRECT_URI,
        scopes: process.env.NUXT_SCOPES,
      },
  }
})