<template>
    <div class="container mx-auto px-4 py-10">
        <!-- If event doesn't exist -->
        <div v-if="!event" class="text-center">
            <p class="text-xl text-red-500">Event not found 😢</p>
            <NuxtLink
                to="/events"
                class="mt-4 inline-block text-blue-500 hover:underline"
            >
                Back to Events
            </NuxtLink>
        </div>

        <!-- Event content -->
        <div v-else>
            <!-- Hero section with overlay -->
            <div class="relative h-[400px] rounded-xl overflow-hidden mb-8">
                <img
                    :src="event.image"
                    :alt="event.name"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                ></div>
                <div class="absolute bottom-0 left-0 p-8 text-white">
                    <h1 class="text-4xl font-bold mb-2">{{ event.name }}</h1>
                    <div class="flex items-center gap-4">
                        <span class="flex items-center gap-2">
                            <i class="bi bi-calendar3"></i>
                            {{ event.date }}
                        </span>
                        <span class="flex items-center gap-2">
                            <i class="bi bi-geo-alt"></i>
                            {{ event.location }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="max-w-4xl mx-auto">
                <!-- Status card -->
                <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <div
                        class="flex flex-wrap items-center justify-between gap-4"
                    >
                        <div class="flex items-center gap-4">
                            <div class="text-center">
                                <p class="text-sm text-gray-600">
                                    Available Seats
                                </p>
                                <p class="text-2xl font-bold">
                                    {{ event.availableSeats }}/{{
                                        event.totalSeats
                                    }}
                                </p>
                            </div>
                            <div class="text-center">
                                <p class="text-sm text-gray-600">Price</p>
                                <p class="text-2xl font-bold">
                                    ${{ event.price }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                @click="register"
                                :disabled="event.status === 'closed'"
                                class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:bg-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                <span class="flex items-center gap-2">
                                    <i class="bi bi-ticket-perforated"></i>
                                    {{
                                        event.status === 'open'
                                            ? 'Register Now'
                                            : 'Registration Closed'
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Tabs navigation -->
                <div class="mb-8">
                    <div class="border-b border-gray-200">
                        <nav class="flex gap-6">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                @click="activeTab = tab.id"
                                :class="[
                                    'py-4 px-1 font-medium transition-colors',
                                    activeTab === tab.id
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700',
                                ]"
                            >
                                {{ tab.name }}
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Tab content -->
                <div class="space-y-6">
                    <div
                        v-show="activeTab === 'description'"
                        class="prose max-w-none"
                    >
                        <p class="text-gray-600">{{ event.description }}</p>
                    </div>

                    <div
                        v-show="activeTab === 'schedule'"
                        class="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <div
                            v-for="(item, index) in event.schedule"
                            :key="index"
                            class="flex items-start p-4 hover:bg-gray-50 transition"
                            :class="
                                index !== event.schedule.length - 1
                                    ? 'border-b'
                                    : ''
                            "
                        >
                            <span class="font-semibold w-32 text-blue-600">
                                {{ item.time }}
                            </span>
                            <span class="text-gray-600">
                                {{ item.activity }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Registration success message -->
                <div
                    v-if="registered"
                    class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
                >
                    <div class="flex items-center gap-2">
                        <i class="bi bi-check-circle-fill"></i>
                        <span>
                            Registration successful! Please check your
                            notifications.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useEventStore } from '~/stores/events'

    const route = useRoute()
    const eventStore = useEventStore()
    const registered = ref(false)

    // Get event from store
    const event = computed(() => {
        const eventId = parseInt(route.params.id as string)
        return eventStore.getEventById(eventId)
    })

    console.log(event.value)

    onMounted(() => {
        // Initialize events if needed
        if (eventStore.events.length === 0) {
            eventStore.initializeEvents()
        }
    })

    const register = () => {
        registered.value = true
    }

    // Add new reactive refs
    const activeTab = ref('description')
    const tabs = [
        { id: 'description', name: 'Description' },
        { id: 'schedule', name: 'Schedule' },
    ]
</script>
