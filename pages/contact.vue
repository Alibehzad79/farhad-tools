<template>
    <div>
        <UContainer>
            <div class="mt-10 flex flex-col gap-10">
                <UBreadcrumb :links="links" />
                <div class="flex flex-col gap-10">
                    <div class="flex flex-col gap-3 items-center text-center">
                        <h1 class="text-xl font-bold">تماس با ما</h1>
                        <p class="lg:w-1/2 text-gray-500">در این قسمت، میتوانید به روش های مختلفی که ذکر شده، با ما تماس
                            بگیرید.</p>
                    </div>
                    <div class="flex flex-col lg:flex-row justify-between gap-10">
                        <div class="w-full lg:w-1/2">
                            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                                <div class="flex flex-col lg:flex-row justify-between gap-3">
                                    <UFormGroup label="نام" name="first_name" class="w-full">
                                        <UInput v-model="state.first_name" />
                                    </UFormGroup>
                                    <UFormGroup label="نام خانوادگی" name="last_name" class="w-full">
                                        <UInput v-model="state.last_name" />
                                    </UFormGroup>
                                </div>
                                <UFormGroup label="ایمیل" name="email">
                                    <UInput v-model="state.email" />
                                </UFormGroup>
                                <UFormGroup label="شماره تماس" name="phone_number">
                                    <UInput v-model="state.phone_number" />
                                </UFormGroup>

                                <UFormGroup label="عنوان" name="subject" class="w-full">
                                    <UInput v-model="state.subject" />
                                </UFormGroup>
                                <UFormGroup label="پیام" name="message" class="w-full">
                                    <UTextarea v-model="state.message" />
                                </UFormGroup>

                                <UButton type="submit" class="w-full lg:w-1/4 justify-center" :loading="btnLoading">
                                    ارسال
                                </UButton>
                            </UForm>
                        </div>
                        <div class="w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg" v-if="settings">
                            <div class="flex flex-col items-center gap-5">
                                <div class="flex flex-col gap-3 items-center" v-if="settings?.socials?.length > 0">
                                    <h2 class="font-bold">شبکه های اجتماعی:</h2>
                                    <div class="flex flex-col gap-2">
                                        <UButton v-for="social in settings?.socials" :label="social?.name"
                                            :icon="'bxl:' + social?.name" variant="link" color="black"
                                            :to="social?.link" target="_blank" />
                                    </div>
                                </div>
                                <div class="flex flex-col gap-3 items-center" v-if="settings?.phones?.length > 0">
                                    <h2 class="font-bold">تماس مستقیم:</h2>
                                    <div class="flex flex-col gap-2">
                                        <UButton v-for="phone in settings?.phones" :label="phone?.number"
                                            trailing-icon="fluent:call-16-regular" variant="link" color="black" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '~/stores/settings'


definePageMeta({
    name: "contact"
})
useSeoMeta({
    title: "تماس با ما",
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'تماس با ما',
    icon: 'fluent:call-16-regular'
}]

const settingsStore = useSettingsStore()
await settingsStore.getSettings()
const { settings } = storeToRefs(settingsStore)

const toast = useToast()

const phoneNumberRegex = new RegExp("^[0-9]+$")

const schema = z.object({
    first_name: z.string().min(3, 'حداقل باید 3 حرف باشد.').max(25, 'حداکثر 25 حرف باید باشد.'),
    last_name: z.string().min(3, 'حداقل باید 3 حرف باشد.').max(25, 'حداکثر 25 حرف باید باشد.'),
    email: z.string().email('ایمیل نامعتبر'),
    phone_number: z.string().min(11, 'حداقل 11 عدد').max(11, 'حداکثر 11 عدد').regex(phoneNumberRegex, 'نوع باید عدد باشد.'),
    subject: z.string().max(100, 'حداکثر 100 حرف باید باشد.'),
    message: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
})

const btnLoading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    btnLoading.value = true
    const resulte = await settingsStore.addContact(event.data)
    if (resulte === "success") {
        toast.add({
            title: "ارسال با موفقیت انجام شد.",
            description: "جواب تماس ها با ایمیل شما فرستاده خواهد شد.",
            color: "green",
            timeout: 3000,
        })
        Object.assign(state, {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            subject: "",
            message: "",
        })
    } else {
        toast.add({
            title: "ارسال با خطا مواجه شد.",
            description: "لطفا مجدد امتحان کنید..",
            color: "red",
            timeout: 3000,
        })
    }
    btnLoading.value = false
}

</script>

<style></style>