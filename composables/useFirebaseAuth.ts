import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const useFirebaseAuth = () => {
    const { $auth } = useNuxtApp()
    const user = ref(null)
    const isAuthenticated = ref(false)

    onAuthStateChanged($auth, (userData) => {
        // user.value = userData   
        isAuthenticated.value = !!userData
    })
    const authStore = useAuthStore()
    const signIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup($auth, provider)
            authStore.showLoginModal = false
        } catch (error) {
            console.error('Auth error:', error)
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut($auth)
            console.log('Sign out success')
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    return {
        isAuthenticated,
        user,
        signIn,
        signOut
    }
} 