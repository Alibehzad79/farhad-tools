<template>
    <div>
        <div
            class="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl  p-2 relative">
            <div class="flex gap-3 items-center w-full lg:w-1/2 cursor-pointer"
                @click="navigateTo({ name: 'products-slug', params: { 'slug': data?.product.slug } })">
                <img :src="data?.product?.image" :alt="data?.product?.title" :title="data?.product?.title"
                    class="w-[5rem] rounded-xl">
                <span class="line-clamp-1">{{ data?.product?.title }}</span>
            </div>
            <div class="flex flex-col gap-5 sm:flex-row justify-between items-center w-full lg:w-1/2">
                <div>
                    <span>قیمت: {{ toCurrencyString(data?.total_price) }} تومان</span>
                </div>
                <div class="w-full sm:w-auto flex items-center gap-2">
                    <UButton variant="ghost" label="+" @click="increment"
                        :disabled="quntityValue >= data?.product?.count" />
                    <UInput type="number" v-model="quntityValue" disabled :min="minValue"
                        :max="data?.product?.count" class="w-full sm:w-auto">
                    </UInput>
                    <UButton variant="ghost" label="-" @click="decrement" v-if="quntityValue > 1" />
                    <UButton variant="ghost" icon="fluent:delete-16-regular" v-if="quntityValue <= 1" color="red"
                        @click="deleteCart" />
                </div>
            </div>
            <div class="absolute w-full bg-gray-100 opacity-40 h-full rounded-xl right-0 flex justify-center items-center"
                v-if="editLoading">
                <Icon name="fluent:arrow-sync-16-regular" size="20" class="animate-spin" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/stores/carts'
import { toCurrencyString } from '~/composables/toCurrency'

const props = defineProps({
    data: Object
})
const quntityValue = ref(props?.data?.quantity ?? 1)
const minValue = ref(1)
tryOnMounted(() => {
    minValue.value = 1

})
const cartStore = useCartStore()
const editLoading = ref(false)
const router = useRouter()
const toast = useToast()

const increment = async () => {
    editLoading.value = true
    quntityValue.value++
    if (quntityValue.value > props.data?.product?.count) {
        quntityValue.value = props.data?.product?.count
    } else {
        const data = ref({
            'product_slug': props.data?.product?.slug,
            'quantity': quntityValue.value
        })
        const reslute = await cartStore.getEditCart(data.value)
        if (reslute === "error") {
            toast.add({
                title: "کارتی یافت نشد.",
                color: "red",
                timeout: 3000,
                description: "در حال بروزرسانی صفحه...",
                callback: () => {
                    router.go(0)
                }
            })
        }
    }

    editLoading.value = false
}

const decrement = async () => {
    editLoading.value = true
    quntityValue.value--
    if (quntityValue.value < 0) {
        quntityValue.value = 1
    }
    const data = ref({
        'product_slug': props.data?.product?.slug,
        'quantity': quntityValue.value
    })
    const reslute = await cartStore.getEditCart(data.value)
    if (reslute === "error") {
        toast.add({
            title: "کارتی یافت نشد.",
            color: "red",
            timeout: 3000,
            description: "در حال بروزرسانی صفحه...",
            callback: () => {
                router.go(0)
            }
        })
    }
    editLoading.value = false

}

const deleteCart = async () => {
    const data = ref({
        "cart_id": props?.data?.id
    })
    const reslute = await cartStore.getDeleteCart(data.value)
    if (reslute === "success") {
        toast.add({
            title: "با موفقیت حذف شد.",
            color: "green",
            timeout: 3000,
            callback: async () => {
                await cartStore.getUserCarts()
            }
        })
    } else {
        toast.add({
            title: "کارت یافت نشد.",
            color: "red",
            timeout: 3000,
            callback: async () => {
                await cartStore.getUserCarts()
            }
        })
    }
}


</script>

<style scoped></style>