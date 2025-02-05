<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex gap-10">
                    <div class="border dark:border-gray-600 w-1/4 p-3 rounded flex-col gap-5 lg:flex hidden h-screen"
                        v-if="categories_tags">
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">دسته بندی ها</span>
                            <div class="flex flex-col gap-5">
                                <UButton label="همه محصولات" @click="getSearch(String(''))" size="xl" class="w-full"
                                    icon="fluent:pin-16-regular" />
                                <UButton @click="getSearch(String(category?.slug))"
                                    v-for="category in categories_tags['categories']" :key="category?.id"
                                    :label="category?.name" size="xl" class="w-full" icon="fluent:pin-16-regular" />
                            </div>
                        </div>
                        <UDivider />
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">برچسب ها</span>
                            <div class="flex flex-wrap gap-3">
                                <UButton v-for="tag in categories_tags['tags']" :key="tag?.id"
                                    @click="getSearch(String(tag?.slug))" :label="tag?.name" size="xl"
                                    icon="fluent:tag-16-regular" variant="outline" />
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5" v-if="Array.isArray(products)">
                        <div v-if="loading" class="flex justify-center">
                            <Icon name="svg-spinners:ring-resize" size="25" />
                        </div>
                        <ProductCard v-for="product in products" :data="product" v-if="!loading" />
                    </div>
                    <div class="w-full lg:w-3/4" v-if="!Array.isArray(products)">
                        <UAlert description="محصولی یافت نشد." color="red" />
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>

import { string } from 'zod';
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
await productStore.getCategoriesTags()
const products = ref()
products.value = await productStore.getAllProductList()

const { categories_tags } = productStore

const loading = ref(false)
async function getSearch(query: String) {
    loading.value = true
    products.value = await productStore.getSearch(query)
    loading.value = false
}

</script>

<style></style>