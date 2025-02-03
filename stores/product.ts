import { defineStore } from "pinia"

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: []
    }),
    actions: {
        async getAllProductList() {
            const { data, status } = await useFetch('/api/products/list', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.products = data.value
            }
            if (status.value === "error") {
                return String("خطا در اتصال.")
            }
        }
    }
})