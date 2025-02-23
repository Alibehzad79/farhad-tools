<template>
    <div>
        <div class="mt-10">
            <UContainer>
                <UBreadcrumb :links="links" />
                <div v-if="product">
                    <div class="flex flex-col lg:flex-row gap-10 mt-10 p-2">
                        <div class="w-full lg:w-1/2">
                            <img :src="product?.image" :alt="product?.title" :title="product?.title"
                                class="rounded-xl w-full">
                            <div v-if="product?.galleries" class="mt-5">
                                <div class="flex items-center overflow-hidden gap-5 justify-center">
                                    <img v-for="gallery in product?.galleries" :src="gallery.image" :alt="gallery.title"
                                        :title="gallery.title" class="w-[5rem] h-[5rem]"
                                        @click="isOpenGalleryModel = true">
                                    <UModal v-model="isOpenGalleryModel" fullscreen>
                                        <UCard :ui="{
                                            base: 'h-full flex flex-col overflow-scroll',
                                            rounded: '',
                                            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                                            body: {
                                                base: 'grow'
                                            }
                                        }">
                                            <template #header>
                                                <div class="flex items-center justify-between">
                                                    <h3
                                                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                        گالری محصول
                                                    </h3>
                                                    <UButton color="gray" variant="ghost"
                                                        icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                                        @click="isOpenGalleryModel = false" />
                                                </div>
                                            </template>

                                            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                                                <img v-for="gallery in product?.galleries" :src="gallery.image"
                                                    :alt="gallery.title" :title="gallery.title"
                                                    class="w-[20rem] h-[20rem]">
                                            </div>
                                            <template #footer>
                                                <div class="flex items-center justify-between">
                                                    <h3
                                                        class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                        گالری محصول
                                                    </h3>
                                                    <UButton color="gray" variant="ghost"
                                                        icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                                        @click="isOpenGalleryModel = false" />
                                                </div>
                                            </template>
                                        </UCard>
                                    </UModal>
                                </div>
                            </div>
                        </div>
                        <div class="w-ful lg:w-1/2 flex flex-col gap-5 justify-evenly">
                            <div class=" flex flex-col gap-3">
                                <h1 class=" text-2xl font-bold">{{ product?.title }}</h1>
                                <p class="text-gray-500 line-clamp-5">{{ product?.short_description }}</p>
                            </div>
                            <div class="flex flex-col gap-5">
                                <div class="flex items-center gap-3">
                                    <span>دسته بندی: </span>
                                    <UBadge v-if="product?.category" :label="String(product?.category?.name)"
                                        size="lg" />
                                </div>
                                <div class="flex flex-wrap gap-3 items-center">
                                    <span>برچسب ها:</span>
                                    <UBadge v-if="product?.tags" v-for="tag in product?.tags" :key="tag?.id"
                                        :label="String(tag?.name)" size="lg" />
                                </div>
                            </div>
                            <div class="flex flex-col lg:flex-row justify-between gap-3"
                                v-if="product?.status === 'active'">
                                <div v-if="product?.discount > 0">
                                    <UChip :text="product?.discount + '%'" color="red" size="xl" position="top-left"
                                        class="w-full">
                                        <UButton :label="toCurrencyString(product?.discount_price) + ' تومان'"
                                            class="w-full justify-center" size="lg" variant="soft" />
                                    </UChip>
                                    <span class="text-gray-500 text-sm line-through">{{ toCurrencyString(product?.price)
                                    }}
                                        تومان</span>
                                </div>
                                <UButton v-if="product?.discount <= 0"
                                    :label="toCurrencyString(product?.price) + ' تومان'" class="justify-center"
                                    size="lg" variant="soft" />
                                <div class="flex flex-col gap-3">
                                    <div class="flex flex-col items-center gap-5" v-if="cart && isAuthenticated">
                                        <div>
                                            <div class="w-full sm:w-auto flex items-center gap-2">
                                                <UButton variant="ghost" label="+" @click="increment"
                                                    :disabled="quntityValue >= data?.product?.count" />
                                                <UInput type="number" v-model="quntityValue" disabled size="lg"
                                                    :min="minValue" :max="data?.product?.count"
                                                    class="w-full sm:w-auto">
                                                </UInput>
                                                <UButton variant="ghost" label="-" @click="decrement"
                                                    v-if="quntityValue > 1" />
                                                <UButton variant="ghost" icon="fluent:delete-16-regular"
                                                    v-if="quntityValue <= 1" color="red" @click="deleteCart" />
                                                <UTooltip
                                                    :text="!isAuthenticated ? 'برای افزودن به لیست علاقه مندی ها، وارد اکانت شوید.' : isInWishlist ? ' حذف از لیست علاقه مندی ها' : 'افزودن به لیست علاقه مندی ها'">
                                                    <UButton
                                                        :icon="isInWishlist ? 'fluent:heart-16-filled' : 'fluent:heart-16-regular'"
                                                        size="xl" variant="soft" @click="toggleWishlist"
                                                        :disabled="!isAuthenticated" />
                                                </UTooltip>
                                            </div>

                                        </div>
                                        <div class="flex items-center">
                                            <span>در سبد شما</span>
                                            <NuxtLink :to="{ name: 'carts' }">
                                                <UButton label="مشاهده سبد خرید" variant="link" color="red" />
                                            </NuxtLink>
                                        </div>
                                    </div>
                                    <div v-else class="flex gap-3">
                                        <UButton label="اضافه به سبد خرید" @click="addToCart" size="xl"
                                            variant="outline" class="w-4/5 justify-center"
                                            :disabled="!isAuthenticated" />
                                        <UTooltip
                                            :text="!isAuthenticated ? 'برای افزودن به لیست علاقه مندی ها، وارد اکانت شوید.' : isInWishlist ? ' حذف از لیست علاقه مندی ها' : 'افزودن به لیست علاقه مندی ها'">
                                            <UButton
                                                :icon="isInWishlist ? 'fluent:heart-16-filled' : 'fluent:heart-16-regular'"
                                                size="xl" variant="soft" @click="toggleWishlist"
                                                :disabled="!isAuthenticated" />
                                        </UTooltip>
                                    </div>
                                    <span class="block text-red-500" v-if="!isAuthenticated">برای خرید <NuxtLink
                                            :to="{ name: 'login', query: { backURL: route.path } }" class="underline">
                                            وارد</NuxtLink> شوید</span>
                                </div>
                            </div>
                            <UButton disabled v-if="product?.status !== 'active'" label="ناموجود" color="rose"
                                class="justify-center" size="xl" variant="solid" />
                        </div>
                    </div>
                    <div class="mt-10">
                        <UTabs :items="items" class="w-full">
                            <template #item="{ item }">
                                <UCard>
                                    <div v-if="item.key === 'desc'" class="space-y-3">
                                        <div v-html="item?.content"></div>
                                    </div>
                                    <div v-else-if="item.key === 'options'" class="space-y-3">
                                        <div v-if="product?.options" class="flex flex-col gap-5">
                                            <div class="flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
                                                v-for="option in product?.options">
                                                <span>{{ option.title }}:</span>
                                                <span>{{ option.description }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </UCard>
                            </template>
                        </UTabs>
                    </div>
                </div>
                <div v-else>
                    <UAlert :title="`محصول [ ${route.params.slug.replaceAll(' ', '-')} ] یافت نشد.`"
                        description="404 Not Found" color="primary" variant="outline"
                        icon="fluent:error-circle-16-regular" ,
                        :actions="[{ label: 'بارگزاری مجدد', variant: 'solid', size: 'xl', click: () => getRefreshProduct(), loading: refreshLoading }]" />
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProductStore } from "~/stores/product"
import { useCartStore } from "~/stores/carts"
import { useAuthStore } from "~/stores/auth"
import { useWishlistStore } from '~/stores/wishlist'
import { storeToRefs } from 'pinia'
import { toCurrencyString } from "~/composables/toCurrency"

const { isAuthenticated } = storeToRefs(useAuthStore())

const route = useRoute()
const productStore = useProductStore()
await productStore.getProduct(String(route.params.slug))
const { product, pending } = storeToRefs(productStore)
const cartStore = useCartStore()
await cartStore.getUserCarts()
await cartStore.checkCartExists(product?.value?.slug)
const { cart, carts } = storeToRefs(cartStore)

const wishlistStore = useWishlistStore()
const isInWishlist = ref(await wishlistStore.checkExistProduct(product?.value?.slug ?? false))

const toggleWishlist = async () => {
    const data = {
        "product_slug": product?.value?.slug
    }
    const resulte = await wishlistStore.toggleWishlist(data)
    if (resulte === "success") {
        isInWishlist.value = true
    } else {
        isInWishlist.value = false
    }
}


const quntityValue = ref(cart?.value?.quantity ?? 1)

const refreshLoading = ref(false)
const getRefreshProduct = async () => {
    refreshLoading.value = true
    await productStore.getProduct(String(route.params.slug))
    refreshLoading.value = false
}


const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'محصولات',
    icon: 'fluent:building-shop-16-regular',
    to: '/products'
},
{
    label: product?.value?.title ? String(product?.value?.title) : 'محصول نامشخص',
    icon: 'fluent:building-shop-16-regular'
},]

const items = [{
    key: "desc",
    label: 'توضیحات',
    icon: 'fluent:content-view-16-regular',
    content: product?.value?.content ? String(product?.value?.content) : 'توضیحات'
}, {
    key: "options",
    label: 'آپشن ها',
    icon: 'fluent:options-16-regular',
    content: 'And, this is the content for Tab2'
},]

const isOpenGalleryModel = ref(false)

const router = useRouter()
const toast = useToast()
const editLoading = ref(false)

const increment = async () => {
    editLoading.value = true
    quntityValue.value++
    if (quntityValue.value > product?.value?.count) {
        quntityValue.value = product?.value?.count
    } else {
        const data = ref({
            'product_slug': product?.value?.slug,
            'quantity': quntityValue.value
        })
        const reslute = await cartStore.getEditCart(data.value)
        if (reslute === "error") {
            toast.add({
                title: "کارتی یافت نشد.",
                color: "red",
                timeout: 1000,
                description: "در حال بروزرسانی صفحه...",
                callback: () => {
                    router.go(0)
                }
            })
        }
    }

    editLoading.value = false
}

const decrement = async () => {
    editLoading.value = true
    quntityValue.value--
    if (quntityValue.value < 0) {
        quntityValue.value = 1
    }
    const data = ref({
        'product_slug': product?.value?.slug,
        'quantity': quntityValue.value
    })
    const reslute = await cartStore.getEditCart(data.value)
    if (reslute === "error") {
        toast.add({
            title: "کارتی یافت نشد.",
            color: "red",
            timeout: 1000,
            description: "در حال بروزرسانی صفحه...",
            callback: () => {
                router.go(0)
            }
        })
    }
    editLoading.value = false

}

const deleteCart = async () => {
    const data = ref({
        "cart_id": cart.value?.id
    })
    const reslute = await cartStore.getDeleteCart(data.value)
    if (reslute === "success") {
        await cartStore.getUserCarts()
        toast.add({
            title: "با موفقیت حذف شد.",
            color: "green",
            timeout: 1000,
        })
    } else {
        toast.add({
            title: "کارت یافت نشد.",
            color: "red",
            timeout: 1000,
        })
    }
}

const addToCart = async () => {
    const data = {
        "product_slug": product?.value?.slug,
        "quantity": 1
    }
    const reslute = await cartStore.addToCart(data)
    if (reslute === "success") {
        cartStore.checkCartExists(product?.value?.slug)
        toast.add({
            title: "با موفقیت به سبد خرید اضافه شد.",
            color: "green",
            timeout: 1000,
        })
    } else {
        toast.add({
            title: "خطا در پردازش اطلاعات",
            color: "red",
            timeout: 1000,
        })
    }
}

useSeoMeta({
    title: product?.value?.title ?? 'محصول',
    description: product?.value?.short_description ?? 'توضیحات',
    ogTitle: product?.value?.title ?? 'محصول',
    ogDescription: product?.value?.short_description ?? 'توضیحات',
    ogImage: product?.value?.image ?? 'Image',
    twitterCard: 'summary_large_image',
    keywords: product?.value?.keywords ?? 'keywords',
})
</script>

<style></style>