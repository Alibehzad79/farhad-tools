import { defineStore } from "pinia"

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: null,
        categories_tags: null,
    }),
    actions: {
        async getAllProductList() {
            const { data, status } = await useFetch('/api/products/list', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                return data.value
            }
            if (status.value === "error") {
                return String("خطا در اتصال.")
            }
        },
        async getCategoriesTags() {
            const { data, status } = await useFetch('/api/products/categories_tags', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.categories_tags = data.value
            }
            if (status.value === "error") {
                return String("خطا در اتصال.")
            }
        },
        async getSearch(query: String) {
            const { data, status } = await useFetch('/api/products/search', {
                method: "get",
                query: {
                    "query": query
                }
            })
            if (data.value && status.value === "success") {
                return data.value
            }
            if (status.value === "error") {
                return String("خطا در اتصال.")
            }
        },
    }
})