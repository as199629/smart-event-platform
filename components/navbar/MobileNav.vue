<template>
    <div v-show="isOpen" class="md:hidden fixed inset-0 bg-white z-30">
        <div class="container mx-auto p-2">
            <!-- Close Button -->
            <button
                class="absolute top-4 right-4"
                @click="$emit('update:isOpen', false)"
            >
                <Icon name="heroicons:x-mark" />
            </button>

            <!-- Search Bar -->
            <navbarSearchBar v-model="localSearchQuery" class="mb-6" />

            <!-- Navigation Links -->
            <nav class="space-y-1">
                <div
                    v-for="(items, category) in menuCategories"
                    :key="category"
                    class="py-2"
                >
                    <div
                        class="flex items-center px-3 py-2 cursor-pointer"
                        @click="toggleCategory(category)"
                    >
                        <Icon
                            :name="getCategoryIcon(category)"
                            class="w-5 h-5 text-gray-700 mr-3"
                        />
                        <span class="text-gray-900 font-medium">
                            {{ category }}
                        </span>
                        <Icon
                            name="heroicons:chevron-right"
                            class="w-5 h-5 text-gray-400 ml-auto transition-transform duration-200"
                            :class="{ 'rotate-90': openCategories[category] }"
                        />
                    </div>
                </div>
            </nav>

            <!-- Bottom Actions -->
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
                <div class="flex gap-3">
                    <button
                        class="flex-1 px-4 py-2 border rounded-lg text-gray-700"
                    >
                        Submit an image
                    </button>
                    <button
                        class="flex-1 px-4 py-2 border rounded-lg text-gray-700"
                    >
                        {{ $t('login') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        isOpen: boolean
        searchQuery: string
    }

    const props = defineProps<Props>()
    const emit = defineEmits(['update:isOpen', 'update:searchQuery'])

    const { menuCategories } = useNavigation()

    const localSearchQuery = computed({
        get: () => props.searchQuery,
        set: value => emit('update:searchQuery', value),
    })

    const openCategories = ref<Record<string, boolean>>({})

    const toggleCategory = (category: string) => {
        openCategories.value[category] = !openCategories.value[category]
    }

    // Add icons mapping for categories
    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            Company: 'heroicons:building-office',
            Product: 'heroicons:device-phone-mobile',
            Community: 'heroicons:user-group',
            Explore: 'heroicons:globe-alt',
            Legal: 'heroicons:document-text',
            Language: 'heroicons:language',
        }
        return icons[category] || 'heroicons:squares-2x2'
    }
</script>
