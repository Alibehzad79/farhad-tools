<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-10">
                    <div class="border dark:border-gray-600 w-1/4 p-3 rounded flex-col gap-5 lg:flex hidden h-screen"
                        v-if="productStore.categories_tags">
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">دسته بندی ها</span>
                            <div class="flex flex-col gap-5">
                                <UButton label="همه محصولات" @click="getDoSearch(String(''))" size="xl" class="w-full"
                                    icon="fluent:pin-16-regular" />
                                <UButton @click="getDoSearch(String(category?.slug))"
                                    v-for="category in categories_tags['categories']" :key="category?.id"
                                    :label="category?.name" size="xl" class="w-full" icon="fluent:pin-16-regular" />
                            </div>
                        </div>
                        <UDivider />
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">برچسب ها</span>
                            <div class="flex flex-wrap gap-3">
                                <UButton v-for="tag in categories_tags['tags']" :key="tag?.id"
                                    @click="getDoSearch(String(tag?.slug))" :label="tag?.name" size="xl"
                                    icon="fluent:tag-16-regular" variant="outline" />
                            </div>
                        </div>
                    </div>
                    <div class="lg:hidden w-full">
                        <UPopover class="z-40" overlay :ui="{ base: 'w-screen px-5 h-full' }"
                            v-model:open="openPopover">
                            <UButton color="white" label="فیلتر" trailing-icon="fluent:arrow-down-16-regular"
                                icon="fluent:filter-16-regular" />

                            <template #panel>
                                <div class="p-4 w-full">
                                    <div class="flex flex-col gap-5" v-if="productStore.categories_tags">
                                        <div class="flex flex-col gap-3">
                                            <span class="text-lg">دسته بندی ها</span>
                                            <div class="flex flex-col gap-5">
                                                <UButton label="همه محصولات" @click="getDoSearch(String(''))" size="xl"
                                                    class="w-full" icon="fluent:pin-16-regular" />
                                                <UButton v-for="category in categories_tags['categories']"
                                                    @click="getDoSearch(String(category?.slug))" :key="category?.id"
                                                    :label="category?.name" size="xl" class="w-full"
                                                    icon="fluent:pin-16-regular" />
                                            </div>
                                        </div>
                                        <UDivider />
                                        <div class="flex flex-col gap-5">
                                            <span class="text-lg">برچسب ها</span>
                                            <div class="flex flex-col gap-3">
                                                <UButton v-for="tag in categories_tags['tags']" :key="tag?.id"
                                                    @click="getDoSearch(String(tag?.slug))" :label="tag?.name" size="xl"
                                                    icon="fluent:tag-16-regular" variant="outline" />
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="w-full">
                                        خالی
                                    </div>
                                </div>
                            </template>
                        </UPopover>
                    </div>

                    <div class="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-5" v-if="productStore.products">
                        <MyLoading v-if="loading" />
                        <ProductCard v-for="product in products" :data="product" v-if="!loading" />
                    </div>
                    <div class="w-full lg:w-3/4" v-if="!productStore.products">
                        <UAlert title="محصولی یافت نشد." description="404 Not Found" color="primary" variant="outline"
                            icon="fluent:error-circle-16-regular"
                            :actions="[{ label: 'بارگزاری مجدد', variant: 'solid', size: 'xl', click: () => getRefreshAllProduct(), loading: refreshLoading }]" />
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '~/stores/product';
import { storeToRefs } from 'pinia'

definePageMeta({
    name: "products"
})
useSeoMeta({
    title: "محصولات"
})

const openPopover = ref(false)

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
await productStore.getCategoriesTags()
const { products, categories_tags, pending } = storeToRefs(productStore)


const refreshLoading = ref(false)
const getRefreshAllProduct = async () => {
    refreshLoading.value = true
    await productStore.getAllProductList()
    await productStore.getCategoriesTags()
    refreshLoading.value = false
}

const loading = ref(false)
const getDoSearch = async (query: string) => {
    openPopover.value = false
    loading.value = true
    await productStore.getSearch(query)
    loading.value = false

}

</script>

<style></style>