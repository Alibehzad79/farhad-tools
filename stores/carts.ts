import { defineStore } from 'pinia'

export const useCartStore = defineStore('carts', {
    state: () => ({
        carts: {},
        loading: false,
        cart: null
    }),
    actions: {
        async getUserCarts() {
            const { data, status } = await useFetch<{}>('/api/carts/list', {
                method: 'get',
                key: 'user-carts'
            })
            if (data?.value && status.value === "success") {
                this.carts = data?.value
            }
            else {
                this.carts = { "carts": [], "amount": 0 }
            }
        },
        async getEditCart(body: object) {
            const { data, status, pending } = await useFetch('/api/carts/edit', {
                method: 'post',
                body: JSON.stringify(body)
            })
            if (data?.value && status.value === "success") {
                await this.getUserCarts()
            }
            return status.value
        },
        async getDeleteCart(body: object) {
            const { status } = await useFetch('/api/carts/delete', {
                method: 'delete',
                body: JSON.stringify(body)
            })
            this.cart = null
            await this.getUserCarts()
            return status.value
        },

        async checkCartExists(productSlug: string) {
            await this.getUserCarts()
            if (this.carts?.carts.some(cart => cart?.product?.slug === productSlug)) {
                this.cart = this.carts?.carts.find(cart => cart?.product?.slug === productSlug);
            } else {
                this.cart = null
            }
        },
        // add to cart list.

    }
})