<template>
    <div>
        <div class="hidden lg:flex h-96 bg-gray-100 dark:bg-gray-800 p-5 rounded w-full">
            <UVerticalNavigation :links="links" />
        </div>
        <div class="lg:hidden">
            <UButton icon="fluent:line-style-20-regular" @click="showMenu = !showMenu" variant="outline" />
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

const links = [[
    {
        label: 'پروفایل',
        to: { name: 'profile' },
        icon: 'fluent:slide-text-person-16-regular',
    }, {
        label: 'سبد خرید',
        icon: 'fluent:cart-16-regular',
        to: { name: 'carts' },
    }, {
        label: 'سفارشات',
        icon: 'fluent:box-16-regular',
        to: { name: 'orders' },
    }, {
        label: 'علاقه مندی ها',
        icon: 'fluent:person-heart-20-regular',
        to: { name: 'wishlist' },
    }
], [
    {
        label: 'خروج',
        icon: 'fluent:arrow-exit-20-regular',
        click: () => { getLogout() },
        iconClass: 'bg-red-500'
    }
]]

const showMenu = ref(false)
</script>

<style></style>