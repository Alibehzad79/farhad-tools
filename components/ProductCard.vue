<template>
    <div>
        <div class="flex flex-col gap-3 w-full h-[25rem] hover:shadow-xl p-1 items-start lg:border lg:dark:border-gray-800 cursor-pointer"
            @click="navigateTo({ name: 'products-slug', params: { slug: data?.slug } })">
            <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }">
                <img :src="data?.image" :alt="data?.title" :title="data?.title" class="w-96 h-[15rem] select-none"
                    loading="lazy" draggable="false">
            </NuxtLink>
            <div class="flex flex-col justify-around gap-3 w-full h-full">
                <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }"><strong
                        class="text-sm lg:text-md select-none line-clamp-2 font-normal">{{
                            data?.title
                        }}</strong>
                </NuxtLink>
                <div class="flex justify-between w-full">
                    <div v-if="data?.status === 'active'">
                        <div v-if="data?.discount > 0" class="flex flex-col gap-2">
                            <span>{{ toCurrencyString(data?.discount_price) + ' تومان' }}</span>
                            <span class="text-gray-500 text-xs line-through">{{ toCurrencyString(data?.price) }}
                                تومان</span>
                        </div>
                        <span v-if="data?.discount <= 0">{{ toCurrencyString(data?.price) + ' تومان' }}</span>
                    </div>
                    <UButton disabled v-if="data?.status !== 'active'" label="ناموجود" color="rose"
                        class="justify-center" variant="solid" />
                    <div class="flex gap-1 items-center p-1">
                        <UBadge v-if="data?.discount > 0" :label="data?.discount.toLocaleString('fa-IR') + '%'" color="red"
                            :ui="{ rounded: 'rounded-full' }" />
                    </div>
                </div>
            </div>
        </div>
        <UDivider class="lg:hidden" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    data: Object
})

import { toCurrencyString } from "~/composables/toCurrency"

</script>

<style></style>