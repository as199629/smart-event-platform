// Import necessary types and functions
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Helper function to convert snake_case to camelCase
function snakeToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
    )
}

// Helper function to convert object keys from snake_case to camelCase
function keysToCamel(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map(keysToCamel)
    }

    return Object.keys(obj).reduce(
        (acc: { [key: string]: any }, key: string) => {
            const camelKey = snakeToCamel(key)
            acc[camelKey] = keysToCamel(obj[key]) // Recursively convert nested objects/arrays
            return acc
        },
        {}
    )
}

// Define event interface
interface Event {
    id: string
    name: string
    image: string
    status: 'open' | 'closed'
    availableSeats: number
    totalSeats: number
    price: number
    // Add new fields for detail page
    date: string
    time: string
    location: string
    description: string
    schedule: Array<{
        time: string
        activity: string
    }>
    region: 'north' | 'central' | 'south'
    city: string
    category: 'social' | 'sports' | 'hiking' | 'writing' | 'dining' | 'learning' // Add category field
    participants: number // Add participants field for ranking
}

export const useEventStore = defineStore('events', () => {
    const events = ref<Event[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetchEvents() {
        isLoading.value = true
        error.value = null

        try {
            const config = useRuntimeConfig()
            const response = await fetch(`${config.public.apiUrl}/events/`)
            // Parse the entire response object
            const responseData = await response.json()
            console.log(responseData) // Log the entire response object
            // Check if the response has the expected structure and data exists
            if (responseData && responseData.data && Array.isArray(responseData.data)) {
              // Extract the array from the 'data' key
              const eventsDataSnakeCase = responseData.data
              // Convert keys from snake_case to camelCase before assigning
              events.value = keysToCamel(eventsDataSnakeCase) as Event[]
            } else {
              console.error('Invalid API response format:', responseData)
              throw new Error('Invalid API response format') // Or handle differently
            }
        } catch (err) {
            error.value =
                err instanceof Error ? err.message : '無法取得活動資料'
            console.error('Error fetching events:', err)
        } finally {
            isLoading.value = false
        }
    }

    const getEventsByCategory = computed(() => {
        return (category: string) => {
            // Ensure events.value is populated and participants is a number
            return events.value
                .filter(
                    event =>
                        event.category === category &&
                        typeof event.participants === 'number'
                )
                .sort((a, b) => b.participants - a.participants) // No need for nullish coalescing if data is clean
                .slice(0, 3)
        }
    })

    const totalRegistrations = computed(() => {
        // Ensure events.value is populated and participants is a number
        return events.value.reduce(
            (sum, event) => sum + (event.participants || 0),
            0
        )
    })

    const weeklyGrowth = computed(() => {
        return 328 // Mock data, should be calculated from actual registration data
    })

    const totalEvents = computed(() => {
        return events.value.length
    })

    const activeUsers = computed(() => {
        // Ensure events.value is populated and seats are numbers
        return events.value.reduce((sum, event) => {
            const total =
                typeof event.totalSeats === 'number' ? event.totalSeats : 0
            const available =
                typeof event.availableSeats === 'number'
                    ? event.availableSeats
                    : 0
            return sum + (total - available)
        }, 0)
    })

    function getEventById(id: string): Event | undefined {
        return events.value.find(event => event.id === id)
    }

    // Return all composables
    return {
        // State
        events,
        isLoading,
        error,
        // Getters
        getEventsByCategory,
        totalRegistrations,
        weeklyGrowth,
        totalEvents,
        activeUsers,
        // Actions
        fetchEvents,
        getEventById,
    }
})
