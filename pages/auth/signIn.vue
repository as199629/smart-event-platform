<script setup lang="ts">
    const { signIn, isAuthenticated } = useAuth()
    const router = useRouter()

    watchEffect(() => {
        if (isAuthenticated.value) {
            router.push('/')
        }
    })
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-6 text-center dark:text-white">
                登入
            </h1>
            <button
                @click="signIn"
                class="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-50"
            >
                <Icon name="logos:google-icon" class="w-5 h-5" />
                使用 Google 登入
            </button>
        </div>
    </div>
</template>
