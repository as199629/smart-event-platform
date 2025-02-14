<template>
    <div class="min-h-screen flex flex-col">
        <Navbar v-if="!isHomePage" />
        <main :class="['flex-grow', { 'pt-16': !isHomePage }]">
            <NuxtPage />
        </main>
        <Footer v-if="!isHomePage" />
        <!-- Global Login Modal -->
        <LoginModal
            v-if="authStore.showLoginModal"
            @close="authStore.closeLoginModal()"
        />
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import Navbar from '@/components/navbar/Navbar.vue'
    import Footer from '~/components/Footer.vue'

    import LoginModal from '@/components/ui/LoginModal.vue'

    const route = useRoute()
    const isHomePage = computed(() => route.name === 'index') // 假設首頁的路由名稱是 'home'
    const authStore = useAuthStore()
    useHead({
        title: 'Taiwan Smart Event Platform',
        meta: [
            {
                name: 'description',
                content: 'Taiwan Smart Event Platform',
            },
            {
                property: 'og:description',
                content: 'Taiwan Smart Event Platform',
            },
            {
                property: 'og:title',
                content: 'TaiwanSmart – Bringing Taiwan to the World',
            },
            { property: 'og:url', content: 'https://www.taiwanplus.com/' },
            { property: 'og:type', content: 'WebSite' },
            {
                property: 'og:image',
                content: '/assets/img/socialMedia_ShareImg.webp',
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            {
                name: 'twitter:title',
                content: 'TaiwanPlus – Bringing Taiwan to the World',
            },
            {
                name: 'twitter:description',
                content:
                    'Your source of news, culture, and infotainment from Taiwan, a voice of freedom in Asia. Watch our 24/7 live stream.',
            },
            {
                name: 'twitter:image',
                content: '/assets/img/socialMedia_ShareImg.webp',
            },
            {
                property: 'article:author',
                content: 'https://www.facebook.com/taiwanplusmedia',
            },
            {
                property: 'article:publisher',
                content: 'https://www.facebook.com/taiwanplusmedia',
            },
        ],
    })
</script>
