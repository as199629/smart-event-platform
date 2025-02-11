<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">
            All Events
        </h1>

        <!-- 搜尋與篩選 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <!-- 關鍵字搜尋 -->
            <div>
                <label
                    for="search"
                    class="block text-sm font-medium text-gray-700"
                >
                    Keyword
                </label>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search events..."
                    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <!-- 狀態篩選 -->
            <div>
                <label
                    for="status"
                    class="block text-sm font-medium text-gray-700"
                >
                    Status
                </label>
                <select
                    v-model="selectedStatus"
                    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <!-- 新增排序選項 -->
            <div>
                <label
                    for="sortBy"
                    class="block text-sm font-medium text-gray-700"
                >
                    Sort By
                </label>
                <select
                    v-model="sortBy"
                    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="dateAsc">Date (Nearest First)</option>
                    <option value="dateDesc">Date (Farthest First)</option>
                    <option value="status">Status (Open First)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                    <option value="priceAsc">Price (Low to High)</option>
                </select>
            </div>

            <!-- 區域篩選 -->
            <div>
                <label
                    for="region"
                    class="block text-sm font-medium text-gray-700"
                >
                    Region
                </label>
                <select
                    v-model="selectedRegion"
                    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Regions</option>
                    <option value="north">North</option>
                    <option value="central">Central</option>
                    <option value="south">South</option>
                </select>
            </div>

            <!-- 縣市篩選 -->
            <div>
                <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                >
                    City
                </label>
                <select
                    v-model="selectedCity"
                    class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Cities</option>
                    <option
                        v-for="city in availableCities"
                        :key="city"
                        :value="city"
                    >
                        {{ city }}
                    </option>
                </select>
            </div>
        </div>

        <!-- 活動卡片區塊 -->
        <div
            v-if="filteredEvents.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            <div
                v-for="event in filteredEvents"
                :key="event.id"
                class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
                <!-- 活動圖片 -->
                <div class="relative h-48">
                    <img
                        :src="event.image"
                        :alt="event.name"
                        class="w-full h-full object-cover"
                    />
                    <!-- 日期標籤 - 改為左上角 -->
                    <div
                        class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow"
                    >
                        <p
                            class="text-sm font-semibold text-gray-700 flex items-center"
                        >
                            <CalendarIcon class="w-4 h-4 mr-2" />
                            {{ event.date }}
                        </p>
                    </div>
                    <!-- 狀態標籤 - 右上角 -->
                    <div class="absolute top-3 right-3">
                        <span
                            :class="[
                                'px-2 py-1 text-xs font-semibold text-white rounded-md',
                                event.status === 'open'
                                    ? 'bg-green-500'
                                    : 'bg-red-500',
                            ]"
                        >
                            {{ event.status.toUpperCase() }}
                        </span>
                    </div>
                </div>

                <div class="p-4">
                    <!-- 活動名稱 -->
                    <h3 class="text-xl font-semibold mb-3 text-gray-800">
                        {{ event.name }}
                    </h3>

                    <!-- 活動資訊 -->
                    <div class="space-y-2 mb-4">
                        <p class="text-gray-600 text-sm flex items-center">
                            <UserGroupIcon class="w-4 h-4 mr-2" />
                            <span>
                                {{ event.availableSeats }} /
                                {{ event.totalSeats }} seats
                            </span>
                        </p>
                        <p class="text-gray-600 text-sm flex items-center">
                            <CurrencyDollarIcon class="w-4 h-4 mr-2" />
                            <span>{{ event.price }}</span>
                        </p>
                        <p class="text-gray-600 text-sm flex items-center">
                            <MapPinIcon class="w-4 h-4 mr-2" />
                            <span>
                                {{
                                    event.region.charAt(0).toUpperCase() +
                                    event.region.slice(1)
                                }}
                                - {{ event.city }}
                            </span>
                        </p>
                    </div>

                    <!-- 按鈕樣式選項 1: 漸變背景 -->
                    <NuxtLink
                        :to="`/events/${event.id}`"
                        class="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        View Details
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- 無結果時顯示提示 -->
        <div v-else class="text-center text-gray-500 mt-6">
            No events found.
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import {
        CalendarIcon,
        UserGroupIcon,
        CurrencyDollarIcon,
        MapPinIcon,
    } from '@heroicons/vue/24/outline'

    const eventStore = useEventStore()
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const sortBy = ref('dateAsc')
    const selectedRegion = ref('')
    const selectedCity = ref('')

    // Initialize events
    onMounted(() => {
        eventStore.initializeEvents()
    })

    // Use events from store
    const availableCities = computed(() => {
        const cityMap: Record<string, string[]> = {
            north: [
                'Taipei',
                'New Taipei',
                'Keelung',
                'Taoyuan',
                'Hsinchu',
                'Yilan',
            ],
            central: ['Taichung', 'Miaoli', 'Changhua', 'Nantou', 'Yunlin'],
            south: ['Kaohsiung', 'Tainan', 'Chiayi', 'Pingtung'],
        }
        return selectedRegion.value ? cityMap[selectedRegion.value] : []
    })

    const filteredEvents = computed(() => {
        const filtered = eventStore.events.filter(event => {
            const matchesSearch = event.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
            const matchesStatus = selectedStatus.value
                ? event.status === selectedStatus.value
                : true
            const matchesRegion = selectedRegion.value
                ? event.region === selectedRegion.value
                : true
            const matchesCity = selectedCity.value
                ? event.city === selectedCity.value
                : true
            return (
                matchesSearch && matchesStatus && matchesRegion && matchesCity
            )
        })

        // Apply sorting
        return filtered.sort((a, b) => {
            switch (sortBy.value) {
                case 'dateAsc':
                    return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                case 'dateDesc':
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                case 'status':
                    return a.status === 'open' ? -1 : 1
                case 'priceDesc':
                    return b.price - a.price
                case 'priceAsc':
                    return a.price - b.price
                default:
                    return 0
            }
        })
    })
</script>

<style scoped>
    /* 無需額外樣式，已透過 Tailwind CSS 處理 */
</style>
