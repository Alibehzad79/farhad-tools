<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div></div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "products"
})
useSeoMeta({
    title: "محصولات"
})


const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'محصولات',
    icon: 'fluent:building-shop-16-regular'
}]

</script>

<style></style>