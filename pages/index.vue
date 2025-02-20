<template>
    <div
        class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-500"
    >
        <!-- Hero Section -->
        <div class="relative overflow-hidden mb-8">
            <!-- Replace solid color with background image -->
            <div
                class="absolute inset-0 bg-cover bg-center"
                style="background-image: url('/imgs/home/main-image.jpg')"
            />
            <!-- Add a dark overlay to ensure text readability -->
            <div class="absolute inset-0 bg-black opacity-40" />
            <div class="container mx-auto px-4 py-12 md:py-50 relative">
                <h1
                    class="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in"
                >
                    {{ $t('index.title') }}
                </h1>
                <p class="text-xl text-white mb-8 max-w-2xl animate-slide-up">
                    {{ $t('index.description') }}
                </p>
            </div>
        </div>

        <!-- Overall Trend Section with Animation -->
        <section class="container mx-auto px-4 mb-12">
            <h2
                class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center"
            >
                <span class="mr-2">📈</span>
                {{ $t('index.currentRegistrationTrends') }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div
                    class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
                >
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-800">
                            {{ $t('index.totalRegistrations') }}
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
                            {{ $t('index.weeklyGrowth') }}
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
                            {{ $t('index.totalEvents') }}
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
                            {{ $t('index.activeUsers') }}
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
        <section
            class="container mx-auto px-4 mb-12 overflow-hidden group/swiper"
        >
            <h2
                class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center"
            >
                <span class="mr-2">🏆</span>
                {{ $t('index.topEvents') }}
            </h2>
            <Swiper
                :slides-per-view="5"
                :space-between="16"
                :breakpoints="swiperBreakpoints"
                :modules="[Navigation]"
                :navigation="{
                    nextEl: '.swiper-custom-next',
                    prevEl: '.swiper-custom-prev',
                }"
                class="w-full relative"
            >
                <SwiperSlide
                    v-for="(event, index) in allEvents"
                    :key="event.name"
                    class="px-2"
                >
                    <NuxtLink :to="`/events/${event.id}`">
                        <ui-card :event="event" :index="index" />
                    </NuxtLink>
                </SwiperSlide>

                <!-- Custom navigation buttons -->
                <div
                    class="swiper-custom-prev !hidden group-hover/swiper:!flex"
                ></div>
                <div
                    class="swiper-custom-next !hidden group-hover/swiper:!flex"
                ></div>
            </Swiper>
        </section>

        <!-- Call to Action Section -->
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold text-white mb-4">
                    {{ $t('index.ready') }}
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    {{ $t('index.browse') }}
                </p>
                <button
                    class="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors duration-300"
                    @click="router.push('/events')"
                >
                    {{ $t('index.explore') }}
                </button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import 'swiper/css/navigation'
    import { Navigation } from 'swiper/modules'
    import { useEventStore } from '@/stores/events'
    const { t } = useI18n()
    // SEO optimization
    useHead({
        title: t('web-title'),
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
    const allEvents = ref<any[]>([])
    onMounted(async () => {
        await eventStore.fetchEvents()
        allEvents.value = eventStore.events
    })

    // Get statistics from store
    const totalRegistrations = computed(() => eventStore.totalRegistrations)
    const weeklyGrowth = computed(() => eventStore.weeklyGrowth)
    const totalEvents = computed(() => eventStore.totalEvents)
    const activeUsers = computed(() => eventStore.activeUsers)

    const swiperBreakpoints = {
        320: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 2.5,
            spaceBetween: 12,
        },
        768: {
            slidesPerView: 3.5,
            spaceBetween: 14,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 16,
        },
    }
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

    .swiper-container {
        position: relative;
        padding: 0 4px;
    }

    .swiper-slide {
        height: auto;
        transition: transform 0.3s;
    }

    /* Hide default Swiper navigation buttons */
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        display: none;
    }

    /* Custom navigation buttons styles */
    .swiper-custom-next,
    .swiper-custom-prev {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(17, 24, 39, 0.5);
        border-radius: 9999px;
        color: white;
        cursor: pointer;
        transition: all 0.3s;
    }

    .swiper-custom-next:hover,
    .swiper-custom-prev:hover {
        background-color: rgba(17, 24, 39, 0.7);
    }

    .swiper-custom-prev {
        left: 8px;
    }

    .swiper-custom-next {
        right: 8px;
    }

    /* Add arrow icons */
    .swiper-custom-next:after,
    .swiper-custom-prev:after {
        font-size: 1rem;
        font-family: swiper-icons;
    }

    .swiper-custom-prev:after {
        content: 'prev';
    }

    .swiper-custom-next:after {
        content: 'next';
    }

    /* Optional: hide default focus outline */
    .swiper-custom-next:focus,
    .swiper-custom-prev:focus {
        outline: none;
    }
</style>
