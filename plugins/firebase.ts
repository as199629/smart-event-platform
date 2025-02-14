import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    onAuthStateChanged(auth, (user) => {
        const authStore = useAuthStore()
        if (user) {
            // User is signed in
            authStore.isAuthenticated = true
            authStore.user.name = user.displayName || user.email || 'John Doe'
            authStore.user.avatar = user.photoURL || 'https://via.placeholder.com/150'
        } else {
            // User is signed out
            authStore.isAuthenticated = false
            authStore.user.name = 'John Doe'
            authStore.user.avatar = 'https://via.placeholder.com/150'
        }
    })

    return {
        provide: {
            auth
        }
    }
})
