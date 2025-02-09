import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const token = useCookie('token')
    const { isAuthenticated, tokenVerified } = storeToRefs(useAuthStore())

    if (token.value) {
        await authStore.getVerifyToken()
        if (tokenVerified.value) {
            isAuthenticated.value = true
        } else {
            isAuthenticated.value = false
        }

    }

    if (token?.value && to?.name === 'login' || token?.value && to?.name === 'register') {
        return from.path
    }
    if (!token?.value && to?.name !== 'login') {
        isAuthenticated.value = false
        tokenVerified.value = false
        if (to?.name === 'register') return
        abortNavigation()
        return navigateTo({ name: 'login' })
    }


})
