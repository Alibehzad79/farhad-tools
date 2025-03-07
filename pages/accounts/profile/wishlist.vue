<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="w-full lg:w-3/4 h-screen p-5 rounded">
                        <div class="w-full grid grid-cols-1 md:grid-cols-4" v-if="wishlistStore.wishlist?.length > 0">
                            <div v-for="wish in wishlist" :key="wish?.id" class="relative">
                                <ProductCard :data="wish?.product" />
                                <UButton class="absolute left-1 -top-3" icon="fluent:delete-16-regular" color="rose"
                                    variant="soft" @click="toggleWishlist(wish?.product)" />
                            </div>
                        </div>
                        <div v-if="wishlistStore.wishlist?.length < 1">
                            <UAlert title="محصولی یافت نشد." description="لیست علاقه مندی های شما خالی است."
                                color="primary" variant="soft" icon="fluent:error-circle-16-regular" />
                        </div>
                    </div>
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useWishlistStore } from '~/stores/wishlist'

definePageMeta({
    name: 'wishlist',
    middleware: 'auth'
})

const wishlistStore = useWishlistStore()
await wishlistStore.getUserWishlist()

const { wishlist } = storeToRefs(wishlistStore)
useSeoMeta({
    title: 'علاقه مندی ها'
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'علاقه مندی ها',
    icon: 'fluent:person-heart-20-regular'
},]

const toggleWishlist = async (product) => {
    const data = {
        "product_slug": product?.slug
    }
    const resulte = await wishlistStore.toggleWishlist(data)
    if (resulte === "success") {
        isInWishlist.value = true
    } else {
        isInWishlist.value = false
    }
}

</script>

<style></style>