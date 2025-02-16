<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="flex flex-col gap-5 justify-between w-full lg:w-3/4"
                        v-if="cartStore.carts?.carts.length > 0">
                        <div class="p-5 rounded flex flex-col gap-5">
                            <CartItem v-for="cart in carts?.carts" :key="cart" :data="cart" />
                        </div>
                        <div v-if="cartStore.carts?.amount">
                            <UAlert title="قیمت کل:" variant="soft" color="primary"
                                :description="toCurrencyString(carts?.amount ?? 0) + ' تومان'"
                                icon="fluent:money-16-regular" />
                        </div>
                        <UButton v-if="carts?.amount" label="پرداخت" size="xl" class="justify-center w-full lg:w-1/4" />
                    </div>
                    <div v-show="cartStore.loading" class="flex w-full lg:w-3/4">
                        <Icon name="fluent:arrow-sync-16-regular" size="20" class="animate-spin" />
                    </div>
                    <div v-if="cartStore.carts?.carts.length < 1" class="w-full lg:w-3/4">
                        <UAlert title="سبد خرید خالی است." variant="soft" color="primary"
                            icon="fluent:error-circle-16-regular">
                            <template #description>
                                <div>
                                    <NuxtLink :to="{ name: 'products' }">
                                        <UButton label="رفتن به فروشگاه" />
                                    </NuxtLink>
                                </div>
                            </template>
                        </UAlert>
                    </div>
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/carts'
import { toCurrencyString } from '~/composables/toCurrency'

definePageMeta({
    name: 'carts',
    middleware: 'auth'
})
useSeoMeta({
    title: 'سبد خرید',
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'سبد خرید',
    icon: 'fluent:cart-16-regular'
},]
const cartStore = useCartStore()
await cartStore.getUserCarts()

const { carts } = storeToRefs(cartStore)


tryOnMounted(async () => {
    await cartStore.getUserCarts()
})

</script>

<style></style>