<template>
    <div>
        <div class="mt-10">
            <UContainer>
                <div v-if="product">
                    <UBreadcrumb :links="links" />
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
                                <div class="flex gap-3">
                                    <UButton label="اضافه به سبد خرید" size="xl" variant="outline"
                                        class="w-4/5 justify-center" />
                                    <UButton icon="fluent:heart-16-regular" size="xl" variant="soft"
                                        class="w-1/5 justify-center" />
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
                        description="404 Not Found" color="red" icon="fluent:error-circle-16-regular" ,
                        :actions="[{ label: 'بارگزاری مجدد', variant: 'solid', size: 'xl', click: () => getRefreshProduct(), loading: refreshLoading }]" />
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useProductStore } from "~/stores/product"
import { storeToRefs } from 'pinia'
import { toCurrencyString } from "~/composables/toCurrency"

const route = useRoute()
const productStore = useProductStore()
await productStore.getProduct(String(route.params.slug))
const { product } = storeToRefs(productStore)


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

const schema = z.object({
    email: z.string().email('ایمیل نامعتبر'),
    comment: z.string(),
    full_name: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: undefined,
    comment: undefined,
    full_name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with data
    console.log(event.data)
}

const isOpenGalleryModel = ref(false)

useSeoMeta({
    title: product?.value?.title ? String(product?.value?.title) : 'محصول'
})
</script>

<style></style>