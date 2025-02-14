// Import necessary types and functions
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
            const response = await fetch('/api/default/event')
            const eventsData = await response.json()
            events.value = eventsData as Event[]
        } catch (err) {
            error.value = err instanceof Error ? err.message : '無法取得活動資料'
            console.error('Error fetching events:', err)
        } finally {
            isLoading.value = false
        }
    }

    const getEventsByCategory = computed(() => {
        return (category: string) => {
            return events.value
                .filter(event => event.category === category)
                .sort((a, b) => b.participants - a.participants)
                .slice(0, 3)
        }
    })

    const totalRegistrations = computed(() => {
        return events.value.reduce((sum, event) => sum + event.participants, 0)
    })

    const weeklyGrowth = computed(() => {
        return 328 // Mock data, should be calculated from actual registration data
    })

    const totalEvents = computed(() => {
        return events.value.length
    })

    const activeUsers = computed(() => {
        return events.value.reduce((sum, event) => 
            sum + (event.totalSeats - event.availableSeats), 0)
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
        getEventById
    }
})