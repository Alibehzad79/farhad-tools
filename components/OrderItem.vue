<template>
    <div>
        <div class="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl p-4 relative cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="getOrderDetail">
            <div class="grid grid-cols-1 md:grid-cols-4  gap-3 justify-between w-full">
                <div class="flex flex-col gap-2">
                    <span class="text-sm">محصولات</span>
                    <div class="flex items-center">
                        <span class="line-clamp-1 text-blue-500" v-for="item in data?.orderitems">{{
                            item?.product?.title
                            }}</span>
                    </div>
                </div>
                <UDivider class="md:hidden" />
                <div class="flex flex-col gap-2">
                    <span class="text-sm">تاریخ</span>
                    <NuxtTime :datetime="data?.date_created" year="numeric" month="long" day="2-digit" locale="fa-IR" />
                </div>
                <UDivider class="md:hidden" />
                <div class="flex flex-col gap-2">
                    <span class="text-sm">قیمت کل (تومان)</span>
                    <span>{{ toCurrencyString(data?.total_price) }}</span>
                </div>
                <UDivider class="md:hidden" />
                <div class="flex flex-col gap-2">
                    <span class="text-sm">وضعیت</span>
                    <UBadge v-if="data?.status === 'done'" color="green" class="justify-center" size="lg">انجام شده
                    </UBadge>
                    <UBadge v-else-if="data?.status === 'pending'" color="orange" class="justify-center" size="lg">درحال
                        انجام</UBadge>
                    <UBadge v-else-if="data?.status === 'cancled'" color="rose" class="justify-center" size="lg">لغو شده
                    </UBadge>
                    <UBadge v-else color="red" class="justify-center" size="lg">نامشخص</UBadge>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { toCurrencyString } from "~/composables/toCurrency"

const props = defineProps({
    data: Object
})


const getOrderDetail = async () => {
    await navigateTo({ name: "order-detail", params: { order_id: props.data?.order_id } })
}

</script>

<style></style>