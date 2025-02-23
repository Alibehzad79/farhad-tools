import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const token = useCookie('token')
    const { isAuthenticated, tokenVerified, user } = storeToRefs(useAuthStore())

    if (token.value) {
        await authStore.getVerifyToken()
        if (tokenVerified.value) {
            await authStore.getUserDetail()
            isAuthenticated.value = true
        } else {
            isAuthenticated.value = false
            user.value = null
        }

    }

    if (token?.value && to?.name === 'login' || token?.value && to?.name === 'register') {
        return navigateTo(from.path)
    }
    if (!token?.value && to?.name !== 'login') {
        isAuthenticated.value = false
        tokenVerified.value = false
        user.value = null
        if (to?.name === 'register') return
        abortNavigation()

        return navigateTo({ name: 'login', query: { backURL: from.path } })
    }


})
