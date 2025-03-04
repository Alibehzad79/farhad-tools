<template>
    <div>
        <div
            class="flex flex-col gap-3 w-full h-[25rem] hover:shadow-xl p-1 items-start lg:border lg:dark:border-gray-800">
            <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }">
                <img :src="data?.image" :alt="data?.title" :title="data?.title" class="w-96 h-[15rem] select-none"
                    loading="lazy" draggable="false">
            </NuxtLink>
            <div class="flex flex-col justify-around gap-3 w-full h-full">
                <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }"><strong
                        class="text-sm lg:text-md select-none line-clamp-2 font-normal">{{
                            data?.title
                        }}</strong>
                </NuxtLink>
                <div class="flex justify-between w-full">
                    <div v-if="data?.status === 'active'">
                        <div v-if="data?.discount > 0" class="flex flex-col gap-2">
                            <UChip :text="data?.discount + '%'" color="red" size="xl" position="top-left">
                                <span>{{ toCurrencyString(data?.discount_price) + ' تومان' }}</span>
                            </UChip>
                            <span class="text-gray-500 text-xs line-through">{{ toCurrencyString(data?.price) }}
                                تومان</span>
                        </div>
                        <span v-if="data?.discount <= 0">{{ toCurrencyString(data?.price) + ' تومان' }}</span>
                    </div>
                    <UButton disabled v-if="data?.status !== 'active'" label="ناموجود" color="rose"
                        class="justify-center" variant="solid" />
                    <div class="flex gap-1 items-center">
                        <UTooltip
                            :text="!authStore.isAuthenticated ? 'برای افزودن به لیست علاقه مندی ها، وارد اکانت شوید.' : isInWishlist ? ' حذف از لیست علاقه مندی ها' : 'افزودن به لیست علاقه مندی ها'">
                            <UButton :icon="isInWishlist ? 'fluent:heart-16-filled' : 'fluent:heart-16-regular'"
                                @click="toggleWishlist" :disabled="!authStore.isAuthenticated" variant="ghost" />
                        </UTooltip>
                    </div>
                </div>
            </div>
        </div>
        <UDivider class="lg:hidden" />
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth"
import { useWishlistStore } from '~/stores/wishlist'
const props = defineProps({
    data: Object
})

import { toCurrencyString } from "~/composables/toCurrency"

const authStore = useAuthStore()

const wishlistStore = useWishlistStore()
const isInWishlist = ref(await wishlistStore.checkExistProduct(props.data?.slug ?? false))

const toggleWishlist = async () => {
    const data = {
        "product_slug": props.data?.slug
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