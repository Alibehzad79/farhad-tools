<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="w-full lg:w-3/4 h-screen p-5 rounded">
                        <div class="w-full grid grid-cols-2 md:grid-cols4 gap-5"
                            v-if="wishlistStore.wishlist?.length > 0">
                            <div v-for="wish in wishlist" :key="wish?.id">
                                <ProductCard :data="wish?.product" />
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
</script>

<style></style>