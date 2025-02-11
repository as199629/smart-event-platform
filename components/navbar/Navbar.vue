<template>
    <nav
        class="bg-white fixed top-0 left-0 w-full z-20 border-b border-gray-100"
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
            </div>

            <!-- Desktop Navigation -->
            <DesktopNav
                :is-logged-in="isLoggedIn"
                :user-profile="userProfile"
                @login="loginModal = true"
            />

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
            @update:is-open="isMenuOpen = $event"
            :search-query="searchQuery"
        />

        <!-- Login Modal -->
        <LoginModal v-if="loginModal" @close="loginModal = false" />
    </nav>
</template>

<script setup lang="ts">
    // Import components
    import DesktopNav from './DesktopNav.vue'
    import MobileNav from './MobileNav.vue'
    import SearchBar from './SearchBar.vue'
    import LoginModal from '@/components/ui/LoginModal.vue'

    // ... existing state management code ...

    // Only keep the core state and logic in the main component
    const searchQuery = ref('')
    const isMenuOpen = ref(false)
    const loginModal = ref(false)
    const isLoggedIn = ref(true)

    const userProfile = {
        name: 'Eric',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    }

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    // ... other necessary core functions ...
</script>
