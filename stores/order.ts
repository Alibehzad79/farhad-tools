import { defineStore } from "pinia"

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        error: null
    }),
    actions: {
        async getCreateOrder(body: object) {
            const config = useRuntimeConfig()
            const token = useCookie("token")
            this.error = null
            const { data, status, error } = await useFetch("/api/orders/create", {
                method: "post",
                body: JSON.stringify(body)
            })
            if (data.value && status.value === "success") {
                // return navigateTo(config.public.backend_url + '/api/v1/orders/pay/', { external: true })
                return navigateTo({ path: config.public.backend_url + '/api/v1/orders/request/', query: { 'order_id': data?.value?.order_id, "token": token.value } }, { external: true })
            }
            else {
                this.error = "خطا"
            }
        }
    }
})