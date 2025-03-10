<template>
    <div class="relative group cursor-pointer">
        <div class="relative pb-[150%] overflow-hidden rounded-md">
            <div
                class="absolute inset-0 w-full h-full transform group-hover:scale-110 transition-transform duration-300"
            >
                <img
                    :src="props.event.image"
                    :alt="props.event.name"
                    class="w-full h-full object-cover rounded-md"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            </div>
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 p-4 translate-y-0 group-hover:-translate-y-1 transition-transform duration-300"
        >
            <span
                class="absolute top-0 left-4 -translate-y-8 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded"
            >
                {{ props.index + 1 }}
            </span>
            <h3 class="text-white font-bold text-base mb-1 line-clamp-1">
                {{ props.event.name }}
            </h3>
            <p class="text-gray-200 text-xs line-clamp-2">
                {{ props.event.description }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        event: any
        index: number
    }>()
</script>
