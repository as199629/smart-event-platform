// Import necessary types and functions
import { defineStore } from 'pinia'

// Define event interface
interface Event {
    id: number
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
}

export const useEventStore = defineStore('events', {
    state: () => ({
        events: [] as Event[],
    }),
    
    actions: {
        initializeEvents() {
            // Move events data from index.vue to here
            this.events = [
                {
                    id: 1,
                    name: 'Cycling Tour',
                    image: 'https://plus.unsplash.com/premium_photo-1685207267343-1c8852b45575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    status: 'open',
                    availableSeats: 50,
                    totalSeats: 100,
                    price: 20,
                    date: '2025-04-15',
                    time: '08:00-17:00',
                    location: 'Daan Forest Park, Taipei',
                    description: 'Enjoy a full day cycling tour! Explore the most beautiful bike paths in Taipei and experience the perfect blend of city and nature. Suitable for riders of all levels.',
                    schedule: [
                        { time: '08:00', activity: 'Check-in' },
                        { time: '08:30', activity: 'Safety Briefing' },
                        { time: '09:00', activity: 'Start Riding' },
                        { time: '12:00', activity: 'Lunch Break' },
                        { time: '13:30', activity: 'Afternoon Ride' },
                        { time: '16:30', activity: 'Return to Starting Point' },
                        { time: '17:00', activity: 'Event Ends' }
                    ]
                },
                {
                    id: 2,
                    name: 'Boxing Championship',
                    image: 'https://images.unsplash.com/photo-1586204723173-94e043453715?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    status: 'closed',
                    availableSeats: 0,
                    totalSeats: 50,
                    price: 50,
                    date: '2025-03-30',
                    time: '19:00-22:00',
                    location: 'Taipei Arena',
                    description: 'The biggest boxing championship of the year, featuring talented fighters from around the region.',
                    schedule: [
                        { time: '19:00', activity: 'Opening Ceremony' },
                        { time: '19:30', activity: 'Preliminary Matches' },
                        { time: '20:30', activity: 'Finals' },
                        { time: '22:00', activity: 'Award Ceremony' }
                    ]
                },
                {
                    id: 3,
                    name: 'Travel Adventure',
                    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    status: 'open',
                    availableSeats: 30,
                    totalSeats: 30,
                    price: 100,
                    date: '2025-05-20',
                    time: '09:00-18:00',
                    location: 'Yangmingshan National Park',
                    description: 'Explore the hidden gems of Yangmingshan with professional guides. Experience breathtaking natural scenery. Suitable for all ages.',
                    schedule: [
                        { time: '09:00', activity: 'Gathering' },
                        { time: '10:30', activity: 'Start Hiking' },
                        { time: '12:30', activity: 'Picnic Lunch' },
                        { time: '14:00', activity: 'Ecological Guide Tour' },
                        { time: '16:00', activity: 'Hot Spring Experience' },
                        { time: '18:00', activity: 'Tour Ends' }
                    ]
                },
                {
                    id: 4,
                    name: 'Racing Competition',
                    image: 'https://images.unsplash.com/photo-1688391672420-3e9fb580b826?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    status: 'open',
                    availableSeats: 30,
                    totalSeats: 30,
                    price: 100,
                    date: '2025-06-15',
                    time: '08:00-16:00',
                    location: 'Lihpao Racing Circuit',
                    description: 'Professional racing experience including basic training and actual track time. Complete safety equipment provided.',
                    schedule: [
                        { time: '08:00', activity: 'Registration & Equipment' },
                        { time: '09:00', activity: 'Safety Training' },
                        { time: '10:30', activity: 'Track Experience' },
                        { time: '12:00', activity: 'Lunch Break' },
                        { time: '13:30', activity: 'Race Time' },
                        { time: '16:00', activity: 'Award Ceremony' }
                    ]
                },
                {
                    id: 5,
                    name: 'Yoga Workshop',
                    image: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=2070',
                    status: 'open',
                    availableSeats: 15,
                    totalSeats: 20,
                    price: 30,
                    date: '2025-04-10',
                    time: '10:00-12:00',
                    location: 'Sunshine Yoga Center',
                    description: 'Gentle yoga session led by professional instructors, perfect for beginners. Please bring your own yoga mat.',
                    schedule: [
                        { time: '10:00', activity: 'Warm-up' },
                        { time: '10:30', activity: 'Basic Yoga Poses' },
                        { time: '11:15', activity: 'Meditation Practice' },
                        { time: '12:00', activity: 'Session Ends' }
                    ]
                },
                {
                    id: 6,
                    name: 'Music Festival',
                    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070',
                    status: 'open',
                    availableSeats: 200,
                    totalSeats: 500,
                    price: 75,
                    date: '2025-07-01',
                    time: '14:00-22:00',
                    location: 'Daan Forest Park Amphitheater',
                    description: 'Summer music festival featuring multiple renowned bands. Food vendors and rest areas available.',
                    schedule: [
                        { time: '14:00', activity: 'Gates Open' },
                        { time: '15:00', activity: 'First Act' },
                        { time: '17:00', activity: 'Second Act' },
                        { time: '19:00', activity: 'Headliner Performance' },
                        { time: '22:00', activity: 'Festival Ends' }
                    ]
                },
                {
                    id: 7,
                    name: 'Cooking Class',
                    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070',
                    status: 'closed',
                    availableSeats: 0,
                    totalSeats: 15,
                    price: 45,
                    date: '2025-03-25',
                    time: '14:00-17:00',
                    location: 'City Culinary Studio',
                    description: 'Learn authentic Italian cooking, from basic sauces to handmade pasta. All ingredients included.',
                    schedule: [
                        { time: '14:00', activity: 'Ingredient Introduction' },
                        { time: '14:30', activity: 'Sauce Making' },
                        { time: '15:30', activity: 'Pasta Workshop' },
                        { time: '16:30', activity: 'Tasting Session' }
                    ]
                },
                {
                    id: 8,
                    name: 'Photography Workshop',
                    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070',
                    status: 'open',
                    availableSeats: 8,
                    totalSeats: 12,
                    price: 60,
                    date: '2025-04-20',
                    time: '13:00-17:00',
                    location: 'Taipei Photography Institute',
                    description: 'Learn digital photography basics including composition and lighting techniques.',
                    schedule: [
                        { time: '13:00', activity: 'Photography Theory' },
                        { time: '14:30', activity: 'Outdoor Practice' },
                        { time: '16:00', activity: 'Photo Review' },
                        { time: '17:00', activity: 'Workshop Ends' }
                    ]
                },
                {
                    id: 9,
                    name: 'Marathon Event',
                    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070',
                    status: 'open',
                    availableSeats: 100,
                    totalSeats: 300,
                    price: 40,
                    date: '2025-05-01',
                    time: '06:00-12:00',
                    location: 'Taipei City Hall Plaza',
                    description: 'Annual marathon event with full, half, and fun run options. Well-stocked aid stations throughout the course.',
                    schedule: [
                        { time: '06:00', activity: 'Full Marathon Start' },
                        { time: '07:00', activity: 'Half Marathon Start' },
                        { time: '08:00', activity: 'Fun Run Start' },
                        { time: '12:00', activity: 'Award Ceremony' }
                    ]
                },
                {
                    id: 10,
                    name: 'Art Exhibition',
                    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=2070',
                    status: 'open',
                    availableSeats: 45,
                    totalSeats: 100,
                    price: 25,
                    date: '2025-06-01',
                    time: '10:00-18:00',
                    location: 'Taipei Contemporary Art Museum',
                    description: 'Contemporary art exhibition featuring works from emerging artists, including paintings and installations.',
                    schedule: [
                        { time: '10:00', activity: 'Exhibition Opens' },
                        { time: '14:00', activity: 'Artist Guided Tour' },
                        { time: '16:00', activity: 'Art Talk' },
                        { time: '18:00', activity: 'Exhibition Closes' }
                    ]
                },
                {
                    id: 11,
                    name: 'Dance Competition',
                    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2070',
                    status: 'closed',
                    availableSeats: 0,
                    totalSeats: 50,
                    price: 35,
                    date: '2025-03-15',
                    time: '13:00-20:00',
                    location: 'Cultural Center Auditorium',
                    description: 'Street dance competition featuring Breaking, Popping, Hip-hop, and more styles.',
                    schedule: [
                        { time: '13:00', activity: 'Registration' },
                        { time: '14:00', activity: 'Preliminaries' },
                        { time: '17:00', activity: 'Finals' },
                        { time: '19:00', activity: 'Guest Performance' },
                        { time: '20:00', activity: 'Awards' }
                    ]
                },
                {
                    id: 12,
                    name: 'Tech Conference',
                    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2070',
                    status: 'open',
                    availableSeats: 150,
                    totalSeats: 200,
                    price: 120,
                    date: '2025-08-15',
                    time: '09:00-17:00',
                    location: 'Nangang Exhibition Center',
                    description: 'Technology innovation conference with international experts sharing latest trends and applications.',
                    schedule: [
                        { time: '09:00', activity: 'Opening Remarks' },
                        { time: '10:00', activity: 'Keynote Speech' },
                        { time: '12:00', activity: 'Networking Lunch' },
                        { time: '14:00', activity: 'Tech Forums' },
                        { time: '16:00', activity: 'Panel Discussion' }
                    ]
                },
                {
                    id: 13,
                    name: 'Wine Tasting',
                    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070',
                    status: 'open',
                    availableSeats: 20,
                    totalSeats: 30,
                    price: 80,
                    date: '2025-04-30',
                    time: '19:00-21:00',
                    location: 'Wine Gallery',
                    description: 'Premium wine tasting experience with professional sommeliers, featuring wines from around the world.',
                    schedule: [
                        { time: '19:00', activity: 'Wine Basics Introduction' },
                        { time: '19:30', activity: 'Red Wine Tasting' },
                        { time: '20:30', activity: 'Food Pairing' },
                        { time: '21:00', activity: 'Event Concludes' }
                    ]
                },
                {
                    id: 14,
                    name: 'Basketball Tournament',
                    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070',
                    status: 'open',
                    availableSeats: 80,
                    totalSeats: 100,
                    price: 15,
                    date: '2025-07-20',
                    time: '09:00-18:00',
                    location: 'Municipal Gymnasium',
                    description: '3-on-3 basketball tournament with age group divisions. Prize money for championship teams.',
                    schedule: [
                        { time: '09:00', activity: 'Opening Ceremony' },
                        { time: '10:00', activity: 'Preliminary Rounds' },
                        { time: '14:00', activity: 'Quarter Finals' },
                        { time: '16:00', activity: 'Finals' },
                        { time: '18:00', activity: 'Awards' }
                    ]
                },
                {
                    id: 15,
                    name: 'Fashion Show',
                    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2070',
                    status: 'closed',
                    availableSeats: 0,
                    totalSeats: 150,
                    price: 90,
                    date: '2025-03-10',
                    time: '19:30-21:30',
                    location: 'Taipei Fashion Center',
                    description: 'Spring fashion show featuring new collections from multiple designers. Refreshments provided.',
                    schedule: [
                        { time: '19:30', activity: 'Doors Open' },
                        { time: '20:00', activity: 'Fashion Show Begins' },
                        { time: '21:00', activity: 'Meet the Designers' },
                        { time: '21:30', activity: 'Event Ends' }
                    ]
                },
                {
                    id: 16,
                    name: 'Gaming Tournament',
                    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
                    status: 'open',
                    availableSeats: 40,
                    totalSeats: 50,
                    price: 25,
                    date: '2025-05-25',
                    time: '10:00-20:00',
                    location: 'E-Sports Arena',
                    description: 'Gaming competition featuring multiple popular titles. Valuable prizes for winners.',
                    schedule: [
                        { time: '10:00', activity: 'Check-in & Setup' },
                        { time: '11:00', activity: 'Group Stage Begins' },
                        { time: '15:00', activity: 'Playoffs' },
                        { time: '18:00', activity: 'Grand Finals' },
                        { time: '20:00', activity: 'Prize Ceremony' }
                    ]
                }
            ]
        },

        getEventById(id: number): Event | undefined {
            return this.events.find(event => event.id === id)
        },
    }
})