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
                token.value = data?.value?.access
                refresh.value = data?.value?.refresh
                this.isAuthenticated = true
                await this.getUserDetail()
            } else {
                this.isAuthenticated = false
                token.value = ''
                refresh.value = ''
            }
            return status.value
        },
        async getRegister(body: Object) {
            const { data, status, error } = await useFetch('/api/accounts/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (status.value === "success") {
                return status.value
            }
            if (error) {
                if (error.value?.data['email']) {
                    return String(error.value?.data['email'])
                } else {
                    return "خطای ناشناخنه، لطفا دوباره امتحان کنید."
                }
            }
        },
        async getSendResetPasswordEmail(body: object) {
            const { data, status, error } = await useFetch('/api/accounts/send-reset-password-email', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (status.value === "success") {
                return status.value
            }
            if (error) {
                if (error.value?.data['email']) {
                    return String(error.value?.data['email'])
                } else {
                    return "خطای ناشناخنه، لطفا دوباره امتحان کنید."
                }
            }
        },
        async getChangePassowrd(body: object) {
            const { data, status, error } = await useFetch('/api/accounts/change-password', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if (status.value === "success") {
                return status.value
            }
            if (error) {
                if (error.value?.data['token']) {
                    return String(error.value?.data['token'])
                } else {
                    return "خطای ناشناخنه، لطفا دوباره امتحان کنید."
                }
            }
        },
        async getLogout() {
            const token = useCookie('token')
            const refresh = useCookie('refresh')
            this.isAuthenticated = false
            token.value = ""
            refresh.value = ""
        },
        async getVerifyToken() {
            const token = useCookie('token')
            const refresh = useCookie('refresh')
            const { data, status, error } = await useFetch('/api/accounts/verify-token', {
                method: "post",
            })
            if (status.value === "success") {
                this.tokenVerified = true
            } else {
                this.isAuthenticated = false
                this.tokenVerified = false
                token.value = ''
                refresh.value = ''

            }
        },

        async getUserDetail() {
            const { data, status } = await useFetch<{}>('/api/accounts/profile/detail', {
                method: 'get',
            })
            if (data.value && status.value === "success") {
                this.user = data?.value
            } else {
                this.user = {}
            }
        },
        async getEditUserDetail(body: Object) {
            const { data, status } = await useFetch<null>('/api/accounts/profile/edit', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            return status.value
        },
    }
})