<template>
    <div class="container mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
            Participated Events
        </h2>
        <ul
            v-if="participatedEvents.length > 0"
            class="divide-y divide-gray-200"
        >
            <li
                v-for="event in participatedEvents"
                :key="event.id"
                class="py-4 flex items-center justify-between"
            >
                <!-- 活動圖片與名稱 -->
                <div class="flex items-center">
                    <img
                        :src="event.image"
                        :alt="event.name"
                        class="h-12 w-12 object-cover rounded-full"
                    />
                    <div class="ml-4">
                        <h3 class="text-lg font-semibold text-gray-800">
                            {{ event.name }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ event.date }}
                        </p>
                    </div>
                </div>

                <!-- 查看詳情按鈕 -->
                <NuxtLink
                    :to="`/events/${event.id}`"
                    class="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                    View Details
                </NuxtLink>
            </li>
        </ul>
        <div v-else class="text-center text-gray-500 mt-6">
            No participated events found.
        </div>
    </div>
</template>

<script lang="ts" setup>
    // 假設已參加活動數據
    const participatedEvents = ref([
        // 示例數據
        {
            id: '001',
            name: 'Event One',
            date: '2023-12-15',
            image: '/images/event1.jpg',
            link: '/events/001',
        },
        {
            id: '002',
            name: 'Event Two',
            date: '2023-12-20',
            image: '/images/event2.jpg',
            link: '/events/002',
        },
    ])
</script>

<style scoped>
    /* Tailwind CSS is utility-first, so most styling is done in the template. */
</style>
