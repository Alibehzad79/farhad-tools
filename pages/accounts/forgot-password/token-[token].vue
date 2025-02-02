<template>
    <div>
        <UContainer>
            <div class="mt-10 flex justify-center items-center flex-col gap-10 w-full">
                <h1 class="text-xl lg:text-3xl font-bold">تغییر رمز عبور</h1>
                <UForm :schema="schema" :state="state" class="space-y-4 w-full lg:w-1/2" @submit="onSubmit"
                    method="post">
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
                        تغییر
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
    name: "resetPasswordToken"
})
useSeoMeta({
    title: "تغییر رمز عبور"
})

const route = useRoute()
const token = route.params.token
const showPassword = ref(false)

const schema = z.object({
    password: z.string().min(8, "حداقل 8 کاراکتر باید باشد.").nonempty('رمز عبور نمی تواند خالی باشد.'),
    confirmPassword: z.string().min(8, "حداقل 8 کاراکتر باید باشد.").nonempty('رمز عبور نمی تواند خالی باشد.'),
})

type Schema = z.output<typeof schema>

const state = reactive({
    password: undefined,
    confirmPassword: undefined,
})

const authStore = useAuthStore()

const btnLoading = ref(false)

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
    btnLoading.value = true
    const body = {
        "password": event.data.password,
        "token": token
    }
    const resulte = await authStore.getChangePassowrd(body)
    if (resulte === "success") {
        await authStore.getLogout()
        toast.add({
            title: "رمز عبور با موفقیت تغییر یافت.", description: "درحال تغییر صفحه...", color: "green", id: 'success_register', icon: "fluent:checkmark-circle-16-regular", callback: () => { navigateTo({ name: "login" }) }, timeout: 3000,
        })
    } else {
        toast.add({
            title: "خطا", description: String(resulte), color: "red", id: 'faild_register', icon: "fluent:error-circle-16-regular", timeout: 3000,
        })
    }
    btnLoading.value = false
}

</script>

<style></style>