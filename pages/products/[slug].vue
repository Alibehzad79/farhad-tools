<template>
    <div>
        <div class="mt-10">
            <UContainer>
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-10 mt-10 p-2">
                    <div class="w-full lg:w-1/2">
                        <img :src="product?.image" :alt="product?.title" :title="product?.title" class="rounded-xl w-full">
                    </div>
                    <div class="w-ful lg:w-1/2 flex flex-col gap-10 justify-around">
                        <div class=" flex flex-col gap-3">
                            <h1 class=" text-2xl font-bold">{{ product?.title }}</h1>
                            <p class="text-gray-500">{{ product?.short_description }}</p>
                        </div>
                        <div class="flex flex-col gap-5">
                            <div class="flex items-center gap-3">
                                <span>دسته بندی: </span>
                                <UBadge :label="product?.category.name" size="lg" />
                            </div>
                            <div class="flex flex-wrap gap-3 items-center">
                                <span>برچسب ها:</span>
                                <UBadge v-for="tag in product?.tags" :key="tag.is" :label="tag.name" size="lg" />
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row justify-between gap-3">
                            <UButton :label="'قیمت: ' + toCurrencyString(product?.price) + ' تومان'" size="xl"
                                class="justify-center" />
                            <div class="flex gap-3">
                                <UButton label="اضافه به سبد خرید" size="xl" variant="outline"
                                    class="w-4/5 justify-center" />
                                <UButton icon="fluent:heart-16-regular" size="xl" variant="soft"
                                    class="w-1/5 justify-center" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-10">asd</div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useProductStore } from "~/stores/product"
import { toCurrencyString } from "~/composables/toCurrency"

const route = useRoute()

const productStore = useProductStore()
await productStore.getProduct(route.params.slug)
const { product } = productStore

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
    label: String(product?.title),
    icon: 'fluent:building-shop-16-regular'
},]


useSeoMeta({
    title: String(product?.title)
})
</script>

<style></style>