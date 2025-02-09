<template>
    <div>
        <UContainer>
            <div class="mt-10 flex justify-center items-center flex-col gap-10 w-full">
                <h1 class="text-xl lg:text-3xl font-bold">ثبت نام در سایت</h1>
                <UForm :schema="schema" :state="state" class="space-y-4 w-full lg:w-1/2" @submit="onSubmit"
                    method="post">
                    <UFormGroup label="نام" name="first_name" size="xl">
                        <UInput v-model="state.first_name" placeholder="علی" required />
                    </UFormGroup>
                    <UFormGroup label="نام خانوادگی" name="last_name" size="xl">
                        <UInput v-model="state.last_name" placeholder="شریعتی" required />
                    </UFormGroup>
                    <UFormGroup label="ایمیل" name="email" size="xl">
                        <UInput v-model="state.email" placeholder="Example@mail.com" required />
                    </UFormGroup>

                    <UFormGroup label="رمز عبور" name="password" size="xl">
                        <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" placeholder="******"
                            required />
                    </UFormGroup>
                    <UFormGroup label="تایید رمز عبور" name="confirmPassword" size="xl">
                        <UInput v-model="state.confirmPassword" :type="showPassword ? 'text' : 'password'"
                            placeholder="******" required />
                    </UFormGroup>
                    <span v-if="state.password !== state.confirmPassword" class="text-red-500 mt-3">رمز عبور ها یکسان
                        نیستند.</span>

                    <div class="flex justify-between">
                        <UCheckbox label="نمایش رمز عبور" v-model="showPassword" />
                    </div>
                    <UButton :disabled="state.password !== state.confirmPassword" type="submit"
                        class="w-full justify-center" size="xl" :loading="btnLoading">
                        ورود
                    </UButton>
                </UForm>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    name: "register",
    middleware: 'auth'
})
useSeoMeta({
    title: "ثبت نام"
})


const showPassword = ref(false)

const schema = z.object({
    email: z.string().email('ایمیل نامعتبر'),
    first_name: z.string().min(3, 'حداقل 3 حرف باید باشد').max(20, 'حداکثر 20 حرف باید باشد'),
    last_name: z.string().min(3, 'حداقل 3 حرف باید باشد').max(20, 'حداکثر 20 حرف باید باشد'),
    password: z.string().min(8, "حداقل 8 کاراکتر باید باشد.").nonempty('رمز عبور نمی تواند خالی باشد.'),
    confirmPassword: z.string().min(8, "حداقل 8 کاراکتر باید باشد.").nonempty('رمز عبور نمی تواند خالی باشد.'),
})

type Schema = z.output<typeof schema>

const state = reactive({
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
})

const authStore = useAuthStore()

const btnLoading = ref(false)

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
    btnLoading.value = true
    const { confirmPassword, ...rest } = event.data
    const resulte = await authStore.getRegister(rest)
    if (resulte === "success") {
        toast.add({
            title: "ثبت نام موفق", description: "درحال تغییر صفحه...", color: "green", id: 'success_register', icon: "fluent:checkmark-circle-16-regular", callback: () => { navigateTo({ name: "login" }) }, timeout: 3000,
        })
    } else {
        toast.add({
            title: "ثبت نام ناموفق", description: String(resulte), color: "red", id: 'faild_register', icon: "fluent:error-circle-16-regular", timeout: 3000,
        })
    }
    btnLoading.value = false
}


</script>

<style></style>