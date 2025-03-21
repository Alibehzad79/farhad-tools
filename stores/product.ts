import { defineStore } from "pinia"

export const useProductStore = defineStore('productStore', {
    state: () => ({
        categories_tags: [],
        product: null,
        products: [],
        newProducts: [],
        popularProducts: [],
        discountProducts: [],
    }),
    actions: {
        async getAllProductList() {
            const { data, status, error } = await useFetch<[]>('/api/products/list', {
                method: "get"
            })
            if (data?.value && status.value === "success") {
                this.products = data?.value
            } else {
                this.products = []
            }
        },
        async getCategoriesTags() {
            const { data, status } = await useFetch<[]>('/api/products/categories_tags', {
                method: "get"
            })
            if (data?.value && status.value === "success") {
                this.categories_tags = data?.value
            } else {
                this.categories_tags = []
            }
        },
        async getSearch(query: string) {
            const { data, status } = await useFetch<[]>('/api/products/search', {
                method: "get",
                query: {
                    "query": query
                },
            })
            if (data?.value && status.value === "success") {
                this.products = data?.value
            } else {
                this.products = []
            }
        },
        async getProduct(slug: string) {
            const { data, status } = await useFetch<null>('/api/products/detail', {
                method: "get",
                params: { slug }
            })
            if (data?.value && status.value === "success") {
                this.product = data?.value
            } else {
                this.product = null
            }
        },
        async getNewProductList() {
            const { data, status, error } = await useFetch<[]>('/api/products/search', {
                method: "get",
                query: {
                    "query": 'new'
                },
            })
            if (data?.value && status.value === "success") {
                this.newProducts = data?.value
            } else {
                this.newProducts = []
            }
        },
        async getPopualrProductList() {
            const { data, status, error } = await useFetch<[]>('/api/products/search', {
                method: "get",
                query: {
                    "query": 'view'
                },
            })
            if (data?.value && status.value === "success") {
                this.popularProducts = data?.value
            } else {
                this.popularProducts = []
            }
        },
        async getDiscountProductList() {
            const { data, status, error } = await useFetch<[]>('/api/products/search', {
                method: "get",
                query: {
                    "query": 'discount'
                },
            })
            if (data?.value && status.value === "success") {
                this.discountProducts = data?.value
            } else {
                this.discountProducts = []
            }
        },
    }
})