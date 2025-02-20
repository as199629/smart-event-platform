<template>
    <nav
        class="fixed top-0 left-0 w-full z-20 border-b border-gray-100 bg-white dark:bg-gray-800 dark:text-white"
    >
        <div class="container mx-auto flex items-center justify-between p-3">
            <!-- Logo Section -->
            <div class="flex items-center space-x-4">
                <NuxtLink to="/" class="text-black font-bold text-xl">
                    <NuxtImg
                        src="/imgs/logo.jpg"
                        alt="Logo"
                        class="w-10 h-10"
                        width="40"
                        height="40"
                    />
                </NuxtLink>
                <SearchBar v-model="searchQuery" />
                <WeatherWidget class="hidden lg:flex" />
            </div>

            <!-- Desktop Navigation -->
            <DesktopNav @login="authStore.openLoginModal()" />

            <!-- Mobile Menu Button -->
            <button class="md:hidden text-gray-700" @click="toggleMenu">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>

        <!-- Mobile Navigation -->
        <MobileNav
            :is-open="isMenuOpen"
            :search-query="searchQuery"
            @update:is-open="isMenuOpen = $event"
        />
    </nav>
</template>

<script setup lang="ts">
    // Import components
    import DesktopNav from './DesktopNav.vue'
    import MobileNav from './MobileNav.vue'
    import SearchBar from './SearchBar.vue'
    import WeatherWidget from './WeatherWidget.vue'

    const authStore = useAuthStore()
    const searchQuery = ref('')
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    // ... other necessary core functions ...
</script>
