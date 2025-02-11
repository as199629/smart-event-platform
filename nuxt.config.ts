import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@sidebase/nuxt-auth', '@nuxt/image'],
    colorMode: {
        classSuffix: '',
    },
    runtimeConfig: {
        public: {
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
            authBaseURL: process.env.AUTH_BASE_URL || 'http://localhost:3000',
        }
    },
    auth: {
        isEnabled: true,
        disableServerSideAuth: false,
        originEnvKey: 'AUTH_ORIGIN',
        baseURL: process.env.AUTH_BASE_URL || 'http://localhost:3000',
        provider: {
            type: 'authjs',
            trustHost: false,
            defaultProvider: 'google',
            addDefaultCallbackUrl: true
        },
        sessionRefresh: {
          enablePeriodically: true,
          enableOnWindowFocus: true,
        }
      }
})
