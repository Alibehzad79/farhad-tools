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
        }
    }
})