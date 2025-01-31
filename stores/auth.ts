import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        tokenVerified: false,
        user: {},
    }),
    actions: {
        async getLogin(body: Object) {
            const token = useCookie('token')
            const refresh = useCookie('refresh')
            const { data, status, error } = await useFetch('/api/accounts/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (data.value && status.value === "success") {
                token.value = data.value.access
                refresh.value = data.value.refresh
                this.isAuthenticated = true
            }
            return status.value
        }
    }
})