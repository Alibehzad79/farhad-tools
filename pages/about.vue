<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div></div>
            </div>
            {{ primaryColor }}
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "about"
})
useSeoMeta({
    title: "درباره ما"
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'درباره ما',
    icon: 'fluent:people-team-16-regular'
}]

</script>

<style></style>