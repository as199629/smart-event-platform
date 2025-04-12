<template>
    <div class="hidden md:flex items-center space-x-4">
        <!-- Navigation Links -->
        <nav class="flex items-center space-x-4">
            <NuxtLink
                v-for="link in navigationLinks"
                :key="link.path"
                :to="link.path"
                class="text-gray-600 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
            >
                {{ link.name }}
            </NuxtLink>
        </nav>
        <select
            v-model="selectedLanguage"
            class="px-2 py-1 bg-primary-600 dark:bg-primary-400 rounded-lg border border-primary-700 dark:border-primary-400 hover:bg-black hover:text-white dark:bg-black dark:hover:text-white dark:text-gray-100"
            @change="changeLanguage(selectedLanguage)"
        >
            <option class="dark:text-gray-900" value="en">English</option>
            <option class="dark:text-gray-900" value="zh-tw">中文</option>
            <option class="dark:text-gray-900" value="ja">日本語</option>
        </select>
        <ModeSwitch />
        <!-- User Section -->
        <div v-if="authStore.isAuthenticated" class="relative">
            <button
                class="flex items-center space-x-2"
                @click="isUserMenuOpen = !isUserMenuOpen"
            >
                <img
                    :src="authStore.user.avatar"
                    :alt="authStore.user.name"
                    class="w-8 h-8 rounded-full object-cover"
                />
                <span class="text-gray-800 dark:text-gray-100">
                    {{ authStore.user.name }}
                </span>
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
            class="px-2 py-1 bg-primary-600 rounded-lg border border-primary-700 hover:bg-black hover:text-white"
            @click="$emit('login')"
        >
            {{ $t('navbar.login') }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import MenuDropdown from './MenuDropdown.vue'
    import ModeSwitch from './ModeSwitch.vue'

    const authStore = useAuthStore()
    defineEmits(['login'])

    const { navigationLinks } = useNavigation()
    const isUserMenuOpen = ref(false)
    const { locale, setLocale } = useI18n()
    console.log(locale.value)

    const selectedLanguage = ref(locale.value)

    const changeLanguage = (value: string) => {
        setLocale(value as 'en' | 'zh-tw' | 'ja')
    }
</script>
