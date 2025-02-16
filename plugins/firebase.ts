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
            console.log('User is signed in')
            console.log(user)
            // User is signed in
            authStore.isAuthenticated = true
            authStore.user.name = user.displayName || 'userName'
            authStore.user.avatar = user.photoURL || 'https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
