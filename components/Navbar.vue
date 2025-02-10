<template>
    <nav class="bg-transparent fixed top-0 left-0 w-full z-10 md:static">
        <div class="container mx-auto flex justify-between items-center p-4">
            <div class="text-white font-semibold text-2xl">
                Smart Event Platform
            </div>
            <div class="hidden md:flex space-x-8">
                <NuxtLink
                    to="/home"
                    class="text-white hover:text-yellow-500 transition-colors"
                >
                    Home
                </NuxtLink>
                <NuxtLink
                    to="/events"
                    class="text-white hover:text-yellow-500 transition-colors"
                >
                    Event Management
                </NuxtLink>
                <NuxtLink
                    to="/statistics"
                    class="text-white hover:text-yellow-500 transition-colors"
                >
                    Data Analysis
                </NuxtLink>
            </div>
            <div class="md:hidden">
                <button
                    class="text-white focus:outline-none"
                    @click="toggleMenu"
                >
                    <svg
                        class="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        <div
            v-show="isMenuOpen"
            class="md:hidden bg-gray-800 text-white w-full absolute top-0 left-0 p-4"
        >
            <NuxtLink
                to="/"
                class="block py-2 hover:text-yellow-500"
                @click="closeMenu"
            >
                Home
            </NuxtLink>
            <NuxtLink
                to="/lottery"
                class="block py-2 hover:text-yellow-500"
                @click="closeMenu"
            >
                Event Management
            </NuxtLink>
            <NuxtLink
                to="/statistics"
                class="block py-2 hover:text-yellow-500"
                @click="closeMenu"
            >
                Data Analysis
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    // Manage menu state for mobile view
    const isMenuOpen = ref(false)

    // Toggle menu visibility on mobile
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    // Close menu after selecting a link
    const closeMenu = () => {
        isMenuOpen.value = false
    }
</script>

<style scoped>
    /* Custom styles */
    nav {
        background-color: rgba(0, 0, 0, 0.6);
    }

    /* Make the navbar stick to the top only on mobile */
    .container {
        position: relative;
        z-index: 10;
    }

    /* Only for mobile view */
    .md\:static {
        position: static !important;
    }

    /* Make links stand out with hover effect */
    .text-white:hover {
        color: #facc15; /* yellow color */
    }

    /* Mobile menu styles */
    .md:hidden {
        display: block;
    }
</style>
