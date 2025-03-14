<template>
    <div>
        <UContainer class="mt-10">
            <UBreadcrumb :links="links" class="no-print" />
            <div class="flex flex-col gap-5 mt-10" v-if="order">
                <div
                    class="flex flex-col lg:flex-row justify-between border border-gray-100 dark:border-gray-800 p-5 rounded-xl gap-5">
                    <div class="flex flex-col lg:flex-row gap-2">
                        <span>کد پیگیری:</span>
                        <span class="select-all cursor-copy">{{ order?.order_id }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span>تاریخ:</span>
                        <NuxtTime :datetime="order?.date_created" year="numeric" month="long" day="2-digit"
                            locale="fa-IR" />
                    </div>
                </div>
                <div class="flex justify-between border border-gray-100 dark:border-gray-800 p-5 rounded-xl">
                    <div class="flex flex-col lg:flex-row gap-2">
                        <span>قیمت کل:</span>
                        <span>{{ toCurrencyString(order?.total_price ?? 0) }} تومان</span>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-2">
                        <span>وضعیت پرداخت: </span>
                        <UBadge v-if="order?.pay_status === 'paid'" color="green" class="justify-center">
                            پرداخت
                            شده
                        </UBadge>
                        <UBadge v-else-if="order?.pay_status === 'not_paid'" color="orange" class="justify-center">
                            پرداخت نشده
                        </UBadge>
                        <UBadge v-else-if="order?.pay_status === 'cancled'" color="red" class="justify-center">لغو شده
                        </UBadge>
                        <UBadge v-else color="red" class="justify-center">نامشخص</UBadge>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-2">
                        <span>وضعیت سفارش: </span>
                        <UBadge v-if="order?.status === 'done'" color="green" class="justify-center">انجام شده
                        </UBadge>
                        <UBadge v-else-if="order?.status === 'pending'" color="orange" class="justify-center">
                            درحال
                            انجام</UBadge>
                        <UBadge v-else-if="order?.status === 'cancled'" color="rose" class="justify-center">
                            لغو شده
                        </UBadge>
                        <UBadge v-else color="red" class="justify-center">نامشخص</UBadge>
                    </div>
                </div>

                <div class="flex flex-col gap-5 mt-10">
                    <h6 class="text-lg font-bold">محصولات سفارش داده شده</h6>
                    <div v-for="item in order?.orderitems"
                        class="border border-gray-100 dark:border-gray-800 p-5 rounded-xl">
                        <div class="flex flex-col gap-3 lg:flex-row justify-between lg:items-center">
                            <div class="flex flex-col lg:flex-row gap-3 lg:items-center">
                                <img :src="item?.product?.image" :alt="item?.product?.title"
                                    :title="item?.product?.title"
                                    class="w-full lg:w-[5rem] h-[15rem] lg:h-[5rem] rounded-xl select-none no-print">
                                <NuxtLink class="text-blue-500 text-md"
                                    :to="{ name: 'products-slug', params: { slug: item?.product?.slug } }">{{
                                        item?.product?.title }}</NuxtLink>
                            </div>
                            <span>تعداد: {{ item?.quantity }}</span>
                            <span>قیمت پرداختی: {{ toCurrencyString(item?.price ?? 0) }} تومان</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-5 mt-10">
                    <h6 class="text-lg font-bold">اطلاعات کاربر</h6>
                    <div class="border border-gray-100 dark:border-gray-800 p-5 rounded-xl"
                        v-html="order?.user_info?.replaceAll('\n', '<br />')"></div>
                </div>
                <UButton @click="printDiv('printable')" label="دانلود فاکتور"
                    class="w-full lg:w-1/4 justify-center no-print" />
            </div>
            <div v-if="error" class="mt-10 no-print">
                <UAlert :title="error" color="red" description="آیدی سفارش اشتباه است."
                    icon="fluent:error-circle-16-regular" variant="soft" />
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useOrderStore } from "~/stores/order"
import { toCurrencyString } from "~/composables/toCurrency"

definePageMeta({
    name: "order-detail",
    middleware: "auth"
})

useSeoMeta({
    title: "جزئیات سفارش",
})

const route = useRoute()

const order_id = route.params.order_id


const orderStore = useOrderStore()
await orderStore.orderDetail(order_id.toString())

const { order, error } = storeToRefs(orderStore)

console.log(order);

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'سفارشات',
    icon: 'fluent:box-16-regular',
    to: { name: "orders" }
},
{
    label: `سفارش ${order_id}`,
    icon: 'fluent:box-16-regular'
},]


const printDiv = (divId) => {
    window.print();
}

</script>

<style></style>