import { defineStore } from "pinia"

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orders: [],
        order: {},
        error: ""
    }),
    actions: {
        async getCreateOrder(body: object) {
            const config = useRuntimeConfig()
            const token = useCookie("token")
            this.error = ""
            const { data, status, error } = await useFetch("/api/orders/create", {
                method: "post",
                body: JSON.stringify(body)
            })
            if (data.value && status.value === "success") {
                return navigateTo({ path: config.public.backend_url + '/api/v1/orders/request/', query: { 'order_id': data?.value?.order_id, "token": token.value } }, { external: true })
            }
            else {
                this.error = "خطا"
            }
        },
        async getUserOrders() {
            this.error = ""
            const { data, status, error } = await useFetch<null>("/api/orders/list", {
                method: "get",
            })
            if (data.value && status.value === "success") {
                this.orders = data.value
            } else {
                this.orders = []
                this.error = "خطا"
            }
        },
        async orderDetail(query: string) {
            const { data, status, error } = await useFetch<null>('/api/orders/detail', {
                method: "get",
                query: {
                    "order_id": query
                }
            })
            if (data.value && status.value === "success") {
                this.order = data.value
            }
            if (error) {
                this.order = {}
                this.error = error.value?.data['msg']
            }
        }
    }
})