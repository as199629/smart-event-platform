<template>
    <div class="max-w-4xl mx-auto p-5">
        <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>
        <form class="space-y-6" @submit.prevent="updateProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <NuxtImg
                        :src="user.avatar"
                        alt="avatar"
                        class="w-20 h-20 rounded-full"
                    />
                    <input
                        id="avatar"
                        type="file"
                        class="mt-1 block w-full"
                        placeholder="Upload your avatar"
                    />
                </div>
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Name:
                    </label>
                    <input
                        id="name"
                        v-model="user.name"
                        type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your name"
                    />
                    <p v-if="!user.name" class="text-red-500 text-xs italic">
                        Please enter your name.
                    </p>
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
                    <p v-if="!user.gender" class="text-red-500 text-xs italic">
                        Please select your gender.
                    </p>
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        v-model="user.email"
                        type="email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                    />
                    <p v-if="!user.email" class="text-red-500 text-xs italic">
                        Please enter your email.
                    </p>
                </div>
                <div>
                    <label
                        for="address"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Address:
                    </label>
                    <input
                        id="address"
                        v-model="user.address"
                        type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your address"
                    />
                    <p v-if="!user.address" class="text-red-500 text-xs italic">
                        Please enter your address.
                    </p>
                </div>
                <div>
                    <label
                        for="birthdate"
                        class="block text-sm font-medium text-gray-700"
                    >
                        Birthdate:
                    </label>
                    <VueDatePicker
                        v-model="user.birthdate"
                        placeholder="Choose your birthdate"
                        :format="format"
                    />
                    <p
                        v-if="!user.birthdate"
                        class="text-red-500 text-xs italic"
                    >
                        Please choose your birthdate.
                    </p>
                </div>
                <div>
                    <label
                        for="idNumber"
                        class="block text-sm font-medium text-gray-700"
                    >
                        ID Number:
                    </label>
                    <input
                        id="idNumber"
                        v-model="user.idNumber"
                        type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your ID number"
                    />
                    <p
                        v-if="!user.idNumber"
                        class="text-red-500 text-xs italic"
                    >
                        Please enter your ID number.
                    </p>
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
                            id="emergencyName"
                            v-model="emergencyContact.name"
                            type="text"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter emergency contact name"
                        />
                        <p
                            v-if="!emergencyContact.name"
                            class="text-red-500 text-xs italic"
                        >
                            Please enter your emergency contact name.
                        </p>
                    </div>
                    <div>
                        <label
                            for="emergencyPhone"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Phone:
                        </label>
                        <input
                            id="emergencyPhone"
                            v-model="emergencyContact.phone"
                            type="tel"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter emergency contact phone"
                        />
                        <p
                            v-if="!emergencyContact.phone"
                            class="text-red-500 text-xs italic"
                        >
                            Please enter your emergency contact phone.
                        </p>
                    </div>
                    <div>
                        <label
                            for="emergencyRelationship"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Relationship:
                        </label>
                        <select
                            id="emergencyRelationship"
                            v-model="emergencyContact.relationship"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="family">Family</option>
                            <option value="friend">Friend</option>
                            <option value="spouse">Spouse</option>
                            <option value="partner">Partner</option>
                        </select>
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
        <ui-error-modal
            v-if="showErrorModal"
            :message="errorMessage"
            @close="showErrorModal = false"
        />
    </div>
</template>

<script lang="ts" setup>
    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'
    definePageMeta({
        middleware: ['auth'],
    })
    const format = ref('yyyy-MM-dd')

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
    const emergencyContact = ref({
        name: '',
        phone: '',
        relationship: 'family',
    })

    const showErrorModal = ref(false)
    const errorMessage = ref('')

    const updateProfile = () => {
        const missingFields = []
        if (!user.value.name) missingFields.push('Name')
        if (!user.value.email) missingFields.push('Email')
        if (!user.value.gender) missingFields.push('Gender')
        if (!user.value.address) missingFields.push('Address')
        if (!user.value.birthdate) missingFields.push('Birthdate')
        if (!user.value.idNumber) missingFields.push('ID Number')
        if (!emergencyContact.value.name)
            missingFields.push('Emergency Contact Name')
        if (!emergencyContact.value.phone)
            missingFields.push('Emergency Contact Phone')
        if (!emergencyContact.value.relationship)
            missingFields.push('Emergency Contact Relationship')

        if (missingFields.length > 0) {
            errorMessage.value = `Please fill out the following fields:${missingFields.join(
                ', '
            )}.`
            showErrorModal.value = true
            return
        }
        console.log('Profile updated:', user.value)
        // API call to update user profile
    }
</script>

<style scoped>
    /* Tailwind CSS is utility-first, so most styling is done in the template. */
</style>
