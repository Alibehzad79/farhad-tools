<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="w-full lg:w-3/4  h-screen p-5 rounded flex flex-col gap-5">
                        <div class="flex items-center gap-2">
                            <UInput class="w-full" placeholder="جستوجو" v-model="searchValue" />
                            <UPopover>
                                <UButton color="white" label="فیلتر"
                                    trailing-icon="i-heroicons-chevron-down-20-solid" />

                                <template #panel>
                                    <div class="flex flex-col gap-3 p-2">
                                        <UButton label="حذف فیلتر" color="primary" class="justify-center"
                                            variant="ghust" icon="fluent:filter-dismiss-16-regular"
                                            @click="filterOrder('')" />
                                        <UButton label="انجام شده" color="green" class="justify-center" variant="soft"
                                            icon="fluent:checkmark-16-regular" @click="filterOrder('done')" />
                                        <UButton label="درحال انجام" color="orange" class="justify-center"
                                            variant="outline" icon="fluent:vehicle-car-profile-ltr-clock-16-regular"
                                            @click="filterOrder('pending')" />
                                        <UButton label="لغو شده" color="red" class="justify-center" variant="solid"
                                            icon="fluent:dismiss-circle-16-regular" @click="filterOrder('cancled')" />
                                        <UButton label="نامشخص" color="rose" class="justify-center" variant="soft"
                                            icon="fluent:border-none-16-regular" @click="filterOrder('none')" />
                                    </div>
                                </template>
                            </UPopover>
                        </div>
                        <div class="flex gap-5 flex-col-reverse" v-if="orders.length > 0">
                            <div v-for="order in orders" :key="order?.id">
                                <OrderItem :data="order" />
                            </div>
                        </div>
                        <div v-if="orders.length < 1">
                            <UAlert title="سفارشی یافت نشد." color="red" icon="fluent:error-circle-16-regular"
                                variant="soft" />
                        </div>
                    </div>
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

const searchValue = ref('')

watch(searchValue, async (newValue, oldValue) => {
    if (newValue === '' || newValue === ' ') {
        await await orderStore.getUserOrders()
    }
    orders.value = orders.value.filter(order => {
        return order.order_id.includes(newValue) ||
            order.orderitems.some(item => item.product.title.includes(newValue))
    })
});

const filterOrder = async (f) => {
    await await orderStore.getUserOrders()
    orders.value = orders.value.filter(order => {
        return order.status.includes(f)
    })
}


</script>

<style></style>