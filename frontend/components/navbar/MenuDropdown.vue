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
            {{ $t(item.name) }}
        </NuxtLink>

        <div class="border-t border-gray-100 my-2" />

        <button
            class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            @click="signOut"
        >
            {{ $t('logout') }}
        </button>
    </div>
</template>

<script setup lang="ts">
    import { useAuthActions } from '@/plugins/firebase'

    const { signOut } = useAuthActions()
    defineEmits(['close'])

    const menuItems = [
        { name: 'nav.profile', path: '/user/profile' },
        { name: 'nav.orders', path: '/user/orders' },
    ]

    onMounted(() => {
        console.log('MenuDropdown mounted')
    })
</script>
