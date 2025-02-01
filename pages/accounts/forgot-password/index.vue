<template>
  <div>
    <UContainer>
      <div class="flex flex-col gap-10 justify-center items-center mt-10">
        <h1 class="text-3xl font-bold">بازیابی رمز عبور</h1>
        <UForm :schema="schema" :state="state" class="space-y-4 w-full lg:w-1/2" @submit="onSubmit" method="post">
          <UFormGroup label="ایمیل" name="email" size="xl">
            <UInput v-model="state.email" placeholder="Example@mail.com" required />
          </UFormGroup>
          <UButton type="submit" class="w-full justify-center" size="xl" :loading="btnLoading">
            ارسال
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
  name: "forgot-password",

})
useSeoMeta({
  title: "فراموشی رمز عبور"
})

const schema = z.object({
  email: z.string().email('ایمیل نامعتبر'),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
})

const authStore = useAuthStore()

const btnLoading = ref(false)

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  btnLoading.value = true
  const resulte = await authStore.getSendResetPasswordEmail(event.data)
  if (resulte === "success") {
    toast.add({
      title: "ارسال موفق", description: "ایمیل بازیابی رمز عبور با موفقیت ارسال شد.", color: "green", icon: "fluent:checkmark-circle-16-regular", timeout: 3000,
    })
  } else {
    toast.add({
      title: "خطا در ارسال", color: "red", description: String(resulte), icon: "fluent:error-circle-16-regular", timeout: 3000,
    })
  }
  btnLoading.value = false
}


</script>

<style></style>