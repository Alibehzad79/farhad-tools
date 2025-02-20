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
                        <div class="mt-10 flex flex-col gap-5">
                            <UButton label="تکمیل اطلاعات" variant="outline" size="xl" icon="fluent:form-24-regular"
                                block />
                            <UAlert title="توجه"
                                description="برای تغییر ثابت اطلاعات، میتونید از قسمت پروفایل اقدام کنید."
                                variant="soft" color="orange" icon="fluent:warning-16-regular" />
                            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                                <UFormGroup label="ایمیل" name="email" size="xl">
                                    <UInput v-model="state.email" disabled />
                                </UFormGroup>
                                <div class="flex flex-col lg:flex-row justify-between gap-3">
                                    <UFormGroup label="نام" name="first_name" size="xl" class="w-full lg:w-96">
                                        <UInput v-model="state.first_name" />
                                    </UFormGroup>
                                    <UFormGroup label="نام خانوادگی" name="last_name" size="xl" class="w-full lg:w-96">
                                        <UInput v-model="state.last_name" />
                                    </UFormGroup>
                                </div>

                                <UFormGroup label="شماره تلفن" name="phone_number" size="xl">
                                    <UInput v-model="state.phone_number" />
                                </UFormGroup>
                                <UFormGroup label="آدرس" name="address" size="xl">
                                    <UTextarea v-model="state.address" />
                                </UFormGroup>
                                <UButton v-if="carts?.amount" label="پرداخت" type="submit" size="xl"
                                    class="justify-center w-full lg:w-1/4"
                                    :disabled="cartStore.carts?.carts.length < 1" />
                            </UForm>
                            <UAlert v-if="error" title="خطا" :description="error" variant="outline" color="red"
                                icon="fluent:warning-16-regular" />
                        </div>
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
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/order'
import { toCurrencyString } from '~/composables/toCurrency'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

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
const authStore = useAuthStore()
await authStore.getUserDetail()
const { user } = storeToRefs(authStore)
const cartStore = useCartStore()
await cartStore.getUserCarts()
const { carts } = storeToRefs(cartStore)
const orderStore = useOrderStore()
const { error } = storeToRefs(orderStore)

const router = useRouter()

const phoneNumberRegex = new RegExp("^[0-9]+$")

const schema = z.object({
    email: z.string().email('ایمیل نامعتبر'),
    first_name: z.string().min(3, 'حداقل 3 حرف باید باشد.').max(20, 'حداکثر 20 حرف باید باشد.'),
    last_name: z.string().min(3, 'حداقل 3 حرف باید باشد.').max(20, 'حداکثر 20 حرف باید باشد.'),
    address: z.string(),
    phone_number: z.string().min(11, 'حداقل 11 عدد').max(11, 'حداکثر 11 عدد').regex(phoneNumberRegex, 'نوع باید عدد باشد.'),

})

type Schema = z.output<typeof schema>

const state = reactive({
    email: user?.value?.email || undefined,
    first_name: user?.value?.first_name || undefined,
    last_name: user?.value?.last_name || undefined,
    address: user?.value?.address || undefined,
    phone_number: user?.value?.phone_number || undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const data = {
        "user_info": event.data
    }
    await orderStore.getCreateOrder(data)

}

tryOnMounted(async () => {
    await cartStore.getUserCarts()
})

</script>

<style></style>