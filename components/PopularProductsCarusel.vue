<template>
    <div>
        <div class="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl" v-if="popularProducts.length > 0">
            <div class="shadow p-4 rounded-xl rounded-b-none bg-primary text-white">
                پربازدید ترین محصولات
            </div>
            <UCarousel :items="popularProducts.slice(0, 8)"
                :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3', container: 'gap-5 p-3' }"
                class="rounded-lg overflow-hidden shadow p-4" indicators arrows dir="rtl" ref="carouselRef">
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
await productStore.getPopualrProductList()
const { popularProducts } = storeToRefs(productStore)

</script>

<style></style>