<template>
    <div>
        <div class="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl"
            v-if="discountProducts.length > 0">
            <div class="p-3 rounded-xl rounded-b-none bg-red-500 text-white flex justify-between items-center">
                <strong>پر تخفیف ترین محصولات</strong>
                <UButton label="دیدن همه" variant="link" :to="{ name: 'search', query: { query: 'discount' } }"
                    color="white" trailing-icon="fluent:arrow-circle-left-16-regular" />
            </div>
            <UCarousel :items="discountProducts.slice(0, 8)"
                :ui="{ item: 'basis-full md:basis-1/3 lg:basis-1/6', container: 'gap-5 p-3' }"
                class="rounded-lg overflow-hidden p-4" indicators arrows dir="rtl" ref="carouselRef">
                <template #default="{ item }">
                    <ProductCard :data="item" />
                </template>

            </UCarousel>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { storeToRefs } from 'pinia'
import { useProductStore } from "~/stores/product"

const productStore = useProductStore()
await productStore.getDiscountProductList()
const { discountProducts } = storeToRefs(productStore)

</script>

<style></style>