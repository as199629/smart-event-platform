<template>
    <div class="max-w-4xl mx-auto p-5">
        <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>
        <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <NuxtImg
                        :src="user.avatar"
                        alt="avatar"
                        class="w-20 h-20 rounded-full"
                    />
                    <input type="file" id="avatar" class="mt-1 block w-full" />
                </div>
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        v-model="user.name"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        for="gender"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Gender:
                    </label>
                    <select
                        id="gender"
                        v-model="user.gender"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        v-model="user.email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        for="address"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Address:
                    </label>
                    <input
                        type="text"
                        id="address"
                        v-model="user.address"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        for="birthdate"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Birthdate:
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        v-model="user.birthdate"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        for="idNumber"
                        class="block text-sm font-medium text-gray-700"
                    >
                        ID Number:
                    </label>
                    <input
                        type="text"
                        id="idNumber"
                        v-model="user.idNumber"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <div>
                <h2 class="text-xl font-semibold mt-6 mb-4">
                    Emergency Contact
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            for="emergencyName"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="emergencyName"
                            v-model="emergencyContact.name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            for="emergencyPhone"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Phone:
                        </label>
                        <input
                            type="tel"
                            id="emergencyPhone"
                            v-model="emergencyContact.phone"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Update
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ['auth'],
    })

    const authStore = useAuthStore()
    const user = ref({
        name: authStore.user.name,
        email: authStore.user.email,
        gender: '',
        address: '',
        birthdate: '',
        idNumber: '',
        avatar: authStore.user.avatar,
    })
    const emergencyContact = ref({ name: '', phone: '' })

    // function handleAvatarChange(event: Event) {
    //     const file = (event.target as HTMLInputElement).files?.[0]
    //     if (file) {
    //         user.value.avatar = URL.createObjectURL(file)
    //     }
    // }

    function updateProfile() {
        console.log('Profile updated:', user.value)
        // API call to update user profile
    }
</script>

<style scoped>
    /* Tailwind CSS is utility-first, so most styling is done in the template. */
</style>
