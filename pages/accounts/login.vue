<template>
  <div>
    <UContainer>
      <div class="mt-10 flex justify-center items-center flex-col gap-10 w-full">
        <h1 class="text-xl font-bold">ورود به سایت</h1>
        <UForm :schema="schema" :state="state" class="space-y-4 w-full lg:w-1/2" @submit="onSubmit" method="post">
          <UFormGroup label="ایمیل" name="email">
            <UInput v-model="state.email" placeholder="Example@mail.com" required />
          </UFormGroup>

          <UFormGroup label="رمز عبور" name="password">
            <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" placeholder="******" required />
          </UFormGroup>
          <div class="flex justify-between">
            <UCheckbox label="نمایش رمز عبور" v-model="showPassword" />
            <NuxtLink to="/accounts/forgot-password" class="text-blue-500 text-md">فراموشی رمز عبور</NuxtLink>
          </div>
          <UButton type="submit" class="w-full justify-center" :loading="btnLoading">
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
  name: "login",
  middleware: 'auth'
})
useSeoMeta({
  title: "ورود"
})


const showPassword = ref(false)

const schema = z.object({
  email: z.string().email('ایمیل نامعتبر'),
  password: z.string().nonempty('رمز عبور نمی تواند خالی باشد.')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const authStore = useAuthStore()

const btnLoading = ref(false)

const toast = useToast()

const route = useRoute()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  btnLoading.value = true
  const resulte = await authStore.getLogin(event.data)
  if (resulte === "success") {
    authStore.isAuthenticated = true
    toast.add({
      title: "ورود موفق", color: "green", id: 'success_login', icon: "fluent:checkmark-circle-16-regular", timeout: 1000, callback: () => {
        if (route.query.backURL !== '') { navigateTo(route.query.backURL) } else {
          navigateTo('/')
        }
      }
    })
  }
  if (resulte === "error") {
    toast.add({
      title: "ورود ناموفق", description: "ایمیل یا رمز عبور اشتباه است.", color: "red", id: 'faild_login', icon: "fluent:error-circle-16-regular", timeout: 3000,
    })
  }
  btnLoading.value = false
}


</script>

<style></style>