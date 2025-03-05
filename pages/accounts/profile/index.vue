<template>
    <div>
        <UContainer class="mt-10 flex flex-col gap-10">
            <UBreadcrumb :links="links" />
            <div class="flex flex-col lg:flex-row gap-5">
                <ProfileSide class="w-full lg:w-1/4" />
                <div class="w-full lg:w-3/4 h-screen p-5 rounded">
                    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="ایمیل" name="email">
                            <UInput v-model="state.email" disabled />
                        </UFormGroup>
                        <div class="flex flex-col lg:flex-row justify-between gap-3">
                            <UFormGroup label="نام" name="first_name" class="w-full lg:w-96">
                                <UInput v-model="state.first_name" />
                            </UFormGroup>
                            <UFormGroup label="نام خانوادگی" name="last_name" class="w-full lg:w-96">
                                <UInput v-model="state.last_name" />
                            </UFormGroup>
                        </div>

                        <UFormGroup label="شماره تلفن" name="phone_number">
                            <UInput v-model="state.phone_number" />
                        </UFormGroup>
                        <UFormGroup label="آدرس" name="address">
                            <UTextarea v-model="state.address" />
                        </UFormGroup>

                        <UButton type="submit" class="w-full lg:w-1/4 justify-center">
                            ذخیره
                        </UButton>
                    </UForm>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
await authStore.getUserDetail()
const { user } = storeToRefs(authStore)


const phoneNumberRegex = new RegExp("^[0-9]+$")

const schema = z.object({
    email: z.string().email('ایمیل نامعتبر'),
    first_name: z.string().min(3, 'حداقل 3 حرف باید باشد.').max(20, 'حداکثر 20 حرف باید باشد.'),
    last_name: z.string().min(3, 'حداقل 3 حرف باید باشد.').max(20, 'حداکثر 20 حرف باید باشد.'),
    address: z.string(),
    phone_number: z.string().min(11, 'حداقل 11 عدد').max(11, 'حداکثر 11 عدد').regex(phoneNumberRegex, 'نوع باید عدد باشد.'),

})

type Schema = z.output<typeof schema>

const state = reactive({
    email: user?.value?.email || undefined,
    first_name: user?.value?.first_name || undefined,
    last_name: user?.value?.last_name || undefined,
    address: user?.value?.address || undefined,
    phone_number: user?.value?.phone_number || undefined,
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { email, ...data } = event.data
    const result = await authStore.getEditUserDetail(data)
    if (result === "success") {
        toast.add({
            title: "با موفقیت آپدیت شد.",
            color: "green",
            timeout: 2000,
            callback: async () => {
                await authStore.getUserDetail()
            }
        })
    } else {
        toast.add({
            title: "خطا در ارتباط",
            color: "red",
            timeout: 2000,
        })
    }
}

definePageMeta({
    name: 'profile',
    middleware: 'auth',
})

useSeoMeta({
    title: "پروفایل کاربری",
})

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/'
}, {
    label: 'پروفایل',
    icon: 'fluent:person-16-regular'
},]

</script>

<style></style>