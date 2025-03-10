export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ["@/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxt/icon',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@formkit/auto-animate',
        '@nuxtjs/sitemap',
    ],
    runtimeConfig: {
        public: {
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
        },
    },
    i18n: {
        langDir: 'lang',
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en.json',
            },
            {
                code: 'zh-tw',
                iso: 'zh-TW',
                file: 'zh-tw.json',
            },
            {
                code: 'ja',
                iso: 'ja-JP',
                file: 'ja.json',
            },
        ],
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
    },
})
