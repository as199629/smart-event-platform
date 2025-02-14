import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const useAuth = () => {
    const { $auth } = useNuxtApp()
    const user = ref(null)
    const isAuthenticated = ref(false)

    onAuthStateChanged($auth, (userData) => {
        // user.value = userData   
        isAuthenticated.value = !!userData
    })

    const signIn = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup($auth, provider)
        } catch (error) {
            console.error('Auth error:', error)
        }
    }

    const signOut = async () => {
        try {
            await firebaseSignOut($auth)
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