<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="w-full lg:w-3/4  h-screen p-5 rounded">
                        <div class="flex flex-col gap-5" v-if="orders.length > 0">
                            <div v-for="order in orders" :key="order?.id">
                                <OrderItem :data="order" />
                            </div>
                        </div>
                        <div v-if="orders.length < 1">
                            <UAlert title="سفارشی یافت نشد." color="red" icon="fluent:error-circle-16-regular"
                                variant="soft" />
                        </div>
                    </div>
                    <div v-if="error">{{ error }}</div>
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useOrderStore } from "~/stores/order"


definePageMeta({
    name: 'orders',
    middleware: 'auth'
})

useSeoMeta({
    title: 'سفارشات'
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'سفارشات',
    icon: 'fluent:box-16-regular'
},]

const orderStore = useOrderStore()
await orderStore.getUserOrders()
const { orders, error } = storeToRefs(orderStore)

</script>

<style></style>