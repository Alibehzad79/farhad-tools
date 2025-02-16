import { defineStore } from "pinia"

export const useWishlistStore = defineStore('wishlistStore', {
    state: () => ({
        wishlist: null
    }),
    actions: {
        async getUserWishlist() {
            const { data, status } = await useFetch<null>('/api/wishlist/list', {
                method: "get"
            })
            if (data.value && status.value === "success") {
                this.wishlist = data.value
            } else {
                this.wishlist = null
            }
        },
        async toggleWishlist(body: object) {
            const { data, status } = await useFetch('/api/wishlist/toggle', {
                method: "post",
                body: JSON.stringify(body)
            })
            await this.getUserWishlist()
            return status.value
        },
        async checkExistProduct(slug: string) {
            await this.getUserWishlist()
            if (this.wishlist?.some(wish => slug === wish?.product?.slug)) {
                return true
            } else {
                return false
            }
        }
    }
})