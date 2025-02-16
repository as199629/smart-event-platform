<template>
    <div
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        @click="$emit('close')"
    >
        <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            @click="$emit('close')"
        >
            {{ item.name }}
        </NuxtLink>

        <div class="border-t border-gray-100 my-2"></div>

        <button
            class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            @click="signOut"
        >
            Logout
        </button>
    </div>
</template>

<script setup lang="ts">
    const { signOut } = useFirebaseAuth()
    defineEmits(['close'])

    const menuItems = [
        { name: 'Profile', path: '/profile' },
        { name: 'Orders', path: '/orders' },
        { name: 'Settings', path: '/settings' },
    ]

    onMounted(() => {
        console.log('MenuDropdown mounted')
    })
</script>
