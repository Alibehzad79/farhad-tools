<template>
    <div>
        <!-- <UButton v-for="item in categories_tags['categories']" class="justify-center" :label="item?.name" variant="soft"
            size="xl" :to="{ name: 'search', query: { 'query': item?.slug } }" icon="fluent:apps-16-regular" /> -->
        <div
            class="ease-in transition-all  cursor-pointer p-5 rounded-xl border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800 hover:bg-primary hover:text-white hover:dark:bg-primary flex flex-col gap-5 justify-center w-full">
            <div class="flex flex-col lg:flex-row gap-3 items-center justify-center"
                @click="navigateTo({ name: 'search', query: { 'query': slug } })">
                <Icon name="fluent:apps-16-regular" size="25" />
                <span class="text-lg font-bold">{{ name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    name: String,
    slug: String
})


</script>

<style></style>