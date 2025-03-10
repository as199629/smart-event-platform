<template>
    <div class="relative">
        <!-- User Avatar Button -->
        <button
            @click="toggleMenu"
            class="flex items-center space-x-2 hover:opacity-80"
        >
            <img
                :src="props.userProfile.avatar"
                :alt="props.userProfile.name"
                class="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <span class="text-gray-700">{{ props.userProfile.name }}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <MenuDropdown v-if="isMenuOpen" @close="closeMenu" />
    </div>
</template>

<script setup lang="ts">
    interface Props {
        userProfile: {
            name: string
            avatar: string
        }
    }

    const props = defineProps<Props>()
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
        isMenuOpen.value = false
    }

    // Close menu when clicking outside
    // onClickOutside(isMenuOpen, () => {
    //     isMenuOpen.value = false
    // })
</script>
