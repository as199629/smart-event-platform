export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = useAuth()
    
    if (!isAuthenticated.value && to.path !== '/auth/signIn') {
        return navigateTo('/auth/signIn')
    }
}) 