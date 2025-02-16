<template>
    <div class="flex items-center space-x-2 text-sm text-gray-600">
        <div v-if="weatherStore.loading" class="animate-pulse">
            <Icon name="line-md:loading-loop" class="w-5 h-5" />
        </div>
        <div
            v-else-if="weatherStore.error"
            class="text-red-500 flex items-center"
        >
            <Icon name="material-symbols:error-outline" class="w-5 h-5 mr-1" />
            {{ weatherStore.error }}
        </div>
        <div
            v-else-if="weatherStore.userLocationWeatherData"
            class="flex items-center space-x-3"
        >
            <!-- Location -->
            <div class="flex items-center">
                <Icon
                    name="material-symbols:location-on"
                    class="w-4 h-4 mr-1 text-gray-600"
                />
                <span class="font-medium text-gray-700">
                    {{ weatherStore.userLocationWeatherData.locationName }}
                </span>
            </div>

            <!-- Temperature -->
            <div class="flex items-center">
                <Icon
                    name="material-symbols:device-thermostat"
                    class="w-4 h-4 mr-1 text-orange-500"
                />
                <span class="text-gray-700">
                    {{ weatherStore.userLocationWeatherData.temperature }}
                </span>
            </div>

            <!-- Rain Probability -->
            <div
                class="flex items-center"
                :title="`Rain Probability: ${weatherStore.userLocationWeatherData.rainProbability}`"
            >
                <Icon
                    :name="
                        getRainIcon(
                            weatherStore.userLocationWeatherData.rainProbability
                        )
                    "
                    class="w-4 h-4 mr-1"
                    :class="
                        getRainColorClass(
                            weatherStore.userLocationWeatherData.rainProbability
                        )
                    "
                />
                <span class="text-gray-700">
                    {{ weatherStore.userLocationWeatherData.rainProbability }}
                </span>
            </div>

            <!-- Weather Description -->
            <div
                v-if="weatherStore.userLocationWeatherData.description"
                class="flex items-center"
            >
                <Icon
                    :name="
                        getWeatherIcon(
                            weatherStore.userLocationWeatherData.description
                        )
                    "
                    class="w-4 h-4"
                    :class="
                        getWeatherIconColor(
                            weatherStore.userLocationWeatherData.description
                        )
                    "
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const weatherStore = useWeatherStore()
    const getRainIcon = (probability: string) => {
        const value = parseInt(probability)
        if (value >= 70) return 'material-symbols:rainy'
        if (value >= 30) return 'material-symbols:water-drop'
        if (value >= 10) return 'material-symbols:water-drop-outline'
        return 'material-symbols:water-drop-outline'
    }
    // Helper functions for UI
    const getWeatherIcon = (desc: string) => {
        // Clear conditions
        if (desc.includes('晴')) return 'material-symbols:sunny'

        // Cloudy conditions
        if (desc.includes('多雲時晴'))
            return 'material-symbols:partly-cloudy-day'
        if (desc.includes('陰')) return 'material-symbols:cloud'
        if (desc.includes('多雲')) return 'material-symbols:cloud'

        // Rainy conditions
        if (desc.includes('陰短暫雨')) return 'material-symbols:rainy-light'
        if (desc.includes('雨')) return 'material-symbols:rainy'
        if (desc.includes('午後短暫雨')) return 'material-symbols:rainy-light'

        // Thunderstorm conditions
        if (desc.includes('雷')) return 'material-symbols:thunderstorm'

        // Foggy conditions
        if (desc.includes('霧')) return 'material-symbols:foggy'

        // Default fallback
        return 'material-symbols:device-thermostat'
    }

    const getRainColorClass = (probability: string) => {
        const value = parseInt(probability)
        if (value >= 70) return 'text-blue-600'
        if (value >= 30) return 'text-blue-400'
        if (value >= 10) return 'text-blue-300'
        return 'text-gray-400'
    }

    const getWeatherIconColor = (desc: string) => {
        if (desc.includes('晴')) return 'text-yellow-500'
        if (desc.includes('雨')) return 'text-blue-500'
        if (desc.includes('陰')) return 'text-gray-500'
        if (desc.includes('多雲')) return 'text-gray-400'
        return 'text-gray-600'
    }
    onMounted(() => {
        weatherStore.fetchWeatherData()
    })
</script>
