<template>
  <div class="sticky top-0 bg-white dark:bg-[#1c1b22] py-2 z-50">
    <UContainer>
      <div class="mt-5 hidden lg:flex flex-row items-center justify-between">
        <div>
          <h1 class="text-3xl">فرهاد ابزار</h1>
        </div>
        <div>
          <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
        </div>
        <div class="flex items-center gap-3">
          <div class="flex gap-3">
            <div class="flex gap-3" v-if="!isAuthenticated">
              <NuxtLink :to="{ name: 'login' }">
                <UButton label="ورود" size="xl" icon="fluent:key-16-regular" />
              </NuxtLink>
              <NuxtLink :to="{ name: 'register' }">
                <UButton label="ثبت نام" variant="soft" size="xl" icon="fluent:person-add-16-regular" />
              </NuxtLink>
            </div>
            <div class="flex gap-3" v-if="isAuthenticated">
              <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" dir="rtl">
                <UButton size="xl" variant="soft" :label="`${user?.first_name} ${user?.last_name}`"
                  trailing-icon="i-heroicons-chevron-down-20-solid" v-if="user" />
                <UButton size="xl" variant="soft" label="حساب کاربری" trailing-icon="i-heroicons-chevron-down-20-solid"
                  v-else />
              </UDropdown>
            </div>
          </div>
          <UButton
            :icon="colorMode.value === 'dark' ? 'fluent:weather-sunny-16-regular' : 'fluent:weather-moon-16-regular'"
            variant="ghost" @click="changeColorMode" />
          <UPopover mode="hover">
            <UButton icon="fluent:color-16-regular" variant="ghost" />

            <template #panel>
              <div class="p-4 flex flex-col gap-3">
                <div class="grid grid-cols-4 gap-2">
                  <UButton variant="solid" icon="fluent:checkbox-indeterminate" :color="color"
                    v-for="color in appConfig.ui.colors" class="justify-center p-3" @click="changeUiColor(color)" />
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
      <div class="lg:hidden mt-5 flex justify-between">
        <div>
          <h1 class="text-3xl">فرهاد ابزار</h1>
        </div>
        <div class="flex items-center gap-3">
          <UChip v-if="isAuthenticated" text="0" size="3xl">
            <UButton icon="fluent:cart-16-regular" variant="soft" @click="navigateTo({ name: 'cart' })" />
          </UChip>
          <UButton icon="fluent:line-horizontal-3-16-regular" @click="isOpen = !isOpen" />
          <UButton
            :icon="colorMode.value === 'dark' ? 'fluent:weather-sunny-16-regular' : 'fluent:weather-moon-16-regular'"
            variant="ghost" @click="changeColorMode" />
          <UPopover mode="click">
            <UButton icon="fluent:color-16-regular" variant="ghost" />

            <template #panel>
              <div class="p-4 flex flex-col gap-3">
                <div class="grid grid-cols-4 gap-2">
                  <UButton variant="solid" icon="fluent:checkbox-indeterminate" :color="color"
                    v-for="color in appConfig.ui.colors" class="justify-center p-3" @click="changeUiColor(color)" />
                </div>
              </div>
            </template>
          </UPopover>
        </div>
        <USlideover v-model="isOpen" dir="rtl" title="منو">
          <div class="p-4 flex-1">
            <UCard class="flex flex-col flex-1 h-full"
              :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h6 class="text-xl">منو</h6>
                  <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square padded
                    @click="isOpen = false" />
                </div>
              </template>

              <div>
                <UVerticalNavigation :links="links" />
              </div>

              <template #footer>
                <div class="flex items-center justify-between" v-if="!isAuthenticated">
                  <NuxtLink :to="{ name: 'login' }" @click="isOpen = !isOpen">
                    <UButton label="ورود" size="xl" icon="fluent:key-16-regular" />
                  </NuxtLink>
                  <NuxtLink :to="{ name: 'register' }" @click="isOpen = !isOpen">
                    <UButton label="ثبت نام" variant="soft" size="xl" icon="fluent:person-add-16-regular" />
                  </NuxtLink>
                </div>
                <div class="flex items-center justify-between" v-if="isAuthenticated">
                  <NuxtLink :to="{ name: 'profile' }" @click="isOpen = !isOpen">
                    <UButton :label="user?.full_name" variant="soft" size="xl" icon="fluent:person-16-regular" />
                  </NuxtLink>
                  <UButton label="خروج" color="red" size="xl" icon="fluent:key-16-regular" @click="getLogout" />
                </div>
              </template>
            </UCard>
          </div>
        </USlideover>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()

const { isAuthenticated, user } = storeToRefs(useAuthStore())

const appConfig = useAppConfig();
const changeUiColor = (color: string) => {
  appConfig.ui.primary = color
}

const links = [{
  label: 'خانه',
  icon: 'fluent:home-16-regular',
  to: '/',
  labelClass: "text-lg",
  click: () => {
    isOpen.value = false
  }
}, {
  label: 'فروشگاه',
  icon: 'fluent:building-shop-16-regular',
  to: { name: 'products' },
  labelClass: "text-lg",
  click: () => {
    isOpen.value = false
  }
}, {
  label: 'درباره ما',
  icon: 'fluent:people-team-16-regular',
  to: { name: 'about' },
  labelClass: "text-lg",
  click: () => {
    isOpen.value = false
  }
},
{
  label: 'تماس با ما',
  icon: 'fluent:call-16-regular',
  to: { name: 'contact' },
  labelClass: "text-lg",
  click: () => {
    isOpen.value = false
  }
}]


const colorMode = useColorMode()
const changeColorMode = () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

const isOpen = ref(false)

const getLogout = async () => {
  isOpen.value = false
  await authStore.getLogout()
  navigateTo({ name: "login" })
}

const items = [
  [{
    label: 'پروفایل',
    icon: 'fluent:slide-text-person-16-regular',
    to: { name: 'profile' }
  },
  {
    label: 'سبد خرید',
    icon: 'fluent:cart-16-regular',
    to: { name: 'cart' }
  }, {
    label: 'سفارشات',
    icon: 'fluent:box-16-regular',
    to: { name: 'orders' },
  }], [{
    label: 'خروج',
    icon: 'fluent:arrow-exit-20-regular',
    click: () => { getLogout() },
    iconClass: 'bg-red-500',
    labelClass: 'text-red-500',
  }]
]

</script>

<style></style>