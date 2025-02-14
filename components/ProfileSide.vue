<template>
    <div>
        <div class="hidden lg:flex h-96 bg-gray-100 dark:bg-gray-800 p-5 rounded w-full">
            <UVerticalNavigation :links="links" />
        </div>
        <div class="lg:hidden">
            <UButton icon="fluent:line-style-20-regular" size="xl" @click="showMenu = !showMenu" />
            <UVerticalNavigation :links="links" class="mt-3 bg-gray-100 dark:bg-gray-800 rounded p-2" v-if="showMenu" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const getLogout = async () => {
    await authStore.getLogout()
    navigateTo({ name: "login" })
}

const links = [{
    label: 'پروفایل',
    to: { name: 'profile' },
    icon: 'fluent:slide-text-person-16-regular',
    labelClass: 'text-lg',
}, {
    label: 'سبد خرید',
    icon: 'fluent:cart-16-regular',
    to: { name: 'carts' },
    labelClass: 'text-lg'
}, {
    label: 'سفارشات',
    icon: 'fluent:box-16-regular',
    to: { name: 'orders' },
    labelClass: 'text-lg'
}, {
    label: 'خروج',
    icon: 'fluent:arrow-exit-20-regular',
    click: () => { getLogout() },
    labelClass: 'text-lg text-red-500',
    iconClass: 'bg-red-500'
}]

const showMenu = ref(false)
</script>

<style></style>