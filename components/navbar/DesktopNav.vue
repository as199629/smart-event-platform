<template>
    <div class="hidden md:flex items-center space-x-4">
        <!-- Navigation Links -->
        <nav class="flex items-center space-x-4">
            <NuxtLink
                v-for="link in navigationLinks"
                :key="link.path"
                :to="link.path"
                class="text-gray-600 hover:text-gray-900"
            >
                {{ link.name }}
            </NuxtLink>
        </nav>

        <!-- User Section -->
        <div v-if="isLoggedIn" class="relative">
            <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center space-x-2"
            >
                <img
                    :src="userProfile.avatar"
                    :alt="userProfile.name"
                    class="w-8 h-8 rounded-full object-cover"
                />
                <span class="text-gray-700">{{ userProfile.name }}</span>
            </button>

            <!-- User Dropdown Menu -->
            <MenuDropdown
                v-if="isUserMenuOpen"
                @close="isUserMenuOpen = false"
            />
        </div>

        <!-- Login Button -->
        <button
            v-else
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            @click="$emit('login')"
        >
            Login
        </button>
    </div>
</template>

<script setup lang="ts">
    import MenuDropdown from './MenuDropdown.vue'
    interface Props {
        isLoggedIn: boolean
        userProfile: {
            name: string
            avatar: string
        }
    }

    defineProps<Props>()
    defineEmits(['login'])

    const { navigationLinks } = useNavigation()
    const isUserMenuOpen = ref(false)
</script>
