import { initializeApp } from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
} from 'firebase/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey,
        authDomain: config.public.firebaseAuthDomain,
        projectId: config.public.firebaseProjectId,
        storageBucket: config.public.firebaseStorageBucket,
        messagingSenderId: config.public.firebaseMessagingSenderId,
        appId: config.public.firebaseAppId,
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const authStore = useAuthStore()

    onAuthStateChanged(auth, user => {
        if (user) {
            console.log('User is signed in')
            console.log(user)
            // User is signed in
            authStore.isAuthenticated = true
            authStore.user.name = user.displayName || 'userName'
            authStore.user.avatar =
                user.photoURL ||
                'https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            authStore.user.email = user.email || ''
            authStore.user.googleId = user.uid || ''
            authStore.showLoginModal = false
        } else {
            // User is signed out
            authStore.isAuthenticated = false
            authStore.user.name = ''
            authStore.user.avatar = ''
            authStore.user.email = ''
            authStore.user.googleId = ''
        }
    })
})

export const useAuthActions = () => {
    const auth = getAuth()

    const signIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.error('Auth error:', error)
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut(auth)
            console.log('Sign out success')
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    return { signIn, signOut }
}
