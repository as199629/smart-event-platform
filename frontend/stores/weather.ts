import { defineStore } from 'pinia'

// Define weather data interface
interface WeatherData {
    locationName: string
    temperature: string
    description: string
    rainProbability: string
}

// Define city coordinates interface
interface CityCoordinates {
    lat: number
    lon: number
}

export const useWeatherStore = defineStore('weather', () => {
    // State
    const userLocationWeatherData = ref<WeatherData | null>(null)
    const loading = ref(true)
    const error = ref('')
    const taiwanWeatherData = ref<WeatherData[]>([])

    // City name mapping
    const cityNameMapping: Record<string, string> = {
        臺北市: 'Taipei City',
        新北市: 'New Taipei City',
        桃園市: 'Taoyuan City',
        臺中市: 'Taichung City',
        臺南市: 'Tainan City',
        高雄市: 'Kaohsiung City',
        基隆市: 'Keelung City',
        新竹市: 'Hsinchu City',
        新竹縣: 'Hsinchu County',
        苗栗縣: 'Miaoli County',
        彰化縣: 'Changhua County',
        南投縣: 'Nantou County',
        雲林縣: 'Yunlin County',
        嘉義市: 'Chiayi City',
        嘉義縣: 'Chiayi County',
        屏東縣: 'Pingtung County',
        宜蘭縣: 'Yilan County',
        花蓮縣: 'Hualien County',
        臺東縣: 'Taitung County',
        澎湖縣: 'Penghu County',
        金門縣: 'Kinmen County',
        連江縣: 'Lienchiang County',
    }

    // City coordinates
    const cityCoords: Record<string, CityCoordinates> = {
        'Taipei City': { lat: 25.033, lon: 121.5654 },
        'New Taipei City': { lat: 25.012, lon: 121.4657 },
        'Taoyuan City': { lat: 24.9936, lon: 121.301 },
        'Taichung City': { lat: 24.1477, lon: 120.6736 },
        'Tainan City': { lat: 22.9999, lon: 120.2269 },
        'Kaohsiung City': { lat: 22.6273, lon: 120.3014 },
        'Keelung City': { lat: 25.1276, lon: 121.7392 },
        'Hsinchu City': { lat: 24.8138, lon: 120.9675 },
        'Hsinchu County': { lat: 24.8384, lon: 121.0177 },
        'Miaoli County': { lat: 24.5602, lon: 120.8214 },
        'Changhua County': { lat: 24.0518, lon: 120.5161 },
        'Nantou County': { lat: 23.9609, lon: 120.9718 },
        'Yunlin County': { lat: 23.7092, lon: 120.4313 },
        'Chiayi City': { lat: 23.48, lon: 120.4491 },
        'Chiayi County': { lat: 23.4518, lon: 120.2555 },
        'Pingtung County': { lat: 22.5519, lon: 120.5487 },
        'Yilan County': { lat: 24.7021, lon: 121.7377 },
        'Hualien County': { lat: 23.9871, lon: 121.6011 },
        'Taitung County': { lat: 22.7583, lon: 121.1444 },
        'Penghu County': { lat: 23.5711, lon: 119.5793 },
        'Kinmen County': { lat: 24.4488, lon: 118.376 },
        'Lienchiang County': { lat: 26.1505, lon: 119.9499 },
    }

    // Add cityWeatherData state to store weather data for multiple cities
    const cityWeatherData = ref<Record<string, WeatherData>>({})

    // Methods
    const getUserLocation = () => {
        return new Promise<GeolocationPosition>((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('can not get location'))
                return
            }
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }

    const findNearestCity = (
        lat: number,
        lon: number,
        cities: WeatherData[]
    ) => {
        const getDistance = (
            lat1: number,
            lon1: number,
            lat2: number,
            lon2: number
        ) => {
            return Math.sqrt(
                Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2)
            )
        }

        let nearestCity = {
            ...cities[0],
            locationName:
                cityNameMapping[cities[0].locationName] ||
                cities[0].locationName,
        }
        let shortestDistance = Infinity

        cities.forEach(city => {
            const englishName =
                cityNameMapping[city.locationName] || city.locationName
            const cityCoord = cityCoords[englishName as keyof typeof cityCoords]

            if (cityCoord) {
                const distance = getDistance(
                    lat,
                    lon,
                    cityCoord.lat,
                    cityCoord.lon
                )
                if (distance < shortestDistance) {
                    shortestDistance = distance
                    nearestCity = {
                        ...city,
                        locationName: englishName,
                    }
                }
            }
        })

        return nearestCity
    }

    const fetchWeatherData = async () => {
        try {
            loading.value = true
            error.value = ''

            // Get user's location
            const position = await getUserLocation()

            const response = await fetch('/api/default/weather')
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            // Convert locationName to English before assigning to taiwanWeatherData
            taiwanWeatherData.value = data.map((item: WeatherData) => ({
                ...item,
                locationName:
                    cityNameMapping[item.locationName] || item.locationName,
            }))
            // Find nearest city based on user's location
            userLocationWeatherData.value = findNearestCity(
                position.coords.latitude,
                position.coords.longitude,
                taiwanWeatherData.value
            )
        } catch (err) {
            console.error('Error:', err)
            error.value = '無法取得天氣資訊'

            // Fallback to first city if location access is denied
            try {
                const response = await fetch('/api/default/weather')
                const data = await response.json()
                if (!data.error) {
                    userLocationWeatherData.value = {
                        ...data[0],
                        locationName:
                            cityNameMapping[data[0].locationName] ||
                            data[0].locationName,
                    }
                }
            } catch (fallbackErr) {
                console.error('Fallback error:', fallbackErr)
            }
        } finally {
            loading.value = false
        }
    }

    // Add getWeatherByCity method
    const getWeatherByCity = (city: string) => {
        const cityData = taiwanWeatherData.value.find(
            (item: WeatherData) =>
                cityNameMapping[item.locationName] === city ||
                item.locationName === city
        )

        console.log('city', city)
        console.log(taiwanWeatherData.value)

        if (cityData) {
            return {
                ...cityData,
                locationName:
                    cityNameMapping[cityData.locationName] ||
                    cityData.locationName,
            }
        }
        return null
    }

    // Add fetchWeatherByCity method
    const fetchWeatherByCity = async (city: string) => {
        try {
            loading.value = true
            error.value = ''

            const response = await fetch('/api/default/weather')
            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            // Find the weather data for the specified city
            const cityData = data.find(
                (item: WeatherData) =>
                    cityNameMapping[item.locationName] === city ||
                    item.locationName === city
            )

            if (cityData) {
                cityWeatherData.value[city] = {
                    ...cityData,
                    locationName:
                        cityNameMapping[cityData.locationName] ||
                        cityData.locationName,
                }
            }
        } catch (err) {
            console.error('Error fetching city weather:', err)
            error.value = '無法取得天氣資訊'
        } finally {
            loading.value = false
        }
    }

    return {
        // State
        userLocationWeatherData,
        loading,
        error,
        cityWeatherData,
        taiwanWeatherData,

        // Actions
        fetchWeatherData,
        getWeatherByCity,
        fetchWeatherByCity,
    }
})
