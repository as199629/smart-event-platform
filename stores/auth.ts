export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const user = ref({
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
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
