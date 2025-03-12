<template>
    <div>
        <UContainer class="mt-10 flex flex-col gap-10">
            <UBreadcrumb :links="links" />
            <div v-if="products.length > 0">
                <div class="w-full grid grid-cols-1 md:grid-cols-5">
                    <ProductCard v-for="product in products" :data="product" />
                </div>
            </div>
            <div v-if="products.length < 1">
                <UAlert title="محصولی یافت نشد." color="red" variant="soft" icon="fluent:error-circle-16-regular"
                    :description="`محصولی با اطلاعات  '${String(route.query.query)}' یافت نشد.`" />
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useProductStore } from "~/stores/product"

const route = useRoute()
const productStore = useProductStore()

const { products } = storeToRefs(productStore)

await productStore.getSearch(String(route.query.query))

const { start, set, finish } = useLoadingIndicator()

definePageMeta({
    name: "search"
})

useSeoMeta({
    title: "جستوجوی" + `'${String(route.query.query)}'`
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'جستوجو',
    icon: 'fluent:search-16-regular'
},
{
    label: `${products?.value?.length ?? 0} محصول یافت شد.`,
    icon: 'fluent:text-word-count-20-regular'
}]

watch(route, async (newValue, oldValue) => {
    if (newValue) {
        start()
        await productStore.getSearch(String(newValue.query.query))
        finish()
    }
})

</script>

<style></style>