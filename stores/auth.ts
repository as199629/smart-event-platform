export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const user = ref({
        name: 'userName',
        avatar: 'https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?q=80&w=3115&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        email: '',
        googleId: '',
    })
    const showLoginModal = ref(false)

    // Add functions to control login modal
    const openLoginModal = () => {
        showLoginModal.value = true
    }

    const closeLoginModal = () => {
        showLoginModal.value = false
    }

    return {
        isAuthenticated,
        user,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
    }
})
