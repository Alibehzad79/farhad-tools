<template>
    <div>
        <div class="">
            <UCard class="w-full" :ui="{ divide: '' }">
                <template #header>
                    <div class="w-full">
                        <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }">
                            <img :src="data?.image" :alt="data?.title" :title="data?.title"
                                class="w-full lg:h-[20rem] h-96 rounded" loading="lazy">
                        </NuxtLink>
                    </div>
                </template>

                <div class="flex flex-col justify-between gap-3">
                    <NuxtLink :to="{ name: 'products-slug', params: { slug: data?.slug } }"><strong class="text-lg">{{
                            data?.title
                            }}</strong>
                    </NuxtLink>
                    <p class="text-gray-500 line-clamp-3">{{ data?.short_description }}</p>
                </div>

                <template #footer>
                    <div class="flex justify-between items-center w-full">
                        <div v-if="data?.status === 'active'">
                            <div v-if="data?.discount > 0">
                                <UChip :text="data?.discount + '%'" color="red" size="xl" position="top-left"
                                    class="w-full">
                                    <UButton :label="toCurrencyString(data?.discount_price) + ' تومان'"
                                        class="w-full justify-center" size="lg" variant="soft" />
                                </UChip>
                                <span class="text-gray-500 text-sm line-through">{{ toCurrencyString(data?.price) }}
                                    تومان</span>
                            </div>
                            <UButton v-if="data?.discount <= 0" :label="toCurrencyString(data?.price) + ' تومان'"
                                class="justify-center" size="lg" variant="soft" />
                        </div>
                        <UButton disabled v-if="data?.status !== 'active'" label="ناموجود" color="rose"
                            class="justify-center" size="lg" variant="solid" />
                        <div class="flex gap-1 items-center">
                            <UButton icon="fluent:heart-16-regular" />
                            <UButton icon="fluent:cart-16-regular" variant="outline" v-if="data?.status === 'active'" />
                        </div>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    data: Object
})

import { toCurrencyString } from "~/composables/toCurrency"

</script>

<style></style>