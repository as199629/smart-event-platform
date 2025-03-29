const authStore = useAuthStore()

export default function () {
    if (!authStore.isAuthenticated) return navigateTo('/')
}
