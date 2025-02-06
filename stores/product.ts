import { defineStore } from "pinia"

export const useProductStore = defineStore('productStore', {
    state: () => ({
        categories_tags: null,
        product: null,
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
        async getRefreshAllProducts() {
            await this.getAllProductList()
        },
        async getCategoriesTags() {
            const { data, status } = await useFetch('/api/products/categories_tags', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.categories_tags = data.value
            }
            if (status.value === "error") {
                this.categories_tags = null
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
        },
        async getProduct(slug: any) {
            const { data, status } = await useFetch('/api/products/detail', {
                method: "get",
                query: {
                    "slug": slug,
                },
            })
            if (data.value && status.value === "success") {
                this.product = data.value
            }
            if (status.value === "error") {
                this.product = null
            }
        },
        async getRefreshProduct(slug: any) {
            await this.getProduct(slug)
        },
    }
})