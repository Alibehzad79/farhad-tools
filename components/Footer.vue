<template>
    <div class="no-print my-10">
        <UContainer>
            <UDivider v-if="settings?.socials?.length > 0">
                <div class="flex items-center gap-5 overflow-hidden justify-center">
                    <NuxtLink :to="social.link" target="_blank" v-for="social in settings?.socials">
                        <Icon :name="'bxl:' + social.name" size="20" />
                    </NuxtLink>
                </div>
            </UDivider>
            <div class="flex flex-col lg:flex-row justify-between gap-10 text-center mt-10">
                <div class="flex flex-col gap-5 w-full lg:w-1/2" v-if="settings">
                    <h2 class="text-lg font-bold">{{ settings?.site_name }}</h2>
                    <p class="text-gray-500">
                        {{ settings?.site_description }}
                    </p>
                    <div class="flex flex-col gap-2" v-if="settings?.phones?.length > 0">
                        <UButton v-for="phone in settings?.phones" :label="phone?.number"
                            trailing-icon="fluent:call-16-regular" variant="ghost" class="justify-center" />
                    </div>
                </div>
                <div class="flex flex-col gap-5 w-full lg:w-1/2">
                    <h6 class="text-lg font-bold">لینک های داخلی</h6>
                    <UVerticalNavigation :links="links" :ui="{ base: 'justify-center' }" />
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
await settingsStore.getSettings()
const { settings } = storeToRefs(settingsStore)

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/',
}, {
    label: 'فروشگاه',
    icon: 'fluent:building-shop-16-regular',
    to: { name: 'products' },
}, {
    label: 'درباره ما',
    icon: 'fluent:people-team-16-regular',
    to: { name: 'about' },
},
{
    label: 'تماس با ما',
    icon: 'fluent:call-16-regular',
    to: { name: 'contact' },
}]

const data = ref(
    {
        'phones': [
            { 'number': '09111111111' },
            { 'number': '09111111111' },
        ],
        'emails': [
            { 'email': 'test@mail.com' },
            { 'email': 'test@mail.com' },
        ],
    }
)

</script>

<style></style>