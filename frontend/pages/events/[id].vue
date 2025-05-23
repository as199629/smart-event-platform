<template>
    <div
        class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-500"
    >
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
                    />
                    <div class="absolute bottom-0 left-0 p-8 text-white">
                        <h1 class="text-4xl font-bold mb-2">
                            {{ event.name }}
                        </h1>
                        <div class="flex items-center gap-4">
                            <span class="flex items-center gap-2">
                                <Icon
                                    name="material-symbols:calendar-add-on-outline-sharp"
                                />
                                {{ event.date }}
                            </span>
                            <span class="flex items-center gap-2">
                                <Icon
                                    name="material-symbols:location-on-outline-sharp"
                                />
                                {{
                                    event.region.charAt(0).toUpperCase() +
                                    event.region.slice(1)
                                }}
                                - {{ event.city }}
                            </span>
                            <span class="flex items-center gap-2">
                                <Icon
                                    name="material-symbols:map-search-outline"
                                />
                                {{ event.location }}
                            </span>
                            <span class="flex items-center gap-2">
                                <Icon name="material-symbols:weather-snowy" />
                                {{ weatherInfo }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="max-w-4xl mx-auto">
                    <!-- Status card -->
                    <div
                        class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mb-8"
                    >
                        <div
                            class="flex flex-wrap items-center justify-between gap-4"
                        >
                            <div class="flex items-center gap-4">
                                <div class="text-center">
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-100"
                                    >
                                        Available Seats
                                    </p>
                                    <p
                                        class="text-2xl font-bold dark:text-gray-100"
                                    >
                                        {{ event.availableSeats }}/{{
                                            event.totalSeats
                                        }}
                                    </p>
                                </div>
                                <div class="text-center">
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-100"
                                    >
                                        Price
                                    </p>
                                    <p
                                        class="text-2xl font-bold dark:text-gray-100"
                                    >
                                        ${{ event.price }}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    :disabled="event.status === 'closed'"
                                    class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:bg-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                    @click="register"
                                >
                                    <span class="flex items-center gap-2">
                                        <Icon name="tabler:ticket" />
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
                                    :class="[
                                        'py-4 px-1 font-medium transition-colors',
                                        activeTab === tab.id
                                            ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-100',
                                    ]"
                                    @click="activeTab = tab.id"
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
                            <p class="text-gray-600 dark:text-gray-100">
                                {{ event.description }}
                            </p>

                            <!-- Add Google Maps -->
                            <div class="mt-6">
                                <h3
                                    class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100"
                                >
                                    <Icon
                                        name="material-symbols:location-on-outline-sharp"
                                    />
                                    Event Location
                                </h3>
                                <div
                                    class="w-full h-[400px] rounded-lg overflow-hidden"
                                >
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        style="border: 0"
                                        loading="lazy"
                                        allowfullscreen
                                        :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(event.location + ', ' + event.city + ', Taiwan')}`"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            v-show="activeTab === 'schedule'"
                            class="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                        >
                            <div
                                v-for="(item, index) in event.schedule"
                                :key="index"
                                class="flex items-start p-4 hover:bg-gray-50 transition dark:hover:bg-gray-600"
                                :class="
                                    index !== event.schedule.length - 1
                                        ? 'border-b'
                                        : ''
                                "
                            >
                                <span
                                    class="font-semibold w-32 text-blue-600 dark:text-blue-400"
                                >
                                    {{ item.time }}
                                </span>
                                <span class="text-gray-600 dark:text-gray-100">
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
                            <Icon
                                name="material-symbols:check-circle-outline-sharp"
                            />
                            <span>
                                Registration successful! Please check your
                                notifications.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()
    const eventStore = useEventStore()
    const authStore = useAuthStore()
    const weatherStore = useWeatherStore()
    const registered = ref(false)
    const config = useRuntimeConfig()
    const googleMapsApiKey = config.public.googleMapsApiKey

    // Get event from store
    const event = computed(() => {
        const eventId = route.params.id as string
        return eventStore.getEventById(eventId)
    })

    // Add weather info computed property
    const weatherInfo = computed(() => {
        if (!event.value) return ''
        const weather = weatherStore.getWeatherByCity(event.value.city)
        if (!weather) return 'Loading weather info...'
        return `${weather.temperature} ${weather.description}`
    })

    onMounted(async () => {
        // Initialize events if needed
        if (eventStore.events.length === 0) {
            eventStore.fetchEvents()
        }

        // Fetch weather data for the event city
        if (event.value) {
            await weatherStore.fetchWeatherByCity(event.value.city)
        }
    })

    const register = () => {
        // Check if user is logged in
        if (!authStore.isAuthenticated) {
            console.log('User is not authenticated')
            // Show login modal
            authStore.showLoginModal = true
            return
        }

        // If user is authenticated, redirect to payment page
        router.push(`/payment/${route.params.id}`)
    }

    // Add new reactive refs
    const activeTab = ref('description')
    const tabs = [
        { id: 'description', name: 'Description' },
        { id: 'schedule', name: 'Schedule' },
    ]
</script>
