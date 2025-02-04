<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex gap-10">
                    <div class="border dark:border-gray-600 w-1/4 p-3 rounded flex-col gap-5 lg:flex hidden">
                        <span class="text-lg">دسته بندی ها</span>
                    </div>
                    <div class="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5" v-if="products.length > 0">
                        <ProductCard v-for="product in products" :data="product" />
                    </div>
                    <div class="w-full lg:w-3/4" v-if="products.length < 1">
                        <UAlert description="محصولی یافن نشد." color="red" />
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>

import { useProductStore } from '~/stores/product';


definePageMeta({
    name: "products"
})
useSeoMeta({
    title: "محصولات"
})


const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'محصولات',
    icon: 'fluent:building-shop-16-regular'
}]

const productStore = useProductStore()
await productStore.getAllProductList()
const { products } = productStore

</script>

<style></style>