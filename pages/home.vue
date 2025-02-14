<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <!-- Hero Section -->
        <div class="relative overflow-hidden mb-8">
            <!-- Replace solid color with background image -->
            <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image: url('/imgs/home/main-image.jpg')"
            ></div>
            <!-- Add a dark overlay to ensure text readability -->
            <div class="absolute inset-0 bg-black opacity-40"></div>
            <div class="container mx-auto px-4 py-12 md:py-50 relative">
                <h1
                    class="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in"
                >
                    Discover Amazing Events
                </h1>
                <p class="text-xl text-white mb-8 max-w-2xl animate-slide-up">
                    Join exciting activities and meet new people in your area
                </p>
            </div>
        </div>

        <!-- Overall Trend Section with Animation -->
        <section class="container mx-auto px-4 mb-12">
            <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span class="mr-2">📈</span>
                Current Registration Trends
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div
                    class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-800">
                            Total Registrations
                        </h3>
                        <span class="text-blue-600 text-3xl">👥</span>
                    </div>
                    <p class="text-3xl font-bold text-blue-600 mt-2">
                        {{ totalRegistrations }}
                    </p>
                </div>
                <div
                    class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-800">
                            Weekly Growth
                        </h3>
                        <span class="text-green-600 text-3xl">🚀</span>
                    </div>
                    <p class="text-3xl font-bold text-green-600 mt-2">
                        +{{ weeklyGrowth }}
                    </p>
                </div>
                <div
                    class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-800">
                            Total Events
                        </h3>
                        <span class="text-purple-600 text-3xl">📅</span>
                    </div>
                    <p class="text-3xl font-bold text-purple-600 mt-2">
                        {{ totalEvents }}
                    </p>
                </div>
                <div
                    class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-800">
                            Active Users
                        </h3>
                        <span class="text-orange-600 text-3xl">👤</span>
                    </div>
                    <p class="text-3xl font-bold text-orange-600 mt-2">
                        {{ activeUsers }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Category Rankings Section -->
        <section class="container mx-auto px-4 mb-12">
            <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span class="mr-2">🏆</span>
                Top Events by Category
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Social Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-blue-500 to-blue-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Social Events
                        </h3>
                        <p class="text-blue-100">
                            Meet new people and have fun
                        </p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in socialEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tech Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-purple-500 to-purple-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Tech Events
                        </h3>
                        <p class="text-purple-100">
                            Learn and grow with technology
                        </p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in techEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full text-purple-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Art Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-pink-500 to-pink-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Art Events
                        </h3>
                        <p class="text-pink-100">Express your creativity</p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in artEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-pink-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Food Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-orange-500 to-orange-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Food Events
                        </h3>
                        <p class="text-orange-100">
                            Discover culinary experiences
                        </p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in foodEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-orange-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full text-orange-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Outdoor Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-green-500 to-green-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Outdoor Events
                        </h3>
                        <p class="text-green-100">Connect with nature</p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in outdoorEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-green-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full text-green-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Education Events Card -->
                <div
                    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <div
                        class="h-40 bg-gradient-to-r from-blue-500 to-blue-600 p-6"
                    >
                        <h3 class="text-xl font-bold text-white mb-2">
                            Education Events
                        </h3>
                        <p class="text-blue-100">Expand your knowledge</p>
                    </div>
                    <div class="p-6">
                        <div
                            v-for="(item, index) in educationEvents"
                            :key="index"
                            class="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200"
                            @click="navigateToDetail(item.id)"
                        >
                            <span
                                class="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold"
                            >
                                {{ index + 1 }}
                            </span>
                            <div class="ml-4">
                                <p class="font-medium text-gray-800">
                                    {{ item.name }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    {{ item.participants }} registered
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action Section -->
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    Ready to Join an Event?
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    Browse our full catalog of amazing experiences
                </p>
                <button
                    class="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors duration-300"
                    @click="router.push('/events')"
                >
                    Explore All Events
                </button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useEventStore } from '@/stores/events'

    // SEO optimization
    useHead({
        title: 'Event Platform - Discover Amazing Events',
        meta: [
            {
                name: 'description',
                content:
                    'Find and join the best social, sports, hiking, writing, dining, and learning events in your area.',
            },
            {
                name: 'keywords',
                content:
                    'events, social activities, sports, hiking, writing workshops, dining experiences, learning',
            },
            {
                property: 'og:title',
                content: 'Event Platform - Discover Amazing Events',
            },
            {
                property: 'og:description',
                content: 'Find and join the best events in your area',
            },
            { property: 'og:image', content: '/path-to-your-og-image.jpg' },
        ],
    })

    const router = useRouter()
    const eventStore = useEventStore()

    onMounted(() => {
        eventStore.fetchEvents()
    })

    // Navigation function
    const navigateToDetail = (eventId: string) => {
        router.push(`/events/${eventId}`)
    }

    // Get events by category using store getters
    const socialEvents = computed(() =>
        eventStore.getEventsByCategory('social')
    )
    const techEvents = computed(() =>
        eventStore.getEventsByCategory('technology')
    )
    const artEvents = computed(() => eventStore.getEventsByCategory('art'))
    const foodEvents = computed(() => eventStore.getEventsByCategory('food'))
    const outdoorEvents = computed(() =>
        eventStore.getEventsByCategory('outdoor')
    )
    const educationEvents = computed(() =>
        eventStore.getEventsByCategory('education')
    )

    // Get statistics from store
    const totalRegistrations = computed(() => eventStore.totalRegistrations)
    const weeklyGrowth = computed(() => eventStore.weeklyGrowth)
    const totalEvents = computed(() => eventStore.totalEvents)
    const activeUsers = computed(() => eventStore.activeUsers)
</script>

<style scoped>
    .animate-fade-in {
        animation: fadeIn 1s ease-out;
    }

    .animate-slide-up {
        animation: slideUp 0.8s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
