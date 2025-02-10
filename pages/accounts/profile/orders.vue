<template>
    <div>
        <div>
            <UContainer class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col lg:flex-row gap-5">
                    <ProfileSide class="w-full lg:w-1/4" />
                    <div class="w-full lg:w-3/4 bg-red-500 h-screen p-5 rounded">s</div>
                </div>
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
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
</script>

<style></style>