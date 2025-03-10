<template>
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <h2 class="text-xl font-bold">Error</h2>
            <hr class="my-2 border-gray-300" />
            <div class="flex justify-center items-center">
                <p>{{ props.message }}</p>
            </div>
            <div class="flex justify-end">
                <button
                    class="mt-4 p-2 bg-red-500 text-white rounded-lg"
                    @click="close"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['close'])
    const props = defineProps({
        message: String,
    })

    const close = () => {
        emit('close')
    }
</script>

<style scoped>
    /* Add your styles here */
</style>
