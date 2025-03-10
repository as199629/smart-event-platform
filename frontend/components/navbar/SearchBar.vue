<template>
    <div class="relative">
        <input
            v-model="localValue"
            type="text"
            :placeholder="$t('navbar.search')"
            class="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-200 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            style="width: 100%; max-width: 256px"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </span>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        modelValue: string
    }

    const props = defineProps<Props>()
    const emit = defineEmits(['update:modelValue'])

    const localValue = computed({
        get: () => props.modelValue,
        set: value => emit('update:modelValue', value),
    })
</script>
