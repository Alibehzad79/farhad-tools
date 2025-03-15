<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col gap-5" v-if="about">
                    <img :src="about?.image" alt="درباره ما" title="درباره ما" class="h-96 rounded-lg">
                    <div v-html="about?.content"></div>
                </div>
                <div v-if="about?.teams?.length > 0" class="flex flex-col gap-3">
                    <h4 class="text-xl font-bold">تیم ما</h4>
                    <UCarousel v-slot="{ item }" :items="about?.teams"
                        :ui="{ item: 'basis-full md:basis-1/3 lg:basis-1/4 mx-1' }" arrows dir="rtl">
                        <div class="relative hover:shadow-lg">
                            <img :src="item?.image" height="400" draggable="false" class="rounded-lg">
                            <strong class="absolute bottom-0 text-center p-3 w-full bg-primary rounded-lg text-white">{{
                                item?.name }}</strong>
                        </div>
                    </UCarousel>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

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

const settingsStore = useSettingsStore()
await settingsStore.getAbout()
const { about } = storeToRefs(settingsStore)


</script>

<style></style>