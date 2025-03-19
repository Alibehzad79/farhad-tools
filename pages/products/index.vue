<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-1">
                    <div class="border dark:border-gray-600 w-1/4 p-3 rounded flex-col gap-5 lg:flex hidden h-screen"
                        v-if="categories_tags">
                        <div class="flex justify-between items-center">
                            <span>جدید</span>
                            <UToggle v-model="newProduct" name="جدید" />
                        </div>
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">دسته بندی ها</span>
                            <div class="flex flex-col gap-5">
                                <UButton label="همه محصولات" @click="getDoSearch(String(''))"
                                    class="w-full justify-center" icon="fluent:pin-16-regular" />
                                <UButton @click="getDoSearch(String(category?.slug))"
                                    v-for="category in categories_tags['categories']" :key="category?.id"
                                    :label="category?.name" class="w-full" icon="fluent:pin-16-regular" />
                            </div>
                        </div>
                        <UDivider />
                        <div class="flex flex-col gap-3">
                            <span class="text-lg">برچسب ها</span>
                            <div class="flex flex-wrap gap-3">
                                <UButton v-for="tag in categories_tags['tags']" :key="tag?.id"
                                    @click="getDoSearch(String(tag?.slug))" :label="tag?.name"
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
                                        <div class="flex justify-between items-center">
                                            <span>جدید</span>
                                            <UToggle v-model="newProduct" name="جدید" />
                                        </div>
                                        <div class="flex flex-col gap-3">
                                            <span class="text-lg">دسته بندی ها</span>
                                            <div class="grid grid-cols-1  md:grid-cols-4 gap-3">
                                                <UButton label="همه محصولات" @click="getDoSearch(String(''))"
                                                    class="w-full justify-center" icon="fluent:pin-16-regular" />
                                                <UButton v-for="category in categories_tags['categories']"
                                                    @click="getDoSearch(String(category?.slug))" :key="category?.id"
                                                    :label="category?.name" class="w-full justify-center"
                                                    icon="fluent:pin-16-regular" />
                                            </div>
                                        </div>
                                        <UDivider />
                                        <div class="flex flex-col gap-5">
                                            <span class="text-lg">برچسب ها</span>
                                            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                                                <UButton v-for="tag in categories_tags['tags']" :key="tag?.id"
                                                    @click="getDoSearch(String(tag?.slug))" :label="tag?.name"
                                                    icon="fluent:tag-16-regular" variant="outline"
                                                    class="justify-center" />
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
                    <div class="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-4 h-full" v-if="products.length > 0">
                        <ProductCard v-for="product in products" :data="product" />
                    </div>
                    <div class="w-full lg:w-3/4" v-if="products.length < 1">
                        <UAlert title="محصولی یافت نشد." color="red" variant="soft"
                            icon="fluent:error-circle-16-regular" description="Not Found 404"
                            :actions="[{ icon: 'fluent:arrow-clockwise-16-regular', variant: 'solid', color: 'rose', click: () => getRefreshAllProduct(), loading: refreshLoading }]" />
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

const newProduct = ref(true)

const productStore = useProductStore()
await productStore.getAllProductList()
await productStore.getCategoriesTags()
const { products, categories_tags } = storeToRefs(productStore)

const { start, set, finish } = useLoadingIndicator()
const refreshLoading = ref(false)
const getRefreshAllProduct = async () => {
    refreshLoading.value = true
    await productStore.getAllProductList()
    await productStore.getCategoriesTags()
    refreshLoading.value = false
}

const loading = ref(false)
const getDoSearch = async (query: string) => {
    newProduct.value = true
    openPopover.value = false
    start()
    await productStore.getSearch(query)
    finish()

}

watch(newProduct, async (newValue, oldValue) => {
    openPopover.value = false
    start()
    const query = ref("new")
    if (!newValue) {
        query.value = "old"
    }
    await productStore.getSearch(query.value)
    finish()
})

</script>

<style></style>