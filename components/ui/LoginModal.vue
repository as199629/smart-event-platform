<template>
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
        />

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
            >
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h3
                                    id="modal-title"
                                    class="text-base font-semibold text-gray-900"
                                >
                                    Login
                                </h3>
                                <div class="mt-2">
                                    <button
                                        type="button"
                                        class="inline-flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50 sm:w-auto"
                                        :disabled="isLoading"
                                        @click="handleSignIn"
                                    >
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google logo"
                                            class="mr-2 h-5 w-5"
                                        />
                                        {{
                                            isLoading
                                                ? 'Signing in...'
                                                : 'Continue with Google'
                                        }}
                                    </button>
                                    <p
                                        v-if="error"
                                        class="mt-2 text-sm text-red-600"
                                    >
                                        {{ error }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                    >
                        <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            @click="handleClose"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Import the useAuthActions composable to get signIn
    import { useAuthActions } from '@/plugins/firebase'

    const { signIn } = useAuthActions()
    const emit = defineEmits(['close'])

    // Add state management
    const isLoading = ref(false)
    const error = ref('')

    const handleSignIn = async () => {
        try {
            isLoading.value = true
            error.value = ''
            await signIn()
        } catch (e) {
            error.value = 'Failed to sign in. Please try again.'
            console.error('Sign in error:', e)
        } finally {
            isLoading.value = false
        }
    }

    const handleClose = () => {
        emit('close')
    }
</script>
